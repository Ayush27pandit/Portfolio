"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ContributionDay {
    color: string;
    contributionCount: number;
    contributionLevel: string;
    date: string;
}

export const GithubGraph = ({ className }: { className?: string }) => {
    const [weeks, setWeeks] = useState<ContributionDay[][]>([]);
    const [totalContributions, setTotalContributions] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContributions = async () => {
            try {
                const response = await fetch("https://github-contributions-api.deno.dev/Ayush27pandit.json");
                const data = await response.json();
                if (data.contributions) {
                    // Flatten all days, filter for 2026, then regroup into weeks
                    const allDays = data.contributions.flat() as ContributionDay[];
                    const days2026 = allDays.filter(day => day.date.startsWith("2026"));

                    // Group into weeks of 7
                    const weeks2026: ContributionDay[][] = [];
                    for (let i = 0; i < days2026.length; i += 7) {
                        weeks2026.push(days2026.slice(i, i + 7));
                    }

                    setWeeks(weeks2026);
                    setTotalContributions(days2026.reduce((acc, Day) => acc + Day.contributionCount, 0));
                }
            } catch (error) {
                console.error("Failed to fetch GitHub contributions:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchContributions();
    }, []);

    const getColor = (level: string) => {
        switch (level) {
            case "NONE":
                return "bg-zinc-200/50 dark:bg-[#161b22]";
            case "FIRST_QUARTILE":
                return "bg-zinc-300 dark:bg-zinc-800";
            case "SECOND_QUARTILE":
                return "bg-zinc-400 dark:bg-zinc-600";
            case "THIRD_QUARTILE":
                return "bg-zinc-500 dark:bg-zinc-400";
            case "FOURTH_QUARTILE":
                return "bg-zinc-600 dark:bg-zinc-200";
            default:
                return "bg-zinc-200/50 dark:bg-[#161b22]";
        }
    };

    if (loading) {
        return (
            <div className={cn("flex flex-col space-y-3 overflow-hidden animate-pulse", className)}>
                <div className="h-4 w-32 bg-zinc-200/50 dark:bg-zinc-800 rounded mb-2" />
                <div className="flex space-x-[3px] overflow-x-auto pb-2">
                    {Array.from({ length: 44 }).map((_, i) => (
                        <div key={i} className="flex flex-col space-y-[3px] flex-shrink-0">
                            {Array.from({ length: 7 }).map((_, j) => (
                                <div key={j} className="w-[10px] h-[10px] rounded-[2px] bg-zinc-200/50 dark:bg-[#161b22]" />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className={cn("flex flex-col space-y-3", className)}>
            <div className="flex justify-between items-end mb-1">
                <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                    {totalContributions} contributions in 2026
                </p>
                <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-muted-foreground">Less</span>
                    {[0, 1, 2, 3, 4].map((i) => (
                        <div key={i} className={cn("w-2.5 h-2.5 rounded-[1px]",
                            i === 0 ? "bg-zinc-200/50 dark:bg-[#161b22]" :
                                i === 1 ? "bg-zinc-300 dark:bg-zinc-800" :
                                    i === 2 ? "bg-zinc-400 dark:bg-zinc-600" :
                                        i === 3 ? "bg-zinc-500 dark:bg-zinc-400" :
                                            "bg-zinc-600 dark:bg-zinc-200"
                        )} />
                    ))}
                    <span className="text-[10px] text-muted-foreground">More</span>
                </div>
            </div>
            <div className="flex space-x-[3px] overflow-x-auto pb-2 scrollbar-none">
                {weeks.map((week, i) => (
                    <div key={i} className="flex flex-col space-y-[3px] flex-shrink-0">
                        {week.map((day, j) => (
                            <div
                                key={j}
                                title={`${day.date}: ${day.contributionCount} contributions`}
                                className={cn(
                                    "w-[10px] h-[10px] rounded-[2px] transition-colors duration-200 hover:ring-1 hover:ring-white/20 cursor-help",
                                    getColor(day.contributionLevel)
                                )}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
