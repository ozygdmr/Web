import type { CampusEvent } from "./../../types/campus-event";
import { formatDate } from "./../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
  onShowDetail: (id: string) => void;
}

export function EventCard({ event, onShowDetail }: EventCardProps) {
  return (
    <article className="etkinlik-karti">
      <h3>{event.title}</h3>
      <p className="kategori">{event.category}</p>
      <p className="tarih">
        <time dateTime={event.date}>
          {formatDate(event.date)}, {event.time}
        </time>
      </p>
      <p className="konum">Yer: {event.location}</p>
      <p className="kontenjan">Kontenjan: {event.capacity} kişi</p>
      <p className="aciklama-kisa">{event.description}</p>
      <a
        href={`#${event.id}`}
        className="detay-link"
        onClick={(e) => {
          e.preventDefault();
          onShowDetail(event.id);
        }}
      >
        Detayları gör &rarr;
      </a>
    </article>
  );
}