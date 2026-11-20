"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Sparkles, Building2 } from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "Who can organize a hackathon on Hacktrion?",
    answer:
      "Colleges, universities, institutions, and eligible organizations can use Hacktrion to create and manage their hackathons.",
  },
  {
    question: "How can I publish my hackathon?",
    answer:
      "Create your organizer account, complete your profile, and use your dashboard to add the details of your hackathon and publish it.",
  },
  {
    question: "Do I need a separate website for my hackathon?",
    answer:
      "No. Hacktrion provides a platform where you can publish your hackathon and manage its registrations without building a separate event website.",
  },
  {
    question: "How can I manage participant registrations?",
    answer:
      "You can access registration information through your organizer dashboard and manage your hackathon registrations from one place.",
  },
  {
    question: "Can I download participant information?",
    answer:
      "Yes. You can download registered participant information in a single Excel file through your organizer dashboard.",
  },
  {
    question: "Can I organize multiple hackathons?",
    answer:
      "Yes. Hacktrion is designed to help organizers manage multiple hackathons through one organizer account and dashboard.",
  },
];

export default function OrganizerFAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="org-faqs"
      className={`org-faq-section ${isVisible ? "is-visible" : ""}`}
    >
      <div className="org-faq-bg-overlay" aria-hidden="true" />
      <div className="org-faq-bg-glow" aria-hidden="true" />

      <div className="org-faq-container">

        {/* Header */}
        <div className="org-faq-header">
          <span className="org-faq-eyebrow">
            <Building2 size={14} />
            ORGANIZER SUPPORT
          </span>

          <h2>
            Frequently Asked{" "}
            <span>Questions</span>
          </h2>

          <p>
            Common questions from organizations interested in using Hacktrion
            to manage their hackathons.
          </p>
        </div>

        {/* Accordion */}
        <div className="org-faq-list">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            const answerId = `org-faq-answer-${index}`;

            return (
              <div
                className={`org-faq-item ${isOpen ? "org-faq-item-open" : ""}`}
                key={item.question}
                style={{ "--org-faq-index": index } as React.CSSProperties}
              >
                <button
                  type="button"
                  className="org-faq-question"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                >
                  <span className="org-faq-question-num">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="org-faq-question-text">
                    {item.question}
                  </span>

                  <span className="org-faq-chevron" aria-hidden="true">
                    <ChevronDown size={17} />
                  </span>
                </button>

                <div
                  className="org-faq-answer-wrapper"
                  id={answerId}
                  aria-hidden={!isOpen}
                >
                  <div className="org-faq-answer-inner">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom contact */}
        <div className="org-faq-bottom">
          <span>Still have questions?</span>
          <a href="/contact">Contact us</a>
        </div>

      </div>
    </section>
  );
}
