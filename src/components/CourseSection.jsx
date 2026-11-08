
import CourseCard from "./CourseCard";

function CourseSection({
  category,
  onSelect,
  onFavorite,
  favorites
}) {
  return (
    <section id={category.id} className="course-section">
      <h2>{category.title}</h2>

      <div className="course-grid">
        {category.courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onSelect={onSelect}
            onFavorite={onFavorite}
            isFavorite={favorites.includes(course.id)}
          />
        ))}
      </div>
    </section>
  );
}

export default CourseSection;
