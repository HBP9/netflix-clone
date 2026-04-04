import { useState } from "react";
import { ChevronDown, List, Grid } from "lucide-react";
import { requests } from "../api/requests";
import "./MoviesHeader.css";

const genres = [
  {
    column: [
      { name: "Indian Movies", fetchUrl: requests.indianMovies },
      { name: "Bollywood", fetchUrl: requests.bollywoodMovies },
      { name: "US Movies", fetchUrl: requests.usMovies },
      { name: "Korean Movies", fetchUrl: requests.koreanMovies },
      { name: "European Movies", fetchUrl: requests.europeanMovies },
    ],
  },
  {
    column: [
      { name: "Action", fetchUrl: requests.actionMovies },
      { name: "Comedy", fetchUrl: requests.comedyMovies },
      { name: "Horror", fetchUrl: requests.horrorMovies },
      { name: "Romance", fetchUrl: requests.romanceMovies },
      { name: "Thriller", fetchUrl: requests.thrillerMovies },
      { name: "Sci-Fi", fetchUrl: requests.sciFiMovies },
      { name: "Animation", fetchUrl: requests.animationMovies },
    ],
  },
  {
    column: [
      { name: "Documentaries", fetchUrl: requests.documentaries },
      { name: "Award Winning", fetchUrl: requests.awardWinning },
      { name: "Family", fetchUrl: requests.familyMovies },
      { name: "Crime", fetchUrl: requests.crimeMovies },
      { name: "Drama", fetchUrl: requests.dramaMovies },
    ],
  },
];

const MoviesHeader = ({
  selectedGenre,
  onGenreSelect,
  viewMode,
  onViewChange,
}) => {
  const [showGenres, setShowGenres] = useState(false);

  const handleGenreClick = (genre) => {
    onGenreSelect(genre);
    setShowGenres(false);
  };

  return (
    <div className="movies_header">
      <div className="movies_header_left">
        <h1 className="movies_title">Movies</h1>

        <div
          className="genres_wrapper"
          onMouseEnter={() => setShowGenres(true)}
          onMouseLeave={() => setShowGenres(false)}
        >
          <button className="genres_btn">
            {selectedGenre ? selectedGenre.name : "Genres"}
            <ChevronDown size={14} />
          </button>

          {showGenres && (
            <div className="genres_dropdown">
              {selectedGenre && (
                <div className="genres_clear_col">
                  <span
                    className="genre_item genre_clear"
                    onClick={() => onGenreSelect(null)}
                  >
                    ✕ Clear Filter
                  </span>
                </div>
              )}
              {genres.map((group, colIndex) => (
                <ul key={colIndex} className="genres_column">
                  {group.column.map((genre) => (
                    <li
                      key={genre.name}
                      className={`genre_item ${selectedGenre?.name === genre.name ? "active" : ""}`}
                      onClick={() => handleGenreClick(genre)}
                    >
                      {genre.name}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="shows_view_toggle">
        <button
          className={`view_btn ${viewMode === "list" ? "active" : ""}`}
          onClick={() => onViewChange("list")}
        >
          <List size={18} />
        </button>
        <button
          className={`view_btn ${viewMode === "grid" ? "active" : ""}`}
          onClick={() => onViewChange("grid")}
        >
          <Grid size={18} />
        </button>
      </div>
    </div>
  );
};

export default MoviesHeader;
