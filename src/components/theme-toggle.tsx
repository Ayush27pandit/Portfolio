"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Magnetic } from "./magnetic";

export function ThemeToggle() {
    const { setTheme, theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const toggleTheme = (e: React.MouseEvent) => {
        const isDark = resolvedTheme === "dark";

        // Support for the View Transition API
        if (
            !document.startViewTransition ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            setTheme(isDark ? "light" : "dark");
            return;
        }

        const x = e.clientX;
        const y = e.clientY;
        const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        const transition = document.startViewTransition(() => {
            setTheme(isDark ? "light" : "dark");
        });

        transition.ready.then(() => {
            const clipPath = [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
            ];
            document.documentElement.animate(
                {
                    clipPath: isDark ? clipPath : [...clipPath].reverse(),
                },
                {
                    duration: 500,
                    easing: "ease-in-out",
                    pseudoElement: isDark
                        ? "::view-transition-new(root)"
                        : "::view-transition-old(root)",
                }
            );
        });
    };

    return (
        <div className="fixed top-6 right-6 z-50">
            <Magnetic amount={0.2}>
                <button
                    onClick={toggleTheme}
                    className="relative w-10 h-10 rounded-2xl bg-card border border-border flex items-center justify-center hover:border-white/20 transition-colors shadow-lg shadow-black/20 overflow-hidden group"
                    aria-label="Toggle theme"
                >
                    <AnimatePresence mode="wait">
                        {resolvedTheme === "dark" ? (
                            <motion.div
                                key="moon"
                                initial={{ y: 20, opacity: 0, rotate: 45 }}
                                animate={{ y: 0, opacity: 1, rotate: 0 }}
                                exit={{ y: -20, opacity: 0, rotate: -45 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <Moon size={18} className="text-zinc-400 fill-zinc-400/20" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="sun"
                                initial={{ y: 20, opacity: 0, rotate: 45 }}
                                animate={{ y: 0, opacity: 1, rotate: 0 }}
                                exit={{ y: -20, opacity: 0, rotate: -45 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <Sun size={18} className="text-zinc-500 fill-zinc-500/20" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
            </Magnetic>
        </div>
    );
}
