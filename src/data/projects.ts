import type { Project } from "@/types/project.types";

// next project id will be 25

export const projects: Project[] = [
  {
    id: 19,
    name: "Circuit Nation",
    description:
      "A multi-app motorsport platform spanning fan experiences, editorial tooling, and operational APIs.",
    skills: ["React", "TypeScript", "APIs", "Product Systems"],
    githubUrl: "https://github.com/circuit-nation/circuit_nation",
    liveUrl: "https://www.circuitnation.live"
  },
  {
    id: 20,
    name: "Pitwall",
    description:
      "A live race-control dashboard for tracking telemetry, comparisons, and on-track events.",
    skills: ["Python", "Telemetry", "Data Visualization", "Motorsport"],
    githubUrl: "https://github.com/prnvtripathi/pitwall",
  },
  {
    id: 2,
    name: "Trafyx",
    description:
      "A collaborative API and load-testing platform with test-case workflows, authentication, and cloud delivery.",
    image: "/projects/trafix.png",
    skills: ["Next.js", "Golang", "MongoDB", "Kestra", "Redis"],
    archived: true,
    liveUrl: "https://trafyx.kyrexi.tech",
    githubUrl: "https://github.com/kyrexi/trafyx",
  },
  {
    id: 21,
    name: "Obligence",
    description:
      "A contract-analysis workspace for document review, reporting, and delivery workflows.",
    skills: ["Contract Analysis", "Reporting", "APIs", "Cloud Deployment"],
    githubUrl: "https://github.com/kyrexi/obligence",
  },
  {
    id: 22,
    name: "FreeRangeNotify",
    description:
      "A notification platform with template workflows, authenticated administration, and billing controls.",
    skills: ["Notifications", "Authentication", "Billing", "Product UI"],
    githubUrl: "https://github.com/the-monkeys/freerangenotify",
    liveUrl: "https://www.freerangenotify.com"
  },
  {
    id: 23,
    name: "Ronaldo Goal Checker",
    description:
      "A football analytics app for exploring Cristiano Ronaldo's goals, match insights, and live statistics.",
    skills: ["Next.js", "TypeScript", "Sportmonks", "Data Visualization"],
    liveUrl: "https://ronaldo-goal-checker.vercel.app",
    githubUrl: "https://github.com/prnvtripathi/ronaldo-goal-checker",
  },
  {
    id: 24,
    name: "Client Work",
    description:
      "Selected work on operational systems, workflow automation, and user-facing dashboards for private clients.",
    skills: ["Workflow Automation", "Dashboards", "API Integrations"],
  },
  {
    id: 1,
    name: "Go Tiny",
    description: "A URL shortener with analytics, click tracking, and QR-code generation.",
    image: "/projects/gotiny.png",
    skills: ["Next.js", "Golang", "Postgres", "Redis"],
    liveUrl: "https://go-tiny.vercel.app",
    githubUrl: "https://github.com/prnvtripathi/go-tiny",
  },
  {
    id: 10,
    name: "Captions Gen",
    description:
      "A video transcription tool that creates editable captions with AWS Transcribe.",
    image: "/projects/captionsgen.png",
    skills: ["React", "Node.js", "AWS Transcribe", "Tailwind CSS"],
    // liveUrl: "#",
    githubUrl: "https://github.com/prnvtripathi/captions-gen",
  },
  {
    id: 14,
    name: "Quill",
    description:
      "An AI-powered note-taking app built with Groq and Supabase.",
    image: "/projects/quill.png",
    skills: ["Next.js", "Supabase", "React Query", "Tailwind CSS"],
    liveUrl: "https://quill-noter.vercel.app",
    githubUrl: "https://github.com/prnvtripathi/quill",
  },
  {
    id: 17,
    name: "Colorfool",
    description:
      "A color conversion tool supporting RGB, Hex, and OKHSL formats.",
    image: "/projects/colorfool.png",
    skills: ["Next.js", "Tailwind CSS", "shadcn/ui", "Culori"],
    liveUrl: "https://colorfool.vercel.app/",
    githubUrl: "https://github.com/prnvtripathi/colorfool",
  },
  {
    id: 18,
    name: "JXON",
    description:
      "A prompt workspace that turns free-form requests into structured JSON with chat and prompt-library tooling.",
    image: "/projects/jxon.png",
    skills: ["Next.js", "Tailwind CSS", "shadcn/ui", "Groq"],
    liveUrl: "https://jxon.vercel.app/",
    githubUrl: "https://github.com/prnvtripathi/json-prompter",
  },
  {
    id: 16,
    name: "Dependency Visualizer",
    description:
      "A Go CLI that visualizes project dependencies as a navigable tree and JSON export.",
    image: "/projects/deps-tree.png",
    skills: ["Golang", "CLI", "Cobra"],
    githubUrl: "https://github.com/prnvtripathi/dep-tree-visualizer",
  },
  {
    id: 3,
    name: "GoalPost",
    description:
      "A goal-tracking app with scheduled email reminders.",
    image: "/projects/goalpost.png",
    skills: ["Next.js", "MongoDB", "Node.js", "Cron Jobs"],
    liveUrl: "https://goalpost-lac.vercel.app/",
    githubUrl: "https://github.com/kyrexi/goalpost",
  },
  {
    id: 13,
    name: "Next Gen CRM",
    description:
      "A multi-organization CRM for managing customer relationships, leads, and sales.",
    image: "/projects/nextgencrm.png",
    skills: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    liveUrl: "https://one-crm.vercel.app/",
    githubUrl: "https://github.com/Ishaan2053/Next-gen-CRM--Ishaan-",
  },
  {
    id: 15,
    name: "Semantic Book Recommender",
    description:
      "A semantic book recommender that finds similar titles using vector embeddings.",
    image: "/projects/bookrecommender.png",
    skills: ["Python", "Gradio", "LangChain", "ChromaDB", "OpenAI"],
    githubUrl: "https://github.com/prnvtripathi/book-recommender",
  },
  {
    id: 11,
    name: "Create Next Auth App",
    description:
      "A CLI that scaffolds Next.js applications with NextAuth.",
    image: "/projects/crna.png",
    skills: ["CLI", "NPM", "JavaScript"],
    // liveUrl: "#",
    githubUrl: "https://github.com/prnvtripathi/create-next-next-auth",
  },
  {
    id: 12,
    name: "Go Load Balancer",
    description:
      "A round-robin Go load balancer with backend health checks.",
    image: "/projects/lb.png",
    skills: ["Golang"],
    // liveUrl: "#",
    githubUrl: "https://github.com/prnvtripathi/load-balancer",
  },
  {
    id: 4,
    name: "Gardenify",
    description: "A plant-care platform for tracking indoor plants and products.",
    image: "/projects/gardenify.png",
    skills: ["Next.js", "Tailwind CSS", "MongoDB"],
    archived: true,
    liveUrl: "https://gardenify.vercel.app",
    githubUrl: "https://github.com/prnvtripathi/gardenify",
  },
  {
    id: 5,
    name: "Gardenify Admin",
    description: "An admin dashboard for managing Gardenify users, products, and plant data.",
    image: "/projects/gadmin.png",
    skills: ["Next.js", "Tailwind CSS", "MongoDB", "AWS S3"],
    liveUrl: "https://gardenify-admin.vercel.app",
    githubUrl: "https://github.com/prnvtripathi/gardenify-admin",
  },
  {
    id: 6,
    name: "Campaigning Source",
    description:
      "A digital-agency website for presenting services, case studies, and client work.",
    image: "/projects/cs.png",
    skills: ["React", "Node.js", "MongoDB"],
    liveUrl: "https://campaigningsource.com",
    githubUrl: "https://github.com/prnvtripathi",
  },
  {
    id: 7,
    name: "Earth Impact",
    description:
      "A carbon-footprint platform for tracking environmental impact and sustainability actions.",
    image: "/projects/earthimpact.jpeg",
    skills: ["Next.js", "MongoDB", "Tailwind CSS"],
    liveUrl: "https://earth-impact.vercel.app",
    githubUrl: "https://github.com/prnvtripathi/earthimpact",
  },
  {
    id: 8,
    name: "Weather App",
    description: "A weather forecasting app built with the OpenWeather API.",
    image: "/projects/weather.png",
    skills: ["React", "CSS", "Weather API"],
    liveUrl: "https://weather-app-prnvtripathi.netlify.app/",
    githubUrl: "https://github.com/prnvtripathi/weather-app",
  },
  // {
  //   id: 9,
  //   name: "Keep-It Notes",
  //   description: "A lightweight note-taking application.",
  //   image: "/placeholder.svg?height=300&width=600",
  //   skills: ["React", "Spheron"],
  //   liveUrl: "http://keepit-326c81.spheron.app/",
  //   githubUrl: "https://github.com/prnvtripathi/KeepIt",
  // },
];
