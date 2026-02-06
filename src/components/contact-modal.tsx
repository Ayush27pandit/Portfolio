"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Copy, Github, Linkedin } from "lucide-react";

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const firstInputRef = useRef<HTMLInputElement>(null);
    const [copied, setCopied] = useState(false);
    const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

    const email = "panditayush2703@gmail.com";

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            // Focus first input after animation
            setTimeout(() => firstInputRef.current?.focus(), 100);
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // ESC key handler
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    const handleCopyEmail = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            window.location.href = `mailto:${email}`;
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState("sending");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to send");
            }

            setFormState("sent");
        } catch (error) {
            console.error("Failed to send message:", error);
            setFormState("idle");
            alert("Failed to send message. Please try again or email directly.");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const resetAndClose = () => {
        setFormState("idle");
        setFormData({ name: "", email: "", message: "" });
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        onClick={resetAndClose}
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
                        aria-hidden="true"
                    />

                    {/* Modal */}
                    <motion.div
                        ref={modalRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                        initial={{ opacity: 0, scale: 0.97, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.97, y: 8 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-[720px] mx-4 outline-none"
                    >
                        <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
                            {/* Close button */}
                            <button
                                onClick={resetAndClose}
                                className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors z-10"
                                aria-label="Close"
                            >
                                <X size={18} />
                            </button>

                            {formState === "sent" ? (
                                /* Success State */
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="py-16 px-8 text-center"
                                >
                                    <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                                        <Check size={28} className="text-accent" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-foreground">Message received</h3>
                                    <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
                                        Thanks for reaching out. I'll get back to you within 24 hours.
                                    </p>
                                    <button
                                        onClick={resetAndClose}
                                        className="mt-8 px-6 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-muted/50 transition-colors"
                                    >
                                        Close
                                    </button>
                                </motion.div>
                            ) : (
                                /* Two-column layout */
                                <div className="grid md:grid-cols-[1.2fr_0.8fr]">
                                    {/* Left: Form (Primary) */}
                                    <div className="p-8 md:pr-6">
                                        <h2 id="modal-title" className="text-xl font-semibold tracking-tight text-foreground">
                                            Get in touch
                                        </h2>
                                        <p className="text-sm text-muted-foreground mt-1.5 mb-6">
                                            Have a project in mind or want to discuss opportunities?
                                        </p>

                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div>
                                                <label htmlFor="name" className="sr-only">Name</label>
                                                <input
                                                    ref={firstInputRef}
                                                    id="name"
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    placeholder="Name"
                                                    required
                                                    autoComplete="name"
                                                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:border-foreground/30 transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="sr-only">Email</label>
                                                <input
                                                    id="email"
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    placeholder="Email"
                                                    required
                                                    autoComplete="email"
                                                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:border-foreground/30 transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="message" className="sr-only">Message</label>
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleInputChange}
                                                    placeholder="Describe your project, technical challenge, or opportunity..."
                                                    required
                                                    rows={5}
                                                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/50 text-sm resize-none focus:outline-none focus:border-foreground/30 transition-colors"
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={formState === "sending"}
                                                className="w-full py-3 rounded-xl bg-foreground text-background text-sm font-medium hover:bg-foreground/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                                            >
                                                {formState === "sending" ? "Sending..." : "Send message"}
                                            </button>
                                        </form>
                                    </div>

                                    {/* Right: Context (Secondary) */}
                                    <div className="p-8 md:pl-6 bg-muted/30 border-t md:border-t-0 md:border-l border-border">
                                        <div className="space-y-6">
                                            {/* Direct contact */}
                                            <div>
                                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                                                    Direct
                                                </p>
                                                <button
                                                    onClick={handleCopyEmail}
                                                    className="w-full text-left p-3 rounded-lg border border-border bg-background hover:bg-muted/50 transition-colors group"
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-foreground font-medium truncate pr-2">
                                                            {email}
                                                        </span>
                                                        <span className="text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0">
                                                            {copied ? <Check size={14} /> : <Copy size={14} />}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        {copied ? "Copied!" : "Click to copy"}
                                                    </p>
                                                </button>
                                                <a
                                                    href={`mailto:${email}`}
                                                    className="block text-xs text-muted-foreground hover:text-foreground transition-colors mt-2 ml-1"
                                                >
                                                    Open in mail app →
                                                </a>
                                            </div>

                                            {/* Social links */}
                                            <div>
                                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                                                    Elsewhere
                                                </p>
                                                <div className="space-y-2">
                                                    <a
                                                        href="https://github.com/Ayush27pandit"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background hover:bg-muted/50 transition-colors group"
                                                    >
                                                        <Github size={16} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                                                        <span className="text-sm text-foreground">GitHub</span>
                                                    </a>
                                                    <a
                                                        href="https://www.linkedin.com/in/ayush-p-02b199252/"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background hover:bg-muted/50 transition-colors group"
                                                    >
                                                        <Linkedin size={16} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                                                        <span className="text-sm text-foreground">LinkedIn</span>
                                                    </a>
                                                </div>
                                            </div>

                                            {/* Response time */}
                                            <p className="text-xs text-muted-foreground pt-2">
                                                Typically respond within 24 hours.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
