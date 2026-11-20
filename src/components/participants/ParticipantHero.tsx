"use client";
import Image from "next/image";
import { ArrowRight, Smartphone } from "lucide-react";
import Link from "next/link";

export default function ParticipantHero() {
  return (
    <section
      className="relative isolate flex min-h-svh items-center overflow-hidden text-white"
      style={{
        backgroundImage: "url('/images/participants/hero/hero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Black overlay with 0.7 alpha */}
      <div className="absolute inset-0 z-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 pt-32 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:pt-20">
        {/* LEFT: Text content */}
        <div className="max-w-xl text-center lg:text-left">
          {/* Eyebrow */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-300/20 bg-purple-400/10 px-4 py-2 text-sm text-purple-200">
            <Smartphone size={16} />
            <span>FOR HACKATHON PARTICIPANTS</span>
          </div>

          {/* Heading - Only 2 lines */}
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-4xl">
            <span>
               Come Find & Participate <br />
            </span>
            <span className="bg-gradient-to-r from-purple-300 to-fuchsia-300 bg-clip-text text-transparent">
              Build Something Amazing
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-white/70 sm:text-lg lg:mx-0">
            Explore hackathons, discover opportunities that match your
            interests.
          </p>

          {/* CTA buttons */}
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Link
              href="/contact?topic=participant"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/40 transition-all hover:scale-105 hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/50"
            >
              Get started
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href="#participant-how-it-works"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/10"
            >
              How It Works
            </a>
          </div>
        </div>

        {/* RIGHT: Hero image - Same size as home page */}
        {/* <div className="flex items-center justify-center lg:justify-end">
          <div className="hero-image-float relative h-[300px] w-[290px] sm:h-[300px] sm:w-[340px] lg:h-[380px] lg:w-[650px]">
            <Image
              src="/images/hero.png"
              alt="Hacktrion participant illustration"
              fill
              priority
              sizes="(max-width: 640px) 320px, (max-width: 1024px) 400px, 650px"
              className="object-contain"
            />
          </div>
        </div> */}
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
