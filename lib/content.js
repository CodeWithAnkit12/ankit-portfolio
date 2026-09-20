// ---------------------------------------------------------------
// Every piece of copy on the site lives here.
// Change the data and the page follows — no component edits needed.
// ---------------------------------------------------------------

const IMG = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const profile = {
  firstName: "Ankit",
  lastName: "Kumar",
  heroWord: "Software Engineer",
  role: "Software Engineer",
  company: "Tred+",
  location: "Ahmedabad, India",
  status: "Open to new opportunities",
  email: "ankit.kumar.info36@gmail.com",
  phone: "+91 81020 25681",
  cvUrl: "/Ankit-Kumar-Resume.pdf",

  // Drop a background-removed PNG at public/portrait.png and the hero
  // switches from the stock placeholder to your own cut-out.
  portrait: "/portrait.png",
  portraitFallback: IMG("1507003211169-0a1dd7228f2d", 800),

  // Order here drives the header, the menu and the contact card.
  socials: [
    {
      short: "In",
      label: "LinkedIn",
      href: "https://linkedin.com/in/ankit-kumar-19482b242",
    },
    {
      short: "Gh",
      label: "GitHub",
      href: "https://github.com/CodeWithAnkit12",
    },
    { short: "@", label: "Email", href: "mailto:ankit.kumar.info36@gmail.com" },
  ],
};

// ---------------------------------------------------------------
// About — the three-column block under the hero
// ---------------------------------------------------------------

export const about = {
  intro:
    "Hello! I'm Ankit Kumar. A software engineer building scalable, real-world products from India.",

  // The bulleted checklist in the left column
  points: [
    "Full Stack Development",
    "Backend & API Design",
    "Frontend Engineering",
    "Cloud & DevOps",
    "System Design",
  ],

  // The floating stat cards. `dark: true` inverts one, as in the reference.
  cards: [
    { value: 500, suffix: "+", label: "DSA problems solved" },
    { value: 45, suffix: "+", label: "Production defects resolved", dark: true },
    { value: 10, suffix: "+", label: "End-to-end features shipped", faces: true },
  ],

  // Outlined headline that sits under the image
  outline: "Scalable systems, clean architecture, shipped end to end.",
  ctaLabel: "View projects",
  ctaHref: "#work",

  // The two cards that float either side of the statement
  floats: [
    { value: "99.9", suffix: "%", label: "Production uptime" },
    { value: "35", suffix: "%", label: "Faster feature cycles" },
  ],

  image: IMG("1522252234503-e356532cafd5"),
};

export const statement = {
  text: "I turn ideas into systems that hold up - clean architecture, honest performance numbers, and code the next engineer can actually read.",
};

// ---------------------------------------------------------------
// Bio — image left, copy right, years-of-experience circle
// ---------------------------------------------------------------

export const bio = {
  image: "/about.jpg",
  badgeValue: "1",
  badgeSuffix: "+",
  badgeLabel: "Years of Experience",
  paragraphs: [
    "I'm a software engineer who enjoys building scalable, real-world products and solving complex problems with clean, reliable code. My BTech at BIT Mesra gave me a foundation in systems thinking that I still lean on when designing end-to-end software.",
    "At Tred+ I architected the Admin Portal end to end - translating Figma designs into production features, wiring up REST APIs, and building an RBAC onboarding flow that cut manual reporting effort by 40%. Before that, at INNOFarms.AI, I shipped 10+ features across a Next.js and Node.js stack, containerised the app with Docker, and deployed to Azure through GitHub Actions at 99.9% uptime.",
    "My stack is React and Next.js, TypeScript, Node.js, PostgreSQL and cloud-native deployment. Lately I've been exploring AI-integrated systems - LLM workflows, RAG architectures and vector databases - and folding them into the way I build.",
  ],
};

export const stripWords = ["Services", "Services", "Services", "Services"];

// ---------------------------------------------------------------
// Services — the rounded pill rows on the dark half
// ---------------------------------------------------------------

export const services = [
  {
    name: "Full Stack Development",
    tags: ["React", "Next.js", "TypeScript", "Supabase"],
    image: IMG("1633356122544-f134324a6cee", 700),
  },
  {
    name: "Backend & API Engineering",
    tags: ["Node.js", "Express.js", "NestJS", "PostgreSQL", "Redis"],
    image: IMG("1558494949-ef010cbdcc31", 700),
  },
  {
    name: "Cloud & DevOps",
    tags: ["Docker", "AWS", "Vercel", "Cloudflare", "CI/CD"],
    image: IMG("1451187580459-43490279c0fa", 700),
  },
  {
    name: "UI Engineering",
    tags: ["Tailwind", "Shadcn UI", "Zustand", "Figma"],
    image: IMG("1516116216624-53e697fedbea", 700),
  },
];

