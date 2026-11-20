"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ─── Table of contents items — id matches section heading id ─── */
const TOC = [
  { id: "introduction",          label: "Introduction" },
  { id: "scope",                  label: "Scope of Policy" },
  { id: "information-we-collect", label: "Information We Collect" },
  { id: "how-we-use",             label: "How We Use Data" },
  { id: "recommendations",        label: "Recommendations" },
  { id: "sharing",                label: "Sharing Information" },
  { id: "third-parties",          label: "Third Parties" },
  { id: "cookies",                label: "Cookies" },
  { id: "security",               label: "Security" },
  { id: "retention",              label: "Retention" },
  { id: "account-deletion",       label: "Account Deletion" },
  { id: "age",                    label: "Age Eligibility" },
  { id: "international",          label: "International Processing" },
  { id: "automated",              label: "Automated Processing" },
  { id: "public-content",         label: "Public Content" },
  { id: "organizers",             label: "Organizer Responsibilities" },
  { id: "external-links",         label: "External Links" },
  { id: "your-rights",            label: "Your Rights" },
  { id: "applicable-laws",        label: "Applicable Laws" },
  { id: "changes",                label: "Changes to Policy" },
  { id: "contact",                label: "Contact" },
];

/* ─── Smooth scroll helper ─── */
function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 88;
  window.scrollTo({ top, behavior: "smooth" });
}

