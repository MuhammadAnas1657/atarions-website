import { Helmet } from "react-helmet-async";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE, TWITTER_HANDLE } from "../data/siteConfig";

export default function Seo({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  type = "website",
  publishedTime,
  author,
  noIndex = false,
}) {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Intelligent Digital Solutions`;
  const url = `${SITE_URL}${path}`;
  const absoluteImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={absoluteImage} />
      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === "article" && author && <meta property="article:author" content={author} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
      {TWITTER_HANDLE && <meta name="twitter:site" content={TWITTER_HANDLE} />}
    </Helmet>
  );
}
