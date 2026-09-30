import "./RoleSelect.scss";

export default function RoleSelect() {
  return (
    <div className="card role-select">
      <div className="role-select__title">MuzlaPay'ga xush kelibsiz</div>
      <div className="role-select__sub">Siz kimsiz?</div>

      <div className="role-select__option">
        <div className="role-select__label">🧊 Men sotuvchiman</div>
        <div className="role-select__desc">
          Hisobingizni sozlash va to'lov havolangizni olish uchun Telegram botimizga o'ting.
        </div>
        <a className="btn btn--primary" href="https://t.me/muzlapaybot">
          Botni ochish
        </a>
      </div>

      <div className="role-select__option">
        <div className="role-select__label">🛍️ Men xarid qilyapman</div>
        <div className="role-select__desc">
          Sizga sotuvchi tomonidan yuborilgan shaxsiy to'lov havolasi kerak — uni oching.
        </div>
      </div>
    </div>
  );
}