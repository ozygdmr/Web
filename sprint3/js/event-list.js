import { events } from "./data.js";

// Tarih formatlama yardımcısı (GG-AA-YYYY -> "12 Ekim 2026")
function formatDate(dateStr) {
  const [day, month, year] = dateStr.split("-").map(Number);
  const dateObj = new Date(year, month - 1, day);
  return dateObj.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

// Kart HTML şablonu
function createCard(event) {
  return `
    <article class="etkinlik-karti">
      <h3>${event.title}</h3>
      <p class="kategori">${event.category}</p>
      <p class="tarih"><time datetime="${event.date}">${formatDate(event.date)}, ${event.time}</time></p>
      <p class="konum">Yer: ${event.location}</p>
      <p class="kontenjan">Kontenjan: ${event.capacity} kişi</p>
      <p class="aciklama-kisa">${event.description}</p>
      <a href="etkinlik-detay.html?id=${event.id}" class="detay-link">Detayları gör &rarr;</a>
    </article>
  `;
}

const listContainer = document.querySelector("#etkinlik-listesi");

if (listContainer) {
  // ANA SAYFA (data-limit="2")
  if (listContainer.dataset.limit) {
    const limit = Number(listContainer.dataset.limit);
    // Tarihe göre artan sırala
    const yaklasan = [...events].sort((a, b) => {
      const [d1, m1, y1] = a.date.split("-").map(Number);
      const [d2, m2, y2] = b.date.split("-").map(Number);
      return new Date(y1, m1 - 1, d1) - new Date(y2, m2 - 1, d2);
    }).slice(0, limit);

    listContainer.innerHTML = yaklasan.map(createCard).join("");
  } 
  // LİSTE SAYFASI (Arama ve Filtreleme)
  else {
    const aramaInput = document.querySelector("#arama");
    const kategoriSelect = document.querySelector("#kategori-filtre");
    const sonucSatiri = document.querySelector("#sonuc");
    const filtreFormu = document.querySelector("#filtre-formu");

    // Form submitinde sayfa yenilenmesini engelle
    if (filtreFormu) {
      filtreFormu.addEventListener("submit", (e) => e.preventDefault());
    }

    // Kategorileri veriden tekil olarak üret
    if (kategoriSelect) {
      const uniqueKategoriler = [...new Set(events.map((e) => e.category))];
      uniqueKategoriler.forEach((kat) => {
        const opt = document.createElement("option");
        opt.value = kat;
        opt.textContent = kat;
        kategoriSelect.appendChild(opt);
      });
    }

    function render(dizi) {
      if (dizi.length === 0) {
        listContainer.innerHTML = "";
        sonucSatiri.textContent = "Aramanıza uygun etkinlik bulunamadı.";
      } else {
        listContainer.innerHTML = dizi.map(createCard).join("");
        sonucSatiri.textContent = `${dizi.length} etkinlik listeleniyor.`;
      }
    }

    function filtrele() {
      const aranan = aramaInput ? aramaInput.value.trim().toLocaleLowerCase("tr-TR") : "";
      const secilenKategori = kategoriSelect ? kategoriSelect.value : "";

      const filtrelenmis = events.filter((e) => {
        const titleMatch = e.title.toLocaleLowerCase("tr-TR").includes(aranan);
        const descMatch = e.description.toLocaleLowerCase("tr-TR").includes(aranan);
        const locMatch = e.location.toLocaleLowerCase("tr-TR").includes(aranan);
        const metinUyuyor = aranan === "" || titleMatch || descMatch || locMatch;
        const kategoriUyuyor = secilenKategori === "" || e.category === secilenKategori;

        return metinUyuyor && kategoriUyuyor;
      });

      render(filtrelenmis);
    }

    if (aramaInput) aramaInput.addEventListener("input", filtrele);
    if (kategoriSelect) kategoriSelect.addEventListener("change", filtrele);

    // Başlangıç render'ı
    render(events);
  }
}