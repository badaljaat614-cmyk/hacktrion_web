import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass, Lightbulb, Users, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About Hacktrion",
  description: "Learn how Hacktrion helps students discover hackathons and helps organizers manage events.",
};

const audiences = [
  { icon: Users, title: "For participants", text: "Discover hackathons, explore opportunities, connect with teammates, and take part in events." },
  { icon: Building2, title: "For organizers", text: "Publish events, organize registrations, and keep participant information together." },
  { icon: Lightbulb, title: "For builders", text: "Turn ideas into projects, learn by building, and share what you create." },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background pb-20 pt-36 text-text-primary sm:pt-40">
      <section className="mx-auto max-w-5xl px-6 sm:px-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-accent-soft px-4 py-2 text-sm font-semibold text-primary">
          <Compass size={16} /> ABOUT HACKTRION
        </div>
        <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          Make it easier to <span className="text-primary">find, host, and build</span> at hackathons.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-text-secondary">
          Hacktrion brings hackathon participants and organizers together. It is designed to make event discovery and event coordination clearer, so people can spend less time managing scattered information and more time building.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {audiences.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-3xl border border-border bg-white p-6 shadow-[var(--shadow-card)]">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-primary"><Icon size={22} /></span>
              <h2 className="mt-5 text-xl font-bold">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-text-secondary">{text}</p>
            </article>
          ))}
        </div>
        <div className="mt-12 rounded-3xl bg-gradient-to-br from-primary to-accent p-8 text-white sm:p-10">
          <p className="text-sm font-semibold tracking-[0.16em] text-white/70">OUR FOCUS</p>
          <h2 className="mt-3 text-3xl font-bold">Less coordination overhead. More making.</h2>
          <p className="mt-4 max-w-2xl leading-7 text-white/80">Whether you are looking for your next event or planning one for your community, Hacktrion aims to keep the important information and workflows in one place.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/participants" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-primary transition hover:-translate-y-0.5">For participants <ArrowRight size={16} /></Link>
            <Link href="/organizations" className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3 font-semibold text-white transition hover:bg-white/10">For organizers <ArrowRight size={16} /></Link>
          </div>
        </div>
        <p className="mt-8 text-sm text-text-muted">Hacktrion is a product operated under the KodePix brand.</p>
      </section>
    </main>
  );
}
