// In-memory synchronous cache for instantaneous component rendering
const memoryCache: Map<string, string> = new Map();

const DB_NAME = 'bowen_portfolio_media_db';
const DB_VERSION = 1;
const STORE_NAME = 'custom_images';

// Open or initialize IndexedDB instance
const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// Async IndexedDB getter
const idbGet = async (key: string): Promise<string | null> => {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
};

// Async IndexedDB setter
const idbSet = async (key: string, value: string): Promise<void> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(value, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('IndexedDB write warning:', err);
  }
};

// Async IndexedDB deleter
const idbDel = async (key: string): Promise<void> => {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(key);
      req.onsuccess = () => resolve();
      req.onerror = () => resolve();
    });
  } catch {
    // Ignore error
  }
};

// Initialize memory cache from both IndexedDB and localStorage (for migration)
const initStorage = async () => {
  if (typeof window === 'undefined') return;

  // 1. Try reading legacy localStorage items and migrate to memoryCache + IndexedDB
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('bowen_custom_project_img_') || key.startsWith('bowen_custom_gallery_'))) {
        const val = localStorage.getItem(key);
        if (val) {
          memoryCache.set(key, val);
          idbSet(key, val).catch(() => {});
        }
      }
    }
  } catch {
    // localStorage might be unavailable or restricted
  }

  // 2. Load all stored entries from IndexedDB into memory cache
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const cursorReq = store.openCursor();
    cursorReq.onsuccess = (e) => {
      const cursor = (e.target as IDBRequest<IDBCursorWithValue>).result;
      if (cursor) {
        if (typeof cursor.key === 'string' && typeof cursor.value === 'string') {
          memoryCache.set(cursor.key, cursor.value);
        }
        cursor.continue();
      } else {
        // Finished loading IndexedDB, notify components
        window.dispatchEvent(new Event('project_image_updated'));
      }
    };
  } catch {
    // Ignore error
  }
};

// Auto-run initialization
if (typeof window !== 'undefined') {
  initStorage();
}

export const getProjectHeroImage = (projectId: string, defaultImage: string): string => {
  const key = `bowen_custom_project_img_${projectId}`;
  if (memoryCache.has(key)) {
    return memoryCache.get(key) || defaultImage;
  }
  // Fallback to localStorage if in transition
  try {
    const localVal = localStorage.getItem(key);
    if (localVal) {
      memoryCache.set(key, localVal);
      return localVal;
    }
  } catch {
    // Ignore quota/access error
  }
  return defaultImage;
};

export const setProjectHeroImage = (projectId: string, imageDataUrl: string): void => {
  const key = `bowen_custom_project_img_${projectId}`;
  // Immediately update synchronous memory cache
  memoryCache.set(key, imageDataUrl);

  // Store in IndexedDB without quota limitation
  idbSet(key, imageDataUrl).catch((err) => console.warn('Failed to save to IndexedDB', err));

  // Try optional localStorage write, gracefully catching quota exceeded
  try {
    localStorage.setItem(key, imageDataUrl);
  } catch {
    // Quota exceeded in localStorage is safely bypassed because IndexedDB + memoryCache handles it
  }

  window.dispatchEvent(new Event('project_image_updated'));
  window.dispatchEvent(new Event('storage'));
};

export const resetProjectHeroImage = (projectId: string): void => {
  const key = `bowen_custom_project_img_${projectId}`;
  memoryCache.delete(key);
  idbDel(key).catch(() => {});

  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore
  }

  window.dispatchEvent(new Event('project_image_updated'));
  window.dispatchEvent(new Event('storage'));
};

export const getProjectGalleryImage = (projectId: string, index: number, defaultImage: string): string => {
  const key = `bowen_custom_gallery_${projectId}_${index}`;
  if (memoryCache.has(key)) {
    return memoryCache.get(key) || defaultImage;
  }
  try {
    const localVal = localStorage.getItem(key);
    if (localVal) {
      memoryCache.set(key, localVal);
      return localVal;
    }
  } catch {
    // Ignore
  }
  return defaultImage;
};

