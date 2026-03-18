import { useEffect } from "react";
import { createPortal } from "react-dom";
import { BACKDROP_BASE_URL } from "../api/tmdb";
import "./MovieModal.css";

const MovieModal = ({ movie, onClose }) => {
  const title = movie.title || movie.name;
  const year = (movie.release_date || movie.first_air_date || "").slice(0, 4);
  const mediaType = movie.media_type === "tv" ? "TV Show" : "Movie";

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div className="modal_overlay" onClick={handleOverlayClick}>
      <div className="modal_content">
        <div className="modal_backdrop">
          <img src={`${BACKDROP_BASE_URL}${movie.backdrop_path}`} alt={title} />
          <div className="modal_backdrop_fade" />
        </div>
        <button className="modal_close" onClick={onClose}>
          ✕
        </button>
        <div className="modal_info">
          <h2 className="modal_title">{title}</h2>

          <div className="modal_tags">
            {year && <span className="modal_tag">{year}</span>}
            {movie.adult ? (
              <span className="modal_tag">A</span>
            ) : (
              <span className="modal_tag">U/A</span>
            )}
            <span className="modal_tag">{mediaType}</span>
            {movie.vote_average && (
              <span className="modal_tag">
                ⭐ {movie.vote_average.toFixed(1)}
              </span>
            )}
          </div>
          <p className="modal_overview">{movie.overview}</p>
          <button className="modal_cta">
            Get Started <span>›</span>
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default MovieModal;
