import { Fragment } from "react";
import { stripWords } from "@/lib/content";

export default function Strip() {
  // Doubled so the -50% translate loops seamlessly.
  const doubled = [...stripWords, ...stripWords];

  return (
    <div className="strip" aria-hidden="true">
      <div className="strip__row">
        {doubled.map((word, i) => (
          <Fragment key={i}>
            <span className={i % 2 ? "is-outline" : undefined}>{word}</span>
            <i>—</i>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
