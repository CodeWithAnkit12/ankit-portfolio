import { about } from "@/lib/content";

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about__grid shell">
        {/* Left — intro paragraph over a checklist */}
        <aside className="about__intro" data-reveal>
          <p className="about__hello">{about.intro}</p>

          <ul className="about__points">
            {about.points.map((point) => (
              <li key={point}>
                <i aria-hidden="true">✛</i>
                {point}
              </li>
            ))}
          </ul>
        </aside>

        {/* Centre — the portrait plate */}
        <figure className="about__photo" data-reveal>
          <img src={about.image} alt="" loading="lazy" />
        </figure>

        {/* Right — floating stat cards */}
        <div className="about__stats">
          {about.cards.map((card) => (
            <div
              className={`stat${card.dark ? " stat--dark" : ""}`}
              key={card.label}
              data-reveal
            >
              {card.faces && (
                <span className="stat__faces" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
              )}

              <b className="stat__num" data-count={card.value} data-suffix={card.suffix}>
                0
              </b>
              <span className="stat__label">{card.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Outlined headline + primary call to action */}
      <div className="about__tail shell">
        <p className="about__outline" data-reveal>
          {about.outline}
        </p>

        <a className="btn-primary" href={about.ctaHref} data-ripple>
          {about.ctaLabel}
        </a>
      </div>

      {/* Two cards that sit either side of the statement below */}
      <div className="about__floats shell" aria-hidden="false">
        {about.floats.map((f, i) => (
          <div className={`stat stat--float stat--${i === 0 ? "left" : "right"}`} key={f.label}>
            <b className="stat__num">
              {f.value}
              <span>{f.suffix}</span>
            </b>
            <span className="stat__label">{f.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
