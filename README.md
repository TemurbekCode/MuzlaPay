# MuzlaPay

Secure escrow checkout platform for Telegram and online marketplace transactions.

MuzlaPay is a frontend checkout app built with React and Vite for product-based sales where payment is held securely until the buyer confirms delivery. It is designed for marketplaces, Telegram stores, and similar sales flows where trust between buyer and seller is essential.

## Features

- Product checkout flow driven by product ID
- Escrow-style payment status handling
- Secure sale flow for buyer and seller
- Order and status cards for purchase states
- Clean UI built with React + SCSS
- Easy backend integration via configurable `VITE_API_BASE`
- Suitable for Telegram storefront and P2P marketplace scenarios

## Tech Stack

- Frontend: React, Vite, JavaScript, SCSS
- Styling: SCSS modular components
- API: Backend service via configurable base URL
- Deployment: Static frontend served from build output

## Security Note

⚠️ This repository contains the frontend only.

Real payment processing, escrow logic, transaction verification, and sensitive payment security must be handled on the backend.

For production deployment, ensure:

- HTTPS is enabled everywhere
- All payment data is validated server-side
- Authentication and authorization are enforced in the backend
- Sensitive user data is not stored in the frontend
- Escrow logic is protected against manipulation or bypass
- A trusted payment provider is used for actual financial processing
- Phone numbers, transaction data, and logs are protected against leaks

This frontend should never be treated as the complete payment system on its own.

## Project Structure

```text
MuzlaPay/
├── index.html
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── api.js
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
├── package.json
├── vite.config.js
├── .gitignore
├── README.md
├── LICENSE
├── .env.example
└── docs/
    └── screenshots/
```

## Prerequisites

- Node.js 18+
- npm or yarn
- Backend service running on `http://127.0.0.1:8000` during local development

## Installation

Install the frontend dependencies:

```bash
npm install
```

If SCSS is not already installed in your environment, run:

```bash
npm install -D sass
```

## Local Development

Start the app in development mode:

```bash
npm run dev
```

The app runs at:

```text
http://localhost:5173
```

During local testing, the backend should run separately, for example:

```bash
uvicorn Main:app --reload
```

Then open a product page in the browser using the product ID:

```text
http://localhost:5173/p/<product-id>
```

## Environment Configuration

If the backend moves to another domain, create a `.env` file in the project root and set:

```env
VITE_API_BASE=https://api.muzlapay.uz
```

Then the app will use that value instead of a hardcoded API URL.

## Production Build

Build the frontend for production:

```bash
npm run build
```

This creates a `dist/` folder.

To serve the app through the backend in production:

1. Copy all files from `dist/` into your backend project's `static/` folder.
2. Replace the existing checkout page route with the built app entry file.
3. Update the backend route logic from:

```python
return FileResponse("static/checkout.html")
```

to:

```python
return FileResponse("static/index.html")
```

4. Restart the backend.

After that, the app is served through the backend and accessible through a product URL such as:

```text
http://127.0.0.1:8000/p/<id>
```

## How It Works

1. The user opens a checkout page using a product ID.
2. The frontend fetches the product details from the backend.
3. The user proceeds with the purchase flow.
4. Payment is held in escrow until the product is confirmed as delivered.
5. The order status is shown to both seller and buyer.

## Screenshots

Add screenshots to the repository under a `docs/screenshots/` folder and reference them here.

```markdown
![Product Page](docs/screenshots/product-page.png)
![Checkout Flow](docs/screenshots/checkout-flow.png)
![Status Page](docs/screenshots/status-page.png)
```

## Project Goals

This project was built to provide a safer buying and selling experience for online marketplace transactions, especially in cases where users prefer to avoid direct trust-based handovers.

## Contributing

Issues and pull requests are welcome.

If you find a bug or want to suggest an improvement:

1. Open an issue
2. Describe the problem or feature request
3. Include screenshots when possible

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author

Temur Alisherov

GitHub: [@TemurbekCode](https://github.com/TemurbekCode)
