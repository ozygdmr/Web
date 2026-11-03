import { useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { EventForm } from "../components/forms/EventForm";
import type { Category, EventFormData } from "../types/campus-event";

export default function AddEventPage() {
  const { addEvent } = useEvents(); // <-- 'events' kaldırıldı
  const navigate = useNavigate();

  const categories: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

  const emptyForm: EventFormData = {
    title: "",
    category: "",
    date: "",
    time: "",
    location: "",
    capacity: "",
    description: "",
  };

  function handleSubmit(data: EventFormData) {
    addEvent(data);
    navigate("/admin");
  }

  return (
    <>
      <h2>Yeni Etkinlik Ekle</h2>
      <EventForm
        initialData={emptyForm}
        submitText="Kaydet"
        onSubmit={handleSubmit}
        categories={categories}
      />
    </>
  );
}