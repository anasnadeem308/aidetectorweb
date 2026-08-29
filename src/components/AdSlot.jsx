"use client";

import { useEffect, useRef } from "react";
import { SITE } from "../lib/site";

/**
 * Google AdSense display unit.
 *
 * Renders a real <ins class="adsbygoogle"> ONLY when a publisher ID is
 * configured in src/lib/site.js. Until then it renders nothing at all — no
 * visible placeholder text, which keeps the site clean for AdSense review.
 *
 * @param {Object} props
 * @param {string} props.slot   - AdSense ad-unit slot id.
 * @param {"leaderboard"|"rectangle"|"skyscraper"} [props.format]
 * @param {string} [props.className]
 */
export default function AdSlot({ slot = "", format = "leaderboard", className = "" }) {
  const pushed = useRef(false);
  const publisherId = SITE.adsensePublisherId;

  useEffect(() => {
    if (!publisherId || pushed.current) return;
    try {
      // eslint-disable-next-line no-undef
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense not yet loaded; will initialize on next paint.
    }
  }, [publisherId]);

  // No publisher ID → render nothing (avoids empty ad boxes during review).
  if (!publisherId) return null;

  const minH = {
    leaderboard: "min-h-[90px]",
    rectangle: "min-h-[250px]",
    skyscraper: "min-h-[600px]",
  }[format];

  return (
    <div
      className={`flex items-center justify-center overflow-hidden ${minH} ${className}`}
      aria-label="Advertisement"
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%" }}
        data-ad-client={publisherId}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
