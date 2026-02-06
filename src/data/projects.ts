export interface Project {
    name: string;
    description: string;
    techStack: string[];
    githubUrl: string;
    webUrl: string;
    imageUrl: string;
    startMonthYear: string;
    lastMonthYear: string;
    color: string;
}

export const projects: Project[] = [
    {
        name: "Bingify",
        description: "Real-time synchronized video streaming platform with frame-perfect synchronization using WebSockets.",
        techStack: ["Next.js", "Node", "PG", "Socket.io"],
        githubUrl: "#",
        webUrl: "#",
        imageUrl: process.env.NEXT_PUBLIC_BINGIFY_IMAGE || "",
        startMonthYear: "Jan 2024",
        lastMonthYear: "Feb 2024",
        color: "from-red-500 to-orange-500"
    },
    {
        name: "CronCloud",
        description: "Distributed system to schedule and monitor HTTP-based automated tasks with real-time logging.",
        techStack: ["Node", "TS", "Redis", "BullMQ"],
        githubUrl: "#",
        webUrl: "#",
        imageUrl: process.env.NEXT_PUBLIC_CRONCLOUD_IMAGE || "",
        startMonthYear: "Dec 2023",
        lastMonthYear: "Jan 2024",
        color: "from-blue-500 to-cyan-500"
    },
    {
        name: "Brain Wave",
        description: "Low-latency content pipeline (< 200ms) with optimized Redis caching and media retrieval.",
        techStack: ["MERN", "TS", "MongoDB", "Redis"],
        githubUrl: "#",
        webUrl: "#",
        imageUrl: process.env.NEXT_PUBLIC_BRAINWAVE_IMAGE || "",
        startMonthYear: "Nov 2023",
        lastMonthYear: "Dec 2023",
        color: "from-purple-500 to-indigo-500"
    },
    {
        name: "PrismDB",
        description: "High-performance, in-memory key-value store with custom LRU eviction and binary serialization.",
        techStack: ["Rust", "TCP", "Serde", "Benchmarking"],
        githubUrl: "#",
        webUrl: "#",
        imageUrl: "",
        startMonthYear: "Oct 2023",
        lastMonthYear: "Nov 2023",
        color: "from-emerald-500 to-teal-500"
    }
];
