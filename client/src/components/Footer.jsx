import { Link } from "react-router-dom";
import { FaGithub, FaTwitter, FaLinkedin, FaDiscord } from "react-icons/fa";

const Footer = () => {
  const footerLinks = {
    Product: [
      { name: "Features", path: "#" },
      { name: "Integrations", path: "#" },
      { name: "Pricing", path: "#" },
      { name: "Changelog", path: "#" },
    ],
    Resources: [
      { name: "Documentation", path: "#" },
      { name: "API Reference", path: "#" },
      { name: "Community", path: "#" },
      { name: "Blog", path: "#" },
    ],
    Company: [
      { name: "About", path: "#" },
      { name: "Careers", path: "#" },
      { name: "Privacy Policy", path: "#" },
      { name: "Terms of Service", path: "#" },
    ],
  };

  const socialLinks = [
    { icon: FaTwitter, path: "#", label: "Twitter" },
    { icon: FaGithub, path: "#", label: "GitHub" },
    { icon: FaDiscord, path: "#", label: "Discord" },
    { icon: FaLinkedin, path: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="w-full bg-panel border-t border-outline-variant/40 mt-auto">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-12 pb-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2.5">
              <img
                className="h-8 w-auto"
                src="/workPilot_logo.svg"
                alt="WorkPilot Logo"
              />
              <span className="text-xl font-extrabold text-text-main leading-tight font-display">
                WorkPilot
              </span>
            </Link>
            <p className="text-body-sm text-text-muted mt-2">
              The all-in-one tactical workspace for modern engineering teams.
              Unify sprint orchestration, Git telemetry, and continuous delivery in one seamless OS.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.path}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-full bg-surface-container border border-outline-variant/40 flex items-center 
                      justify-center text-text-muted hover:text-brand-orange hover:border-brand-orange/50 
                        hover:shadow-orange-glow transition-all cursor-pointer"
                  >
                    <Icon className="text-sm" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="flex flex-col gap-4">
              <h4 className="text-label-lg font-bold text-text-main">
                {category}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-body-sm text-text-muted hover:text-brand-orange transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-outline-variant/30">
          <p className="text-body-sm text-text-placeholder">
            © {new Date().getFullYear()} WorkPilot, Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-low border
             border-outline-variant/30 shadow-inner cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-emerald opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-emerald" />
            </span>
            <span className="text-[11px] font-mono font-medium text-text-muted">
              All Systems Operational
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;