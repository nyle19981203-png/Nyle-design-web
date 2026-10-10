import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, 
  FileText, 
  Minimize2, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  Eye, 
  RefreshCw 
} from 'lucide-react';
import { playClickSound } from '../utils/sound';
import { Language } from '../types';

interface PdfViewerSectionProps {
  currentLang: Language;
}

// Generate a valid minimal PDF 1.4 blob for initial presentation
function createDefaultPortfolioPdf(): string {
  const pdfString = `%PDF-1.4
%âãÏÓ
1 0 obj
<<
  /Type /Catalog
  /Pages 2 0 R
>>
endobj
2 0 obj
<<
  /Type /Pages
  /Kids [3 0 R]
  /Count 1
>>
endobj
3 0 obj
<<
  /Type /Page
  /Parent 2 0 R
  /MediaBox [0 0 595 842]
  /Contents 4 0 R
  /Resources <<
    /Font <<
      /F1 5 0 R
      /F2 6 0 R
    >>
  >>
>>
endobj
4 0 obj
<<
  /Length 780
>>
stream
0.08 0.08 0.08 rg
0 0 595 842 re
f
1 1 1 rg
40 790 515 2 re
f
BT
/F1 22 Tf
1 1 1 rg
40 750 Td
(BOWEN ZHANG - PORTFOLIO & CURRICULUM VITAE) Tj
0 -26 Td
/F2 12 Tf
0.75 0.75 0.75 rg
(SPATIAL INSTALLATION & COMMERCIAL DISPLAY DESIGNER) Tj
0 -36 Td
/F1 14 Tf
1 1 1 rg
(KEY PROJECT: PUGE ADU - PUBLIC SPACE ART PLAN) Tj
0 -20 Td
/F2 10 Tf
0.7 0.7 0.7 rg
(3 Theme Sculptures | 6 Interactive Audio Installations | 2 Local In-situ Works) Tj
0 -30 Td
/F1 12 Tf
1 1 1 rg
(PROFESSIONAL PROFILE) Tj
0 -18 Td
/F2 9 Tf
0.65 0.65 0.65 rg
(7+ years deep expertise across Art, Spatial Computing, and Creative Technology.) Tj
0 -14 Td
(Led 20+ public art and commercial display installations with 99% on-time delivery rate.) Tj
0 -14 Td
(PS / C4D / CAD / PR / Generative AI workflow from ideation to site delivery.) Tj
0 -30 Td
/F1 12 Tf
1 1 1 rg
(CONTACT ARCHIVE) Tj
0 -18 Td
/F2 9 Tf
0.65 0.65 0.65 rg
(Email: 775879800@qq.com  |  WeChat: NYLELYW  |  Tel: 17857326814) Tj
0 -14 Td
(Location: Hangzhou / Shanghai, China) Tj
ET
endstream
endobj
5 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica-Bold
>>
endobj
6 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica
>>
endobj
xref
0 7
0000000000 65535 f 
0000000018 00000 n 
0000000077 00000 n 
0000000136 00000 n 
0000000282 00000 n 
0000001115 00000 n 
0000001198 00000 n 
trailer
<<
  /Size 7
  /Root 1 0 R
>>
startxref
1276
%%EOF`;

  const blob = new Blob([pdfString], { type: 'application/pdf' });
  return URL.createObjectURL(blob);
}

