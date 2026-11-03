import { Routes, Route, useLocation, matchPath } from "react-router-dom";
import "./App.css";

import { Navigation } from "./components/layout/Navigation";
import { Footer } from "./components/layout/Footer";
import { useEvents } from "./context/EventsContext";
import { findEventById } from "./utils/filter-events";

import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import AdminPage from "./pages/AdminPage";
import AddEventPage from "./pages/AddEventPage";
import EditEventPage from "./pages/EditEventPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import NotFoundPage from "./pages/NotFoundPage";

function AppHeader() {
  const location = useLocation();
  const { events } = useEvents();

  // Aktif adrese göre başlığı belirleyen yardımcı fonksiyon
  const getHeaderTitle = (): string => {
    const path = location.pathname;

    // /events/:id detay kontrolü
    const eventDetailMatch = matchPath("/events/:id", path);
    if (eventDetailMatch) {
      const id = eventDetailMatch.params.id;
      const found = id ? findEventById(events, id) : undefined;
      return found ? found.title : "Etkinlik Detayı";
    }

    // /admin/:id/edit güncelleme kontrolü
    const editMatch = matchPath("/admin/:id/edit", path);
    if (editMatch) {
      return "Etkinlik Güncelle";
    }

    if (path === "/events") return "Tüm Etkinlikler";
    if (path === "/admin") return "Etkinlik Yönetimi";
    if (path === "/admin/new") return "Etkinlik Ekle";
    if (path === "/login") return "Giriş Yap";
    if (path === "/register") return "Kayıt Ol";
    if (path === "/forgot-password") return "Şifremi Unuttum";

    return "Kampüs Etkinlikleri";
  };

  return (
    <header>
      <h1>{getHeaderTitle()}</h1>
      <Navigation />
    </header>
  );
}

function App() {
  return (
    <div className="kapsayici-kart">
      <AppHeader />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/new" element={<AddEventPage />} />
          <Route path="/admin/:id/edit" element={<EditEventPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;