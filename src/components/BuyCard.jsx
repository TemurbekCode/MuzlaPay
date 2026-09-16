import { FrozenDollarIcon } from "./Icon";
import "./BuyCard.scss";

function fmt(n) {
  return Number(n).toLocaleString("fr-FR").replaceAll(",", " ") + " so'm";
}

export default function BuyCard({ listing, onPay, paying }) {
  return (
    <div className="card buy-card">
      <div className="buy-card__thumb">🎮</div>
      <div className="buy-card__title">{listing.name}</div>
      <div className="buy-card__price">{fmt(listing.price)}</div>
      <div className="buy-card__seller">
        <span className="dot" /> Toifa: {listing.category || "—"} · sotuvchi tasdiqlangan
      </div>

      {listing.group_name && (
        <div className="buy-card__group">
          <span className="buy-card__gdot" /> <b>{listing.group_name}</b> guruhi orqali
          tasdiqlangan sotuvchi
        </div>
      )}

      <div className="buy-card__trust">
        <FrozenDollarIcon id="trust" size={26} />
        <div>
          Pulingiz to'lovdan so'ng <b>muzlatiladi</b> — tovarni qabul qilib, tasdiqlagandan
          keyingina sotuvchiga o'tadi.
        </div>
      </div>

      <button className="btn btn--primary" disabled={paying} onClick={onPay}>
        {paying ? "To'lov amalga oshirilmoqda..." : `Xavfsiz to'lash — ${fmt(listing.price)}`}
      </button>
    </div>
  );
}