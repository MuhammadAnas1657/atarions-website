import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import Reveal from "../components/Reveal";
import AmbientBlobs from "../components/AmbientBlobs";
import useReducedMotion from "../hooks/useReducedMotion";

const FIELD_CLASS =
  "w-full rounded-xl border border-white/10 bg-void px-4 py-3 text-sm text-cloud placeholder:text-cloud-dim/60 outline-none transition-colors duration-200 focus:border-electric/60 focus:ring-2 focus:ring-electric/20";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const reduced = useReducedMotion();

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contact" className="relative bg-void py-28 lg:py-36 overflow-hidden">
      <AmbientBlobs opacity={0.18} />
      <div className="relative max-w-3xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center">
          <p className="text-sm font-semibold tracking-widest text-pulse uppercase mb-4">
            Get In Touch
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-cloud">
            Let&rsquo;s build something intelligent
          </h2>
          <p className="mt-4 text-cloud-dim">
            Tell us about your project and we&rsquo;ll get back to you within one business day.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-12">
          <div className="relative rounded-3xl p-[1px] overflow-hidden">
            <motion.div
              animate={
                reduced
                  ? {}
                  : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
              }
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 opacity-70"
              style={{
                background:
                  "linear-gradient(120deg, #6c4ff0, #00e5c7, #3d2c8d, #6c4ff0)",
                backgroundSize: "300% 300%",
              }}
            />
            <div className="relative rounded-3xl border border-white/10 bg-cosmos p-6 sm:p-10">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center py-10"
              >
                <CheckCircle2 className="text-pulse mb-4" size={48} strokeWidth={1.5} />
                <h3 className="font-display text-xl font-semibold text-cloud">Message sent</h3>
                <p className="text-cloud-dim mt-2">Thanks for reaching out — we&rsquo;ll be in touch soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-cloud-dim mb-2">
                    First Name
                  </label>
                  <input id="firstName" name="firstName" type="text" required className={FIELD_CLASS} placeholder="Jordan" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-cloud-dim mb-2">
                    Last Name
                  </label>
                  <input id="lastName" name="lastName" type="text" required className={FIELD_CLASS} placeholder="Lee" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-cloud-dim mb-2">
                    Email
                  </label>
                  <input id="email" name="email" type="email" required className={FIELD_CLASS} placeholder="jordan@company.com" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-cloud-dim mb-2">
                    Phone
                  </label>
                  <input id="phone" name="phone" type="tel" className={FIELD_CLASS} placeholder="+1 (555) 000-0000" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="details" className="block text-sm font-medium text-cloud-dim mb-2">
                    Service Details
                  </label>
                  <textarea
                    id="details"
                    name="details"
                    required
                    rows={4}
                    className={`${FIELD_CLASS} resize-none`}
                    placeholder="Tell us about your project, timeline, and goals..."
                  />
                </div>

                <div className="sm:col-span-2">
                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.94 }}
                    whileHover={{ scale: 1.015 }}
                    transition={{ duration: 0.2 }}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-electric px-6 py-3.5 text-sm font-semibold text-white transition-shadow duration-300 hover:shadow-[0_0_28px_4px_rgba(108,79,240,0.4)]"
                  >
                    Submit
                    <Send size={16} />
                  </motion.button>
                </div>
              </form>
            )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
