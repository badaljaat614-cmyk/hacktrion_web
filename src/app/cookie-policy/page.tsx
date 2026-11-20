import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Information about cookies and similar technologies when using Hacktrion.",
};

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-background px-6 pb-20 pt-36 text-text-primary sm:px-8 sm:pt-40">
      <article className="mx-auto max-w-4xl rounded-3xl border border-border bg-white p-7 shadow-[var(--shadow-card)] sm:p-12">
        <p className="text-sm font-semibold tracking-[0.16em] text-primary">LEGAL</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Cookie Policy</h1>
        <p className="mt-4 text-sm text-text-muted">Last updated: 19 November 2026</p>
        <div className="mt-10 space-y-8 text-[15px] leading-8 text-text-secondary">
          <section><h2 className="text-xl font-bold text-text-primary">1. What are cookies?</h2><p className="mt-2">Cookies are small text files that a website may store on your browser or device. Similar technologies can be used to remember preferences, support sessions, and understand how a service is used.</p></section>
          <section><h2 className="text-xl font-bold text-text-primary">2. How Hacktrion may use them</h2><p className="mt-2">Hacktrion may use strictly necessary cookies or similar browser storage where required for website operation, security, navigation, or remembering a preference. We will update this policy with the provider, purpose, and available controls before enabling optional analytics, advertising, or personalization technologies. This policy does not claim that a particular analytics or advertising provider is currently active.</p></section>
          <section><h2 className="text-xl font-bold text-text-primary">3. Managing cookies</h2><p className="mt-2">Most browsers let you review, block, or delete cookies through their privacy or site-settings controls. Blocking necessary storage may affect some website functionality. The available controls and their names depend on your browser and device.</p></section>
          <section><h2 className="text-xl font-bold text-text-primary">4. Third-party services</h2><p className="mt-2">If a page links to an external website or embeds third-party content, that provider may apply its own cookies and privacy practices. Review the provider&apos;s policy before using that service.</p></section>
          <section><h2 className="text-xl font-bold text-text-primary">5. Changes and contact</h2><p className="mt-2">We may update this policy when website functionality or applicable requirements change. For questions, contact <a className="font-semibold text-primary hover:underline" href="mailto:support@hacktrion.app">support@hacktrion.app</a> or visit our <Link className="font-semibold text-primary hover:underline" href="/privacy-policy">Privacy Policy</Link>.</p></section>
        </div>
      </article>
    </main>
  );
}
