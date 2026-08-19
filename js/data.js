export const skills = [
  {
    title: "Programming Languages",
    symbol: "{;}",
    description: "The core languages I use to model application behavior, automate work, and solve technical problems.",
    items: ["JavaScript ES6+", "TypeScript", "Python", "C"],
  },
  {
    title: "Frontend",
    symbol: "</>",
    description: "Responsive, component-based interfaces designed to stay clear across devices and real workflows.",
    items: [
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Responsive UI Development",
      "Component-Based Architecture",
      "Client-Side State Management",
    ],
  },
  {
    title: "Backend",
    symbol: "API",
    description: "Application services, permissions, and business rules that turn interfaces into complete systems.",
    items: [
      "Node.js",
      "Express.js",
      "NestJS",
      "RESTful API Development",
      "Authentication",
      "Authorization",
      "Role-Based Access Control",
      "Business Logic Development",
    ],
  },
  {
    title: "Databases",
    symbol: "DB",
    description: "Structured data models and query patterns that keep products reliable as their workflows grow.",
    items: ["PostgreSQL", "MongoDB", "Prisma ORM", "SQL", "NoSQL", "Database Design", "Query Optimization"],
  },
  {
    title: "DevOps & Administration",
    symbol: "$_",
    description: "The operational layer: deployment, access, monitoring, sessions, and ongoing system support.",
    items: [
      "Docker",
      "Git",
      "GitHub",
      "Linux Fundamentals",
      "Web Application Administration",
      "System Administration",
      "Deployment",
      "Platform Monitoring",
      "Audit Logging",
      "Session Management",
    ],
  },
];

