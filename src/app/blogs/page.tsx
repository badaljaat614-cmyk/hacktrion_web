import type { Metadata } from "next";
import Link from "next/link";
import blogs from "@/data/blogs";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights, guides, and updates from Hacktrion — for hackathon participants and organizers.",
};

const categoryColors: Record<string, string> = {
  "For Participants": "bg-accent-soft text-primary",
  "For Organizers":  "bg-surface-hover text-primary",
  "Product":         "bg-surface-secondary text-primary",
};

function categoryClass(cat: string) {
  return categoryColors[cat] ?? "bg-accent-soft text-primary";
}

export default function BlogsPage() {
  const [featured, ...rest] = blogs;

  return (
    <main className="min-h-screen bg-background">

      {/* ── HERO — full 100vh with blog/hero.png background ── */}
      <section
        className="blog-hero"
        style={{ backgroundImage: "url('/images/blog/bloghero.png')" }}
        aria-label="Blog hero"
      >
        {/* dark overlay */}
        <div className="blog-hero-overlay" aria-hidden="true" />

        {/* text — horizontally centred, 50px below navbar */}
        <div className="blog-hero-content">
          <h1 className="blog-hero-heading">Let&apos;s read Blogs!!!</h1>
        </div>
      </section>

      {/* ── LISTING ── */}
      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8 sm:py-20">

        {/* Featured */}
        {featured && (
          <div className="blog-animate mb-14" style={{ "--d": "0ms" } as React.CSSProperties}>
            <p className="blog-section-label mb-4">FEATURED</p>
            <Link href={`/blogs/${featured.slug}`} className="blog-featured-card group">
              <div className="blog-featured-meta">
                <span className={`blog-category-badge ${categoryClass(featured.category)}`}>
                  {featured.category}
                </span>
                <span className="blog-meta-sep" />
                <span className="blog-meta-text">{featured.date}</span>
                <span className="blog-meta-sep" />
                <span className="blog-meta-text">{featured.readTime}</span>
              </div>
              <h2 className="blog-featured-title group-hover:text-primary">
                {featured.title}
              </h2>
              <p className="blog-featured-excerpt">{featured.excerpt}</p>
              <span className="blog-read-link">
                Read article
                <svg className="blog-read-arrow" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
          </div>
        )}

        {/* All posts grid */}
        {rest.length > 0 && (
          <>
            <p className="blog-section-label mb-6">ALL POSTS</p>
            <div className="blog-grid">
              {rest.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/blogs/${post.slug}`}
                  className="blog-card group blog-animate"
                  style={{ "--d": `${i * 80}ms` } as React.CSSProperties}
                >
                  <div className="blog-card-meta">
                    <span className={`blog-category-badge ${categoryClass(post.category)}`}>
                      {post.category}
                    </span>
                    <span className="blog-meta-text">{post.readTime}</span>
                  </div>
                  <h3 className="blog-card-title group-hover:text-primary">{post.title}</h3>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <div className="blog-card-footer">
                    <span className="blog-meta-text">{post.date}</span>
                    <span className="blog-read-link blog-read-link--small">
                      Read
                      <svg className="blog-read-arrow blog-read-arrow--sm" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

      </div>
    </main>
  );
}
