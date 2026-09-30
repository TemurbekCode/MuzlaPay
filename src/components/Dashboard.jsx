import { useEffect, useState } from "react";
import GoogleLoginButton from "./GoogleLoginButton";
import { googleLogin, getSeller, saveProfile, listTransactions } from "../api";
import "./Dashboard.scss";

const STORAGE_KEY = "muzlapay_seller_id";

function fmt(n) {
  return Number(n).toLocaleString("fr-FR").replaceAll(",", " ") + " so'm";
}

const STATUS_LABEL = {
  frozen: ["Muzlagan", "frozen"],
  released: ["Yakunlangan", "released"],
};

export default function Dashboard() {
  const [sellerId, setSellerId] = useState(() => localStorage.getItem(STORAGE_KEY));
  const [seller, setSeller] = useState(null);
  const [txns, setTxns] = useState([]);
  const [phone, setPhone] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!sellerId) return;
    refresh();
  }, [sellerId]); // eslint-disable-line react-hooks/exhaustive-deps

  async function refresh() {
    try {
      const s = await getSeller(sellerId);
      setSeller(s);
      setPhone(s.phone || "");
      setCardHolder(s.card_holder || "");
      setCardNumber(s.card_last4 ? `•••• •••• •••• ${s.card_last4}` : "");
    } catch {
      /* hisob hali bo'sh bo'lishi mumkin */
    }
    const t = await listTransactions(sellerId).catch(() => []);
    setTxns(t);
  }

  async function handleGoogleSuccess(credential) {
    try {
      const s = await googleLogin(credential);
      localStorage.setItem(STORAGE_KEY, s.id);
      setSellerId(s.id);
    } catch (e) {
      setMsg(`❌ ${e.message}`);
    }
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
    setSellerId(null);
    setSeller(null);
    setTxns([]);
  }

  async function handleSave() {
    setBusy(true);
    setMsg("");
    try {
      const clean = cardNumber.includes("•") ? undefined : cardNumber.replace(/\s+/g, "");
      await saveProfile(sellerId, { phone, card_number: clean ?? "UNCHANGED", card_holder: cardHolder });
      setMsg("✅ Saqlandi");
      refresh();
    } catch (e) {
      setMsg(`❌ ${e.message}`);
    } finally {
      setBusy(false);
    }
  }

  if (!sellerId) {
    return (
      <div className="card">
        <div className="status-title">Sotuvchi profili</div>
        <div className="status-sub">Hisobingizni yaratish yoki kirish uchun Google orqali davom eting.</div>
        <GoogleLoginButton onSuccess={handleGoogleSuccess} onError={(e) => setMsg(e)} />
        {msg && <div className="dashboard__msg">{msg}</div>}
      </div>
    );
  }

  return (
    <div className="card dashboard">
      <div className="dashboard__head">
        <div>
          <div className="dashboard__title">Salom, {seller?.name || "..."}</div>
          <div className="dashboard__email">{seller?.email}</div>
        </div>
        <button className="dashboard__logout" onClick={logout}>Chiqish</button>
      </div>

      <div className="dashboard__section">
        <div className="dashboard__label">
          Pul qabul qilish ma'lumotlari — xaridorlar sizni shu telefon raqami orqali topadi
        </div>
        <input
          className="dashboard__input"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Telefon raqamingiz"
        />
        <input
          className="dashboard__input"
          value={cardHolder}
          onChange={(e) => setCardHolder(e.target.value)}
          placeholder="Karta egasining ismi"
        />
        <input
          className="dashboard__input"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="8600 1234 5678 9012"
          inputMode="numeric"
        />
        <button className="btn btn--primary" disabled={busy} onClick={handleSave}>
          Saqlash
        </button>
      </div>

      <div className="dashboard__section">
        <div className="dashboard__label">Tranzaksiyalar</div>
        {txns.length === 0 && <div className="empty">Hali tranzaksiya yo'q.</div>}
        {txns.map((t) => (
          <div className="dashboard__txn" key={t.id}>
            <div>
              <div className="dashboard__txn-amount">{fmt(t.amount)}</div>
              <div className="dashboard__txn-phone">{t.buyer_phone || "—"}</div>
            </div>
            <span className={`dashboard__badge dashboard__badge--${STATUS_LABEL[t.status][1]}`}>
              {STATUS_LABEL[t.status][0]}
            </span>
          </div>
        ))}
      </div>

      {msg && <div className="dashboard__msg">{msg}</div>}
    </div>
  );
}