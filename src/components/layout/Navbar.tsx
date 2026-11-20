"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Blogs", href: "/blogs" },
  { name: "Meet the Team", href: "/meet-the-team" },
  { name: "For Organizations", href: "/organizations" },
  { name: "For Participants", href: "/participants" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    const updateScroll = () => setIsScrolled(window.scrollY > 12);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-[100] px-3 pt-3 sm:px-6 sm:pt-5">
      <div
        className={`mx-auto max-w-7xl rounded-2xl border border-violet-100/90 bg-white/95 text-slate-900 backdrop-blur-2xl transition-all duration-300 ease-out ${
          isScrolled
            ? "shadow-[0_8px_32px_rgba(55,25,100,0.13)]"
            : "shadow-[0_5px_24px_rgba(55,25,100,0.08)]"
        }`}
      >
        <nav
          aria-label="Main navigation"
          className={`flex items-center justify-between gap-3 px-4 transition-[padding] duration-300 sm:px-6 ${
            isScrolled ? "py-2" : "py-3"
          }`}
        >
          <Link
            href="/"
            aria-label="Hacktrion home"
            className="group flex shrink-0 items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <Image
              src="/log.png"
              alt="Hacktrion"
              width={42}
              height={42}
              priority
              className="h-9 w-9 object-contain transition-transform duration-300 group-hover:rotate-[-5deg] group-hover:scale-105 sm:h-10 sm:w-10"
            />
            <span className="text-[19px] font-extrabold tracking-[-0.045em] text-[#21143d] sm:text-[21px]">
              Hacktrion<span className="text-primary">.</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 xl:flex">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative whitespace-nowrap rounded-xl px-3 py-2 text-[13px] font-semibold transition-all duration-200 ${
                    active
                      ? "bg-[#f1eaff] text-primary"
                      : "text-slate-600 hover:bg-violet-50 hover:text-primary"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-1 left-3 right-3 h-[2px] origin-left rounded-full bg-primary transition-transform duration-300 ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-2 xl:flex">
            <Link
              href="/contact?topic=participant"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-purple-600 px-4 py-2.5 text-[13px] font-bold text-white shadow-[0_5px_15px_rgba(124,58,237,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(124,58,237,0.3)]"
            >
              Get started <ArrowUpRight size={16} />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-100 bg-violet-50 text-[#39215f] transition-all duration-200 hover:bg-violet-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 xl:hidden"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </nav>

        <div
          id="mobile-navigation"
          aria-hidden={!menuOpen}
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out xl:hidden ${
            menuOpen ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="border-t border-violet-100 px-3 pb-3 pt-2 sm:px-5">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      tabIndex={menuOpen ? 0 : -1}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                        active
                          ? "bg-[#f1eaff] text-primary"
                          : "text-slate-700 hover:bg-violet-50 hover:text-primary"
                      }`}
                    >
                      {link.name}
                      {active && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                    </Link>
                  );
                })}
                <Link
                  href="/contact?topic=participant"
                  tabIndex={menuOpen ? 0 : -1}
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-purple-600 px-5 py-3 text-sm font-bold text-white shadow-[0_5px_15px_rgba(124,58,237,0.2)] transition-transform hover:-translate-y-0.5"
                >
                  Get started <ArrowUpRight size={17} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
