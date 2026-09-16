import { MeltedDollarIcon } from "./Icon";

function fmt(n) {
  return Number(n).toLocaleString("fr-FR").replaceAll(",", " ") + " so'm";
}

export default function DoneCard({ listing, commission }) {
  const fee = commission ?? Math.round(listing.price * 0.02);

  return (
    <div className="card">
      <div className="orb-wrap">
        <div className="orb orb--melted">
          <MeltedDollarIcon id="done" size={66} />
        </div>
      </div>

      <div className="status-title">Pul sotuvchiga o'tkazildi</div>
      <div className="status-sub">Bitim muvaffaqiyatli yakunlandi.</div>

      <div className="receipt">
        <div className="receipt-row">
          <span>Mahsulot</span>
          <b>{listing.name}</b>
        </div>
        <div className="receipt-row">
          <span>Xizmat haqi (2%)</span>
          <b>{fmt(fee)}</b>
        </div>
        <div className="receipt-row receipt-row--total">
          <span>Jami to'landi</span>
          <b>{fmt(listing.price)}</b>
        </div>
      </div>
    </div>
  );
}