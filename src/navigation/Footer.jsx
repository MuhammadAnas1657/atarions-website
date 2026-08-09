import { Mail, MapPin, Phone } from "lucide-react";
import { FacebookIcon, LinkedinIcon, GithubIcon, YoutubeIcon } from "../components/SocialIcons";
import NetworkCanvas from "../components/NetworkCanvas";

const LINKS = ["Home", "About", "Services", "Projects", "Team", "Blogs", "Contact"];
const SOCIALS = [
  { Icon: FacebookIcon, label: "Facebook" },
  { Icon: LinkedinIcon, label: "LinkedIn" },
  { Icon: GithubIcon, label: "GitHub" },
  { Icon: YoutubeIcon, label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="relative bg-cosmos border-t border-white/5 overflow-hidden">
      <NetworkCanvas
        className="absolute inset-0 w-full h-full opacity-40"
        density={0.00004}
        interactive={false}
      />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <a href="#home" className="font-display text-xl font-semibold text-cloud">
            Atarion<span className="text-pulse">.</span>
          </a>
          <p className="mt-4 text-sm text-cloud-dim leading-relaxed max-w-xs">
            Solving problems with customer prioritization.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {SOCIALS.map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-cloud-dim transition-colors duration-200 hover:text-pulse hover:border-pulse/40"
              >
                <Icon width={16} height={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold text-cloud mb-4">Navigate</h4>
          <ul className="space-y-2.5 text-sm text-cloud-dim">
            {LINKS.map((l) => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`} className="hover:text-pulse transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-cloud mb-4">Services</h4>
          <ul className="space-y-2.5 text-sm text-cloud-dim">
            {["Web Development", "AI / Machine Learning", "Data Science", "Software Development"].map((s) => (
              <li key={s}>
                <a href="#services" className="hover:text-pulse transition-colors">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-cloud mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-cloud-dim">
            <li className="flex items-center gap-2.5">
              <Mail size={15} className="text-pulse" /> info@atarionsolutions.com
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={15} className="text-pulse" /> +92 303 0748828
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin size={15} className="text-pulse" /> Sialkot, Pakistan
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/5 py-6">
        <p className="text-center text-xs text-cloud-dim">
          All Rights Registered: Atarion Solutions {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
