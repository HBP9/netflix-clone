import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Play, Plus, ThumbsUp, ChevronDown } from "lucide-react";
import { IMAGE_BASE_URL, BACKDROP_BASE_URL } from "../api/tmdb";
import tmdb from "../api/tmdb";
import "./MovieCard.css";

const HoverCard = ({
  movie,
  position,
  imageUrl,
  title,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [videoKey, setVideoKey] = useState(null);
  const [videoLoading, setVideoLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const mediaType = movie.media_type === "tv" ? "tv" : "movie";
        const response = await tmdb.get(`/${mediaType}/${movie.id}/videos`);
        const videos = response.data.results;

        // Find trailer or teaser
        const trailer = videos.find(
          (v) =>
            v.site === "YouTube" &&
            (v.type === "Trailer" || v.type === "Teaser" || v.type === "Clip"),
        );

        if (trailer) setVideoKey(trailer.key);
      } catch (err) {
        console.error("Error fetching video:", err);
      } finally {
        setVideoLoading(false);
      }
    };

    fetchVideo();
  }, [movie.id, movie.media_type]);

  return createPortal(
    <div
      className="mc_hover_portal"
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        width: position.width,
        zIndex: 9999,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="mc_movie_card_hover">
        {/* Video or fallback image */}
        <div className="mc_hover_img">
          {!videoLoading && videoKey ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${videoKey}&showinfo=0&rel=0&iv_load_policy=3&disablekb=1`}
              title={title}
              allow="autoplay; encrypted-media"
              allowFullScreen={false}
              className="mc_hover_video"
            />
          ) : (
            <>
              <img src={imageUrl} alt={title} />
              <div className="mc_card_title_overlay">
                <span className="mc_card_title">{title}</span>
              </div>
            </>
          )}
        </div>

        <div className="mc_hover_info">
          <div className="mc_hover_actions">
            <div className="mc_hover_actions_left">
              <button className="mc_hover_btn mc_play_btn">
                <Play size={16} fill="black" />
              </button>
              <button className="mc_hover_btn">
                <Plus size={16} />
              </button>
              <button className="mc_hover_btn">
                <ThumbsUp size={16} />
              </button>
            </div>
            <button className="mc_hover_btn">
              <ChevronDown size={16} />
            </button>
          </div>

          <div className="mc_hover_details">
            <div className="mc_hover_tags">
              {movie.adult ? (
                <span className="mc_hover_tag">A</span>
              ) : (
                <span className="mc_hover_tag">U/A</span>
              )}
              {movie.vote_average && (
                <span className="mc_hover_match">
                  {Math.round(movie.vote_average * 10)}% Match
                </span>
              )}
              <span className="mc_hover_tag">HD</span>
            </div>
            <div className="mc_hover_genre">
              {movie.media_type === "tv" ? "TV Show" : "Movie"}
              {movie.original_language && (
                <span> • {movie.original_language.toUpperCase()}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

const MovieCard = ({ movie, rank = null }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverPosition, setHoverPosition] = useState(null);
  const cardRef = useRef(null);
  const hoverTimeout = useRef(null);
  const leaveTimeout = useRef(null);

  const title = movie.title || movie.name;
  const imageUrl = movie.backdrop_path
    ? `${BACKDROP_BASE_URL}${movie.backdrop_path}`
    : movie.poster_path
      ? `${IMAGE_BASE_URL}${movie.poster_path}`
      : null;

  if (!imageUrl) return null;

  const showHover = () => {
    clearTimeout(leaveTimeout.current);
    hoverTimeout.current = setTimeout(() => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;

      const hoverWidth = rect.width * 1.6;
      const left = rect.left + rect.width / 2 - hoverWidth / 2;
      const top = rect.top - rect.height * 0.3;

      const adjustedLeft = Math.max(
        10,
        Math.min(left, window.innerWidth - hoverWidth - 10),
      );

      setHoverPosition({
        top: top,
        left: adjustedLeft,
        width: hoverWidth,
      });
      setIsHovered(true);
    }, 400);
  };

  const hideHover = () => {
    clearTimeout(hoverTimeout.current);
    leaveTimeout.current = setTimeout(() => {
      setIsHovered(false);
      setHoverPosition(null);
    }, 300); // small delay — gives time to move mouse to hover card
  };

  useEffect(() => {
    const handleScroll = () => {
      clearTimeout(hoverTimeout.current);
      clearTimeout(leaveTimeout.current);
      setIsHovered(false);
      setHoverPosition(null);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        ref={cardRef}
        className={`mc_movie_card ${isHovered ? "hovered" : ""} ${rank ? "mc_ranked" : ""}`}
        onMouseEnter={showHover}
        onMouseLeave={hideHover}
      >
        {rank && <span className="mc_rank_number">{rank}</span>}
        <div className="mc_movie_card_image">
          <img src={imageUrl} alt={title} />
          <div className="mc_card_title_overlay">
            <span className="mc_card_title">{title}</span>
          </div>
        </div>
      </div>

      {isHovered && hoverPosition && (
        <HoverCard
          movie={movie}
          position={hoverPosition}
          imageUrl={imageUrl}
          title={title}
          onMouseEnter={() => clearTimeout(leaveTimeout.current)}
          onMouseLeave={hideHover}
        />
      )}
    </>
  );
};

export default MovieCard;
