"use client";

import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Sparkles,
  Building2,
  Users,
} from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
};

const organizerFAQs: FAQItem[] = [
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

const participantFAQs: FAQItem[] = [
  {
    question: "What is Hacktrion?",
    answer:
      "Hacktrion is a platform where participants can discover hackathons, explore event details, and register for opportunities that interest them.",
  },
  {
    question: "How can I find hackathons?",
    answer:
      "You can explore available hackathons on Hacktrion and browse their details to find events that match your interests.",
  },
  {
    question: "How do AI-powered recommendations work?",
    answer:
      "Hacktrion uses participant profile information and interests to suggest relevant hackathons and help participants discover suitable opportunities.",
  },
  {
    question: "How do I register for a hackathon?",
    answer:
      "Open the hackathon you are interested in, review its details, and follow the registration process provided on its page.",
  },
  {
    question: "Can I participate in multiple hackathons?",
    answer:
      "You can explore and register for multiple hackathons, subject to each event's eligibility criteria and schedule.",
  },
  {
    question: "Where can I find hackathon details?",
    answer:
      "Each hackathon has its own details page where you can check the event information, dates, eligibility, registration details, and other information provided by its organizer.",
  },
];

function FAQGroup({
  title,
  label,
  icon: Icon,
  items,
  group,
  isVisible,
}: {
  title: string;
  label: string;
  icon: typeof Building2;
  items: FAQItem[];
  group: "organizers" | "participants";
  isVisible: boolean;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div
      className={`faq-group faq-group-${group} ${
        isVisible ? "faq-group-visible" : ""
      }`}
    >
      {/* Left introduction */}

      <div className="faq-group-intro">
        <div className="faq-group-icon">
          <Icon size={21} strokeWidth={1.7} />
        </div>

        <span className="faq-group-label">
          {label}
        </span>

        <h3>{title}</h3>

      </div>

      {/* Right accordion */}

      <div className="faq-list">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          const answerId = `${group}-faq-answer-${index}`;

          return (
            <div
              className={`faq-item ${isOpen ? "faq-item-open" : ""}`}
              key={item.question}
              style={
                {
                  "--faq-index": index,
                } as React.CSSProperties
              }
            >
              <button
                type="button"
                className="faq-question"
                onClick={() =>
                  setOpenIndex(isOpen ? null : index)
                }
                aria-expanded={isOpen}
                aria-controls={answerId}
              >
                <span className="faq-question-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="faq-question-text">
                  {item.question}
                </span>

                <span className="faq-chevron">
                  <ChevronDown size={18} />
                </span>
              </button>

              <div
                className="faq-answer-wrapper"
                id={answerId}
                aria-hidden={!isOpen}
              >
                <div className="faq-answer-inner">
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Faq() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
      id="faqs"
      className={`faq-section ${isVisible ? "faq-visible" : ""}`}
    >
      <div className="faq-background-overlay" />
  
      <div className="faq-container">
  
        {/* Main heading */}
        <div className="faq-header">
          <span className="faq-eyebrow">
            <Sparkles size={15} />
            GOT QUESTIONS?
          </span>
  
          <h2>
            Frequently Asked <span>Questions</span>
          </h2>
  
          <p>
            Everything you need to know about using Hacktrion.
          </p>
        </div>
  
        {/* Two-column FAQ layout */}
        <div className="faq-columns">
  
          {/* Left: Organizers */}
          <FAQGroup
            title="For Organizers"

            label="ORGANIZER SUPPORT"
            icon={Building2}
            items={organizerFAQs}
            group="organizers"
            isVisible={isVisible}
          />
  
          {/* Right: Participants */}
          <FAQGroup
            title="For Participants"
            label="ORGANIZER SUPPORT"
            icon={Users}
            items={participantFAQs}
            group="participants"
            isVisible={isVisible}
          />
  
        </div>
  
        {/* Bottom contact */}
        <div className="faq-bottom">
          <span>Still have questions?</span>
          <a href="/contact">Contact us</a>
        </div>
  
      </div>
    </section>
  );
}