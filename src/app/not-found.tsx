import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-background px-6 py-24 text-center text-text-primary">
      <div className="max-w-xl">
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-primary"><Compass size={26} /></span>
        <p className="mt-6 text-sm font-semibold tracking-[0.18em] text-primary">ERROR 404</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">This page went off the map.</h1>
        <p className="mt-4 leading-7 text-text-secondary">The link may be outdated, or the page may have moved. Head back to Hacktrion and continue exploring.</p>
        <Link href="/" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-white shadow-[var(--shadow-button)] transition hover:-translate-y-0.5 hover:bg-primary-hover"><ArrowLeft size={17} /> Back to home</Link>
      </div>
    </main>
  );
}
