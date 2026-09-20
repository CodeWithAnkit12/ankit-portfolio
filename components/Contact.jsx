import { profile, contactHeading } from "@/lib/content";

export default function Contact() {
  return (
    <div className="contact shell" id="contact">
      <div className="contact__grid">
        <div className="contact__left">
          <h2 className="contact__title" data-reveal>
            {contactHeading.map((line, i) => (
              <span key={line} className={i === 1 ? "is-accent" : undefined}>
                {line}
              </span>
            ))}
          </h2>

          <div className="contact__lines">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            {/* <i aria-hidden="true">//</i> */}
            <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a>
          </div>

          <div className="vcard">
            <span className="vcard__face" aria-hidden="true">
              {profile.firstName.charAt(0)}
            </span>

            <div>
              <strong>
                {profile.firstName} {profile.lastName}
              </strong>
              <span>
                {profile.role} - {profile.company}
              </span>

              <div className="vcard__links">
                {profile.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {s.short}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>


        <form id="contactForm" noValidate>
          <div className="field">
            <label htmlFor="cf-name">First name</label>
            <input id="cf-name" type="text" name="name" autoComplete="given-name" required />
          </div>

          <div className="field">
            <label htmlFor="cf-email">Email address</label>
            <input id="cf-email" type="email" name="email" autoComplete="email" required />
          </div>

          <div className="field">
            <label htmlFor="cf-message">Message</label>
            <textarea id="cf-message" name="message" rows={5} required />
          </div>

          <button className="btn-send" type="submit" data-ripple>
            Submit message
          </button>

          <p className="form-note" id="formNote" role="status" />
        </form>
      </div>
    </div>
  );
}