/* ─── List renderer ─── */
function UL({ items }: { items: string[] }) {
  return (
    <ul className="pp-list">
      {items.map((item, i) => (
        <li key={i} className="pp-list-item">
          <span className="pp-list-dot" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function OL({ items }: { items: string[] }) {
  return (
    <ol className="pp-olist">
      {items.map((item, i) => (
        <li key={i} className="pp-olist-item">
          <span className="pp-olist-num">{i + 1}.</span>
          {item}
        </li>
      ))}
    </ol>
  );
}

/* ─── Section wrapper ─── */
function Section({ id, num, title, children }: {
  id: string; num?: string; title: string; children: React.ReactNode;
}) {
  return (
    <section id={id} className="pp-section">
      <h2 className="pp-section-heading">
        {num && <span className="pp-section-num">{num}.</span>}
        {title}
      </h2>
      {children}
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="pp-subsection">
      <h3 className="pp-subsection-heading">{title}</h3>
      {children}
    </div>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="pp-p">{children}</p>;
}

/* ─── Main page ─── */
export default function PrivacyPolicyPage() {
  const [activeId, setActiveId] = useState("introduction");
  const [tocOpen,  setTocOpen]  = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  /* Active section via IntersectionObserver */
  useEffect(() => {
    const ids = TOC.map((t) => t.id);
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 }
    );

    els.forEach((el) => observerRef.current!.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="pp-root">

      {/* ───────── LAYOUT ───────── */}
      <div className="pp-layout">

        {/* ── SIDEBAR (desktop) ── */}
        <aside className="pp-sidebar" aria-label="Table of contents">
          <p className="pp-toc-heading">ON THIS PAGE</p>
          <nav>
            {TOC.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollTo(item.id)}
                className={`pp-toc-link ${activeId === item.id ? "pp-toc-link--active" : ""}`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="pp-main">

          {/* Page heading */}
          <div className="pp-header pp-animate" style={{ "--pp-d": "0ms" } as React.CSSProperties}>
            <h1 className="pp-title">Privacy Policy</h1>
            <p className="pp-dates">
              Effective 15 November 2026
              <span className="pp-dates-sep" aria-hidden="true">•</span>
              Last updated 15 November 2026
            </p>
          </div>

          {/* Mobile TOC toggle */}
          <div className="pp-mobile-toc pp-animate" style={{ "--pp-d": "60ms" } as React.CSSProperties}>
            <button
              type="button"
              className="pp-mobile-toc-btn"
              onClick={() => setTocOpen(!tocOpen)}
              aria-expanded={tocOpen}
            >
              <span>On this page</span>
              <svg
                className={`pp-mobile-toc-chevron ${tocOpen ? "pp-mobile-toc-chevron--open" : ""}`}
                viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
              >
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>
            {tocOpen && (
              <nav className="pp-mobile-toc-nav">
                {TOC.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => { scrollTo(item.id); setTocOpen(false); }}
                    className={`pp-toc-link ${activeId === item.id ? "pp-toc-link--active" : ""}`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            )}
          </div>

          {/* Lavender info banner */}
          <div className="pp-banner pp-animate" style={{ "--pp-d": "120ms" } as React.CSSProperties}>
            <strong className="pp-banner-strong">Your privacy matters.</strong>
            {" "}Learn how Hacktrion handles your information.
          </div>

          {/* ═══ CONTENT ═══ */}

          <Section id="introduction" num="1" title="Introduction">
            <P>Welcome to Hacktrion.</P>
            <P>
              Hacktrion is a platform designed to help students discover hackathons, connect with teammates, participate in events, showcase projects, and build their academic and professional portfolios.
            </P>
            <P>
              This Privacy Policy explains how Hacktrion collects, uses, stores, shares, and protects information when you access or use our website, applications, and related services.
            </P>
            <P>
              Hacktrion is operated under the brand name <strong>KodepiX</strong>, an unincorporated startup team. References to "Hacktrion", "we", "our", or "us" in this Policy refer to the Hacktrion platform and its operator, KodepiX.
            </P>
            <P>By using Hacktrion, you acknowledge that you have read this Privacy Policy.</P>
          </Section>

          <Section id="scope" num="2" title="Scope of This Policy">
            <P>This Policy applies to information collected through:</P>
            <UL items={[
              "The Hacktrion website and associated services.",
              "User registration, login, and account management.",
              "Student profiles and preferences.",
              "Hackathon discovery, registration, and participation.",
              "Team creation and team communication features.",
              "Event announcements and notifications.",
              "Project submissions and showcases.",
              "Certificates and certificate verification.",
              "Support requests and communications with Hacktrion.",
            ]} />
            <P>This Policy does not automatically cover third-party websites, platforms, or services that may be accessible through links on Hacktrion.</P>
          </Section>

          <Section id="information-we-collect" num="3" title="Information We Collect">
            <P>We collect information that is reasonably necessary to operate, maintain, and improve Hacktrion.</P>

            <SubSection title="3.1 Account and Registration Information">
              <P>When you create an account, we may collect:</P>
              <UL items={[
                "Name or display name.",
                "Username and unique user ID.",
                "Email address.",
                "Login and authentication-related information.",
                "Profile photograph or avatar, if provided.",
                "Account preferences and settings.",
              ]} />
            </SubSection>

            <SubSection title="3.2 Academic and Student Information">
              <P>To support hackathon discovery and student participation, we may collect information such as:</P>
              <UL items={[
                "College or institution name.",
                "Course or degree.",
                "Semester and academic year.",
                "Skills and technical interests.",
                "Areas of interest.",
                "Experience level.",
                "Preferred event location.",
                "Preference for online or offline events.",
                "Preference for free or paid events.",
              ]} />
              <P>You may choose which optional profile details to provide, where the relevant feature allows it.</P>
            </SubSection>

            <SubSection title="3.3 Hackathon and Event Information">
              <P>When you interact with hackathons or other events, we may collect:</P>
              <UL items={[
                "Events you view or save.",
                "Events you follow or request notifications for.",
                "Registration and application details.",
                "Participation status.",
                "Team information.",
                "Submission details.",
                "Event-related announcements and interactions.",
              ]} />
              <P>Information submitted through an event application may also be shared with the institution or event organizer responsible for that event.</P>
            </SubSection>

            <SubSection title="3.4 Team and Communication Information">
              <P>When you create or join a team, use team chats, or interact with other participants, we may process:</P>
              <UL items={[
                "Team name and team membership.",
                "Usernames and user IDs.",
                "Messages and other information shared through team communication features.",
                "Team-related activity and event participation records.",
              ]} />
              <P>Hacktrion is designed to use usernames and user IDs for team interactions rather than displaying members' private phone numbers or email addresses to other team members.</P>
              <P>However, information that you voluntarily share in messages or other interactions may be visible to the intended recipients.</P>
            </SubSection>

            <SubSection title="3.5 Technical and Usage Information">
              <P>When you access Hacktrion, certain technical information may be collected automatically, including:</P>
              <UL items={[
                "IP address.",
                "Browser and device information.",
                "Operating system.",
                "Approximate location derived from technical information, where available.",
                "Access timestamps.",
                "Session and authentication information.",
                "Error logs, security logs, and diagnostic information.",
                "Platform usage and interaction data.",
              ]} />
              <P>We use this information for security, troubleshooting, performance monitoring, and service improvement.</P>
            </SubSection>

            <SubSection title="3.6 Certificates and Project Information">
              <P>Where applicable, Hacktrion may process:</P>
              <UL items={[
                "Project titles and descriptions.",
                "Uploaded submissions and supporting materials.",
                "Portfolio information.",
                "Certificate details.",
                "Certificate identification numbers.",
                "Certificate verification records.",
              ]} />
              <P>Certain certificate details may be made publicly accessible through a certificate verification page so that authenticity can be checked.</P>
            </SubSection>

            <SubSection title="3.7 Support and Communication Information">
              <P>If you contact our support team, we may collect your email address, account information, message content, attachments, and other information necessary to understand and resolve your request.</P>
            </SubSection>
          </Section>

          <Section id="how-we-use" num="4" title="How We Use Your Information">
            <P>We may use collected information to:</P>
            <OL items={[
              "Create, maintain, and authenticate user accounts.",
              "Provide access to Hacktrion's features and services.",
              "Display relevant hackathons and opportunities.",
              "Personalize event discovery and recommendations.",
              "Enable event applications and participation.",
              "Support team creation and communication.",
              "Deliver event announcements, reminders, and deadline notifications.",
              "Maintain saved hackathons and user preferences.",
              "Process project submissions and showcase participation.",
              "Generate and verify certificates.",
              "Detect suspicious activities, spam, fraud, and misuse.",
              "Maintain platform security and prevent unauthorized access.",
              "Diagnose technical problems and improve platform performance.",
              "Respond to support requests and legal obligations.",
              "Enforce our Terms of Service and applicable platform rules.",
            ]} />
            <P>We do not use personal information for purposes unrelated to the operation of Hacktrion without an appropriate basis or notice, where required by applicable law.</P>
          </Section>

          <Section id="recommendations" num="5" title="Personalized Recommendations and Notifications">
            <P>Hacktrion may use information such as your academic background, skills, interests, preferences, and activity on the platform to recommend relevant hackathons and opportunities.</P>
            <P>For example, recommendations may consider:</P>
            <UL items={[
              "Your course and semester.",
              "Your skills and interests.",
              "Your preferred location.",
              "Online or offline event preferences.",
              "Free or paid event preferences.",
              "Your experience level.",
              "Events you have saved or interacted with.",
            ]} />
            <P>We may also use event dates and participation information to send relevant reminders, announcements, and deadline notifications.</P>
            <P>You can manage available notification preferences through the platform or your device settings, depending on the notification type.</P>
          </Section>

          <Section id="sharing" num="6" title="How We Share Your Information">
            <P>We do not sell your personal information to third parties.</P>
            <P>However, we may share relevant information in the following circumstances:</P>

            <SubSection title="6.1 Institutions and Event Organizers">
              <P>When you apply for, register for, or participate in an event, relevant information may be shared with the institution or organizer responsible for that event.</P>
              <P>This may include your name, email address, academic details, application information, team details, and project submissions, depending on the event requirements.</P>
              <P>Institutions and organizers are responsible for handling information they receive in accordance with applicable laws and their own privacy practices.</P>
            </SubSection>

            <SubSection title="6.2 Other Hacktrion Users">
              <P>Certain information may be visible to other users, depending on your profile settings and the features you use.</P>
              <P>For example, usernames, profile details, team membership, public projects, and information you choose to share may be visible to other participants.</P>
              <P>Do not share sensitive personal information publicly or in team communications.</P>
            </SubSection>

            <SubSection title="6.3 Service Providers">
              <P>We may share necessary information with service providers who help us operate Hacktrion, including hosting, authentication, infrastructure, security, email delivery, and notification services.</P>
              <P>These providers may process information only as necessary to provide their services to us, subject to applicable contractual and legal requirements.</P>
            </SubSection>

            <SubSection title="6.4 Legal and Regulatory Requirements">
              <P>We may disclose information where reasonably necessary to:</P>
              <UL items={[
                "Comply with applicable laws or lawful government requests.",
                "Respond to court orders or legal proceedings.",
                "Protect the rights, safety, and security of Hacktrion, its users, or others.",
                "Investigate fraud, abuse, or security incidents.",
                "Enforce our Terms of Service.",
              ]} />
            </SubSection>

            <SubSection title="6.5 Business or Operational Changes">
              <P>If Hacktrion undergoes a restructuring, transfer, acquisition, or similar operational change, relevant information may be transferred as part of that process, subject to applicable legal requirements and appropriate safeguards.</P>
            </SubSection>
          </Section>

          <Section id="third-parties" num="7" title="Third-Party Services and Infrastructure">
            <P>Hacktrion uses third-party technology providers to support its operations.</P>
            <P>These currently include:</P>
            <div className="pp-service-block">
              <p className="pp-service-name">Firebase</p>
              <P>Used for certain authentication-related and notification functions, including email verification, password reset, email address change, multi-factor authentication-related notifications, and supported notification services.</P>
            </div>
            <div className="pp-service-block">
              <p className="pp-service-name">Render</p>
              <P>Used to host and operate Hacktrion's backend infrastructure.</P>
            </div>
            <P>Our service providers may process technical or personal information as required to deliver their services.</P>
            <P>You can review their respective privacy policies:</P>
            <UL items={[
              "Firebase: https://firebase.google.com/support/privacy",
              "Render: https://render.com/privacy",
            ]} />
            <P>We are not responsible for the independent privacy practices of third-party services outside our control.</P>
          </Section>

          <Section id="cookies" num="8" title="Cookies and Similar Technologies">
            <P>Hacktrion may use cookies, session identifiers, and similar technologies to:</P>
            <UL items={[
              "Maintain login sessions.",
              "Support authentication and security.",
              "Remember certain preferences.",
              "Improve website functionality.",
              "Diagnose technical issues.",
            ]} />
            <P>You may manage or disable cookies through your browser settings. However, disabling certain cookies may affect the availability or functionality of some platform features.</P>
          </Section>

          <Section id="security" num="9" title="Data Security">
            <P>We take reasonable technical and organizational measures to protect information against unauthorized access, alteration, disclosure, loss, or misuse.</P>
            <P>These measures may include:</P>
            <UL items={[
              "Access controls and authentication safeguards.",
              "Secure communication protocols where supported.",
              "Server and database access restrictions.",
              "Monitoring for suspicious activity.",
              "Security logging and incident investigation.",
              "Regular maintenance and security improvements.",
            ]} />
            <P>However, no online platform or method of electronic storage can guarantee absolute security.</P>
            <P>Users are responsible for maintaining the confidentiality of their account credentials and reporting suspected unauthorized account access.</P>
          </Section>

          <Section id="retention" num="10" title="Data Retention">
            <P>We retain personal information only for as long as reasonably necessary for the purposes described in this Policy, including providing services, maintaining records, resolving disputes, ensuring security, and meeting legal obligations.</P>
            <P>Different categories of information may have different retention periods.</P>

            <SubSection title="10.1 Team Chat Retention">
              <P>Our intended retention policy is to delete team chat data from active systems within <strong>three (3) days after the associated event concludes</strong>.</P>
              <P>This period may be extended where information must be retained for security investigations, legal obligations, disputes, or other legitimate requirements.</P>
              <P>Copies in protected backups may remain until the applicable backup-retention cycle is completed.</P>
            </SubSection>

            <SubSection title="10.2 Account and Event Records">
              <P>Certain account, event, certificate, transaction-related, security, or participation records may be retained for longer periods where necessary for platform operations, verification, dispute resolution, or legal compliance.</P>
            </SubSection>
          </Section>

          <Section id="account-deletion" num="11" title="Account Deletion and Data Removal">
            <P>You may request deletion of your Hacktrion account by contacting: <a href="mailto:support@hacktrion.app" className="pp-link">support@hacktrion.app</a></P>
            <P>For account deletion requests:</P>
            <OL items={[
              "Send an email from your registered email address.",
              "Clearly mention that you want your Hacktrion account deleted.",
              "We may request additional information to verify account ownership.",
              "We will acknowledge your request and process it accordingly.",
            ]} />
            <P>Our current target is to complete account deletion and the removal of associated personal information from active systems within <strong>thirty (30) calendar days</strong> after successful verification of the request.</P>
            <P>Certain information may be retained where required by law or reasonably necessary for security, fraud prevention, dispute resolution, or other legitimate purposes.</P>
            <P>Information stored in backups may be removed in accordance with the applicable backup-retention cycle.</P>
            <P>Where appropriate, account access or public visibility may be restricted while a deletion request is being processed.</P>
          </Section>

          <Section id="age" num="12" title="Age and Account Eligibility">
            <P>Hacktrion does not currently impose a separate age-based registration restriction through its registration process.</P>
            <P>Users are expected to provide accurate information when creating and using their accounts.</P>
            <P>Hacktrion may introduce additional age-related safeguards, eligibility requirements, or consent procedures in future updates where required by applicable law or platform requirements.</P>
            <P>Any such changes will be reflected in an updated Privacy Policy or other relevant platform notices.</P>
          </Section>

          <Section id="international" num="13" title="International Data Processing">
            <P>Our technology providers may operate infrastructure or process information in locations outside your state or country.</P>
            <P>As a result, your information may be processed or stored in other jurisdictions, subject to applicable laws and appropriate safeguards.</P>
          </Section>

          <Section id="automated" num="14" title="Automated Processing">
            <P>Hacktrion may use automated systems to support event recommendations, search relevance, deadline reminders, spam detection, security monitoring, and platform operations.</P>
            <P>These systems are intended to improve platform functionality and user experience.</P>
            <P>Where automated processing significantly affects a user's rights, we will handle it in accordance with applicable legal requirements.</P>
          </Section>

          <Section id="public-content" num="15" title="Public Information and User-Generated Content">
            <P>Some information you submit may be visible to other users or the public. This may include:</P>
            <UL items={[
              "Public profile information.",
              "Project showcases.",
              "Public event participation details.",
              "Team information.",
              "Certificate verification records.",
              "Content you voluntarily publish or share.",
            ]} />
            <P>You should review the information before publishing it.</P>
            <P>Hacktrion cannot guarantee the privacy of information that you intentionally make public or share with other users.</P>
          </Section>

          <Section id="organizers" num="16" title="Institution and Organizer Responsibilities">
            <P>Institutions and event organizers using Hacktrion may receive information about participants, applicants, teams, and submissions for event-related purposes.</P>
            <P>They are responsible for ensuring that their collection, use, storage, and disclosure of such information comply with applicable laws and their own obligations.</P>
            <P>Hacktrion may provide tools and platform infrastructure to facilitate event management, but this does not automatically make Hacktrion responsible for every independent data-handling activity performed by an institution or organizer.</P>
          </Section>

          <Section id="external-links" num="17" title="External Links">
            <P>Hacktrion may contain links to external websites, event pages, institutional websites, or third-party services.</P>
            <P>These external services operate independently and may have their own privacy policies and terms.</P>
            <P>We recommend reviewing their privacy policies before providing personal information.</P>
          </Section>

          <Section id="your-rights" num="18" title="Your Privacy Rights">
            <P>Subject to applicable law, you may have rights relating to your personal information, including:</P>
            <UL items={[
              "Requesting information about personal data processed by Hacktrion.",
              "Requesting correction of inaccurate or incomplete information.",
              "Requesting deletion of personal information where applicable.",
              "Withdrawing consent where processing is based on consent.",
              "Raising a privacy-related complaint.",
              "Using applicable grievance-redressal mechanisms.",
            ]} />
            <P>To exercise an applicable right, contact us at <a href="mailto:support@hacktrion.app" className="pp-link">support@hacktrion.app</a>.</P>
            <P>We may need to verify your identity before processing certain requests.</P>
          </Section>

          <Section id="applicable-laws" num="19" title="Applicable Laws">
            <P>This Privacy Policy is intended to be interpreted in accordance with the laws of India, including applicable provisions of:</P>
            <UL items={[
              "The Information Technology Act, 2000.",
              "The Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, as amended, where applicable.",
              "The Digital Personal Data Protection Act, 2023, and applicable rules and notifications as they become effective.",
            ]} />
            <P>Nothing in this Policy is intended to limit any rights or protections that users may have under applicable law.</P>
          </Section>

          <Section id="changes" num="20" title="Changes to This Privacy Policy">
            <P>We may update this Privacy Policy when Hacktrion introduces new features, changes its data practices, or when legal or regulatory requirements change.</P>
            <P>The updated version will be published on the Hacktrion website with a revised "Last Updated" date.</P>
            <P>Where required, we will provide additional notice or seek consent for material changes.</P>
            <P>We encourage users to review this Policy periodically.</P>
          </Section>

          <Section id="contact" num="21" title="Contact and Grievance Redressal">
            <P>For privacy-related questions, data requests, complaints, or concerns, you can contact us using the details below.</P>
            <div className="pp-contact-block">
              <p><strong>Platform:</strong> Hacktrion</p>
              <p><strong>Operator:</strong> KodepiX (unincorporated startup team)</p>
              <p><strong>Website:</strong> <a href="https://hacktrion.app" className="pp-link" target="_blank" rel="noopener noreferrer">https://hacktrion.app</a></p>
              <p><strong>Email:</strong> <a href="mailto:support@hacktrion.app" className="pp-link">support@hacktrion.app</a></p>
              <p className="pp-contact-sep" />
              <p><strong>Grievance Officer:</strong> Chirag</p>
              <p><strong>Email:</strong> <a href="mailto:support@hacktrion.app" className="pp-link">support@hacktrion.app</a></p>
            </div>
            <P>Please include sufficient details about your concern so that we can identify and address it.</P>
            <P>We will acknowledge and address complaints within the timelines prescribed under applicable law.</P>
          </Section>

          {/* Footer note */}
          <div className="pp-footer-note">
            <strong>By using Hacktrion, you acknowledge that you have read this Privacy Policy.</strong>
          </div>

        </main>
      </div>
    </div>
  );
}
