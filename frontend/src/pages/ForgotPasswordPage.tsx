import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Geçerli bir e-posta girin.");
      setSent(false);
    } else {
      setError("");
      setSent(true);
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Şifremi Unuttum</h2>
      <p className="spot-yazi">Kayıtlı e-posta adresinizi yazın, şifre yenileme bağlantısı gönderelim.</p>
      
      {sent && (
        <p className="sonuc-bilgisi" style={{ color: "green", background: "#eef9ee", padding: "0.8rem", borderRadius: "8px" }}>
          Bağlantı {email} adresine gönderildi (demo).
        </p>
      )}

      <form className="etkinlik-formu" onSubmit={handleSubmit} noValidate>
        <div className="form-grup">
          <label htmlFor="email">E-posta</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={error ? true : undefined}
          />
          <span className="hata-metni">{error}</span>
        </div>

        <button type="submit" className="btn-kaydet">
          Bağlantı gönder
        </button>
      </form>

      <div style={{ marginTop: "1rem" }}>
        <Link to="/login" className="detay-link">&larr; Girişe dön</Link>
      </div>
    </div>
  );
}