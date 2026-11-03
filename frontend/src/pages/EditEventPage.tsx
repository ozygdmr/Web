import { useParams, useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { findEventById } from "../utils/filter-events";
import { EventForm } from "../components/forms/EventForm";
import type{ Category, EventFormData } from "../types/campus-event";
import NotFoundPage from "./NotFoundPage";

export default function EditEventPage() {
  const { id } = useParams();
  const { events, updateEvent } = useEvents();
  const navigate = useNavigate();

  const event = findEventById(events, id ?? "");
  if (!event) return <NotFoundPage />;

  const categories: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

  const initialData: EventFormData = {
    title: event.title,
    category: event.category,
    date: event.date,
    time: event.time,
    location: event.location,
    capacity: String(event.capacity),
    description: event.description,
    image: event.image,
  };

  function handleSubmit(data: EventFormData) {
    updateEvent(event!.id, data);
    navigate("/admin");
  }

  return (
    <>
      <h2>Etkinliği Güncelle</h2>
      <EventForm
        initialData={initialData}
        submitText="Güncelle"
        onSubmit={handleSubmit}
        categories={categories}
      />
    </>
  );
}