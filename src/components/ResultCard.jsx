"use client";

import { useEffect, useState } from "react";
import {
  Bot,
  UserRound,
  Activity,
  Tag,
  ScanLine,
  Info,
  Check,
  Copy,
  Share2,
  Lightbulb,
} from "lucide-react";
import { SITE } from "../lib/site";

/**
 * Result panel with empty, loading, and populated states.
 * @param {Object} props
 * @param {object|null} props.result
 * @param {boolean} props.analyzing
 */
export default function ResultCard({ result, analyzing }) {
  if (analyzing) {
    return (
      <div className="card flex min-h-[320px] items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <span className="relative grid h-12 w-12 place-items-center overflow-hidden rounded-xl border border-border bg-muted">
            <ScanLine className="h-6 w-6 text-primary" />
            <span className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-primary/70 animate-scanline" />
          </span>
          <span className="text-sm">Analyzing text patterns…</span>
        </div>
      </div>
    );
  }

  if (!result || !result.ready) {
    return (
      <div className="card flex min-h-[320px] flex-col items-center justify-center p-8 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-xl border border-border bg-muted">
          <ScanLine className="h-6 w-6 text-muted-foreground" />
        </span>
        <h2 className="mt-4 font-display text-lg font-semibold text-foreground">
          Your result appears here
        </h2>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
          Paste at least 12 words (or try a sample) and run the checker to see a
          probability score, a plain-language explanation, and the exact signals
          behind it.
        </p>
      </div>
    );
  }

  return <Results result={result} />;
}

function Results({ result }) {
  const {
    aiProbability,
    humanProbability,
    burstiness,
    triggerCount,
    matchedTriggers,
    wordCount,
    sentenceCount,
    ttr,
    scoreLabel,
    explanation,
  } = result;

  const [copied, setCopied] = useState(false);

  const tone =
    aiProbability >= 75
      ? { text: "text-alert", bg: "bg-alert-soft", bar: "bg-alert", ring: "border-alert/30" }
      : aiProbability >= 50
      ? { text: "text-caution", bg: "bg-caution-soft", bar: "bg-caution", ring: "border-caution/30" }
      : { text: "text-primary", bg: "bg-primary-soft", bar: "bg-primary", ring: "border-primary/30" };

  function buildSummaryText() {
    return [
      `AI Detector Pro result: ${scoreLabel}`,
      `AI probability: ${aiProbability}% | Human probability: ${humanProbability}%`,
      `Based on ${wordCount} words across ${sentenceCount} sentences.`,
      explanation?.summary || "",
      `Checked with ${SITE.name} — ${SITE.url}`,
    ]
      .filter(Boolean)
      .join("\n");
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(buildSummaryText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  async function handleShare() {
    const shareData = {
      title: `${SITE.name} result`,
      text: buildSummaryText(),
      url: SITE.url,
    };
    try {
      if (navigator.share) await navigator.share(shareData);
      else await handleCopy();
    } catch {
      /* user cancelled */
    }
  }

  return (
    <div className="card animate-fadeInUp p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-semibold text-foreground">
            Analysis result
          </h2>
          <p className="text-xs text-muted-foreground">
            Based on {wordCount} words across {sentenceCount} sentences
          </p>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-semibold ${tone.text} ${tone.ring} ${tone.bg}`}
        >
          {scoreLabel}
        </span>
      </div>

      {/* Meters */}
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Meter
          icon={<Bot className="h-4 w-4" />}
          label="AI probability"
          value={aiProbability}
          barClass="bg-alert"
        />
        <Meter
          icon={<UserRound className="h-4 w-4" />}
          label="Human probability"
          value={humanProbability}
          barClass="bg-primary"
        />
      </div>

      {/* Plain-language explanation */}
      {explanation && (
        <div className={`mt-5 rounded-xl border ${tone.ring} ${tone.bg} p-4`}>
          <div className="flex items-center gap-2">
            <Lightbulb className={`h-4 w-4 ${tone.text}`} />
            <h3 className={`text-sm font-semibold ${tone.text}`}>
              What this means
            </h3>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-foreground/90">
            {explanation.summary}
          </p>
          <ul className="mt-3 space-y-2">
            {explanation.points.map((p, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed text-foreground/80">
                <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${tone.bar}`} />
                {p}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Signals */}
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <Metric icon={<Activity className="h-4 w-4 text-primary" />} label="Burstiness" value={burstiness.toString()} hint="Sentence-length variance" />
        <Metric icon={<ScanLine className="h-4 w-4 text-primary" />} label="Type-token ratio" value={ttr.toString()} hint="Vocabulary variety" />
        <Metric icon={<Tag className="h-4 w-4 text-primary" />} label="Trigger hits" value={triggerCount.toString()} hint="AI-favored phrases" />
      </div>

      {/* Matched triggers */}
      {matchedTriggers.length > 0 && (
        <div className="mt-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Tag className="h-4 w-4 text-primary" />
            Matched AI trigger phrases
          </div>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {matchedTriggers.map((phrase) => (
              <span
                key={phrase}
                className="inline-flex items-center gap-1.5 rounded-full border border-alert/30 bg-alert-soft px-3 py-1 text-xs font-medium text-alert"
              >
                {phrase}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Copy / share */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <button onClick={handleCopy} className="btn-outline px-3 py-2 text-xs" type="button">
          {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied" : "Copy result"}
        </button>
        <button onClick={handleShare} className="btn-outline px-3 py-2 text-xs" type="button">
          <Share2 className="h-4 w-4" />
          Share
        </button>
      </div>

      <div className="mt-5 flex items-start gap-2 rounded-xl border border-border bg-muted/50 p-3 text-xs leading-relaxed text-muted-foreground">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <p>
          This is a heuristic estimate, not a verdict. Always apply human
          judgment before making high-stakes decisions about authorship.
        </p>
      </div>
    </div>
  );
}

function Meter({ icon, label, value, barClass }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const dur = 700;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return (
    <div className="rounded-xl border border-border bg-muted/40 p-4">
      <div className="flex items-center justify-between text-sm">
        <span className="inline-flex items-center gap-2 font-medium text-muted-foreground">
          {icon}
          {label}
        </span>
        <span className="tabular font-display text-lg font-semibold text-foreground">
          {display}%
        </span>
      </div>
      <div className="mt-2.5 h-2.5 w-full overflow-hidden rounded-full bg-border">
        <div
          className={`h-full rounded-full transition-[width] duration-700 ease-out ${barClass}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function Metric({ icon, label, value, hint }) {
  return (
    <div className="rounded-xl border border-border bg-muted/40 p-3.5">
      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="tabular mt-1.5 font-display text-2xl font-semibold text-foreground">
        {value}
      </div>
      <div className="text-[11px] text-muted-foreground">{hint}</div>
    </div>
  );
}
