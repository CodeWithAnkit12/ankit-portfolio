import { awards } from "@/lib/content";

export default function Awards() {
  return (
    <section className="awards shell" id="awards">
      <div className="rows" id="awardRows">
        {awards.map((a, i) => (
          <div className="row" key={`${a.org}-${a.what}-${a.year}`} data-peek={a.image}>
            <span className="row__no">{String(i + 1).padStart(2, "0")}</span>
            <span className="row__org">{a.org}</span>
            <span className="row__what">{a.what}</span>
            <span className="row__year">{a.year}</span>
          </div>
        ))}

        {/* Positioned by SiteMotion as the pointer moves */}
        <div className="peek" id="peek" aria-hidden="true" />
      </div>
    </section>
  );
}
