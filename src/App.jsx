
import { useState } from "react";
import Header from "./components/Header";
import CourseSection from "./components/CourseSection";
import CourseCard from "./components/CourseCard";
import VideoPlayer from "./components/VideoPlayer";
import { categories } from "./data/courses";
import "./App.css";

function App() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);

  function handleFavorite(id) {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }

  const filteredCategories = categories.map((category) => ({
    ...category,
    courses: category.courses.filter((course) =>
      course.title.toLowerCase().includes(search.toLowerCase())
    ),
  }));

  const favoriteCourses = categories
    .flatMap((category) => category.courses)
    .filter((course) => favorites.includes(course.id));

  return (
    <>
      <Header categories={categories} />

      <main id="home">
        <section className="hero">
          <h1>Bem-vindo ao DevFlix</h1>
          <p>Aprenda programação com aulas gratuitas.</p>

          <input
            type="text"
            placeholder="Pesquisar aulas..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </section>

        {filteredCategories.map((category) => (
          <CourseSection
            key={category.id}
            category={category}
            onSelect={setSelectedCourse}
            onFavorite={handleFavorite}
            favorites={favorites}
          />
        ))}

        <section id="favoritos" className="course-section">
          <h2>Meus Favoritos</h2>

          {favoriteCourses.length === 0 ? (
            <p>Nenhuma aula favorita.</p>
          ) : (
            <div className="course-grid">
              {favoriteCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onSelect={setSelectedCourse}
                  onFavorite={handleFavorite}
                  isFavorite={favorites.includes(course.id)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <VideoPlayer
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
      />
    </>
  );
}

export default App;
