import maleAvatar from '../assets/images/bangladeshi_male_programmer_1786191005596.jpg';

export const defaultData = {
  secretKey: "tanjim123",
  header: {
    logo: "Tanjim",
    navLinks: [
      { id: "1", label: "About", href: "#about" },
      { id: "2", label: "Projects", href: "#projects" },
      { id: "3", label: "Skills", href: "#skills" },
      { id: "4", label: "Contact", href: "#contact" }
    ],
    cta: { text: "Get in Touch", href: "#contact", show: true }
  },
  hero: {
    title: "I am Tanjim — Programmer.",
    subtitle: "A beginner programmer from Bangladesh building real projects and using AI for better results, faster and cleaner.",
    primaryBtn: { text: "View Projects", link: "#projects" },
    secondaryBtn: { text: "Contact Me", link: "#contact" },
    codeBlock: [
      "const developer = {",
      '  name: "Tanjim Ahmed",',
      '  location: "Bangladesh 🇧🇩",',
      '  role: "Junior Software Developer & AI Builder",',
      '  stack: ["JavaScript", "React", "Node.js", "Tailwind CSS"],',
      '  mindset: "Build fast, learn continuously, craft clean UI",',
      '  availableForWork: true',
      "};"
    ]
  },
  about: {
    longText: "I'm a passionate self-taught programmer based in Bangladesh. My journey started with curiosity about how web applications and computer logic work. I build responsive web apps, interactive frontend tools, and integrate AI models to solve real-world problems efficiently. I believe in writing clean code, paying attention to design details, and continuously upgrading my skills.",
    stats: [
      { id: "1", label: "Projects Built", value: "15+" },
      { id: "2", label: "Code Commits", value: "800+" },
      { id: "3", label: "Technologies", value: "12+" },
      { id: "4", label: "Satisfaction", value: "100%" }
    ],
    location: "Bangladesh 🇧🇩",
    avatar: maleAvatar
  },
  projects: [
    {
      id: "proj-1",
      title: "AI Assistant Dashboard",
      description: "A sleek, real-time AI tool integration interface built with React, Gemini API, and Tailwind CSS for productivity workflows.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      tags: ["React", "AI", "Tailwind", "Vite"],
      liveUrl: "https://example.com/ai-dash",
      githubUrl: "https://github.com/tanjim/ai-dashboard"
    },
    {
      id: "proj-2",
      title: "DevSpace Task Manager",
      description: "Interactive Kanban style task organizer with local state persistence, dark mode aesthetics, and tag filtering.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      tags: ["JavaScript", "React", "LocalStorage"],
      liveUrl: "https://example.com/devspace",
      githubUrl: "https://github.com/tanjim/devspace-task"
    },
    {
      id: "proj-3",
      title: "CodeCraft Portfolio Engine",
      description: "A dynamic headless portfolio CMS allowing programmers to customize their portfolio without editing source code.",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
      tags: ["React", "CMS", "Tailwind", "State Store"],
      liveUrl: "https://example.com/codecraft",
      githubUrl: "https://github.com/tanjim/portfolio-engine"
    },
    {
      id: "proj-4",
      title: "WeatherPulse App",
      description: "Minimalist weather application with clean card analytics, dynamic background states, and micro-interactions.",
      image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=800&q=80",
      tags: ["React", "API", "CSS Motion"],
      liveUrl: "https://example.com/weatherpulse",
      githubUrl: "https://github.com/tanjim/weather-pulse"
    }
  ],
  skills: [
    "JavaScript (ES6+)",
    "React.js",
    "HTML5 & CSS3",
    "Tailwind CSS",
    "Node.js Basics",
    "Git & GitHub",
    "REST APIs",
    "Vite",
    "Prompt Engineering",
    "AI Integration",
    "Responsive Design",
    "LocalStorage State"
  ],
  footer: {
    copyright: "© 2026 Tanjim. All rights reserved. Built with React & Tailwind CSS.",
    socials: [
      { id: "1", platform: "GitHub", url: "https://github.com" },
      { id: "2", platform: "LinkedIn", url: "https://linkedin.com" },
      { id: "3", platform: "X / Twitter", url: "https://x.com" },
      { id: "4", platform: "Email", url: "mailto:sarkartanjimahmed2011@gmail.com" }
    ]
  },
  appearance: {
    accentColor: "#8b5cf6",
    bgColor: "#0a0a0a",
    showGrid: true
  },
  media: []
};
