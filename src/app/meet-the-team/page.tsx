import type { Metadata } from "next";
import { ArrowUpRight, Code2, Palette, FlaskConical, Crown, Users2 } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = { title: "Meet the Team", description: "Meet the people building Hacktrion." };
const groups = [
  { title: "UI Developers", subtitle: "Making every interaction feel clear and intuitive.", icon: Palette, people: ["Chirag", "Chaman", "Manish", "Shubham"] },
  { title: "Website Developers", subtitle: "Building the platform that brings the Hacktrion experience together.", icon: Code2, people: ["Vijay Jangid", "Sameer Jagrwal"] },
  { title: "Research & Development", subtitle: "Exploring ideas, solving problems, and shaping what comes next.", icon: FlaskConical, people: ["Vishal", "Vivek", "Ajay", "Vijay Verma"] },
];
const initials = (name: string) => name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();

export default function MeetTheTeamPage() {
  return (
    <main className="team-page min-h-screen overflow-hidden bg-background pb-24 pt-32 text-text-primary sm:pt-40">
      <section className="team-hero relative mx-auto max-w-7xl px-5 pb-16 text-center sm:px-8 sm:pb-24">
        <div className="team-orb team-orb-one" /><div className="team-orb team-orb-two" />
        <span className="team-reveal relative inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-4 py-2 text-xs font-bold tracking-[.18em] text-primary shadow-sm backdrop-blur"><Users2 size={15} /> THE PEOPLE BEHIND HACKTRION</span>
        <h1 className="team-reveal relative mx-auto mt-7 max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">Built by people who <span className="bg-gradient-to-r from-primary to-fuchsia-500 bg-clip-text text-transparent">love to build.</span></h1>
        <p className="team-reveal relative mx-auto mt-6 max-w-2xl text-base leading-8 text-text-secondary sm:text-lg">A team of curious minds, creative thinkers, and builders working together to make hackathons easier to discover, host, and experience.</p>
      </section>
      <section className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="team-reveal mb-5 flex items-center gap-3"><span className="h-px flex-1 bg-border" /><span className="text-xs font-bold tracking-[.2em] text-text-muted">LEADERSHIP</span><span className="h-px flex-1 bg-border" /></div>
        <article className="team-founder team-reveal group relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-primary/20 bg-gradient-to-br from-[#17102f] via-[#28134e] to-[#5422a0] p-7 text-white shadow-[0_25px_80px_rgba(82,36,150,.2)] sm:p-10">
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border border-white/10 transition-transform duration-700 group-hover:scale-110" /><div className="pointer-events-none absolute -right-8 -top-12 h-52 w-52 rounded-full bg-fuchsia-400/15 blur-3xl" />
          <div className="relative flex flex-col gap-7 sm:flex-row sm:items-center"><div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[1.8rem] border border-white/20 bg-white/10 text-3xl font-extrabold tracking-tight shadow-inner backdrop-blur sm:h-28 sm:w-28">B</div><div><div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-bold tracking-[.16em] text-purple-100"><Crown size={13} /> FOUNDER</div><h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Badal</h2><p className="mt-2 text-sm font-semibold text-purple-200">Founder &amp; App Developer</p><p className="mt-4 max-w-xl text-sm leading-7 text-white/75">Driving the vision and building the product behind Hacktrion.</p></div></div>
        </article>
        <div className="team-reveal mb-5 mt-20 flex items-center gap-3"><span className="h-px flex-1 bg-border" /><span className="text-xs font-bold tracking-[.2em] text-text-muted">THE CREW</span><span className="h-px flex-1 bg-border" /></div>
        <div className="grid gap-6 lg:grid-cols-3">{groups.map(({ title, subtitle, icon: Icon, people }, groupIndex) => <section key={title} className="team-reveal rounded-[1.8rem] border border-border bg-white/85 p-5 shadow-[var(--shadow-card)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_18px_45px_rgba(91,33,182,.12)] sm:p-6" style={{ animationDelay: `${groupIndex * 120}ms` }}><div className="flex items-center gap-3"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-primary"><Icon size={22} /></span><div><h2 className="text-lg font-bold">{title}</h2><p className="mt-0.5 text-xs text-text-muted">{people.length} team members</p></div></div><p className="mt-4 min-h-[48px] text-sm leading-6 text-text-secondary">{subtitle}</p><div className="mt-5 space-y-2">{people.map((person, index) => <div key={person} className="group/member flex items-center gap-3 rounded-2xl border border-transparent bg-[#faf8ff] px-3 py-3 transition-all duration-200 hover:border-primary/15 hover:bg-accent-soft/60"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-fuchsia-500 text-xs font-bold text-white shadow-sm transition-transform duration-200 group-hover/member:rotate-3 group-hover/member:scale-105">{initials(person)}</span><span className="text-sm font-semibold text-text-primary">{person}</span><span className="ml-auto text-xs text-text-muted">{String(index + 1).padStart(2, "0")}</span></div>)}</div></section>)}</div>
        <div className="team-reveal mt-16 rounded-[2rem] border border-border bg-gradient-to-r from-accent-soft/80 via-white to-white p-7 text-center sm:p-10"><p className="text-xs font-bold tracking-[.2em] text-primary">BUILD WITH US</p><h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Have an idea? Let&apos;s make it happen.</h2><p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-text-secondary">We&apos;re always excited to connect with people who want to make the hackathon ecosystem better.</p><Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-button)] transition-all duration-200 hover:-translate-y-1 hover:bg-primary-hover">Get in touch <ArrowUpRight size={16} /></Link></div>
      </section>
    </main>
  );
}
