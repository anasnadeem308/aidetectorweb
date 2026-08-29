import Link from "next/link";
import { ScanLine } from "lucide-react";
import { SITE } from "../lib/site";

const COLUMNS = [
  {
    heading: "Tool",
    links: [
      { href: "/#tool", label: "AI Detector" },
      { href: "/#how-it-works", label: "How it works" },
      { href: "/#faq", label: "FAQ" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
                <ScanLine className="h-5 w-5" />
              </span>
              <span className="font-display text-lg font-semibold text-foreground">
                AI Detector <span className="text-primary">Pro</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A free, privacy-first way to estimate whether text was written by
              a human or an AI model — analyzed entirely in your browser, with
              nothing stored.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-xl border border-border bg-muted/60 p-4 text-xs leading-relaxed text-muted-foreground">
          <strong className="font-semibold text-foreground">Disclaimer:</strong>{" "}
          AI Detector Pro provides heuristic estimates based on statistical text
          features. Scores are not definitive proof of authorship and should
          never be the sole basis for academic, employment, or legal decisions.
          Always apply human judgment.
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-border pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-muted-foreground">
            &copy; {year} {SITE.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built privacy-first — 100% in-browser analysis, no tracking of your
            text.
          </p>
        </div>
      </div>
    </footer>
  );
}
