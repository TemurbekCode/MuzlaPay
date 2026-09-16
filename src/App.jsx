import { useEffect, useState } from "react";
import Header from "./components/Header";
import BuyCard from "./components/BuyCard";
import StatusCard from "./components/StatusCard";
import DoneCard from "./components/DoneCard";
import EmptyState from "./components/EmptyState";
import { Toast } from "./components/Toast";
import { getListing, payListing, confirmListing } from "./api";

// URL /p/<id> shaklidan mahsulot ID'sini ajratib olamiz
function getListingIdFromPath() {
  const parts = window.location.pathname.split("/").filter(Boolean);
  return parts[0] === "p" ? parts[1] : null;
}

export default function App() {
  const listingId = getListingIdFromPath();

  // loading | no-id | error | active | frozen | released
  const [status, setStatus] = useState("loading");
  const [listing, setListing] = useState(null);
  const [paying, setPaying] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const [lastConfirm, setLastConfirm] = useState(null);

  function showToast(msg) {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 1600);
  }

  useEffect(() => {
    if (!listingId) {
      setStatus("no-id");
      return;
    }
    getListing(listingId)
      .then((l) => {
        setListing(l);
        setStatus(l.status);
      })
      .catch(() => setStatus("error"));
  }, [listingId]);

  async function handlePay() {
    setPaying(true);
    try {
      // --- HAQIQIY INTEGRATSIYA SHU YERGA: Click/Payme checkout oynasi shu yerda ochiladi ---
      await payListing(listingId);
      const l = await getListing(listingId);
      setListing(l);
      setStatus(l.status);
    } catch (e) {
      showToast(e.message);
    } finally {
      setPaying(false);
    }
  }

  async function handleConfirm() {
    try {
      const res = await confirmListing(listingId);
      const l = await getListing(listingId);
      setListing(l);
      setLastConfirm(res);
      setStatus(l.status);
    } catch (e) {
      showToast(e.message);
    }
  }

  return (
    <>
      <Header />
      <main>
        {status === "loading" && <EmptyState>Yuklanmoqda...</EmptyState>}

        {status === "no-id" && (
          <EmptyState>
            Bu sahifa faqat mahsulot havolasi orqali ochiladi.
            <br />
            MuzlaPay haqida ko'proq bilish uchun asosiy sahifaga o'ting.
          </EmptyState>
        )}

        {status === "error" && <EmptyState>Bu havola topilmadi yoki muddati o'tgan.</EmptyState>}

        {status === "active" && listing && (
          <BuyCard listing={listing} onPay={handlePay} paying={paying} />
        )}

        {status === "frozen" && listing && (
          <StatusCard
            listing={listing}
            onClose={() => showToast("Yaxshi! Tovar yetib borgach SMS yuboramiz")}
            onConfirm={handleConfirm}
          />
        )}

        {status === "released" && listing && (
          <DoneCard listing={listing} commission={lastConfirm?.commission} />
        )}
      </main>
      <Toast message={toastMsg} />
    </>
  );
}