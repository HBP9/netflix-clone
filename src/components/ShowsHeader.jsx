import { useState } from "react";
import { ChevronDown, List, Grid } from "lucide-react";
import { requests } from "../api/requests";
import "./ShowsHeader.css";

const genres = [
  {
    column: [
      { name: "Indian", fetchUrl: requests.popularShows },
      { name: "US Shows", fetchUrl: "/discover/tv?with_origin_country=US" },
      { name: "British", fetchUrl: requests.britishShows },
      { name: "Asian", fetchUrl: "/discover/tv?with_origin_country=JP" },
      { name: "K-Dramas", fetchUrl: requests.kDramas },
      { name: "Reality & Talk", fetchUrl: requests.tvReality },
    ],
  },
  {
    column: [
      { name: "Action", fetchUrl: requests.tvAction },
      { name: "Dramas", fetchUrl: requests.tvDramas },
      { name: "Comedies", fetchUrl: requests.tvComedies },
      { name: "Sci-Fi & Fantasy", fetchUrl: requests.tvSciFi },
      { name: "Crime", fetchUrl: requests.tvCrimes },
      { name: "Family", fetchUrl: requests.tvFamily },
      { name: "Kids", fetchUrl: requests.tvKids },
      { name: "Anime", fetchUrl: requests.animeShows },
    ],
  },
  {
    column: [
      { name: "Romance", fetchUrl: requests.romanceMovies },
      { name: "Horror", fetchUrl: requests.horrorMovies },
      { name: "Mystery", fetchUrl: requests.tvMystery },
      { name: "Documentary", fetchUrl: "/discover/tv?with_genres=99" },
    ],
  },
];

const ShowsHeader = ({
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

  const handleClearGenre = () => {
    onGenreSelect(null);
  };

  return (
    <div className="shows_header">
      <div className="shows_header_left">
        <h1 className="shows_title">TV Shows</h1>

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
                    onClick={handleClearGenre}
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

export default ShowsHeader;
