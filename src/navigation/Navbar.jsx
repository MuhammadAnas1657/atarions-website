import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = ["Home", "About", "Services", "Projects", "Team", "Blogs", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-void/85 backdrop-blur-lg shadow-[0_4px_30px_rgba(0,0,0,0.4)] border-b border-white/5"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 h-18 py-4">
        <a href="#home" className="font-display text-xl font-semibold tracking-tight text-cloud">
          Atarion<span className="text-pulse">.</span>
        </a>

        <ul className="hidden md:flex items-center gap-8 font-medium text-sm text-cloud-dim">
          {LINKS.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="relative py-1 transition-colors hover:text-cloud after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-pulse after:transition-all after:duration-300 hover:after:w-full"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center rounded-full bg-electric px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_0_0_rgba(108,79,240,0.5)] transition-all duration-300 hover:shadow-[0_0_24px_2px_rgba(108,79,240,0.5)] hover:bg-electric/90"
        >
          Get in Touch
        </a>

        <button
          className="md:hidden text-cloud"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden bg-void/95 backdrop-blur-lg border-b border-white/5"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {LINKS.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    className="block py-2.5 text-cloud-dim hover:text-cloud transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
