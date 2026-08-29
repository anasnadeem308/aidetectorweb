"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Is AI Detector Pro really free?",
    a: "Yes. The detector runs entirely in your browser using lightweight statistical heuristics. There is no sign-up, no API cost, and no usage limit. We may display ads to keep the service free.",
  },
  {
    q: "Does AI Detector Pro store my text?",
    a: "No. All analysis happens client-side in your browser. Your text never leaves your device and is never sent to a server, logged, or stored. See our Privacy Policy for full details.",
  },
  {
    q: "How does the AI detection actually work?",
    a: "We combine three signals: burstiness (sentence-length variance), AI trigger-word density (phrases like 'delve', 'furthermore', 'tapestry'), and type-token ratio (vocabulary variety). Human writing tends to be bursty with varied sentence lengths, while AI text is often smoother and more uniform.",
  },
  {
    q: "Can the detector prove a text was written by AI?",
    a: "No detector can prove authorship with certainty. Our score is a heuristic estimate that flags statistical patterns common in AI output. Always combine it with human judgment, especially for academic or legal decisions.",
  },
  {
    q: "What is the minimum text length for a reliable result?",
    a: "We recommend at least 50 words, with 200+ words producing the most stable readings. The tool requires a minimum of 12 words to run and will prompt you to add more if the sample is too short.",
  },
  {
    q: "Does it detect ChatGPT, GPT-4, and Claude?",
    a: "The heuristics are model-agnostic and target general AI writing patterns rather than specific models. They work across ChatGPT, GPT-4, Claude, Gemini, and similar large language models, though accuracy varies by model and prompt style.",
  },
];

export default function FAQAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      {FAQS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className="glass-card-soft overflow-hidden"
          >
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-semibold text-slate-100 sm:text-base">
                {item.q}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-slate-700 bg-slate-900/60 text-slate-300"
              >
                <ChevronDown className="h-4 w-4" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <p className="px-4 pb-4 text-sm leading-relaxed text-slate-400 sm:px-5">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
