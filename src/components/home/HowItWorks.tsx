"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type CSSProperties,
} from "react";
import {
  ArrowRight,
  UserPlus,
  UserRound,
  Search,
  Trophy,
  Settings2,
  Sparkles,
  ImageIcon,
  CheckCircle2,
} from "lucide-react";

type Audience = "organizers" | "participants";

type Step = {
  number: string;
  title: string;
  description: string;
  image: string;
  icon: React.ElementType;
  visualTitle: string;
  visualDescription: string;
};

const workflows: Record<Audience, Step[]> = {
  organizers: [
    {
      number: "01",
      title: "Sign Up Easily",
      description:
        "Create your organizer account on Hacktrion and get started with a simple signup process.",
      image: "/images/organizers/1.png",
      icon: UserPlus,
      visualTitle: "Welcome to Hacktrion",
      visualDescription: "Your organizing journey starts here.",
    },
    {
      number: "02",
      title: "Set Up Your Profile",
      description:
        "Build your organizer profile by adding your institution details and areas of interest.",
      image: "/images/organizers/2.png",
      icon: Settings2,
      visualTitle: "Complete your profile",
      visualDescription: "Make your organizer profile stand out.",
    },
    {
      number: "03",
      title: "Organize a Hackathon",
      description:
        "Create your hackathon, publish its details, and manage your events through your dashboard.",
      image: "/images/organizers/3.png",
      icon: Trophy,
      visualTitle: "Your next hackathon",
      visualDescription: "Create. Publish. Manage.",
    },
  ],

  participants: [
    {
      number: "01",
      title: "Sign Up Easily",
      description:
        "Create your Hacktrion account and get ready to explore exciting hackathon opportunities.",
      image: "/images/participants/1.png",
      icon: UserPlus,
      visualTitle: "Join Hacktrion",
      visualDescription: "Your next opportunity starts here.",
    },
    {
      number: "02",
      title: "Find Your Hackathon",
      description:
        "Explore hackathons that match your interests and discover new opportunities with AI-powered suggestions.",
      image: "/images/participants/2.png",
      icon: Search,
      visualTitle: "Discover opportunities",
      visualDescription: "Find hackathons that match your interests.",
    },
    {
      number: "03",
      title: "Register & Participate",
      description:
        "Choose the hackathon you like and complete the registration process with ease.",
      image: "/images/participants/3.png",
      icon: CheckCircle2,
      visualTitle: "Ready to participate?",
      visualDescription: "One step closer to your next hackathon.",
    },
  ],
};

/* ---------------- IMAGE WITH FALLBACK ---------------- */

function StepImage({
  step,
  audience,
}: {
  step: Step;
  audience: Audience;
}) {
  const [imageError, setImageError] = useState(false);
  const Icon = step.icon;

  return (
    <div className={`how-image how-image-${audience}`}>
      {!imageError ? (
        <img
          src={step.image}
          alt={step.title}
          onError={() => setImageError(true)}
          className="how-step-img"
        />
      ) : (
        <div className="how-image-fallback">
          <div className="fallback-glow fallback-glow-one" />
          <div className="fallback-glow fallback-glow-two" />

          <div className="fallback-content">
            <div className="fallback-icon">
              <Icon size={30} strokeWidth={1.7} />
            </div>

            <span className="fallback-label">
              {step.visualTitle}
            </span>

            <span className="fallback-description">
              {step.visualDescription}
            </span>

            <div className="fallback-decoration">
              <span />
              <span />
              <span />
            </div>
          </div>

          <div className="fallback-corner-icon">
            <ImageIcon size={15} />
          </div>
        </div>
      )}

      <div className="how-image-overlay" />

      <span className="how-image-number">
        STEP {step.number}
      </span>
    </div>
  );
}

/* ---------------- STEP CARD ---------------- */

function StepCard({
  step,
  index,
  audience,
}: {
  step: Step;
  index: number;
  audience: Audience;
}) {
  const Icon = step.icon;

  return (
    <article
      className="how-step-card"
      style={{ "--card-index": index } as React.CSSProperties}
    >
      <StepImage step={step} audience={audience} />

      <div className="how-card-content">
        <div className="how-card-heading">
          <div className="how-card-icon">
            <Icon size={19} strokeWidth={1.8} />
          </div>

          <span className="how-step-number">
            {step.number}
          </span>
        </div>

        <h3 className="card-title">{step.title}</h3>

        <p className="how-card-description">
          {step.description}
        </p>

        <div className="how-card-bottom">
          <span>STEP {step.number}</span>
          <ArrowRight size={17} />
        </div>
      </div>
    </article>
  );
}

/* ---------------- MAIN SECTION ---------------- */

export default function HowItWorks() {
  const [activeAudience, setActiveAudience] =
    useState<Audience>("participants");

  const [contentKey, setContentKey] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);

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
      {
        threshold: 0.12,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const handleAudienceChange = (audience: Audience) => {
    if (audience === activeAudience) return;

    setActiveAudience(audience);
    setContentKey((previous) => previous + 1);
  };

  const currentSteps = workflows[activeAudience];

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className={`how-it-works-section ${
        isVisible ? "is-visible" : ""
      }`}
    >
      {/* Background decoration */}

      <div
        className="how-background-pattern"
        aria-hidden="true"
      />

      <div className="bg-amber-400" aria-hidden="true" />

      <div className="how-container">
        {/* Heading */}

        <div className="how-header">
          <span className="eyebrow how-animate">
            <Sparkles size={15} />
            SIMPLE PROCESS, BIG POSSIBILITIES
          </span>

          <h2 className="sections-heading how-animate">
            How <span>Hacktrion</span> Works
          </h2>

          <p className="how-description how-animate">
            Whether you're organizing a hackathon or looking
            to participate, getting started with Hacktrion
            is simple.
          </p>
        </div>

        {/* Audience tabs */}

        <div className="how-tabs how-animate">
          <button
            type="button"
            onClick={() => handleAudienceChange("participants")}
            className={`how-tab ${
              activeAudience === "participants"
                ? "active"
                : ""
            }`}
            aria-pressed={activeAudience === "participants"}
          >
            <UserRound size={17} />
            For Participants
          </button>

          <button
            type="button"
            onClick={() => handleAudienceChange("organizers")}
            className={`how-tab ${
              activeAudience === "organizers"
                ? "active"
                : ""
            }`}
            aria-pressed={activeAudience === "organizers"}
          >
            <Trophy size={17} />
            For Organizers
          </button>
        </div>

        {/* Three workflow cards */}

        <div
          key={contentKey}
          className="how-cards-grid"
          aria-live="polite"
        >
          {currentSteps.map((step, index) => (
            <StepCard
              key={`${activeAudience}-${step.number}`}
              step={step}
              index={index}
              audience={activeAudience}
            />
          ))}
        </div>

        {/* Bottom note */}

        <div className="how-footer how-animate">
          <span className="how-footer-icon">
            <Sparkles size={16} />
          </span>

          <p>
            Three simple steps. One platform. Endless possibilities.
          </p>
        </div>
      </div>
    </section>
  );
}