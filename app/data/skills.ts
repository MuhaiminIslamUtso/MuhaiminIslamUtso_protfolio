// ─────────────────────────────────────────────────
// Skills data – update categories and items here
// ─────────────────────────────────────────────────

export interface Skill {
  name: string;
  description?: string;
  icon?: string; // emoji or short label
}

export interface SkillCategory {
  id: string;
  label: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    label: "Programming Languages",
    skills: [
      {
        name: "C#",
        description: "Primary language for academic desktop projects and OOP learning.",
        icon: "C#",
      },
      {
        name: "JavaScript",
        description: "Used for web development, interactive UIs, and server-side scripting.",
        icon: "JS",
      },
      {
        name: "TypeScript",
        description: "Typed superset of JavaScript for more reliable, maintainable code.",
        icon: "TS",
      },
    ],
  },
  {
    id: "frontend",
    label: "Frontend Development",
    skills: [
      {
        name: "HTML",
        description: "Semantic markup for web content structure.",
        icon: "HTML",
      },
      {
        name: "CSS",
        description: "Styling and layout for web interfaces.",
        icon: "CSS",
      },
      {
        name: "React",
        description: "Component-based library for building interactive user interfaces.",
        icon: "Re",
      },
      {
        name: "React Native",
        description: "Cross-platform mobile development using React paradigms.",
        icon: "RN",
      },
    ],
  },
  {
    id: "backend",
    label: "Backend Development",
    skills: [
      {
        name: "Node.js",
        description: "JavaScript runtime for server-side development.",
        icon: "Nd",
      },
      {
        name: "NestJS",
        description: "Progressive Node.js framework for building scalable APIs.",
        icon: "Ne",
      },
    ],
  },
  {
    id: "database",
    label: "Databases",
    skills: [
      {
        name: "Microsoft SQL Server",
        description: "Relational database used in academic desktop applications.",
        icon: "SQL",
      },
      {
        name: "SQL",
        description: "Structured query language for database management and queries.",
        icon: "DB",
      },
      {
        name: "PostgreSQL",
        description: "Open-source relational database — learning for backend projects.",
        icon: "PG",
      },
    ],
  },
  {
    id: "tools",
    label: "Development Tools",
    skills: [
      {
        name: "Git",
        description: "Version control for tracking code changes and collaboration.",
        icon: "Git",
      },
      {
        name: "GitHub",
        description: "Platform for hosting and collaborating on code repositories.",
        icon: "GH",
      },
      {
        name: "Visual Studio",
        description: "Primary IDE for C# and .NET desktop development.",
        icon: "VS",
      },
      {
        name: "Visual Studio Code",
        description: "Lightweight editor for web and TypeScript development.",
        icon: "VSC",
      },
      {
        name: "Postman",
        description: "API testing and development tool.",
        icon: "PM",
      },
      {
        name: "Expo",
        description: "Framework and platform for React Native development.",
        icon: "Ex",
      },
    ],
  },
];

