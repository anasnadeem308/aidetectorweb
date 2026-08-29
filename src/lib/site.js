// Central site configuration. Single source of truth for URLs, branding,
// and metadata used across SEO, JSON-LD structured data, and UI.

export const SITE = {
  name: "AI Detector Pro",
  shortName: "AI Detector Pro",
  // Current live deployment. Update here if the domain ever changes.
  url: "https://aidetectorweb.vercel.app",
  description:
    "A free, privacy-first AI content detector. Paste any text to estimate whether it was written by a human or an AI model — analyzed entirely in your browser, with nothing stored.",
  tagline: "Free AI content detector",
  author: "The AI Detector Pro Team",
  email: "support@aidetectorweb.app",
  locale: "en_US",
  twitter: "@aidetectorpro",
  // AdSense publisher ID — filled in once the user provides it.
  // Format: "ca-pub-XXXXXXXXXXXXXXXX". Leave empty to keep ads disabled.
  adsensePublisherId: "",
};

export function absoluteUrl(path = "") {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${clean === "/" ? "" : clean}`;
}
