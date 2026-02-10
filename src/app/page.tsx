"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  ExternalLink,
  Play,
  Database,
  Globe,
  Terminal,
  ShieldCheck,
  Box,
  GraduationCap,
  FileText,
} from "lucide-react";
import {
  AnimatedGithub,
  AnimatedTwitter,
  AnimatedLinkedin,
  AnimatedMail,
  AnimatedExternalLink,
  AnimatedMessageSquare,
  AnimatedChevronDown,
  AnimatedZap
} from "@/components/animated-icons";

import { GithubGraph } from "@/components/github-graph";
import { Marquee } from "@/components/marquee";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/magnetic";
import { ThemeToggle } from "@/components/theme-toggle";
import { ShadowOverlay } from "@/components/shadow-overlay";
import { WordRotate } from "@/components/ui/word-rotate";
import { useState, lazy, Suspense } from "react";
import { projects } from "@/data/projects";

// Lazy load the heavy contact modal
const ContactModal = lazy(() =>
  import("@/components/contact-modal").then((mod) => ({
    default: mod.ContactModal,
  }))
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 15, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.4,
      ease: "easeOut"
    } as const
  }
};

function ExperienceItem({ exp }: { exp: { company: string, role: string, date: string, points: string[] } }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      whileHover={{ y: -2 }}
      className="p-5 bg-muted/30 border border-border rounded-2xl flex flex-col group cursor-pointer hover:bg-muted/50 hover:border-foreground/40 dark:hover:border-white/20 transition-all duration-300 relative"
    >
      <div className="flex justify-between items-center w-full relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-zinc-500/10 border border-foreground/10 dark:border-zinc-500/20 overflow-hidden relative">
            <Image
              src={process.env.NEXT_PUBLIC_COMPANY_LOGO || ""}
              alt="Company Logo"
              width={40}
              height={40}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <h4 className="font-bold text-[15px] tracking-tight text-foreground">{exp.company}</h4>
            <p className="meta-text uppercase tracking-wider">{exp.role}</p>
          </div>
        </div>
        <div className="text-right flex items-center gap-2">
          <div className="meta-text tabular tracking-tighter">
            {exp.date}
          </div>
          <AnimatedChevronDown size={14} className={cn("transition-transform text-muted-foreground", isExpanded && "rotate-180")} />
        </div>
      </div>
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-4 pt-4 border-t border-border/50 space-y-3 relative z-10"
        >
          {exp.points.map((point, idx) => (
            <div key={idx} className="flex gap-3 text-[13px] text-muted-foreground leading-relaxed">
              <span className="text-accent mt-1.5 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
              <p className="flex-1">{point}</p>
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <main className="min-h-screen bg-background text-foreground transition-colors duration-500 selection:bg-white/30 selection:text-white relative">
        <div className="fixed inset-0 z-0 pointer-events-none opacity-100" style={{ contain: "strict" }}>
          <ShadowOverlay
            animation={{ scale: 100, speed: 8 }}
            noise={{ opacity: 0.35, scale: 0.35 }}
            color="rgba(70, 70, 100, 0.15)"
          />
        </div>
        <ThemeToggle />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto px-4 py-12 space-y-12 relative z-10"
        >

          {/* Header Image & Profile */}
          <motion.div variants={itemVariants} className="relative">
            <div className="h-40 md:h-48 w-full rounded-3xl overflow-hidden border border-border">
              <div className="w-full h-full bg-gradient-to-r from-blue-900/20 to-teal-900/20 flex items-center justify-center relative">
                {/* Profile background from env */}
                {process.env.NEXT_PUBLIC_COVER_PIC && (
                  <Image
                    src={process.env.NEXT_PUBLIC_COVER_PIC}
                    alt="Cover"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 672px"
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black/10" />
              </div>
            </div>
            <div className="absolute -bottom-10 left-6">
              <div className="w-24 h-24 rounded-3xl border-2 border-zinc-200 dark:border-black overflow-hidden bg-card relative">
                <Image
                  src={process.env.NEXT_PUBLIC_PROFILE_PIC_URL || ""}
                  alt="Ayush Pandit"
                  width={96}
                  height={96}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Intro Section */}
          <motion.section
            variants={itemVariants}
            className="pt-10 space-y-4"
          >
            <div className="px-8 py-6 bg-card/30 rounded-3xl border border-foreground/20 dark:border-white/15 space-y-5 hover:border-foreground/20 dark:hover:border-white/30 transition-all duration-500 relative overflow-hidden group/section">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(99,102,241,0.08)_0%,transparent_50%),radial-gradient(circle_at_100%_0%,rgba(236,72,153,0.08)_0%,transparent_50%),radial-gradient(circle_at_0%_100%,rgba(59,130,246,0.08)_0%,transparent_50%),radial-gradient(circle_at_100%_100%,rgba(168,85,247,0.08)_0%,transparent_50%)] opacity-0 group-hover/section:opacity-100 pointer-events-none transition-opacity duration-500" />
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold tracking-[-0.02em] leading-[1.15] text-foreground/95">Ayush Pandit <span className="text-muted-foreground/30 font-normal ml-0.5 text-xl">@Ayush27pandit</span></h1>
                    <div className="text-muted-foreground/60 text-sm font-medium mt-1 pl-1 italic h-5 flex items-center">
                      <WordRotate
                        className="text-muted-foreground/60 text-sm font-medium italic"
                        words={["Software Engineer", "Backend Developer", "Fullstack Developer"]}
                        duration={2500}
                      />
                    </div>
                  </div>
                  <Magnetic amount={0.2}>
                    <a
                      href={process.env.NEXT_PUBLIC_RESUME_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-muted border border-border rounded-full text-xs font-semibold hover:bg-muted/80 transition-all shadow-sm active:scale-95 group/resume"
                    >
                      <FileText size={12} className="text-muted-foreground group-hover/resume:text-foreground transition-colors" />
                      Resume
                    </a>
                  </Magnetic>
                </div>
                <p className="text-foreground/80 text-md leading-[1.75] font-medium">
                  Software Engineer specialized in building <span className="text-foreground font-bold">high-performance backend systems</span>, distributed architectures, and real-time web applications.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Magnetic>
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#0052CC] text-white rounded-2xl text-sm font-bold shadow-lg shadow-blue-900/20 hover:scale-[1.02] active:scale-[0.98] transition group/talk"
                  >
                    <AnimatedMessageSquare size={16} fill="currentColor" className="transition-transform group-hover/talk:-rotate-12" />
                    Let&apos;s talk
                  </button>
                </Magnetic>
                <Magnetic>
                  <button
                    onClick={() => window.location.href = 'mailto:panditayush2703@gmail.com'}
                    className="flex items-center gap-2 px-5 py-2.5 bg-muted border border-border rounded-2xl text-sm font-bold hover:bg-muted/80 transition-all group/mail"
                  >
                    <AnimatedMail size={16} className="transition-transform group-hover/mail:translate-x-0.5 group-hover/mail:-translate-y-0.5" />
                    Drop a mail
                  </button>
                </Magnetic>
              </div>

              <div className="pt-4 border-t border-border/50 mt-2">
                <p className="section-label mb-3">Find me on the <span className="text-foreground font-bold">internet</span></p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { icon: AnimatedGithub, label: "Github", url: "https://github.com/Ayush27pandit" },
                    { icon: AnimatedTwitter, label: "Twitter", url: "https://x.com/Ayush_0327" },
                    { icon: AnimatedLinkedin, label: "LinkedIn", url: "https://www.linkedin.com/in/ayush-p-02b199252/" },
                    { icon: AnimatedMessageSquare, label: "Medium", url: "#" }
                  ].map((social, i) => (
                    <button
                      key={i}
                      onClick={() => social.url !== "#" && window.open(social.url, '_blank')}
                      className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 border border-border rounded-lg text-xs font-normal hover:bg-muted transition"
                    >
                      <social.icon size={14} />
                      {social.label}
                    </button>
                  ))}
                  <button className="px-3 py-1.5 text-muted-foreground text-xs font-medium hover:text-foreground transition flex items-center gap-1">
                    More <AnimatedExternalLink size={10} />
                  </button>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Education Section */}
          <motion.section
            variants={itemVariants}
            whileHover="hover"
            className="p-6 bg-card/30 rounded-3xl border border-foreground/20 dark:border-white/15 hover:border-foreground/30 dark:hover:border-white/30 transition-all duration-500 relative overflow-hidden group/section"
          >
            <motion.div
              variants={{ hover: { opacity: 1 } }}
              initial={{ opacity: 0 }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(99,102,241,0.08)_0%,transparent_50%),radial-gradient(circle_at_100%_0%,rgba(236,72,153,0.08)_0%,transparent_50%),radial-gradient(circle_at_0%_100%,rgba(59,130,246,0.08)_0%,transparent_50%),radial-gradient(circle_at_100%_100%,rgba(168,85,247,0.08)_0%,transparent_50%)] opacity-0 pointer-events-none mix-blend-soft-light transition-opacity duration-500"
            />
            <p className="section-label mb-8 flex items-center gap-2 relative z-10">
              <span className="w-1 h-3 bg-accent rounded-full" />
              Where I&apos;ve <span className="text-foreground font-bold">studied</span>
            </p>
            <div className="space-y-3">
              {[
                { school: "Bhilai Institute of Technology Durg", degree: "B.Tech in CSE (Artificial Intelligence)", date: "2022 - 2026" }
              ].map((edu, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 4 }}
                  className="p-5 bg-muted/30 border border-border rounded-2xl flex justify-between items-center group cursor-pointer hover:bg-muted hover:border-foreground/40 dark:hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20 overflow-hidden relative">
                      <Image
                        src={process.env.NEXT_PUBLIC_COLLEGE_LOGO_URL || ""}
                        alt="College Logo"
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-[15px] tracking-tight text-foreground">{edu.school}</h4>
                      <p className="meta-text uppercase tracking-wider">{edu.degree}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="meta-text tabular tracking-tighter">
                      {edu.date}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>




          {/* Toolkit Section */}
          <motion.section
            variants={itemVariants}
            whileHover="hover"
            className="p-6 bg-card/20 rounded-3xl border border-foreground/10 dark:border-white/5 opacity-80 hover:opacity-100  transition-all duration-500 px-0 relative group/section"
          >
            <motion.div
              variants={{ hover: { opacity: 1 } }}
              initial={{ opacity: 0 }}
              className="absolute rounded-3xl inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(99,102,241,0.08)_0%,transparent_50%),radial-gradient(circle_at_100%_0%,rgba(236,72,153,0.08)_0%,transparent_50%),radial-gradient(circle_at_0%_100%,rgba(59,130,246,0.08)_0%,transparent_50%),radial-gradient(circle_at_100%_100%,rgba(168,85,247,0.08)_0%,transparent_50%)] opacity-0 pointer-events-none mix-blend-soft-light transition-opacity duration-500"
            />
            <p className="section-label mb-4 px-8">My everyday <span className="text-foreground font-bold">toolkit</span></p>
            <Marquee speed={30} className="py-2">
              {[
                { name: "Node.js", icon: AnimatedZap, color: "text-green-500" },
                { name: "TypeScript", icon: Box, color: "text-blue-500" },
                { name: "React", icon: Globe, color: "text-cyan-400" },
                { name: "PostgreSQL", icon: Database, color: "text-blue-400" },
                { name: "Redis", icon: Terminal, color: "text-red-500" },
                { name: "Docker", icon: Box, color: "text-blue-600" },
                { name: "MongoDB", icon: Database, color: "text-green-600" },
                { name: "Prisma", icon: ShieldCheck, color: "text-indigo-400" },
              ].map((tool, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-4 bg-foreground/5 dark:bg-white/5 border border-foreground/20 dark:border-white/10 rounded-2xl whitespace-nowrap group/tool hover:bg-foreground/10 dark:hover:bg-white/10 transition-colors">
                  <tool.icon size={24} className={cn("transition-transform group-hover/tool:scale-110", tool.color)} />
                  <span className="text-sm font-semibold tracking-tight text-foreground">{tool.name}</span>
                </div>
              ))}
            </Marquee>
          </motion.section>



          {/* Experience Section */}
          <motion.section
            variants={itemVariants}
            whileHover="hover"
            className="p-6 bg-card/30 rounded-3xl border border-foreground/20 dark:border-white/15 hover:border-foreground/30 dark:hover:border-white/30 transition-all duration-500 relative overflow-hidden group/section"
          >
            <motion.div
              variants={{ hover: { opacity: 1 } }}
              initial={{ opacity: 0 }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(99,102,241,0.08)_0%,transparent_50%),radial-gradient(circle_at_100%_0%,rgba(236,72,153,0.08)_0%,transparent_50%),radial-gradient(circle_at_0%_100%,rgba(59,130,246,0.08)_0%,transparent_50%),radial-gradient(circle_at_100%_100%,rgba(168,85,247,0.08)_0%,transparent_50%)] opacity-0 pointer-events-none mix-blend-soft-light transition-opacity duration-500"
            />
            <p className="section-label mb-8 flex items-center gap-2 relative z-10">
              <span className="w-1 h-3 bg-accent rounded-full" />
              Where I&apos;ve <span className="text-foreground font-bold">worked</span>
            </p>
            <div className="space-y-3">
              {[
                {
                  company: "Infynas Learning Solution",
                  role: "Full-Stack Developer Intern",
                  date: "May 2025 – July 2025",
                  points: [
                    "Developed and maintained production-grade backend APIs using Node.js, Express, and TypeScript.",
                    "Engineered Redis-based caching & rate limiting, reducing average API latency by 40% and improving throughput.",
                    "Designed efficient MongoDB schemas, connection pooling, and high-concurrency access patterns.",
                    "Built unit and integration test suites using Supertest and Postman, improving test coverage and reliability.",
                    "Executed performance profiling & debugging for bottlenecks across queries, async flows, and I/O operations.",
                    "Collaborated in Agile sprints and shipped incremental product features."
                  ]
                }
              ].map((exp, i) => (
                <ExperienceItem key={i} exp={exp} />
              ))}
            </div>
          </motion.section>

          {/* Projects Section */}
          <motion.section
            variants={itemVariants}
            whileHover="hover"
            className="p-6 bg-card/30 rounded-3xl border border-foreground/20 dark:border-white/15 hover:border-foreground/30 dark:hover:border-white/30 transition-all duration-500 relative overflow-hidden group/section"
          >
            <motion.div
              variants={{ hover: { opacity: 1 } }}
              initial={{ opacity: 0 }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(99,102,241,0.08)_0%,transparent_50%),radial-gradient(circle_at_100%_0%,rgba(236,72,153,0.08)_0%,transparent_50%),radial-gradient(circle_at_0%_100%,rgba(59,130,246,0.08)_0%,transparent_50%),radial-gradient(circle_at_100%_100%,rgba(168,85,247,0.08)_0%,transparent_50%)] opacity-0 pointer-events-none mix-blend-soft-light transition-opacity duration-500"
            />
            <p className="section-label mb-8 flex items-center gap-2 relative z-10">
              <span className="w-1 h-3 bg-accent rounded-full" />
              Things I&apos;ve <span className="text-foreground font-bold">built</span>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              {projects.map((proj, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4 }}
                  className="bg-card/40 border border-border/50 rounded-[32px] overflow-hidden flex flex-col group/card hover:border-foreground/20 dark:hover:border-white/20 transition-all duration-300"
                >
                  <div
                    onClick={() => {
                      const targetUrl = proj.webUrl !== "#" ? proj.webUrl : (proj.githubUrl !== "#" ? proj.githubUrl : null);
                      if (targetUrl) window.open(targetUrl, '_blank');
                    }}
                    className="relative aspect-[16/10] bg-muted/20 flex flex-col items-center justify-center overflow-hidden cursor-pointer group/img"
                  >
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,var(--foreground)_1px,transparent_1px)] [background-size:20px_20px]" />
                    <div className="absolute top-4 right-4 bg-background/80 px-3 py-1.5 rounded-full flex items-center gap-2 border border-border z-10">
                      <Globe size={12} className="text-foreground" />
                      <span className="text-[10px] font-bold tracking-tight text-foreground">Website</span>
                    </div>
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r opacity-80" style={{ backgroundImage: `linear-gradient(to right, ${proj.color.split(' ')[1]}, ${proj.color.split(' ')[2]})` }} />
                    <div className="relative z-0 p-4 bg-card border border-border rounded-xl shadow-2xl scale-95 max-w-[85%] group-hover/img:scale-100 transition-transform duration-300">
                      <h5 className="font-bold text-sm leading-tight mb-1">{proj.name}</h5>
                      <div className="w-8 h-0.5 bg-accent/20 rounded-full mb-2" />
                      <p className="text-[10px] text-muted-foreground line-clamp-1 leading-normal">{proj.description}</p>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold tracking-tight text-foreground">{proj.name}</h4>
                      <p className="text-[11px] tabular opacity-50">{proj.startMonthYear} - {proj.lastMonthYear}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (proj.githubUrl !== "#") window.open(proj.githubUrl, '_blank');
                        }}
                        className="p-1.5 bg-muted border border-border rounded-lg text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all hover:scale-110 active:scale-95 group/giticon"
                        title="View Code"
                      >
                        <AnimatedGithub size={15} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (proj.webUrl !== "#") window.open(proj.webUrl, '_blank');
                        }}
                        className="p-1.5 bg-muted border border-border rounded-lg text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all hover:scale-110 active:scale-95 group/liveicon"
                        title="Live Demo"
                      >
                        <Globe size={15} />
                      </button>
                    </div>

                    <p className="text-foreground/70 leading-relaxed text-[13px] line-clamp-2">
                      {proj.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-1 pb-1">
                      {proj.techStack.map((tag, j) => (
                        <span key={j} className="px-2 py-1 bg-muted/50 border border-border rounded-lg text-[9px] font-bold text-foreground/80 tabular">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 border border-border/50 text-xs font-bold text-muted-foreground hover:text-foreground hover:border-foreground transition flex items-center justify-center gap-2 group relative z-10">
              Explore all projects
              <AnimatedExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </motion.section>

          {/* Contributions */}
          <motion.section
            variants={itemVariants}
            whileHover="hover"
            className="p-6 bg-card/20 rounded-3xl border border-foreground/10 dark:border-white/5 opacity-80 hover:opacity-100 transition-all duration-500 relative group/section overflow-hidden"
          >
            <motion.div
              variants={{ hover: { opacity: 1 } }}
              initial={{ opacity: 0 }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(99,102,241,0.08)_0%,transparent_50%),radial-gradient(circle_at_100%_0%,rgba(236,72,153,0.08)_0%,transparent_50%),radial-gradient(circle_at_0%_100%,rgba(59,130,246,0.08)_0%,transparent_50%),radial-gradient(circle_at_100%_100%,rgba(168,85,247,0.08)_0%,transparent_50%)] opacity-0 pointer-events-none mix-blend-soft-light transition-opacity duration-500"
            />
            <p className="section-label mb-6 flex items-center gap-2 relative z-10">
              <span className="w-1 h-3 bg-accent rounded-full" />
              Contributions <span className="text-foreground font-bold">@Ayush27pandit</span>
            </p>
            <div className="relative z-10 w-full overflow-x-auto">
              <GithubGraph className="w-full" />
            </div>
          </motion.section>
          {/* Writing Section */}
          <motion.section
            variants={itemVariants}
            whileHover="hover"
            className="p-6 bg-card/30 rounded-3xl border border-foreground/20 dark:border-white/15 hover:border-foreground/30 dark:hover:border-white/30 transition-all duration-500 relative overflow-hidden group/section"
          >
            <motion.div
              variants={{ hover: { opacity: 1 } }}
              initial={{ opacity: 0 }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(99,102,241,0.08)_0%,transparent_50%),radial-gradient(circle_at_100%_0%,rgba(236,72,153,0.08)_0%,transparent_50%),radial-gradient(circle_at_0%_100%,rgba(59,130,246,0.08)_0%,transparent_50%),radial-gradient(circle_at_100%_100%,rgba(168,85,247,0.08)_0%,transparent_50%)] opacity-0 pointer-events-none mix-blend-soft-light transition-opacity duration-500"
            />
            <p className="section-label mb-8 flex items-center gap-2 relative z-10">
              <span className="w-1 h-3 bg-accent rounded-full" />
              Thoughts & <span className="text-foreground font-bold">writing</span>
            </p>
            <div className="space-y-3">
              {[
                { title: "Invictus: Building a Distributed Lock Service That Actually Works", date: "December 28, 2024", time: "15 min" },
                { title: "Write-Ahead Logs: Atomicity and Concurrency with Redis, Lua, and Go", date: "November 23, 2024", time: "10 min" }
              ].map((post, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 4 }}
                  className="p-4 bg-muted/30 border border-border rounded-2xl flex items-center gap-4 group cursor-pointer hover:bg-muted hover:border-foreground/40 dark:hover:border-white/20 transition-all duration-300 relative"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-950 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-[13px] tracking-tight leading-snug line-clamp-1 text-foreground">{post.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[8px] text-muted-foreground dark:text-zinc-400 font-bold uppercase tracking-widest">{post.date}</span>
                      <span className="w-1 h-1 bg-foreground/20 dark:bg-white/20 rounded-full" />
                      <span className="text-[8px] text-muted-foreground dark:text-zinc-400 font-bold uppercase tracking-widest">{post.time} read</span>
                    </div>
                  </div>
                  <ExternalLink size={14} className="text-muted-foreground/20 group-hover:text-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 absolute top-4 right-4" />
                </motion.div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 border border-border/50 text-xs font-bold text-muted-foreground hover:text-foreground hover:border-foreground transition flex items-center justify-center gap-2 group">
              Read all posts
              <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </motion.section>
          {/* Recently Listening */}
          <motion.section
            variants={itemVariants}
            whileHover="hover"
            whileTap={{ scale: 0.99 }}
            className="p-6 bg-card/20 rounded-3xl border border-foreground/10 dark:border-white/5 opacity-80 hover:opacity-100 transition-all duration-500 cursor-pointer relative overflow-hidden group/section"
          >
            <motion.div
              variants={{ hover: { opacity: 1 } }}
              initial={{ opacity: 0 }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(99,102,241,0.08)_0%,transparent_50%),radial-gradient(circle_at_100%_0%,rgba(236,72,153,0.08)_0%,transparent_50%),radial-gradient(circle_at_0%_100%,rgba(59,130,246,0.08)_0%,transparent_50%),radial-gradient(circle_at_100%_100%,rgba(168,85,247,0.08)_0%,transparent_50%)] opacity-0 pointer-events-none mix-blend-soft-light transition-opacity duration-500"
            />
            <p className="section-label mb-4">Recently <span className="text-foreground font-bold">listening</span></p>
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-muted overflow-hidden relative border border-border">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                    <Play size={20} fill="white" className="text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-accent font-bold uppercase tracking-tight flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                    Paused
                  </p>
                  <h3 className="font-bold text-lg mt-0.5 text-foreground">GOT_IT_ALL</h3>
                  <p className="text-sm text-muted-foreground font-medium">by alon morog</p>
                </div>
              </div>
              <ExternalLink size={16} className="text-muted-foreground/30 group-hover:text-foreground transition" />
            </div>
          </motion.section>

          {/* Footer Quotes */}
          <section className="py-10 text-center space-y-12">
            <p className="italic text-xl md:text-2xl text-muted-foreground opacity-60 px-8 text-pretty tracking-tight">&ldquo;Every abstraction must earn its complexity&rdquo;</p>




          </section>

        </motion.div>

      </main>
      {isContactOpen && (
        <Suspense fallback={null}>
          <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </Suspense>
      )}
    </>
  );
}
