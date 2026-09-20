export default function Popup() {
  return (
    <div className="popup" id="popup" role="dialog" aria-modal="true" aria-hidden="true">
      <div className="popup__panel">
        <button className="popup__close" id="popupClose" aria-label="Close">
          ✕
        </button>

        <div className="popup__media">
          {/* Transparent 1px until a card is opened — an empty src would
              make the browser re-request the page. */}
          <img
            id="popupImage"
            src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            alt=""
          />
        </div>

        <div className="popup__body">
          <p className="popup__kicker" id="popupKicker" />
          <h3 className="popup__title" id="popupTitle" />
          <p className="popup__text" id="popupBody" />

          <div className="popup__stack" id="popupTags" />

          <a className="popup__link" id="popupLink" href="#" target="_blank" rel="noreferrer">
            View on GitHub <i aria-hidden="true">↗</i>
          </a>
        </div>
      </div>
    </div>
  );
}
