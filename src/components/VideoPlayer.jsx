
function VideoPlayer({ course, onClose }) {
  if (!course) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-label={course.title}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-button" onClick={onClose}>
          ✕
        </button>

        <h2>{course.title}</h2>

        <div className="video-container">
          <iframe
            src={`https://www.youtube.com/embed/${course.videoId}`}
            title={course.title}
            allowFullScreen
            allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
          />
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
