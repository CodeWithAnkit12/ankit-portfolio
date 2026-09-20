import { toolGroups, toolsLabel } from "@/lib/content";

export default function Logos() {
  return (
    <section className="stack" aria-label={toolsLabel}>
      <p className="stack__label" data-reveal>
        {toolsLabel}
      </p>

      <div className="stack__groups">
        {toolGroups.map((group, gi) => (
          <div className="stack-group" key={group.label}>
            <h3 className="stack-group__label">
              <span>{group.label}</span>
            </h3>

            {/*
              Each row scrolls horizontally, alternating direction per group.
              The track is duplicated so the -50% translate loops seamlessly;
              the copy is hidden from assistive tech.
            */}
            <div className="stack-marquee">
              <div
                className={`stack-marquee__track${gi % 2 ? " is-reverse" : ""}`}
                style={{ "--speed": `${Math.max(18, group.items.length * 4.5)}s` }}
              >
                {[0, 1].map((copy) => (
                  <div
                    className="stack-marquee__set"
                    key={copy}
                    aria-hidden={copy === 1 ? "true" : undefined}
                  >
                    {group.items.map((item) => (
                      <figure
                        className="tech"
                        key={item.name}
                        style={{ "--brand": item.brand }}
                        title={item.name}
                      >
                        <span className="tech__art">
                          {item.icon ? (
                            <img
                              src={`/icons/${item.icon}.svg`}
                              alt=""
                              width="48"
                              height="48"
                              loading="lazy"
                            />
                          ) : (
                            /* No published logo — lettermark keeps the row even. */
                            <b className="tech__abbr">{item.abbr}</b>
                          )}
                        </span>

                        <figcaption className="tech__name">{item.name}</figcaption>
                      </figure>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
