import { services } from "@/lib/content";

export default function Services() {
  return (
    <div className="services shell" id="services">
      {services.map((s, i) => (
        <article className="svc" key={s.name} data-fade>
          <span className="svc__no">{String(i + 1).padStart(2, "0")}</span>
          <span className="svc__arrow" aria-hidden="true">
            ⟶
          </span>

          <div className="svc__body">
            <h3 className="svc__name">{s.name}</h3>

            <div className="svc__tags">
              {s.tags.map((tag) => (
                <span key={tag}>
                  <i aria-hidden="true" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <span className="svc__thumb">
            <img src={s.image} alt="" loading="lazy" />
          </span>
        </article>
      ))}
    </div>
  );
}
