import { useState, useEffect } from "react";
import { Play, Info, VolumeX, Volume2 } from "lucide-react";
import useFetch from "../hooks/useFetch";
import { requests } from "../api/requests";
import tmdb from "../api/tmdb";
import { BACKDROP_BASE_URL } from "../api/tmdb";
import "./HeroBanner.css";

const HeroBanner = ({ fetchUrl = requests.trending }) => {
  const { data: movies } = useFetch(fetchUrl);
  const [movie, setMovie] = useState(null);
  const [muted, setMuted] = useState(true);
  const [videoKey, setVideoKey] = useState(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    if (movies.length > 0) {
      const random = movies[Math.floor(Math.random() * movies.length)];
      setMovie(random);
    }
  }, [movies]);

  useEffect(() => {
    if (!movie) return;

    const fetchVideo = async () => {
      try {
        const mediaType = movie.media_type === "tv" ? "tv" : "movie";
        const response = await tmdb.get(`/${mediaType}/${movie.id}/videos`);
        const videos = response.data.results;

        const trailer = videos.find(
          (v) =>
            v.site === "YouTube" &&
            (v.type === "Trailer" || v.type === "Teaser"),
        );

        if (trailer) setVideoKey(trailer.key);
      } catch (err) {
        console.error("Error fetching video:", err);
      }
    };

    fetchVideo();
  }, [movie]);

  if (!movie) return null;

  const title = movie.title || movie.name;
  const description = movie.overview;
  const backdropUrl = `${BACKDROP_BASE_URL}${movie.backdrop_path}`;

  return (
    <div className="hero_banner">
      <div className="hero_banner_bg">
        {videoKey ? (
          <>
            {!videoReady && (
              <img src={backdropUrl} alt={title} className="hero_banner_img" />
            )}
            <iframe
              className={`hero_banner_video ${videoReady ? "visible" : ""}`}
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=${muted ? 1 : 0}&controls=0&modestbranding=1&loop=1&playlist=${videoKey}&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&enablejsapi=1`}
              title={title}
              allow="autoplay; encrypted-media"
              allowFullScreen={false}
              onLoad={() => setVideoReady(true)}
            />
          </>
        ) : (
          <img src={backdropUrl} alt={title} className="hero_banner_img" />
        )}
        <div className="hero_banner_overlay_bottom" />
        <div className="hero_banner_overlay_left" />
      </div>

      <div className="hero_banner_content">
        <h1 className="hero_banner_title">{title}</h1>
        <p className="hero_banner_desc">{description}</p>

        <div className="hero_banner_btns">
          <button className="hero_btn hero_btn_play">
            <Play size={20} fill="black" />
            Play
          </button>
          <button className="hero_btn hero_btn_info">
            <Info size={20} />
            More Info
          </button>
        </div>
      </div>

      <div className="hero_banner_right">
        <button className="hero_mute_btn" onClick={() => setMuted(!muted)}>
          {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        <span className="hero_rating">{movie.adult ? "A" : "U/A 13+"}</span>
      </div>
    </div>
  );
};

export default HeroBanner;
