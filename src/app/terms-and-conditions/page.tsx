"use client";

import { useEffect, useRef, useState } from "react";

const TOC = [
  { id: "tc-01", label: "Introduction and Acceptance" },
  { id: "tc-02", label: "About Hacktrion" },
  { id: "tc-03", label: "Definitions" },
  { id: "tc-04", label: "Role of Hacktrion" },
  { id: "tc-05", label: "Eligibility and Account Registration" },
  { id: "tc-06", label: "Student Accounts and Participation" },
  { id: "tc-07", label: "Institutions and Event Hosting" },
  { id: "tc-08", label: "Hackathon Listings and Notifications" },
  { id: "tc-09", label: "Saved Hackathons and Personalization" },
  { id: "tc-10", label: "Teams, Communication and Chats" },
  { id: "tc-11", label: "User Content and Intellectual Property" },
  { id: "tc-12", label: "Prohibited Activities" },
  { id: "tc-13", label: "Projects, Showcases and Certificates" },
  { id: "tc-14", label: "Prizes, Judging and Disputes" },
  { id: "tc-15", label: "Payments, Fees and Refunds" },
  { id: "tc-16", label: "Third-Party Services and Links" },
  { id: "tc-17", label: "Platform Availability and Changes" },
  { id: "tc-18", label: "Account Suspension and Termination" },
  { id: "tc-19", label: "Privacy and Personal Information" },
  { id: "tc-20", label: "Disclaimers" },
  { id: "tc-21", label: "Limitation of Liability" },
  { id: "tc-22", label: "Indemnification" },
  { id: "tc-23", label: "Governing Law and Jurisdiction" },
  { id: "tc-24", label: "Changes to These Terms" },
  { id: "tc-25", label: "Miscellaneous" },
  { id: "tc-26", label: "Contact and Grievance Redressal" },
];

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 88, behavior: "smooth" });
}