export const projects = [
  {
    id: "biler-market",
    number: "01",
    title: "Biler Market",
    category: "Market Management Platform",
    accent: "#6366f1",
    orbColors: ["#2563eb", "#22d3ee", "#7c3aed", "#a855f7"],
    description:
      "A complete market management system for handling inventory, sales, suppliers, users, reporting, and operational analytics.",
    features: [
      "Inventory tracking",
      "Product management",
      "Sales management",
      "Supplier management",
      "Secure authentication",
      "Role-based access control",
      "Dashboard analytics",
      "Automated reporting",
      "Responsive admin interface",
    ],
    technologies: ["NestJS", "Next.js", "TypeScript", "REST APIs", "Database integration", "Docker"],
    responsibilities: [
      "Structure the full-stack application around daily market operations.",
      "Connect inventory, sales, supplier, and reporting workflows.",
      "Support secure access through authentication and role-based permissions.",
    ],
    problem:
      "Market operations require inventory, transactions, suppliers, people, and reporting to work as one connected flow rather than isolated records.",
    approach:
      "Organize the platform into focused operational modules, expose the required business actions through REST APIs, and present the information in a responsive administration workspace.",
    decisions:
      "Use a modular backend structure, permission-aware routes, and dashboard summaries that keep detailed operational records within reach.",
    challenges:
      "Keeping stock, sales, supplier activity, and access rules consistent across related workflows.",
    solution:
      "A unified management interface backed by clear service boundaries, shared data rules, and protected administration actions.",
    capabilities:
      "The platform supports the core market-management workflow from product and supplier records to sales activity, stock awareness, access control, and reporting.",
    previewType: "dashboard",
    preview: {
      heading: "Market overview",
      metrics: ["Revenue summary", "Inventory status", "Low-stock alerts"],
      panels: ["Sales chart", "Recent sales", "Supplier records", "Activity feed"],
    },
    architecture: ["Database", "NestJS API", "Business Rules", "Next.js Admin", "Market Team"],
  },
  {
    id: "restaurant-manager",
    number: "02",
    title: "Restaurant Manager System",
    category: "Restaurant Operations Platform",
    accent: "#f97316",
    orbColors: ["#b91c1c", "#f97316", "#f59e0b", "#7c2d12"],
    description:
      "A full-stack restaurant management platform connecting menu administration, customer orders, tables, inventory, recipes, payments, and daily operations.",
    features: [
      "Menu management",
      "Category management",
      "Order tracking",
      "Table management",
      "Sales management",
      "Payment tracking",
      "Inventory control",
      "Recipe-based stock usage",
      "Staff administration",
      "Audit logging",
      "Dashboard analytics",
    ],
    technologies: ["Next.js", "NestJS", "Prisma", "PostgreSQL", "TypeScript", "REST APIs"],
    responsibilities: [
      "Connect menu, order, table, inventory, payment, and staff workflows.",
      "Model recipe-based stock usage within restaurant operations.",
      "Provide operational visibility through dashboards and audit history.",
    ],
    problem:
      "Restaurant teams need one operational view that connects what is sold, where it is served, how it is paid for, and how each order changes inventory.",
    approach:
      "Model menu, orders, tables, recipes, stock, and payments as related modules with shared validation and clear status transitions.",
    decisions:
      "Use PostgreSQL with Prisma for relational workflows and a NestJS service layer to keep operational rules separate from the interface.",
    challenges:
      "Coordinating state across active orders, table availability, payment status, and recipe-linked inventory usage.",
    solution:
      "A connected operations platform that makes each workflow visible while preserving clear responsibilities between application modules.",
    capabilities:
      "The system can coordinate menu administration, active service, inventory awareness, payment tracking, staff administration, and operational review.",
    previewType: "dashboard",
    preview: {
      heading: "Service operations",
      metrics: ["Active orders", "Table availability", "Payment status"],
      panels: ["Daily sales", "Order status", "Inventory warnings", "Popular menu items"],
    },
    architecture: ["PostgreSQL", "NestJS + Prisma", "Order Logic", "Next.js Console", "Restaurant Team"],
  },
  {
    id: "ecommerce",
    number: "03",
    title: "E-Commerce Web Application",
    category: "Online Commerce Platform",
    accent: "#d946ef",
    orbColors: ["#7c3aed", "#d946ef", "#ec4899", "#4f46e5"],
    description:
      "A full-stack e-commerce experience with product discovery, authentication, cart management, ordering, filtering, payment workflows, and optimized database operations.",
    features: [
      "Product listings",
      "Product filtering",
      "Shopping cart",
      "User authentication",
      "Order management",
      "Payment workflows",
      "Responsive storefront",
      "Optimized database queries",
    ],
    technologies: ["Node.js", "Express.js", "React.js", "REST APIs", "Database integration"],
    responsibilities: [
      "Build the customer product-discovery and cart experience.",
      "Connect authentication, ordering, and payment workflows to the backend.",
      "Support product and order administration through a dedicated management view.",
    ],
    problem:
      "A commerce platform must keep product discovery simple for customers while giving administrators practical control over products, orders, and sales activity.",
    approach:
      "Separate the responsive storefront from administration concerns while connecting both surfaces to a shared REST API and consistent data rules.",
    decisions:
      "Use focused product and order endpoints, server-side validation for business actions, and query patterns designed around catalog filtering and order retrieval.",
    challenges:
      "Maintaining consistent cart and order state while supporting both customer and administration workflows.",
    solution:
      "A split experience with a focused storefront, protected account actions, and an administration dashboard for operational control.",
    capabilities:
      "The application supports discovery, filtering, cart activity, authentication, ordering, payment workflows, and product administration.",
    previewType: "commerce",
    preview: {
      heading: "Storefront + Admin",
      metrics: ["Cart state", "Open orders", "Product catalog"],
      panels: ["Products", "Orders", "Sales", "Product management"],
    },
    architecture: ["Database", "Express API", "Commerce Logic", "React Storefront", "Customer + Admin"],
  },
  {
    id: "task-manager",
    number: "04",
    title: "Task Manager Application",
    category: "Productivity and Collaboration",
    accent: "#22d3ee",
    orbColors: ["#0891b2", "#22d3ee", "#2563eb", "#16a34a"],
    description:
      "A productivity platform for creating, assigning, organizing, and monitoring tasks across users and teams.",
    features: [
      "User authentication",
      "Task creation",
      "Task assignment",
      "Priority labels",
      "Deadline management",
      "Status tracking",
      "Team collaboration",
      "Real-time interface updates",
    ],
    technologies: ["Node.js", "Express.js", "MongoDB", "React.js", "JWT authentication"],
    responsibilities: [
      "Design task, assignment, priority, deadline, and status workflows.",
      "Connect team-facing interfaces to protected task APIs.",
      "Keep the interface responsive to workflow updates.",
    ],
    problem:
      "Teams need a clear shared view of ownership, priority, deadlines, and work status without losing the detail behind each task.",
    approach:
      "Model tasks around assignment and status changes, expose protected collaboration endpoints, and present work in a direct Kanban flow.",
    decisions:
      "Use JWT-based authentication, document-oriented task records, and focused interface updates for common task actions.",
    challenges:
      "Keeping task state, ownership, and board position clear as users make updates across a shared workflow.",
    solution:
      "A responsive collaboration surface that organizes work by status while retaining priority, deadline, and assignment context.",
    capabilities:
      "The application supports authenticated task creation, team assignment, priorities, deadlines, collaboration, and status tracking.",
    previewType: "kanban",
    preview: {
      heading: "Team workspace",
      metrics: ["Assigned tasks", "Due this week", "Completed"],
      panels: ["To Do", "In Progress", "Review", "Completed"],
    },
    architecture: ["MongoDB", "Express API", "Task Services", "React Board", "Project Team"],
  },
  {
    id: "yamani-platform",
    number: "05",
    title: "Yamani Platform",
    category: "Platform Administration",
    accent: "#fb7185",
    orbColors: ["#ea580c", "#ef4444", "#9333ea", "#db2777"],
    description:
      "A web platform that I administered and supported by managing accounts, platform settings, content, security, sessions, monitoring, and technical issues.",
    features: [
      "User account administration",
      "System configuration",
      "Content management",
      "Platform monitoring",
      "Technical troubleshooting",
      "Access control",
      "Session management",
      "Audit logging",
      "Data integrity",
      "Availability monitoring",
    ],
    technologies: ["System Administration", "Access Control", "Monitoring", "Audit Logging", "Session Management"],
    responsibilities: [
      "Administer user accounts, access, sessions, content, and platform settings.",
      "Monitor availability, security events, audit history, and system health.",
      "Investigate technical issues while protecting data integrity and reliable access.",
    ],
    problem:
      "A live web platform needs consistent administration across users, access, configuration, content, monitoring, security, and issue response.",
    approach:
      "Treat administration as an ongoing operational discipline with clear access controls, observable system state, traceable events, and structured troubleshooting.",
    decisions:
      "Prioritize account and session visibility, auditability, security awareness, platform availability, and careful configuration management.",
    challenges:
      "Balancing day-to-day user support with the security, integrity, and availability responsibilities of platform administration.",
    solution:
      "A structured administration approach covering accounts, access, system settings, monitoring, audit events, and technical support.",
    capabilities:
      "Administration support spans platform configuration, account and session control, content operations, monitoring, security awareness, troubleshooting, and availability oversight.",
    previewType: "health",
    preview: {
      heading: "Platform control",
      metrics: ["System health", "Active sessions", "Security alerts"],
      panels: ["Recent logins", "Audit events", "Server status", "Session activity"],
    },
    architecture: ["Platform Data", "Admin Controls", "Security + Sessions", "Monitoring Console", "Administrator"],
  },
];

