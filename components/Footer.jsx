import { profile, footerLinks } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__bar shell">
        <div className="footer__links">
          <p>Quick links</p>
          <nav>
            {footerLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <button className="footer__top" id="toTopFooter" aria-label="Back to top">
          ↑
        </button>

        <div className="footer__meta">
          <p>
            {profile.firstName} {profile.lastName}
          </p>
          <span>© {new Date().getFullYear()} - All rights reserved</span>
        </div>
      </div>

      <h2 className="footer__name" aria-hidden="true">
        <span>{profile.firstName}</span>
        <span>{profile.lastName}</span>
      </h2>
    </footer>
  );
}
