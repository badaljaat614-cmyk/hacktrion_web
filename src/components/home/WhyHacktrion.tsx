"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  Users,
  LayoutDashboard,
  FileSpreadsheet,
  Sparkles,
  Search,
  CheckCircle2,
  Trophy,
  MapPin,
  Clock3,
  BrainCircuit,
  UserRound,
  Download,
  ChevronRight,
  ClipboardCheck,
} from "lucide-react";

type FeatureCard = {
  title: string;
  description: string;
  visual: string;
};

const organizerFeatures: FeatureCard[] = [
  {
    title: "All Your Hackathons. One Platform.",
    description:
      "Create, publish, and manage multiple hackathons from one centralized platform without switching between different tools.",
    visual: "manage",
  },
  {
    title: "Complete Control Through One Dashboard.",
    description:
      "Get a dedicated dashboard to manage your events, monitor registrations, and keep track of your hackathon activities.",
    visual: "dashboard",
  },
  {
    title: "Participant Data, Ready to Export.",
    description:
      "Access registered participant information from your dashboard and download the data in a single Excel file.",
    visual: "export",
  },
];

const participantFeatures: FeatureCard[] = [
  {
    title: "Discover Hackathons That Interest You.",
    description:
      "Explore hackathons from different organizers and institutions. Find events that match your skills, interests, and goals.",
    visual: "discover",
  },
  {
    title: "Find Your Next Hackathon with AI.",
    description:
      "Get personalized hackathon suggestions based on your profile, skills, and interests. Discover opportunities that suit you.",
    visual: "ai",
  },
  {
    title: "Register Without the Complexity.",
    description:
      "Explore event information and complete your hackathon registration through a simple, streamlined process.",
    visual: "register",
  },
];

/* =========================================
   CARD ILLUSTRATIONS
========================================= */

