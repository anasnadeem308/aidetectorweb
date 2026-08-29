// AI Detector Pro — Zero-cost heuristic analysis engine.
// Pure functions, no network, no storage. Runs entirely client-side.

const AI_TRIGGER_PHRASES = [
  "delve",
  "testament",
  "furthermore",
  "moreover",
  "in conclusion",
  "it is important to note",
  "tapestry",
  "beacon",
  "paramount",
  "crucial role",
  "it is worth noting",
  "navigating the",
  "in the realm of",
  "plays a pivotal role",
  "underscores the",
  "intricate",
  "nuanced",
  "landscape",
  "in today's fast-paced",
  "leverage",
  "harness the power",
  "unlock the potential",
  "it's important to recognize",
  "a myriad of",
  "a wealth of",
];

// Multiplier applied to trigger density when scoring.
const TRIGGER_WEIGHT = 9;
// Per-sentence trigger penalty.
const TRIGGER_SENTENCE_WEIGHT = 5;
// Burstiness reference (AI text tends toward low sentence-length variance).
const BURSTINESS_HUMAN_REF = 4.2;

/**
 * Split text into sentences using a lightweight boundary heuristic.
 * Handles abbreviations crudely by ignoring single-letter/short fragments.
 * @param {string} text
 * @returns {string[]}
 */
function splitSentences(text) {
  if (!text) return [];
  const raw = text
    .replace(/([.!?]+)\s+/g, "$1\n")
    .replace(/\n+/g, "\n")
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  return raw.filter((s) => s.split(/\s+/).length >= 2 || s.length > 8);
}

/**
 * Tokenize into lowercased word tokens (strips punctuation).
 * @param {string} text
 * @returns {string[]}
 */
function tokenize(text) {
  if (!text) return [];
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s'-]/g, " ")
    .split(/\s+/)
    .map((t) => t.replace(/^['-]+|['-]+$/g, ""))
    .filter((t) => t.length > 0);
}

/**
 * Standard deviation of a numeric array (population stdev).
 * @param {number[]} arr
 * @returns {number}
 */
function stdev(arr) {
  if (!arr.length) return 0;
  const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
  const variance =
    arr.reduce((acc, v) => acc + (v - mean) ** 2, 0) / arr.length;
  return Math.sqrt(variance);
}

/**
 * Count trigger-phrase occurrences (case-insensitive, whole-phrase match).
 * @param {string} lowerText
 * @returns {{count: number, matched: string[]}}
 */
function countTriggers(lowerText) {
  let count = 0;
  const matched = [];
  for (const phrase of AI_TRIGGER_PHRASES) {
    const re = new RegExp(`\\b${phrase.replace(/'/g, "['\u2019]")}\\b`, "g");
    const m = lowerText.match(re);
    if (m && m.length > 0) {
      count += m.length;
      matched.push(phrase);
    }
  }
  return { count, matched };
}

/**
 * Clamp a value into [min, max].
 * @param {number} v
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

/**
 * Analyze a block of text and return an AI-vs-human probability breakdown.
 *
 * Signals combined:
 *   - Burstiness: stddev of per-sentence word counts. Low variance => more AI-like.
 *   - AI trigger-word density: weighted trigger hits per 100 words.
 *   - Type-Token Ratio (TTR): unique / total words. AI text often skews narrow.
 *
 * @param {string} text
 * @returns {{
 *   aiProbability: number,
 *   humanProbability: number,
 *   burstiness: number,
 *   triggerCount: number,
 *   matchedTriggers: string[],
 *   wordCount: number,
 *   sentenceCount: number,
 *   ttr: number,
 *   triggerDensity: number,
 *   scoreLabel: string,
 *   ready: boolean,
 * }}
 */
