import Link from "next/link";
import {
  ScanLine,
  Zap,
  Lock,
  ShieldCheck,
  Waves,
  Brain,
  Activity,
  ArrowRight,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AdSlot from "../components/AdSlot";
import DetectorTool from "../components/DetectorTool";
import FAQAccordion from "../components/FAQAccordion";
import { FAQS } from "../lib/faqs";
import { SITE } from "../lib/site";
import {
  softwareApplicationSchema,
  faqSchema,
} from "../lib/schema";

export const metadata = {
  title: "Free AI Content Detector & GPT Checker",
  description:
    "Paste any text and instantly estimate whether it was written by a human or an AI like ChatGPT. Free, no sign-up, and analyzed entirely in your browser — nothing is stored.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE.name} — Free AI Content Detector & GPT Checker`,
    description:
      "Instantly estimate whether text was written by a human or an AI. Free, private, and in-browser.",
    url: SITE.url,
    type: "website",
  },
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(FAQS)) }}
      />
      <Header />
      <main className="flex-1">
        {/* HERO */}
        <section className="dot-grid border-b border-border">
          <div className="mx-auto max-w-6xl px-4 pb-8 pt-16 text-center sm:px-6 sm:pt-24">
            <span className="chip mx-auto">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Free &amp; private — no sign-up, nothing stored
            </span>
            <h1 className="mx-auto mt-6 max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Is it written by a human or an{" "}
              <span className="text-primary">AI?</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              AI Detector Pro reads the statistical fingerprints of writing —
              sentence rhythm, vocabulary variety, and telltale AI phrasing — to
              estimate whether text came from a person or a model like ChatGPT.
              It all runs in your browser, so your text never leaves your
              device.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a href="#tool" className="btn-primary">
                <ScanLine className="h-4 w-4" />
                Check your text
              </a>
              <a href="#how-it-works" className="btn-outline">
                How it works
              </a>
            </div>

            <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
              <TrustChip icon={<Zap className="h-4 w-4 text-primary" />} label="Instant results" />
              <TrustChip icon={<Lock className="h-4 w-4 text-primary" />} label="Nothing stored" />
              <TrustChip icon={<ShieldCheck className="h-4 w-4 text-primary" />} label="No sign-up" />
              <TrustChip icon={<Activity className="h-4 w-4 text-primary" />} label="Transparent signals" />
            </div>
          </div>
        </section>

        {/* TOOL */}
        <section className="mx-auto mt-12 max-w-6xl px-4 sm:px-6">
          <DetectorTool />
          <div className="mt-8">
            <AdSlot format="leaderboard" slot="home-top" />
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="mx-auto mt-24 max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="How it works"
            title="Three signals, one transparent score"
            sub="We don't claim to read minds. We measure concrete statistical features of your text and combine them openly — so you can see exactly why a score landed where it did."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <SignalCard
              icon={<Waves className="h-5 w-5 text-primary" />}
              title="Burstiness"
              body="Humans write in bursts — a short, punchy line next to a long, winding one. We measure how much sentence lengths vary. Consistently even pacing is a hallmark of AI prose."
            />
            <SignalCard
              icon={<Brain className="h-5 w-5 text-primary" />}
              title="AI phrase density"
              body="Language models lean on certain phrases — 'delve', 'furthermore', 'tapestry', 'it is important to note'. We count these template phrases and weight them per 100 words."
            />
            <SignalCard
              icon={<Activity className="h-5 w-5 text-primary" />}
              title="Vocabulary variety"
              body="The type-token ratio compares unique words to total words. AI text often clusters in a narrow, repetitive band. We flag variety that is unusually low or high."
            />
          </div>
        </section>

        {/* DEEP DIVE */}
        <section className="mx-auto mt-24 max-w-3xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="The science"
            title="Burstiness and perplexity, explained"
            sub="The two ideas behind modern AI-text detection — in plain language."
          />
          <article className="prose-article mt-8">
            <h2>What is burstiness?</h2>
            <p>
              Burstiness describes how much sentence length varies across a
              piece of writing. A human author might fire off a four-word
              sentence, follow it with a thirty-word one, then drop a fragment.
              A language model, trained to produce fluent and balanced output,
              tends to settle into a narrower band of sentence lengths.
              Statistically, burstiness is simply the standard deviation of the
              word count per sentence.
            </p>
            <p>
              A low burstiness score does not automatically mean text is
              AI-generated — polished human writing can be smooth too. But
              combined with other signals, consistently low burstiness is one of
              the strongest fingerprints of machine writing.
            </p>
            <h2>What is perplexity?</h2>
            <p>
              Perplexity is a language-modeling metric that asks, in effect,
              &ldquo;how surprised was a model by this text?&rdquo; Human writing
              is less predictable, so it tends to score higher perplexity.
              AI-generated text, produced by a model that optimizes for the most
              likely next word, tends to be more predictable and lower in
              perplexity.
            </p>
            <p>
              AI Detector Pro does not run a full language model, because that
              would require sending your text to a server. Instead we approximate
              the same intuition with a lightweight, in-browser proxy: vocabulary
              variety and AI-phrase density capture predictability and template
              reuse without ever transmitting your data.
            </p>
            <h2>Why combine signals?</h2>
            <p>
              No single metric is reliable alone. A legal document can be
              low-burstiness yet fully human. A creative prompt can push an AI
              toward high burstiness. By blending burstiness, AI-phrase density,
              vocabulary variety, and a per-sentence phrase penalty, we produce a
              sturdier estimate that is harder to fool with any one trick.
            </p>
          </article>
          <div className="mt-8">
            <AdSlot format="rectangle" slot="home-inline" />
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto mt-24 max-w-3xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently asked questions"
            sub="What the detector can — and can't — tell you."
          />
          <div className="mt-8">
            <FAQAccordion />
          </div>
        </section>

        {/* BLOG CTA */}
        <section className="mx-auto mt-24 max-w-6xl px-4 sm:px-6">
          <div className="card-flat flex flex-col items-start justify-between gap-4 bg-primary-soft p-6 sm:flex-row sm:items-center sm:p-8">
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
                Learn to spot AI writing yourself
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Our blog breaks down AI detection, academic integrity, and
                writing well in the age of generative AI — with practical,
                jargon-free guides.
              </p>
            </div>
            <Link href="/blog" className="btn-primary shrink-0">
              Read the blog
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <div className="mx-auto mt-12 max-w-6xl px-4 sm:px-6">
          <AdSlot format="leaderboard" slot="home-bottom" />
        </div>
      </main>
      <Footer />
    </div>
  );
}

function TrustChip({ icon, label }) {
  return (
    <div className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-xs font-medium text-foreground">
      {icon}
      {label}
    </div>
  );
}

function SectionHeading({ eyebrow, title, sub }) {
  return (
    <div className="text-center">
      <span className="text-xs font-semibold uppercase tracking-widest text-primary">
        {eyebrow}
      </span>
      <h2 className="mt-2 text-balance font-display text-3xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground">
        {sub}
      </p>
    </div>
  );
}

function SignalCard({ icon, title, body }) {
  return (
    <div className="card p-6">
      <div className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-primary-soft">
        {icon}
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}
