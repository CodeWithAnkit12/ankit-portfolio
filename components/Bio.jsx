import { bio } from "@/lib/content";

export default function Bio() {
  return (
    <section className="bio">
      <div className="bio__grid shell">
        <figure className="bio__photo" data-reveal>
          <img src={bio.image} alt="" loading="lazy" />
        </figure>

        <div className="bio__copy" data-reveal>
          {bio.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>

      {/* Turns from white to orange as it scrolls into place. */}
      <div className="bio__badge" data-badge>
        <b>
          <span data-count={bio.badgeValue} data-suffix={bio.badgeSuffix}>
            0
          </span>
        </b>
        <span className="bio__badge-label">{bio.badgeLabel}</span>
      </div>
    </section>
  );
}
