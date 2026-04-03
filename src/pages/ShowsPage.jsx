import { useState } from "react";
import HeroBanner from "../components/HeroBanner";
import MovieRow from "../components/MovieRow";
import MovieCard from "../components/MovieCard";
import ShowsHeader from "../components/ShowsHeader";
import useFetch from "../hooks/useFetch";
import { requests } from "../api/requests";
import "./ShowsPage.css";

const showRows = [
  { title: "Popular Shows", fetchUrl: requests.popularShows },
  { title: "TV Dramas", fetchUrl: requests.tvDramas },
  { title: "30-Minute Laughs", fetchUrl: requests.tvComedies },
  { title: "Crime TV", fetchUrl: requests.tvCrimes },
  { title: "Sci-Fi & Fantasy", fetchUrl: requests.tvSciFi },
  { title: "K-Dramas", fetchUrl: requests.kDramas },
  { title: "British Shows", fetchUrl: requests.britishShows },
  { title: "Anime", fetchUrl: requests.animeShows },
];

const GenreGrid = ({ fetchUrl, viewMode }) => {
  const { data: shows, loading } = useFetch(fetchUrl);

  if (loading)
    return (
      <div className="genre_grid_loading">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="skeleton_card" />
        ))}
      </div>
    );

  return (
    <div className={viewMode === "grid" ? "genre_grid" : "genre_list"}>
      {shows.map((show) => (
        <MovieCard key={show.id} movie={show} />
      ))}
    </div>
  );
};

const ShowsPage = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [viewMode, setViewMode] = useState("list");

  return (
    <div className="shows_page">
      <HeroBanner fetchUrl={requests.trendingShows} />

      <ShowsHeader
        selectedGenre={selectedGenre}
        onGenreSelect={setSelectedGenre}
        viewMode={viewMode}
        onViewChange={setViewMode}
      />

      {selectedGenre ? (
        <div className="shows_genre_content">
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
        <div className="shows_genre_content">
          <GenreGrid fetchUrl={requests.popularShows} viewMode="grid" />
        </div>
      ) : (
        <div className="shows_rows">
          {showRows.map((row) => (
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

export default ShowsPage;
