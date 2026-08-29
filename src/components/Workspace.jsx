"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Eraser, ClipboardPaste, Sparkles, Loader2, AlertTriangle } from "lucide-react";

/**
 * Hero input workspace.
 * @param {Object} props
 * @param {string} props.text
 * @param {(t:string)=>void} props.setText
 * @param {()=>void} props.onCheck
 * @param {boolean} props.analyzing
 */
export default function Workspace({ text, setText, onCheck, analyzing }) {
  const wordCount = useMemo(() => {
    const t = text.trim();
    if (!t) return 0;
    return t.split(/\s+/).filter(Boolean).length;
  }, [text]);
  const charCount = text.length;
  const sentenceCount = useMemo(() => {
    if (!text.trim()) return 0;
    return (text.match(/[.!?]+(\s|$)/g) || []).length || 1;
  }, [text]);

  const tooShort = wordCount > 0 && wordCount < 12;

  async function handlePaste() {
    try {
      const t = await navigator.clipboard.readText();
      if (t) setText((prev) => (prev ? prev + "\n" + t : t));
    } catch {
      // Clipboard API may be blocked; silently ignore.
    }
  }

  return (
    <section id="tool" className="scroll-mt-24">
      <div className="glass-card relative overflow-hidden p-4 sm:p-6">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

        <label htmlFor="detector-input" className="sr-only">
          Paste or type text to analyze
        </label>
        <textarea
          id="detector-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste an article, essay, or paragraph here. We analyze burstiness, trigger-word density, and vocabulary variety — entirely in your browser."
          spellCheck={false}
          className="scrollbar-thin h-48 w-full resize-y rounded-xl border border-slate-800/80 bg-slate-950/60 p-4 text-sm leading-relaxed text-slate-100 placeholder:text-slate-500 transition-all duration-300 focus:border-blue-500/60 focus:outline-none focus:ring-2 focus:ring-blue-500/30 sm:h-56"
          aria-describedby="ws-stats"
        />

        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div
            id="ws-stats"
            className="flex flex-wrap items-center gap-2 text-xs"
          >
            <Stat label="Words" value={wordCount} />
            <Stat label="Characters" value={charCount} />
            <Stat label="Sentences" value={sentenceCount} />
            {tooShort && (
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-1 font-medium text-amber-300">
                <AlertTriangle className="h-3 w-3" />
                Add 12+ words for a reliable reading
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePaste}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2 text-xs font-semibold text-slate-200 transition-colors hover:bg-slate-800/80 hover:text-white"
            >
              <ClipboardPaste className="h-4 w-4" />
              Paste
            </button>
            <button
              onClick={() => setText("")}
              disabled={!text}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2 text-xs font-semibold text-slate-200 transition-colors hover:bg-slate-800/80 hover:text-white disabled:opacity-40"
            >
              <Eraser className="h-4 w-4" />
              Clear
            </button>
            <motion.button
              whileHover={{ scale: analyzing ? 1 : 1.03 }}
              whileTap={{ scale: analyzing ? 1 : 0.97 }}
              onClick={onCheck}
              disabled={analyzing || tooShort || wordCount === 0}
              className="relative inline-flex items-center gap-2 overflow-hidden rounded-lg gradient-btn px-5 py-2.5 text-sm font-bold shadow-lg shadow-blue-500/30 transition-all disabled:cursor-not-allowed disabled:opacity-50"
            >
              {analyzing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing…
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Check AI Content
                </>
              )}
              {!analyzing && (
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer" />
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900/60 px-2.5 py-1 text-slate-300">
      <span className="font-semibold text-white">{value}</span>
      <span className="text-slate-500">{label}</span>
    </span>
  );
}