export const PdfViewerSection: React.FC<PdfViewerSectionProps> = ({ currentLang }) => {
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const [fileName, setFileName] = useState<string>('张博文-空间装置与公共艺术作品集.pdf');
  const [fileSize, setFileSize] = useState<string>('1.8 MB');
  const [uploadDate, setUploadDate] = useState<string>('2026-10-10');
  const [isCustomFile, setIsCustomFile] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize default PDF
  useEffect(() => {
    // Check if user previously uploaded a PDF in localStorage
    const savedName = localStorage.getItem('bowen_custom_pdf_name');
    const savedData = localStorage.getItem('bowen_custom_pdf_data');
    const savedSize = localStorage.getItem('bowen_custom_pdf_size');
    const savedDate = localStorage.getItem('bowen_custom_pdf_date');

    if (savedName && savedData) {
      try {
        setPdfUrl(savedData);
        setFileName(savedName);
        if (savedSize) setFileSize(savedSize);
        if (savedDate) setUploadDate(savedDate);
        setIsCustomFile(true);
        return;
      } catch (e) {
        console.error('Failed to load cached PDF', e);
      }
    }

    const defaultUrl = createDefaultPortfolioPdf();
    setPdfUrl(defaultUrl);

    return () => {
      if (defaultUrl.startsWith('blob:')) {
        URL.revokeObjectURL(defaultUrl);
      }
    };
  }, []);

  const handleFile = (file: File) => {
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      alert(currentLang === 'zh' ? '请上传标准的 PDF 格式文件 (.pdf)' : 'Please upload a valid PDF file (.pdf)');
      return;
    }

    const sizeInMb = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
    const today = new Date().toISOString().split('T')[0];

    const objectUrl = URL.createObjectURL(file);
    setPdfUrl(objectUrl);
    setFileName(file.name);
    setFileSize(sizeInMb);
    setUploadDate(today);
    setIsCustomFile(true);
    setUploadSuccess(true);
    playClickSound();

    setTimeout(() => {
      setUploadSuccess(false);
    }, 3000);

    // Save to localStorage if under 4MB for quick persistence
    if (file.size < 4 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const base64 = reader.result as string;
          localStorage.setItem('bowen_custom_pdf_data', base64);
          localStorage.setItem('bowen_custom_pdf_name', file.name);
          localStorage.setItem('bowen_custom_pdf_size', sizeInMb);
          localStorage.setItem('bowen_custom_pdf_date', today);
        } catch (e) {
          console.warn('LocalStorage limit reached for PDF storage', e);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleResetToDefault = () => {
    playClickSound();
    localStorage.removeItem('bowen_custom_pdf_data');
    localStorage.removeItem('bowen_custom_pdf_name');
    localStorage.removeItem('bowen_custom_pdf_size');
    localStorage.removeItem('bowen_custom_pdf_date');

    const defaultUrl = createDefaultPortfolioPdf();
    setPdfUrl(defaultUrl);
    setFileName('张博文-空间装置与公共艺术作品集.pdf');
    setFileSize('1.8 MB');
    setUploadDate('2026-10-10');
    setIsCustomFile(false);
  };

  const handleDownload = () => {
    playClickSound();
    if (!pdfUrl) return;
    const a = document.createElement('a');
    a.href = pdfUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleOpenInNewTab = () => {
    playClickSound();
    if (!pdfUrl) return;
    window.open(pdfUrl, '_blank');
  };

  return (
    <div className="space-y-4">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf,.pdf"
        className="hidden"
        onChange={handleFileInputChange}
      />

      {/* Top Controls & Status Bar */}
      <div className="p-4 bg-[#151515] border border-[#282828] flex flex-wrap items-center justify-between gap-3">
        {/* File info */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2 bg-[#0c0c0c] border border-[#222] text-white">
            <FileText className="w-5 h-5 text-red-400" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-white truncate max-w-[220px] sm:max-w-[340px]">
                {fileName}
              </span>
              {isCustomFile ? (
                <span className="px-1.5 py-0.5 bg-emerald-950/60 text-emerald-400 border border-emerald-800/80 text-[10px] font-mono uppercase tracking-wider shrink-0">
                  {currentLang === 'zh' ? '已自定义' : 'Custom'}
                </span>
              ) : (
                <span className="px-1.5 py-0.5 bg-[#222] text-[#888] border border-[#333] text-[10px] font-mono uppercase tracking-wider shrink-0">
                  {currentLang === 'zh' ? '示范文档' : 'Sample'}
                </span>
              )}
            </div>
            <div className="text-[11px] font-mono text-[#888] flex items-center gap-2 mt-0.5">
              <span>{fileSize}</span>
              <span>·</span>
              <span>{uploadDate}</span>
              {uploadSuccess && (
                <span className="text-emerald-400 flex items-center gap-1 font-sans text-[11px] animate-fadeIn">
                  <CheckCircle2 className="w-3 h-3" />
                  {currentLang === 'zh' ? '上传成功' : 'Uploaded!'}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Upload Button */}
          <button
            onClick={() => {
              playClickSound();
              fileInputRef.current?.click();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-black hover:bg-neutral-200 text-xs font-mono font-bold tracking-wider uppercase transition-colors"
            title={currentLang === 'zh' ? '上传新的 PDF 文件' : 'Upload new PDF'}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{currentLang === 'zh' ? '上传 PDF' : 'Upload PDF'}</span>
          </button>

          {/* Preview button */}
          <button
            onClick={() => {
              playClickSound();
              setIsFullscreen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#181818] hover:bg-[#252525] text-white border border-[#333] text-xs font-mono uppercase tracking-wider transition-colors"
            title={currentLang === 'zh' ? '预览 PDF 内容' : 'Preview PDF'}
          >
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            <span>{currentLang === 'zh' ? '预览 PDF' : 'Preview'}</span>
          </button>

          {/* Open in new tab */}
          <button
            onClick={handleOpenInNewTab}
            className="p-1.5 bg-[#111] hover:bg-[#222] text-white border border-[#333] transition-colors"
            title={currentLang === 'zh' ? '新标签页打开' : 'Open in New Tab'}
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          {/* Download */}
          <button
            onClick={handleDownload}
            className="p-1.5 bg-[#111] hover:bg-[#222] text-white border border-[#333] transition-colors"
            title={currentLang === 'zh' ? '下载此 PDF' : 'Download PDF'}
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          {/* Reset if custom */}
          {isCustomFile && (
            <button
              onClick={handleResetToDefault}
              className="p-1.5 bg-[#111] hover:bg-red-950/60 hover:text-red-400 text-[#888] border border-[#333] transition-colors"
              title={currentLang === 'zh' ? '恢复默认示范' : 'Reset to Sample'}
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Drag & Drop Upload Zone (Compact & responsive) */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => {
          playClickSound();
          fileInputRef.current?.click();
        }}
        className={`p-4 border-2 border-dashed cursor-pointer transition-all flex items-center justify-between gap-4 ${
          isDragging
            ? 'border-white bg-white/10 text-white'
            : 'border-[#282828] bg-[#0d0d0d] hover:border-[#444] text-[#888] hover:text-[#CCC]'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-[#181818] border border-[#262626] text-white">
            <Upload className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              {currentLang === 'zh'
                ? '点击选择本地 PDF 或直接拖拽文件到这里'
                : 'Click to choose local PDF or drag & drop here'}
            </p>
            <p className="text-[11px] font-mono text-[#777] mt-0.5">
              {currentLang === 'zh'
                ? '支持完整多页 PDF 文档 · 随时在线预览与下载'
                : 'Supports full multi-page PDF documents · Instant preview & download'}
            </p>
          </div>
        </div>

        <span className="text-[11px] font-mono px-2.5 py-1 bg-[#1a1a1a] text-white border border-[#333] uppercase tracking-wider shrink-0">
          {currentLang === 'zh' ? '选择文件' : 'Browse'}
        </span>
      </div>

      {/* Fullscreen Overlay Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col p-3 sm:p-6 animate-fadeIn">
          {/* Modal Header */}
          <div className="flex items-center justify-between bg-[#151515] border border-[#282828] p-4 mb-3">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-red-400" />
              <div>
                <h3 className="text-white font-mono font-bold text-sm">{fileName}</h3>
                <p className="text-[11px] font-mono text-[#888]">{fileSize} · {uploadDate}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  playClickSound();
                  fileInputRef.current?.click();
                }}
                className="px-3 py-1.5 bg-white text-black text-xs font-mono font-bold uppercase"
              >
                {currentLang === 'zh' ? '更换 PDF' : 'Replace PDF'}
              </button>
              <button
                onClick={handleDownload}
                className="px-3 py-1.5 bg-[#111] hover:bg-[#222] text-white border border-[#333] text-xs font-mono uppercase"
              >
                {currentLang === 'zh' ? '下载' : 'Download'}
              </button>
              <button
                onClick={() => {
                  playClickSound();
                  setIsFullscreen(false);
                }}
                className="p-1.5 bg-[#222] hover:bg-white hover:text-black text-white transition-colors"
                title="关闭全屏 (ESC)"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Iframe */}
          <div className="flex-1 w-full bg-[#181818] border border-[#282828] overflow-hidden">
            <iframe
              src={`${pdfUrl}#toolbar=1&navpanes=1`}
              className="w-full h-full border-0"
              title="Fullscreen PDF Preview"
            />
          </div>
        </div>
      )}
    </div>
  );
};
