import { useEffect, useState } from "react";
import { getSeller, saveSeller } from "../api";
import "./SellerAccount.scss";

export default function SellerAccount({ sellerId }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");

  useEffect(() => {
    getSeller(sellerId)
      .then((s) => {
        setName(s.name || "");
        setPhone(s.phone || "");
        setCardHolder(s.card_holder || "");
        // xavfsizlik uchun to'liq karta raqamini qayta ko'rsatmaymiz, faqat oxirgi 4 raqam
        if (s.card_last4) setCardNumber(`•••• •••• •••• ${s.card_last4}`);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [sellerId]);

  async function handleSave() {
    setSaving(true);
    setSavedMsg("");
    try {
      // Agar foydalanuvchi maskalangan qiymatni o'zgartirmagan bo'lsa, uni qayta yubormaymiz
      const cleanCard = cardNumber.includes("•") ? undefined : cardNumber.replace(/\s+/g, "");
      await saveSeller(sellerId, {
        name,
        phone,
        card_number: cleanCard ?? "UNCHANGED",
        card_holder: cardHolder,
      });
      setSavedMsg("✅ Saqlandi!");
    } catch (e) {
      setSavedMsg(`❌ ${e.message}`);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="card">
        <div className="empty">Yuklanmoqda...</div>
      </div>
    );
  }

  return (
    <div className="card seller-account">
      <div className="seller-account__title">Hisobingiz</div>
      <div className="seller-account__sub">
        Pul qabul qilish uchun ma'lumotlaringiz. Bu havola — sizning doimiy hisobingiz, uni
        istalgan payt qayta ochib, ma'lumotni yangilashingiz mumkin.
      </div>

      <label className="seller-account__label">Ismingiz</label>
      <input
        className="seller-account__input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Javohir Tashkentov"
      />

      <label className="seller-account__label">Telefon raqamingiz</label>
      <input
        className="seller-account__input"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="+998 90 123 45 67"
      />

      <label className="seller-account__label">Karta egasining ismi</label>
      <input
        className="seller-account__input"
        value={cardHolder}
        onChange={(e) => setCardHolder(e.target.value)}
        placeholder="JAVOHIR TASHKENTOV"
      />

      <label className="seller-account__label">Pul qabul qilish kartangiz</label>
      <input
        className="seller-account__input"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        placeholder="8600 1234 5678 9012"
        inputMode="numeric"
      />
      <div className="seller-account__hint">
        Bu karta faqat pul qabul qilish uchun ishlatiladi — hech qachon undan pul yechilmaydi.
      </div>

      <button className="btn btn--primary" disabled={saving} onClick={handleSave}>
        {saving ? "Saqlanmoqda..." : "Saqlash"}
      </button>

      {savedMsg && <div className="seller-account__status">{savedMsg}</div>}
    </div>
  );
}