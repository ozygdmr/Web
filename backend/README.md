# Kampüs API - REST Sözleşmesi

## Endpoints

| Method     | Endpoint                    | Amaç                  | Başarılı | Hata     | Durum     |
| :--------- | :-------------------------- | :-------------------- | :------- | :------- | :-------- |
| **GET**    | `/events?search=&category=` | Filtreli listeyi getir | 200      | —        | Çalışıyor |
| **GET**    | `/events/upcoming`          | Yaklaşan etkinlikler  | 200      | —        | Çalışıyor |
| **GET**    | `/events/:id`               | Tek etkinlik          | 200      | 404      | Çalışıyor |
| **POST**   | `/events`                   | Yeni etkinlik         | 201      | 400      | Çalışıyor |
| **PATCH**  | `/events/:id`               | Güncelle              | 200      | 400, 404 | Çalışıyor |
| **DELETE** | `/events/:id`               | Sil                   | 204      | 404      | Çalışıyor |

## Status Code'lar

- **200 OK**: İşlem başarılı[cite: 41, 47].
- **201 Created**: Yeni kayıt oluşturuldu[cite: 41, 47].
- **204 No Content**: İçerik yok / Silindi[cite: 41, 47].
- **400 Bad Request**: Eksik veya yanlış veri gönderildi[cite: 41, 47].
- **404 Not Found**: İstenen kaynak veya route bulunamadı[cite: 41, 47].

## Standart Hata Formatı

Bütün hatalar backend tarafında aynı standart biçimde dönmektedir[cite: 41, 47, 48]:

```json
{
  "error": {
    "message": "Event not found"
  }
}
```