export const processSteps = [
  {
    title: "Understand",
    text: "Identify the business problem, users, workflows, operational needs, and technical constraints.",
  },
  {
    title: "Architect",
    text: "Plan the database, application modules, APIs, permissions, integrations, and system structure.",
  },
  {
    title: "Build",
    text: "Develop reusable frontend components and scalable backend services.",
  },
  {
    title: "Integrate",
    text: "Connect interfaces, APIs, authentication, databases, and external services.",
  },
  {
    title: "Test",
    text: "Validate functionality, error handling, security, performance, responsiveness, and usability.",
  },
  {
    title: "Deploy and Maintain",
    text: "Containerize, deploy, monitor, troubleshoot, maintain, and improve the system.",
  },
];

export const certifications = [
  {
    title: "The Complete Node.js Developer Course",
    provider: "Udemy",
    description:
      "Comprehensive training in server-side JavaScript, REST APIs, authentication, database integration, testing, and application development using Node.js.",
  },
  {
    title: "JavaScript Essentials",
    provider: "Cisco Networking Academy",
    description:
      "JavaScript programming, DOM manipulation, asynchronous programming, application logic, and modern web development fundamentals.",
  },
  {
    title: "Microsoft Azure AI Fundamentals",
    provider: "Microsoft",
    description:
      "Core artificial intelligence and machine learning concepts on Microsoft Azure, including computer vision, natural language processing, and AI services.",
  },
];

export const technologies = [
  "NEXT.JS",
  "NESTJS",
  "NODE.JS",
  "EXPRESS",
  "REACT",
  "TYPESCRIPT",
  "PYTHON",
  "POSTGRESQL",
  "MONGODB",
  "PRISMA",
  "DOCKER",
  "LINUX",
  "REST API",
  "GIT",
];
