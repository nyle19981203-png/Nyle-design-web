import React, { useState } from 'react';
import { Mail, Copy, Check, Send, MapPin, MessageSquare, QrCode, ArrowUpRight, Sparkles, Clock, Globe } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { playClickSound, playPopSound } from '../utils/sound';
import { InteractiveHeading } from './InteractiveHeading';
import wechatQrImage from '../assets/images/regenerated_image_1791539457744.jpg';

interface ContactSectionProps {
  currentLang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: t.contact.form.types[0],
    budget: t.contact.form.budgets[1],
    message: '',
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showWechatQR, setShowWechatQR] = useState(false);

  const directEmail = '775879800@qq.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(directEmail);
    playPopSound(880, 'sine', 0.04);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    playClickSound();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      playPopSound(600, 'triangle', 0.1);
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          projectType: t.contact.form.types[0],
          budget: t.contact.form.budgets[1],
          message: '',
        });
        setIsSubmitted(false);
      }, 5000);
    }, 1200);
  };

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com', handle: '@alexchen-design' },
    { name: 'Figma Community', url: 'https://figma.com', handle: '@alexchen' },
    { name: 'Dribbble', url: 'https://dribbble.com', handle: 'alexchen-pro' },
    { name: 'Twitter / X', url: 'https://x.com', handle: '@alexchen_ux' },
    { name: 'LinkedIn', url: 'https://linkedin.com', handle: 'alex-chen-craft' },
    { name: 'ReadCV', url: 'https://read.cv', handle: 'alexchen' },
  ];

  return (
    <section id="contact-section" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 text-[10px] font-mono text-[#888] uppercase tracking-[0.3em] mb-2">
          <div className="w-6 h-[1px] bg-white"></div>
          <span>{t.contact.badge}</span>
        </div>
        <InteractiveHeading
          as="h2"
          text={t.contact.title}
          className="text-3xl sm:text-5xl font-black italic text-white tracking-tighter font-display uppercase leading-tight"
        />
        <p className="text-[#888] text-sm sm:text-base mt-2 max-w-2xl font-sans font-light leading-relaxed">
          {t.contact.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Direct Info, Copy Email, WeChat & Socials */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Copy Email Box */}
          <div className="p-6 sm:p-8 bg-[#151515] border border-[#282828] space-y-4">
            <span className="text-[10px] font-mono text-[#888] uppercase tracking-[0.2em] block">
              {t.contact.emailLabel}
            </span>
            <div className="flex items-center justify-between p-3.5 bg-[#080808] border border-[#222] font-mono text-xs sm:text-sm text-white">
              <span className="truncate">{directEmail}</span>
              <button
                id="copy-email-btn"
                onClick={handleCopyEmail}
                className="p-2 bg-[#1a1a1a] hover:bg-white hover:text-black text-white transition-colors border border-[#333]"
                title={t.contact.copyEmail}
              >
                {copiedEmail ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            {copiedEmail && (
              <span className="text-xs font-mono text-white block uppercase tracking-wider animate-fadeIn">
                ✓ {t.contact.copiedEmail}
              </span>
            )}
          </div>

          {/* Direct WeChat & QR trigger */}
          <div className="p-6 bg-[#151515] border border-[#282828] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs font-mono text-white font-medium">
              微信：NYLELYW，联系电话：17857326814
            </div>
            <button
              onClick={() => {
                playClickSound();
                setShowWechatQR(!showWechatQR);
              }}
              className="px-3.5 py-1.5 bg-[#111] hover:bg-[#1a1a1a] border border-[#222] hover:border-white text-xs font-mono text-white flex items-center gap-2 uppercase tracking-wider transition-colors shrink-0"
            >
              <QrCode className="w-3.5 h-3.5 text-white" />
              <span>{t.contact.viewWechatQR}</span>
            </button>
          </div>

          {/* Social Links List */}
          <div className="p-6 bg-[#151515] border border-[#282828]">
            <span className="text-[10px] font-mono text-[#888] uppercase tracking-[0.2em] block mb-4">
              {t.contact.socials}
            </span>
            <div className="grid grid-cols-2 gap-2">
              {socialLinks.map((s, idx) => (
                <a
                  key={idx}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playClickSound()}
                  className="p-3 bg-[#111] hover:bg-white hover:text-black border border-[#222] text-xs font-mono flex items-center justify-between text-[#AAA] transition-colors group"
                >
                  <span className="group-hover:text-black uppercase text-[11px] tracking-wider">{s.name}</span>
                  <ArrowUpRight className="w-3 h-3 text-[#666] group-hover:text-black" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Inquiry Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-10 bg-[#151515] border border-[#282828] space-y-6"
          >
            {isSubmitted ? (
              <div className="py-16 text-center space-y-4 animate-fadeIn">
                <div className="w-12 h-12 bg-white text-black rounded-none flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h3 className="text-2xl font-black italic font-display uppercase tracking-tight text-white">
                  INQUIRY TRANSMITTED
                </h3>
                <p className="text-xs font-mono text-[#888] max-w-md mx-auto leading-relaxed">
                  {t.contact.form.success}
                </p>
              </div>
            ) : (
              <>
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-mono text-[#888] uppercase tracking-[0.2em] mb-2">
                      {t.contact.form.name} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t.contact.form.namePlaceholder}
                      className="w-full px-4 py-3 bg-[#111] border border-[#222] text-white placeholder-[#666] text-xs font-mono focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-[#888] uppercase tracking-[0.2em] mb-2">
                      {t.contact.form.email} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t.contact.form.emailPlaceholder}
                      className="w-full px-4 py-3 bg-[#111] border border-[#222] text-white placeholder-[#666] text-xs font-mono focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>

                {/* Project Category Selection */}
                <div>
                  <label className="block text-[10px] font-mono text-[#888] uppercase tracking-[0.2em] mb-2">
                    {t.contact.form.projectType}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {t.contact.form.types.map((type, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => {
                          playClickSound();
                          setFormData({ ...formData, projectType: type });
                        }}
                        className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider border transition-colors ${
                          formData.projectType === type
                            ? 'bg-white text-black border-white font-bold'
                            : 'bg-[#111] text-[#888] border-[#222] hover:text-white'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget Range Selection */}
                <div>
                  <label className="block text-[10px] font-mono text-[#888] uppercase tracking-[0.2em] mb-2">
                    {t.contact.form.budget}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {t.contact.form.budgets.map((b, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => {
                          playClickSound();
                          setFormData({ ...formData, budget: b });
                        }}
                        className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider border transition-colors ${
                          formData.budget === b
                            ? 'bg-white text-black border-white font-bold'
                            : 'bg-[#111] text-[#888] border-[#222] hover:text-white'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message Scope Textarea */}
                <div>
                  <label className="block text-[10px] font-mono text-[#888] uppercase tracking-[0.2em] mb-2">
                    {t.contact.form.message} *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t.contact.form.messagePlaceholder}
                    className="w-full px-4 py-3 bg-[#111] border border-[#222] text-white placeholder-[#666] text-xs font-mono focus:outline-none focus:border-white leading-relaxed resize-none transition-colors"
                  ></textarea>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-white hover:bg-[#E5E5E5] text-black font-mono font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? t.contact.form.submitting : t.contact.form.submit}</span>
                </button>
              </>
            )}
          </form>
        </div>
      </div>

      {/* WeChat QR Code Modal */}
      {showWechatQR && (
        <div
          id="wechat-modal"
          onClick={() => setShowWechatQR(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="p-8 bg-[#151515] border border-[#282828] text-center space-y-4 max-w-xs"
          >
            <h4 className="text-xs font-bold font-mono text-white uppercase tracking-widest">
              WECHAT / 微信联络
            </h4>
            <div className="w-48 h-48 bg-white p-2 mx-auto flex items-center justify-center">
              <img
                src={wechatQrImage}
                alt="WeChat QR Code"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-xs font-mono text-[#888] uppercase">WeChat ID: NYLELYW</p>
            <p className="text-xs font-mono text-white">TEL: 17857326814</p>
            <button
              onClick={() => setShowWechatQR(false)}
              className="w-full py-2 bg-[#111] hover:bg-[#222] border border-[#333] text-white text-xs font-mono uppercase tracking-wider"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
