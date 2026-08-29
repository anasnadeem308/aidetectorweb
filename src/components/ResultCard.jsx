"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  UserRound,
  Activity,
  Tag,
  Gauge,
  ScanText,
  Info,
} from "lucide-react";

/**
 * Animated result panel.
 * @param {Object} props
 * @param {ReturnType<typeof import("../utils/analyzer").analyzeText>} props.result
 * @param {boolean} props.analyzing
 */
export default function ResultCard({ result, analyzing }) {
  if (analyzing) {
    return (
      <div className="glass-card flex min-h-[280px] items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3 text-slate-400">
          <span className="h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-blue-500" />
          <span className="text-sm">Running heuristic analysis…</span>
        </div>
      </div>
    );
  }

  if (!result || !result.ready) {
    return (
      <div className="glass-card flex min-h-[280px] flex-col items-center justify-center p-6 text-center">
        <ScanText className="h-10 w-10 text-slate-600" />
        <p className="mt-3 max-w-xs text-sm text-slate-400">
          Results appear here. Paste at least 12 words and run the checker to
          see a probability breakdown, burstiness score, and matched AI trigger
          phrases.
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
  } = result;

  const aiTone =
    aiProbability >= 75
      ? "from-red-500 to-orange-500"
      : aiProbability >= 50
      ? "from-amber-500 to-yellow-500"
      : aiProbability >= 25
      ? "from-emerald-500/80 to-teal-500"
      : "from-emerald-500 to-green-500";

  const labelColor =
    aiProbability >= 75
      ? "text-red-300"
      : aiProbability >= 50
      ? "text-amber-300"
      : "text-emerald-300";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="glass-card relative overflow-hidden p-5 sm:p-6"
    >
      <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-display text-lg font-bold text-white">
            Analysis Result
          </h3>
          <p className="text-xs text-slate-400">
            Based on {wordCount} words across {sentenceCount} sentences
          </p>
        </div>
        <span
          className={`inline-flex w-fit items-center gap-1.5 rounded-full border border-slate-700/70 bg-slate-900/70 px-3 py-1 text-sm font-bold ${labelColor}`}
        >
          <Gauge className="h-4 w-4" />
          {scoreLabel}
        </span>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Meter
          icon={<Bot className="h-4 w-4" />}
          label="AI Probability"
          value={aiProbability}
          gradient="from-red-500 via-orange-500 to-amber-500"
        />
        <Meter
          icon={<UserRound className="h-4 w-4" />}
          label="Human Probability"
          value={humanProbability}
          gradient="from-emerald-500 via-green-500 to-teal-500"
        />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <MetricBadge
          icon={<Activity className="h-4 w-4 text-blue-300" />}
          label="Burstiness"
          value={burstiness.toString()}
          hint="Sentence-length variance"
        />
        <MetricBadge
          icon={<ScanText className="h-4 w-4 text-cyan-300" />}
          label="Type-Token Ratio"
          value={ttr.toString()}
          hint="Vocabulary variety"
        />
        <MetricBadge
          icon={<Tag className="h-4 w-4 text-purple-300" />}
          label="Trigger Hits"
          value={triggerCount.toString()}
          hint="AI-favored phrases"
        />
      </div>

      <div className="mt-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
          <Tag className="h-4 w-4 text-purple-400" />
          Matched AI Trigger Phrases
        </div>
        <AnimatePresence mode="popLayout">
          {matchedTriggers.length > 0 ? (
            <motion.div
              key="chips"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.05 } },
              }}
              className="mt-3 flex flex-wrap gap-2"
            >
              {matchedTriggers.map((phrase) => (
                <motion.span
                  key={phrase}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    show: { opacity: 1, scale: 1 },
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/40 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-200"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                  {phrase}
                </motion.span>
              ))}
            </motion.div>
          ) : (
            <p className="mt-3 text-xs text-slate-500">
              No AI-favored trigger phrases detected — a positive signal for
              human authorship.
            </p>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-5 flex items-start gap-2 rounded-xl border border-slate-800/80 bg-slate-950/50 p-3 text-xs text-slate-400">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
        <p>
          This is a heuristic estimate, not a verdict. Scores combine
          burstiness, trigger-word density, and type-token ratio. Always apply
          human judgment for high-stakes decisions.
        </p>
      </div>
    </motion.div>
  );
}

function Meter({ icon, label, value, gradient }) {
  // Animate the value count-up alongside the bar fill.
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const from = 0;
    const to = value;
    const dur = 700;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return (
    <div className="rounded-xl border border-slate-800/80 bg-slate-950/50 p-4">
      <div className="flex items-center justify-between text-sm">
        <span className="inline-flex items-center gap-2 font-medium text-slate-300">
          {icon}
          {label}
        </span>
        <span className="font-display text-lg font-bold text-white">
          {display}%
        </span>
      </div>
      <div className="mt-2.5 h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function MetricBadge({ icon, label, value, hint }) {
  return (
    <div className="rounded-xl border border-slate-800/80 bg-slate-950/50 p-3.5">
      <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
        {icon}
        {label}
      </div>
      <div className="mt-1.5 font-display text-2xl font-bold text-white">
        {value}
      </div>
      <div className="text-[11px] text-slate-500">{hint}</div>
    </div>
  );
}
