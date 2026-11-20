import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import blogs, { type ContentBlock } from "@/data/blogs";

/* ── Static params ── */
export function generateStaticParams() {
  return blogs.map((post) => ({ slug: post.slug }));
}

/* ── Per-post metadata ── */
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = blogs.find((p) => p.slug === slug);
  if (!post) return { title: "Post not found" };
  return { title: post.title, description: post.excerpt };
}

/* ── Content block renderer ── */
function renderBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case "heading":
      return (
        <h2
          key={index}
          className="blog-post-h2 blog-content-animate"
          style={{ "--d": `${200 + index * 60}ms` } as React.CSSProperties}
        >
          {block.text}
        </h2>
      );
    case "paragraph":
      return (
        <p
          key={index}
          className="blog-post-p blog-content-animate"
          style={{ "--d": `${200 + index * 60}ms` } as React.CSSProperties}
        >
          {block.text}
        </p>
      );
    case "list":
      return (
        <ul
          key={index}
          className="blog-post-list blog-content-animate"
          style={{ "--d": `${200 + index * 60}ms` } as React.CSSProperties}
        >
          {block.items.map((item, i) => (
            <li key={i} className="blog-post-list-item">
              <span className="blog-post-list-dot" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}

const categoryColors: Record<string, string> = {
  "For Participants": "bg-accent-soft text-primary",
  "For Organizers":  "bg-surface-hover text-primary",
  "Product":         "bg-surface-secondary text-primary",
};

/* ── Page ── */
export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = blogs.find((p) => p.slug === slug);
  if (!post) { notFound(); return null; }

  const related = blogs
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2);

  const catClass = categoryColors[post.category] ?? "bg-accent-soft text-primary";

  return (
    <main className="min-h-screen bg-background">

      {/* ── POST HERO ── */}
      <div className="blog-post-hero">
        <div className="blog-post-hero-inner">
          {/* Category + meta */}
          <div className="blog-post-hero-meta blog-content-animate" style={{ "--d": "80ms" } as React.CSSProperties}>
            <span className={`blog-category-badge ${catClass}`}>
              {post.category}
            </span>
            <span className="blog-meta-sep" />
            <span className="blog-meta-text">{post.date}</span>
            <span className="blog-meta-sep" />
            <span className="blog-meta-text">{post.readTime}</span>
          </div>

          {/* Title */}
          <h1
            className="blog-post-hero-title blog-content-animate"
            style={{ "--d": "180ms" } as React.CSSProperties}
          >
            {post.title}
          </h1>

          {/* Excerpt */}
          <p
            className="blog-post-hero-excerpt blog-content-animate"
            style={{ "--d": "300ms" } as React.CSSProperties}
          >
            {post.excerpt}
          </p>

          {/* Back breadcrumb */}
          <div
            className="blog-content-animate"
            style={{ "--d": "420ms" } as React.CSSProperties}
          >
            <Link href="/blogs" className="blog-back-link">
              <svg className="blog-back-arrow" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
              </svg>
              Back to all posts
            </Link>
          </div>
        </div>
      </div>

      {/* ── ARTICLE BODY ── */}
      <article className="blog-article-wrap">

        {/* Purple accent line */}
        <div className="blog-article-accent" aria-hidden="true" />

        <div className="blog-post-body">
          {post.content.map((block, i) => renderBlock(block, i))}
        </div>

        {/* Bottom back link */}
        <div className="mt-14 border-t border-border pt-8">
          <Link href="/blogs" className="blog-back-link">
            <svg className="blog-back-arrow" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
            </svg>
            Back to all posts
          </Link>
        </div>
      </article>

      {/* ── RELATED POSTS ── */}
      {related.length > 0 && (
        <section className="border-t border-border bg-surface-secondary">
          <div className="mx-auto max-w-5xl px-6 py-14 sm:px-8">
            <p className="blog-section-label mb-6">MORE IN {post.category.toUpperCase()}</p>
            <div className="blog-grid blog-grid--two">
              {related.map((p, i) => (
                <Link
                  key={p.slug}
                  href={`/blogs/${p.slug}`}
                  className="blog-card group blog-animate"
                  style={{ "--d": `${i * 100}ms` } as React.CSSProperties}
                >
                  <div className="blog-card-meta">
                    <span className={`blog-category-badge ${categoryColors[p.category] ?? "bg-accent-soft text-primary"}`}>
                      {p.category}
                    </span>
                    <span className="blog-meta-text">{p.readTime}</span>
                  </div>
                  <h3 className="blog-card-title group-hover:text-primary">{p.title}</h3>
                  <p className="blog-card-excerpt">{p.excerpt}</p>
                  <div className="blog-card-footer">
                    <span className="blog-meta-text">{p.date}</span>
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
          </div>
        </section>
      )}

    </main>
  );
}
