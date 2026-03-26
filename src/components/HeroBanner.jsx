import { useState, useEffect } from "react";
import { Play, Info, VolumeX, Volume2 } from "lucide-react";
import useFetch from "../hooks/useFetch";
import { requests } from "../api/requests";
import { BACKDROP_BASE_URL } from "../api/tmdb";
import "./HeroBanner.css";

const HeroBanner = () => {
  const { data: movies } = useFetch(requests.trending);
  const [movie, setMovie] = useState(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (movies.length > 0) {
      const random = movies[Math.floor(Math.random() * movies.length)];
      setMovie(random);
    }
  }, [movies]);

  if (!movie) return null;

  const title = movie.title || movie.name;
  const description = movie.overview;
  const backdropUrl = `${BACKDROP_BASE_URL}${movie.backdrop_path}`;

  return (
    <div className="hero_banner">
      <div className="hero_banner_bg">
        <img src={backdropUrl} alt={title} />
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
