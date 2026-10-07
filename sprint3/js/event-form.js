import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const formMesaj = document.querySelector("#form-mesaj");

if (form) {
  // GÜNCELLEME SAYFASI KONTROLÜ
  if (form.dataset.mode === "guncelle") {
    const id = new URLSearchParams(window.location.search).get("id");
    const etkinlik = events.find((e) => e.id === id);

    if (!etkinlik) {
      form.outerHTML = `
        <div class="hata-kutusu">
          <h2>Güncellenecek etkinlik seçilmedi</h2>
          <p>Önce listeden bir etkinlik seçin, detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.</p>
          <a href="etkinlikler.html" class="btn-aksiyon" style="margin-top:1rem; display:inline-block;">Etkinliklere git</a>
        </div>
      `;
    } else {
      // Alanları mevcut verilerle doldur
      form.elements["ad"].value = etkinlik.title;
      form.elements["kategori"].value = etkinlik.category;
      
      // GG-AA-YYYY -> YYYY-AA-GG (HTML date inputu için)
      const [d, m, y] = etkinlik.date.split("-");
      form.elements["tarih"].value = `${y}-${m}-${d}`;
      form.elements["saat"].value = etkinlik.time;
      form.elements["yer"].value = etkinlik.location;
      form.elements["kontenjan"].value = etkinlik.capacity;
      form.elements["aciklama"].value = etkinlik.description;
    }
  }

  // SUBMIT İŞLEYİCİSİ
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fd = new FormData(form);
    const data = {
      id: form.dataset.mode === "guncelle" ? (new URLSearchParams(window.location.search).get("id")) : `event-${events.length + 1}`,
      title: (fd.get("ad") || "").toString().trim(),
      category: (fd.get("kategori") || "").toString(),
      date: (fd.get("tarih") || "").toString(),
      time: (fd.get("saat") || "").toString(),
      location: (fd.get("yer") || "").toString().trim(),
      capacity: fd.get("kontenjan") ? Number(fd.get("kontenjan")) : null,
      description: (fd.get("aciklama") || "").toString().trim()
    };

    // Hata temizliği
    const errorSpans = form.querySelectorAll(".hata-metni");
    errorSpans.forEach((sp) => (sp.textContent = ""));
    const inputs = form.querySelectorAll("input, select, textarea");
    inputs.forEach((inp) => inp.removeAttribute("aria-invalid"));
    formMesaj.innerHTML = "";

    const errors = {};

    if (data.title.length < 3) {
      errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
    }
    if (!data.category) {
      errors.kategori = "Bir kategori seçin.";
    }
    if (!data.date) {
      errors.tarih = "Tarih seçin.";
    }
    if (!data.time) {
      errors.saat = "Saat seçin.";
    }
    if (!data.location) {
      errors.yer = "Yer bilgisini yazın.";
    }
    if (data.capacity !== null && (isNaN(data.capacity) || data.capacity < 1 || data.capacity > 1000)) {
      errors.kontenjan = "Kontenjan 1 ile 1000 arasında olmalı.";
    }

    // Hata varsa göster ve dur
    if (Object.keys(errors).length > 0) {
      for (const [key, msg] of Object.entries(errors)) {
        const errSpan = document.querySelector(`#${key}-hata`);
        if (errSpan) errSpan.textContent = msg;
        const targetInput = form.elements[key];
        if (targetInput) targetInput.setAttribute("aria-invalid", "true");
      }
      return;
    }

    // Başarı durumu: JSON çıktısı ver
    formMesaj.innerHTML = `
      <div class="basari-kutusu">
        <p><strong>${form.dataset.mode === "guncelle" ? "Etkinlik güncellendi" : "Etkinlik oluşturuldu"} (bu sprintte kaydedilmez):</strong></p>
        <pre>${JSON.stringify(data, null, 2)}</pre>
      </div>
    `;
  });
}