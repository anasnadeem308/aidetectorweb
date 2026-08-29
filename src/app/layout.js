import "./globals.css";

export const metadata = {
  title: "AI Detector Pro — Free AI Content Checker & GPT Detector",
  description:
    "AI Detector Pro is a free, privacy-first AI content detector. Analyze burstiness, trigger-word density, and type-token ratio instantly — no sign-up, no data storage.",
  keywords: [
    "AI detector",
    "AI content detector",
    "GPT detector",
    "ChatGPT detector",
    "burstiness",
    "perplexity",
    "AI writing checker",
    "free AI checker",
  ],
  metadataBase: new URL("https://ai-detector-pro.example.com"),
  openGraph: {
    title: "AI Detector Pro — Free AI Content Checker",
    description:
      "Detect AI-generated text instantly with burstiness, trigger-word density, and type-token ratio heuristics. Zero data stored.",
    type: "website",
    siteName: "AI Detector Pro",
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#0b0f19",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <div className="aurora-bg" aria-hidden="true">
          <div
            className="aurora-blob"
            style={{
              width: "520px",
              height: "520px",
              top: "-120px",
              left: "-80px",
              background: "#3b82f6",
            }}
          />
          <div
            className="aurora-blob"
            style={{
              width: "480px",
              height: "480px",
              top: "30%",
              right: "-100px",
              background: "#a855f7",
            }}
          />
          <div
            className="aurora-blob"
            style={{
              width: "420px",
              height: "420px",
              bottom: "-120px",
              left: "40%",
              background: "#22d3ee",
            }}
          />
        </div>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
