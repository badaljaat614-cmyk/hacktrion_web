"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-svh items-center overflow-hidden hero-background text-white">
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 pt-32 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:pt-20">

        {/* ── LEFT: text ── */}
        <div className="max-w-xl text-center lg:text-left">
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-4xl">
            <span>You host the hackathon. <br /></span>
            <span className="bg-gradient-to-r from-purple-300 to-fuchsia-300 bg-clip-text text-transparent">
              We’ll handle the rest
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-white/70 sm:text-lg lg:mx-0">
            Discover hackathons, bring your ideas to life, and connect with
            people who love building the future.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Link
              href="/participants"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all duration-300 hover:-translate-y-1 hover:bg-primary-hover hover:shadow-xl"
            >
              Explore for participants
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/organizations"
              className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
            >
              I&apos;m an organizer
            </Link>
          </div>
        </div>

        {/* ── RIGHT: single floating image ── */}
        <div className="flex items-center justify-center lg:justify-end">
          <div className="hero-image-float relative h-[300px] w-[290px] sm:h-[300px] sm:w-[340px] lg:h-[380px] lg:w-[650px]">
            <Image
              src="/images/home/image1.png"
              alt="Hacktrion app interface"
              fill
              priority
              sizes="(max-width: 640px) 320px, (max-width: 1024px) 400px, 650px"
              className="object-contain"
            />
          </div>
        </div>

      </div>

      <style jsx>{`
        .hero-image-float {
          animation: heroFloat 5s ease-in-out infinite;
        }

        @keyframes heroFloat {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-image-float {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
