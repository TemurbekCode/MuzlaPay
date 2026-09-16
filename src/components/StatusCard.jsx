import { FrozenDollarIcon } from "./Icon";

function fmt(n) {
  return Number(n).toLocaleString("fr-FR").replaceAll(",", " ") + " so'm";
}

export default function StatusCard({ listing, onClose, onConfirm }) {
  return (
    <div className="card">
      <div className="orb-wrap">
        <div className="orb">
          <FrozenDollarIcon id="status" size={66} />
        </div>
      </div>

      <div className="status-title">To'lov qabul qilindi ✅</div>
      <div className="status-sub">
        {fmt(listing.price)} xavfsiz saqlanmoqda. Sotuvchi tovarni jo'natgach, telefon
        raqamingizga <b style={{ color: "var(--frost)" }}>SMS yuboramiz</b> — shu havola orqali
        qaytib, bir bosishda tasdiqlaysiz. Hozir xavotirsiz chiqib ketishingiz mumkin.
      </div>

      <div className="timeline">
        <div className="tl-item">
          <div className="tl-left">
            <div className="tl-dot tl-dot--done">✓</div>
            <div className="tl-line tl-line--done" />
          </div>
          <div className="tl-body">
            <div className="tl-label">To'lov qabul qilindi</div>
            <div className="tl-note">Hozirgina</div>
          </div>
        </div>
        <div className="tl-item">
          <div className="tl-left">
            <div className="tl-dot">○</div>
          </div>
          <div className="tl-body">
            <div className="tl-label">Xaridor tasdiqlaydi</div>
            <div className="tl-note">Tovarni olganingizda SMS orqali eslatamiz</div>
          </div>
        </div>
      </div>

      <button className="btn btn--primary" onClick={onClose}>
        Tushunarli, hozircha yopaman
      </button>
      <button className="btn btn--ghost" onClick={onConfirm}>
        Tovar allaqachon qo'limda — hoziroq tasdiqlayman
      </button>
    </div>
  );
}