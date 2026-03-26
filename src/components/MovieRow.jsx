import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useFetch from "../hooks/useFetch";
import MovieCard from "./MovieCard";
import "./MovieRow.css";

const MovieRow = ({ title, fetchUrl }) => {
  const { data: movies, loading } = useFetch(fetchUrl);
  const rowRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
  };

  const scrollLeft = () => {
    rowRef.current.scrollLeft -= 400;
  };

  const scrollRight = () => {
    rowRef.current.scrollLeft += 400;
  };

  if (loading)
    return (
      <div className="movie_row_skeleton">
        <div className="skeleton_title" />
        <div className="skeleton_cards">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="skeleton_card" />
          ))}
        </div>
      </div>
    );

  return (
    <section className="movie_row">
      <h2 className="movie_row_title">{title}</h2>

      <div className="movie_row_wrapper">
        {showLeftArrow && (
          <button className="row_arrow row_arrow_left" onClick={scrollLeft}>
            <ChevronLeft size={30} />
          </button>
        )}

        <div className="movie_row_cards" ref={rowRef} onScroll={handleScroll}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {showRightArrow && (
          <button className="row_arrow row_arrow_right" onClick={scrollRight}>
            <ChevronRight size={30} />
          </button>
        )}
      </div>
    </section>
  );
};

export default MovieRow;