// ---------------------------------------------------------------
// Work — floating cards over the giant WORK wordmark
// ---------------------------------------------------------------

export const projects = [
  {
    title: "AI-Powered Coding Platform",
    tags: ["Full Stack", "AI"],
    meta: "A browser-based code editor with secure auth, problem management, submissions and AI-generated code reviews. Structured feedback covers time and space complexity, strengths and concrete improvements, stored alongside submission history.",
    stack: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Docker",
      "OpenRouter AI",
    ],
    role: "Solo build",
    year: "2026",
    href: "https://github.com/CodeWithAnkit12/ai-powered-coding-platform",
    image: IMG("1498050108023-c5249f4df085"),
  },
  {
    title: "SyncFlow Automator",
    tags: ["Platform", "Realtime"],
    meta: "A full-stack workflow orchestration platform with real-time dashboard visualisation. Raised processing efficiency by 35% and cut task-monitoring time by 30%, with JWT auth enforced across frontend and backend services.",
    stack: ["React", "Next.js", "Node.js", "NestJS", "PostgreSQL", "Docker"],
    role: "Solo build",
    year: "2026",
    href: "https://github.com/CodeWithAnkit12",
    image: IMG("1605810230434-7631ac76ec81"),
  },
  {
    title: "Admin Portal",
    tags: ["Product", "Frontend"],
    meta: "Architected end to end from Figma to production. Built the Deal Output Parameter module and onboarding APIs with an RBAC model, input validation and sanitisation — 40% less manual reporting, 30% fewer onboarding errors.",
    stack: ["Next.js", "Shadcn UI", "Tailwind CSS", "Zustand", "REST APIs"],
    role: "Software Engineer",
    year: "2026",
    href: null,
    image: IMG("1487058792275-0ad4aaf24ca7"),
  },
  {
    title: "INNOFarms.AI Platform",
    tags: ["Backend", "Cloud"],
    meta: "Ten-plus end-to-end features on a Next.js and Node.js stack, containerised with Docker and shipped to Azure through GitHub Actions. Scalable REST APIs with structured error handling cut average response time by 30%.",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Docker", "Azure"],
    role: "Software Engineer",
    year: "2025",
    href: null,
    image: IMG("1526374965328-7f61d4dc18c5"),
  },
  {
    title: "SkillLink Pro",
    tags: ["Full Stack", "Networking"],
    meta: "A full-stack professional networking platform. Improved page load speed and SEO performance by 30%, and built reusable frontend components plus scalable backend routes that cut new-feature development time by 35%.",
    stack: [
      "TypeScript",
      "React-Redux",
      "Next.js",
      "Node.js",
      "Express.js",
      "MySQL",
      "Node Mailer",
      "Multer",
    ],
    role: "Full Stack Developer",
    year: "2026",
    href: "https://github.com/CodeWithAnkit12",
    image: IMG("1499951360447-b19be8fe80f5"),
  },
  {
    title: "Shop-Sphere",
    tags: ["E-commerce", "Full Stack"],
    meta: "A dynamic e-commerce application with product browsing, search, shopping-cart management and secure checkout. Modern responsive front end backed by services built for efficient data handling and payment integration.",
    stack: [
      "TypeScript",
      "React-Redux",
      "Next.js",
      "Node.js",
      "Express.js",
      "MySQL",
      "Multer",
    ],
    role: "Full Stack Developer",
    year: "2025",
    href: "https://github.com/CodeWithAnkit12",
    image: IMG("1556742049-0cfed4f6a45d"),
  },
  {
    title: "Generative AI Automation",
    tags: ["AI", "Backend"],
    meta: "Integrated LLM-based APIs (OpenAI and Gemini style workflows) into backend services for intelligent data extraction and decision support, with an interface to manage and monitor AI-driven automation processes.",
    stack: [
      "Node.js",
      "TypeScript",
      "OpenAI API",
      "Gemini API",
      "REST APIs",
      "Prompt Engineering",
      "JSON",
    ],
    role: "Full Stack Developer",
    year: "2026",
    href: "https://github.com/CodeWithAnkit12",
    image: IMG("1677442136019-21780ecad995"),
  },
  {
    title: "Marketing Website",
    tags: ["Frontend", "Cloud"],
    meta: "Built and deployed a dynamic marketing website for INNOFarms.AI with React on the front end and Node.js/Express behind it. Hosted on Microsoft Azure for a scalable, high-performance deployment, with a responsive design throughout.",
    stack: [
      "JavaScript",
      "React",
      "Node.js",
      "Express.js",
      "MySQL",
      "Azure",
      "CDN",
    ],
    role: "Full Stack Developer",
    year: "2025",
    href: null,
    image: IMG("1460925895917-afdab827c52f"),
  },
];

