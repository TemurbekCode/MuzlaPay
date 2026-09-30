const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

async function request(path, method = "GET", body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Xatolik" }));
    throw new Error(err.detail || "Xatolik");
  }
  return res.json();
}

// Google bilan kirish
export const googleLogin = (credential) => request("/api/auth/google", "POST", { credential });

// Sotuvchi
export const getSeller = (id) => request(`/api/sellers/${id}`);
export const saveProfile = (id, data) => request(`/api/sellers/${id}/profile`, "POST", data);
export const listTransactions = (id) => request(`/api/sellers/${id}/transactions`);

// Xaridor — havolasiz, faqat telefon raqami va kod bilan
export const pay = (sellerPhone, amount, buyerPhone) =>
  request("/api/pay", "POST", { seller_phone: sellerPhone, amount: Number(amount), buyer_phone: buyerPhone });
export const getByCode = (code) => request(`/api/pay/${code}`);
export const confirmByCode = (code) => request(`/api/pay/${code}/confirm`, "POST");