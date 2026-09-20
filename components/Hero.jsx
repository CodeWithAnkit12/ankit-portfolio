import { profile } from "@/lib/content";

export default function Hero() {
  // One line per word — never a mid-word break. SiteMotion then scales each
  // line so it fills the viewport width, the way the reference does.
  const lines = profile.heroWord.trim().split(/\s+/);

  return (
    <section className="hero" id="hero">
      <h1 className="hero__word mask">
        <span className="hero__inner">
          {lines.map((line) => (
            <span className="hero__line" key={line}>
              {line}
            </span>
          ))}
        </span>
      </h1>

      {/*
        Drop a background-removed PNG at public/portrait.png.
        onError falls back to a stock photo so the layout never breaks.
      */}
      <figure className="hero__figure">
        <img
          src={profile.portrait}
          alt={`${profile.firstName} ${profile.lastName}`}
          width="900"
          height="1100"
          fetchPriority="high"
          data-fallback={profile.portraitFallback}
        />
      </figure>
    </section>
  );
}
