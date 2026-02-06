"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MarqueeProps {
    children: React.ReactNode;
    direction?: "left" | "right";
    speed?: number;
    pauseOnHover?: boolean;
    className?: string;
}

export const Marquee = ({
    children,
    direction = "left",
    speed = 40,
    pauseOnHover = true,
    className,
}: MarqueeProps) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [contentWidth, setContentWidth] = React.useState(0);

    React.useEffect(() => {
        if (containerRef.current) {
            setContentWidth(containerRef.current.scrollWidth);
        }
    }, [children]);

    return (
        <div
            className={cn(
                "group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] flex-row",
                className
            )}
        >
            <motion.div
                className="flex shrink-0 justify-around [gap:var(--gap)] flex-row"
                initial={{ x: direction === "left" ? 0 : "-50%" }}
                animate={{ x: direction === "left" ? "-50%" : 0 }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "linear",
                }}
                style={{
                    width: "max-content",
                }}
            >
                {/* Render children twice for seamless loop */}
                {React.Children.map(children, (child) => child)}
                {React.Children.map(children, (child) => child)}
                {React.Children.map(children, (child) => child)}
                {React.Children.map(children, (child) => child)}
            </motion.div>
        </div>
    );
};
