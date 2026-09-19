export const PROFILE = {
  name: "Mutassim Al Shahriar Zeem",
  shortName: "Zeem",
  handle: "zeem",
  role: "Backend & AI Engineer",
  tagline:
    "I build the systems behind the interface — APIs, data pipelines and machine-learning models that make it to production, not just to the notebook.",
  location: "Dhaka, Bangladesh",
  timezone: "UTC+6",
  email: "mutassimalshahriar@gmail.com",
  phone: "+880 199 590 1858",
  phoneHref: "+8801995901858",
  github: "https://github.com/mutassimalzeem",
  linkedin: "https://www.linkedin.com/in/mutassimalshahriar",
  resume: "/resume.pdf",
  photo: "/zeem.jpg",
  availability: "Open to freelance & remote work",
  about: [
    "I'm an engineering student focused on backend engineering, system design and AI integration. I build real-world applications with Python, FastAPI and PostgreSQL while going deep on machine learning, computer vision and NLP.",
    "Before code, there was design: two years of freelance graphic design for 50+ clients taught me that clean systems and clean visuals come from the same discipline — ruthlessly cutting what doesn't serve the user.",
  ],
};

export const STATS = [
  { value: 2, suffix: "+", label: "Years building backends & ML systems" },
  { value: 8, suffix: "+", label: "Projects shipped or in active dev" },
  { value: 50, suffix: "+", label: "Design clients served worldwide" },
  { value: 4, suffix: "", label: "Languages spoken" },
];

export type ProjectCategory = "ai-ml" | "backend" | "data";

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  category: ProjectCategory;
  categoryLabel: string;
  status: "live" | "wip";
  repo?: string;
  year: string;
}

export const PROJECTS: Project[] = [
  {
    id: "zyra",
    name: "Zyra",
    tagline: "Smart finance AI assistant",
    description:
      "An AI assistant platform focused on productivity, contextual memory and agentic workflows. Zyra combines modern LLM capabilities — retrieval over vector databases, tool use, personalized task execution — into a scalable AI ecosystem designed for real-world automation rather than demos.",
    tech: ["FastAPI", "React", "PostgreSQL", "LangChain", "Vector DB", "OpenAI"],
    category: "ai-ml",
    categoryLabel: "AI & Agents",
    status: "wip",
    year: "2025",
  },
  {
    id: "filenest",
    name: "FileNest",
    tagline: "File sharing platform",
    description:
      "Production-oriented file sharing platform with secure uploads, JWT authentication, file management and a scalable backend architecture. Built to study the boring-but-critical parts: storage strategy, access control and API design that holds up under real traffic.",
    tech: ["FastAPI", "PostgreSQL", "JWT", "REST"],
    category: "backend",
    categoryLabel: "Backend",
    status: "live",
    repo: "https://github.com/mutassimalzeem/FileNest-File-Sharing-App",
    year: "2024",
  },
  {
    id: "vision",
    name: "Vision Classification Pipeline",
    tagline: "End-to-end computer vision",
    description:
      "A complete computer-vision pipeline covering data preparation, training, evaluation and deployment-ready inference APIs. The interesting part is everything around the model: reproducible preprocessing, honest evaluation, and serving that doesn't fall over.",
    tech: ["Python", "PyTorch", "FastAPI", "Computer Vision"],
    category: "ai-ml",
    categoryLabel: "AI & ML",
    status: "live",
    repo: "https://github.com/mutassimalzeem/vision-classification-pipeline",
    year: "2024",
  },
  {
    id: "forecasting",
    name: "Store Sales Forecasting",
    tagline: "Time series that doesn't leak",
    description:
      "Business-focused forecasting system implementing leakage-safe feature engineering and robust temporal validation. Most time-series projects cheat without knowing it — this one is built so every feature and every split respects time.",
    tech: ["Python", "Pandas", "XGBoost", "Forecasting"],
    category: "data",
    categoryLabel: "Data & ML",
    status: "live",
    repo: "https://github.com/mutassimalzeem/store-sales-time-series-forecasting",
    year: "2024",
  },
  {
    id: "realestate",
    name: "Real Estate Price Prediction",
    tagline: "Valuation with explainability",
    description:
      "Machine-learning system for property valuation featuring advanced feature engineering and explainability techniques. A prediction without a reason is useless in real estate — this project treats feature importance and error analysis as first-class citizens.",
    tech: ["Python", "scikit-learn", "Explainable AI"],
    category: "data",
    categoryLabel: "Data & ML",
    status: "live",
    repo: "https://github.com/mutassimalzeem/Real-Estate-Price-Prediction-System",
    year: "2024",
  },
  {
    id: "tabular",
    name: "Tabular Classification Pipeline",
    tagline: "The full ML workflow",
    description:
      "A complete, reusable ML workflow covering preprocessing, feature engineering, model training, validation and deployment considerations. Built as the pipeline I wished every tabular project started from.",
    tech: ["Python", "scikit-learn", "ML Pipeline"],
    category: "data",
    categoryLabel: "Data & ML",
    status: "live",
    repo: "https://github.com/mutassimalzeem/end-to-end-tabular-classification-pipeline-design",
    year: "2024",
  },
  {
    id: "transformer",
    name: "Transformer From Scratch",
    tagline: "Attention, built by hand",
    description:
      "Educational implementation of the Transformer architecture built step by step to understand attention mechanisms, embeddings and the foundations of modern NLP. No copied blocks — every dimension mismatch was earned.",
    tech: ["Python", "Transformers", "Deep Learning", "NLP"],
    category: "ai-ml",
    categoryLabel: "AI & ML",
    status: "live",
    repo: "https://github.com/mutassimalzeem/transformer-from-scratch",
    year: "2024",
  },
];

