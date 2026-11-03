import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { formatDate } from "../utils/format-date";

export default function AdminPage() {
  const { events, deleteEvent } = useEvents();

  function handleDelete(id: string, title: string) {
    if (window.confirm(`"${title}" silinsin mi?`)) {
      deleteEvent(id);
    }
  }

  return (
    <div className="admin-sayfasi">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h2>Etkinlik Yönetimi</h2>
        <Link to="/admin/new" className="btn-guncelle" style={{ textDecoration: "none" }}>
          + Yeni Etkinlik
        </Link>
      </div>

      {events.length === 0 ? (
        <p className="sonuc-bilgisi">Henüz etkinlik yok.</p>
      ) : (
        <table className="tablo">
          <thead>
            <tr>
              <th>Etkinlik</th>
              <th>Tarih</th>
              <th>Kategori</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr key={e.id}>
                <td data-baslik="Etkinlik">{e.title}</td>
                <td data-baslik="Tarih">{formatDate(e.date)}</td>
                <td data-baslik="Kategori">{e.category}</td>
                <td className="islemler">
                  <Link to={`/admin/${e.id}/edit`} className="btn-aksiyon" style={{ padding: "0.4rem 0.8rem", textDecoration: "none" }}>
                    Düzenle
                  </Link>
                  <button
                    onClick={() => handleDelete(e.id, e.title)}
                    className="buton-sil"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}