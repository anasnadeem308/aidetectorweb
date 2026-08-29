import { Megaphone } from "lucide-react";

/**
 * Advertisement placeholder ready for Google AdSense code.
 * Replace the inner comment block with your AdSense <ins> markup.
 *
 * @param {Object} props
 * @param {string} [props.label] - Optional label override.
 * @param {string} [props.className] - Extra classes.
 * @param {"leaderboard"|"rectangle"|"skyscraper"} [props.format] - Visual hint.
 * @param {string} [props.slot] - AdSense slot id (for reference).
 */
export default function AdSlot({
  label = "Sponsored / Advertisement",
  className = "",
  format = "leaderboard",
  slot = "",
}) {
  const sizes = {
    leaderboard: "min-h-[90px] sm:min-h-[120px]",
    rectangle: "min-h-[250px]",
    skyscraper: "min-h-[600px]",
  };

  return (
    <div
      className={`glass-card-soft relative flex items-center justify-center overflow-hidden border-dashed px-4 py-6 ${sizes[format]} ${className}`}
      data-ad-slot={slot || undefined}
      role="complementary"
      aria-label="Advertisement"
    >
      {/* Google AdSense integration point:
          <ins className="adsbygoogle" style={{display:'block'}}
               data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
               data-ad-slot={slot}
               data-ad-format="auto"
               data-full-width-responsive="true" />
          (then push (adsbygoogle = window.adsbygoogle || []).push({}) in an effect)
      */}
      <div className="pointer-events-none flex flex-col items-center gap-2 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-700/80 bg-slate-900/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
          <Megaphone className="h-3 w-3" />
          Ad
        </span>
        <span className="text-xs font-medium text-slate-500">{label}</span>
        <span className="text-[10px] text-slate-600">
          Your AdSense code goes here
        </span>
      </div>
    </div>
  );
}
