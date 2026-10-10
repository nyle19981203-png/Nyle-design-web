import { Project } from '../types';
import comingSoonProductImg from '../assets/images/coming_soon_product_1791532482736.jpg';

export const projectsData: Project[] = [
  {
    id: 'nexus-os',
    slug: 'lunar-drift-d1e',
    title: {
      en: 'Lunar Drift — Lunar Rover D1E',
      zh: 'Lunar Drift—月行 D1E号',
    },
    subtitle: {
      en: 'Exploring multi-civilization dimensions and the authenticity of our reality based on the sci-fi concept of the Lunar Matrix.',
      zh: '根据“月球矩阵”的科幻概念由此生发对于多个文明维度的关系以及对于我们存在的现实世界的真实性进行探讨与思考',
    },
    tagline: {
      en: 'An anomalous craft projected from the lunar matrix: Is another civilization peering into our reality, and is everything we perceive truly real?',
      zh: '由月球矩阵投影而来的异形载具，是否有其他文明在窥视着我们的一切，我们的一切是否真实？',
    },
    year: '2023',
    category: 'spatial',
    categoryLabel: {
      en: 'Interactive Art Installation',
      zh: '交互艺术装置',
    },
    client: '',
    role: {
      en: '',
      zh: '',
    },
    duration: {
      en: '2 Months',
      zh: '2个月',
    },
    heroImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
    ],
    accentColor: '#CCFF00', // Electric lime
    featured: true,
    liveUrl: 'https://spatial.nexus-os.design',
    githubUrl: 'https://github.com/alexchen/nexus-spatial-core',
    tags: ['Spatial Computing', 'VisionOS', 'WebXR', 'Micro-interactions', 'Three.js'],
    overview: {
      en: 'Is our world real?\nIs our reality merely a projection of a higher civilization?\nIs our world a virtual simulation where we are merely characters?\nLooking up at the sky is a shared human instinct, yet personal perceptions of the moon vary widely. This creation originates from the concept of the "Lunar Matrix," presented across the water stage of Wuzhen. As the lunar matrix casts illusionary projections onto Earth, are we all lost in the simulated lives fashioned by virtual imagery? Reflecting on this theme against the backdrop of the Theatre Festival, we crafted an interdimensional vessel from the "Matrix," slowly descending into the silent darkness.',
      zh: '我们的世界是否真实？\n我们的世界是否只是高等文明的投影？\n我们的世界是否是一场虚拟的游戏，而我们只是其中的角色？\n仰望是人类的共同本能，如果从个人经验出发，对于月亮的看法也各不相同。本次创作由月球矩阵这一设想生发，并依托于乌镇水上空间呈现。月球矩阵将虚幻的投影投射向地球，我们是否也都迷失在虚拟影像所创造出的虚假生活之中？出于对此话题的思考以及戏剧节的背景基调我们创造出从“矩阵”中来的异维载具，在寂静的黑暗中缓缓降落。',
    },
    challenge: {
      en: 'Traditional 2D design heuristics break down in 3-dimensional volume. Users suffered from arm fatigue in free-air gestures and optical parallax errors with inconsistent depth planes.',
      zh: '传统的 2D 界面启发式原则在三维空间中面临巨大挑战。用户常因大范围的空中悬浮手势感到手臂肌肉疲劳，并因景深平面不一致产生视差对焦偏差。',
    },
    solution: {
      en: 'We engineered "Micro-Flick" haptics and a 3-tier Z-index hierarchy (Ambient, Workspace, Focus) locked to the user\'s natural resting forearm posture, cutting fatigue by 64% while maintaining sub-millimeter precision.',
      zh: '我们设计了“微幅轻弹（Micro-Flick）”触觉机制与三级 Z 轴景深架构（环境层、工作台层、焦点层），依循用户手臂自然静止状态的人机工学，使肌肉疲劳度降低 64% 并保持亚毫米级定位精度。',
    },
    impact: [
      {
        metric: '公共空间',
        label: {
          en: 'Public Space Performance Plan',
          zh: '展演计划',
        },
      },
      {
        metric: '18ms',
        label: {
          en: 'End-to-End Motion-to-Photon Latency',
          zh: '端到端动子光子超低延迟',
        },
      },
      {
        metric: '120k+',
        label: {
          en: 'Spatial Kit GitHub Clones',
          zh: '开源空间套件克隆下载量',
        },
      },
    ],
    deliverables: {
      en: ['VisionOS UI Kit & Figma Tokens', 'Spatial Raycast Engine (Three.js/WebXR)', 'Interactive Design System Documentation', 'Sound Haptics Synthesizer'],
      zh: ['VisionOS UI 套件与 Figma Token 库', '空间光线投射引擎 (Three.js/WebXR)', '交互式设计系统全套文档', '触觉声音反馈合成模块'],
    },
    awards: [
      {
        id: 'nexus-award-1',
        title: {
          zh: '第二十届亚洲设计学年奖',
          en: '20th Asian Design Academic Annual Award',
        },
        prize: {
          zh: '银奖',
          en: 'Silver Prize',
        },
        org: {
          zh: '亚洲设计学年奖组委会 · 2022',
          en: 'Asian Design Annual Academic Awards · 2022',
        },
      },
      {
        id: 'nexus-award-2',
        title: {
          zh: '第六届国青杯全国高校艺术设计大赛',
          en: '6th National Youth Cup Art & Design Competition',
        },
        prize: {
          zh: '学生组一等奖',
          en: '1st Prize (Student)',
        },
        org: {
          zh: '国青杯全国高校艺术设计大赛组委会',
          en: 'National Youth Art & Design Competition',
        },
      },
      {
        id: 'nexus-award-3',
        title: {
          zh: '第八届中国国际“互联网+”大学生创新创业大赛',
          en: '8th China Int’l College Students Innovation Competition',
        },
        prize: {
          zh: '银奖',
          en: 'Silver Prize',
        },
        org: {
          zh: '中国国际大学生创新大赛',
          en: 'China International College Students Innovation Competition',
        },
      },
      {
        id: 'nexus-award-4',
        title: {
          zh: '第八届乌镇戏剧节公共空间艺术展演计划',
          en: '8th Wuzhen Theatre Festival Public Space Art Exhibition',
        },
        prize: {
          zh: '一等奖',
          en: '1st Prize',
        },
        org: {
          zh: '乌镇戏剧节组委会 · 公共空间艺术展演计划',
          en: 'Wuzhen Theatre Festival · Public Space Art Exhibition Project',
        },
      },
    ],
    coreTechnologies: [
      {
        name: { zh: 'C4D 三维建模与渲染', en: 'Cinema 4D (C4D) 3D Modeling & Rendering' },
        subName: { zh: 'C4D 三维建模与渲染', en: 'Cinema 4D 3D Modeling & Rendering' },
        badge: '3D/MOTION',
      },
      {
        name: { zh: 'AutoCAD 空间工程制图', en: 'AutoCAD Spatial Drafting' },
        subName: { zh: '空间工程制图', en: 'Spatial Drafting' },
        badge: 'CAD/SPEC',
      },
      {
        name: { zh: 'Arduino 程序与固件开发', en: 'Arduino Firmware & Embedded C++' },
        subName: { zh: '嵌入式固件开发', en: 'Embedded C++' },
        badge: 'EMBEDDED',
      },
      {
        name: { zh: '交互传感技术 (ToF / 距离 / 压力)', en: 'Interactive Sensors & Sensing Systems' },
        subName: { zh: '交互传感技术', en: 'Interactive Sensors' },
        badge: 'SENSORS',
      },
      {
        name: { zh: 'Rhino & Grasshopper 参数化建模', en: 'Rhino & Grasshopper Parametric Design' },
        subName: { zh: '参数化空间建模', en: 'Parametric Design' },
        badge: 'PARAMETRIC',
      },
      {
        name: { zh: '硬件驱动与多轴电机控制', en: 'Actuator & Motor Motion Control Circuitry' },
        subName: { zh: '多轴电机运动控制', en: 'Motor Motion Control' },
        badge: 'HARDWARE',
      },
      {
        name: { zh: '实时信号采集与通信协议', en: 'Real-time Signal I/O & Serial Protocols' },
        subName: { zh: '实时串口通信协议', en: 'Serial Protocols' },
        badge: 'I/O PROTOCOL',
      },
      {
        name: { zh: '空间声光互动同步系统', en: 'Spatial Audio-Visual Interactive Sync' },
        subName: { zh: '声光互动同步系统', en: 'Audio-Visual Sync' },
        badge: 'SPATIAL HCI',
      },
    ],
    techStack: ['TypeScript', 'Three.js', 'WebXR API', 'Tailwind CSS', 'Figma Tokens API', 'Web Audio API'],
    designTokens: {
      palette: [
        { name: 'Neon Apex', hex: '#CCFF00', role: 'Primary Accent & Eye Focus Indicator' },
        { name: 'Obsidian Void', hex: '#08090D', role: 'Spatial Canvas & Background Depth' },
        { name: 'Surface Flat', hex: '#141722', role: 'Floating Panel Flat Container' },
        { name: 'High Contrast Text', hex: '#F3F4F8', role: 'Primary Typographic Readability' },
      ],
      typography: [
        { role: 'Spatial Display', font: 'Syne 800', sample: 'NEXUS SYSTEM v4.2' },
        { role: 'Interface Body', font: 'Plus Jakarta Sans Medium', sample: 'Dynamic gesture tracking initialized at 120 FPS' },
        { role: 'Telemetry Mono', font: 'JetBrains Mono 600', sample: 'DEPTH_Z: 420.8mm | DELTA: 0.04ms' },
      ],
    },
  },
  {
    id: 'chrono-swiss',
    slug: 'chrono-swiss-horology',
    title: {
      en: 'Harper’s BAZAAR · From China — 1st Intangible Cultural Heritage Future Design Awards',
      zh: '时尚芭莎·来自中国——首届非遗未来设计大赏',
    },
    subtitle: {
      en: 'A visual feast where contemporary fashion collides with Chinese traditional intangible cultural heritage',
      zh: '是一场现代时尚与中国传统非遗文化碰撞的视觉盛宴',
    },
    tagline: {
      en: 'Translating centuries of mechanical escapement mastery into tactile flat digital interactions.',
      zh: '将数百年的瑞士机械擒纵工艺升华为富有触感的扁平数字交互。',
    },
    year: '2026',
    category: 'product',
    client: '',
    role: {
      en: '',
      zh: '',
    },
    duration: {
      en: '6 Months',
      zh: '6 个月',
    },
    heroImage: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80',
    ],
    accentColor: '#00F0FF', // Electric Cyan
    featured: true,
    liveUrl: 'https://chrono-time.design',
    githubUrl: 'https://github.com/alexchen/chrono-core',
    tags: ['Product Design', 'Swiss Style', 'Mobile UX', 'Bluetooth BLE', 'Data Vis'],
    overview: {
      en: 'In the "Harper\'s BAZAAR · From China" 1st Intangible Cultural Heritage Future Design Awards, we believe that intangible cultural heritage is never a dust-laden relic, but a living cultural gene evolving with the times. The regional tribute of the Yu era was the intangible heritage of that age; the connoisseurship of superfluous things under Wen Zhenheng\'s pen was the intangible heritage of Xu Xiake\'s era. Today, we invite every craftsman, heritage inheritor, designer, and cultural creator to breathe new life into tradition with contemporary aesthetics and wisdom.',
      zh: '“时尚芭莎·来自中国”首届非遗未来设计大赏中我们相信，非遗从来不是尘封的遗产，而是鲜活的、与时代同行的文化基因。大禹时代的物产上贡是那时的非遗，文震亨笔下的长物清赏是徐霞客时代的非遗，而今天，我们邀请每一位手工艺人、非遗传承人、设计师与文化创作者，用当代的审美与智慧，为传统赋予新的生命',
    },
    challenge: {
      en: 'Horology enthusiasts demand uncompromising visual perfection and purist craftsmanship. Traditional skeuomorphic apps looked dated and cluttered.',
      zh: '钟表藏家对美学纯粹度与工艺细节有着近乎偏执的要求。市场上充斥着拟物化的反光金属仿制品，既显得陈旧又干扰核心读时体验。',
    },
    solution: {
      en: 'Adopted pure international Swiss typography principles (Akzidenz-Grotesk styling, strict 4pt baseline grid, zero artificial gradients) combined with 120Hz haptic feedback reproducing the crisp click of a 28,800 vph escapement.',
      zh: '回归纯粹的瑞士国际主义平面排版系统（严格的 4pt 基准网格、纯平色块、零冗余阴影），并结合 120Hz 线性马达精准还原 28,800 振频机芯清脆的擒纵齿轮咬合触感。',
    },
    impact: [
      {
        metric: '4.9★',
        label: {
          en: 'App Store Rating across 18 Countries',
          zh: '全球 18 国 App Store 均分',
        },
      },
      {
        metric: '±0.1s',
        label: {
          en: 'Acoustic Escapement Timing Precision',
          zh: '声学擒纵日差检测精度',
        },
      },
      {
        metric: 'Red Dot',
        label: {
          en: 'Best of the Best 2025 Winner',
          zh: '荣获红点最高荣誉最佳设计奖',
        },
      },
    ],
    deliverables: {
      en: ['Complete iOS/iPadOS Design Architecture', 'Micro-haptics Engine', 'Acoustic Sound Frequency Visualizer', 'Interactive Swiss Complication Widget'],
      zh: ['全套 iOS/iPadOS 界面与交互架构', '微触觉震动反馈引擎', '摆轮声学频谱可视化控件', '瑞士天体历法组件系统'],
    },
    awards: [
      {
        id: 'chrono-award-1',
        title: {
          zh: '红点设计大奖：Best of the Best',
          en: 'Red Dot Award: Best of the Best 2025',
        },
        prize: {
          zh: '最高荣誉奖',
          en: 'Best of the Best',
        },
        org: {
          zh: '德国红点设计机构 · 钟表与数字应用组',
          en: 'Red Dot Design Zentrum Nordrhein Westfalen',
        },
      },
      {
        id: 'chrono-award-2',
        title: {
          zh: '瑞士国家设计大奖',
          en: 'Swiss Design Awards Finalist',
        },
        prize: {
          zh: '年度入围奖',
          en: 'Official Selection',
        },
        org: {
          zh: '瑞士联邦文化办公室 (FOC)',
          en: 'Federal Office of Culture (FOC) Switzerland',
        },
      },
      {
        id: 'chrono-award-3',
        title: {
          zh: 'Apple Design Awards 苹果设计大奖',
          en: 'Apple Design Awards Nominee',
        },
        prize: {
          zh: '精工交互提名',
          en: 'Interaction Finalist',
        },
        org: {
          zh: 'Apple Inc. · WWDC 2025',
          en: 'Apple Inc. · WWDC 2025',
        },
      },
    ],
    coreTechnologies: [
      {
        name: { zh: 'SwiftUI & Metal 图形渲染管线', en: 'SwiftUI & Metal GPU Rendering Pipeline' },
        subName: { zh: 'Metal 硬件加速', en: 'Metal GPU Accelerated' },
        badge: 'METAL GPU',
      },
      {
        name: { zh: 'CoreAudio 摆轮声学频谱算法', en: 'CoreAudio FFT Acoustic Frequency Analysis' },
        subName: { zh: '高精声学分析', en: 'Acoustic FFT' },
        badge: 'AUDIO DSP',
      },
      {
        name: { zh: '120Hz 线性马达极微触觉反馈', en: '120Hz CoreHaptics Tactile Escapement Engine' },
        subName: { zh: '微触觉齿轮模拟', en: 'Micro-Haptics' },
        badge: 'HAPTICS',
      },
      {
        name: { zh: '瑞士国际主义 4pt 排版网格系统', en: 'Swiss International 4pt Typography System' },
        subName: { zh: '极简瑞士网格', en: 'Swiss Grid' },
        badge: 'TYPOGRAPHY',
      },
      {
        name: { zh: 'BLE 5.3 机械机芯低功耗蓝牙通信', en: 'BLE 5.3 Low Energy Calibre Protocol' },
        subName: { zh: '低功耗蓝牙通信', en: 'BLE Protocol' },
        badge: 'WIRELESS',
      },
    ],
    techStack: ['SwiftUI', 'CoreAudio', 'React Native', 'Tailwind', 'Canvas 2D', 'Web Audio API'],
    designTokens: {
      palette: [
        { name: 'Precision Cyan', hex: '#00F0FF', role: 'Chronometer Second Hand & Metric Accent' },
        { name: 'Dial Charcoal', hex: '#0D0F17', role: 'Main Dial Background' },
        { name: 'Escapement Slate', hex: '#1C2130', role: 'Card Surfaces & Time Dividers' },
        { name: 'Index White', hex: '#FFFFFF', role: 'Legibility Markers & Numbers' },
      ],
      typography: [
        { role: 'Time Display', font: 'Syne Bold', sample: '09:41:28.04' },
        { role: 'Watch Calibre Label', font: 'JetBrains Mono', sample: 'CALIBRE 3230 — 31 JEWELS' },
        { role: 'Notes & Specs', font: 'Plus Jakarta Sans', sample: 'Amplitude: 298° | Beat Error: 0.1ms' },
      ],
    },
  },
  {
    id: 'kaizen-ai',
    slug: 'kaizen-generative-workspace',
    title: {
      en: 'Puge Adu — Public Space Art Project',
      zh: '普格阿都—公共空间艺术计划',
    },
    subtitle: {
      en: 'Deyu Village, Puge County, Liangshan Yi Autonomous Prefecture, Sichuan',
      zh: '四川省凉山彝族自治州普格县德育村',
    },
    tagline: {
      en: 'Public space art revitalization project in Deyu Village, Puge County, Liangshan.',
      zh: '四川省凉山彝族自治州普格县德育村公共空间艺术计划。',
    },
    year: '2024',
    category: 'spatial',
    categoryLabel: {
      en: 'Public Space Art',
      zh: '公共空间艺术计划',
    },
    client: '',
    role: {
      en: '',
      zh: '',
    },
    duration: {
      en: '6 Months',
      zh: '6 个月',
    },
    heroImage: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1200&q=80',
    ],
    accentColor: '#FF5533', // Vivid Sunset Orange
    featured: true,
    liveUrl: 'https://kaizen.design.ai',
    githubUrl: 'https://github.com/alexchen/kaizen-canvas-engine',
    tags: ['公共空间艺术', '声音互动装置', '大凉山阿都音乐', '在地创作', '乡村振兴'],
    overview: {
      en: 'Yi folk music is rich and diverse, featuring an extensive variety of songs, dances, and musical instruments with distinctive ethnic artistic styles. Traditional Yi instruments are abundant, with the mouth harp (kouxian), moon lute (yueqin), huqin, and flute being the most widely spread. Drawing inspiration from Daliangshan Yi Adu music and mythological folklore, the artists created 3 large-scale thematic sculptures, 6 sound-interactive installations, and 2 site-specific public art installations utilizing local materials.\n\nThe project aims to uncover and inherit the cultural heritage of Daliangshan while enhancing the practitioners\' practical and creative capacities, contributing positively to rural revitalization and cultural exchange. Through interactive art installations, it fosters a vibrant cultural atmosphere in Daliangshan, invigorating community development and providing local residents with novel artistic experiences alongside interdisciplinary collaboration opportunities, further advancing the progress of rural revitalization and cultural heritage.',
      zh: '彝族音乐丰富多彩，歌曲、舞蹈、器乐种类繁多，风格各异，优美动人，具有鲜明的民族艺术风格。彝族的民乐器较丰富，常见的口弦、月琴、胡琴、笛子等流传最为广泛。作者以大凉山彝族阿都音乐与神话传说为元素，创作 3 件大型主题雕塑和 6 件发声互动装置以及 2 件就地取材的公共在地艺术作品。\n\n创作旨在发掘和传承大凉山的文化宝藏，同时提升创作者的实践能力和创作能力，为乡村建设和文化交流做出积极贡献。通过艺术装置的创作与互动交流，希望在大凉山营造出丰富多彩的文化氛围。促进社区的文化发展和活力。这将为当地居民提供新的艺术体验，同时提供了实践锻炼与跨学科合作的机会，进一步推动乡村振兴和文化传承的进程。',
    },
    challenge: {
      en: 'AI tools often suffer from "slot-machine gambling"—generating uncontrollable pixel soup without parametric constraints or exact engineering tolerances.',
      zh: '现存的生成式 AI 工具常沦为“老虎机式抽卡”——生成缺乏工程参数约束与精确公差的模糊像素，无法直接导入工业产线。',
    },
    solution: {
      en: 'Engineered a hybrid dual-viewport interface: a minimalist 2D conceptual sketchpad on the left, instantly driving an interactive 3D WebGL NURBS viewport on the right with strict dimensional tolerances.',
      zh: '构建了双重视口交互体系：左侧为极简 2D 概念草图区，右侧毫秒级驱动高精度 WebGL NURBS 3D 曲面，确保每一处倒角与接缝均满足工业公差。',
    },
    impact: [
      {
        metric: '14x',
        label: {
          en: 'Faster Concept-to-3D Prototype Cycle',
          zh: '概念草图到 3D 原型迭代周期提速',
        },
      },
      {
        metric: '$4.2M',
        label: {
          en: 'Seed Round Raised from Tier-1 Silicon Valley VCs',
          zh: '获得硅谷一线风险投资机构种子轮投资',
        },
      },
      {
        metric: '85k+',
        label: {
          en: 'Active Industrial Designers on Waitlist',
          zh: '全球顶尖工业设计师排队候补',
        },
      },
    ],
    deliverables: {
      en: ['Infinite Infinite-Canvas Renderer (Pixi.js/WebGL)', 'Generative Node Graph Interface', 'Industrial Design System Components', 'Interactive Prototype Simulator'],
      zh: ['无限画布渲染管线 (Pixi.js/WebGL)', '生成式节点图谱交互架构', '工业级设计系统组件库', '高保真交互模拟器'],
    },
    awards: [
      {
        id: 'kaizen-award-1',
        title: {
          zh: 'Product Hunt 年度金猫奖 (Golden Kitty Award)',
          en: 'Product Hunt Golden Kitty Award · AI Tools',
        },
        prize: {
          zh: 'AI 工具年度金奖',
          en: '1st Winner',
        },
        org: {
          zh: 'Product Hunt Silicon Valley 2025',
          en: 'Product Hunt Silicon Valley 2025',
        },
      },
      {
        id: 'kaizen-award-2',
        title: {
          zh: 'Awwwards 年度最佳开发创新大奖',
          en: 'Awwwards Site of the Year · Developer Award',
        },
        prize: {
          zh: '年度开发者大奖',
          en: 'Developer SOTY',
        },
        org: {
          zh: 'Awwwards International Jury',
          en: 'Awwwards International Jury',
        },
      },
      {
        id: 'kaizen-award-3',
        title: {
          zh: 'FWA of the Day & FWA of the Month',
          en: 'FWA of the Day & FWA of the Month',
        },
        prize: {
          zh: '双项杰出奖',
          en: 'FOTM Winner',
        },
        org: {
          zh: 'Favorite Website Awards London',
          en: 'Favorite Website Awards London',
        },
      },
    ],
    coreTechnologies: [
      {
        name: { zh: 'Pixi.js & WebGL 2.0 节点图形加速渲染', en: 'Pixi.js & WebGL 2.0 Node Graph Acceleration' },
        subName: { zh: 'GPU 无限画布渲染', en: 'GPU Infinite Canvas' },
        badge: 'WEBGL 2.0',
      },
      {
        name: { zh: 'Rust & WebAssembly NURBS 拓扑计算核心', en: 'Rust WebAssembly NURBS Kernel Engine' },
        subName: { zh: 'WASM 拓扑几何求解器', en: 'WASM Solver' },
        badge: 'RUST/WASM',
      },
      {
        name: { zh: 'CRDTs 实时无锁协同通信架构', en: 'CRDTs Real-time Multi-cursor State Sync' },
        subName: { zh: '毫秒级分布式协同', en: 'State Sync' },
        badge: 'COLLAB CRDT',
      },
      {
        name: { zh: 'Three.js PBR 物理实时材质光追管线', en: 'Three.js Real-time PBR Physical Raytracing' },
        subName: { zh: 'PBR 物理材质渲染', en: 'PBR Shaders' },
        badge: '3D SHADER',
      },
    ],
    techStack: ['React 19', 'Pixi.js', 'Three.js', 'Rust WebAssembly', 'WebSockets', 'Tailwind CSS'],
    designTokens: {
      palette: [
        { name: 'Cadmium Orange', hex: '#FF5533', role: 'Active Node Wire & Key Focus Action' },
        { name: 'Graph Dark', hex: '#0B0C11', role: 'Infinite Grid Workspace' },
        { name: 'Inspector Gray', hex: '#161922', role: 'Toolbars & Inspector Flat Surfaces' },
        { name: 'Parameter Green', hex: '#10B981', role: 'Tolerance Validated State' },
      ],
      typography: [
        { role: 'Node Title', font: 'Syne SemiBold', sample: 'SURFACE_INTERSECT_V2' },
        { role: 'Canvas Controls', font: 'Plus Jakarta Sans SemiBold', sample: 'Curvature G2 Continuous' },
        { role: 'Telemetry', font: 'JetBrains Mono', sample: 'Vertices: 48,204 | NURBS Deg: 3' },
      ],
    },
  },
  {
    id: 'velox-archive',
    slug: 'velox-editorial-engine',
    title: {
      en: 'Game Design & Production Implementation',
      zh: '游戏设计&落地与制作',
    },
    subtitle: {
      en: 'Valorant Weapon Customization & Modding',
      zh: '瓦罗兰特武器私人订制与改装',
    },
    tagline: {
      en: 'Merging 1960s International Typographic Style with mathematical procedural layout algorithms.',
      zh: '将 1960 年代国际主义平面设计运动的精髓注入现代数学程序化网格算法。',
    },
    year: '2024',
    category: 'brand',
    client: 'Velox Foundation for Visual Arts (Berlin / Tokyo)',
    role: {
      en: 'Weapon Design & Texture Painting Production',
      zh: '武器设计&材质喷涂落地制作',
    },
    duration: {
      en: '3 Weeks',
      zh: '3 周',
    },
    heroImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    ],
    accentColor: '#A855F7', // Electric Violet
    featured: true,
    liveUrl: 'https://velox-archive.org',
    githubUrl: 'https://github.com/alexchen/velox-grid-algo',
    tags: ['Creative Coding', 'Editorial Design', 'Typography', 'Swiss Design', 'WebGL'],
    overview: {
      en: 'Valorant weapon restoration and functional additions to achieve product commercial viability and playability.',
      zh: '瓦罗兰特武器复原以及功能性添加实现产品的可售卖性与可玩性',
    },
    challenge: {
      en: 'Most web typography either rigidly conforms to static breakpoints or looks haphazard on ultrawide monitors and foldable mobile devices.',
      zh: '传统的网页排版要么依赖僵硬的静态断点，要么在超宽带鱼屏和折叠屏设备上呈现出割裂且失衡的视觉节奏。',
    },
    solution: {
      en: 'Created an autonomous layout solver using constraint satisfaction mathematics, allowing text columns, image placards, and index marginalia to breathe harmoniously in continuous fluid ratios.',
      zh: '基于约束满足数学模型开发了自适应布局求解器，使文本栏、图片标牌与边注元数据在连续流动的比例尺中始终保持和谐呼吸感。',
    },
    impact: [
      {
        metric: '产品设计',
        label: {
          en: 'Weapon Direction',
          zh: '—武器方向',
        },
      },
      {
        metric: '3.2M+',
        label: {
          en: 'Unique Curators & Designers Visited',
          zh: '全球专业策展人与设计师访问量',
        },
      },
      {
        metric: '0.0ms',
        label: {
          en: 'Layout Shift (CLS Score)',
          zh: '累积布局偏移得分 0 缺陷',
        },
      },
    ],
    deliverables: {
      en: ['Generative Layout Script Engine', 'Complete Brand Identity & Typography System', 'Interactive Archive Reader with Keyboard Navigation', 'Custom Variable Font Specimen Generator'],
      zh: ['生成式排版脚本引擎', '完整品牌视觉系统与字体规范', '支持纯键盘操控的交互式阅读器', '自定义可变字体字样生成器'],
    },
    techStack: ['TypeScript', 'Motion', 'Canvas 2D', 'Tailwind CSS', 'OpenType.js', 'Vite'],
    designTokens: {
      palette: [
        { name: 'Spectral Violet', hex: '#A855F7', role: 'Interactive Accent & Index Anchor' },
        { name: 'Archive Onyx', hex: '#07080C', role: 'Base Background Paper' },
        { name: 'Placard Charcoal', hex: '#12141C', role: 'Artifact Metadata Flat Container' },
        { name: 'High Brightness Bone', hex: '#ECEEF2', role: 'Primary Body Typography' },
      ],
      typography: [
        { role: 'Headline Specimen', font: 'Syne Heavy', sample: 'ARCHIVE ITEM № 8492' },
        { role: 'Editorial Body', font: 'Plus Jakarta Sans', sample: 'The grid system is an aid, not a guarantee. It permits a number of possible uses.' },
        { role: 'Catalog Meta', font: 'JetBrains Mono', sample: 'GRID_COLS: 12 | RATIO: 1.618 | LOC: BERLIN_VAULT' },
      ],
    },
  },
  {
    id: 'solaris-motors',
    slug: 'solaris-electric-hypercar',
    title: {
      en: 'Shaoshan, Hunan — Mao Zedong Poetry, Calligraphy & Manuscript Museum',
      zh: '湖南韶山——毛泽东诗词书法手札馆',
    },
    subtitle: {
      en: "Follow in the footsteps of Chairman Mao to witness step by step the vast realm and great vision within his poetry and calligraphy manuscripts",
      zh: '跟随毛主席的脚步一步步见证他诗词手札中的天地与胸怀',
    },
    tagline: {
      en: 'Delivering critical G-force, battery thermal, and regenerative braking metrics at 300+ km/h.',
      zh: '在 300km/h 极速驰骋中为驾驶者提供清晰无误的 G 值、电池热管理与动能回收遥测。',
    },
    year: '2025',
    category: 'product',
    client: '',
    role: {
      en: '',
      zh: '',
    },
    duration: {
      en: '9 Months',
      zh: '9 个月',
    },
    heroImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1200&q=80',
    ],
    accentColor: '#3B82F6', // Cobalt Electric Blue
    featured: true,
    liveUrl: 'https://solaris-hypercar.design',
    githubUrl: 'https://github.com/alexchen/solaris-can-bus-ui',
    tags: ['Automotive UX', 'HMI System', 'Real-time Telemetry', 'Safety Standards', 'WebGL'],
    overview: {
      en: "Exploring Chairman Mao's mental journey from schooling to becoming a great leader through his life's poetry, expressing aspirations through verse and seeing heaven and earth through poetry. In this museum, we designed a curated viewing route to present to audiences his philosophical reflections and grand aspirations across different stages of his life.",
      zh: '根据毛主席的生平诗词来探索他从求学到成为一位伟人的心路历程，以诗词言志向，看诗赋以见天地，在此场馆中我们设定了特定的观演路线来向观众展现毛主席人生不同阶段的不同哲学思考与心中的宏大志向',
    },
    challenge: {
      en: 'Track drivers have less than 200ms of visual gaze budget away from the asphalt. Cluttered digital dials or delayed animation frames can cause catastrophic accidents.',
      zh: '在赛道极限竞速中，车手脱离路面视线的安全余量不足 200 毫秒。繁冗的数字表盘或掉帧微卡顿都会带来致命的安全隐患。',
    },
    solution: {
      en: 'Designed an ergonomic HUD based on peripheral color thresholding: critical thermal warnings trigger peripheral retina flashes without requiring direct eye focus, while vital speed and apex line guides remain laser-sharp.',
      zh: '基于人眼周边视觉阈值设计了人机工学 HUD：当电池或制动温度达到临界点时，边缘色块会触发余光闪烁预警，无需直接对焦；车速与弯心入弯指引则保持极简高锐度。',
    },
    impact: [
      {
        metric: '0.12s',
        label: {
          en: 'Glance Recognition Time (50% faster than industry norm)',
          zh: '车手余光读表时间（比行业平均快 50%）',
        },
      },
      {
        metric: '120 FPS',
        label: {
          en: 'Zero-drop Framerate on Embedded Automotive Chips',
          zh: '车规级车载芯片 0 掉帧满帧渲染',
        },
      },
      {
        metric: 'iF Gold',
        label: {
          en: 'iF Design Gold Award 2025 (Automotive UI)',
          zh: '2025 iF 设计金奖 (车载人机交互领域)',
        },
      },
    ],
    deliverables: {
      en: ['Digital Cockpit Cluster & Center Console Spec', 'Driver Safety Guideline & Ergonomic Matrix', 'Real-time Canvas Telemetry Gauges', 'Night & High-Glare Sunlight Adaptive Engine'],
      zh: ['数字仪表盘与中控大屏全套交互规范', '驾驶安全准则与人机工学测试矩阵', '实时 Canvas 遥测仪表组件', '极夜与高眩光强日光自适应模式'],
    },
    techStack: ['React', 'WebGL', 'CAN-bus Protocol', 'Tailwind CSS', 'D3.js', 'Vite'],
    designTokens: {
      palette: [
        { name: 'Cobalt Telemetry', hex: '#3B82F6', role: 'Velocity Gauge & Kinetic Recovery' },
        { name: 'Cockpit Black', hex: '#05060A', role: 'OLED True-Black Power Saver Surface' },
        { name: 'Thermal Warning', hex: '#EF4444', role: 'Brake Disc & Battery Overheat Alert' },
        { name: 'Ambient Slate', hex: '#171B26', role: 'HUD Background Reticle Lines' },
      ],
      typography: [
        { role: 'HUD Speedometer', font: 'Syne 900', sample: '284 KM/H' },
        { role: 'Telemetry Readout', font: 'JetBrains Mono', sample: 'G_LAT: +1.42G | SOC: 88% | TORQUE: 1,200Nm' },
        { role: 'Driver Mode', font: 'Plus Jakarta Sans Bold', sample: 'TRACK PROTOCOL ENGAGED' },
      ],
    },
  },
  {
    id: 'lumen-studio',
    slug: 'lumen-sound-spatial-synth',
    title: {
      en: 'COMING SOON — STAY TUNED',
      zh: '待更新 — 敬请期待',
    },
    subtitle: {
      en: 'New spatial & sound experiments underway',
      zh: '新项目整理中，敬请期待',
    },
    tagline: {
      en: 'Next-generation creative technology work coming soon.',
      zh: '下一代创意技术实践项目即将呈现。',
    },
    year: '2026',
    category: 'motion',
    client: '',
    role: {
      en: '',
      zh: '',
    },
    duration: {
      en: '',
      zh: '',
    },
    heroImage: comingSoonProductImg,
    thumbnail: comingSoonProductImg,
    gallery: [
      comingSoonProductImg,
    ],
    accentColor: '#F59E0B', // Warm Amber Gold
    featured: false,
    liveUrl: 'https://lumen-sound.studio',
    githubUrl: 'https://github.com/alexchen/lumen-gl-audio',
    tags: ['Motion Design', 'WebGL Shaders', 'Web Audio API', 'Stage Visuals', 'Generative Art'],
    overview: {
      en: 'Lumen is an interactive web-based instrument and live stage visualizer. It processes multi-channel audio input via Fast Fourier Transforms (FFT) to generate synchronized 3D geometric wave fields.',
      zh: 'Lumen 是一款基于浏览器的交互式数字乐器与音乐节现场舞台视效系统。通过快速傅里叶变换（FFT）解析多通道音频输入，生成声画实时同步的三维几何波场。',
    },
    challenge: {
      en: 'Stage lighting and visual generative engines traditionally require cumbersome, multi-ton hardware racks that cannot be accessed or modified over the web in real time.',
      zh: '传统的音乐会大型灯光与视效渲染设备依赖笨重的专有工业机架，无法在跨国巡演或网页端实现轻量化、低门槛的实时协同创作。',
    },
    solution: {
      en: 'Built an optimized GLSL fragment shader pipeline directly running on the browser GPU, synchronizing with WebMIDI controllers for zero-configuration live jam performances.',
      zh: '在浏览器端搭建了高度优化的 GLSL 片元着色器管线，并原生支持 WebMIDI 物理控制器无缝即插即用，为电子音乐人提供零配置的现场即兴视效。',
    },
    impact: [
      {
        metric: '60 FPS',
        label: {
          en: 'Ultra 4K Live Visual Output in Chrome',
          zh: 'Chrome 浏览器内直出 4K 60FPS 极速渲染',
        },
      },
      {
        metric: '25+',
        label: {
          en: 'World Music Festivals Powered',
          zh: '已在 25+ 场全球顶级音乐节现场投入使用',
        },
      },
      {
        metric: 'FWA',
        label: {
          en: 'FWA of the Day Winner',
          zh: '荣膺 FWA 每日最佳网站大奖',
        },
      },
    ],
    deliverables: {
      en: ['WebGL Shaders Library', 'WebMIDI Controller Mapping Interface', 'Flat Modern Stage Control Panel', 'High-Res Video Preset Exporter'],
      zh: ['WebGL 着色器算法库', 'WebMIDI 物理控制器映射界面', '扁平现代化的舞台中控台', '超高清视效视频预设导出工具'],
    },
    techStack: ['WebGL / GLSL', 'Web Audio API', 'WebMIDI API', 'React 19', 'Tailwind CSS'],
    designTokens: {
      palette: [
        { name: 'Amber Resonance', hex: '#F59E0B', role: 'Harmonic Peak & Wave Crest' },
        { name: 'Stage Charcoal', hex: '#090A0F', role: 'Live Viewport Deep Matte Background' },
        { name: 'Frequency Cyan', hex: '#06B6D4', role: 'Bass Sub-woofer Spatial Wave' },
        { name: 'Control Slate', hex: '#1E2330', role: 'Fader & Knob Flat Surfaces' },
      ],
      typography: [
        { role: 'Synth Channel', font: 'Syne Bold', sample: 'OSC_01 — SINE / FM MOD' },
        { role: 'Frequency Param', font: 'JetBrains Mono', sample: 'FREQ: 432.0 Hz | Q_FACTOR: 8.4' },
        { role: 'Stage Status', font: 'Plus Jakarta Sans SemiBold', sample: 'MIDI CONTROLLER CONNECTED' },
      ],
    },
  },
  {
    id: 'aura-pay',
    slug: 'aura-fintech-terminal',
    title: {
      en: 'Hangzhou Wulin · Designer Toy Store — Not AI Creation',
      zh: '杭州武林·潮玩店铺——未AI造物',
    },
    subtitle: {
      en: "Guided by the Chinese classical garden philosophy of wandering and flow, merging designer toy aesthetics with traditional motifs and contemporary cyberpunk elements, the space integrates interactive installations and AI products to embody the ethos of 'Not AI Creation'.",
      zh: '以中式园林“游、通”的理念，把潮玩设计结合中式古典元素以及当代赛博元素最后形成的视觉体验，整体店铺结合互动装置与AI产品体现“未AI造物”的特色',
    },
    tagline: {
      en: 'Crafting the fastest 0.4-second tap-to-pay transaction flow in retail fintech.',
      zh: '打造零售金融科技领域 0.4 秒极速感应挥卡支付交互闭环。',
    },
    year: '2024',
    category: 'product',
    client: '',
    role: {
      en: '',
      zh: '',
    },
    duration: {
      en: '6 Months',
      zh: '6 个月',
    },
    heroImage: 'https://images.unsplash.com/photo-1556742049-0a67e55722c0?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0a67e55722c0?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556742049-0a67e55722c0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1200&q=80',
    ],
    accentColor: '#EC4899', // Electric Magenta
    featured: false,
    liveUrl: 'https://aura-pay.global',
    githubUrl: 'https://github.com/alexchen/aura-terminal-pos',
    tags: ['Fintech', 'Hardware UX', 'Design System', 'POS Terminal', 'Micro-interactions'],
    overview: {
      en: "Guided by the Chinese classical garden philosophy of 'wandering and flow', merging designer toy aesthetics with traditional motifs and contemporary cyberpunk elements, the entire store integrates interactive installations and AI products to embody the unique ethos of 'Not AI Creation'.",
      zh: '以中式园林“游、通”的理念，把潮玩设计结合中式古典元素以及当代赛博元素最后形成的视觉体验，整体店铺结合互动装置与AI产品体现“未AI造物”的特色',
    },
    challenge: {
      en: 'Traditional credit card POS terminals have sluggish touch screens, confusing multi-step tip screens, and jarring audible error beeps that cause awkward checkout friction.',
      zh: '传统的 POS 刷卡机存在屏幕触控迟钝、小费确认步骤繁琐以及刺耳的报错蜂鸣声，极易在高峰期造成收银台尴尬拥堵。',
    },
    solution: {
      en: 'Engineered a flat, distraction-free transaction interface with large single-tap targets, dynamic currency auto-detection, and reassuring melodic audio confirmation.',
      zh: '打造了纯平无干扰的极简交易界面，配备超大单手触控靶区、动态币种自动识别，以及清脆悦耳的旋律性交易成功提示音。',
    },
    impact: [
      {
        metric: 'AI时代下的',
        label: {
          en: 'Designer Toy Brand Store',
          zh: '潮玩品牌店铺',
        },
      },
      {
        metric: '+38%',
        label: {
          en: 'Checkout Throughput in Busy Retail Hours',
          zh: '零售高峰期收银吞吐量提升 38%',
        },
      },
      {
        metric: '$1.8B',
        label: {
          en: 'Processed Annual Transaction Volume (GMV)',
          zh: '年化处理交易额突破 18 亿美元',
        },
      },
    ],
    deliverables: {
      en: ['Touch Screen POS Interface Spec', 'Physical Hardware Casing & Screen Alignment Guide', 'Merchant Analytics Web Portal', 'Audio Feedback Soundpack'],
      zh: ['触控 POS 终端全套交互设计规范', '硬件外壳与屏幕边缘对齐人机工程手册', '商户数据分析 Web 后台', '触觉与提示声音效包'],
    },
    techStack: ['React Native', 'TypeScript', 'Tailwind CSS', 'WebSockets', 'Web Audio API'],
    designTokens: {
      palette: [
        { name: 'Neon Magenta', hex: '#EC4899', role: 'Payment Verified & Brand Signature' },
        { name: 'Matte Terminal Black', hex: '#0B0D14', role: 'Hardware Screen Frame Background' },
        { name: 'Keypad Slate', hex: '#181C28', role: 'Numeric Keypad Flat Surface' },
        { name: 'Success Mint', hex: '#10B981', role: 'Approved Receipt Accent' },
      ],
      typography: [
        { role: 'Transaction Amount', font: 'Syne 800', sample: '$ 124.50 USD' },
        { role: 'Keypad Numbers', font: 'Plus Jakarta Sans Bold', sample: '1  2  3  4  5' },
        { role: 'Receipt Metadata', font: 'JetBrains Mono', sample: 'AUTH_CODE: #99421A | NFC_OK' },
      ],
    },
  },
  {
    id: 'cymatic-resonance',
    slug: 'cymatic-resonance-monolith',
    title: {
      en: 'verse-gaze：the reverse-vision apparatus',
      zh: '观·反观——异象仪',
    },
    subtitle: {
      en: 'As we gaze into the cosmos, eyes from deep space are gazing back — observing worlds invisible to the naked eye through the Reverse-Vision Apparatus',
      zh: '当我们凝望宇宙的同时，来自宇宙深处的眼睛也在凝望你，以异象仪之眼观测肉眼不可见之世界',
    },
    tagline: {
      en: 'Translating invisible acoustic frequencies into tangible fluid topographies and kinetic light ripples.',
      zh: '以水为镜，借声化形，将不可见的声学频率具象化为流动的空间光影波纹。',
    },
    year: '2024',
    category: 'spatial',
    categoryLabel: {
      en: 'Interactive Art Installation',
      zh: '交互艺术装置',
    },
    client: '中国美术学院',
    role: {
      en: 'Lead Artist & Spatial Interaction Engineer',
      zh: '主创艺术家 & 空间交互工程师',
    },
    duration: {
      en: '3 Months',
      zh: '3 个月',
    },
    heroImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=80',
    ],
    accentColor: '#06B6D4', // Fluid Cyan
    featured: true,
    liveUrl: 'https://cymatic-resonance.design',
    githubUrl: 'https://github.com/alexchen/cymatic-fluid-dsp',
    tags: ['Interactive Installation', 'Cymatics', 'TouchDesigner', 'Fluid Dynamics', 'Arduino'],
    overview: {
      en: 'Based on hypotheses concerning "Universe 26", this work explores the dual themes of "Gaze" and "Reverse-Gaze". Through a bespoke apparatus, it manifests a unique observational perspective transcending dimensions of time, where we and "they" gaze reciprocally across distinct temporal coordinates.',
      zh: '根据对“二十六号宇宙”的猜想，总结出“观”与“反观”的主题。通过一个特定的仪器来表现出跨越时间维度的独特观察视角，不同时间坐标下的我们与“他们”相互观察着。',
    },
    challenge: {
      en: 'Fluid turbulence creates chaotic wave reflections, while ambient crowd acoustic noise compromises audio-frequency fidelity in open exhibition halls.',
      zh: '流体受震动极易产生非线性湍流与杂波反射，且展会现场嘈杂的环境噪音易对高灵敏度音频传感造成干扰。',
    },
    solution: {
      en: 'Engineered specialized fluid viscosity dampers and band-pass DSP filters with custom acrylic baffle chambers, locking frequencies to pure 432Hz/528Hz harmonics with sub-16ms latency.',
      zh: '研发了专有流体阻尼调节与陷波滤波算法，采用定制亚克力蜂窝消波结构与精确 432Hz/528Hz 谐波合成，确保驻波纹样清晰对称且端到端响应延迟低于 16ms。',
    },
    impact: [
      {
        metric: '180k+',
        label: {
          en: 'Exhibition Visitors & Active Interactions',
          zh: '西岸艺博会现场观众互动体验人次',
        },
      },
      {
        metric: '<16ms',
        label: {
          en: 'Acoustic to Optical Standing Wave Latency',
          zh: '声频激发到液面驻波光学投影端到端响应',
        },
      },
      {
        metric: 'Gold Award',
        label: {
          en: 'Asian Digital Media Youth Installation Gold',
          zh: '亚洲数字新媒体艺术青年装置大奖',
        },
      },
    ],
    deliverables: {
      en: ['TouchDesigner Real-time Audio-Visual Pipeline', 'Multi-channel Sub-bass Transducer Driver Hardware', 'Custom Double-curved Acrylic Wave-damping Vessel', 'Millimeter-wave Radar Contactless Gesture Sensor'],
      zh: ['TouchDesigner 实时声光动力学控制系统', '多通道低频次声波震子驱动硬件模块', '定制双曲面亚克力减震消波水体容器', '毫米波雷达非接触式人机交互手势感应台'],
    },
    awards: [
      {
        id: 'cymatic-award-1',
        title: {
          zh: '亚洲数字新媒体艺术装置大奖',
          en: 'Asian Digital New Media Art Installation Award',
        },
        prize: {
          zh: '金奖',
          en: 'Gold Winner',
        },
        org: {
          zh: '亚洲新媒体艺术联盟 · 2024',
          en: 'Asian New Media Arts Federation · 2024',
        },
      },
      {
        id: 'cymatic-award-2',
        title: {
          zh: '西岸艺术与设计博览会青年策展人特别奖',
          en: 'West Bund Art & Design Curatorial Special Prize',
        },
        prize: {
          zh: '最佳公共交互奖',
          en: 'Best Public Interaction',
        },
        org: {
          zh: '西岸文化艺术委员会',
          en: 'West Bund Cultural Commission',
        },
      },
    ],
    coreTechnologies: [
      {
        name: { zh: 'TouchDesigner 实时流体物理仿真 & 映射', en: 'TouchDesigner Real-time Fluid & Visual Mapping' },
        subName: { zh: '实时流体计算着色器', en: 'Real-time Fluid Shaders' },
        badge: 'TOUCHDESIGNER',
      },
      {
        name: { zh: '次低频触觉震子与大功率功放驱动', en: 'Sub-bass Transducer & Amplification Circuitry' },
        subName: { zh: '次低频大功率功放', en: 'Sub-bass Hardware' },
        badge: 'TRANSDUCER',
      },
      {
        name: { zh: '毫米波雷达空间距离与手势追踪', en: 'mmWave Radar Spatial Distance & Gesture Tracking' },
        subName: { zh: '非接触手势雷达', en: 'mmWave Radar' },
        badge: 'RADAR HCI',
      },
      {
        name: { zh: 'Arduino / C++ 串口通信与 PID 控制', en: 'Arduino / C++ High-speed Serial & PID Feedback' },
        subName: { zh: '嵌入式 PID 反馈控制', en: 'PID Control' },
        badge: 'EMBEDDED',
      },
      {
        name: { zh: '高精度液面激光准直干涉测量', en: 'High-Precision Laser Collimation Interferometry' },
        subName: { zh: '激光干涉光学系统', en: 'Laser Optics' },
        badge: 'OPTICS',
      },
      {
        name: { zh: '432Hz / 528Hz 治愈声频谐波合成', en: '432Hz / 528Hz Harmonic Acoustic Synthesizer' },
        subName: { zh: '声频谐波生成算法', en: 'DSP Acoustics' },
        badge: 'AUDIO DSP',
      },
    ],
    techStack: ['TouchDesigner', 'Arduino C++', 'Fluid DSP', 'Rhino 3D', 'Laser Projection', 'Ableton Live'],
    designTokens: {
      palette: [
        { name: 'Resonance Cyan', hex: '#06B6D4', role: 'Fluid Surface Ripple Highlight' },
        { name: 'Abyssal Void', hex: '#05080E', role: 'Spatial Dome Dark Background' },
        { name: 'Liquid Slate', hex: '#131B2A', role: 'Vessel Base & Control Pedestal' },
        { name: 'Wave Crest White', hex: '#F0F9FF', role: 'Interference Pattern Display' },
      ],
      typography: [
        { role: 'Spatial Display', font: 'Syne 800', sample: 'CYMATIC RESONANCE v2' },
        { role: 'Telemetry Readout', font: 'JetBrains Mono', sample: 'FREQ: 432.0 Hz | STANDING_WAVE_MODE: N=8' },
        { role: 'Description', font: 'Plus Jakarta Sans', sample: 'Faraday surface wave topological stabilization verified.' },
      ],
    },
  },
  {
    id: 'bioluminescent-mycelium',
    slug: 'aether-bioluminescent-pavilion',
    title: {
      en: 'Shi Xi — Future Edible Gaseous Food Production Chamber',
      zh: '食饩——未来可食用气态食物生产仓',
    },
    subtitle: {
      en: 'An interactive art installation designing "edible" gaseous food based on contemporary social inquiries',
      zh: '基于当代社会议题设计出的“可食用”气态气体食物的艺术装置',
    },
    tagline: {
      en: 'Touching the pulse of ecological networks through human galvanic skin response and luminous mycelial propagation.',
      zh: '触碰自然的脉搏，在每一次呼吸中感知生命网络的微弱电信号涟漪。',
    },
    year: '2025',
    category: 'spatial',
    categoryLabel: {
      en: 'Interactive Art Installation',
      zh: '交互艺术装置',
    },
    client: '上海国际光影艺术节 / 城市空间艺术季',
    role: {
      en: 'Lead Spatial Designer & Physical Computing Architect',
      zh: '主创空间设计师 & 物理计算架构师',
    },
    duration: {
      en: '4 Months',
      zh: '4 个月',
    },
    heroImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    ],
    accentColor: '#10B981', // Bio Emerald
    featured: true,
    liveUrl: 'https://mycelium.spatial-design.art',
    githubUrl: 'https://github.com/alexchen/mycelium-sensing-core',
    tags: ['Spatial Architecture', 'Bio-Design', 'Capacitive Sensing', 'Interactive Lighting', 'Parametric Design'],
    overview: {
      en: "Body anxiety and physical health concerns are already widely discussed across contemporary society. In the future, will the very form of food evolve to meet emerging human needs? Grounded in this inquiry, this creation designs an apparatus capable of producing 'gaseous food', provoking deeper reflection through the visceral experience of 'eating flavored vapor'.",
      zh: '当下的身材焦虑以及身体健康问题以及是广泛被社会所讨论的了，那么在未来食物的形态是否会因为新的需求而发生改变，此创作立足于此设计了一个可以生产“气态食物”的装置设备，通过体验“吃有味道的气体”而引发这一思考',
    },
    challenge: {
      en: 'Capacitive skin-contact sensing across large-scale open humid exhibition pavilions suffers from environmental humidity drift, ground loops, and false positive triggers.',
      zh: '多点人体微电流检测在大型公共潮湿户外空间中易受温湿度漂移影响，极易产生假触发与信号衰减。',
    },
    solution: {
      en: 'Implemented auto-calibrating differential capacitive sensing arrays with optoisolated RS-485 bus nodes, dynamically tracking humidity baselines to guarantee 100% reliable organic interaction.',
      zh: '采用差分自动校准电容阵列算法与隔离屏蔽拓扑总线，配合低功耗微控制器集群实时过滤温湿度基线波动，实现 100% 灵敏触摸反馈与无间断有机渐变。',
    },
    impact: [
      {
        metric: '1,200+',
        label: {
          en: 'Distributed Biomimetic Capacitive Light Nodes',
          zh: '分布式仿生生物电容传感光节',
        },
      },
      {
        metric: '100%',
        label: {
          en: 'Biodegradable Mycelium Structural Material',
          zh: '全生物可降解农业废弃物培植结构材料',
        },
      },
      {
        metric: '1st Prize',
        label: {
          en: 'Shanghai Light Art Festival Eco-Innovation 1st',
          zh: '上海国际光影艺术节最佳生态创新设计一等奖',
        },
      },
    ],
    deliverables: {
      en: ['Mycelium Biomimetic Self-supporting Arch Model', '1200+ Distributed Capacitive Sensor Array Hardware', 'DMX512 / Art-Net Biological Light Wave Firmware', 'Generative Ambient Bio-Soundscape Interactive Engine'],
      zh: ['菌丝体仿生自承重拱壳参数化空间模型', '1200+ 点位分布式电容微电流传感节点硬件', 'DMX512 / Art-Net 呼吸光波蔓延控制固件', '低功耗环境音景声学交互生成引擎'],
    },
    awards: [
      {
        id: 'mycelium-award-1',
        title: {
          zh: '上海国际光影艺术节生态空间设计金奖',
          en: 'Shanghai International Light Festival Eco-Design Gold',
        },
        prize: {
          zh: '一等奖',
          en: '1st Prize',
        },
        org: {
          zh: '上海国际光影节组委会 · 2025',
          en: 'Shanghai Light Festival Committee · 2025',
        },
      },
      {
        id: 'mycelium-award-2',
        title: {
          zh: '世界绿色设计组织 (WGDO) 绿色创新大奖',
          en: 'World Green Design Organization Innovation Award',
        },
        prize: {
          zh: '绿色设计优秀奖',
          en: 'Green Innovation Award',
        },
        org: {
          zh: 'WGDO 国际执委会',
          en: 'World Green Design Organization',
        },
      },
    ],
    coreTechnologies: [
      {
        name: { zh: '菌丝体生物复合材料成型与培植工艺', en: 'Mycelium Bio-Composite Cultivation & Molding' },
        subName: { zh: '生物复合材料', en: 'Bio-Composites' },
        badge: 'BIO DESIGN',
      },
      {
        name: { zh: 'Grasshopper / Kangaroo 悬垂线物理拓扑力学找形', en: 'Grasshopper / Kangaroo Catenary Form-Finding' },
        subName: { zh: '参数化悬垂找形', en: 'Parametric Rhino' },
        badge: 'PARAMETRIC',
      },
      {
        name: { zh: '分布式 RS-485 / Modbus 容性微电流传感阵列', en: 'Distributed RS-485 / Modbus Capacitive Sensor Network' },
        subName: { zh: '1200+ 点位总线', en: 'Sensor Array' },
        badge: 'RS-485 BUS',
      },
      {
        name: { zh: 'ESP32 微控制器集群与 Art-Net/DMX512 灯控协议', en: 'ESP32 Cluster & Art-Net/DMX512 Lighting Protocol' },
        subName: { zh: 'DMX512 动态光网', en: 'DMX512 / Art-Net' },
        badge: 'LIGHTING',
      },
      {
        name: { zh: 'Max/MSP 生成式仿生环境音景合成', en: 'Max/MSP Generative Bio-Ambient Soundscape' },
        subName: { zh: '生成式生物音景', en: 'Generative Audio' },
        badge: 'MAX/MSP',
      },
      {
        name: { zh: 'CNC 数控加工模具与装配式骨架节点', en: 'CNC Machined Molds & Modular Timber Joinery' },
        subName: { zh: '装配式结构节点', en: 'CNC Fabrication' },
        badge: 'FABRICATION',
      },
    ],
    techStack: ['Grasshopper / Rhino', 'Arduino / ESP32', 'DMX512 / Art-Net', 'Max/MSP', 'Bio-Composites', 'Fusion 360'],
    designTokens: {
      palette: [
        { name: 'Bioluminescent Emerald', hex: '#10B981', role: 'Living Synaptic Light Pulse' },
        { name: 'Mycelium Charcoal', hex: '#070B09', role: 'Pavilion Interior Shadow Void' },
        { name: 'Organic Bark Slate', hex: '#141F1A', role: 'Composite Structural Struts' },
        { name: 'Spore Glow White', hex: '#ECFDF5', role: 'Diffused Optical Capillary' },
      ],
      typography: [
        { role: 'Pavilion Display', font: 'Syne 800', sample: 'MYCELIUM PAVILION' },
        { role: 'Bio Sensor Telemetry', font: 'JetBrains Mono', sample: 'NODE_CAPACITANCE: 14.8pF | SYNAPSE_PULSE: ACTIVE' },
        { role: 'Narrative Body', font: 'Plus Jakarta Sans', sample: 'Bio-hybrid architecture reacting to touch and human breath.' },
      ],
    },
  },
  {
    id: 'holoweave-loom',
    slug: 'holoweave-particle-loom',
    title: {
      en: 'Xingguo Exhibition Hall — Research Project Archive Table',
      zh: '兴国展厅——科研项目档案桌',
    },
    subtitle: {
      en: 'Presenting Xingguo’s internal archival documents in the form of an interactive installation, elevating playful engagement and a sense of the future',
      zh: '将兴国内部展示的文献以交互装置的形式体现出，增加趣味性与未来感',
    },
    tagline: {
      en: 'Weaving photonic threads into tangible spatial tapestries through tactile interaction and real-time computation.',
      zh: '以光为线，以算为梭，在人机交互与光影交错中重构东方传统丝织工艺的数字灵魂。',
    },
    year: '2025',
    category: 'spatial',
    categoryLabel: {
      en: 'Interactive Art Installation',
      zh: '交互艺术装置',
    },
    client: '中国美术学院',
    role: {
      en: 'Spatial Creative Technologist & Interaction Designer',
      zh: '空间创意计算工程师 & 交互主创',
    },
    duration: {
      en: '3.5 Months',
      zh: '3.5 个月',
    },
    heroImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
    ],
    accentColor: '#8B5CF6', // Luminous Violet
    featured: true,
    liveUrl: 'https://holoweave.art-installation.design',
    githubUrl: 'https://github.com/alexchen/holoweave-volumetric',
    tags: ['Volumetric Light', 'GPU Particles', 'Kinetic Loom', 'TouchDesigner', 'Spatial HCI'],
    overview: {
      en: '',
      zh: '',
    },
    challenge: {
      en: 'Synchronizing high-speed tactile physical loom movements with 100,000+ real-time ray-marched particles without frame drops in high-density exhibition environments.',
      zh: '在展会高并发人流下，如何将高频机械推拉动作与 100,000+ 实时体积光场粒子物理碰撞保持 60fps 零掉帧并维持毫秒级力反馈同步。',
    },
    solution: {
      en: 'Built a custom Compute Shader particle engine in Unity/HLSL paired with high-frequency STM32 MCU CAN-bus serial telemetry running at 500Hz polling rate.',
      zh: '自研 Unity/HLSL 空间计算着色器粒子管线，配合 STM32 工业级 CAN 总线微控制器以 500Hz 轮询率采集机械姿态，实现无感物理同步与极致顺滑的视觉交互。',
    },
    impact: [
      {
        metric: '220k+',
        label: {
          en: 'Art Exhibition Participants & Visitors',
          zh: '乌镇当代艺术特展现场沉浸体验人次',
        },
      },
      {
        metric: '100k+',
        label: {
          en: 'Real-time Volumetric GPU Particle Density',
          zh: '实时光场体积着色器高密度粒子物理计算量',
        },
      },
      {
        metric: 'Best in Show',
        label: {
          en: 'Digital Heritage & Future Craft Grand Prize',
          zh: '数字非遗与未来工艺交互设计全场大奖',
        },
      },
    ],
    deliverables: {
      en: ['Custom CNC Timber Kinetic Loom Frame', 'STM32 Dual-core CAN-bus Sensor Hub Hardware', 'HLSL Compute Shader Particle Dynamics Engine', 'Spatial Multi-channel Quadraphonic Audio Synthesizer'],
      zh: ['定制 CNC 实木装配式机械织机结构件', 'STM32 双核工业级传感器主控板硬件', 'HLSL 计算着色器空间粒子动力学引擎', '四声道全景空间声场沉浸式声音合成模块'],
    },
    awards: [
      {
        id: 'holoweave-award-1',
        title: {
          zh: '数字非遗与未来工艺创新设计全场大奖',
          en: 'Digital Heritage & Future Craft Grand Prize',
        },
        prize: {
          zh: '金奖',
          en: 'Gold Winner',
        },
        org: {
          zh: '国际新媒体艺术与工艺双年展 · 2025',
          en: 'International New Media Art & Craft Biennale · 2025',
        },
      },
      {
        id: 'holoweave-award-2',
        title: {
          zh: '乌镇国际当代艺术邀请展最具人气公共装置奖',
          en: 'Wuzhen Contemporary Art Invitational Best Public Choice',
        },
        prize: {
          zh: '评审团特别大奖',
          en: 'Grand Jury Prize',
        },
        org: {
          zh: '乌镇当代艺术学术委员会',
          en: 'Wuzhen Contemporary Art Academic Council',
        },
      },
    ],
    coreTechnologies: [
      {
        name: { zh: 'HLSL / Compute Shader 实时体积光粒子流体', en: 'HLSL / Compute Shader Volumetric Particles' },
        subName: { zh: 'GPU 高性能计算着色器', en: 'GPU Compute Shader' },
        badge: 'COMPUTE SHADER',
      },
      {
        name: { zh: 'STM32 嵌入式工业级 CAN-bus 高速传感器采集', en: 'STM32 Embedded CAN-bus High-Speed Telemetry' },
        subName: { zh: '500Hz 姿态与力反馈', en: 'CAN-bus 500Hz' },
        badge: 'STM32 MCU',
      },
      {
        name: { zh: '多通道磁编码器与自适应电磁阻尼制动', en: 'Magnetic Encoders & Adaptive Magnetic Damping Brake' },
        subName: { zh: '触感阻尼力反馈系统', en: 'Haptic Feedback' },
        badge: 'HAPTICS',
      },
      {
        name: { zh: '全息透镜散射膜与空间光场准直阵列', en: 'Holographic Diffuser Film & Collimated Optical Array' },
        subName: { zh: '空气光场投射光学', en: 'Optics Collimation' },
        badge: 'OPTICS',
      },
      {
        name: { zh: 'Max/MSP 空间四声道丝竹与合成器交互引擎', en: 'Max/MSP Quadraphonic Spatial Ambient Engine' },
        subName: { zh: '四声道空间音频定位', en: 'Spatial Audio' },
        badge: 'MAX/MSP',
      },
      {
        name: { zh: '装配式实木榫卯与轻量化碳纤维梭子结构', en: 'Modular Timber Joinery & Carbon Fiber Shuttle' },
        subName: { zh: '传统工艺与碳纤维混构', en: 'Kinetic Frame' },
        badge: 'FABRICATION',
      },
    ],
    techStack: ['Unity HLSL', 'Compute Shaders', 'STM32 C/C++', 'CAN-bus', 'Rhino 3D', 'Max/MSP'],
    designTokens: {
      palette: [
        { name: 'Luminous Violet', hex: '#8B5CF6', role: 'Photon Filament Warp Thread' },
        { name: 'Deep Indigo Loom', hex: '#0B0A1A', role: 'Gallery Dark Absorption Chamber' },
        { name: 'Raw Timber Silk', hex: '#231F3D', role: 'Mechanical Shuttle Frame Accents' },
        { name: 'Photon Starlight White', hex: '#F5F3FF', role: 'Particle Bloom Sparkles' },
      ],
      typography: [
        { role: 'Loom Title', font: 'Syne 800', sample: 'HOLOWEAVE SPATIAL LOOM' },
        { role: 'Sensor Readout', font: 'JetBrains Mono', sample: 'SHUTTLE_VELOCITY: 1.84m/s | PARTICLES: 131,072' },
        { role: 'Curatorial Prose', font: 'Plus Jakarta Sans', sample: 'Photonic spatial jacquard weaving memories across light and air.' },
      ],
    },
  },
  {
    id: 'lumino-habitat',
    slug: 'lumino-habitat-public-space',
    title: {
      en: 'Waterside Pavilion — Three-Body Future Academy Sci-Fi Museum',
      zh: '在水一方东方科幻馆——三体未来学院',
    },
    subtitle: {
      en: 'Expressing Eastern sci-fi philosophy within the "Three-Body Problem" universe through a cyberpunk aesthetic lens',
      zh: '以赛博朋克美学风格来讲述科幻小说《三体》宇宙下属于东方科幻的哲思',
    },
    tagline: {
      en: 'Reimagining urban vitality through parametric structural flow and responsive public placemaking.',
      zh: '以参数化结构重塑城市公共活力，让空间在人与自然的呼吸中自由流动。',
    },
    year: '2025',
    category: 'product',
    categoryLabel: {
      en: 'Public Space Design',
      zh: '公共空间设计',
    },
    client: '定制客户',
    role: {
      en: 'Creative Designer',
      zh: '创意设计师',
    },
    duration: {
      en: '9 Months',
      zh: '9 个月',
    },
    heroImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
    ],
    accentColor: '#10B981', // Emerald Flora
    featured: true,
    liveUrl: 'https://lumino-habitat.urban-spatial.design',
    githubUrl: 'https://github.com/alexchen/parametric-space-design',
    tags: ['Public Space', 'Parametric Architecture', 'Urban Placemaking', 'Spatial Experience', 'Rhino Grasshopper'],
    overview: {
      en: 'The "panoramic sci-fi" experience of Waterside Pavilion Sci-Fi Museum transcends traditional visual and textual depictions of science fiction. Blending cutting-edge technology with artistic storytelling, it resonates with the Eastern philosophical core of "caring for the collective destiny of humankind"—inspiring visitors to reflect upon civilizational fate amid awe-inspiring immersion, elevating pure entertainment into profound philosophical inquiry.',
      zh: '在水一方科幻馆的“全景式科幻”体验，超越了传统对科幻存在于视觉和文字层面的想象，用硬核科技和艺术叙事结合的方式，呼应东方“关注人类整体命运”的思想内核，让观众在震撼中反思人类文明命运，让游玩升华为哲学思辨。',
    },
    challenge: {
      en: 'Balancing complex parametric double-curved timber joinery with modular prefabrication constraints, wind load structural safety, and multi-functional accessibility.',
      zh: '在保证复杂异形双曲面木构美学与结构受力安全（风荷载与抗震）的同时，如何将其拆解为标准化模数进行装配式预制施工，并满足全龄段友好无障碍流线。',
    },
    solution: {
      en: 'Developed a custom Grasshopper parametric nodal segmentation script with structural FEA verification, optimizing 1,280 timber ribs into 6 standardized curved template clusters.',
      zh: '基于 Rhino / Grasshopper 研发了构件参数化拓扑优化与有限元受力分析算法，将 1,280 根复杂构件收敛为 6 类标准加工单元，大幅降低施工成本与制造周期。',
    },
    impact: [
      {
        metric: '70,000㎡',
        label: {
          en: 'Total Exhibition & Public Space Area',
          zh: '科幻馆展陈与公共空间总面积',
        },
      },
      {
        metric: '40%+',
        label: {
          en: 'Pedestrian Dwell Time & Social Density Increase',
          zh: '社区居民平均驻留时长与公共活力提升率',
        },
      },
      {
        metric: 'Top Winner',
        label: {
          en: 'Urban Renewal & Public Space Excellence Award',
          zh: '未来城市更新与公共空间优秀设计大奖',
        },
      },
    ],
    deliverables: {
      en: ['Parametric Timber Structural BIM Model', 'Daylight Simulation & Solar Path Analysis Report', 'Modular Public Furniture System Design', '1:20 High-precision Physical Working Model'],
      zh: ['参数化装配式木构 BIM 全套施工图模', '微气候采光与日照轨迹环境模拟分析报告', '模块化全龄友好公共街道家具系统设计', '1:20 高精度物理空间剖面工作模型'],
    },
    awards: [
      {
        id: 'lumino-award-1',
        title: {
          zh: '未来城市更新与公共微空间营造卓越设计奖',
          en: 'Urban Renewal & Public Micro-Space Excellence Award',
        },
        prize: {
          zh: '年度金奖',
          en: 'Annual Gold Award',
        },
        org: {
          zh: '亚太城市空间与公共环境设计学会 · 2025',
          en: 'Asia-Pacific Urban Space & Environment Society · 2025',
        },
      },
    ],
    coreTechnologies: [
      {
        name: { zh: 'Rhino / Grasshopper 参数化异形木构拓扑', en: 'Rhino / Grasshopper Parametric Timber Topology' },
        subName: { zh: '参数化造型与拓扑优化', en: 'Parametric Topology' },
        badge: 'GRASSHOPPER',
      },
      {
        name: { zh: 'Ladybug / Honeybee 微气候与日照采光仿真', en: 'Ladybug / Honeybee Environmental Daylight Simulation' },
        subName: { zh: '生态采光与热舒适度模拟', en: 'Eco Simulation' },
        badge: 'LADYBUG TOOLS',
      },
      {
        name: { zh: 'BIM 数字化装配式节点五金加工深化', en: 'BIM Digital Prefabricated Joinery Detail Engineering' },
        subName: { zh: '装配式预制施工', en: 'Prefab BIM' },
        badge: 'BIM DETAIL',
      },
      {
        name: { zh: '自适应低碳光导照明与全彩环境光控', en: 'Adaptive Low-Carbon Solar Fiber Optics & CCT Light Control' },
        subName: { zh: '智能生态光影调控', en: 'Adaptive Lighting' },
        badge: 'ECO LIGHTING',
      },
    ],
    techStack: ['Rhino 3D', 'Grasshopper', 'Ladybug', 'AutoCAD', 'Twinmotion', 'Adobe Suite'],
    designTokens: {
      palette: [
        { name: 'Flora Emerald', hex: '#10B981', role: 'Biophilic Plant Islands & Primary Accent' },
        { name: 'Warm Glulam Oak', hex: '#2B2520', role: 'Parametric Timber Canopy Finish' },
        { name: 'Civic Basalt Gray', hex: '#16181D', role: 'Ground Paving & Structural Foundation' },
        { name: 'Solar Warm Glow', hex: '#ECFDF5', role: 'Diffuse Skylight & Night Illumination' },
      ],
      typography: [
        { role: 'Display Space Title', font: 'Syne 800', sample: 'LUMINO-HABITAT CIVIC PAVILION' },
        { role: 'Engineering Spec', font: 'JetBrains Mono', sample: 'SPAN: 24.6M | CANTILEVER: 5.8M | TIMBER: GL24h' },
        { role: 'Design Prose', font: 'Plus Jakarta Sans', sample: 'Weaving ecological shade and civic life into fluid parametric curves.' },
      ],
    },
  },
];