function ManageVisual() {
  return (
    <div className="why-visual manage-visual">
      <div className="manage-topbar">
        <span className="visual-window-dot" />
        <span className="visual-window-dot" />
        <span className="visual-window-dot" />
        <span className="manage-topbar-title">My Hackathons</span>
      </div>

      <div className="manage-content">
        <div className="manage-stat">
          <span>Active events</span>
          <strong>04</strong>
        </div>

        <div className="manage-event-list">
          {[
            ["AI Innovation Challenge", "Active"],
            ["CodeSprint 2026", "Published"],
            ["TechFest Hackathon", "Draft"],
          ].map(([name, status]) => (
            <div className="manage-event" key={name}>
              <span className="manage-event-icon">
                <Trophy size={13} />
              </span>

              <span className="manage-event-name">{name}</span>

              <span className="manage-status">{status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DashboardVisual() {
  return (
    <div className="why-visual dashboard-visual">
      <div className="dashboard-sidebar">
        <div className="dashboard-logo">
          <LayoutDashboard size={15} />
        </div>

        <span className="dashboard-sidebar-line active" />
        <span className="dashboard-sidebar-line" />
        <span className="dashboard-sidebar-line" />
        <span className="dashboard-sidebar-line" />
      </div>

      <div className="dashboard-main">
        <div className="dashboard-heading">
          <span>Overview</span>
          <span className="dashboard-date">This month</span>
        </div>

        <div className="dashboard-stats">
          <div>
            <span>Hackathons</span>
            <strong>08</strong>
          </div>

          <div>
            <span>Registrations</span>
            <strong>248</strong>
          </div>
        </div>

        <div className="dashboard-chart">
          <div className="dashboard-chart-bars">
            {[35, 55, 42, 75, 52, 90, 65, 100, 78, 92].map(
              (height, index) => (
                <span
                  key={index}
                  style={{ height: `${height}%` }}
                />
              )
            )}
          </div>

          <div className="dashboard-chart-caption">
            Registration activity
          </div>
        </div>
      </div>
    </div>
  );
}

function ExportVisual() {
  return (
    <div className="why-visual export-visual">
      <div className="export-header">
        <div className="export-file-icon">
          <FileSpreadsheet size={19} />
        </div>

        <div>
          <strong>Participants.xlsx</strong>
          <span>Excel spreadsheet</span>
        </div>

        <Download size={18} className="export-download" />
      </div>

      <div className="export-table">
        <div className="export-row export-table-heading">
          <span>Name</span>
          <span>Email</span>
          <span>Status</span>
        </div>

        {[
          ["Alex Morgan", "alex@email.com"],
          ["Sarah Wilson", "sarah@email.com"],
          ["James Miller", "james@email.com"],
        ].map(([name, email]) => (
          <div className="export-row" key={name}>
            <span>{name}</span>
            <span>{email}</span>
            <span className="export-check">
              <CheckCircle2 size={13} />
            </span>
          </div>
        ))}
      </div>

      <div className="export-success">
        <CheckCircle2 size={14} />
        Ready to download
      </div>
    </div>
  );
}

function DiscoverVisual() {
  return (
    <div className="why-visual discover-visual">
      <div className="discover-search">
        <Search size={14} />
        <span>Search hackathons...</span>
        <span className="discover-filter">Filters</span>
      </div>

      <div className="discover-events">
        {[
          {
            icon: "AI",
            name: "AI Innovation Challenge",
            category: "Artificial Intelligence",
            date: "Dec 12–14",
          },
          {
            icon: "WEB",
            name: "Web Development Sprint",
            category: "Web Development",
            date: "Dec 18–20",
          },
        ].map((event) => (
          <div className="discover-event" key={event.name}>
            <div className="discover-event-icon">{event.icon}</div>

            <div className="discover-event-info">
              <strong>{event.name}</strong>
              <span>{event.category}</span>
              <small>
                <CalendarDays size={11} />
                {event.date}
              </small>
            </div>

            <ArrowUpRight size={15} />
          </div>
        ))}
      </div>
    </div>
  );
}

function AIVisual() {
  return (
    <div className="why-visual ai-visual">
      <div className="ai-profile">
        <div className="ai-avatar">
          <UserRound size={20} />
        </div>

        <div>
          <strong>Your profile</strong>
          <span>Skills & interests</span>
        </div>

        <CheckCircle2 size={17} className="ai-profile-check" />
      </div>

      <div className="ai-connection">
        <span />
        <BrainCircuit size={25} />
        <span />
      </div>

      <div className="ai-recommendation-label">
        <Sparkles size={13} />
        AI Recommended for you
      </div>

      <div className="ai-result">
        <div className="ai-result-icon">
          <Trophy size={16} />
        </div>

        <div>
          <strong>AI Innovation Challenge</strong>
          <span>94% profile match</span>
        </div>

        <ChevronRight size={16} />
      </div>
    </div>
  );
}

function RegisterVisual() {
  return (
    <div className="why-visual register-visual">
      <div className="register-window">
        <div className="register-window-header">
          <span>Event Registration</span>
          <span className="register-step">Step 1 of 2</span>
        </div>

        <div className="register-progress">
          <span />
        </div>

        <div className="register-field">
          <span>Full name</span>
          <strong>Alex Morgan</strong>
        </div>

        <div className="register-field">
          <span>Email address</span>
          <strong>alex@email.com</strong>
        </div>

        <div className="register-button">
          Complete Registration
          <ArrowUpRight size={13} />
        </div>
      </div>

      <div className="register-success">
        <CheckCircle2 size={15} />
        Simple and hassle-free
      </div>
    </div>
  );
}

/* =========================================
   VISUAL SELECTOR
========================================= */

function FeatureVisual({ type }: { type: string }) {
  switch (type) {
    case "manage":
      return <ManageVisual />;

    case "dashboard":
      return <DashboardVisual />;

    case "export":
      return <ExportVisual />;

    case "discover":
      return <DiscoverVisual />;

    case "ai":
      return <AIVisual />;

    case "register":
      return <RegisterVisual />;

    default:
      return null;
  }
}

/* =========================================
   FEATURE CARD
========================================= */

function FeatureCardComponent({
  feature,
  index,
}: {
  feature: FeatureCard;
  index: number;
}) {
  return (
    <article
      className="why-feature-card"
      style={
        {
          "--card-index": index,
        } as React.CSSProperties
      }
    >
      <div className="why-card-content">
        <h4 className="card-title">{feature.title}</h4>

        <p className="why-card-description">{feature.description}</p>
      </div>

      <FeatureVisual type={feature.visual} />
    </article>
  );
}

/* =========================================
   AUDIENCE GROUP
========================================= */

function AudienceGroup({
  title,
  description,
  features,
  type,
  visible,
}: {
  title: string;
  description: string;
  features: FeatureCard[];
  type: "organizer" | "participant";
  visible: boolean;
}) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isInteracting = useRef(false);

  useEffect(() => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    const handleScroll = () => {
      const cards = Array.from(
        carousel.querySelectorAll<HTMLElement>(".why-feature-card")
      );

      if (!cards.length) return;

      const currentScroll = carousel.scrollLeft;

      let closestIndex = 0;
      let closestDistance = Infinity;

      cards.forEach((card, index) => {
        const distance = Math.abs(card.offsetLeft - currentScroll);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    carousel.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => carousel.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;

    if (!carousel || !visible) return;

    const mediaQuery = window.matchMedia("(max-width: 1024px)");

    if (!mediaQuery.matches) return;

    let interval: ReturnType<typeof setInterval>;

    const startAutoplay = () => {
      clearInterval(interval);

      interval = setInterval(() => {
        if (isInteracting.current) return;

        const cards = carousel.querySelectorAll<HTMLElement>(
          ".why-feature-card"
        );

        if (!cards.length) return;

        const nextIndex = (activeIndex + 1) % cards.length;

        carousel.scrollTo({
          left: cards[nextIndex].offsetLeft,
          behavior: "smooth",
        });
      }, 4000);
    };

    const pauseAutoplay = () => {
      isInteracting.current = true;
    };

    const resumeAutoplay = () => {
      isInteracting.current = false;
    };

    startAutoplay();

    carousel.addEventListener("pointerdown", pauseAutoplay);
    carousel.addEventListener("pointerup", resumeAutoplay);
    carousel.addEventListener("pointercancel", resumeAutoplay);

    return () => {
      clearInterval(interval);

      carousel.removeEventListener("pointerdown", pauseAutoplay);
      carousel.removeEventListener("pointerup", resumeAutoplay);
      carousel.removeEventListener("pointercancel", resumeAutoplay);
    };
  }, [visible, activeIndex]);

  const goToSlide = (index: number) => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    const cards = carousel.querySelectorAll<HTMLElement>(
      ".why-feature-card"
    );

    if (cards[index]) {
      carousel.scrollTo({
        left: cards[index].offsetLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={`why-audience-group ${type}`}>
      <div className="why-group-heading">
        <div className="why-group-title-wrap">
          <span className="why-group-icon">
            {type === "organizer" ? (
              <LayoutDashboard size={17} />
            ) : (
              <Users size={17} />
            )}
          </span>

          <h3>{title}</h3>
        </div>

        <p>{description}</p>
      </div>

      <div
        className="why-carousel"
        ref={carouselRef}
        aria-label={`${title} features`}
      >
        <div className="why-carousel-track">
          {features.map((feature, index) => (
            <FeatureCardComponent
              key={feature.visual}
              feature={feature}
              index={index}
            />
          ))}
        </div>
      </div>

      <div className="why-carousel-dots" aria-label="Carousel navigation">
        {features.map((feature, index) => (
          <button
            key={feature.visual}
            type="button"
            className={`why-carousel-dot ${
              activeIndex === index ? "active" : ""
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Show ${feature.title}`}
            aria-current={activeIndex === index ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}

/* =========================================
   MAIN SECTION
========================================= */

export default function WhyHacktrion() {
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
      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-hacktrion"
      className={`why-hacktrion-section ${
        isVisible ? "is-visible" : ""
      }`}
    >
    <div className="why-background-pattern" aria-hidden="true" />

      <div className="why-container">
        {/* Main heading */}

        <header className="why-main-heading">
          <span className="eyebrow why-animate">
            <Sparkles size={13} />
            WHY HACKTRION?
          </span>

          <h2 className="why-animate">
            Everything Hackathons Need.
            <span> One Platform.</span>
          </h2>

          <p className="why-animate">
           Hacktrion simplifies the entire hackathon experience for both 
           organizers and participants.

          </p>
        </header>

        {/* Organizer Features */}

        <AudienceGroup
          title="For Organizers"
          description="Everything you need to create, manage, and organize successful hackathons."
          features={organizerFeatures}
          type="organizer"
          visible={isVisible}
        />

        {/* Participant Features */}

        <AudienceGroup
          title="For Participants"
          description="Discover opportunities, get personalized recommendations, and join hackathons with ease."
          features={participantFeatures}
          type="participant"
          visible={isVisible}
        />
      </div>
    </section>
  );
}