function UL({ items }: { items: string[] }) {
  return (
    <ul className="pp-list">
      {items.map((item, i) => (
        <li key={i} className="pp-list-item">
          <span className="pp-list-dot" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Sec({ id, num, title, children }: {
  id: string; num: string; title: string; children: React.ReactNode;
}) {
  return (
    <section id={id} className="pp-section">
      <h2 className="pp-section-heading">
        <span className="pp-section-num">{num}.</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Sub({ title, children }: { title: string; children: React.ReactNode }) {
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

function Def({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <p className="pp-p">
      <strong>{term}</strong> {children}
    </p>
  );
}

export default function TermsPage() {
  const [activeId, setActiveId] = useState("tc-01");
  const [tocOpen, setTocOpen]   = useState(false);
  const obsRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const els = TOC.map((t) => document.getElementById(t.id)).filter(Boolean) as HTMLElement[];
    obsRef.current?.disconnect();
    obsRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 }
    );
    els.forEach((el) => obsRef.current!.observe(el));
    return () => obsRef.current?.disconnect();
  }, []);

  return (
    <div className="pp-root">
      <div className="pp-layout">

        {/* ── Sidebar ── */}
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

        {/* ── Main ── */}
        <main className="pp-main">

          {/* Heading */}
          <div className="pp-header pp-animate" style={{ "--pp-d": "0ms" } as React.CSSProperties}>
            <h1 className="pp-title">Terms of Use</h1>
            <p className="pp-dates">
              Effective 15 November 2026
              <span className="pp-dates-sep" aria-hidden="true">•</span>
              Last updated 15 November 2026
            </p>
          </div>

          {/* Mobile TOC */}
          <div className="pp-mobile-toc pp-animate" style={{ "--pp-d": "60ms" } as React.CSSProperties}>
            <button
              type="button"
              className="pp-mobile-toc-btn"
              onClick={() => setTocOpen(!tocOpen)}
              aria-expanded={tocOpen}
            >
              <span>On this page</span>
              <svg className={`pp-mobile-toc-chevron ${tocOpen ? "pp-mobile-toc-chevron--open" : ""}`}
                viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>
            {tocOpen && (
              <nav className="pp-mobile-toc-nav">
                {TOC.map((item) => (
                  <button key={item.id} type="button"
                    onClick={() => { scrollTo(item.id); setTocOpen(false); }}
                    className={`pp-toc-link ${activeId === item.id ? "pp-toc-link--active" : ""}`}>
                    {item.label}
                  </button>
                ))}
              </nav>
            )}
          </div>

          {/* Banner */}
          <div className="pp-banner pp-animate" style={{ "--pp-d": "120ms" } as React.CSSProperties}>
            <strong className="pp-banner-strong">Please read carefully.</strong>
            {" "}These Terms of Use govern your access to and use of Hacktrion.
          </div>

          {/* ═══════════════════════════════════════════
              CONTENT — verbatim from terms-condition.txt
              HACKTRION — TERMS OF USE
              Effective Date: 15 November 2026
          ═══════════════════════════════════════════ */}

          <Sec id="tc-01" num="1" title="Introduction and Acceptance">
            <P>Welcome to Hacktrion.</P>
            <P>These Terms of Use ("Terms") govern your access to and use of the Hacktrion website, mobile applications, services, features, tools, and related platforms (collectively, the "Platform").</P>
            <P>Hacktrion is operated under the brand name <strong>KodepiX</strong>, an unincorporated startup team. KodepiX is not represented as a registered company, LLP, or other incorporated legal entity.</P>
            <P>By accessing, registering for, or using Hacktrion, you acknowledge that you have read, understood, and agreed to these Terms and our Privacy Policy.</P>
            <P>If you do not agree with these Terms, you must stop using the Platform.</P>
          </Sec>

          <Sec id="tc-02" num="2" title="About Hacktrion">
            <P>Hacktrion is a platform designed to help students discover hackathons, connect with potential teammates, participate in events, showcase projects, and build their academic and professional portfolios.</P>
            <P>The Platform may provide features including:</P>
            <UL items={[
              "Hackathon discovery and event listings.",
              "Search, filters, and personalized recommendations.",
              "Saved hackathons and Notify Me functionality.",
              "Student profiles and skill information.",
              "Team creation and team collaboration.",
              "Event-related group chats and communication.",
              "Event announcements and updates.",
              "Applications and participation-related workflows.",
              "Project submissions and showcases.",
              "Certificates and certificate verification.",
              "Notifications and deadline reminders.",
              "Institution and organizer dashboards.",
            ]} />
            <P>Features may be modified, introduced, suspended, or discontinued at Hacktrion's discretion.</P>
          </Sec>

          <Sec id="tc-03" num="3" title="Definitions">
            <P>For these Terms:</P>
            <Def term='"Hacktrion"'>refers to the Platform and its services operated under the KodepiX brand.</Def>
            <Def term='"User"'>refers to any person accessing or using the Platform.</Def>
            <Def term='"Student"'>refers to a user who uses Hacktrion to discover or participate in hackathons and related activities.</Def>
            <Def term='"Institution"'>refers to a college, university, educational organization, or other eligible institution using Hacktrion's hosting or organizer services.</Def>
            <Def term='"Organizer"'>refers to an institution or an individual officially authorized by an approved institution to manage an event through Hacktrion.</Def>
            <Def term='"Event" or "Hackathon"'>refers to a hackathon, competition, workshop, or other event listed or managed through the Platform.</Def>
            <Def term='"User Content"'>refers to information, text, images, files, submissions, projects, messages, or other materials uploaded, submitted, or shared by users.</Def>
          </Sec>

          <Sec id="tc-04" num="4" title="Role of Hacktrion">
            <P>4.1 Hacktrion primarily provides a digital platform that facilitates discovery, communication, participation, and coordination of hackathons and related activities.</P>
            <P>4.2 Hacktrion may provide tools to institutions and organizers for publishing and managing events.</P>
            <P>4.3 Unless expressly stated otherwise, Hacktrion is not the organizer, sponsor, judge, or guarantor of every event listed on the Platform.</P>
            <P>4.4 Hacktrion does not guarantee that any event will take place as announced, that a user will be selected, that a team will be formed successfully, or that any participant will receive a prize, certificate, internship, employment opportunity, or other benefit.</P>
            <P>4.5 Event information may be submitted by institutions, organizers, or other authorized sources. Hacktrion may review, modify, restrict, or remove listings where appropriate.</P>
          </Sec>

          <Sec id="tc-05" num="5" title="Eligibility and Account Registration">
            <P>5.1 You must provide accurate and complete information when creating an account.</P>
            <P>5.2 You are responsible for keeping your login credentials and account access secure.</P>
            <P>5.3 You must not impersonate another person, institution, or organization.</P>
            <P>5.4 You must not create accounts using false, misleading, or unauthorized information.</P>
            <P>5.5 You are responsible for all activities conducted through your account.</P>
            <P>5.6 Hacktrion may request additional information or verification where reasonably necessary to protect users, institutions, events, or the Platform.</P>
            <P>5.7 You must promptly notify Hacktrion if you suspect unauthorized access to your account.</P>
          </Sec>

          <Sec id="tc-06" num="6" title="Student Accounts and Participation">
            <P>6.1 Students may use Hacktrion to discover events, create profiles, save hackathons, receive notifications, find teammates, and participate in available event-related activities.</P>
            <P>6.2 Students are responsible for ensuring that the information in their profiles, applications, and submissions is accurate.</P>
            <P>6.3 Students must follow the eligibility requirements, submission instructions, deadlines, and rules specified for each event.</P>
            <P>6.4 Submitting an application through Hacktrion does not guarantee acceptance or participation.</P>
            <P>6.5 Hacktrion does not guarantee that a student will find a team, receive an invitation, or be selected by an organizer.</P>
            <P>6.6 Students must not use the Platform to misrepresent their qualifications, skills, academic details, achievements, or project contributions.</P>
            <P>6.7 Students are responsible for their conduct when communicating with other users.</P>
          </Sec>

          <Sec id="tc-07" num="7" title="Institutions and Event Hosting">
            <P>7.1 Hacktrion currently provides event-hosting functionality exclusively to eligible educational institutions and their authorized representatives.</P>
            <P>7.2 Individual users cannot independently register as event hosts or publish events through the institution-hosting system unless expressly authorized by Hacktrion.</P>
            <P>7.3 Institutions must provide accurate institutional information and any requested verification documents.</P>
            <P>7.4 An institution is responsible for ensuring that any person using its organizer account is properly authorized.</P>
            <P>7.5 Institutions and organizers are responsible for:</P>
            <UL items={[
              "Providing accurate event descriptions and eligibility criteria.",
              "Publishing correct registration and submission deadlines.",
              "Communicating event schedules, rules, and requirements.",
              "Managing participant selection and event operations.",
              "Conducting judging and evaluation fairly.",
              "Providing accurate information about prizes and certificates.",
              "Communicating cancellations, postponements, and material changes.",
              "Handling event-related queries and disputes within their responsibility.",
            ]} />
            <P>7.6 Hacktrion may request additional verification, restrict organizer privileges, suspend an event, or remove event content where necessary.</P>
            <P>7.7 Institutions and organizers must not publish misleading, fraudulent, unlawful, or unauthorized events.</P>
            <P>7.8 Hacktrion may refuse or revoke hosting access if an institution or its representative violates these Terms or creates a risk to users or the Platform.</P>
          </Sec>

          <Sec id="tc-08" num="8" title="Hackathon Listings, Applications and Notifications">
            <P>8.1 Hacktrion may display events collected from institutions, organizers, publicly available sources, or other authorized submissions.</P>
            <P>8.2 Hacktrion may review, categorize, edit, feature, or remove event listings.</P>
            <P>8.3 Event information may change. Users should verify important requirements and deadlines with the relevant organizer.</P>
            <P>8.4 Hacktrion may provide event statuses such as:</P>
            <UL items={[
              "Registration Not Started.",
              "Registration Open.",
              "Registration Closed.",
              "Submissions Open.",
              "Submissions Closed.",
              "Event Ongoing.",
              "Event Completed.",
              "Event Cancelled.",
            ]} />
            <P>8.5 These statuses are provided for convenience and may depend on information supplied by organizers.</P>
            <P>8.6 The Notify Me feature may allow users to request notifications about an event or a future registration or submission window.</P>
            <P>8.7 Notifications are provided as a convenience. Hacktrion does not guarantee delivery, timing, or successful receipt of every notification.</P>
            <P>8.8 Users are responsible for independently tracking important deadlines and requirements.</P>
          </Sec>

          <Sec id="tc-09" num="9" title="Saved Hackathons and Personalization">
            <P>9.1 Hacktrion may allow users to save or bookmark events for convenient access.</P>
            <P>9.2 Saved events are personal convenience features and do not constitute registration, application, or confirmation of participation.</P>
            <P>9.3 Hacktrion may provide personalized event recommendations based on profile information, preferences, skills, interests, and Platform activity, as described in the Privacy Policy.</P>
            <P>9.4 Recommendations are informational suggestions and do not guarantee eligibility, selection, or suitability.</P>
            <P>9.5 Users are responsible for reviewing event requirements before applying.</P>
          </Sec>

          <Sec id="tc-10" num="10" title="Teams, Communication and Chats">
            <P>10.1 Hacktrion may provide team creation, team discovery, invitations, and collaboration features.</P>
            <P>10.2 Team members are responsible for their own participation, communication, and collaboration.</P>
            <P>10.3 Hacktrion may provide event-related group chats or other communication features.</P>
            <P>10.4 Users must not use communication features for harassment, threats, spam, impersonation, fraud, unauthorized advertising, or any unlawful activity.</P>
            <P>10.5 Users must not share another person's private information without authorization.</P>
            <P>10.6 Phone numbers, email addresses, or other personal contact details may not be displayed to other team members through the Platform's team communication interface. However, users must not assume that all information they voluntarily share in messages is private from recipients.</P>
            <P>10.7 Hacktrion may moderate, restrict, remove, or investigate reported content and communications where reasonably necessary.</P>
            <P>10.8 Event-related team chats are intended to be deleted from active systems within three (3) days after the relevant event concludes, subject to technical limitations, legal obligations, security requirements, dispute resolution, and applicable backup-retention cycles.</P>
          </Sec>

          <Sec id="tc-11" num="11" title="User Content and Intellectual Property">
            <P>11.1 Users retain ownership of the content and intellectual property they independently create and upload to Hacktrion, subject to third-party rights and applicable law.</P>
            <P>11.2 By uploading or submitting User Content, you grant Hacktrion a non-exclusive, worldwide, royalty-free licence to host, store, reproduce, display, transmit, and process that content only as reasonably necessary to operate, maintain, provide, promote, and improve the Platform and its relevant features.</P>
            <P>11.3 This licence does not transfer ownership of your intellectual property to Hacktrion.</P>
            <P>11.4 You represent that you have the necessary rights and permissions to upload, publish, or submit the content you provide.</P>
            <P>11.5 You must not upload or distribute content that infringes copyright, trademarks, patents, privacy rights, or other legal rights.</P>
            <P>11.6 Hacktrion may remove or restrict access to content that violates these Terms, applicable law, or third-party rights.</P>
            <P>11.7 Event-specific rules may impose additional intellectual property requirements. Such requirements must be communicated by the relevant organizer. Users should review those rules before participating.</P>
            <P>11.8 Unless expressly agreed otherwise, participation in an event does not automatically transfer ownership of a participant's project or intellectual property to Hacktrion.</P>
          </Sec>

          <Sec id="tc-12" num="12" title="Prohibited Activities and Platform Misuse">
            <P>You agree not to use Hacktrion for any unlawful, fraudulent, abusive, harmful, or unauthorized purpose.</P>
            <P>You must not:</P>

            <Sub title="12.1 Illegal Activities">
              <P>Use the Platform to conduct, promote, facilitate, or support any activity that violates applicable laws or regulations.</P>
            </Sub>

            <Sub title="12.2 False Information and Impersonation">
              <P>Provide false information, impersonate another person or institution, or misrepresent your identity, qualifications, affiliation, or authority.</P>
            </Sub>

            <Sub title="12.3 Harassment and Abuse">
              <P>Threaten, harass, bully, intimidate, defame, exploit, or discriminate against other users.</P>
            </Sub>

            <Sub title="12.4 Unauthorized Access">
              <P>Attempt to gain unauthorized access to accounts, servers, databases, APIs, administrative systems, or other restricted Platform components.</P>
            </Sub>

            <Sub title="12.5 Reverse Engineering, Copying and Unauthorized Use">
              <P>You shall not, directly or indirectly, without Hacktrion's prior written permission and to the extent prohibited by applicable law:</P>
              <UL items={[
                "Reverse engineer, decompile, disassemble, decode, or attempt to derive or discover the source code, object code, underlying algorithms, architecture, database structure, technical processes, or internal components of the Hacktrion Platform.",
                "Copy, reproduce, duplicate, modify, adapt, translate, distribute, publish, or create derivative works from any part of the Hacktrion Platform, including its application, website, software, features, functionality, or technical infrastructure.",
                "Download, extract, reuse, redistribute, commercially exploit, or otherwise use any proprietary element of Hacktrion, including its source code, UI/UX designs, layouts, graphics, illustrations, logos, trademarks, icons, text, databases, APIs, documentation, or other intellectual property.",
                "Create, operate, or distribute any application, website, service, or product that copies, imitates, replicates, or misrepresents Hacktrion's branding, interface, functionality, or proprietary materials in a manner that infringes Hacktrion's rights or causes user confusion.",
                "Bypass, disable, interfere with, manipulate, or attempt to circumvent any security mechanism, authentication process, access restriction, technical protection, or other safeguard implemented by Hacktrion.",
                "Use bots, crawlers, scripts, automated tools, scraping technologies, or any other method to systematically collect, extract, download, or access Platform data, user information, event information, or other content without proper authorization.",
                "Use Hacktrion's software, technology, proprietary materials, data, branding, or other Platform components to develop, train, operate, promote, or commercially exploit another product or service without prior written authorization from Hacktrion.",
                "Allow, assist, or enable any third party to perform any of the activities prohibited under this clause, whether for personal, commercial, educational, or any other purpose.",
              ]} />
              <P>Any violation or attempted violation of this clause may result in suspension or termination of your account, restriction of access to the Platform, removal of unauthorized content, and/or legal action under applicable laws.</P>
              <P>Nothing in this clause shall prohibit activities that are expressly permitted under applicable law or that Hacktrion has authorized in writing.</P>
            </Sub>

            <Sub title="12.6 Platform Interference">
              <P>Disrupt, damage, overload, interfere with, or attempt to impair the availability, performance, or security of the Platform.</P>
            </Sub>

            <Sub title="12.7 Malware and Harmful Code">
              <P>Upload or distribute viruses, malware, ransomware, malicious scripts, or other harmful code.</P>
            </Sub>

            <Sub title="12.8 Spam and Manipulation">
              <P>Use automated accounts, fake registrations, misleading reviews, artificial engagement, or other deceptive methods to manipulate Platform activity.</P>
            </Sub>

            <Sub title="12.9 Unauthorized Data Collection">
              <P>Collect, disclose, sell, or misuse personal information belonging to other users without a lawful basis or authorization.</P>
            </Sub>

            <Sub title="12.10 Misuse of Events">
              <P>Submit plagiarized projects, falsified certificates, fabricated achievements, or misleading applications.</P>
            </Sub>

            <Sub title="12.11 Unauthorized Commercial Activity">
              <P>Use Hacktrion to promote, advertise, sell, or distribute products or services without appropriate authorization.</P>
            </Sub>

            <P>Hacktrion may investigate suspected violations and take appropriate action, including warnings, content removal, access restrictions, account suspension, termination, or referral to relevant authorities where legally appropriate.</P>
          </Sec>

          <Sec id="tc-13" num="13" title="Projects, Showcases and Certificates">
            <P>13.1 Hacktrion may allow users to upload, display, or showcase projects and related achievements.</P>
            <P>13.2 Users are responsible for the originality, accuracy, legality, and ownership of their submissions.</P>
            <P>13.3 Hacktrion does not guarantee that a project will receive recognition, be selected, or be evaluated positively.</P>
            <P>13.4 Certificates may be issued by Hacktrion, event organizers, or participating institutions, depending on the event and the applicable arrangement.</P>
            <P>13.5 Hacktrion may provide certificate identifiers and QR-based verification functionality.</P>
            <P>13.6 Certificate issuance, authenticity, eligibility, and verification may depend on information supplied by the relevant organizer or institution.</P>
            <P>13.7 Hacktrion may revoke, invalidate, or correct certificates where fraud, errors, unauthorized issuance, or other legitimate reasons are identified.</P>
            <P>13.8 Users must not forge, modify, reproduce deceptively, or misuse certificates or verification identifiers.</P>
          </Sec>

          <Sec id="tc-14" num="14" title="Prizes, Judging and Event Disputes">
            <P>14.1 Event rules, judging criteria, prize details, eligibility requirements, and result announcements are generally determined by the relevant organizer.</P>
            <P>14.2 Hacktrion does not guarantee the availability, delivery, value, or payment of any prize unless Hacktrion has expressly undertaken that responsibility in writing.</P>
            <P>14.3 Questions or disputes concerning judging, selection, team participation, prize distribution, event cancellation, or event management should generally be directed to the relevant organizer.</P>
            <P>14.4 Hacktrion may assist with communication or review where appropriate but does not guarantee a particular outcome.</P>
            <P>14.5 Organizers remain responsible for fulfilling commitments they make to participants.</P>
          </Sec>

          <Sec id="tc-15" num="15" title="Payments, Fees and Refunds">
            <P>15.1 Certain events or services may involve registration fees, participation fees, subscriptions, or other charges.</P>
            <P>15.2 Any applicable fee must be disclosed to users before they complete the relevant payment or transaction.</P>
            <P>15.3 Payment processing may be handled by third-party payment service providers where such services are introduced.</P>
            <P>15.4 Users must review the applicable payment, cancellation, and refund conditions before making a payment.</P>
            <P>15.5 Refund eligibility, timelines, and procedures may depend on the event organizer, service provider, and applicable refund policy.</P>
            <P>15.6 Hacktrion does not guarantee a refund for payments made directly to an organizer or third party unless Hacktrion has expressly accepted responsibility for that transaction.</P>
            <P>15.7 Hacktrion may introduce separate payment or refund terms for specific services or events.</P>
          </Sec>

          <Sec id="tc-16" num="16" title="Third-Party Services and External Links">
            <P>16.1 Hacktrion may use third-party infrastructure, hosting, authentication, communication, notification, or other service providers to operate the Platform.</P>
            <P>16.2 The Platform may contain links to third-party websites, services, event pages, or resources.</P>
            <P>16.3 Third-party services are governed by their own terms, privacy policies, and operational practices.</P>
            <P>16.4 Hacktrion does not control and is not responsible for the availability, accuracy, security, or content of external services.</P>
            <P>16.5 Users should review the applicable third-party terms before using external services.</P>
          </Sec>

          <Sec id="tc-17" num="17" title="Platform Availability and Changes">
            <P>17.1 Hacktrion aims to maintain reliable Platform access but does not guarantee uninterrupted, error-free, or continuous availability.</P>
            <P>17.2 Access may be interrupted due to maintenance, technical failures, security incidents, infrastructure issues, network problems, or circumstances beyond reasonable control.</P>
            <P>17.3 Hacktrion may modify, suspend, restrict, or discontinue any feature or service where reasonably necessary.</P>
            <P>17.4 Hacktrion may release updates, patches, improvements, or changes to the Platform.</P>
            <P>17.5 Users may be required to install updates or use supported versions to continue accessing certain features.</P>
          </Sec>

          <Sec id="tc-18" num="18" title="Account Suspension and Termination">
            <P>18.1 Hacktrion may suspend, restrict, or terminate an account if:</P>
            <UL items={[
              "The user violates these Terms or the Privacy Policy.",
              "The account is involved in fraud, impersonation, or unlawful activity.",
              "The user attempts unauthorized access or security circumvention.",
              "The account creates a risk to other users, institutions, events, or the Platform.",
              "The user provides materially false or misleading information.",
              "Suspension or termination is required by law or a competent authority.",
            ]} />
            <P>18.2 Where reasonably appropriate, Hacktrion may provide notice or an opportunity to address the violation. However, immediate action may be taken where necessary to protect users, security, legal interests, or Platform operations.</P>
            <P>18.3 Users may stop using Hacktrion at any time.</P>
            <P>18.4 Users may request account deletion by contacting <a href="mailto:support@hacktrion.app" className="pp-link">support@hacktrion.app</a>, subject to the account verification and deletion procedures described in the Privacy Policy.</P>
            <P>18.5 Account suspension or termination does not automatically remove information that Hacktrion is legally required or otherwise permitted to retain.</P>
          </Sec>

          <Sec id="tc-19" num="19" title="Privacy and Personal Information">
            <P>19.1 Your use of Hacktrion is also governed by the Hacktrion Privacy Policy.</P>
            <P>19.2 The Privacy Policy explains the categories of information collected, how information is used, relevant sharing practices, retention, and user rights.</P>
            <P>19.3 By using the Platform, you acknowledge that your information will be processed as described in the Privacy Policy and in accordance with applicable law.</P>
            <P>19.4 Users should avoid sharing sensitive personal information in public profiles, event submissions, or group communications unless necessary and appropriate.</P>
            <P>19.5 For privacy-related questions, requests, or concerns, contact <a href="mailto:support@hacktrion.app" className="pp-link">support@hacktrion.app</a>.</P>
          </Sec>

          <Sec id="tc-20" num="20" title="Disclaimers">
            <P>20.1 Hacktrion is provided on an "as available" basis, subject to applicable law.</P>
            <P>20.2 To the extent permitted by law, Hacktrion does not warrant that the Platform will always be uninterrupted, secure, error-free, or compatible with every device or operating environment.</P>
            <P>20.3 Hacktrion does not guarantee the accuracy, completeness, reliability, or continued availability of event information supplied by organizers or third parties.</P>
            <P>20.4 Hacktrion does not guarantee employment, internships, scholarships, prizes, team placements, admissions, or other professional or academic outcomes.</P>
            <P>20.5 Users participate in events and communicate with other users at their own discretion and risk.</P>
            <P>20.6 Nothing in these Terms excludes any consumer or other statutory rights that cannot lawfully be excluded.</P>
          </Sec>

          <Sec id="tc-21" num="21" title="Limitation of Liability">
            <P>21.1 To the maximum extent permitted by applicable law, Hacktrion and the persons operating the Platform shall not be liable for indirect, incidental, special, exemplary, or consequential losses arising from the use of or inability to use the Platform.</P>
            <P>21.2 This may include loss of data, loss of opportunities, loss of profits, loss of reputation, or disruption of business or academic activities.</P>
            <P>21.3 Hacktrion shall not be responsible for disputes, misconduct, misrepresentations, or failures by event organizers, institutions, participants, or other third parties, except to the extent liability cannot lawfully be excluded.</P>
            <P>21.4 Nothing in this section excludes or limits liability where such exclusion or limitation is prohibited under applicable law.</P>
          </Sec>

          <Sec id="tc-22" num="22" title="Indemnification">
            <P>To the extent permitted by applicable law, you agree to be responsible for losses, claims, liabilities, damages, and reasonable expenses arising from:</P>
            <UL items={[
              "Your violation of these Terms.",
              "Your misuse of the Platform.",
              "Your infringement of another person's intellectual property, privacy, or other legal rights.",
              "Your unlawful or fraudulent activities.",
              "Your User Content or submissions, where they violate applicable rights or laws.",
            ]} />
            <P>This section does not require you to indemnify Hacktrion for losses caused by Hacktrion's own unlawful conduct or liability that cannot legally be transferred to you.</P>
          </Sec>

          <Sec id="tc-23" num="23" title="Governing Law and Jurisdiction">
            <P>23.1 These Terms shall be governed by the laws of India.</P>
            <P>23.2 Subject to mandatory legal requirements and applicable jurisdictional rules, courts having competent jurisdiction in Jaipur, Rajasthan, India, shall have jurisdiction over disputes arising from these Terms.</P>
            <P>23.3 Nothing in this section prevents a user from exercising any legal right to approach a competent authority, consumer forum, or court where permitted by law.</P>
          </Sec>

          <Sec id="tc-24" num="24" title="Changes to These Terms">
            <P>24.1 Hacktrion may update these Terms from time to time to reflect changes in its services, features, legal requirements, or operational practices.</P>
            <P>24.2 Updated Terms will be published on the Platform with a revised "Last Updated" date.</P>
            <P>24.3 Where required by applicable law, Hacktrion will provide appropriate notice or obtain consent for material changes.</P>
            <P>24.4 Continued use of the Platform after updated Terms become effective constitutes acceptance of the revised Terms, to the extent permitted by applicable law.</P>
          </Sec>

          <Sec id="tc-25" num="25" title="Miscellaneous">
            <P><strong>25.1 Severability:</strong> If any provision of these Terms is held invalid or unenforceable, the remaining provisions will continue to apply to the extent legally permissible.</P>
            <P><strong>25.2 No Waiver:</strong> Failure to enforce any provision does not constitute a waiver of that provision or any other right.</P>
            <P><strong>25.3 Entire Agreement:</strong> These Terms, together with the Privacy Policy and any applicable additional policies or event-specific terms, constitute the agreement governing your use of the Platform.</P>
            <P><strong>25.4 Assignment:</strong> Users may not transfer their rights or obligations under these Terms without Hacktrion's prior written permission. Hacktrion may transfer or assign its rights and obligations where legally permissible.</P>
            <P><strong>25.5 Force Majeure:</strong> Hacktrion shall not be responsible for delays or failures caused by circumstances beyond its reasonable control, including natural disasters, internet or network failures, government actions, infrastructure disruptions, or other unforeseen events.</P>
            <P><strong>25.6 Survival:</strong> Provisions which by their nature should continue after account termination or the end of these Terms shall survive, including provisions relating to intellectual property, liability, indemnification, disputes, and applicable legal obligations.</P>
          </Sec>

          <Sec id="tc-26" num="26" title="Contact and Grievance Redressal">
            <P>For questions, complaints, account-related concerns, or grievances regarding the Platform or these Terms, you may contact:</P>
            <div className="pp-contact-block">
              <p><strong>Platform:</strong> Hacktrion</p>
              <p><strong>Operating Brand:</strong> KodepiX</p>
              <p><strong>Grievance Officer:</strong> Chirag</p>
              <p><strong>Email:</strong> <a href="mailto:support@hacktrion.app" className="pp-link">support@hacktrion.app</a></p>
              <p><strong>Website:</strong> <a href="https://hacktrion.app" className="pp-link" target="_blank" rel="noopener noreferrer">https://hacktrion.app</a></p>
            </div>
            <P>Please include sufficient details about your concern so that it can be reviewed and addressed appropriately.</P>
            <P>Hacktrion will handle grievances in accordance with applicable laws and the procedures and timelines applicable to the nature of the complaint.</P>
          </Sec>

          <div className="pp-footer-note">
            <strong>By registering for or using Hacktrion, you acknowledge that you have read and agreed to these Terms of Use.</strong>
          </div>

        </main>
      </div>
    </div>
  );
}
