
function Header({ categories }) {
  return (
    <header className="header">
      <a href="#home" className="logo">
        DEVFLIX
      </a>

      <nav>
        <a href="#home">Início</a>

        {categories.map((category) => (
          <a key={category.id} href={`#${category.id}`}>
            {category.title}
          </a>
        ))}

        <a href="#favoritos">Favoritos</a>
      </nav>
    </header>
  );
}

export default Header;
