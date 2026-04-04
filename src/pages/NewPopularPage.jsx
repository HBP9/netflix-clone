import MovieRow from "../components/MovieRow";
import { requests } from "../api/requests";
import "./NewPopularPage.css";

const NewPopularPage = () => {
  return (
    <div className="new_popular_page">
      <div className="new_popular_header">
        <h1 className="new_popular_title">New & Popular</h1>
      </div>

      <div className="new_popular_rows">
        <MovieRow title="New on Netflix" fetchUrl={requests.newOnNetflix} />
        <MovieRow
          title="Top 10 Movies Today"
          fetchUrl={requests.top10Movies}
          isTop10={true}
        />
        <MovieRow
          title="Top 10 Shows Today"
          fetchUrl={requests.top10Shows}
          isTop10={true}
        />
        <MovieRow
          title="Popular This Week"
          fetchUrl={requests.popularThisWeek}
        />
        <MovieRow title="Coming Soon" fetchUrl={requests.comingSoon} />
      </div>
    </div>
  );
};

export default NewPopularPage;
