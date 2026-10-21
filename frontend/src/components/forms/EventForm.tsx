import type { Category } from "../../types/campus-event";

interface EventFormProps {
  categories: Category[];
  buttonText?: string;
  onSubmit: () => void;
}

export function EventForm({
  categories,
  buttonText = "Kaydet",
  onSubmit,
}: EventFormProps) {
  return (
    <>
      <p className="spot-yazi">
        Bu sprintte form sadece görünüm; kayıt yapılmaz.
      </p>

      <form
        className="etkinlik-formu"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
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
            <option value="" disabled>
              Seçiniz
            </option>
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
          {buttonText}
        </button>
      </form>
    </>
  );
}