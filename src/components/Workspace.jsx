"use client";

import { useMemo } from "react";
import {
  Eraser,
  ClipboardPaste,
  Sparkles,
  Loader2,
  AlertTriangle,
  ScanLine,
} from "lucide-react";
import { SAMPLES } from "../lib/samples";

/**
 * Text input workspace for the detector.
 * @param {Object} props
 * @param {string} props.text
 * @param {(t:string)=>void} props.setText
 * @param {()=>void} props.onCheck
 * @param {boolean} props.analyzing
 * @param {(t:string)=>void} props.onSample
 */
export default function Workspace({ text, setText, onCheck, analyzing, onSample }) {
  const wordCount = useMemo(() => {
    const t = text.trim();
    return t ? t.split(/\s+/).filter(Boolean).length : 0;
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
      if (t) setText(text ? text + "\n" + t : t);
    } catch {
      // Clipboard blocked; ignore.
    }
  }

  return (
    <section id="tool" className="scroll-mt-24">
      <div className="card p-4 sm:p-6">
        <div className="mb-3 flex items-center gap-2">
          <ScanLine className="h-4 w-4 text-primary" />
          <h2 className="font-display text-lg font-semibold text-foreground">
            Paste your text
          </h2>
        </div>

        <label htmlFor="detector-input" className="sr-only">
          Paste or type text to analyze for AI content
        </label>
        <textarea
          id="detector-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste an article, essay, email, or paragraph here. Everything is analyzed privately in your browser — your text is never uploaded or stored."
          spellCheck={false}
          className="scrollbar-thin h-48 w-full resize-y rounded-xl border border-input bg-background/60 p-4 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 sm:h-56"
          aria-describedby="ws-stats"
        />

        {/* Sample texts */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            Try a sample:
          </span>
          {SAMPLES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => onSample(s.text)}
              className="chip transition-colors hover:border-primary hover:text-primary"
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div id="ws-stats" className="flex flex-wrap items-center gap-2 text-xs">
            <Stat label="Words" value={wordCount} />
            <Stat label="Characters" value={charCount} />
            <Stat label="Sentences" value={sentenceCount} />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePaste}
              className="btn-outline px-3 py-2 text-xs"
              type="button"
            >
              <ClipboardPaste className="h-4 w-4" />
              Paste
            </button>
            <button
              onClick={() => setText("")}
              disabled={!text}
              className="btn-outline px-3 py-2 text-xs"
              type="button"
            >
              <Eraser className="h-4 w-4" />
              Clear
            </button>
            <button
              onClick={onCheck}
              disabled={analyzing || tooShort || wordCount === 0}
              className="btn-primary px-5 py-2.5"
              type="button"
            >
              {analyzing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing…
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Check for AI
                </>
              )}
            </button>
          </div>
        </div>

        {tooShort && (
          <p className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-caution/40 bg-caution-soft px-3 py-1.5 text-xs font-medium text-caution">
            <AlertTriangle className="h-3.5 w-3.5" />
            Add at least 12 words for a reliable reading.
          </p>
        )}
      </div>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-2.5 py-1 text-muted-foreground">
      <span className="tabular font-semibold text-foreground">{value}</span>
      {label}
    </span>
  );
}
