import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import useReducedMotion from "../hooks/useReducedMotion";

const STATS = [
  { value: 5, suffix: "+", label: "Years of Innovation", color: "#6c4ff0" },
  { value: 40, suffix: "+", label: "Products Shipped", color: "#00e5c7" },
  { value: 15, suffix: "+", label: "Industries Served", color: "#6c4ff0" },
  { value: 6, suffix: "", label: "Core Disciplines", color: "#00e5c7" },
  { value: 98, suffix: "%", label: "Client Satisfaction", color: "#6c4ff0" },
];

const CLIENTS = [
  "Verdant Logistics",
  "Northbeam Health",
  "Kairo Retail",
  "Meridian Capital",
  "Lumen Analytics",
  "Solace Health",
  "Brightline Retail",
  "Vantage Robotics",
];

function CountUp({ target, suffix, inView, reduced }) {
  const [value, setValue] = useState(reduced ? target : 0);

  useEffect(() => {
    if (!inView || reduced) return;
    let raf;
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, target]);

  return (
    <span>
      {value}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section className="relative bg-cosmos border-y border-white/5 py-14 lg:py-16 overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-10">
          <div
            className="hidden lg:block absolute top-2 left-0 right-0 h-px bg-white/10"
            aria-hidden="true"
          />
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col items-center text-center"
            >
              <motion.span
                animate={
                  reduced
                    ? {}
                    : { scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }
                }
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                className="w-2 h-2 rounded-full mb-3"
                style={{ backgroundColor: stat.color }}
              />
              <span className="font-display text-3xl sm:text-4xl font-bold text-cloud">
                <CountUp target={stat.value} suffix={stat.suffix} inView={inView} reduced={reduced} />
              </span>
              <span className="mt-2 text-[11px] tracking-[0.15em] uppercase text-cloud-dim">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 pt-10 border-t border-white/5">
          <p className="text-center text-xs tracking-[0.2em] uppercase text-cloud-dim mb-6">
            Trusted by teams across healthcare · finance · retail · robotics
          </p>
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div
              className={`flex gap-12 w-max ${reduced ? "" : "animate-[marquee_28s_linear_infinite]"}`}
            >
              {[...CLIENTS, ...CLIENTS].map((name, i) => (
                <span
                  key={i}
                  className="shrink-0 font-display text-lg font-semibold text-cloud-dim/50 whitespace-nowrap"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
