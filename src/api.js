const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

async function request(path, method = "GET") {
    const res = await fetch(`${API_BASE}${path}`, {
        method,
        headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: "Xatolik" }));
        throw new Error(err.detail || "Xatolik");
    }
    return res.json();
}

export const getListing = (id) => request(`/api/listings/${id}`);
export const payListing = (id) => request(`/api/listings/${id}/pay`, "POST");
export const confirmListing = (id) => request(`/api/listings/${id}/confirm`, "POST");