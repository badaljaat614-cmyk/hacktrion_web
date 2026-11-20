"use client";

import { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  Trophy,
  LayoutDashboard,
  FileSpreadsheet,
  Globe,
  CheckCircle2,
  Download,
  Users,
  CalendarDays,
  ArrowUpRight,
} from "lucide-react";

/* =====================================================
   MINI MOCKUPS
===================================================== */

function ManageMockup() {
  return (
    <div className="org-feat-manage">
      <div className="org-feat-manage-bar">
        <strong>My Hackathons</strong>
        <span><Trophy size={12} /> 3 events</span>
      </div>
      <div className="org-feat-manage-items">
        {[
          { name: "AI Innovation Challenge", date: "Dec 12–14", status: "Active", color: "#16a34a", bg: "rgba(22,163,74,0.1)" },
          { name: "CodeSprint 2026", date: "Dec 18–20", status: "Published", color: "#7c3aed", bg: "rgba(124,58,237,0.1)" },
          { name: "Winter Hackathon", date: "Jan 5–7", status: "Draft", color: "#d97706", bg: "rgba(217,119,6,0.1)" },
        ].map((item) => (
          <div className="org-feat-manage-item" key={item.name}>
            <span
              className="org-feat-manage-item-dot"
              style={{ background: item.color }}
            />
            <div className="org-feat-manage-item-info">
              <strong>{item.name}</strong>
              <span>{item.date}</span>
            </div>
            <span
              className="org-feat-manage-item-status"
              style={{ color: item.color, background: item.bg }}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardMockup() {
  return (
    <div className="org-feat-dashboard">
      <div className="org-feat-dashboard-top">
        <strong>Dashboard Overview</strong>
        <span>This month</span>
      </div>
      <div className="org-feat-dash-stats">
        <div className="org-feat-dash-stat">
          <span>Hackathons</span>
          <strong>06</strong>
        </div>
        <div className="org-feat-dash-stat">
          <span>Registrations</span>
          <strong>342</strong>
        </div>
      </div>
      <div className="org-feat-dash-chart">
        <div className="org-feat-dash-bars">
          {[30, 55, 40, 70, 50, 88, 62, 100, 75, 90].map((h, i) => (
            <span key={i} style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="org-feat-dash-label">Registration activity</div>
      </div>
    </div>
  );
}

function ExportMockup() {
  return (
    <div className="org-feat-export">
      <div className="org-feat-export-file">
        <div className="org-feat-export-icon">
          <FileSpreadsheet size={20} />
        </div>
        <div className="org-feat-export-info">
          <strong>Participants.xlsx</strong>
          <span>Excel spreadsheet • 342 entries</span>
        </div>
        <Download size={18} style={{ color: "var(--primary)", marginLeft: "auto" }} />
      </div>
      <div className="org-feat-export-table">
        <div className="org-feat-export-row header">
          <span>Name</span>
          <span>Email</span>
          <span>Registered</span>
        </div>
        {[
          ["Alex Morgan", "alex@email.com"],
          ["Sarah Wilson", "sarah@email.com"],
          ["James Miller", "james@email.com"],
        ].map(([name, email]) => (
          <div className="org-feat-export-row" key={name}>
            <span>{name}</span>
            <span>{email}</span>
            <span className="org-feat-export-badge">
              <CheckCircle2 size={11} />
              Done
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PublishMockup() {
  return (
    <div className="org-feat-publish">
      <div className="org-feat-publish-header">
        <strong>Publish Hackathon</strong>
        <span className="org-feat-publish-badge">
          <CheckCircle2 size={11} />
          Live
        </span>
      </div>
      <div className="org-feat-publish-card">
        <div className="org-feat-publish-card-header">
          <div className="org-feat-publish-card-icon">
            <Trophy size={16} />
          </div>
          <div className="org-feat-publish-card-title">
            <strong>AI Innovation Challenge</strong>
            <span>CSE Department · NIT Surathkal</span>
          </div>
        </div>
        <div className="org-feat-publish-info">
          <div className="org-feat-publish-info-row">
            <CalendarDays size={11} />
            Dec 12–14, 2026
          </div>
          <div className="org-feat-publish-info-row">
            <Users size={11} />
            Open for registration
          </div>
        </div>
      </div>
      <div className="org-feat-publish-actions">
        <div className="org-feat-publish-btn primary">
          <Globe size={11} />
          Published
        </div>
        <div className="org-feat-publish-btn secondary">
          <ArrowUpRight size={11} />
          View Page
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   FEATURE DATA
===================================================== */

const features = [
  {
    label: "CENTRALIZED MANAGEMENT",
    title: "One Place for All Your Hackathons",
    description:
      "Create and manage all your hackathon events from a single platform. No switching between tools, no lost information.",
    points: [
      "Create multiple hackathon events",
      "Track all events from one view",
      "Update event details anytime",
    ],
    mockup: "manage" as const,
  },
  {
    label: "ORGANIZER DASHBOARD",
    title: "Your Dedicated Organizer Dashboard",
    description:
      "Access and manage your hackathon information through a dedicated organizer dashboard built specifically for you.",
    points: [
      "Overview of all registrations",
      "Track event activity",
      "Manage event information",
    ],
    mockup: "dashboard" as const,
  },
  {
    label: "PARTICIPANT DATA EXPORT",
    title: "Download All Participant Data in One File",
    description:
      "When your hackathon is done, download registered participant information from your dashboard in a single Excel file.",
    points: [
      "All participant data in one place",
      "Download as Excel (.xlsx)",
      "Accessible from your dashboard",
    ],
    mockup: "export" as const,
  },
  {
    label: "HACKATHON PUBLISHING",
    title: "Publish Without Building a Website",
    description:
      "Publish your hackathon on Hacktrion and reach participants directly — no need to create or maintain a separate event website.",
    points: [
      "Publish with event details and dates",
      "Visible to all Hacktrion participants",
      "Manage registrations from your dashboard",
    ],
    mockup: "publish" as const,
  },
];

function FeatureMockup({ type }: { type: typeof features[0]["mockup"] }) {
  switch (type) {
    case "manage": return <ManageMockup />;
    case "dashboard": return <DashboardMockup />;
    case "export": return <ExportMockup />;
    case "publish": return <PublishMockup />;
  }
}

/* =====================================================
   MAIN SECTION
===================================================== */

export default function OrganizerFeatures() {
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
      { threshold: 0.07, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="org-features"
      className={`org-features-section ${isVisible ? "is-visible" : ""}`}
    >
      <div className="org-features-bg-glow" aria-hidden="true" />

      <div className="org-features-container">

        {/* Heading */}
        <div className="org-features-heading">
          <span className="org-eyebrow org-features-animate">
            <Sparkles size={13} />
            PLATFORM FEATURES
          </span>

          <h2 className="org-features-animate">
            What Hacktrion Gives{" "}
            <span style={{ color: "var(--primary)" }}>Organizers</span>
          </h2>

          <p className="org-features-animate">
            A focused set of tools built to help you organize hackathons
            without the operational overhead.
          </p>
        </div>

        {/* Feature rows */}
        <div className="org-features-list">
          {features.map((feature, index) => (
            <div
              className={`org-feature-row`}
              key={feature.label}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              {/* Content */}
              <div className="org-feature-content">
                <span className="org-feature-label">
                  <span className="org-feature-label-line" />
                  {feature.label}
                </span>

                <h3>{feature.title}</h3>

                <p>{feature.description}</p>

                <div className="org-feature-points">
                  {feature.points.map((point) => (
                    <div className="org-feature-point" key={point}>
                      <span className="org-feature-point-icon">
                        <CheckCircle2 size={14} />
                      </span>
                      {point}
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual */}
              <div className="org-feature-visual">
                <FeatureMockup type={feature.mockup} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
