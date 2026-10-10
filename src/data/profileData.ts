import { ExperienceItem, SkillCategory, AwardItem, TestimonialItem, ExperimentItem } from '../types';

export const experienceData: ExperienceItem[] = [
  {
    period: '2023 — Present',
    current: true,
    role: {
      en: 'Staff Product Designer & Design Systems Architect',
      zh: '资深主任产品设计师 & 设计系统架构师',
    },
    company: 'Nexus Spatial Studio',
    location: 'Tokyo & San Francisco',
    description: {
      en: 'Directing spatial computing interaction paradigms, cross-platform design token infrastructure, and mentoring a team of 14 product designers and creative technologists.',
      zh: '主导空间计算交互范式与跨平台设计系统 Token 基础设施，指导 14 位资深设计师与前端技术专家的产品落地。',
    },
    tags: ['VisionOS', 'Design Systems', 'Team Leadership', 'Spatial UX'],
  },
  {
    period: '2021 — 2023',
    role: {
      en: 'Lead UX Technologist & Interaction Designer',
      zh: '首席 UX 技术官 & 交互设计师',
    },
    company: 'Vanguard Interactive',
    location: 'San Francisco, CA',
    description: {
      en: 'Built high-scale fintech, automotive HMI, and AI generative design tools. Partnered with Apple, Sony, and Stripe on bespoke experimental web platforms.',
      zh: '负责大型金融科技、车载智能座舱与生成式设计工具的交互架构。曾与 Apple、Sony、Stripe 联合研发先锋实验性 Web 产品。',
    },
    tags: ['Fintech UX', 'Automotive HMI', 'WebGL', 'Design Engineering'],
  },
  {
    period: '2019 — 2021',
    role: {
      en: 'Senior Product Designer',
      zh: '高级产品设计师',
    },
    company: 'Studio Monochrome',
    location: 'Berlin & Tokyo',
    description: {
      en: 'Crafted Swiss minimalist digital identities, editorial publications, and high-performance WebGL web applications for international cultural foundations.',
      zh: '为国际文化基金会与艺术机构打造纯粹的瑞士极简数字品牌、电子文献档案与高性能 WebGL 交互站点。',
    },
    tags: ['Brand Identity', 'Swiss Design', 'Creative Coding', 'Design Strategy'],
  },
  {
    period: '2017 — 2019',
    role: {
      en: 'Interaction Design & Creative Developer',
      zh: '交互设计与创意前端开发',
    },
    company: 'Hyperlink Media Lab',
    location: 'Shanghai',
    description: {
      en: 'Prototyped innovative interactive installations, canvas animations, and mobile web experiences winning 6 international web awards.',
      zh: '负责前沿新媒体艺术装置原型、Canvas 动画与移动端交互体验开发，累计斩获 6 项国际设计奖项。',
    },
    tags: ['Prototyping', 'JavaScript/Canvas', 'Mobile UX'],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    name: {
      en: 'Product & UX Design',
      zh: '产品与交互设计',
    },
    skills: [
      { name: 'Spatial & XR Interaction', level: 96, description: { en: 'VisionOS, WebXR, Hand-tracking', zh: 'VisionOS、WebXR、全息手势' } },
      { name: 'Design Systems & Tokens', level: 98, description: { en: 'Figma Variables, Token Studio, Multi-brand', zh: 'Figma 变量、Token 架构、跨端映射' } },
      { name: 'Micro-interactions & Motion', level: 95, description: { en: 'Framer Motion, Choreography, Springs', zh: '弹簧物理曲线、连贯微动效' } },
      { name: 'Information Architecture', level: 92, description: { en: 'Mental Models, User Journey Flows', zh: '心智模型、全链路用户旅程' } },
      { name: 'Automotive & HMI Systems', level: 90, description: { en: 'Glare Ergonomics, ISO Standards', zh: '抗眩光座舱、车规级人机工学' } },
    ],
  },
  {
    name: {
      en: 'Creative Engineering',
      zh: '创意工程与技术栈',
    },
    skills: [
      { name: 'React 19 & TypeScript', level: 96, description: { en: 'Modern Hooks, State Architecture', zh: '现代架构、函数式编程、类型安全' } },
      { name: 'Tailwind CSS & CSS Grid', level: 98, description: { en: 'Sub-grid, Swiss Strict Layouts', zh: '严格网格算法、无级自适应' } },
      { name: 'Three.js & WebGL / GLSL', level: 88, description: { en: 'Shaders, PBR Materials, Lighting', zh: '着色器编写、PBR 材质、光影计算' } },
      { name: 'Web Audio API Synth', level: 90, description: { en: 'Oscillators, FFT Audio Analysis', zh: '振荡器合成、实时音频分析' } },
      { name: 'Performance Optimization', level: 94, description: { en: '60/120 FPS Framerate, Zero CLS', zh: '满帧渲染、零布局抖动' } },
    ],
  },
  {
    name: {
      en: 'Strategy & Tooling',
      zh: '设计策略与工具',
    },
    skills: [
      { name: 'Figma & Principle', level: 98, description: { en: 'Advanced Components & Auto-layout', zh: '高阶组件化、自动布局' } },
      { name: 'Blender & Spline 3D', level: 86, description: { en: 'Hard-surface Modeling, Lighting', zh: '硬表面建模、产品级布光' } },
      { name: 'Design Leadership', level: 92, description: { en: 'Mentorship, RFCs, Design Sprints', zh: '设计评审机制、跨职能推动' } },
      { name: 'Internationalization (i18n)', level: 95, description: { en: 'Multi-lingual Typography, RTL/LTR', zh: '多语系排版、国际化无障碍' } },
    ],
  },
];

