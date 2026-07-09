"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage, type Language } from "@/lib/language-context";

const EASE = [0.22, 1, 0.36, 1] as const;

type FaqItem = { q: string; a: string };

const FAQS: Record<Language, FaqItem[]> = {
  en: [
    {
      q: "Who should apply?",
      a: "People who are obsessed with building.\n\nWe don't care about your age, resume, or whether you've raised funding. We care about whether you're ambitious enough to pursue something most people think is impossible.\n\nSmart is common. Relentless builders are not.",
    },
    {
      q: "How do people get selected?",
      a: "Membership is currently by referral only.\n\nEvery applicant goes through two interviews. The first is with the founders living in Gwangin Hall, and admission requires unanimous approval. The final interview is with the founder of LINER, who started Gwangin Hall.\n\nWe don't optimize for resumes—we optimize for people we'd want to build alongside.",
    },
    {
      q: "Do I have to live in the house to join?",
      a: "Yes.\n\nGwangin Hall isn't a coworking space or a networking community. It's a founder house.\n\nLiving together is what creates the conversations, friendships, and collaborations that define the community. You don't have to stay forever, but every member starts by living in the house.",
    },
    {
      q: "How many people live in the house?",
      a: "Usually around 8 founders.\n\nThe number changes over time as members graduate, move on to new chapters, or new founders join.",
    },
    {
      q: "How much does it cost?",
      a: "It depends on your room and the number of residents at the time.\n\nThanks to the generosity of our alumni, rent is intentionally kept affordable—especially considering our location in the heart of Hongdae.",
    },
    {
      q: "What's the biggest benefit?",
      a: "Ask ten residents and you'll get ten different answers.\n\nSome will say the lifelong friendships. Others will say the mentorship, late-night conversations, or startup opportunities.\n\nThe one thing everyone agrees on is this:\n\nBeing surrounded by founders who dream bigger makes you dream bigger, too.",
    },
  ],
  ko: [
    {
      q: "누가 들어갈 수 있나요?",
      a: "미친 사람.\n\n나이, 경력, 성과는 중요하지 않다. 사람들이 다 불가능하다고 생각하는 일을 추구할 만큼 미친 사람.\n\n똑똑한 사람은 많다. 세상을 바꾸려는 사람은 적다.",
    },
    {
      q: "어떻게 들어갈 수 있나요?",
      a: "추천을 통해서만 입주할 수 있다.\n\n두 번의 면접을 거친다. 광인회관 거주 창업자들과의 얘기하고, 만장일치가 돼야 한다. \n\n마지막으로 광인회관을 시작한 LINER의 창업자와 면접을 거친다.",
    },
    {
      q: "꼭 같이 살아야 하나요?",
      a: "살아야 한다.\n\n광인회관은 미친 창업자들이 같이 살며 함께 꿈을 이루는 공간이다.\n\n영원히 있을 필요는 없지만, 함께 사는 것에서 시작한다.",
    },
    {
      q: "몇 명이 함께 살고 있나요?",
      a: "8명의 창업자가 함께 산다.",
    },
    {
      q: "비용은 얼마인가요?",
      a: "방마다 다르다.\n\n선배들의 지원 덕에 렌트비는 저렴한 편이다.",
    },
    {
      q: "가장 큰 가치는 무엇인가요?",
      a: "각자 느끼는 가치는 조금씩 다르다.\n\n하지만 확실한 건:\n\n미친 창업자들과 같이 살면, 미친 일이 이뤄진다.",
    },
  ],
};

const TITLE: Record<Language, string> = {
  ko: "자주 묻는 질문",
  en: "FAQs",
};

function AccordionItem({ q, a, index }: FaqItem & { index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.06, duration: 0.8, ease: EASE }}
      className="overflow-hidden rounded-xl border border-seam bg-hall transition-colors duration-200 hover:border-bone/20"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-[1rem] font-semibold text-bone sm:text-[1.05rem]">{q}</span>
        <span
          aria-hidden
          className={`shrink-0 text-bone/50 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="space-y-4 px-6 pb-6 pt-1">
              {a.split("\n\n").map((para, i) => (
                <p key={i} className="text-[0.95rem] leading-relaxed text-mist sm:text-[1rem]">
                  {para}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FaqSection() {
  const { language } = useLanguage();
  const faqs = FAQS[language];

  return (
    <section id="faq" className="relative overflow-hidden bg-night px-6 py-24 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_30%,rgba(230,195,106,0.04),transparent)]"
      />

      <div className="relative z-10 mx-auto max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: EASE }}
          className="mb-12 text-center font-serif text-[clamp(1.8rem,4.5vw,3rem)] font-bold tracking-tight text-bone"
        >
          {TITLE[language]}
        </motion.h2>

        <div className="space-y-3">
          {faqs.map((item, i) => (
            <AccordionItem key={i} index={i} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
