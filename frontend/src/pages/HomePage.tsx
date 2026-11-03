import { Link } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { EventList } from "../components/events/EventList";
import { useEvents } from "../context/EventsContext";

export default function HomePage() {
  const { events } = useEvents();

  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  return (
    <>
      <Header
        title="Kampüs Etkinlikleri"
        text="Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin."
      />
      <h2>Yaklaşan 2 Etkinlik</h2>
      <EventList events={upcoming} />
      <Link to="/events" className="tum-etkinlikler-link">
        Tüm etkinlikleri gör &rarr;
      </Link>
    </>
  );
}