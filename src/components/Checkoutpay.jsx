import { useState } from "react";
import { FrozenDollarIcon } from "./Icon";
import "./CheckoutPay.scss";

function fmt(n) {
    return Number(n).toLocaleString("fr-FR").replaceAll(",", " ") + " so'm";
}

export default function CheckoutPay({ txn, onPay, paying }) {
    const [phone, setPhone] = useState("");
    const [redirecting, setRedirecting] = useState(false);
    const valid = phone.trim().length >= 9;

    function handleClick() {
        setRedirecting(true);
        // --- HAQIQIY INTEGRATSIYA SHU YERGA: Click/Payme'ning checkout sahifasiga
        // haqiqiy yo'naltirish shu yerda amalga oshadi. Hozircha simulyatsiya qilinmoqda.
        setTimeout(() => {
            setRedirecting(false);
            onPay(phone.trim());
        }, 1200);
    }

    return (
        <div className="card checkout-pay">
            <div className="checkout-pay__title">To'lov so'rovi</div>
            <div className="checkout-pay__amount">{fmt(txn.amount)}</div>

            <label className="checkout-pay__label">Telefon raqamingiz</label>
            <input
                type="tel"
                className="checkout-pay__input"
                placeholder="+998 90 123 45 67"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <div className="checkout-pay__hint">
                Tovar yetib borganda shu raqamga SMS orqali eslatma yuboramiz.
            </div>

            <div className="checkout-pay__trust">
                <FrozenDollarIcon id="trust" size={26} />
                <div>
                    Pulingiz to'lovdan so'ng <b>muzlatiladi</b> — tovarni qabul qilib, tasdiqlagandan
                    keyingina sotuvchiga o'tadi.
                </div>
            </div>

            <button
                className="btn btn--primary"
                disabled={!valid || paying || redirecting}
                onClick={handleClick}
            >
                {redirecting
                    ? "Click/Payme'ga yo'naltirilmoqda..."
                    : paying
                        ? "Kuting..."
                        : "Click yoki Payme orqali to'lash"}
            </button>
        </div>
    );
}