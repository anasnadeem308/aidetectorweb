"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ScanText,
  ShieldCheck,
  Zap,
  Lock,
  Gauge,
  Activity,
  Waves,
  Brain,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AdSlot from "../components/AdSlot";
import Workspace from "../components/Workspace";
import ResultCard from "../components/ResultCard";
import FAQAccordion from "../components/FAQAccordion";
import { analyzeText } from "../utils/analyzer";

export default function HomePage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  function handleCheck() {
    if (analyzing) return;
    setAnalyzing(true);
    setResult(null);
    // Simulate a brief analysis pass for UX (computation is instant).
    setTimeout(() => {
      setResult(analyzeText(text));
      setAnalyzing(false);
    }, 650);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* HERO */}
        <section className="relative mx-auto max-w-7xl px-4 pt-16 text-center sm:px-6 sm:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/70 px-4 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-xl">
              <Sparkles className="h-3.5 w-3.5 text-blue-400" />
              Free &amp; Private — No sign-up required
            </span>
            <h1 className="mx-auto mt-6 max-w-4xl font-display text-4xl font-bold leading-[1.1] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Detect{" "}
              <span className="gradient-text">AI-Generated Content</span>{" "}
              in seconds
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
              AI Detector Pro analyzes burstiness, trigger-word density, and
              vocabulary variety to estimate whether text was written by a
              human or an AI model — 100% in your browser, with zero data
              stored.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#tool"
                className="inline-flex items-center gap-2 rounded-lg gradient-btn px-6 py-3 text-sm font-bold shadow-lg shadow-blue-500/30 transition-transform hover:scale-[1.03]"
              >
                <ScanText className="h-4 w-4" />
                Start Checking
              </a>
              <a
                href="#faq"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/60 px-6 py-3 text-sm font-semibold text-slate-200 transition-colors hover:bg-slate-800/80"
              >
                How it works
              </a>
            </div>
          </motion.div>

          {/* Trust strip */}
          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            <TrustChip icon={<Zap className="h-4 w-4 text-blue-300" />} label="Instant" />
            <TrustChip icon={<Lock className="h-4 w-4 text-cyan-300" />} label="Zero storage" />
            <TrustChip icon={<ShieldCheck className="h-4 w-4 text-purple-300" />} label="No sign-up" />
            <TrustChip icon={<Gauge className="h-4 w-4 text-emerald-300" />} label="3 signals" />
          </div>
        </section>

        {/* TOOL + RESULT */}
        <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6">
          <div className="grid gap-5 lg:grid-cols-2">
            <Workspace
              text={text}
              setText={setText}
              onCheck={handleCheck}
              analyzing={analyzing}
            />
            <ResultCard result={result} analyzing={analyzing} />
          </div>

          <div className="mt-6">
            <AdSlot format="leaderboard" slot="home-top" />
          </div>
        </section>

        {/* HOW IT WORKS / SIGNALS */}
        <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="The Signals"
            title="Three heuristics, one score"
            sub="We don't pretend to read minds. We measure concrete statistical features of the text and combine them transparently."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <SignalCard
              icon={<Waves className="h-6 w-6 text-blue-300" />}
              title="Burstiness"
              body="Humans write in bursts — short punchy sentences mixed with long ones. We measure the standard deviation of sentence lengths. Low variance is a hallmark of AI prose."
            />
            <SignalCard
              icon={<Brain className="h-6 w-6 text-purple-300" />}
              title="Trigger-Word Density"
              body="AI models overuse certain phrases: 'delve', 'furthermore', 'tapestry', 'it is important to note'. We count these and weight them per 100 words."
            />
            <SignalCard
              icon={<Activity className="h-6 w-6 text-cyan-300" />}
              title="Type-Token Ratio"
              body="Unique words divided by total words. AI text often has a narrow, repetitive vocabulary. We flag unusually low or high variety."
            />
          </div>
        </section>

        {/* DEEP SEO: BURSTINESS & PERPLEXITY */}
        <section className="mx-auto mt-20 max-w-4xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Deep Dive"
            title="Burstiness &amp; Perplexity, explained"
            sub="The two concepts that power modern AI text detection — and how AI Detector Pro uses them."
          />

          <article className="glass-card mt-8 p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold text-white">
              What is Burstiness?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Burstiness measures how much sentence lengths vary within a piece
              of writing. A human author might write a four-word sentence, then
              a thirty-word one, then a fragment. An AI model, trained to
              produce fluent, balanced output, tends toward a narrower band of
              sentence lengths. In statistical terms, burstiness is the
              standard deviation of per-sentence word counts.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              A low burstiness score does not automatically mean a text is
              AI-generated — polished human writing can also be smooth. But
              combined with other signals, consistently low burstiness is one
              of the strongest statistical fingerprints of machine-generated
              prose.
            </p>

            <h3 className="mt-7 font-display text-xl font-bold text-white">
              What is Perplexity?
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Perplexity is a language-modeling metric: it asks, "how surprised
              was a model by this text?" Human writing tends to be more
              unpredictable, so it yields higher perplexity. AI-generated text,
              produced by a model optimizing for likely next tokens, tends to
              be more predictable and thus lower in perplexity.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              AI Detector Pro does not run a full language model (that would
              require sending your text to a server). Instead, we approximate
              the underlying intuition with a lightweight, client-side proxy:
              type-token ratio and trigger-word density. These capture
              vocabulary predictability and phrase-template reuse without ever
              transmitting your data.
            </p>

            <h3 className="mt-7 font-display text-xl font-bold text-white">
              Why combine signals?
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              No single metric is reliable on its own. A legal document can be
              low-burstiness yet fully human. A creative AI prompt can produce
              high-burstiness output. By blending burstiness (42% weight),
              trigger density (28%), type-token ratio (15%), and a per-sentence
              trigger penalty (15%), we produce a more robust estimate that is
              harder to game with any one trick.
            </p>

            <div className="mt-6">
              <AdSlot format="rectangle" slot="home-inline" />
            </div>
          </article>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto mt-20 max-w-3xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently asked questions"
            sub="Everything you need to know about how the detector works and what it can (and can't) tell you."
          />
          <div className="mt-8">
            <FAQAccordion />
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto mt-20 max-w-5xl px-4 sm:px-6">
          <div className="glass-card relative overflow-hidden p-8 text-center sm:p-12">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />
            <div className="relative">
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                Ready to check your text?
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm text-slate-400">
                Paste anything — an essay, an article, a comment — and get an
                instant AI probability score. No account, no storage.
              </p>
              <a
                href="#tool"
                className="mt-6 inline-flex items-center gap-2 rounded-lg gradient-btn px-6 py-3 text-sm font-bold shadow-lg shadow-blue-500/30 transition-transform hover:scale-[1.03]"
              >
                <ScanText className="h-4 w-4" />
                Open the detector
              </a>
            </div>
          </div>
        </section>

        <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6">
          <AdSlot format="leaderboard" slot="home-bottom" />
        </div>
      </main>
      <Footer />
    </div>
  );
}

function TrustChip({ icon, label }) {
  return (
    <div className="glass-card-soft flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-medium text-slate-300">
      {icon}
      {label}
    </div>
  );
}

function SectionHeading({ eyebrow, title, sub }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4 }}
      className="text-center"
    >
      <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
        {eyebrow}
      </span>
      <h2
        className="mt-2 font-display text-3xl font-bold text-balance"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <p
        className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-400"
        dangerouslySetInnerHTML={{ __html: sub }}
      />
    </motion.div>
  );
}

function SignalCard({ icon, title, body }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4 }}
      className="glass-card p-6"
    >
      <div className="grid h-11 w-11 place-items-center rounded-xl border border-slate-800 bg-slate-950/60">
        {icon}
      </div>
      <h3 className="mt-4 font-display text-lg font-bold text-white">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">{body}</p>
    </motion.div>
  );
}
