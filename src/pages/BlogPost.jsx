import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import Seo from "../components/Seo";
import Navbar from "../navigation/Navbar";
import Footer from "../navigation/Footer";
import Reveal from "../components/Reveal";
import useReducedMotion from "../hooks/useReducedMotion";
import { POSTS, getPostBySlug } from "../data/blogPosts";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (post) window.scrollTo({ top: 0 });
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="bg-void">
      <Seo
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        type="article"
        publishedTime={post.date}
        author={post.author}
      />
      <Navbar />
      <main>
        <article>
          <section className="relative bg-void pt-36 pb-14 lg:pt-44 lg:pb-16 overflow-hidden">
            <div className="relative max-w-3xl mx-auto px-6 lg:px-10">
              <Reveal>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-cloud-dim hover:text-pulse transition-colors"
                >
                  <ArrowLeft size={15} />
                  All articles
                </Link>

                <p className="mt-8 text-sm font-semibold tracking-widest text-pulse uppercase">
                  {post.tag}
                </p>
                <h1 className="mt-4 font-display text-3xl sm:text-5xl font-semibold tracking-tight text-cloud leading-tight">
                  {post.title}
                </h1>

                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-cloud-dim">
                  <span>{post.author}</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar size={14} /> {formatDate(post.date)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={14} /> {post.readTime}
                  </span>
                </div>
              </Reveal>
            </div>
          </section>

          <div className="relative max-w-3xl mx-auto px-6 lg:px-10">
            <div className={`relative h-56 sm:h-72 rounded-3xl bg-gradient-to-br ${post.gradient} overflow-hidden`}>
              <motion.div
                animate={reduced ? {} : { backgroundPosition: ["0px 0px", "28px 28px"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="w-full h-full [background-image:radial-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:14px_14px]"
              />
            </div>
          </div>

          <section className="relative bg-void py-16 lg:py-20">
            <div className="relative max-w-3xl mx-auto px-6 lg:px-10">
              <Reveal>
                <div className="space-y-6">
                  {post.content.map((paragraph, i) => (
                    <p key={i} className="text-base sm:text-lg text-cloud-dim leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>
        </article>

        {related.length > 0 && (
          <section className="relative bg-cosmos py-20 lg:py-24 overflow-hidden">
            <div className="relative max-w-5xl mx-auto px-6 lg:px-10">
              <Reveal>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-cloud mb-10">
                  More from the blog
                </h2>
              </Reveal>
              <div className="grid sm:grid-cols-2 gap-6">
                {related.map(({ slug, title, tag, excerpt, gradient }) => (
                  <Link
                    key={slug}
                    to={`/blog/${slug}`}
                    className="group rounded-3xl border border-white/10 bg-void overflow-hidden block transition-shadow duration-300 hover:shadow-[0_20px_55px_-15px_rgba(108,79,240,0.4)] hover:border-electric/30"
                  >
                    <div className={`h-36 bg-gradient-to-br ${gradient}`} />
                    <div className="p-6">
                      <p className="text-xs font-semibold tracking-widest text-pulse uppercase mb-2">{tag}</p>
                      <h3 className="font-display text-lg font-semibold text-cloud leading-snug">{title}</h3>
                      <p className="mt-3 text-sm text-cloud-dim leading-relaxed">{excerpt}</p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-cloud-dim transition-colors group-hover:text-pulse">
                        Read more
                        <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
