import type { Metadata } from "next";
import { Mail, MessageCircle, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Hacktrion",
  description: "Get in touch with the Hacktrion team for support, organizer enquiries, or feedback.",
};

const topics = [
  { title: "Account or platform support", description: "Help with access, account settings, or using Hacktrion." },
  { title: "Organizing a hackathon", description: "Questions from colleges, institutions, and event organizers." },
  { title: "Feedback and partnerships", description: "Share suggestions, report an issue, or discuss working together." },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background px-6 pb-20 pt-36 text-text-primary sm:px-8 sm:pt-40">
      <div className="mx-auto max-w-5xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-accent-soft px-4 py-2 text-sm font-semibold text-primary"><MessageCircle size={16} /> GET IN TOUCH</div>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">Let&apos;s talk.</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-text-secondary">Have a question, need help, or want to bring an event to Hacktrion? Send the team an email and include enough detail for us to help.</p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {topics.map((topic) => <article key={topic.title} className="rounded-2xl border border-border bg-white p-6"><h2 className="font-bold">{topic.title}</h2><p className="mt-2 text-sm leading-6 text-text-secondary">{topic.description}</p></article>)}
        </div>
        <section className="mt-8 flex flex-col justify-between gap-6 rounded-3xl border border-border bg-white p-7 shadow-[var(--shadow-card)] sm:flex-row sm:items-center sm:p-9">
          <div><span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-primary"><Mail size={22} /></span><h2 className="mt-4 text-2xl font-bold">Email the Hacktrion team</h2><p className="mt-2 text-text-secondary">For support and general enquiries.</p><a className="mt-3 inline-block font-semibold text-primary hover:underline" href="mailto:support@hacktrion.app">support@hacktrion.app</a></div>
          <a href="mailto:support@hacktrion.app?subject=Hello%20Hacktrion" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-white shadow-[var(--shadow-button)] transition hover:-translate-y-0.5 hover:bg-primary-hover">Write an email <ArrowUpRight size={17} /></a>
        </section>
        <p className="mt-6 text-sm text-text-muted">When reporting a problem, include the page or feature involved and the steps that led to it. Do not email passwords or other sensitive login credentials.</p>
      </div>
    </main>
  );
}
