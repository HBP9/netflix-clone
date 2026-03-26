import { requests } from "../api/requests";
import MovieRow from "../components/MovieRow";
import "./HomePage.css";
import HeroBanner from "../components/HeroBanner";

const HomePage = () => {
  return (
    <div className="home_page">
      <HeroBanner />
      <div className="home_rows">
        <MovieRow title="Trending Now" fetchUrl={requests.trending} />
        <MovieRow title="Top Rated Movies" fetchUrl={requests.topRatedMovies} />
        <MovieRow title="Popular Shows" fetchUrl={requests.popularShows} />
        <MovieRow title="Action Movies" fetchUrl={requests.actionMovies} />
        <MovieRow title="Comedy Movies" fetchUrl={requests.comedyMovies} />
        <MovieRow title="Horror Movies" fetchUrl={requests.horrorMovies} />
        <MovieRow title="Romance" fetchUrl={requests.romanceMovies} />
        <MovieRow title="Anime" fetchUrl={requests.animeShows} />
      </div>
    </div>
  );
};

export default HomePage;
