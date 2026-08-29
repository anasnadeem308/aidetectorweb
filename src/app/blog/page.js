import Link from "next/link";
import PageShell from "../../components/PageShell";
import { getAllPosts, CATEGORIES } from "../../lib/posts";
import { SITE, absoluteUrl } from "../../lib/site";
import { blogSchema, breadcrumbSchema } from "../../lib/schema";

export const metadata = {
  title: "AI Detection Blog — Guides for Students, Writers & Educators",
  description:
    "Clear, honest guides on how AI detectors work, why false positives happen, and how to use AI detection fairly. Written for students, writers, and teachers.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: absoluteUrl("/blog"),
    title: "AI Detection Blog — Guides for Students, Writers & Educators",
    description:
      "Clear, honest guides on how AI detectors work, why false positives happen, and how to use AI detection fairly.",
  },
};

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  const jsonLd = [
    blogSchema(posts),
    breadcrumbSchema([
      { name: "Home", url: absoluteUrl("/") },
      { name: "Blog", url: absoluteUrl("/blog") },
    ]),
  ];

  return (
    <PageShell>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="mx-auto max-w-5xl px-5 py-14 sm:py-20">
        <header className="max-w-2xl">
          <p className="text-eyebrow mb-3 text-brand">The Field Notes</p>
          <h1 className="font-serif text-4xl font-semibold leading-tight text-ink sm:text-5xl text-balance">
            Honest writing about AI detection
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            No fear-mongering, no magic-accuracy claims. Just clear explanations
            of how these tools work, where they fail, and how to use them
            fairly — whether you write, teach, or study.
          </p>
        </header>

        {/* Featured post */}
        <Link
          href={`/blog/${featured.slug}`}
          className="group mt-12 block rounded-2xl border border-line bg-card p-6 transition-colors hover:border-brand/40 sm:p-8"
        >
          <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wide text-muted">
            <span className="rounded-full bg-brand/10 px-3 py-1 text-brand">
              {CATEGORIES[featured.category]}
            </span>
            <span>{formatDate(featured.date)}</span>
            <span aria-hidden="true">·</span>
            <span>{featured.readingMinutes} min read</span>
          </div>
          <h2 className="mt-4 font-serif text-2xl font-semibold text-ink group-hover:text-brand sm:text-3xl text-balance">
            {featured.title}
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">
            {featured.description}
          </p>
          <span className="mt-4 inline-block text-sm font-medium text-brand">
            Read the guide →
          </span>
        </Link>

        {/* Grid of remaining posts */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl border border-line bg-card p-6 transition-colors hover:border-brand/40"
            >
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted">
                <span className="rounded-full bg-paper px-2.5 py-1 text-ink/70">
                  {CATEGORIES[post.category]}
                </span>
                <span>{post.readingMinutes} min</span>
              </div>
              <h3 className="mt-3 font-serif text-xl font-semibold leading-snug text-ink group-hover:text-brand text-balance">
                {post.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {post.description}
              </p>
              <span className="mt-4 text-xs font-medium text-muted">
                {formatDate(post.date)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
