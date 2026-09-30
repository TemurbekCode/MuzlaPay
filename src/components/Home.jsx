import { useState } from "react";
import { FrozenDollarIcon } from "./Icon";
import StatusCard from "./StatusCard";
import DoneCard from "./DoneCard";
import { pay, getByCode, confirmByCode } from "../api";
import "./Home.scss";

function fmt(n) {
  return Number(n).toLocaleString("fr-FR").replaceAll(",", " ") + " so'm";
}

export default function Home() {
  const [tab, setTab] = useState("buyer"); // buyer | seller-info
  const [view, setView] = useState("form"); // form | code-entry | frozen | released
  const [sellerPhone, setSellerPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [error, setError] = useState("");
  const [resultCode, setResultCode] = useState("");
  const [enterCode, setEnterCode] = useState("");
  const [txn, setTxn] = useState(null);
  const [lastConfirm, setLastConfirm] = useState(null);

  const payValid = Number(amount) > 0 && sellerPhone.trim().length >= 9 && buyerPhone.trim().length >= 9;

  function handlePayClick() {
    setError("");
    setRedirecting(true);
    // --- HAQIQIY INTEGRATSIYA SHU YERGA: Click/Payme'ning o'z sahifasiga yo'naltirish ---
    setTimeout(async () => {
      setRedirecting(false);
      setBusy(true);
      try {
        const res = await pay(sellerPhone.trim(), amount, buyerPhone.trim());
        setResultCode(res.code);
        setTxn({ amount: res.amount, status: "frozen" });
        setView("frozen");
      } catch (e) {
        setError(e.message);
      } finally {
        setBusy(false);
      }
    }, 1200);
  }

  async function handleLookupCode() {
    setError("");
    setBusy(true);
    try {
      const t = await getByCode(enterCode.trim());
      setTxn(t);
      setView(t.status === "released" ? "released" : "frozen");
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function handleConfirm() {
    try {
      const code = resultCode || enterCode.trim();
      const res = await confirmByCode(code);
      setLastConfirm(res);
      setView("released");
    } catch (e) {
      setError(e.message);
    }
  }

  function resetBuyer() {
    setView("form");
    setSellerPhone("");
    setAmount("");
    setBuyerPhone("");
    setResultCode("");
    setEnterCode("");
    setTxn(null);
    setError("");
  }

  return (
    <div className="home">
      <div className="home__choice">
        <button
          className={`home__tab ${tab === "buyer" ? "home__tab--active" : ""}`}
          onClick={() => setTab("buyer")}
        >
          🛍️ Xaridorman
        </button>
        <a className="home__tab" href="/dashboard">
          🏪 Sotuvchiman
        </a>
      </div>

      {tab === "buyer" && view === "form" && (
        <div className="card home__body">
          <div className="status-title">Xavfsiz to'lov</div>
          <div className="status-sub">Sotuvchining telefon raqami va summani kiriting.</div>

          <label className="home__label">Sotuvchi telefon raqami</label>
          <input
            className="home__input"
            value={sellerPhone}
            onChange={(e) => setSellerPhone(e.target.value)}
            placeholder="+998 90 123 45 67"
          />

          <label className="home__label">Summa (so'm)</label>
          <input
            className="home__input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="3200000"
            type="number"
            inputMode="numeric"
          />

          <label className="home__label">Sizning telefon raqamingiz</label>
          <input
            className="home__input"
            value={buyerPhone}
            onChange={(e) => setBuyerPhone(e.target.value)}
            placeholder="+998 90 765 43 21"
          />
          <div className="home__hint">
            Tovar yetib borganda shu raqamga SMS orqali eslatma yuboramiz.
          </div>

          <div className="home__trust">
            <FrozenDollarIcon id="trust" size={26} />
            <div>
              Pulingiz to'lovdan so'ng <b>muzlatiladi</b> — tovarni qabul qilib, tasdiqlagandan
              keyingina sotuvchiga o'tadi.
            </div>
          </div>

          {error && <div className="home__error">{error}</div>}

          <button className="btn btn--primary" disabled={!payValid || busy || redirecting} onClick={handlePayClick}>
            {redirecting ? "Click/Payme'ga yo'naltirilmoqda..." : busy ? "Kuting..." : "Click yoki Payme orqali to'lash"}
          </button>

          <button className="btn btn--ghost" onClick={() => setView("code-entry")}>
            Tasdiqlash kodim bor
          </button>
        </div>
      )}

      {tab === "buyer" && view === "code-entry" && (
        <div className="card home__body">
          <div className="status-title">Kodni kiriting</div>
          <div className="status-sub">To'lov qilganingizda sizga berilgan 6 xonali kodni kiriting.</div>
          <input
            className="home__input"
            value={enterCode}
            onChange={(e) => setEnterCode(e.target.value)}
            placeholder="000000"
            inputMode="numeric"
          />
          {error && <div className="home__error">{error}</div>}
          <button className="btn btn--primary" disabled={enterCode.trim().length < 4 || busy} onClick={handleLookupCode}>
            Ko'rish
          </button>
          <button className="btn btn--ghost" onClick={resetBuyer}>
            Orqaga
          </button>
        </div>
      )}

      {tab === "buyer" && view === "frozen" && txn && (
        <>
          {resultCode && (
            <div className="card home__code-box">
              <div className="home__code-label">Tasdiqlash kodingiz</div>
              <div className="home__code-value">{resultCode}</div>
              <div className="home__code-hint">Buni saqlab qo'ying — tovar kelganda shu kod bilan tasdiqlaysiz.</div>
            </div>
          )}
          <StatusCard
            txn={txn}
            onClose={resetBuyer}
            onConfirm={handleConfirm}
          />
        </>
      )}

      {tab === "buyer" && view === "released" && txn && (
        <>
          <DoneCard txn={txn} commission={lastConfirm?.commission} />
          <button className="btn btn--ghost" onClick={resetBuyer}>
            Bosh sahifaga qaytish
          </button>
        </>
      )}
    </div>
  );
}