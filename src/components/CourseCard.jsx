
function CourseCard({ course, onSelect, onFavorite, isFavorite }) {
  return (
    <div className="course-card">
      <img
        src={`https://img.youtube.com/vi/${course.videoId}/hqdefault.jpg`}
        alt={course.title}
      />

      <div className="course-info">
        <h3>{course.title}</h3>
        <p>{course.description}</p>

        <div className="card-buttons">
          <button onClick={() => onSelect(course)}>
            Assistir
          </button>

          <button onClick={() => onFavorite(course.id)}>
            {isFavorite ? "♥ Favoritado" : "♡ Favoritar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
