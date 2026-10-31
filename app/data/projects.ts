// ─────────────────────────────────────────────────
// Projects data – add or update projects here
// ─────────────────────────────────────────────────

export type ProjectStatus = "completed" | "in-development" | "academic" | "concept";

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  status: ProjectStatus;
  technologies: string[];
  repositoryUrl?: string;
  liveUrl?: string;
  features: string[];
  challenges?: string[];
  learningOutcomes?: string[];
  highlights?: string[];
}

export const projects: Project[] = [
  {
    id: "1",
    slug: "aiub-sports-event-management",
    title: "AIUB Sports Event Management System",
    shortDescription:
      "An academic desktop application for managing university sports events, participants, and results.",
    description:
      "A comprehensive desktop application developed as an academic project to manage sports events at AIUB. Built with C# Windows Forms and Microsoft SQL Server, it provides functionality for event registration, participant management, scheduling, and result tracking — all within a structured, database-driven architecture.",
    category: "Desktop Application",
    status: "academic",
    technologies: ["C#", "Windows Forms", ".NET", "Microsoft SQL Server", "OOP"],
    repositoryUrl:
      "https://github.com/MuhaiminIslamUtso/aiub-sports-event-management-system",
    features: [
      "Event creation and management",
      "Participant registration and tracking",
      "Schedule management for multiple sports",
      "Result recording and display",
      "Database-backed persistent storage",
      "Object-oriented architecture with clear separation of concerns",
    ],
    challenges: [
      "Designing a normalized relational database schema for complex event relationships",
      "Building an intuitive Windows Forms UI that handles various event types",
      "Implementing proper data validation and error handling throughout the application",
    ],
    learningOutcomes: [
      "Practical experience with C# object-oriented programming",
      "Database design and SQL Server integration",
      "Windows Forms application development",
      "Project planning and structured development workflow",
    ],
  },
  {
    id: "2",
    slug: "hospital-management-system",
    title: "Hospital Management System",
    shortDescription:
      "An academic desktop application for managing hospital operations including patients, doctors, and appointments.",
    description:
      "A desktop application developed as an academic project using C# and Windows Forms. This system simulates core hospital management functionality, allowing management of patient records, doctor information, appointment scheduling, and basic administrative tasks within a database-integrated desktop environment.",
    category: "Desktop Application",
    status: "academic",
    technologies: ["C#", "Windows Forms", ".NET", "Database Integration", "OOP"],
    repositoryUrl:
      "https://github.com/MuhaiminIslamUtso/hospital-management-system-csharp",
    features: [
      "Patient record management",
      "Doctor and staff information management",
      "Appointment scheduling system",
      "Department and ward management",
      "Basic administrative reporting",
      "Database-integrated persistent data storage",
    ],
    challenges: [
      "Modeling real-world hospital workflows into a software system",
      "Managing relational data across multiple interconnected entities",
      "Designing user interfaces suitable for administrative workflows",
    ],
    learningOutcomes: [
      "Domain modeling for complex real-world systems",
      "Deeper understanding of relational database design",
      "Experience building multi-form desktop applications in C#",
      "Appreciation for user-centered design in practical software",
    ],
  },
  {
    id: "3",
    slug: "campusride",
    title: "CampusRide",
    shortDescription:
      "A university-focused student ride-sharing mobile application — currently in development.",
    description:
      "CampusRide is a mobile application concept designed to connect university students who need rides with students who can provide them. The goal is to build a safe, convenient, and community-driven ride-sharing platform specifically tailored for university environments. The project is currently in active development using React Native and Expo for the frontend, with a NestJS backend planned.",
    category: "Mobile Application",
    status: "in-development",
    technologies: ["React Native", "Expo", "Node.js", "NestJS", "TypeScript"],
    features: [
      "Student ride request and offer matching",
      "University campus-focused location features",
      "Student verification system (planned)",
      "In-app communication between riders and drivers (planned)",
      "Ride history and profile management (planned)",
      "Safety-focused community features (planned)",
    ],
    challenges: [
      "Designing an intuitive mobile UX for real-time ride matching",
      "Building secure student identity verification",
      "Structuring a scalable NestJS backend architecture",
      "Handling real-time location and communication features",
    ],
    learningOutcomes: [
      "React Native and Expo mobile development workflow",
      "NestJS backend architecture and REST API design",
      "TypeScript across both frontend and backend",
      "Mobile UX design considerations",
    ],
    highlights: ["In active development", "Full-stack mobile project"],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getRelatedProjects(currentSlug: string): Project[] {
  return projects.filter((p) => p.slug !== currentSlug).slice(0, 2);
}

