import { motion } from "framer-motion";
import Reveal from "../components/Reveal";
import { LinkedinIcon, TwitterIcon, GithubIcon } from "../components/SocialIcons";
import anasPhoto from "../assets/team/anas.jpg";
import hammadPhoto from "../assets/team/hammad.jpg";
import memberDefaultPhoto from "../assets/team/member_default.jpg";
import memberDefaultFemalePhoto from "../assets/team/member_default_female.jpg";

// Per-member social links. Fill in the real profile URLs — leave "" to
// hide that icon (the card only renders icons that have a URL).
const TEAM = [
  {
    name: "Anas Qaiser",
    role: "CEO",
    bio: "Leads Atarion's vision and overall company direction.",
    photo: anasPhoto,
    photoPosition: "center 20%",
    linkedin: "https://www.linkedin.com/in/muhammadanas083",
    github: "https://github.com/MuhammadAnas1657",
    twitter: "",
  },
  {
    name: "Hammad Ali",
    role: "CTO",
    bio: "Oversees the technical architecture and engineering strategy.",
    photo: hammadPhoto,
    linkedin: "",
    twitter: "",
  },
  {
    name: "Rabia Anwar",
    role: "Frontend Developer",
    bio: "Builds the interfaces clients interact with every day.",
    photo: memberDefaultFemalePhoto,
    linkedin: "",
    twitter: "",
  },
  {
    name: "Shahrina Khan",
    role: "Backend Developer",
    bio: "Builds the server-side systems that power our products.",
    photo: memberDefaultFemalePhoto,
    linkedin: "",
    twitter: "",
  },
  {
    name: "Huzaifa Jayyad",
    role: "Application Developer",
    bio: "Builds and ships cross-platform application features.",
    photo: memberDefaultPhoto,
    linkedin: "",
    twitter: "",
  },
];

const LEADERSHIP = TEAM.slice(0, 2);
const REST = TEAM.slice(2);

const gridContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

function TeamCard({ name, role, bio, photo, photoPosition = "center", photoScale = 1, linkedin, twitter, github }) {
  const socials = [
    { Icon: LinkedinIcon, label: "LinkedIn", href: linkedin, tone: "electric" },
    { Icon: TwitterIcon, label: "Twitter", href: twitter, tone: "pulse" },
    { Icon: GithubIcon, label: "GitHub", href: github, tone: "electric" },
  ].filter((s) => s.href);

  return (
    <motion.div
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
            style={{
              objectPosition: photoPosition,
              "--base-scale": photoScale,
              "--hover-scale": photoScale * 1.1,
            }}
            className="absolute inset-0 w-full h-full object-cover scale-[var(--base-scale)] transition-transform duration-500 ease-out group-hover:scale-[var(--hover-scale)]"
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

        {socials.length > 0 && (
          <div className="mt-5 flex items-center gap-2">
            {socials.map(({ Icon, label, href, tone }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} on ${label}`}
                className={
                  tone === "electric"
                    ? "w-8 h-8 rounded-full bg-electric/10 border border-electric/30 flex items-center justify-center text-electric transition-colors duration-200 hover:bg-electric hover:text-white"
                    : "w-8 h-8 rounded-full bg-pulse/10 border border-pulse/30 flex items-center justify-center text-pulse transition-colors duration-200 hover:bg-pulse hover:text-void"
                }
              >
                <Icon width={14} height={14} />
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

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
          className="mt-16 grid sm:grid-cols-2 max-w-xl mx-auto gap-6"
        >
          {LEADERSHIP.map((member) => (
            <TeamCard key={member.name} {...member} />
          ))}
        </motion.div>

        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {REST.map((member) => (
            <TeamCard key={member.name} {...member} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
