// Long-tail blog content for organic SEO. Each post is fully static (SSG).
// Body is an array of blocks: { type: "p" | "h2" | "ul" | "quote", ... }

export const CATEGORIES = {
  guides: "Guides",
  students: "For Students",
  writers: "For Writers",
  teachers: "For Educators",
  compare: "Comparisons",
};

/**
 * @typedef {Object} Post
 * @property {string} slug
 * @property {string} title
 * @property {string} description
 * @property {string} category
 * @property {string} date  ISO date
 * @property {string} updated ISO date
 * @property {number} readingMinutes
 * @property {string[]} keywords
 * @property {Array<{type:string, text?:string, items?:string[]}>} body
 */

const p = (text) => ({ type: "p", text });
const h2 = (text) => ({ type: "h2", text });
const ul = (items) => ({ type: "ul", items });
const quote = (text) => ({ type: "quote", text });

/** Shared closing CTA-ish paragraph reused across posts. */
const tryIt = p(
  "You can test any passage yourself with our free AI content detector — it runs entirely in your browser, stores nothing, and explains the reasoning behind every score."
);

/** @type {Post[]} */
export const POSTS = [
  {
    slug: "how-ai-detectors-work",
    title: "How Do AI Content Detectors Actually Work?",
    description:
      "A plain-English explanation of perplexity, burstiness, and the statistical signals AI detectors use to flag machine-written text — and why no detector is ever 100% certain.",
    category: "guides",
    date: "2025-01-14",
    updated: "2025-06-02",
    readingMinutes: 8,
    keywords: ["how ai detectors work", "perplexity", "burstiness", "ai detection explained"],
    body: [
      p(
        "AI content detectors have gone from a curiosity to a daily tool for teachers, editors, and hiring managers. But most people using them have no idea what the score actually means. This guide breaks down the real mechanics — no hype, no jargon you can't follow."
      ),
      h2("The core idea: predictability"),
      p(
        "Large language models like GPT are, at heart, next-word prediction machines. They are trained to produce the most statistically likely word given everything that came before. That single fact is what every detector exploits: AI-generated text tends to be more predictable than human writing."
      ),
      p(
        "Detectors estimate two things above all else — perplexity and burstiness. Understanding these two words is 80% of understanding AI detection."
      ),
      h2("Perplexity: how surprised is the model?"),
      p(
        "Perplexity measures how surprised a language model is by a piece of text. If every word is exactly what the model would have predicted, perplexity is low. Human writing is messier: we choose odd words, break patterns, and wander. That unpredictability shows up as higher perplexity."
      ),
      quote(
        "Low perplexity means 'this reads like something a model would generate.' High perplexity leans human."
      ),
      h2("Burstiness: the rhythm of sentences"),
      p(
        "Burstiness measures variation in sentence length and complexity. Humans write in bursts — a long, winding sentence followed by a short one. Punchy. Then another sprawling thought. AI models, left unedited, tend to produce sentences of remarkably uniform length and structure."
      ),
      p(
        "When a detector sees paragraph after paragraph of evenly-sized, evenly-structured sentences, that uniformity pushes the score toward 'AI.'"
      ),
      h2("Trigger phrases and templates"),
      p(
        "Beyond statistics, many detectors watch for phrases that models overuse: 'it is important to note,' 'in today's fast-paced world,' 'delve into,' 'a testament to,' and dozens more. A high density of these template phrases is a strong secondary signal."
      ),
      h2("Why no detector is ever 100% sure"),
      p(
        "Here is the uncomfortable truth every honest tool should tell you: detection is probabilistic, not proof. A skilled human writing in a formal, uniform style can score as AI. An AI draft that a person heavily edited can score as human. Non-native English writers are disproportionately flagged as AI because their sentence patterns can look statistically 'smooth.'"
      ),
      p(
        "That is why you should treat any AI score as one signal among many, never as a verdict. Use it to start a conversation, not to end one."
      ),
      tryIt,
    ],
  },
  {
    slug: "is-my-essay-flagged-as-ai",
    title: "Why Is My Essay Being Flagged as AI (When I Wrote It Myself)?",
    description:
      "Human writing gets falsely flagged as AI more often than people realize. Here are the real reasons it happens and concrete ways to write so your genuine work reads as human.",
    category: "students",
    date: "2025-02-03",
    updated: "2025-05-20",
    readingMinutes: 7,
    keywords: ["essay flagged as ai", "false positive ai detector", "ai detector wrong"],
    body: [
      p(
        "It is one of the most stressful messages a student can get: your professor ran your essay through a detector and it came back 'likely AI.' You wrote every word. So what happened?"
      ),
      h2("False positives are real and common"),
      p(
        "AI detectors do not read minds — they read patterns. If your genuine writing happens to share statistical traits with AI output, it gets flagged. This is a known, documented limitation of every detector on the market."
      ),
      h2("The most common reasons human work gets flagged"),
      ul([
        "Very uniform sentence length — clear, consistent sentences read as 'smooth' to a detector.",
        "Formal, template-like structure — five-paragraph essays with predictable transitions look machine-made.",
        "Heavy use of common academic phrases like 'in conclusion' or 'this demonstrates that.'",
        "Being a non-native English speaker — studies show these writers are flagged far more often.",
        "Short samples — under 150 words, detectors are essentially guessing.",
      ]),
      h2("How to write so your work reads as human"),
      p(
        "You should never distort your natural voice just to please an algorithm. But if you want to reduce false flags, vary your sentence rhythm, include a specific personal example or concrete detail only you would know, and avoid leaning on stock transition phrases."
      ),
      h2("What to do if you are wrongly accused"),
      p(
        "Keep your drafts and version history — a document's edit timeline is the single strongest piece of evidence you wrote it yourself. Ask your instructor to look at the detector's confidence level, not just a binary label, and point them to research on false positives."
      ),
      tryIt,
    ],
  },
  {
    slug: "ai-detector-accuracy",
    title: "How Accurate Are AI Detectors, Really?",
    description:
      "An honest look at AI detector accuracy: what the studies say, where detectors fail, and how to interpret a score responsibly instead of treating it as proof.",
    category: "guides",
    date: "2025-01-28",
    updated: "2025-06-10",
    readingMinutes: 6,
    keywords: ["ai detector accuracy", "are ai detectors accurate", "ai detection reliability"],
    body: [
      p(
        "Every AI detector wants you to believe it is highly accurate. The reality is more nuanced, and understanding it will make you a far smarter user of these tools."
      ),
      h2("Accuracy depends entirely on the text"),
      p(
        "Detectors perform best on long, unedited, single-source text — for example, an essay pasted straight out of ChatGPT with no changes. On that kind of input, good detectors are genuinely strong. Performance falls off a cliff for short text, mixed human-AI text, paraphrased AI, and formal human writing."
      ),
      h2("The two kinds of errors"),
      ul([
        "False positives: human writing flagged as AI. These are the ones that ruin trust and unfairly harm students.",
        "False negatives: AI writing that slips through as human, especially after light editing or paraphrasing.",
      ]),
      h2("Why you should never rely on a single number"),
      p(
        "A responsible detector gives you a probability and the reasoning behind it, not a courtroom verdict. If a tool claims 99% certainty with no explanation, be skeptical. The technology simply does not support that level of confidence on arbitrary text."
      ),
      tryIt,
    ],
  },
  {
    slug: "detect-chatgpt-writing",
    title: "How to Tell if Something Was Written by ChatGPT",
    description:
      "The tells that give away ChatGPT-generated text — from signature phrases to structural habits — plus how to verify your hunch with a detector.",
    category: "guides",
    date: "2025-02-18",
    updated: "2025-05-30",
    readingMinutes: 6,
    keywords: ["detect chatgpt", "is this written by chatgpt", "chatgpt tells"],
    body: [
      p(
        "You can often spot ChatGPT writing before you ever run it through a tool. Once you know the tells, they are hard to unsee."
      ),
      h2("Signature phrases"),
      p(
        "ChatGPT has favorite words. 'Delve,' 'tapestry,' 'testament,' 'navigate the complexities,' 'in today's ever-evolving landscape.' A cluster of these in one short piece is a strong hint."
      ),
      h2("Structural habits"),
      ul([
        "Balanced, symmetrical paragraphs of nearly equal length.",
        "A tidy 'On one hand… on the other hand… in conclusion' arc.",
        "Lists where every item is padded to the same length.",
        "A closing paragraph that restates everything already said.",
      ]),
      h2("The confidence problem"),
      p(
        "ChatGPT rarely says 'I don't know.' Human experts hedge, digress, and admit uncertainty. Text that is relentlessly confident and evenly polished, with no rough edges, often came from a model."
      ),
      tryIt,
    ],
  },
  {
    slug: "ai-detector-for-teachers",
    title: "A Teacher's Guide to Using AI Detectors Fairly",
    description:
      "How educators can use AI detection as a starting point for conversation — not as evidence — and build assignments that make AI misuse less tempting in the first place.",
    category: "teachers",
    date: "2025-03-05",
    updated: "2025-06-01",
    readingMinutes: 7,
    keywords: ["ai detector for teachers", "ai in the classroom", "academic integrity ai"],
    body: [
      p(
        "AI detectors put teachers in a hard spot. You want to uphold integrity without falsely accusing a student. Here is a fair, defensible way to use them."
      ),
      h2("Treat the score as a prompt, not a proof"),
      p(
        "A high AI score is a reason to have a conversation, never grounds for an automatic penalty. Ask the student to walk you through their drafting process. Genuine authors can almost always explain their choices."
      ),
      h2("Design assignments that resist AI"),
      ul([
        "Require references to specific in-class discussions or local context.",
        "Ask for a short reflection on how the student's thinking changed.",
        "Collect drafts and outlines, not just the final piece.",
        "Use oral check-ins for high-stakes work.",
      ]),
      h2("Protect vulnerable students"),
      p(
        "Non-native English speakers and neurodivergent students are flagged as AI at higher rates. A detector-first policy quietly punishes them. Build your process so a single algorithm can never be the deciding voice."
      ),
      tryIt,
    ],
  },
  {
    slug: "humanize-ai-text-ethically",
    title: "Editing AI Drafts Into Genuine Human Writing",
    description:
      "There is a big difference between gaming a detector and doing real editing. This guide covers how to turn an AI draft into work that is genuinely yours.",
    category: "writers",
    date: "2025-03-19",
    updated: "2025-05-25",
    readingMinutes: 6,
    keywords: ["humanize ai text", "edit ai writing", "ai draft editing"],
    body: [
      p(
        "Using AI to draft and then editing heavily is legitimate in many contexts. 'Humanizing' by tricking a detector while keeping soulless content is not the same thing. This guide is about the former."
      ),
      h2("Add what only you can add"),
      p(
        "AI cannot supply your specific experience. Insert a real anecdote, a number you looked up, an opinion you actually hold. That single move does more for authenticity than any phrase-swapping trick."
      ),
      h2("Break the rhythm"),
      p(
        "Read your draft aloud. Where every sentence lands with the same beat, rewrite. Combine two sentences. Cut one to three words. Start with a fragment. Human rhythm is uneven on purpose."
      ),
      h2("Kill the template phrases"),
      p(
        "Search your draft for 'it is important to note,' 'in conclusion,' 'furthermore,' and 'delve.' Replace or delete. These are the fingerprints editors and detectors both notice first."
      ),
      tryIt,
    ],
  },
  {
    slug: "free-vs-paid-ai-detectors",
    title: "Free vs. Paid AI Detectors: What Actually Differs?",
    description:
      "Do paid AI detectors really outperform free ones? A breakdown of what you pay for, what you don't need, and when a free in-browser tool is more than enough.",
    category: "compare",
    date: "2025-04-02",
    updated: "2025-06-08",
    readingMinutes: 6,
    keywords: ["free ai detector", "paid ai detector", "best ai detector"],
    body: [
      p(
        "Paid detectors market themselves as dramatically more accurate. Sometimes there is a real difference; often you are paying for dashboards and volume, not fundamentally better detection."
      ),
      h2("What paid tiers usually add"),
      ul([
        "Bulk and API access for scanning many documents at once.",
        "Team dashboards, reports, and LMS integrations.",
        "Sometimes a larger or more frequently updated model.",
      ]),
      h2("What free tools do well"),
      p(
        "For a quick gut check on a single passage, a good free detector that shows its reasoning is genuinely useful — and one that runs in your browser has a real privacy advantage, since your text never leaves your device."
      ),
      h2("The honest bottom line"),
      p(
        "No detector, free or paid, should be trusted as proof. Given that, the smart move is to use a transparent free tool for everyday checks and reserve paid tools for the rare case you need scale."
      ),
      tryIt,
    ],
  },
  {
    slug: "ai-detection-non-native-speakers",
    title: "Why AI Detectors Unfairly Flag Non-Native English Writers",
    description:
      "Research shows AI detectors flag non-native English speakers far more often than native writers. Here is why it happens and what to do about it.",
    category: "guides",
    date: "2025-04-16",
    updated: "2025-06-04",
    readingMinutes: 6,
    keywords: ["ai detector non-native", "esl ai detection bias", "ai detector bias"],
    body: [
      p(
        "A widely cited Stanford study found that AI detectors flagged the writing of non-native English speakers as AI-generated more than half the time, while rarely flagging native writers. This is one of the most important limitations to understand."
      ),
      h2("Why it happens"),
      p(
        "Non-native writers often use a more limited, common vocabulary and more uniform sentence structures — exactly the statistical traits detectors associate with AI. The tool cannot tell 'careful second-language writing' from 'machine output.' The math looks similar."
      ),
      h2("The real-world harm"),
      p(
        "When institutions use detectors as evidence, this bias translates into disproportionate accusations against international students and ESL writers. It is a fairness problem, not just a technical one."
      ),
      h2("What responsible use looks like"),
      p(
        "Never treat a detector score as decisive for these writers. Weight drafting evidence, conversation, and context far more heavily than any algorithm."
      ),
      tryIt,
    ],
  },
  {
    slug: "burstiness-and-perplexity-explained",
    title: "Burstiness and Perplexity, Explained Without the Math",
    description:
      "The two concepts at the heart of AI detection, explained with everyday analogies anyone can follow — no statistics background required.",
    category: "guides",
    date: "2025-05-01",
    updated: "2025-06-11",
    readingMinutes: 5,
    keywords: ["burstiness", "perplexity explained", "ai detection metrics"],
    body: [
      p(
        "If you have read anything about AI detection, you have hit two words over and over: perplexity and burstiness. Here they are in plain language."
      ),
      h2("Perplexity is surprise"),
      p(
        "Imagine reading a sentence and trying to guess each next word. If you can guess almost every word, the text has low perplexity — it is predictable. AI writing is engineered to be predictable, so it tends to score low. Human writing surprises you more."
      ),
      h2("Burstiness is rhythm"),
      p(
        "Now listen to the beat of the writing. Human authors mix long and short sentences. Some paragraphs sprint, others sprawl. That variation is burstiness. AI writing, unedited, tends to be metronome-steady — and that steadiness reads as artificial."
      ),
      h2("Put them together"),
      p(
        "Predictable words plus even rhythm equals a high AI score. Surprising words plus uneven rhythm equals a human-leaning score. Almost everything else in detection is a refinement of these two ideas."
      ),
      tryIt,
    ],
  },
  {
    slug: "ai-detector-for-recruiters",
    title: "Should Recruiters Use AI Detectors on Cover Letters?",
    description:
      "AI-written applications are everywhere. Here is a measured take on whether recruiters should screen for AI, and how to do it without unfairly rejecting good candidates.",
    category: "guides",
    date: "2025-05-14",
    updated: "2025-06-09",
    readingMinutes: 6,
    keywords: ["ai detector cover letter", "ai in hiring", "detect ai application"],
    body: [
      p(
        "Recruiters are drowning in AI-generated cover letters. It is tempting to auto-reject anything a detector flags. That would be a mistake."
      ),
      h2("Using AI to apply is not automatically disqualifying"),
      p(
        "Plenty of strong candidates use AI to polish grammar or overcome a blank page, then add genuine substance. Punishing the tool rather than the content filters out good people."
      ),
      h2("What actually matters"),
      p(
        "Judge specificity, not smoothness. A generic, flawless letter that could apply to any company is a worse sign than a slightly rough one full of concrete detail about your role and team."
      ),
      h2("If you screen, screen fairly"),
      p(
        "Use detection as one weak signal, disclose that you use it, and never let it be the sole reason for rejection. The false-positive risk is too high to do otherwise."
      ),
      tryIt,
    ],
  },
  {
    slug: "can-ai-detectors-be-fooled",
    title: "Can AI Detectors Be Fooled? Yes — and Here's Why That Matters",
    description:
      "Paraphrasers, humanizers, and simple edits can slip AI text past detectors. Understanding these limits is key to not over-trusting any score.",
    category: "guides",
    date: "2025-05-28",
    updated: "2025-06-12",
    readingMinutes: 5,
    keywords: ["fool ai detector", "bypass ai detector", "ai detector limitations"],
    body: [
      p(
        "An entire cottage industry exists to defeat AI detectors. The fact that it works so easily tells you something important about how much weight a score deserves."
      ),
      h2("How detectors get fooled"),
      ul([
        "Paraphrasing tools rewrite AI text to raise its perplexity.",
        "Light manual editing breaks the uniform rhythm detectors look for.",
        "Mixing human and AI sentences muddies every signal.",
        "Asking the model to 'write with varied sentence length' changes its output profile.",
      ]),
      h2("The takeaway"),
      p(
        "If a determined person can slip AI text past a detector in minutes, then a low AI score cannot prove text is human, and a high score cannot prove it is AI. Detection is a hint, not a lie detector."
      ),
      tryIt,
    ],
  },
  {
    slug: "ai-detector-privacy",
    title: "Is It Safe to Paste Your Text Into an AI Detector?",
    description:
      "Many detectors upload and store everything you paste. Here is what to check before you hand over sensitive or unpublished writing — and why in-browser tools are safer.",
    category: "guides",
    date: "2025-06-03",
    updated: "2025-06-13",
    readingMinutes: 5,
    keywords: ["ai detector privacy", "is ai detector safe", "private ai detector"],
    body: [
      p(
        "Before you paste a confidential draft, an unpublished manuscript, or a student's private essay into a detector, ask one question: where does that text go?"
      ),
      h2("The default is usually upload"),
      p(
        "Most online detectors send your text to a server, where it may be logged, stored, or used to improve their models. For sensitive material, that is a real risk."
      ),
      h2("Why in-browser detection is different"),
      p(
        "A detector that runs its analysis locally in your browser never transmits your text anywhere. The words stay on your device. That is the approach we take — nothing you paste leaves your computer."
      ),
      h2("What to check on any tool"),
      ul([
        "Does the privacy policy say your text is stored or used for training?",
        "Is analysis done locally or on a server?",
        "Can you delete your data, and is retention time stated?",
      ]),
      tryIt,
    ],
  },
  {
    slug: "ai-detection-in-academic-publishing",
    title: "AI Detection in Academic and Scientific Publishing",
    description:
      "Journals are grappling with AI-written submissions. How detection fits into peer review, disclosure policies, and the future of scholarly integrity.",
    category: "teachers",
    date: "2025-06-06",
    updated: "2025-06-14",
    readingMinutes: 6,
    keywords: ["ai detection publishing", "ai in research papers", "journal ai policy"],
    body: [
      p(
        "Scholarly publishing faces a wave of AI-assisted and AI-generated manuscripts. Editors need a policy that is realistic about what detection can and cannot do."
      ),
      h2("Disclosure beats detection"),
      p(
        "The emerging consensus is that authors should disclose AI use rather than editors trying to catch it. Detection is unreliable on the polished, heavily-revised prose typical of academic writing."
      ),
      h2("Where detection still helps"),
      p(
        "Detectors can flag suspiciously uniform text for a closer human look, especially in fabricated or low-effort submissions. As a triage signal it has value; as a gatekeeper it does not."
      ),
      tryIt,
    ],
  },
  {
    slug: "chatgpt-vs-human-writing",
    title: "ChatGPT vs. Human Writing: 7 Differences That Still Give It Away",
    description:
      "Even good AI writing carries habits that human writing rarely does. Seven concrete, checkable differences between the two.",
    category: "compare",
    date: "2025-06-10",
    updated: "2025-06-15",
    readingMinutes: 6,
    keywords: ["chatgpt vs human", "ai vs human writing", "human writing traits"],
    body: [
      p(
        "AI writing keeps improving, but it still leans on habits that most human writers don't share. Here are seven you can check for yourself."
      ),
      h2("The seven tells"),
      ul([
        "Uniform sentence length instead of a varied rhythm.",
        "Overuse of transition words like 'furthermore' and 'moreover.'",
        "A conclusion that only restates the introduction.",
        "Vague authority with no specific, checkable detail.",
        "Perfect grammar with zero personal voice.",
        "Signature vocabulary: delve, tapestry, testament, landscape.",
        "Relentless confidence with no hedging or uncertainty.",
      ]),
      p(
        "None of these is proof on its own. Together, in a short piece, they paint a strong picture."
      ),
      tryIt,
    ],
  },
  {
    slug: "how-to-cite-ai-in-your-work",
    title: "How to Cite and Disclose AI Use in Your Writing",
    description:
      "Using AI is fine in many settings — hiding it is the problem. Practical guidance on disclosing and citing AI assistance honestly.",
    category: "students",
    date: "2025-06-12",
    updated: "2025-06-16",
    readingMinutes: 5,
    keywords: ["cite ai", "disclose ai use", "ai citation"],
    body: [
      p(
        "The safest way to avoid an AI-detection dispute is not to beat the detector — it is to be transparent about how you used AI in the first place."
      ),
      h2("When to disclose"),
      p(
        "If AI shaped your ideas, structure, or wording in a meaningful way, and your context expects original work, disclose it. A one-line note about how you used the tool prevents most misunderstandings."
      ),
      h2("How to cite it"),
      p(
        "Major style guides now offer AI citation formats. In general, name the tool, the version, the date, and the nature of the prompt. Check whether your institution or publisher has a specific required format."
      ),
      tryIt,
    ],
  },
  {
    slug: "ai-detector-word-count-matters",
    title: "Why AI Detectors Need Enough Text to Work",
    description:
      "Short samples produce unreliable AI scores. Here is how much text detectors really need and why length changes everything.",
    category: "guides",
    date: "2025-06-14",
    updated: "2025-06-17",
    readingMinutes: 4,
    keywords: ["ai detector word count", "minimum text ai detection", "short text ai detector"],
    body: [
      p(
        "One of the biggest sources of bad AI scores is simply not giving the detector enough to work with."
      ),
      h2("Statistics need sample size"),
      p(
        "Perplexity and burstiness are statistical measures. On 30 words, there is not enough signal to separate human from AI reliably — the result is close to a coin flip. Give a detector at least 100–150 words, and ideally 300+, for a meaningful read."
      ),
      h2("What this means in practice"),
      p(
        "Never judge a headline, a single sentence, or a short comment with a detector. If all you have is a short passage, treat the score as barely more than a guess."
      ),
      tryIt,
    ],
  },
  {
    slug: "ai-writing-and-seo",
    title: "Does AI-Written Content Hurt Your SEO?",
    description:
      "Google's actual stance on AI content, what 'helpful content' really means, and how detection fits into a healthy content strategy.",
    category: "writers",
    date: "2025-06-16",
    updated: "2025-06-18",
    readingMinutes: 6,
    keywords: ["ai content seo", "google ai content", "ai writing ranking"],
    body: [
      p(
        "A common myth says Google bans AI content. The reality is more specific, and understanding it will save you a lot of wasted worry."
      ),
      h2("Google rewards helpfulness, not authorship"),
      p(
        "Google has said its focus is content quality and helpfulness, regardless of how it was produced. Thin, unoriginal AI content ranks poorly — but so does thin human content. The problem is thinness, not the tool."
      ),
      h2("Where detection fits"),
      p(
        "Running your own content through a detector can be a useful editing prompt: if it reads as obviously machine-made, it probably also reads as generic to a human. Use that as a nudge to add originality, not as a compliance check."
      ),
      tryIt,
    ],
  },
  {
    slug: "student-guide-avoiding-false-ai-flags",
    title: "A Student's Guide to Avoiding False AI Flags",
    description:
      "Practical, honest steps students can take to protect themselves from wrongful AI accusations without changing who they are as writers.",
    category: "students",
    date: "2025-06-18",
    updated: "2025-06-19",
    readingMinutes: 6,
    keywords: ["student ai flag", "avoid ai accusation", "prove i wrote my essay"],
    body: [
      p(
        "You should not have to defend work you actually wrote. But since detectors are imperfect, a little preparation protects you if a false flag ever comes up."
      ),
      h2("Keep your process visible"),
      ul([
        "Write in a tool that saves version history, like Google Docs.",
        "Keep your outlines, notes, and rough drafts.",
        "Save research links and sources as you go.",
      ]),
      h2("Write in your own voice"),
      p(
        "The best long-term protection is a distinctive voice. Specific examples, a personal angle, and natural sentence variation all read as unmistakably human — and make your work better anyway."
      ),
      h2("If you are accused"),
      p(
        "Stay calm, share your drafting evidence, and ask that the detector's limitations and false-positive rate be considered. You have more standing than you might think."
      ),
      tryIt,
    ],
  },
  {
    slug: "ai-detectors-vs-plagiarism-checkers",
    title: "AI Detectors vs. Plagiarism Checkers: What's the Difference?",
    description:
      "They sound similar but answer completely different questions. Here is how AI detection and plagiarism checking actually differ.",
    category: "compare",
    date: "2025-06-19",
    updated: "2025-06-20",
    readingMinutes: 5,
    keywords: ["ai detector vs plagiarism", "plagiarism checker difference", "originality check"],
    body: [
      p(
        "People often lump AI detectors and plagiarism checkers together. They are fundamentally different tools answering different questions."
      ),
      h2("Plagiarism checkers ask: has this been published before?"),
      p(
        "A plagiarism checker compares your text against a database of existing sources and flags matching passages. It is about copying, and it can point to an exact source."
      ),
      h2("AI detectors ask: does this read like a machine wrote it?"),
      p(
        "An AI detector makes no comparison to any source. It analyzes statistical patterns to estimate the probability that a model generated the text. There is no 'source' to point to — only a probability."
      ),
      h2("Why the distinction matters"),
      p(
        "Plagiarism detection can be evidence. AI detection is an inference. Treating an AI score with the same certainty as a plagiarism match is a category error that leads to unfair outcomes."
      ),
      tryIt,
    ],
  },
];

export function getAllPosts() {
  return [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug) {
  return POSTS.find((post) => post.slug === slug) || null;
}

export function getPostsByCategory(category) {
  return getAllPosts().filter((post) => post.category === category);
}