// ---------------------------------------------------------------
// Recognition — hairline rows with a pointer-following preview
// ---------------------------------------------------------------

export const awards = [
  {
    org: "LeetCode",
    what: "50 Days Badge - Competitive Programming",
    year: "2026",
    image: IMG("1550439062-609e1531270e", 600),
  },
  {
    org: "Udemy",
    what: "Full Stack Web Development - MERN & GenAI",
    year: "2026",
    image: IMG("1555066931-4365d14bab8c", 600),
  },
  {
    org: "LeetCode",
    what: "50 Days Badge - Competitive Programming",
    year: "2025",
    image: IMG("1461749280684-dccba630e2f6", 600),
  },
  {
    org: "Milestone",
    what: "500+ DSA Problems Solved",
    year: "2026",
    image: IMG("1517180102446-f3ece451e9d8", 600),
  },
  {
    org: "BIT Mesra",
    what: "BTech - Electronics and Communication",
    year: "2025",
    image: IMG("1499951360447-b19be8fe80f5", 600),
  },
];


export const experienceHeading =
  "More than One Year of shipping production software - admin portals, scalable APIs, and cloud pipelines that stay up.";

export const experience = [
  {
    company: "Tred+",
    role: "Software Engineer",
    period: "Feb 2026 — Present",
    place: "Ahmedabad, Gujarat",
    summary:
      "Architected the Admin Portal end to end, turning Figma designs into production features. Built the Deal Output Parameter module and onboarding APIs with RBAC, and resolved 45+ production-critical defects.",
    stack: [
      "Next.js",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Supabase",
      "AWS",
      "Vercel",
    ],
    image: IMG("1551288049-bebda4e38f71", 700),
  },
  {
    company: "INNOFarms.AI",
    role: "Software Engineer",
    period: "Nov 2024 — Oct 2025",
    place: "Gurugram, Haryana",
    summary:
      "Delivered 10+ end-to-end features in an agile team, containerised the app with Docker and deployed to Azure via GitHub Actions at 99.9% uptime. Designed REST APIs that cut average response time by 30%.",
    stack: ["Next.js", "Node.js", "PostgreSQL", "SQL", "Docker", "Azure"],
    image: IMG("1530836369250-ef72a3f5cda8", 700),
  },
  {
    company: "SmartED",
    role: "Full Stack Intern",
    period: "Internship",
    place: "Remote",
    summary:
      "First hands-on experience with full stack web development — building user-centric applications and learning how product requirements become technical decisions.",
    stack: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "SQL",
    ],
    image: IMG("1522202176988-66273c2fd55f", 700),
  },
];

// ---------------------------------------------------------------
// Tool grid — the staggered tiles near the bottom
// ---------------------------------------------------------------

export const toolsLabel = "The stack I build with";

