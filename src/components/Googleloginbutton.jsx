import { useEffect, useRef } from "react";

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

export default function GoogleLoginButton({ onSuccess, onError }) {
    const divRef = useRef(null);

    useEffect(() => {
        function render() {
            if (!window.google || !divRef.current) return;
            window.google.accounts.id.initialize({
                client_id: CLIENT_ID,
                callback: (response) => onSuccess(response.credential),
            });
            window.google.accounts.id.renderButton(divRef.current, {
                theme: "filled_blue",
                size: "large",
                shape: "pill",
                text: "continue_with",
            });
        }

        if (window.google) {
            render();
        } else {
            const script = document.createElement("script");
            script.src = "https://accounts.google.com/gsi/client";
            script.async = true;
            script.onload = render;
            script.onerror = () => onError?.("Google skripti yuklanmadi");
            document.head.appendChild(script);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!CLIENT_ID) {
        return (
            <div className="empty">
                VITE_GOOGLE_CLIENT_ID sozlanmagan. .env faylga Google Client ID'ni qo'shing.
            </div>
        );
    }

    return <div ref={divRef} style={{ display: "flex", justifyContent: "center", marginTop: 16 }} />;
}