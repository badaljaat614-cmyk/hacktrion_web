import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowUpRight, Heart } from "lucide-react";
import { SiInstagram, SiGithub, SiYoutube, SiX } from "react-icons/si";

/* ── nav data ── */
const exploreLinks = [
  { label: "For Organizations", href: "/organizations" },
  { label: "For Participants", href: "/participants" },
  { label: "Blogs", href: "/blogs" },
];

const companyLinks = [
  { label: "About Hacktrion", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];

const socialLinks: Array<{
  label: string;
  href: string;
  Icon?: React.ComponentType<{ size?: number }>;
}> = [
  { label: "Instagram", href: "https://www.instagram.com/hacktrion_official/", Icon: SiInstagram },
  { label: "LinkedIn",  href: "https://www.linkedin.com/company/hacktrion/"   /* Icon coming soon */ },
  { label: "GitHub",    href: "https://github.com/hacktrion",                   Icon: SiGithub    },
  { label: "YouTube",   href: "https://www.youtube.com/@hacktrion",             Icon: SiYoutube   },
  { label: "X",         href: "https://x.com/hacktrion",                        Icon: SiX         },
];

function NavLink({ label, href }: { label: string; href: string }) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto");
  return (
    <Link
      href={href}
      className="footer-link"
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {label}
      <ArrowUpRight size={12} className="footer-link-icon" aria-hidden="true" />
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">

        {/* gradient rule at the very top */}
        <div className="footer-topline" aria-hidden="true" />

        {/* ── MAIN GRID ── */}
        <div className="footer-main">

          {/* brand */}
          <div className="footer-brand">

            {/* Logo lockup */}
            <Link href="/" className="footer-logo-lockup" aria-label="Hacktrion home">
              <Image
                src="/team/Team logo.jpeg"
                alt="KodePix — Hacktrion building team"
                width={36}
                height={36}
                className="footer-team-logo"
              />
              <span className="footer-wordmark">
                Hacktrion<span>.</span>
              </span>
            </Link>

            <p className="footer-tagline">A product by KodePix</p>

            <p className="footer-description">
              Hacktrion connects hackathon organizers and participants on one
              platform. Create, discover, and manage hackathons — all in one place.
            </p>

            <a href="mailto:support@hacktrion.app" className="footer-email">
              <Mail size={15} aria-hidden="true" />
              support@hacktrion.app
            </a>

          </div>

          {/* explore */}
          <div className="footer-column">
            <h3 className="footer-col-heading">Explore</h3>
            {exploreLinks.map((l) => <NavLink key={l.label} {...l} />)}
          </div>

          {/* company */}
          <div className="footer-column">
            <h3 className="footer-col-heading">Company</h3>
            {companyLinks.map((l) => <NavLink key={l.label} {...l} />)}
          </div>

          {/* legal */}
          <div className="footer-column">
            <h3 className="footer-col-heading">Legal</h3>
            {legalLinks.map((l) => <NavLink key={l.label} {...l} />)}
          </div>

        </div>

        {/* ── SOCIAL ROW ── */}
        <div className="footer-social-row">
          <div className="footer-social-left">
            <span className="footer-social-heading">Stay Connected</span>
            <span className="footer-social-sub">
              Follow Hacktrion for updates and opportunities.
            </span>
          </div>

          <div className="footer-social-links">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Hacktrion on ${label}`}
                className="footer-social-icon"
              >
                {Icon ? (
                  <Icon size={16} />
                ) : (
                  <span className="footer-social-placeholder">in</span>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p>© 2026 KodePix. All rights reserved.</p>
            <p>
              <span>Hacktrion is a product of KodePix.</span>
            </p>
          </div>

          <p className="footer-made-with">
            Built with <Heart size={12} aria-hidden="true" /> for innovators
          </p>
        </div>

      </div>
    </footer>
  );
}
