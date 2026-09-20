import { experience, experienceHeading } from "@/lib/content";

export default function Experience() {
  return (
    <section className="voices" id="experience">
      <h2 className="voices__head shell" data-reveal>
        {experienceHeading}
      </h2>

      <div className="voices__viewport">
        <div className="voices__track" id="voicesTrack">
          {experience.map((item) => (
            <article className="voice" key={item.company}>
              <figure className="voice__media">
                <img src={item.image} alt="" loading="lazy" />
                {/* <span className="voice__play" aria-hidden="true">
                  ▶
                </span> */}
              </figure>

              <div className="voice__body">
                <span className="voice__mark" aria-hidden="true">
                  &rdquo;
                </span>

                <p className="voice__period">{item.period}</p>
                <p className="voice__summary">{item.summary}</p>

                <div className="voice__stack">
                  {item.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>

                <div className="voice__who">
                  <strong>{item.company}</strong>
                  <span>
                    {item.role} - {item.place}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="voices__dots" id="voicesDots" role="tablist" aria-label="Experience">
        {experience.map((item, i) => (
          <button
            key={item.company}
            data-dot={i}
            role="tab"
            aria-label={item.company}
            aria-selected={i === 0}
          />
        ))}
      </div>
    </section>
  );
}
