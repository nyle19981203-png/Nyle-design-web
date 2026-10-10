export type Language = 'en' | 'zh';

export type ProjectCategory = 'all' | 'product' | 'brand' | 'code' | 'motion' | 'spatial';

export interface DesignTokenPalette {
  name: string;
  hex: string;
  role: string;
}

export interface DesignTokenTypography {
  role: string;
  font: string;
  sample: string;
}

export interface ProjectMetric {
  metric: string;
  label: Record<Language, string>;
}

export interface ProjectAward {
  id?: string;
  title: Record<Language, string>;
  prize: Record<Language, string>;
  org?: Record<Language, string>;
  year?: string;
}

export interface ProjectCoreTechnology {
  name: Record<Language, string>;
  subName?: Record<Language, string>;
  badge: string;
}

export interface ProjectSketch {
  titleZh: string;
  titleEn: string;
  tagZh: string;
  tagEn: string;
  defaultImg: string;
}

export interface Project {
  id: string;
  slug: string;
  title: Record<Language, string>;
  subtitle: Record<Language, string>;
  tagline: Record<Language, string>;
  year: string;
  category: 'product' | 'brand' | 'code' | 'motion' | 'spatial';
  categoryLabel?: Record<Language, string>;
  client: string;
  role: Record<Language, string>;
  duration: Record<Language, string>;
  heroImage: string;
  thumbnail: string;
  gallery: string[];
  accentColor: string; // Hex color for flat badge and borders
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
  tags: string[];
  overview: Record<Language, string>;
  challenge: Record<Language, string>;
  solution: Record<Language, string>;
  impact: ProjectMetric[];
  deliverables: Record<Language, string[]>;
  techStack: string[];
  awards?: ProjectAward[];
  coreTechnologies?: ProjectCoreTechnology[];
  sketches?: ProjectSketch[];
  designTokens: {
    palette: DesignTokenPalette[];
    typography: DesignTokenTypography[];
  };
}

export interface ExperienceItem {
  period: string;
  role: Record<Language, string>;
  company: string;
  location: string;
  description: Record<Language, string>;
  tags: string[];
  current?: boolean;
}

export interface SkillCategory {
  name: Record<Language, string>;
  skills: {
    name: string;
    level: number; // 1-100
    iconName?: string;
    description?: Record<Language, string>;
  }[];
}

export interface AwardItem {
  year: string;
  title: string;
  organization: string;
  project: string;
  link?: string;
}

export interface TestimonialItem {
  quote: Record<Language, string>;
  author: string;
  role: Record<Language, string>;
  company: string;
  avatar: string;
}

export interface ExperimentItem {
  id: string;
  title: Record<Language, string>;
  category: string;
  description: Record<Language, string>;
  date: string;
  tags: string[];
  type: 'canvas' | 'audio' | 'interaction' | 'shader';
}
