import PageShell from "../../components/PageShell";
import AdSlot from "../../components/AdSlot";
import { Shield, Lock, Cookie, Globe, Trash2 } from "lucide-react";

export const metadata = {
  title: "Privacy Policy — AI Detector Pro",
  description:
    "AI Detector Pro privacy policy. We do not store your text. Ads may use DART cookies under GDPR. Zero-data-storage guarantee.",
};

export default function PrivacyPolicyPage() {
  return (
    <PageShell>
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
          <Shield className="h-6 w-6 text-white" />
        </span>
        <h1 className="font-display text-3xl font-bold sm:text-4xl">
          Privacy Policy
        </h1>
      </div>
      <p className="mt-4 text-sm text-slate-400">
        Last updated: August 29, 2026
      </p>

      <div className="glass-card mt-8 p-6 sm:p-8">
        <h2 className="font-display text-xl font-bold text-white">
          Zero-Data-Storage Guarantee
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          AI Detector Pro performs all text analysis entirely in your browser
          using client-side JavaScript. The text you paste into the detector is{" "}
          <strong className="text-white">never transmitted to our
          servers</strong>, never logged, never stored, and never shared with
          third parties. When you close or refresh the page, the text is gone.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <Pill icon={<Lock className="h-4 w-4 text-blue-300" />} text="No text storage" />
          <Pill icon={<Trash2 className="h-4 w-4 text-cyan-300" />} text="Cleared on reload" />
          <Pill icon={<Globe className="h-4 w-4 text-purple-300" />} text="100% client-side" />
        </div>
      </div>

      <Block title="Information We Do Not Collect">
        <ul className="mt-3 space-y-2 text-sm text-slate-300">
          <li>• The text you submit for analysis.</li>
          <li>• Your name, email, or any account credentials (no accounts exist).</li>
          <li>• Your IP address for analytics purposes.</li>
          <li>• Browsing history or cross-site tracking profiles.</li>
        </ul>
      </Block>

      <Block title="Cookies & DART Cookie (Google AdSense)">
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          This site is free and supported by advertising. We use Google
          AdSense, a service provided by Google LLC, to display ads. Google
          AdSense may use the{" "}
          <strong className="text-white">DART cookie</strong> to serve ads to
          our visitors based on their previous visits to this and other
          websites on the Internet.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          Users may opt out of the use of the DART cookie by visiting the{" "}
          <a
            className="text-blue-400 underline underline-offset-2"
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Ads Settings page
          </a>
          . Third-party vendors, including Google, use cookies to serve ads
          based on a user&apos;s prior visits to this website or other websites.
        </p>
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-slate-800 bg-slate-950/50 p-3 text-xs text-slate-400">
          <Cookie className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
          <p>
            Cookie-based advertising helps keep AI Detector Pro free. You can
            disable cookies in your browser settings at any time; the detector
            itself will continue to work without them.
          </p>
        </div>
      </Block>

      <Block title="GDPR Compliance">
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          Under the General Data Protection Regulation (GDPR), users in the
          European Economic Area have the right to access, rectify, erase, and
          restrict the processing of their personal data. Because we do not
          collect or process any personal data — and do not store submitted
          text — these rights are effectively satisfied by design. For ad
          personalization controlled by Google, manage your preferences via the
          Google Ads Settings link above.
        </p>
      </Block>

      <Block title="Children&apos;s Privacy">
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          AI Detector Pro is not directed at children under 13 and does not
          knowingly collect any information from them. If you believe a child
          has provided personal data, please contact us so we can take
          appropriate action.
        </p>
      </Block>

      <Block title="Changes to This Policy">
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          We may update this Privacy Policy from time to time. Changes are
          posted on this page with an updated revision date. Continued use of
          the service after changes constitutes acceptance of the revised
          policy.
        </p>
      </Block>

      <Block title="Contact">
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          Questions about this policy? Email{" "}
          <a
            className="text-blue-400 underline underline-offset-2"
            href="mailto:support@aidetectorpro.app"
          >
            support@aidetectorpro.app
          </a>{" "}
          or use our{" "}
          <a className="text-blue-400 underline underline-offset-2" href="/contact">
            contact page
          </a>
          .
        </p>
      </Block>

      <div className="mt-8">
        <AdSlot format="leaderboard" slot="privacy" />
      </div>
    </PageShell>
  );
}

function Pill({ icon, text }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950/50 px-3 py-2.5 text-xs font-medium text-slate-200">
      {icon}
      {text}
    </div>
  );
}

function Block({ title, children }) {
  return (
    <div className="glass-card mt-6 p-6 sm:p-8">
      <h2 className="font-display text-xl font-bold text-white">{title}</h2>
      {children}
    </div>
  );
}
