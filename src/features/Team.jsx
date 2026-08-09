import { motion } from "framer-motion";
import Reveal from "../components/Reveal";
import { LinkedinIcon, TwitterIcon } from "../components/SocialIcons";
import anasPhoto from "../assets/team/anas.png";
import hammadPhoto from "../assets/team/hammad.png";

// Clean placeholder headshots (gradient + silhouette) as inline SVG data
// URIs — no watermarks, self-contained. Each `photo` value is a plain
// <img src>, so real headshots can be dropped in later without touching
// the markup.
function placeholderPhoto(seed, from, to) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240">
    <defs>
      <linearGradient id="g${seed}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${from}"/>
        <stop offset="100%" stop-color="${to}"/>
      </linearGradient>
    </defs>
    <rect width="240" height="240" fill="url(#g${seed})"/>
    <circle cx="120" cy="95" r="42" fill="rgba(255,255,255,0.55)"/>
    <path d="M40 240c0-52 36-84 80-84s80 32 80 84" fill="rgba(255,255,255,0.55)"/>
  </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const TEAM = [
  {
    name: "Anas Qaiser",
    role: "CEO",
    bio: "Leads Atarion's vision and overall company direction.",
    photo: anasPhoto,
  },
  {
    name: "Hammad Ali",
    role: "CTO",
    bio: "Oversees the technical architecture and engineering strategy.",
    photo: hammadPhoto,
  },
  {
    name: "Rabia Anwar",
    role: "Frontend Developer",
    bio: "Builds the interfaces clients interact with every day.",
    photo: placeholderPhoto(3, "#6c4ff0", "#00e5c7"),
  },
  {
    name: "Shahrina Khan",
    role: "Backend Developer",
    bio: "Builds the server-side systems that power our products.",
    photo: placeholderPhoto(4, "#3d2c8d", "#00e5c7"),
  },
  {
    name: "Huzaifa Jayyad",
    role: "Application Developer",
    bio: "Builds and ships cross-platform application features.",
    photo: placeholderPhoto(5, "#00e5c7", "#6c4ff0"),
  },
];

const gridContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function Team() {
  return (
    <section id="team" className="relative bg-cosmos py-28 lg:py-36 overflow-hidden">
      {/* Shared clip shape: parallelogram with a rounded top-left corner,
          defined once and reused via clip-path: url(#team-photo-clip). */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <clipPath id="team-photo-clip" clipPathUnits="objectBoundingBox">
            <path d="M0,0.18 C0,0.08 0.08,0 0.18,0 L1,0 L0.84,1 L0,1 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center">
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-pulse">
            Our Team
          </h2>
          <p className="mt-4 text-cloud-dim max-w-xl mx-auto">
            Explore Our Success Stories and Innovative Projects
          </p>
        </Reveal>

        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {TEAM.map(({ name, role, bio, photo }) => (
            <motion.div
              key={name}
              variants={cardVariant}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="group rounded-2xl overflow-hidden border border-white/10 bg-void transition-shadow duration-300 hover:shadow-[0_20px_50px_-15px_rgba(108,79,240,0.4)]"
            >
              <div className="relative h-32 sm:h-36 mx-4 mt-4 bg-void">
                <div
                  className="relative w-full h-full overflow-hidden bg-gradient-to-br from-electric to-pulse shadow-lg"
                  style={{ clipPath: "url(#team-photo-clip)" }}
                >
                  <img
                    src={photo}
                    alt={name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                </div>
              </div>
              <div className="p-6">
                <p className="text-[11px] font-semibold tracking-widest text-cloud-dim uppercase">
                  {role}
                </p>
                <h3 className="mt-1 font-display text-lg font-bold text-pulse">
                  {name}
                </h3>
                <p className="mt-3 text-sm text-cloud-dim leading-relaxed">{bio}</p>

                <div className="mt-5 flex items-center gap-2">
                  <a
                    href="#"
                    aria-label={`${name} on LinkedIn`}
                    className="w-8 h-8 rounded-full bg-electric/10 border border-electric/30 flex items-center justify-center text-electric transition-colors duration-200 hover:bg-electric hover:text-white"
                  >
                    <LinkedinIcon width={14} height={14} />
                  </a>
                  <a
                    href="#"
                    aria-label={`${name} on Twitter`}
                    className="w-8 h-8 rounded-full bg-pulse/10 border border-pulse/30 flex items-center justify-center text-pulse transition-colors duration-200 hover:bg-pulse hover:text-void"
                  >
                    <TwitterIcon width={14} height={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
