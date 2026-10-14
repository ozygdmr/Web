import { useState, useEffect } from "react";
import "./App.css";
import { events } from "./data/events";
import type { CampusEvent, Category } from "./types/campus-event";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

function formatDate(dateStr: string) {
  const [day, month, year] = dateStr.split("-").map(Number);
  const dateObj = new Date(year, month - 1, day);
  return dateObj.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Arama ve kategori filtre state'leri
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "">("");

  // Sayfa yönlendirme fonksiyonu (Adım 8)
  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  // Detay için seçilen etkinlik (Adım 12)
  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  // Sekme Başlığı Güncelleme (Adım 11)
  useEffect(() => {
    if (page === "detail" && selected) {
      document.title = `${selected.title} - Etkinlik Detayı`;
    } else if (page === "events") {
      document.title = "Kampüs Etkinlikleri - Tüm Etkinlikler";
    } else if (page === "add") {
      document.title = "Kampüs Etkinlikleri - Etkinlik Ekle";
    } else if (page === "update") {
      document.title = "Kampüs Etkinlikleri - Etkinlik Güncelle";
    } else {
      document.title = "Kampüs Etkinlikleri - Ana Sayfa";
    }
  }, [page, selected]);

  // Ana sayfa için en yakın 2 etkinlik (Adım 9)
  const upcoming = [...events]
    .sort((a, b) => {
      const [d1, m1, y1] = a.date.split("-").map(Number);
      const [d2, m2, y2] = b.date.split("-").map(Number);
      return new Date(y1, m1 - 1, d1).getTime() - new Date(y2, m2 - 1, d2).getTime();
    })
    .slice(0, 2);

  // Kategoriler ve filtrelenmiş liste (Adım 10)
  const categories: Category[] = [...new Set(events.map((e) => e.category))];
  const filtered = filterByCategory(searchEvents(events, searchText), selectedCategory);

  // Kart JSX Fonksiyonu (Adım 9)
  function renderCard(event: CampusEvent) {
    return (
      <article className="etkinlik-karti" key={event.id}>
        <h3>{event.title}</h3>
        <p className="kategori">{event.category}</p>
        <p className="tarih">
          <time dateTime={event.date}>{formatDate(event.date)}, {event.time}</time>
        </p>
        <p className="konum">Yer: {event.location}</p>
        <p className="kontenjan">Kontenjan: {event.capacity} kişi</p>
        <p className="aciklama-kisa">{event.description}</p>
        <a
          href={`#${event.id}`}
          className="detay-link"
          onClick={(e) => {
            e.preventDefault();
            go("detail", event.id);
          }}
        >
          Detayları gör &rarr;
        </a>
      </article>
    );
  }

  return (
    <div className="kapsayici-kart">
      <header>
        <h1>
          {page === "events" && "Tüm Etkinlikler"}
          {page === "add" && "Etkinlik Ekle"}
          {page === "update" && "Etkinlik Güncelle"}
          {page === "detail" && (selected ? selected.title : "Etkinlik Detayı")}
          {page === "home" && "Kampüs Etkinlikleri"}
        </h1>
        <nav>
          <a
            href="#home"
            className={page === "home" ? "aktif" : ""}
            onClick={(e) => {
              e.preventDefault();
              go("home");
            }}
          >
            Ana Sayfa
          </a>
          <a
            href="#events"
            className={page === "events" ? "aktif" : ""}
            onClick={(e) => {
              e.preventDefault();
              go("events");
            }}
          >
            Etkinlikler
          </a>
          <a
            href="#add"
            className={page === "add" ? "aktif" : ""}
            onClick={(e) => {
              e.preventDefault();
              go("add");
            }}
          >
            Ekle
          </a>
        </nav>
      </header>

      <main>
        {/* --- ADIM 9: ANA SAYFA --- */}
        {page === "home" && (
          <>
            <p className="spot-yazi">
              Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.
            </p>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <section className="yaklasan-etkinlikler">
              {upcoming.map(renderCard)}
            </section>
            <a
              href="#events"
              className="tum-etkinlikler-link"
              onClick={(e) => {
                e.preventDefault();
                go("events");
              }}
            >
              Tüm etkinlikleri gör &rarr;
            </a>
          </>
        )}

        {/* --- ADIM 10: ETKİNLİKLER SAYFASI --- */}
        {page === "events" && (
          <>
            <form className="filtre-kutusu" onSubmit={(e) => e.preventDefault()}>
              <div className="filtre-grup">
                <label htmlFor="arama">Etkinlik ara</label>
                <input
                  type="search"
                  id="arama"
                  placeholder="Örn: atölye, kariyer..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div className="filtre-grup">
                <label htmlFor="kategori-filtre">Kategori</label>
                <select
                  id="kategori-filtre"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as Category | "")}
                >
                  <option value="">Tümü</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </form>

            <p className="sonuc-bilgisi">
              {filtered.length === 0
                ? "Aramanıza uygun etkinlik bulunamadı."
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>

            <section className="etkinlikler-izgara">
              {filtered.map(renderCard)}
            </section>
          </>
        )}

        {/* --- ADIM 12: DETAY SAYFASI --- */}
        {page === "detail" && (
          <>
            {!selected ? (
              <div className="hata-kutusu">
                <h2>Etkinlik bulunamadı</h2>
                <p>"{selectedId || "Belirtilmemiş"}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.</p>
                <a
                  href="#events"
                  className="btn-aksiyon"
                  style={{ display: "inline-block", marginTop: "1rem" }}
                  onClick={(e) => {
                    e.preventDefault();
                    go("events");
                  }}
                >
                  &larr; Listeye dön
                </a>
              </div>
            ) : (
              <div className="detay-grid">
                {selected.image && (
                  <figure className="afis-kutusu">
                    <img src={selected.image} alt={`${selected.title} Afişi`} />
                    <figcaption>{selected.title} afişi</figcaption>
                  </figure>
                )}

                <div className="kunye-alani">
                  <h3>Etkinlik Künyesi</h3>
                  <dl>
                    <dt>Tarih</dt>
                    <dd>
                      <time dateTime={selected.date}>
                        {formatDate(selected.date)}, {selected.time}
                      </time>
                    </dd>
                    <dt>Yer</dt>
                    <dd>{selected.location}</dd>
                    <dt>Kategori</dt>
                    <dd>{selected.category}</dd>
                    <dt>Kontenjan</dt>
                    <dd>{selected.capacity} kişi</dd>
                  </dl>

                  <h3>Açıklama</h3>
                  <p className="aciklama">{selected.description}</p>

                  <div className="detay-aksiyonlar">
                    <a
                      href="#events"
                      className="btn-aksiyon"
                      onClick={(e) => {
                        e.preventDefault();
                        go("events");
                      }}
                    >
                      &larr; Listeye dön
                    </a>
                    <a
                      href="#update"
                      className="btn-guncelle"
                      onClick={(e) => {
                        e.preventDefault();
                        go("update", selected.id);
                      }}
                    >
                      Bu etkinliği güncelle
                    </a>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* --- ADIM 13: EKLE VE GÜNCELLE FORMLARI --- */}
        {(page === "add" || page === "update") && (
          <>
            <p className="spot-yazi">
              Bu sprintte form sadece görünüm; kayıt yapılmaz.
            </p>

            <form
              className="etkinlik-formu"
              onSubmit={(e) => e.preventDefault()}
              noValidate
            >
              <div className="form-grup">
                <label htmlFor="ad">Etkinlik Adı *</label>
                <input
                  type="text"
                  id="ad"
                  name="ad"
                  maxLength={80}
                  placeholder="Örn: Kariyer Günleri 2026"
                />
              </div>

              <div className="form-grup">
                <label htmlFor="kategori">Kategori *</label>
                <select id="kategori" name="kategori" defaultValue="">
                  <option value="" disabled>Seçiniz</option>
                  {categories.map((kat) => (
                    <option key={kat} value={kat}>
                      {kat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-grup">
                <label htmlFor="tarih">Tarih *</label>
                <input type="date" id="tarih" name="tarih" />
              </div>

              <div className="form-grup">
                <label htmlFor="saat">Saat *</label>
                <input type="time" id="saat" name="saat" />
              </div>

              <div className="form-grup">
                <label htmlFor="yer">Yer *</label>
                <input
                  type="text"
                  id="yer"
                  name="yer"
                  placeholder="Örn: A Blok Konferans Salonu"
                />
              </div>

              <div className="form-grup">
                <label htmlFor="kontenjan">Kontenjan</label>
                <input
                  type="number"
                  id="kontenjan"
                  name="kontenjan"
                  placeholder="Örn: 100"
                  min={1}
                  max={1000}
                />
              </div>

              <div className="form-grup">
                <label htmlFor="aciklama">Açıklama</label>
                <textarea
                  id="aciklama"
                  name="aciklama"
                  rows={3}
                  placeholder="Etkinlik açıklaması..."
                />
              </div>

              <button type="submit" className="btn-kaydet">
                {page === "add" ? "Kaydet" : "Güncelle"}
              </button>
            </form>
          </>
        )}
      </main>
    </div>
  );
}

export default App;