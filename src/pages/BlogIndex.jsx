import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Seo from "../components/Seo";
import Navbar from "../navigation/Navbar";
import Footer from "../navigation/Footer";
import Reveal from "../components/Reveal";
import AmbientBlobs from "../components/AmbientBlobs";
import useReducedMotion from "../hooks/useReducedMotion";
import { POSTS } from "../data/blogPosts";

const gridContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogIndex() {
  const reduced = useReducedMotion();
  const [featured, ...rest] = POSTS;

  return (
    <div className="bg-void">
      <Seo
        title="Blog"
        description="Notes from the Atarion Solutions team on data, AI, and software engineering — the details we've learned matter once a project leaves the whiteboard."
        path="/blog"
      />
      <Navbar />
      <main>
        <section className="relative bg-void pt-40 pb-20 lg:pt-48 lg:pb-24 overflow-hidden">
          <AmbientBlobs />
          <div className="relative max-w-3xl mx-auto px-6 lg:px-10 text-center">
            <Reveal>
              <p className="text-sm font-semibold tracking-widest text-pulse uppercase mb-4">
                The Atarion Blog
              </p>
              <h1 className="font-display text-4xl sm:text-6xl font-semibold tracking-tight text-cloud">
                Ideas worth building on
              </h1>
              <p className="mt-6 text-lg text-cloud-dim leading-relaxed">
                Notes from the team on data, AI, and software engineering — the details we've
                learned matter once a project leaves the whiteboard.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="relative bg-cosmos py-20 lg:py-28 overflow-hidden">
          <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
            {featured && (
              <Reveal>
                <Link
                  to={`/blog/${featured.slug}`}
                  className="group grid md:grid-cols-2 rounded-3xl border border-white/10 bg-void overflow-hidden block transition-shadow duration-300 hover:shadow-[0_20px_55px_-15px_rgba(108,79,240,0.4)] hover:border-electric/30"
                >
                  <div className={`relative h-64 md:h-auto bg-gradient-to-br ${featured.gradient} overflow-hidden`}>
                    <motion.div
                      animate={reduced ? {} : { backgroundPosition: ["0px 0px", "28px 28px"] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                      className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-110 [background-image:radial-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:14px_14px]"
                    />
                  </div>
                  <div className="p-8 lg:p-10 flex flex-col justify-center">
                    <p className="text-xs font-semibold tracking-widest text-pulse uppercase mb-3">
                      Featured &middot; {featured.tag}
                    </p>
                    <h2 className="font-display text-2xl lg:text-3xl font-semibold text-cloud leading-snug">
                      {featured.title}
                    </h2>
                    <p className="mt-4 text-sm text-cloud-dim leading-relaxed">{featured.excerpt}</p>
                    <div className="mt-6 flex items-center gap-4 text-xs text-cloud-dim">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar size={13} /> {formatDate(featured.date)}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock size={13} /> {featured.readTime}
                      </span>
                    </div>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-pulse">
                      Read article
                      <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            )}

            <motion.div
              variants={gridContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {rest.map(({ slug, title, tag, excerpt, gradient, date, readTime }, i) => (
                <motion.div key={slug} variants={cardVariant}>
                  <Link
                    to={`/blog/${slug}`}
                    className="group h-full rounded-3xl border border-white/10 bg-void overflow-hidden flex flex-col transition-shadow duration-300 hover:shadow-[0_20px_55px_-15px_rgba(108,79,240,0.4)] hover:border-electric/30"
                  >
                    <div className={`relative h-40 bg-gradient-to-br ${gradient} overflow-hidden`}>
                      <motion.div
                        animate={reduced ? {} : { backgroundPosition: ["0px 0px", "28px 28px"] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: i * 0.4 }}
                        className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-110 [background-image:radial-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:14px_14px]"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <p className="text-xs font-semibold tracking-widest text-pulse uppercase mb-2">{tag}</p>
                      <h3 className="font-display text-lg font-semibold text-cloud leading-snug">{title}</h3>
                      <p className="mt-3 text-sm text-cloud-dim leading-relaxed flex-1">{excerpt}</p>
                      <div className="mt-5 flex items-center justify-between">
                        <span className="text-xs text-cloud-dim">{formatDate(date)}</span>
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-cloud-dim transition-colors group-hover:text-pulse">
                          Read
                          <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
