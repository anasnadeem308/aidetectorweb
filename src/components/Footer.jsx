import Link from "next/link";
import { ScanText, Github, Twitter, Mail } from "lucide-react";

const FOOTER_LINKS = [
  { href: "/#tool", label: "AI Detector Tool" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy-policy", label: "Privacy Policy" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 mt-24 border-t border-slate-800/70 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                <ScanText className="h-5 w-5 text-white" />
              </span>
              <span className="font-display text-lg font-bold">
                <span className="gradient-text">AI Detector</span>{" "}
                <span className="text-slate-100">Pro</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              Our mission: give writers, educators, and publishers a fast,
              transparent, and privacy-first way to assess whether text was
              likely produced by an AI model — entirely in your browser, with
              zero data stored.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="grid h-9 w-9 place-items-center rounded-lg border border-slate-800 bg-slate-900/60 text-slate-300 transition-colors hover:text-white hover:border-slate-700"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="grid h-9 w-9 place-items-center rounded-lg border border-slate-800 bg-slate-900/60 text-slate-300 transition-colors hover:text-white hover:border-slate-700"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="mailto:support@aidetectorpro.app"
                aria-label="Email"
                className="grid h-9 w-9 place-items-center rounded-lg border border-slate-800 bg-slate-900/60 text-slate-300 transition-colors hover:text-white hover:border-slate-700"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-slate-200">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-slate-400 transition-colors hover:text-blue-400"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-slate-200">
              Legal Disclaimer
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              AI Detector Pro provides heuristic estimates only. Scores are
              based on statistical text features (burstiness, trigger-word
              density, type-token ratio) and should not be used as definitive
              proof of authorship. Always use human judgment when evaluating
              content authenticity.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-800/70 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-slate-500">
            &copy; {year} AI Detector Pro. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            Built with heuristic analysis — 100% client-side, no tracking.
          </p>
        </div>
      </div>
    </footer>
  );
}
