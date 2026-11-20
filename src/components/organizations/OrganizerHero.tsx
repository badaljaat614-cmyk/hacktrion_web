"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, Building2 } from "lucide-react";
import Link from "next/link";

export default function OrganizerHero() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Small delay so the browser paints the initial hidden state first,
    // then we trigger the entrance animations.
    const id = setTimeout(() => setIsMounted(true), 60);
    return () => clearTimeout(id);
  }, []);

  return (
    <section className={`org-hero ${isMounted ? "is-mounted" : ""}`}>
      <div className="org-hero-container">

        {/* ── TEXT CONTENT ── */}
        <div className="org-hero-text">

          <span className="org-hero-eyebrow">
            <Building2 size={13} />
            FOR HACKATHON ORGANIZERS
          </span>

          <div className="org-hero-heading">
            <h1>
              Organize Hackathons.
              <span>Not the Complexity.</span>
            </h1>
          </div>

          <p className="org-hero-description">
            Create, publish, and manage your hackathons through one centralized
            platform. Simplify registrations and keep your event information
            organized with Hacktrion.
          </p>

          <div className="org-hero-actions">
            <Link href="/contact?topic=organizer" className="org-btn-primary">
              Contact the Team
              <ArrowRight size={16} />
            </Link>

            <a href="#org-how-it-works" className="org-btn-secondary">
              See How It Works
            </a>
          </div>
        </div>

        {/* ── HERO VISUAL: genuine mobile product screen ── */}
        <div className="org-hero-visual">
          <div className="org-hero-phone">
            <Image
              src="/images/organizers/insti-dashboard.png"
              alt="Hacktrion institution dashboard displayed in the mobile app"
              width={1368}
              height={2819}
              priority
              sizes="(max-width: 640px) 250px, (max-width: 1024px) 300px, 360px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
