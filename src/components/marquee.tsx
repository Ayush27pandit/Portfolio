"use client";

import React from "react";
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
    return (
        <div
            className={cn(
                "group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] flex-row",
                className
            )}
        >
            <div
                className={cn(
                    "flex shrink-0 justify-around [gap:var(--gap)] flex-row marquee-scroll",
                    direction === "right" && "marquee-reverse",
                    pauseOnHover && "group-hover:[animation-play-state:paused]"
                )}
                style={{
                    width: "max-content",
                    animationDuration: `${speed}s`,
                }}
            >
                {/* Render children twice for seamless loop */}
                {React.Children.map(children, (child) => child)}
                {React.Children.map(children, (child) => child)}
                {React.Children.map(children, (child) => child)}
                {React.Children.map(children, (child) => child)}
            </div>
        </div>
    );
};
