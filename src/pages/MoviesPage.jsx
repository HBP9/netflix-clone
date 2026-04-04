import { useState } from "react";
import HeroBanner from "../components/HeroBanner";
import MovieRow from "../components/MovieRow";
import MovieCard from "../components/MovieCard";
import MoviesHeader from "../components/MoviesHeader";
import useFetch from "../hooks/useFetch";
import { requests } from "../api/requests";
import "./MoviesPage.css";

const movieRows = [
  { title: "Bollywood Movies", fetchUrl: requests.bollywoodMovies },
  { title: "Indian Movies", fetchUrl: requests.indianMovies },
  { title: "US Movies", fetchUrl: requests.usMovies },
  { title: "Top Rated Movies", fetchUrl: requests.topRatedMovies },
  { title: "Action Movies", fetchUrl: requests.actionMovies },
  { title: "Comedy Movies", fetchUrl: requests.comedyMovies },
  { title: "Horror Movies", fetchUrl: requests.horrorMovies },
  { title: "Romance Movies", fetchUrl: requests.romanceMovies },
  { title: "Documentaries", fetchUrl: requests.documentaries },
  { title: "Award Winning", fetchUrl: requests.awardWinning },
];

const GenreGrid = ({ fetchUrl }) => {
  const { data: movies, loading } = useFetch(fetchUrl);

  if (loading)
    return (
      <div className="genre_grid_loading">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="skeleton_card" />
        ))}
      </div>
    );

  return (
    <div className="genre_grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

const MoviesPage = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [viewMode, setViewMode] = useState("list");

  return (
    <div className="movies_page">
      <HeroBanner fetchUrl={requests.popularMovies} />

      <MoviesHeader
        selectedGenre={selectedGenre}
        onGenreSelect={setSelectedGenre}
        viewMode={viewMode}
        onViewChange={setViewMode}
      />

      {selectedGenre ? (
        <div className="movies_genre_content">
          <h2 className="genre_selected_title">{selectedGenre.name}</h2>
          {viewMode === "grid" ? (
            <GenreGrid fetchUrl={selectedGenre.fetchUrl} />
          ) : (
            <MovieRow
              title={selectedGenre.name}
              fetchUrl={selectedGenre.fetchUrl}
            />
          )}
        </div>
      ) : viewMode === "grid" ? (
        <div className="movies_genre_content">
          <GenreGrid fetchUrl={requests.popularMovies} />
        </div>
      ) : (
        <div className="movies_rows">
          {movieRows.map((row) => (
            <MovieRow
              key={row.title}
              title={row.title}
              fetchUrl={row.fetchUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MoviesPage;
