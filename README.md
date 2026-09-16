# MuzlaPay — React (Vite + SCSS) checkout ilovasi

## Bu fayllarni qayerga qo'yish kerak

Sening `MuzlaPay` Vite loyihangda (skrinshotdagi papka):

```
MuzlaPay/
├── index.html          ← shu fayl bilan almashtir
├── src/
│   ├── main.jsx         ← shu fayl bilan almashtir
│   ├── App.jsx           ← shu fayl bilan almashtir (yoki qo'sh)
│   ├── api.js             ← yangi, qo'sh
│   ├── styles/
│   │   ├── _variables.scss
│   │   └── global.scss
│   └── components/
│       ├── Icon.jsx
│       ├── Header.jsx
│       ├── Header.scss
│       ├── BuyCard.jsx
│       ├── BuyCard.scss
│       ├── StatusCard.jsx
│       ├── DoneCard.jsx
│       ├── EmptyState.jsx
│       └── Toast.jsx
```

`App.css` yoki standart Vite shabloni qoldirgan boshqa eski fayllarni (masalan `App.css`,
namunaviy logo rasmlar) xavfsiz o'chirib tashlashing mumkin — ular endi ishlatilmaydi.

## O'rnatish

SCSS uchun bitta qo'shimcha paket kerak:

```bash
npm install -D sass
```

Boshqa hech narsa o'rnatish shart emas — React, Vite allaqachon bor.

## Ishga tushirish (test uchun, backend'dan alohida)

```bash
npm run dev
```

Bu `http://localhost:5173` da ochiladi. Lekin **backend (`uvicorn Main:app --reload`)
alohida terminalda ishlab turishi shart**, chunki `api.js` unga so'rov yuboradi
(`http://127.0.0.1:8000`).

Sinash uchun brauzerda: `http://localhost:5173/p/<mahsulot-id>` (botdan olingan ID bilan).

## Backend bilan birlashtirish (production uchun)

Hozircha ikkita server alohida ishlaydi (5173 — React, 8000 — backend). Buni birlashtirish uchun:

1. React'ni build qil:
   ```bash
   npm run build
   ```
   Bu `dist/` papkasini yaratadi.

2. `dist/` papkasining **ichidagi barcha fayllarni** backend loyihangdagi `static/` papkasiga
   ko'chir (eski `checkout.html`ni o'chirib, buning o'rniga).

3. `Main.py` faylida bitta qatorni o'zgartir — `serve_checkout` funksiyasida:
   ```python
   return FileResponse("static/checkout.html")
   ```
   buni shunga almashtir:
   ```python
   return FileResponse("static/index.html")
   ```

4. Backendni qayta ishga tushir — endi `http://127.0.0.1:8000/p/<id>` React ilovasini ko'rsatadi.

## VITE_API_BASE haqida

Agar kelajakda backend boshqa domenga (masalan `api.muzlapay.uz`) ko'chsa, `api.js`dagi
manzilni qo'lda o'zgartirish shart emas — loyiha ildizida `.env` fayl yaratib, shuni yoz:
```
VITE_API_BASE=https://api.muzlapay.uz
```