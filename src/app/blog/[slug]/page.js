import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "../../../components/PageShell";
import AdSlot from "../../../components/AdSlot";
import { getPost, getAllPosts, CATEGORIES } from "../../../lib/posts";
import { SITE, absoluteUrl } from "../../../lib/site";
import { articleSchema, breadcrumbSchema } from "../../../lib/schema";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }) {
  const post = getPost(params.slug);
  if (!post) return {};
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      images: ["/og.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/og.png"],
    },
  };
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function Block({ block }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-10 font-serif text-2xl font-semibold text-ink text-balance">
          {block.text}
        </h2>
      );
    case "ul":
      return (
        <ul className="mt-4 space-y-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 leading-relaxed text-ink/80">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-brand" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="my-6 border-l-2 border-brand pl-5 font-serif text-xl italic leading-relaxed text-ink">
          {block.text}
        </blockquote>
      );
    default:
      return <p className="mt-4 leading-relaxed text-ink/80">{block.text}</p>;
  }
}

export default function BlogPostPage({ params }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2);
  const fallbackRelated = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);
  const relatedPosts = related.length ? related : fallbackRelated;

  const jsonLd = [
    articleSchema(post),
    breadcrumbSchema([
      { name: "Home", url: absoluteUrl("/") },
      { name: "Blog", url: absoluteUrl("/blog") },
      { name: post.title, url: absoluteUrl(`/blog/${post.slug}`) },
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

      <article className="mx-auto max-w-2xl px-5 py-14 sm:py-20">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
          <Link href="/" className="hover:text-brand">
            Home
          </Link>
          <span aria-hidden="true" className="px-2">/</span>
          <Link href="/blog" className="hover:text-brand">
            Blog
          </Link>
        </nav>

        <header>
          <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wide text-muted">
            <span className="rounded-full bg-brand/10 px-3 py-1 text-brand">
              {CATEGORIES[post.category]}
            </span>
            <span>{post.readingMinutes} min read</span>
          </div>
          <h1 className="mt-4 font-serif text-3xl font-semibold leading-tight text-ink sm:text-4xl text-balance">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            {post.description}
          </p>
          <p className="mt-4 text-sm text-muted">
            Published {formatDate(post.date)}
            {post.updated && post.updated !== post.date
              ? ` · Updated ${formatDate(post.updated)}`
              : ""}{" "}
            · By {SITE.author}
          </p>
        </header>

        <hr className="my-8 border-line" />

        <div className="text-[1.05rem]">
          {post.body.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        <div className="mt-12">
          <AdSlot slot="article-footer" format="horizontal" />
        </div>

        {/* Related posts */}
        <section className="mt-14 border-t border-line pt-10">
          <h2 className="font-serif text-xl font-semibold text-ink">
            Keep reading
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {relatedPosts.map((rp) => (
              <Link
                key={rp.slug}
                href={`/blog/${rp.slug}`}
                className="group rounded-xl border border-line bg-card p-5 transition-colors hover:border-brand/40"
              >
                <h3 className="font-serif text-lg font-semibold leading-snug text-ink group-hover:text-brand text-balance">
                  {rp.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-3">
                  {rp.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Back-to-tool CTA */}
        <div className="mt-12 rounded-2xl border border-brand/20 bg-brand/[0.04] p-6 text-center">
          <h2 className="font-serif text-xl font-semibold text-ink">
            Try the free AI detector
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
            Runs entirely in your browser. Nothing you paste is uploaded or
            stored — and every score comes with a plain-language explanation.
          </p>
          <Link
            href="/"
            className="mt-4 inline-flex items-center justify-center rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand-dark"
          >
            Open the detector
          </Link>
        </div>
      </article>
    </PageShell>
  );
}