// Add or remove a group and the section follows — Logos.jsx just maps over it.
// Each item: { name, icon } for a brand logo in public/icons, or
// { name, abbr } for a concept that has no logo. `brand` tints the hover glow.
export const toolGroups = [
  {
    label: "Languages",
    items: [
      { name: "C", icon: "c", brand: "#A8B9CC" },
      { name: "C++", icon: "cplusplus", brand: "#00599C" },
      { name: "Java", icon: "java", brand: "#ED8B00" },
      { name: "Python", icon: "python", brand: "#3776AB" },
      { name: "JavaScript", icon: "javascript", brand: "#F7DF1E" },
      { name: "TypeScript", icon: "typescript", brand: "#3178C6" },
    ],
  },
  {
    label: "Frameworks & Libraries",
    items: [
      { name: "React", icon: "react", brand: "#61DAFB" },
      { name: "Next.js", icon: "nextjs", brand: "#0B0B0B" },
      { name: "Node.js", icon: "nodejs", brand: "#5FA04E" },
      { name: "Express.js", icon: "express", brand: "#0B0B0B" },
      { name: "NestJS", icon: "nestjs", brand: "#E0234E" },
      { name: "Tailwind CSS", icon: "tailwindcss", brand: "#06B6D4" },
      { name: "Shadcn UI", icon: "shadcnui", brand: "#0B0B0B" },
      { name: "Zustand", abbr: "ZU", brand: "#7A5C3E" },
    ],
  },
  {
    label: "Databases",
    items: [
      { name: "PostgreSQL", icon: "postgresql", brand: "#4169E1" },
      { name: "MySQL", icon: "mysql", brand: "#00758F" },
      { name: "Redis", icon: "redis", brand: "#FF4438" },
      { name: "Supabase", icon: "supabase", brand: "#3FCF8E" },
      { name: "CosmosDB", abbr: "CDB", brand: "#0078D4" },
    ],
  },
  {
    label: "Cloud & DevOps",
    items: [
      { name: "Docker", icon: "docker", brand: "#2496ED" },
      { name: "AWS", icon: "amazonwebservices", brand: "#FF9900" },
      { name: "Azure", icon: "azure", brand: "#0078D4" },
      { name: "Vercel", icon: "vercel", brand: "#0B0B0B" },
      { name: "Cloudflare", icon: "cloudflare", brand: "#F38020" },
      { name: "GitHub Actions", icon: "githubactions", brand: "#2088FF" },
      { name: "CI/CD", abbr: "CI", brand: "#6E56CF" },
    ],
  },
  {
    label: "Developer Tools",
    items: [
      { name: "Git", icon: "git", brand: "#F05032" },
      { name: "Copilot", icon: "githubcopilot", brand: "#0B0B0B" },
      { name: "Postman", icon: "postman", brand: "#FF6C37" },
      { name: "Swagger", icon: "swagger", brand: "#85EA2D" },
      { name: "Vite", icon: "vitejs", brand: "#646CFF" },
      { name: "ESLint", icon: "eslint", brand: "#4B32C3" },
      { name: "Figma", icon: "figma", brand: "#F24E1E" },
      { name: "Prisma ORM", icon: "prisma", brand: "#2D3748" },
    ],
  },
  {
    label: "AI Tools",
    items: [
      { name: "ChatGPT", abbr: "GPT", brand: "#10A37F" },
      { name: "Claude", icon: "claude", brand: "#D97757" },
      { name: "Cursor", icon: "cursor", brand: "#111111" },
      { name: "GitHub Copilot", icon: "githubcopilot", brand: "#0B0B0B" },
      { name: "Google Gemini", icon: "googlegemini", brand: "#4285F4" },
      { name: "Google AI Studio", icon: "google", brand: "#4285F4" },
      { name: "Google Colab", icon: "googlecolab", brand: "#F9AB00" },
      { name: "Perplexity", icon: "perplexity", brand: "#20B8CD" },
      { name: "NotebookLM", icon: "notebooklm", brand: "#8E75B2" },
      { name: "OpenRouter", icon: "openrouter", brand: "#6E56CF" },
    ],
  },
  {
    label: "Concepts",
    items: [
      { name: "Data Structures & Algorithms", abbr: "DSA", brand: "#FF4A17" },
      { name: "Low-Level Design", abbr: "LLD", brand: "#6E56CF" },
      { name: "RESTful APIs", abbr: "API", brand: "#0F9D58" },
      { name: "MVC", abbr: "MVC", brand: "#D9480F" },
      { name: "Modular Architecture", abbr: "MOD", brand: "#1971C2" },
      { name: "Microservices", abbr: "MSA", brand: "#C2255C" },
    ],
  },
  {
    label: "Coursework",
    items: [
      { name: "Object Oriented Programming", abbr: "OOP", brand: "#2B8A3E" },
      { name: "Database Management Systems", abbr: "DBMS", brand: "#5F3DC4" },
    ],
  },
];

// ---------------------------------------------------------------
// Contact + navigation
// ---------------------------------------------------------------

export const contactDetails = [
  { icon: "◉", text: "Ahmedabad, Gujarat, India", href: null },
  {
    icon: "✉",
    text: "ankit.kumar.info36@gmail.com",
    href: "mailto:ankit.kumar.info36@gmail.com",
  },
  { icon: "☏", text: "+91 81020 25681", href: "tel:+918102025681" },
];

export const contactHeading = ["Let's build", "something", "that scales"];

export const navLinks = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const footerLinks = navLinks.slice(1);
