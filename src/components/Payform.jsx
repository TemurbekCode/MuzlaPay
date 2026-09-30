import { useState } from "react";
import { FrozenDollarIcon } from "./Icon";
import "./PayForm.scss";

export default function PayForm({ onPay, paying }) {
    const [amount, setAmount] = useState("");
    const [phone, setPhone] = useState("");

    const valid = Number(amount) > 0 && phone.trim().length >= 9;

    return (
        <div className="card pay-form">
            <div className="pay-form__title">Xavfsiz to'lov</div>
            <div className="pay-form__sub">
                Summani kiriting — pulingiz tovarni qabul qilib, tasdiqlaguningizcha xavfsiz
                muzlatib turiladi.
            </div>

            <label className="pay-form__label">Summa (so'm)</label>
            <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className="pay-form__input"
                placeholder="Qiymat"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
            />

            <label className="pay-form__label">Telefon raqamingiz</label>
            <input
                type="tel"
                className="pay-form__input"
                placeholder="+998 "
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <div className="pay-form__hint">
                Tovar yetib borganda shu raqamga SMS orqali eslatma yuboramiz.
            </div>

            <div className="pay-form__trust">
                <FrozenDollarIcon id="trust" size={26} />
                <div>
                    Pulingiz to'lovdan so'ng <b>muzlatiladi</b> — tovarni qabul qilib, tasdiqlagandan
                    keyingina sotuvchiga o'tadi.
                </div>
            </div>

            <button
                className="btn btn--primary"
                disabled={!valid || paying}
                onClick={() => onPay(Number(amount), phone.trim())}
            >
                {paying ? "To'lov amalga oshirilmoqda..." : "Xavfsiz to'lash"}
            </button>
        </div>
    );
}