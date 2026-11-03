# Kampüs Etkinlikleri - Frontend

Kampüs içi etkinliklerin takip edildiği, filtrelendiği ve yönetildiği React + TypeScript uygulaması.

## Canlı Vercel Adresi
https://yigitozdemir-frontend.vercel.app

## Kurulum
npm install
npm run dev

## Route Listesi
1. / -> HomePage (Ana sayfa)
2. /events -> EventsPage (Tüm etkinlikler, arama ve filtreleme)
3. /events/:id -> EventDetailPage (Etkinlik detay, örn: /events/event-1)
4. /login -> LoginPage (Giriş yap)
5. /register -> RegisterPage (Kayıt ol)
6. /forgot-password -> ForgotPasswordPage (Şifremi unuttum)
7. /admin -> AdminPage (Etkinlik yönetimi)
8. /admin/new -> AddEventPage (Yeni etkinlik ekle)
9. /admin/:id/edit -> EditEventPage (Etkinlik düzenle, örn: /admin/event-1/edit)
10. * -> NotFoundPage (Sayfa bulunamadı)
