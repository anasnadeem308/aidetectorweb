// JSON-LD structured-data generators. Kept in one place so every page emits
// consistent, valid schema.org markup for rich results.

import { SITE, absoluteUrl } from "./site";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: absoluteUrl("/icon.png"),
    description: SITE.description,
    email: SITE.email,
    sameAs: [`https://twitter.com/${SITE.twitter.replace("@", "")}`],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    inLanguage: "en",
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
  };
}

export function softwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE.name,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    url: SITE.url,
    description: SITE.description,
    browserRequirements: "Requires JavaScript. Runs in any modern browser.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: undefined, // No fabricated ratings — omitted intentionally.
    featureList: [
      "Client-side AI content detection",
      "Burstiness analysis",
      "AI trigger-phrase density",
      "Type-token ratio vocabulary analysis",
      "No sign-up, no data storage",
    ],
  };
}

export function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function blogPostingSchema(post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    author: { "@type": "Organization", name: SITE.author, url: SITE.url },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: absoluteUrl("/icon.png") },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/blog/${post.slug}`),
    },
    url: absoluteUrl(`/blog/${post.slug}`),
    keywords: post.keywords?.join(", "),
    articleSection: post.category,
    inLanguage: "en",
  };
}

export function blogListSchema(posts) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE.name} Blog`,
    url: absoluteUrl("/blog"),
    description:
      "Practical guides on AI content detection, academic integrity, and writing in the age of generative AI.",
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: absoluteUrl(`/blog/${p.slug}`),
      datePublished: p.datePublished,
    })),
  };
}

// Small helper component-free JSON-LD injector data. Consumers stringify.
export function jsonLdScriptProps(schema) {
  return {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(schema) },
  };
}
