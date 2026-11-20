"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage, type Language } from "@/lib/language-context";

const COPY = {
  ko: {
    placeholder: "이메일",
    submit: "뉴스레터 구독하기",
    submitting: "구독 중",
    success: "뉴스레터에 구독했어요",
    error: "다시 시도해 주세요",
  },
  en: {
    placeholder: "Email",
    submit: "Subscribe",
    submitting: "Subscribing",
    success: "You're on the newsletter",
    error: "Try again",
  },
} satisfies Record<Language, Record<string, string>>;

export function SubscribeForm() {
  const { language } = useLanguage();
  const copy = COPY[language];
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [chip, setChip] = useState<string | null>(null);

  useEffect(() => {
    if (!chip) return;
    const timer = window.setTimeout(() => setChip(null), 3200);
    return () => window.clearTimeout(timer);
  }, [chip]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    setPending(true);
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        setChip(copy.error);
        return;
      }

      setEmail("");
      setChip(copy.success);
    } catch {
      setChip(copy.error);
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="flex w-full max-w-md items-center gap-2 rounded-full border border-bone/25 bg-night/55 p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-sm"
      >
        <label className="sr-only" htmlFor="newsletter-email">
          {copy.placeholder}
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={copy.placeholder}
          className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-[1rem] text-bone outline-none placeholder:text-bone/45"
        />
        <button
          type="submit"
          disabled={pending}
          className="shrink-0 rounded-full bg-bone px-5 py-3 text-[1rem] font-semibold text-night transition-all duration-200 hover:bg-gold disabled:opacity-60"
        >
          {pending ? copy.submitting : copy.submit}
        </button>
      </form>

      <AnimatePresence>
        {chip && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 rounded-full border border-bone/20 bg-bone px-5 py-2.5 text-sm font-semibold text-night shadow-[0_16px_40px_rgba(0,0,0,0.45)]"
          >
            {chip}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
