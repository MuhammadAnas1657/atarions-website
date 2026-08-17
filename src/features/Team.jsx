import { motion } from "framer-motion";
import Reveal from "../components/Reveal";
import TiltCard from "../components/TiltCard";
import { LinkedinIcon, TwitterIcon, GithubIcon } from "../components/SocialIcons";
import anasPhoto from "../assets/team/anas.webp";
import hammadPhoto from "../assets/team/hammad.webp";
import memberDefaultPhoto from "../assets/team/member_default.webp";
import memberDefaultFemalePhoto from "../assets/team/member_default_female.webp";

const EASE = [0.16, 1, 0.3, 1];

// Per-member social links. Fill in the real profile URLs — leave "" to
// hide that icon (the card only renders icons that have a URL).
const TEAM = [
  {
    name: "Anas Qaiser",
    role: "CEO",
    photo: anasPhoto,
    photoPosition: "center 20%",
    linkedin: "https://www.linkedin.com/in/muhammadanas083",
    github: "https://github.com/MuhammadAnas1657",
    twitter: "",
  },
  {
    name: "Hammad Ali",
    role: "CTO",
    photo: hammadPhoto,
    linkedin: "",
    twitter: "",
  },
  {
    name: "Rabia Anwar",
    role: "Frontend Developer",
    photo: memberDefaultFemalePhoto,
    linkedin: "",
    twitter: "",
  },
  {
    name: "Shahrina Khan",
    role: "Backend Developer",
    photo: memberDefaultFemalePhoto,
    linkedin: "",
    twitter: "",
  },
  {
    name: "Huzaifa Jayyad",
    role: "Application Developer",
    photo: memberDefaultPhoto,
    linkedin: "",
    twitter: "",
  },
];

// Grayscale portrait that blooms into color on hover, framed in a glass
// card with a cursor-tracked 3D tilt.
function TeamCard({ name, role, photo, photoPosition = "center", linkedin, twitter, github, index }) {
  const socials = [
    { Icon: LinkedinIcon, label: "LinkedIn", href: linkedin, tone: "electric" },
    { Icon: TwitterIcon, label: "Twitter", href: twitter, tone: "pulse" },
    { Icon: GithubIcon, label: "GitHub", href: github, tone: "electric" },
  ].filter((s) => s.href);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.85, delay: index * 0.07, ease: EASE }}
      className="h-full"
    >
      <TiltCard className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-cosmos transition-colors duration-500 hover:border-electric/30">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={photo}
            alt={`${name}, ${role} at Atarion Solutions`}
            loading="lazy"
            decoding="async"
            style={{ objectPosition: photoPosition }}
            className="h-full w-full object-cover grayscale transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-transparent to-transparent" />
        </div>
        <div className="p-4">
          <h3 className="font-display text-[0.95rem] font-semibold tracking-tight text-cloud">{name}</h3>
          <p className="mt-1.5 font-mono text-[10px] tracking-[0.18em] uppercase text-cloud-dim">{role}</p>

          {socials.length > 0 && (
            <div className="mt-4 flex items-center gap-2">
              {socials.map(({ Icon, label, href, tone }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name} on ${label}`}
                  className={
                    tone === "electric"
                      ? "w-7 h-7 rounded-full bg-electric/10 border border-electric/30 flex items-center justify-center text-electric transition-colors duration-200 hover:bg-electric hover:text-white"
                      : "w-7 h-7 rounded-full bg-pulse/10 border border-pulse/30 flex items-center justify-center text-pulse transition-colors duration-200 hover:bg-pulse hover:text-void"
                  }
                >
                  <Icon width={13} height={13} />
                </a>
              ))}
            </div>
          )}
        </div>
      </TiltCard>
    </motion.div>
  );
}

export default function Team() {
  return (
    <section id="team" className="relative bg-cosmos py-28 lg:py-36 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold tracking-widest text-pulse uppercase mb-4">
            Team
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-cloud">
            The people{" "}
            <span className="bg-gradient-to-r from-electric via-[#9b7fff] to-pulse bg-clip-text text-transparent">
              behind the work
            </span>
          </h2>
        </Reveal>

        <div className="mt-14 lg:mt-20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {TEAM.map((member, i) => (
            <TeamCard key={member.name} index={i} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
}
