import { events } from "./data.js";

const container = document.querySelector("#detay-alani");
const id = new URLSearchParams(window.location.search).get("id");
const event = events.find((e) => e.id === id);

if (!event) {
  document.title = "Etkinlik Bulunamadı";
  if (container) {
    container.innerHTML = `
      <div class="hata-kutusu">
        <h2>Etkinlik bulunamadı</h2>
        <p>"${id || "Belirtilmemiş"}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.</p>
        <a href="etkinlikler.html" class="btn-aksiyon">&larr; Listeye dön</a>
      </div>
    `;
  }
} else {
  document.title = `${event.title} - Etkinlik Detayı`;

  const [day, month, year] = event.date.split("-").map(Number);
  const formattedDate = new Date(year, month - 1, day).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  if (container) {
    container.innerHTML = `
      <div class="detay-grid">
        <figure class="afis-kutusu">
          <img src="${event.image}" alt="${event.title} Afişi">
          <figcaption>${event.title} afişi</figcaption>
        </figure>

        <div class="kunye-alani">
          <h3>Etkinlik Künyesi</h3>
          <dl>
            <dt>Tarih</dt>
            <dd><time datetime="${event.date}">${formattedDate}, ${event.time}</time></dd>
            <dt>Yer</dt>
            <dd>${event.location}</dd>
            <dt>Kategori</dt>
            <dd>${event.category}</dd>
            <dt>Kontenjan</dt>
            <dd>${event.capacity} kişi</dd>
          </dl>

          <h3>Açıklama</h3>
          <p class="aciklama">${event.description}</p>

          <div class="detay-aksiyonlar">
            <a href="etkinlikler.html" class="btn-aksiyon">&larr; Listeye dön</a>
            <a href="etkinlik-guncelle.html?id=${event.id}" class="btn-guncelle">Bu etkinliği güncelle</a>
          </div>
        </div>
      </div>
    `;
  }
}