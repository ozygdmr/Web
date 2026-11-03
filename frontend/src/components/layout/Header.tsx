interface HeaderProps {
  title?: string;
  text?: string;
}

export function Header({ title = "Kampüs Etkinlikleri", text }: HeaderProps) {
  return (
    <header className="site-baslik">
      <h1>{title}</h1>
      {text && <p>{text}</p>}
    </header>
  );
}