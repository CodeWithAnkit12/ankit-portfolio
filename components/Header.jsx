import { profile } from "@/lib/content";

/* Small inline glyphs so the header needs no icon font. */
const icons = {
  GitHub: (
    <path d="M8 .2a8 8 0 0 0-2.5 15.6c.4.1.5-.2.5-.4v-1.4c-2 .4-2.5-.5-2.7-1 0-.1-.5-.9-.9-1.1-.3-.2-.7-.6 0-.6s1 .6 1.2.9c.7 1.1 1.8.8 2.3.6.1-.5.3-.9.5-1.1-1.8-.2-3.7-.9-3.7-4 0-.9.3-1.6.8-2.2 0-.2-.3-1 .1-2.1 0 0 .7-.2 2.2.8a7.4 7.4 0 0 1 4 0c1.5-1 2.2-.8 2.2-.8.4 1.1.1 1.9.1 2.1.5.6.8 1.3.8 2.2 0 3.1-1.9 3.8-3.7 4 .3.3.6.8.6 1.6v2.3c0 .2.1.5.5.4A8 8 0 0 0 8 .2Z" />
  ),
  LinkedIn: (
    <path d="M3.6 5.5H1V15h2.6V5.5ZM2.3 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM15 9.6c0-2.5-1.3-3.6-3.1-3.6-1.4 0-2.1.8-2.4 1.4V5.5H6.9V15h2.6V9.7c0-1.1.7-1.6 1.5-1.6s1.4.5 1.4 1.6V15H15V9.6Z" />
  ),
  Email: (
    <path d="M1.5 3h13c.3 0 .5.2.5.5v9c0 .3-.2.5-.5.5h-13a.5.5 0 0 1-.5-.5v-9c0-.3.2-.5.5-.5Zm.5 1.7v7.3h12V4.7L8 8.9 2 4.7Zm11-.7H3l5 3.5L13 4Z" />
  ),
};

export default function Header() {
  return (
    <>
      <header className="header" id="header">
        <a className="brand" href="#top" aria-label={`${profile.firstName} ${profile.lastName} — home`}>
          <span className="brand__mark" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          <b>{profile.firstName}</b>
        </a>

        <div className="socials">
          {profile.socials.map((s) => (
            <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noreferrer">
              <svg viewBox="0 0 16 16" aria-hidden="true">
                {icons[s.label]}
              </svg>
            </a>
          ))}
        </div>

        <div className="header__right">
          <button
            className="grid-btn"
            id="menuBtn"
            aria-label="Open menu"
            aria-expanded="false"
            aria-controls="offcanvas"
          >
            {Array.from({ length: 9 }).map((_, i) => (
              <i key={i} />
            ))}
          </button>

          <a className="btn-cv" href={profile.cvUrl} download data-ripple>
            Download CV
          </a>
        </div>
      </header>

      {/*
        Theme toggle. Starts from the stored choice (or the OS preference)
        via the inline script in layout.jsx, so it never flashes.
      */}
      <button
        className="theme-toggle"
        id="themeToggle"
        type="button"
        aria-label="Switch theme"
        title="Switch theme"
      >
        <svg className="theme-toggle__sun" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 1.6v3M12 19.4v3M1.6 12h3M19.4 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M19.4 4.6l-2.1 2.1M6.7 17.3l-2.1 2.1" />
        </svg>

        <svg className="theme-toggle__moon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.5 14.3A8.6 8.6 0 0 1 9.7 3.5a8.6 8.6 0 1 0 10.8 10.8Z" />
        </svg>
      </button>

    </>
  );
}
