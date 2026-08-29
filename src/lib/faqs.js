// Single source of truth for homepage FAQs. Used by both the visible
// accordion and the FAQPage JSON-LD so they never drift apart.

export const FAQS = [
  {
    q: "Is AI Detector Pro really free to use?",
    a: "Yes. The detector runs entirely in your browser using lightweight statistical heuristics. There is no sign-up, no account, no API cost, and no usage limit. We keep the tool free by showing ads on some pages.",
  },
  {
    q: "Does AI Detector Pro store or send my text anywhere?",
    a: "No. All analysis happens client-side in your own browser. The text you paste never leaves your device, is never uploaded to a server, and is never logged or stored. When you refresh or close the page, it is gone.",
  },
  {
    q: "How does the AI detection actually work?",
    a: "We combine three signals: burstiness (how much sentence length varies), AI trigger-phrase density (words and phrases that language models overuse, such as 'delve', 'furthermore', and 'tapestry'), and type-token ratio (vocabulary variety). Human writing tends to be uneven and bursty, while AI text is often smoother and more uniform.",
  },
  {
    q: "Can the tool prove a piece of text was written by AI?",
    a: "No detector can prove authorship with certainty, and any tool that claims otherwise is overselling. Our score is a probability estimate that highlights statistical patterns common in AI writing. Treat it as one signal among many, especially for academic or professional decisions.",
  },
  {
    q: "What is the minimum text length for a reliable result?",
    a: "We recommend at least 50 words, and 200 or more words gives the most stable reading. The tool needs a minimum of about 12 words to run, and it will prompt you to add more if the sample is too short to analyze meaningfully.",
  },
  {
    q: "Does it detect ChatGPT, GPT-4o, Gemini, and Claude?",
    a: "The heuristics are model-agnostic. Instead of fingerprinting one specific model, they target general patterns found across large language models, so they respond to text from ChatGPT, GPT-4o, Gemini, Claude, and similar tools. Accuracy varies with the model and how heavily the text was edited.",
  },
  {
    q: "Why did my clearly human writing get flagged as AI?",
    a: "Highly polished, formal, or formulaic human writing (think corporate reports or textbook prose) can share statistical traits with AI text: even sentence lengths and repeated connective phrases. That is why the result is an estimate, not a verdict. Read the plain-language explanation to see which signals drove the score.",
  },
  {
    q: "Can I use this to check student essays or academic work?",
    a: "You can use it as a first-pass screening signal, but never as sole proof of misconduct. False positives are real and can seriously harm a student. Combine the score with your own judgment, a conversation with the writer, and other evidence such as draft history.",
  },
];
