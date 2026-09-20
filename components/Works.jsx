import { projects } from "@/lib/content";

export default function Works() {
  return (
    <section className="works" id="work">
      {/*
        The wordmark is sticky — it holds still while the cards scroll over
        it, which is the whole effect. Cards alternate left/right for the
        zig-zag.
      */}
      <div className="works__stage">
        <div className="works__bg" aria-hidden="true">
          <h2 className="works__word">Work</h2>
        </div>

        <span className="sr-only">Selected work</span>

        <span className="works__badge" aria-hidden="true">
          Discover
          <br />
          Our Projects <i>↗</i>
        </span>

        <div className="works__cards" id="worksCards">
          {projects.map((project, i) => (
            <article
              className={`wcard wcard--${i % 2 ? "right" : "left"}`}
              key={project.title}
              data-project={i}
              tabIndex={0}
              role="button"
              aria-label={`Open ${project.title}`}
            >
              <header className="wcard__head">
                <h3 className="wcard__title">{project.title}</h3>
                <span className="wcard__go" aria-hidden="true">
                  ↗
                </span>
              </header>

              <div className="wcard__tags">
                {project.tags.map((tag) => (
                  <span key={tag}>
                    <i aria-hidden="true" />
                    {tag}
                  </span>
                ))}
              </div>

              <div className="wcard__frame">
                <img src={project.image} alt={project.title} loading="lazy" />
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Follows the pointer across the card stack */}
      <span className="works__follow" id="worksFollow" aria-hidden="true">
        View
      </span>
    </section>
  );
}