export const awardsData: AwardItem[] = [
  {
    year: '2025',
    title: 'Red Dot: Best of the Best',
    organization: 'Red Dot Design Award (Germany)',
    project: 'CHRONO Swiss Horology App',
  },
  {
    year: '2025',
    title: 'iF Design Gold Award',
    organization: 'iF International Forum Design (Hannover)',
    project: 'SOLARIS Hypercar Cockpit HMI',
  },
  {
    year: '2024',
    title: 'Site of the Month & Developer Award',
    organization: 'Awwwards International',
    project: 'VELOX Algorithmic Archive',
  },
  {
    year: '2024',
    title: 'Tokyo TDC Annual Book Winner',
    organization: 'Tokyo Type Directors Club (Japan)',
    project: 'Procedural Grid Typography System',
  },
  {
    year: '2023',
    title: 'FWA of the Day',
    organization: 'Favorite Website Awards (UK)',
    project: 'LUMEN Sound-Reactive Synthesizer',
  },
  {
    year: '2023',
    title: 'Good Design Award (G-Mark)',
    organization: 'Japan Institute of Design Promotion',
    project: 'Aura Merchant Payment Terminal',
  },
];

export const testimonialsData: TestimonialItem[] = [
  {
    quote: {
      en: 'Alex possesses that rarest combination: the uncompromising typographic refinement of a Swiss master coupled with the deep technical rigor of a principal software engineer.',
      zh: 'Alex 身上兼具了瑞士平面大师对排版细节近乎苛求的纯粹度，以及主任软件工程师对代码架构的严谨把控。',
    },
    author: 'Jean-Luc Morel',
    role: {
      en: 'Chief Creative Officer',
      zh: '首席创意总监',
    },
    company: 'Chrono Atelier Geneva',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  {
    quote: {
      en: 'Working with Alex accelerated our product release by 6 months. His design system scaled effortlessly across 4 global engineering squads with zero ambiguity.',
      zh: '与 Alex 的合作使我们产品的交付周期提前了整整 6 个月。他构建的设计系统无缝支撑了 4 个跨国工程团队，沟通成本几乎降为零。',
    },
    author: 'Kenji Takahashi',
    role: {
      en: 'VP of Product & Engineering',
      zh: '产品与工程副总裁',
    },
    company: 'Nexus Spatial Lab Tokyo',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
];

export const experimentsData: ExperimentItem[] = [
  {
    id: 'exp-kinetic-particles',
    title: {
      en: 'Elastic Matter & Gravitational Collisions',
      zh: '弹性物质与重力碰撞动力学',
    },
    category: 'Physics Canvas',
    description: {
      en: 'A 2D Verlet physics engine with sub-pixel collision resolution and restitution damping.',
      zh: '基于 Verlet 积分算法的 2D 物理碰撞引擎，具备亚像素级阻尼回弹特性。',
    },
    date: '2026.02',
    tags: ['Canvas 2D', 'Verlet Physics', 'Vectors'],
    type: 'canvas',
  },
  {
    id: 'exp-optical-kerning',
    title: {
      en: 'Dynamic Procedural Optical Kerning',
      zh: '动态程序化视觉字偶间距计算器',
    },
    category: 'Typography',
    description: {
      en: 'Calculates negative space area between adjacent glyph contours in real time.',
      zh: '实时计算相邻字形轮廓间的负空间面积，动态校准字偶光学间距。',
    },
    date: '2025.11',
    tags: ['OpenType', 'Glyph Math', 'Algorithms'],
    type: 'interaction',
  },
  {
    id: 'exp-harmonics-synth',
    title: {
      en: 'Harmonic Series Audiovisual Oscilloscope',
      zh: '泛音列声光双向示波器',
    },
    category: 'Web Audio',
    description: {
      en: 'Synthesizes pure sine waves into additive overtone spectra with reactive Lissajous curves.',
      zh: '将纯正弦波叠加为复合泛音频谱，并实时生成互动的利萨如图形曲线。',
    },
    date: '2025.08',
    tags: ['Web Audio API', 'Lissajous', 'DSP'],
    type: 'audio',
  },
];
