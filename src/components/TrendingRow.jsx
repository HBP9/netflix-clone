import { useRef, useState } from "react";
import { IMAGE_BASE_URL } from "../api/tmdb";
import { requests } from "../api/requests";
import "./TrendingRow.css";
import caretRightNarrow from "../assets/caret-right-narrow.svg";
import MovieModal from "./MovieModal";
import useFetch from "../hooks/useFetch";

const TrendingRow = () => {
  const rowRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { data: movies } = useFetch(requests.trending);

  const handleScroll = () => {
    const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
  };

  const handleScrollRight = () => {
    rowRef.current.scrollLeft += 400;
  };

  const handleScrollLeft = () => {
    rowRef.current.scrollLeft -= 400;
  };

  return (
    <section className="trending">
      <h2 className="trending_title">Trending Now</h2>

      <div className="trending_wrapper">
        {showLeftArrow && (
          <button className="arrow arrow_left" onClick={handleScrollLeft}>
            <img
              src={caretRightNarrow}
              alt="caret-left"
              className="arrow_icon_flipped"
            />
          </button>
        )}

        <div className="trending_row" ref={rowRef} onScroll={handleScroll}>
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className="movie_card"
              onClick={() => setSelectedMovie(movie)}
            >
              <span className="movie_number">{index + 1}</span>
              <div className="movie_poster">
                <img
                  src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                  alt={movie.title || movie.name}
                />
              </div>
            </div>
          ))}
        </div>

        {showRightArrow && (
          <button className="arrow arrow_right" onClick={handleScrollRight}>
            <img src={caretRightNarrow} alt="caret-right" />
          </button>
        )}
      </div>
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </section>
  );
};

export default TrendingRow;
