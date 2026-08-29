import PageShell from "../../components/PageShell";
import AdSlot from "../../components/AdSlot";
import { Info, Cpu, Eye, ShieldCheck, Heart } from "lucide-react";

export const metadata = {
  title: "About — AI Detector Pro",
  description:
    "Our mission and how heuristic AI detection works. AI Detector Pro uses burstiness, trigger-word density, and type-token ratio — all client-side.",
};

export default function AboutPage() {
  return (
    <PageShell>
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
          <Info className="h-6 w-6 text-white" />
        </span>
        <h1 className="font-display text-3xl font-bold sm:text-4xl">About</h1>
      </div>

      <div className="glass-card mt-8 p-6 sm:p-8">
        <h2 className="font-display text-xl font-bold text-white">Our Mission</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          AI Detector Pro exists to give writers, educators, editors, and
          publishers a fast, transparent, and privacy-respecting way to assess
          whether a piece of text was likely produced by an AI model. We
          believe AI detection should not require an account, a subscription,
          or surrendering your data to a server. So we built a tool that runs
          entirely in your browser.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          We also believe in honesty about limitations. No detector is
          infallible. Our scores are estimates based on observable statistical
          patterns — not verdicts. We&apos;d rather show you the signals and
          let you judge than pretend to certainty we don&apos;t have.
        </p>
      </div>

      <div className="glass-card mt-6 p-6 sm:p-8">
        <h2 className="font-display text-xl font-bold text-white">
          How Our Heuristic Technology Works
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          Rather than running a large language model (which would require
          sending your text to a server), AI Detector Pro measures three
          lightweight, well-documented statistical features of the text and
          blends them into a single probability estimate.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <Feature
            icon={<Cpu className="h-5 w-5 text-blue-300" />}
            title="Burstiness"
            body="Standard deviation of per-sentence word counts. Human writing bursts; AI prose smooths out."
          />
          <Feature
            icon={<Eye className="h-5 w-5 text-purple-300" />}
            title="Trigger Density"
            body="Weighted count of AI-favored phrases per 100 words. Models reuse certain templates heavily."
          />
          <Feature
            icon={<ShieldCheck className="h-5 w-5 text-cyan-300" />}
            title="Type-Token Ratio"
            body="Unique words over total words. A proxy for vocabulary variety and predictability."
          />
        </div>

        <p className="mt-5 text-sm leading-relaxed text-slate-300">
          These signals are weighted — burstiness at 42%, trigger density at
          28%, type-token ratio at 15%, and a per-sentence trigger penalty at
          15% — to produce a blended AI probability score. The exact weighting
          was tuned against samples of known human and AI text, but it remains
          an approximation. Edge cases (highly polished human writing, or
          deliberately varied AI output) can fool any heuristic.
        </p>
      </div>

      <div className="glass-card mt-6 p-6 sm:p-8">
        <h2 className="font-display text-xl font-bold text-white">
          Why Client-Side?
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          Running everything in your browser means your text never leaves your
          device. There is no server log, no database, no retention period to
          worry about. This makes the tool suitable for sensitive content —
          unpublished drafts, student work, confidential documents — that you
          would not want to upload to a third-party API.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          The trade-off is that a client-side heuristic will never match the
          accuracy of a hosted model. We think that trade-off is worth it for a
          tool meant for quick, low-stakes screening.
        </p>
      </div>

      <div className="glass-card mt-6 p-6 sm:p-8">
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-pink-400" />
          <h2 className="font-display text-xl font-bold text-white">
            Built for Everyone
          </h2>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          AI Detector Pro is and will remain free to use. We cover costs
          through advertising. We do not sell data — because we do not collect
          any. If you have feedback or ideas for improving the heuristics, we
          would love to hear from you on our contact page.
        </p>
      </div>

      <div className="mt-8">
        <AdSlot format="leaderboard" slot="about" />
      </div>
    </PageShell>
  );
}

function Feature({ icon, title, body }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="grid h-10 w-10 place-items-center rounded-lg border border-slate-800 bg-slate-900/60">
        {icon}
      </div>
      <h3 className="mt-3 font-semibold text-white">{title}</h3>
      <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{body}</p>
    </div>
  );
}
