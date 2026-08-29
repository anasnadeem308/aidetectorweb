"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ScanText, ShieldCheck } from "lucide-react";

const NAV_LINKS = [
  { href: "/#tool", label: "Tool" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy-policy", label: "Privacy Policy" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="glass-card mx-auto mt-3 flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label="AI Detector Pro home">
          <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/30">
            <ScanText className="h-5 w-5 text-white" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            <span className="gradient-text">AI Detector</span>{" "}
            <span className="text-slate-100">Pro</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800/60 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="/#tool"
            className="ml-2 inline-flex items-center gap-1.5 rounded-lg gradient-btn px-4 py-2 text-sm font-semibold shadow-lg shadow-blue-500/25 transition-transform hover:scale-[1.03]"
          >
            <ShieldCheck className="h-4 w-4" />
            Try Free
          </a>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-slate-800 bg-slate-900/60 text-slate-200 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            key="drawer"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="glass-card mx-auto mt-2 max-w-7xl px-3 py-3 md:hidden"
            aria-label="Mobile"
          >
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-800/70 hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="/#tool"
                  onClick={() => setOpen(false)}
                  className="mt-1 block rounded-lg gradient-btn px-3 py-2.5 text-center text-sm font-semibold"
                >
                  Try Free
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