export const setProjectGalleryImage = (projectId: string, index: number, imageDataUrl: string): void => {
  const key = `bowen_custom_gallery_${projectId}_${index}`;
  memoryCache.set(key, imageDataUrl);

  idbSet(key, imageDataUrl).catch((err) => console.warn('Failed to save gallery img to IndexedDB', err));

  try {
    localStorage.setItem(key, imageDataUrl);
  } catch {
    // Quota exceeded in localStorage is safely bypassed
  }

  window.dispatchEvent(new Event('project_image_updated'));
  window.dispatchEvent(new Event('storage'));
};

export const resetProjectGalleryImage = (projectId: string, index: number): void => {
  const key = `bowen_custom_gallery_${projectId}_${index}`;
  memoryCache.delete(key);
  idbDel(key).catch(() => {});

  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore
  }

  window.dispatchEvent(new Event('project_image_updated'));
  window.dispatchEvent(new Event('storage'));
};

// Video Storage & Management
export const getProjectVideo = (projectId: string, defaultVideo?: string): string => {
  const key = `bowen_custom_video_${projectId}`;
  if (memoryCache.has(key)) {
    return memoryCache.get(key) || defaultVideo || '';
  }
  try {
    const localVal = localStorage.getItem(key);
    if (localVal) {
      memoryCache.set(key, localVal);
      return localVal;
    }
  } catch {
    // Ignore
  }
  return defaultVideo || '';
};

export const setProjectVideo = (projectId: string, videoDataUrl: string): void => {
  const key = `bowen_custom_video_${projectId}`;
  memoryCache.set(key, videoDataUrl);
  idbSet(key, videoDataUrl).catch((err) => console.warn('Failed to save video to IndexedDB', err));

  try {
    // Attempt local storage for shorter URLs / identifiers
    if (videoDataUrl.length < 500000) {
      localStorage.setItem(key, videoDataUrl);
    }
  } catch {
    // Ignore quota issues
  }

  window.dispatchEvent(new Event('project_video_updated'));
  window.dispatchEvent(new Event('project_image_updated'));
  window.dispatchEvent(new Event('storage'));
};

export const resetProjectVideo = (projectId: string): void => {
  const key = `bowen_custom_video_${projectId}`;
  memoryCache.delete(key);
  idbDel(key).catch(() => {});

  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore
  }

  window.dispatchEvent(new Event('project_video_updated'));
  window.dispatchEvent(new Event('project_image_updated'));
  window.dispatchEvent(new Event('storage'));
};

// Design Sketches & Renderings Storage
export const getProjectSketchImage = (
  projectId: string,
  index: number,
  defaultImage: string
): string => {
  const key = `bowen_custom_sketch_${projectId}_${index}`;
  if (memoryCache.has(key)) {
    return memoryCache.get(key) || defaultImage;
  }
  try {
    const localVal = localStorage.getItem(key);
    if (localVal) {
      memoryCache.set(key, localVal);
      return localVal;
    }
  } catch {
    // Ignore
  }
  return defaultImage;
};

export const setProjectSketchImage = (
  projectId: string,
  index: number,
  imageDataUrl: string
): void => {
  const key = `bowen_custom_sketch_${projectId}_${index}`;
  memoryCache.set(key, imageDataUrl);
  idbSet(key, imageDataUrl).catch((err) => console.warn('Failed to save sketch to IndexedDB', err));

  try {
    if (imageDataUrl.length < 500000) {
      localStorage.setItem(key, imageDataUrl);
    }
  } catch {
    // Ignore quota issues
  }

  window.dispatchEvent(new Event('project_sketch_updated'));
  window.dispatchEvent(new Event('project_image_updated'));
  window.dispatchEvent(new Event('storage'));
};

export const resetProjectSketchImage = (projectId: string, index: number): void => {
  const key = `bowen_custom_sketch_${projectId}_${index}`;
  memoryCache.delete(key);
  idbDel(key).catch(() => {});

  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore
  }

  window.dispatchEvent(new Event('project_sketch_updated'));
  window.dispatchEvent(new Event('project_image_updated'));
  window.dispatchEvent(new Event('storage'));
};