export const SKILL_GROUPS = [
  {
    id: "core",
    title: "Programming & core",
    note: "The foundation everything else stands on",
    skills: ["Python", "C", "SQL", "Data Structures & Algorithms"],
  },
  {
    id: "backend",
    title: "Backend & DevOps",
    note: "Where I spend most of my time",
    skills: ["FastAPI", "PostgreSQL", "REST / JWT", "Docker & Linux", "Git / GitHub"],
  },
  {
    id: "ml",
    title: "Machine learning & data",
    note: "From notebooks to production",
    skills: ["Pandas & NumPy", "scikit-learn", "TensorFlow & PyTorch", "LangChain & FAISS", "Computer Vision & NLP"],
  },
  {
    id: "frontend",
    title: "Frontend & apps",
    note: "Enough to ship the whole thing",
    skills: ["HTML & CSS", "JavaScript & React", "PyQt5"],
  },
  {
    id: "design",
    title: "Tools & design",
    note: "The years before code still pay off",
    skills: ["Figma & Canva", "Adobe Illustrator & Photoshop", "Markdown & LaTeX", "VS Code & Postman"],
  },
];

export const TICKER_ITEMS = [
  "Python",
  "FastAPI",
  "PostgreSQL",
  "PyTorch",
  "TensorFlow",
  "scikit-learn",
  "LangChain",
  "FAISS",
  "Docker",
  "Linux",
  "React",
  "XGBoost",
  "Computer Vision",
  "NLP",
  "REST / JWT",
  "Pandas",
];

export const JOURNEY = [
  {
    kind: "work" as const,
    period: "2024 — Present",
    title: "Backend & AI Engineer",
    place: "Independent",
    detail:
      "Designing APIs, databases and data pipelines with FastAPI and PostgreSQL. Integrating ML models into production systems and exploring ways to bring AI closer to users through scalable cloud-native architectures.",
  },
  {
    kind: "edu" as const,
    period: "2024 — 2028 (expected)",
    title: "BSc, Electrical & Electronics Engineering",
    place: "Islamic University of Technology, Bangladesh",
    detail:
      "Foundations in mathematics, signal processing, embedded systems and computer architecture — applied to AI and ML across interdisciplinary projects.",
  },
  {
    kind: "edu" as const,
    period: "2022 — 2024",
    title: "Higher Secondary Certificate, Science",
    place: "Notre Dame College, Dhaka",
    detail: "Physics, chemistry, mathematics — completed with a perfect GPA (5.00/5.00).",
  },
  {
    kind: "work" as const,
    period: "2020 — 2022",
    title: "Freelance Graphic Designer",
    place: "50+ clients worldwide",
    detail:
      "Branding, logos and UI components with Illustrator and Photoshop. Trained the eye for detail and craft that now shows up in technical work.",
  },
];

export const NAV_SECTIONS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
] as const;
