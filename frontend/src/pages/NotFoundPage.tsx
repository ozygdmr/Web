import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="hata-kutusu">
      <h2>Sayfa bulunamadı</h2>
      <p>Aradığınız sayfa mevcut değil veya taşınmış olabilir.</p>
      <Link to="/events" className="btn-aksiyon" style={{ marginTop: "1rem", display: "inline-block" }}>
        &larr; Listeye dön
      </Link>
    </div>
  );
}