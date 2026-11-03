import { useState } from "react";
import { useEvents } from "../context/EventsContext";
import type{ Category } from "../types/campus-event";
import { searchEvents, filterByCategory } from "../utils/filter-events";
import { EventFilter } from "../components/events/EventFilter";
import { EventList } from "../components/events/EventList";

export default function EventsPage() {
  const { events } = useEvents();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  const categories: Category[] = [...new Set(events.map((e) => e.category))];
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  return (
    <>
      <h2>Tüm Etkinlikler</h2>
      <EventFilter
        searchText={searchText}
        selectedCategory={category}
        categories={categories}
        onSearchChange={setSearchText}
        onCategoryChange={setCategory}
      />
      <EventList events={filtered} emptyText="Aramanıza uygun etkinlik bulunamadı." />
    </>
  );
}