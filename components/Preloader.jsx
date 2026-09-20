import { profile } from "@/lib/content";

export default function Preloader() {
  return (
    <div className="preloader" id="preloader">
      <div className="preloader__word mask">
        <span>
          {profile.firstName} {profile.lastName}
        </span>
      </div>
      <div className="preloader__count" id="count">0</div>
      <div className="preloader__bar" id="bar" />
    </div>
  );
}
