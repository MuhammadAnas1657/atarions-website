import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import { FacebookIcon, LinkedinIcon, GithubIcon, YoutubeIcon } from "../components/SocialIcons";
import NetworkCanvas from "../components/NetworkCanvas";
import { COMPANY_SOCIALS } from "../data/socialLinks";

const LINKS = [
  { label: "Home", to: "/#home" },
  { label: "About", to: "/#about" },
  { label: "Services", to: "/#services" },
  { label: "Projects", to: "/#projects" },
  { label: "Team", to: "/#team" },
  { label: "Blogs", to: "/blog" },
  { label: "Contact", to: "/#contact" },
];
const SOCIALS = [
  { Icon: FacebookIcon, label: "Facebook", href: COMPANY_SOCIALS.facebook },
  { Icon: LinkedinIcon, label: "LinkedIn", href: COMPANY_SOCIALS.linkedin },
  { Icon: GithubIcon, label: "GitHub", href: COMPANY_SOCIALS.github },
  { Icon: YoutubeIcon, label: "YouTube", href: COMPANY_SOCIALS.youtube },
].filter((s) => s.href);

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
          <Link to="/" className="flex items-center">
            <img src="/logo-full-trimmed.png" alt="Atarion Solutions" className="h-10 w-auto" />
          </Link>
          <p className="mt-4 text-sm text-cloud-dim leading-relaxed max-w-xs">
            Solving problems with customer prioritization.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {SOCIALS.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
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
            {LINKS.map(({ label, to }) => (
              <li key={label}>
                <Link to={to} className="hover:text-pulse transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-cloud mb-4">Services</h4>
          <ul className="space-y-2.5 text-sm text-cloud-dim">
            {["Web Development", "AI / Machine Learning", "Data Science", "Software Development"].map((s) => (
              <li key={s}>
                <Link to="/#services" className="hover:text-pulse transition-colors">
                  {s}
                </Link>
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
