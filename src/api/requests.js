export const requests = {
  trending: "/trending/all/week",
  topRatedMovies: "/movie/top_rated",
  actionMovies: "/discover/movie?with_genres=28",
  comedyMovies: "/discover/movie?with_genres=35",
  horrorMovies: "/discover/movie?with_genres=27",
  romanceMovies: "/discover/movie?with_genres=10749",
  nowPlaying: "/movie/now_playing",
  popularMovies: "/movie/popular",
  popularShows: "/tv/popular",
  animeShows: "/discover/tv?with_genres=16",
  // New TV specific
  trendingShows: "/trending/tv/week",
  topRatedShows: "/tv/top_rated",
  tvDramas: "/discover/tv?with_genres=18",
  tvComedies: "/discover/tv?with_genres=35",
  tvCrimes: "/discover/tv?with_genres=80",
  tvSciFi: "/discover/tv?with_genres=10765",
  tvReality: "/discover/tv?with_genres=10764",
  tvFamily: "/discover/tv?with_genres=10751",
  tvKids: "/discover/tv?with_genres=10762",
  tvAction: "/discover/tv?with_genres=10759",
  tvMystery: "/discover/tv?with_genres=9648",
  kDramas: "/discover/tv?with_origin_country=KR",
  britishShows: "/discover/tv?with_origin_country=GB",
};

export const getMovieVideos = (id, mediaType = "movie") =>
  `/${mediaType}/${id}/videos`;
