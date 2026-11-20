"use client";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Sparkles,
  Trophy,
  Users,
  Download,
  Search,
  UserPlus,
  BrainCircuit,
} from "lucide-react";

type Feature = {
  id: string;
  label: string;
  title: string;
  description: string;
  points: {
    icon: React.ElementType;
    text: string;
  }[];
  images: string[];
  imageAlt: string[];
  cta: string;
  href: string;
};

const features: Feature[] = [
  {
    id: "organizers",
    label: "FOR ORGANIZERS",
    title: "Your Hackathon. Your Platform.",
    description:
      "Organize and manage your hackathons from one place. No need to build a separate website for every event.",
    points: [
      {
        icon: Trophy,
        text: "Create and publish hackathons easily",
      },
      {
        icon: Users,
        text: "Manage all registrations from one dashboard",
      },
      {
        icon: Download,
        text: "Export participant data in one Excel file",
      },
    ],
    images: [
      "/images/featured/organizers/phone-1.png",
      "/images/featured/organizers/phone-2.png",
    ],
    imageAlt: [
      "Hacktrion organizer dashboard",
      "Hacktrion hackathon management",
    ],
    cta: "Start Organizing",
    href: "/organizations",
  },
  {
    id: "participants",
    label: "FOR PARTICIPANTS",
    title: "Discover. Register. Participate.",
    description:
      "Find exciting hackathons, explore event details, and discover opportunities that match your interests.",
    points: [
      {
        icon: Search,
        text: "Explore hackathons in one place",
      },
      {
        icon: BrainCircuit,
        text: "Get AI-powered personalized suggestions",
      },
      {
        icon: UserPlus,
        text: "Register for hackathons with ease",
      },
    ],
    images: [
      "/images/featured/participants/phone-1.png",
      "/images/featured/participants/phone-2.png",
    ],
    imageAlt: [
      "Hacktrion hackathon discovery",
      "Hacktrion hackathon details and registration",
    ],
    cta: "Explore Hackathons",
    href: "/hackathons",
  },
];

/* ---------------------------------
   PHONE IMAGE WITH PLACEHOLDER
--------------------------------- */

function PhoneMockup({
  src,
  alt,
  index,
}: {
  src: string;
  alt: string;
  index: number;
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`featured-phone featured-phone-${index}`}>
      {!imageError ? (
        <img
          src={src}
          alt={alt}
          className="featured-phone-image"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="phone-placeholder">
          <div className="phone-speaker" />

          <div className="placeholder-content">
            <div className="placeholder-brand">
              <Sparkles size={13} />
              <span>Hacktrion</span>
            </div>

            <div className="placeholder-heading">
              {index === 1
                ? "Explore Hackathons"
                : "Your Dashboard"}
            </div>

            <div className="placeholder-search">
              Search opportunities...
            </div>

            <div className="placeholder-category">
              <span />
              <span />
              <span />
            </div>

            <div className="placeholder-event">
              <div className="placeholder-event-image">
                <Trophy size={22} />
              </div>

              <div className="placeholder-lines">
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="placeholder-event">
              <div className="placeholder-event-image second">
                <Sparkles size={22} />
              </div>

              <div className="placeholder-lines">
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="placeholder-bottom">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------
   FEATURE SHOWCASE
--------------------------------- */

function FeatureShowcase({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) {
  const isOrganizer = feature.id === "organizers";

  return (
    <div
      className={`featured-row ${
        isOrganizer ? "featured-organizers" : "featured-participants"
      }`}
    >
      {/* Phone visuals */}

      <div className="featured-visual">
        <div className="featured-visual-glow" />

        <div className="featured-visual-decoration">
          <Sparkles size={22} />
        </div>

        <PhoneMockup
          src={feature.images[0]}
          alt={feature.imageAlt[0]}
          index={1}
        />

        <PhoneMockup
          src={feature.images[1]}
          alt={feature.imageAlt[1]}
          index={2}
        />

        <div className="featured-visual-caption">
          <span className="caption-dot" />
          {isOrganizer
            ? "Organizer experience"
            : "Participant experience"}
        </div>
      </div>

      {/* Text content */}

      <div className="featured-content">
        <span className="featured-label">
          <span className="featured-label-line" />
          {feature.label}
        </span>

        <h3>
          {feature.title}
        </h3>

        <p className="featured-description">
          {feature.description}
        </p>

        <div className="featured-points">
          {feature.points.map((point, pointIndex) => {
            const Icon = point.icon;

            return (
              <div
                className="featured-point"
                key={point.text}
                style={
                  {
                    "--point-index": pointIndex,
                  } as React.CSSProperties
                }
              >
                <div className="featured-point-icon">
                  <Icon size={17} strokeWidth={1.8} />
                </div>

                <span>{point.text}</span>
              </div>
            );
          })}
        </div>

        <a
          href={feature.href}
          className="featured-cta"
        >
          {feature.cta}
          <ArrowRight size={17} />
        </a>
      </div>
    </div>
  );
}

/* ---------------------------------
   MAIN COMPONENT
--------------------------------- */

export default function FeaturedExperience() {
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
      { threshold: 0.12 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`featured-experience ${
        isVisible ? "is-visible" : ""
      }`}
      id="featured-experience"
    >
      <div className="featured-section-container">

        {/* Section heading */}

        <div className="featured-section-heading">
          <span className="featured-main-eyebrow">
            <Sparkles size={15} />
            ONE PLATFORM, TWO EXPERIENCES
          </span>

          <h2>
            Built for the Entire
            <span> Hackathon Community</span>
          </h2>

          <p>
            Everything organizers and participants need,
            brought together in one platform.
          </p>
        </div>

        {/* Two showcase sections */}

        <div className="featured-showcases">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`featured-reveal featured-reveal-${index + 1}`}
            >
              <FeatureShowcase
                feature={feature}
                index={index}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}