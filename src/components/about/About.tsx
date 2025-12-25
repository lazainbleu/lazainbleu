"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Card from "@/components/ui/Card";
import { Sparkles, Code2, MessageCircle, GraduationCap } from "lucide-react";

// Data untuk Teknologi dan Pengalaman
const technologies = [
    "TypeScript", "React", "Next.js",
    "Tailwind CSS", "TanStack Query"
];

const experiences = [
    {
        role: "BSc",
        company: "Computer Science",
        detail: "Survived the projects, learned the essentials, and ended up loving the craft more than expected.",
        color: "blue"
    }
];

type Particle = { top: string; left: string; delay: number; size: number };

export default function About() {
    const [particles, setParticles] = useState<Particle[]>([]);
    useEffect(() => {
        const arr = Array.from({ length: 18 }).map(() => ({
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            delay: Math.random() * 4,
            size: Math.random() * 3 + 1,
        }));
        setParticles(arr);
    }, []);

    // cursor glow effect setup
    const mouseX = useMotionValue(-9999);
    const mouseY = useMotionValue(-9999);
    const cursorX = useSpring(mouseX, { damping: 30, stiffness: 200 });
    const cursorY = useSpring(mouseY, { damping: 30, stiffness: 200 });

    const handleMouseMove = (e: React.MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    return (
        <section
            id="about"
            className="relative min-h-screen bg-black text-white overflow-hidden px-8 md:px-16 lg:px-24 py-24 flex items-center justify-center"
            onMouseMove={handleMouseMove}
        >
            {/* subtle grid */}
            <div className="pointer-events-none absolute inset-0 opacity-5 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:80px_80px]" />

            {/* soft gradient background */}
            <motion.div
                className="absolute -z-10 left-1/2 top-12 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-30 -translate-x-1/2 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle at 30% 30%, rgba(99,102,241,0.12), transparent 30%), radial-gradient(circle at 70% 70%, rgba(16,185,129,0.08), transparent 30%)",
                }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* cursor glow */}
            <motion.div
                className="absolute w-36 h-36 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
                style={{
                    x: cursorX,
                    y: cursorY,
                    background:
                        "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 40%)",
                }}
            />

            {/* floating particles */}
            <div className="absolute inset-0 pointer-events-none">
                {particles.map((p, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-gradient-to-r from-[rgba(99,102,241,0.35)] to-[rgba(16,185,129,0.25)] rounded-full"
                        style={{
                            top: p.top,
                            left: p.left,
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.6, 0] }}
                        transition={{
                            duration: 4 + p.size / 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: p.delay,
                        }}
                    />
                ))}
            </div>

            {/* main content */}
            <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

                {/* Left Side (Narrative & Skills) */}
                <div className="space-y-8">
                    {/* Header: ABOUT ME (Unchanged) */}
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-zinc-900/40 border border-zinc-800/40 backdrop-blur-sm">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        >
                            <Code2 className="w-4 h-4 text-zinc-300" />
                        </motion.div>
                        <span className="text-xs font-mono text-zinc-400 tracking-widest">
                            ABOUT ME
                        </span>
                    </div>

                    {/* Narasi yang Direvisi */}
                    <div className="space-y-4">
                        <p className="text-lg text-zinc-300 leading-relaxed max-w-lg">
                            I recently graduated in Computer Science and now work as a Software Engineer specializing in the React ecosystem and scalable UI development. I’m also building my brand, Lazain Bleu.
                        </p>
                        <motion.div
                            className="w-24 h-1 rounded-full bg-gradient-to-r from-[#6366f1] to-[#06b6d4]"
                            initial={{ width: 0 }}
                            whileInView={{ width: 96 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        />
                    </div>

                    {/* Experiences (Pendidikan) */}
                    <div className="grid grid-cols-1 gap-3">
                        {experiences.map((exp, i) => (
                            <motion.div
                                key={exp.role}
                                initial={{ opacity: 0, x: -12 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.12 * i, duration: 0.45 }}
                                className="flex items-center justify-between gap-4 p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/40 backdrop-blur-sm"
                            >
                                <div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-base font-semibold">{exp.role}</span>
                                        <span className="text-zinc-600">·</span>
                                        <span
                                            className={clsx(
                                                "font-medium",
                                                exp.color === "blue" ? "text-blue-400" : "text-cyan-400"
                                            )}
                                        >
                                            {exp.company}
                                        </span>
                                    </div>
                                    <p className="text-zinc-500 text-sm">{exp.detail}</p>
                                </div>
                                <GraduationCap className="w-5 h-5 text-zinc-500" />
                            </motion.div>
                        ))}
                    </div>

                    {/* Tech badges */}
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="h-px w-8 bg-zinc-800" />
                            <span className="text-xs font-mono text-zinc-500 tracking-widest">
                                HERE ARE MY PREFERRED TECHNOLOGIES
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {technologies.map((t, i) => (
                                <motion.span
                                    key={t}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.06 * i }}
                                    className="px-3 py-1 rounded-lg text-sm font-medium bg-zinc-900/40 border border-zinc-800/40 text-zinc-300"
                                >
                                    {t}
                                </motion.span>
                            ))}
                        </div>
                    </div>

                    {/* Hobi/Minat Bisnis */}
                    <div className="text-zinc-400 max-w-md text-sm leading-relaxed">
                        <p>
                            Outside of development, I enjoy exploring science and business concepts,
                            playing games, or creating content for fun.
                        </p>
                    </div>
                </div>

                {/* Right Side (Card) - HANYA FOTO & CTA */}
                <div className="w-full flex justify-center lg:justify-end">
                    <div className="relative w-full max-w-sm">
                        <div className="rounded-2xl p-1 bg-gradient-to-r from-[#0f0f11] via-[#1a1a1d] to-[#2a2a30] shadow-[0_0_25px_rgba(255,255,255,0.05)]">
                            <div className="bg-zinc-900/60 border border-zinc-800/50 rounded-xl p-4 backdrop-blur-sm">

                                {/* Wrapper untuk menyelaraskan lebar Foto dan Tombol */}
                                <div className="w-full max-w-xs mx-auto">

                                    {/* Profile Card (Foto) */}
                                    {/* Asumsi Card component sudah memiliki border styling yang benar */}
                                    <div className="w-full aspect-square">
                                        {/* Ganti dengan path foto Anda */}
                                        <Card src="/images/zspider.png" alt="Profile" />
                                    </div>

                                    {/* CTA - Tombol Connect dan Chat yang Selaras */}
                                    <div className="mt-4 flex gap-2 w-full">

                                        {/* 1. Connect Button (Primary Action) */}
                                        <button
                                            onClick={() => window.open("https://www.linkedin.com/in/zeiyn", "_blank")}
                                            className={clsx(
                                                "w-1/2 flex items-center justify-center gap-1",
                                                "px-4 py-2 rounded-lg text-sm font-semibold shadow",
                                                "bg-gradient-to-r from-indigo-500 to-cyan-500 text-black",
                                                "hover:shadow-lg hover:shadow-indigo-500/30 transition-shadow"
                                            )}
                                        >
                                            Connect
                                        </button>

                                        {/* 2. Chat Button (Secondary Action) */}
                                        <button
                                            // Ganti dengan fungsi chat yang sesuai
                                            className={clsx(
                                                "w-1/2 flex items-center justify-center gap-1",
                                                "px-3 py-2 rounded-lg text-sm font-medium transition-all",
                                                "bg-zinc-900/40 text-zinc-300 border border-zinc-800",
                                                "hover:text-indigo-400 hover:border-indigo-500"
                                            )}
                                        >
                                            <MessageCircle className="w-4 h-4" />
                                            Chat
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* decorative floating frames (Unchanged) */}
                        <motion.div
                            className="absolute -top-6 -left-6 w-20 h-20 rounded-2xl border border-zinc-800/50"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                            className="absolute -bottom-6 -right-6 w-16 h-16 rounded-xl border border-zinc-800/50"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}