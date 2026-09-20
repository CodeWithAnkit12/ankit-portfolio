import { statement } from "@/lib/content";

export default function Statement() {
  // One span per word so SiteMotion can light them up as you scroll.
  const words = statement.text.trim().split(/\s+/);

  return (
    <section className="statement">
      <h2 className="statement__text" id="statementText">
        {words.map((word, i) => (
          <span className="statement__word" key={`${word}-${i}`}>
            {word}
          </span>
        ))}
      </h2>
    </section>
  );
}
