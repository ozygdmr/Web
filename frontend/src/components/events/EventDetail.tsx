import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

export function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
  return (
    <div className="detay-grid">
      {event.image && (
        <figure className="afis-kutusu">
          <img src={event.image} alt={`${event.title} Afişi`} />
          <figcaption>{event.title} afişi</figcaption>
        </figure>
      )}

      <div className="kunye-alani">
        <h3>Etkinlik Künyesi</h3>
        <dl>
          <dt>Tarih</dt>
          <dd>
            <time dateTime={event.date}>
              {formatDate(event.date)}, {event.time}
            </time>
          </dd>
          <dt>Yer</dt>
          <dd>{event.location}</dd>
          <dt>Kategori</dt>
          <dd>{event.category}</dd>
          <dt>Kontenjan</dt>
          <dd>{event.capacity} kişi</dd>
        </dl>

        <h3>Açıklama</h3>
        <p className="aciklama">{event.description}</p>

        <div className="detay-aksiyonlar">
          <a
            href="#events"
            className="btn-aksiyon"
            onClick={(e) => {
              e.preventDefault();
              onBack();
            }}
          >
            &larr; Listeye dön
          </a>
          <a
            href="#update"
            className="btn-guncelle"
            onClick={(e) => {
              e.preventDefault();
              onEdit(event.id);
            }}
          >
            Bu etkinliği güncelle
          </a>
        </div>
      </div>
    </div>
  );
}