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

const marqueeStyles = `
@keyframes marquee-scroll {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-50%, 0, 0); }
}
@keyframes marquee-scroll-reverse {
  0% { transform: translate3d(-50%, 0, 0); }
  100% { transform: translate3d(0, 0, 0); }
}
`;

export const Marquee = ({
    children,
    direction = "left",
    speed = 40,
    pauseOnHover = true,
    className,
}: MarqueeProps) => {
    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: marqueeStyles }} />
            <div
                className={cn(
                    "group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] flex-row",
                    className
                )}
            >
                <div
                    className="flex shrink-0 justify-around [gap:var(--gap)] flex-row"
                    style={{
                        width: "max-content",
                        animation: `${direction === "left" ? "marquee-scroll" : "marquee-scroll-reverse"} ${speed}s linear infinite`,
                        willChange: "transform",
                        ...(pauseOnHover ? {} : {}),
                    }}
                    onMouseEnter={pauseOnHover ? (e) => { e.currentTarget.style.animationPlayState = "paused"; } : undefined}
                    onMouseLeave={pauseOnHover ? (e) => { e.currentTarget.style.animationPlayState = "running"; } : undefined}
                >
                    {/* Render children twice for seamless loop */}
                    {React.Children.map(children, (child) => child)}
                    {React.Children.map(children, (child) => child)}
                    {React.Children.map(children, (child) => child)}
                    {React.Children.map(children, (child) => child)}
                </div>
            </div>
        </>
    );
};