export function analyzeText(text) {
  const trimmed = (text || "").trim();
  const tokens = tokenize(trimmed);
  const wordCount = tokens.length;
  const lowerText = trimmed.toLowerCase();

  // Not enough text to produce a meaningful signal.
  if (wordCount < 12) {
    return {
      aiProbability: 0,
      humanProbability: 0,
      burstiness: 0,
      triggerCount: 0,
      matchedTriggers: [],
      wordCount,
      sentenceCount: 0,
      ttr: 0,
      triggerDensity: 0,
      scoreLabel: "Add more text",
      ready: false,
    };
  }

  const sentences = splitSentences(trimmed);
  const sentenceCount = Math.max(sentences.length, 1);
  const sentenceLengths = sentences.map((s) => tokenize(s).length || 1);
  const burstiness = stdev(sentenceLengths);

  // Type-token ratio with a small-length normalization.
  const uniqueWords = new Set(tokens).size;
  const ttr = uniqueWords / wordCount;

  const { count: triggerCount, matched: matchedTriggers } =
    countTriggers(lowerText);
  const triggerDensity = (triggerCount / wordCount) * 100;

  // --- Scoring (each signal contributes a 0..1 sub-score) ---

  // Burstiness: human reference ~4.2. Lower burstiness => higher AI score.
  const burstinessScore = clamp(1 - burstiness / BURSTINESS_HUMAN_REF, 0, 1);

  // Trigger density: 0 => 0, >=2.5 triggers/100 words => saturated AI signal.
  const triggerScore = clamp(triggerDensity * TRIGGER_WEIGHT, 0, 1);

  // TTR: very low (<0.35) or very high (>0.85) narrow vocab both lean AI.
  // Human prose typically sits in the 0.45–0.75 band.
  let ttrScore;
  if (ttr < 0.35) ttrScore = clamp((0.35 - ttr) / 0.35, 0, 1) * 0.6 + 0.4;
  else if (ttr > 0.85) ttrScore = clamp((ttr - 0.85) / 0.15, 0, 1) * 0.5 + 0.3;
  else ttrScore = clamp(Math.abs(ttr - 0.6) / 0.25, 0, 1) * 0.4;
  ttrScore = clamp(ttrScore, 0, 1);

  // Per-sentence trigger penalty: many short AI sentences with triggers.
  const triggerPerSentence =
    (triggerCount / sentenceCount) * TRIGGER_SENTENCE_WEIGHT;
  const sentencePenalty = clamp(triggerPerSentence, 0, 1);

  // Weighted blend. Burstiness is the strongest single signal.
  const aiScore = clamp(
    burstinessScore * 0.42 +
      triggerScore * 0.28 +
      ttrScore * 0.15 +
      sentencePenalty * 0.15,
    0,
    1
  );

  const aiProbability = Math.round(aiScore * 100);
  const humanProbability = 100 - aiProbability;

  let scoreLabel = "Likely Human";
  if (aiProbability >= 75) scoreLabel = "Likely AI";
  else if (aiProbability >= 50) scoreLabel = "Mixed Signals";
  else if (aiProbability >= 25) scoreLabel = "Probably Human";

  const explanation = buildExplanation({
    aiProbability,
    burstiness,
    triggerCount,
    ttr,
    triggerDensity,
  });

  return {
    aiProbability,
    humanProbability,
    burstiness: Number(burstiness.toFixed(2)),
    triggerCount,
    matchedTriggers,
    wordCount,
    sentenceCount,
    ttr: Number(ttr.toFixed(3)),
    triggerDensity: Number(triggerDensity.toFixed(2)),
    scoreLabel,
    explanation,
    ready: true,
  };
}

/**
 * Turn raw signals into plain-language reasoning an average reader can follow.
 * @returns {{ summary: string, points: string[] }}
 */
function buildExplanation({ aiProbability, burstiness, triggerCount, ttr, triggerDensity }) {
  const points = [];

  // Burstiness in plain words.
  if (burstiness < 2.5) {
    points.push(
      "Sentence lengths are very even. Human writing usually mixes short and long sentences, so unusually uniform pacing leans AI."
    );
  } else if (burstiness < 4.2) {
    points.push(
      "Sentence lengths vary a moderate amount — a mild human signal, but not a strong one."
    );
  } else {
    points.push(
      "Sentence lengths vary a lot, jumping between short and long. That unevenness is typical of human writing."
    );
  }

  // Trigger phrases in plain words.
  if (triggerCount >= 3) {
    points.push(
      `We found ${triggerCount} phrases that AI models tend to overuse (roughly ${triggerDensity} per 100 words). Heavy use of these template phrases is a strong AI signal.`
    );
  } else if (triggerCount >= 1) {
    points.push(
      `We found ${triggerCount} AI-favored phrase${triggerCount === 1 ? "" : "s"}. A few can appear in human writing too, so this is only a light signal.`
    );
  } else {
    points.push(
      "No AI-favored template phrases were detected, which slightly supports human authorship."
    );
  }

  // Vocabulary variety in plain words.
  if (ttr < 0.35) {
    points.push(
      "The vocabulary is quite repetitive, reusing the same words often. Narrow word variety can indicate machine-generated text."
    );
  } else if (ttr > 0.85) {
    points.push(
      "The vocabulary is unusually varied for the length, which can also read as artificial in short samples."
    );
  } else {
    points.push(
      "Vocabulary variety sits in the natural human range — neither too repetitive nor artificially diverse."
    );
  }

  let summary;
  if (aiProbability >= 75) {
    summary =
      "Multiple signals point toward AI-generated text. The writing is statistically smooth and template-like, though a heavily edited AI draft or very formal human writing can look the same.";
  } else if (aiProbability >= 50) {
    summary =
      "The signals are mixed. This text has some AI-like traits and some human ones — common in AI drafts that a person edited, or in formal human writing.";
  } else if (aiProbability >= 25) {
    summary =
      "Most signals lean human, with a few patterns worth a second look. Overall this reads more like human writing than machine output.";
  } else {
    summary =
      "The signals strongly favor human authorship: uneven pacing, natural vocabulary, and few template phrases.";
  }

  return { summary, points };
}

export { AI_TRIGGER_PHRASES };
