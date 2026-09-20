import { profile, navLinks, contactDetails } from "@/lib/content";

export default function Offcanvas() {
  return (
    <>
      <div className="scrim" id="scrim" />

      <aside className="offcanvas" id="offcanvas" aria-hidden="true" aria-label="Menu">
        <div className="offcanvas__left">
          <span className="offcanvas__brand">
            <span className="brand__mark" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </span>
            <b>{profile.firstName}</b>
          </span>

          <nav className="offcanvas__nav">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                <span>{link.label}</span>
                <i className="offcanvas__chev" aria-hidden="true">
                  ›
                </i>
              </a>
            ))}
          </nav>
        </div>

        <div className="offcanvas__right">
          <button className="offcanvas__close" id="menuClose" aria-label="Close menu">
            ✕
          </button>

          <h2 className="offcanvas__heading">Contact us</h2>

          <ul className="offcanvas__contact">
            {contactDetails.map((d) => (
              <li key={d.text}>
                <i aria-hidden="true">{d.icon}</i>
                {d.href ? <a href={d.href}>{d.text}</a> : <span>{d.text}</span>}
              </li>
            ))}
          </ul>

          <div className="offcanvas__pills">
            {profile.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                {s.label} <i aria-hidden="true">↗</i>
              </a>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
