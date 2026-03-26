export const requests = {
  trending: "/trending/all/week",
  topRatedMovies: "/movie/top_rated",
  topRatedShows: "/tv/top_rated",
  actionMovies: "/discover/movie?with_genres=28",
  comedyMovies: "/discover/movie?with_genres=35",
  horrorMovies: "/discover/movie?with_genres=27",
  romanceMovies: "/discover/movie?with_genres=10749",
  nowPlaying: "/movie/now_playing",
  popularMovies: "/movie/popular",
  popularShows: "/tv/popular",
  animeShows: "/discover/tv?with_genres=16",
};

export const getMovieVideos = (id, mediaType = "movie") =>
  `/${mediaType}/${id}/videos`;
