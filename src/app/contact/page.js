"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, CheckCircle2, MessageSquare, LifeBuoy } from "lucide-react";
import PageShell from "../../components/PageShell";
import AdSlot from "../../components/AdSlot";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate() {
    if (!form.name.trim()) return "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Please enter a valid email.";
    if (!form.subject.trim()) return "Please add a subject.";
    if (form.message.trim().length < 10)
      return "Your message should be at least 10 characters.";
    return "";
  }

  function handleSubmit(e) {
    e.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      setStatus("error");
      return;
    }
    setError("");
    setStatus("sending");
    // Simulate async submit. Wire this to an email service or edge function
    // in production; for now we confirm locally.
    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 900);
  }

  return (
    <PageShell>
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
          <MessageSquare className="h-6 w-6 text-white" />
        </span>
        <h1 className="font-display text-3xl font-bold sm:text-4xl">
          Contact Us
        </h1>
      </div>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400">
        Questions, feedback, or ideas to improve the detector? We read every
        message. Use the form below or email us directly.
      </p>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {/* Form */}
        <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name">
              <input
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Your name"
                className={inputCls}
              />
            </Field>
            <Field label="Email">
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@example.com"
                className={inputCls}
              />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Subject">
              <input
                type="text"
                value={form.subject}
                onChange={(e) => update("subject", e.target.value)}
                placeholder="What's this about?"
                className={inputCls}
              />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Message">
              <textarea
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="Tell us more…"
                rows={6}
                className={`${inputCls} resize-y`}
              />
            </Field>
          </div>

          <AnimatePresence>
            {error && status === "error" && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-3 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-300"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <div className="mt-5 flex items-center gap-3">
            <motion.button
              whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
              whileTap={{ scale: status === "sending" ? 1 : 0.98 }}
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center gap-2 rounded-lg gradient-btn px-5 py-2.5 text-sm font-bold shadow-lg shadow-blue-500/30 disabled:opacity-60"
            >
              {status === "sending" ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send message
                </>
              )}
            </motion.button>

            <AnimatePresence>
              {status === "sent" && (
                <motion.span
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-300"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Message sent — thank you!
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </form>

        {/* Support email card */}
        <div className="glass-card flex flex-col gap-4 p-6 sm:p-8">
          <div className="grid h-11 w-11 place-items-center rounded-xl border border-slate-800 bg-slate-950/60">
            <LifeBuoy className="h-5 w-5 text-blue-300" />
          </div>
          <h2 className="font-display text-lg font-bold text-white">
            Direct Support
          </h2>
          <p className="text-sm leading-relaxed text-slate-400">
            Prefer email? Reach us directly and we&apos;ll get back to you,
            usually within 1–2 business days.
          </p>
          <a
            href="mailto:support@aidetectorpro.app"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm font-medium text-slate-200 transition-colors hover:border-blue-500/50 hover:text-white"
          >
            <Mail className="h-4 w-4 text-blue-400" />
            support@aidetectorpro.app
          </a>
          <div className="mt-auto rounded-xl border border-slate-800 bg-slate-950/50 p-3 text-xs text-slate-400">
            For bug reports, please include the text sample (redacted as
            needed) and the score you expected vs. received.
          </div>
        </div>
      </div>

      <div className="mt-8">
        <AdSlot format="leaderboard" slot="contact" />
      </div>
    </PageShell>
  );
}

const inputCls =
  "w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 transition-all focus:border-blue-500/60 focus:outline-none focus:ring-2 focus:ring-blue-500/30";

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </span>
      {children}
    </label>
  );
}
