"use client";

import { motion, useAnimation, HTMLMotionProps } from "framer-motion";
import {
    Github,
    Twitter,
    Linkedin,
    Mail,
    ExternalLink,
    ChevronDown,
    MessageSquare,
    Play,
    Zap
} from "lucide-react";
import { LucideProps } from "lucide-react";

interface AnimatedIconProps extends LucideProps {
    trigger?: "hover" | "always";
}

const transition = { type: "spring", stiffness: 400, damping: 10 } as const;

export const AnimatedGithub = ({ trigger = "hover", ...props }: AnimatedIconProps) => {
    return (
        <motion.div
            whileHover={trigger === "hover" ? { rotate: [0, -10, 10, -10, 0], scale: 1.1 } : {}}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            <Github {...props} />
        </motion.div>
    );
};

export const AnimatedTwitter = ({ trigger = "hover", ...props }: AnimatedIconProps) => {
    return (
        <motion.div
            whileHover={trigger === "hover" ? { scale: 1.2, rotate: 5, y: -2 } : {}}
            transition={transition}
        >
            <Twitter {...props} />
        </motion.div>
    );
};

export const AnimatedMail = ({ trigger = "hover", ...props }: AnimatedIconProps) => {
    return (
        <motion.div
            whileHover={trigger === "hover" ? { scale: 1.1, rotate: [-2, 2, -2, 0] } : {}}
            transition={{ duration: 0.4, ease: "easeInOut" }}
        >
            <Mail {...props} />
        </motion.div>
    );
};

export const AnimatedExternalLink = ({ trigger = "hover", ...props }: AnimatedIconProps) => {
    return (
        <motion.div
            whileHover={trigger === "hover" ? { x: 3, y: -3 } : {}}
            transition={transition}
        >
            <ExternalLink {...props} />
        </motion.div>
    );
};

export const AnimatedMessageSquare = ({ trigger = "hover", ...props }: AnimatedIconProps) => {
    return (
        <motion.div
            whileHover={trigger === "hover" ? { scale: 1.2, rotate: [0, -15, 15, 0] } : {}}
            transition={{ duration: 0.4, ease: "easeInOut" }}
        >
            <MessageSquare {...props} />
        </motion.div>
    );
};

export const AnimatedChevronDown = ({ trigger = "hover", ...props }: AnimatedIconProps) => {
    return (
        <motion.div
            whileHover={trigger === "hover" ? { y: 3 } : {}}
            transition={transition}
        >
            <ChevronDown {...props} />
        </motion.div>
    );
};

export const AnimatedLinkedin = ({ trigger = "hover", ...props }: AnimatedIconProps) => {
    return (
        <motion.div
            whileHover={trigger === "hover" ? { scale: 1.1, y: -1 } : {}}
            transition={transition}
        >
            <Linkedin {...props} />
        </motion.div>
    );
};

export const AnimatedZap = ({ trigger = "hover", ...props }: AnimatedIconProps) => {
    return (
        <motion.div
            whileHover={trigger === "hover" ? {
                scale: 1.4,
                rotate: 15,
                filter: "drop-shadow(0 0 10px rgba(249, 115, 22, 0.6))",
                fill: "currentColor"
            } : {}}
            transition={transition}
        >
            <Zap {...props} />
        </motion.div>
    );
};
