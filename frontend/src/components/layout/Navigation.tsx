import type { PageName } from "../../types/pages";

interface NavigationProps {
  current: PageName;
  onNavigate: (page: PageName) => void;
}

// Menü dizisini slayttaki isteğe uygun olarak buraya taşıyoruz
const navItems: { name: PageName; label: string }[] = [
  { name: "home", label: "Ana Sayfa" },
  { name: "events", label: "Etkinlikler" },
  { name: "add", label: "Ekle" },
];

export function Navigation({ current, onNavigate }: NavigationProps) {
  return (
    <nav>
      {navItems.map((item) => (
        <a
          key={item.name}
          href={`#${item.name}`}
          className={current === item.name ? "aktif" : ""}
          onClick={(e) => {
            e.preventDefault();
            onNavigate(item.name);
          }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}