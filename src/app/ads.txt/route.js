import { SITE } from "../../lib/site";

// Google AdSense requires an ads.txt authorizing your publisher account.
// It is generated from your publisher ID so it's correct the moment the
// NEXT_PUBLIC_ADSENSE_PUBLISHER_ID env var is set (e.g. "ca-pub-1234567890123456").
export const dynamic = "force-static";

export function GET() {
  const pubId = SITE.adsensePublisherId; // e.g. "ca-pub-1234567890123456"
  const numericId = pubId ? pubId.replace(/^ca-pub-/, "") : "";

  const body = numericId
    ? `google.com, pub-${numericId}, DIRECT, f08c47fec0942fa0\n`
    : "# Add your AdSense publisher ID (NEXT_PUBLIC_ADSENSE_PUBLISHER_ID) to authorize sellers.\n";

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
