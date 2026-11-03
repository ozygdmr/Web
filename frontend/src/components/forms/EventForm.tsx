import { useState} from "react";
import type{ChangeEvent, FormEvent } from "react";
import type{ Category, EventFormData, EventFormErrors } from "../../types/campus-event";
import { validateEvent } from "../../utils/validate-event";

interface EventFormProps {
  initialData?: EventFormData;
  submitText?: string;
  onSubmit: (data: EventFormData) => void;
  categories: Category[];
}

export function EventForm({
  initialData = {
    title: "",
    category: "",
    date: "",
    time: "",
    location: "",
    capacity: "",
    description: "",
  },
  submitText = "Kaydet",
  onSubmit,
  categories,
}: EventFormProps) {
  const [data, setData] = useState<EventFormData>(initialData);
  const [errors, setErrors] = useState<EventFormErrors>({});

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateEvent(data);
    setErrors(found);
    if (Object.keys(found).length === 0) {
      onSubmit(data);
    }
  }

  return (
    <form className="etkinlik-formu" onSubmit={handleSubmit} noValidate>
      <div className="form-grup">
        <label htmlFor="title">Etkinlik Adı *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={data.title}
          onChange={handleChange}
          aria-invalid={errors.title ? true : undefined}
          placeholder="Örn: Kariyer Günleri 2026"
        />
        <span className="hata-metni">{errors.title}</span>
      </div>

      <div className="form-grup">
        <label htmlFor="category">Kategori *</label>
        <select
          id="category"
          name="category"
          value={data.category}
          onChange={handleChange}
          aria-invalid={errors.category ? true : undefined}
        >
          <option value="">Bir kategori seçin...</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <span className="hata-metni">{errors.category}</span>
      </div>

      <div className="form-grup">
        <label htmlFor="date">Tarih *</label>
        <input
          type="date"
          id="date"
          name="date"
          value={data.date}
          onChange={handleChange}
          aria-invalid={errors.date ? true : undefined}
        />
        <span className="hata-metni">{errors.date}</span>
      </div>

      <div className="form-grup">
        <label htmlFor="time">Saat *</label>
        <input
          type="time"
          id="time"
          name="time"
          value={data.time}
          onChange={handleChange}
          aria-invalid={errors.time ? true : undefined}
        />
        <span className="hata-metni">{errors.time}</span>
      </div>

      <div className="form-grup">
        <label htmlFor="location">Yer *</label>
        <input
          type="text"
          id="location"
          name="location"
          value={data.location}
          onChange={handleChange}
          aria-invalid={errors.location ? true : undefined}
          placeholder="Örn: A Blok Konferans Salonu"
        />
        <span className="hata-metni">{errors.location}</span>
      </div>

      <div className="form-grup">
        <label htmlFor="capacity">Kontenjan *</label>
        <input
          type="number"
          id="capacity"
          name="capacity"
          value={data.capacity}
          onChange={handleChange}
          aria-invalid={errors.capacity ? true : undefined}
          placeholder="Örn: 100"
        />
        <span className="hata-metni">{errors.capacity}</span>
      </div>

      <div className="form-grup">
        <label htmlFor="description">Açıklama *</label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={data.description}
          onChange={handleChange}
          aria-invalid={errors.description ? true : undefined}
          placeholder="Etkinlik açıklaması..."
        />
        <span className="hata-metni">{errors.description}</span>
      </div>

      <button type="submit" className="btn-kaydet">
        {submitText}
      </button>
    </form>
  );
}