import { useState, useEffect } from "react";
import "./App.css";

import { Header } from "./components/layout/Header";
import { Navigation } from "./components/layout/Navigation";
import { Footer } from "./components/layout/Footer";

import { EventList } from "./components/events/EventList";
import { EventFilter } from "./components/events/EventFilter";
import { EventDetail } from "./components/events/EventDetail";
import { EventForm } from "./components/forms/EventForm";

import { events } from "./data/events";
import type {Category } from "./types/campus-event";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";
import type { PageName } from "./types/pages";

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "">("");

  const go = (next: PageName, id: string | null = null) => {
    setPage(next);
    setSelectedId(id);
  };

  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  // Navigasyon çubuğu ve Tab için dinamik başlığı tek noktadan alıyoruz
  const getPageTitle = (): string => {
    if (page === "events") return "Tüm Etkinlikler";
    if (page === "add") return "Etkinlik Ekle";
    if (page === "update") return "Etkinlik Güncelle";
    if (page === "detail") return selected ? selected.title : "Etkinlik Detayı";
    return "Kampüs Etkinlikleri";
  };

  // Tarayıcı sekmesi (Tab) başlığını güncelleme
  useEffect(() => {
    const currentTitle = getPageTitle();
    document.title = page === "home" 
      ? "Kampüs Etkinlikleri - Ana Sayfa" 
      : `Kampüs Etkinlikleri - ${currentTitle}`;
  }, [page, selected]);

  const upcoming = [...events].sort((a, b) => {
    const [d1, m1, y1] = a.date.split("-").map(Number);
    const [d2, m2, y2] = b.date.split("-").map(Number);
    return new Date(y1, m1 - 1, d1).getTime() - new Date(y2, m2 - 1, d2).getTime();
  }).slice(0, 2);

  const categories: Category[] = [...new Set(events.map((e) => e.category))];
  const filtered = filterByCategory(searchEvents(events, searchText), selectedCategory);

  return (
    <div className="kapsayici-kart">
      {/* ÜST NAVİGASYON ÇUBUĞU: Detaya girilince başlık otomatik değişir */}
      <header>
        <h1>{getPageTitle()}</h1>
        <Navigation current={page} onNavigate={go} />
      </header>

      <main>
        {page === "home" && (
          <Header title="Kampüs Etkinlikleri" text="Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin." />
        )}

        {page === "home" && (
          <>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <EventList events={upcoming} onShowDetail={(id) => go("detail", id)} />
            <a href="#events" className="tum-etkinlikler-link" onClick={(e) => { e.preventDefault(); go("events"); }}>
              Tüm etkinlikleri gör &rarr;
            </a>
          </>
        )}

        {page === "events" && (
          <>
            <EventFilter
              searchText={searchText}
              selectedCategory={selectedCategory}
              categories={categories}
              onSearchChange={setSearchText}
              onCategoryChange={setSelectedCategory}
            />
            <EventList
              events={filtered}
              onShowDetail={(id) => go("detail", id)}
              emptyText="Aramanıza uygun etkinlik bulunamadı."
            />
          </>
        )}

        {page === "detail" && (
          selected ? (
            <EventDetail event={selected} onBack={() => go("events")} onEdit={(id) => go("update", id)} />
          ) : (
            <div className="hata-kutusu">
              <h2>Etkinlik bulunamadı</h2>
              <p>"{selectedId || "Belirtilmemiş"}" numaralı bir etkinlik yok.</p>
              <a href="#events" className="btn-aksiyon" style={{ marginTop: "1rem" }} onClick={(e) => { e.preventDefault(); go("events"); }}>
                &larr; Listeye dön
              </a>
            </div>
          )
        )}

        {(page === "add" || page === "update") && (
          <EventForm
            categories={categories}
            buttonText={page === "add" ? "Kaydet" : "Güncelle"}
            onSubmit={() => window.scrollTo(0, 0)}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;