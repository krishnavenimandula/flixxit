import React, { useEffect, useState } from "react";
import axios from "axios";
import requests from "../request";
import "./Banner.css";

import { useNavigate } from "react-router";
function Banner({ type }) {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const [movie, setMovie] = useState([]);
  const navigate = useNavigate();
  const TMDB_BASE_URL = "https://api.themoviedb.org/3";
  useEffect(() => {
    async function fetchData() {
      let request;
      if (type == "movie") {
        request = await axios.get(
          `${TMDB_BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`
        );
        // Ensu);
      }
      if (type == "tv") {
        request = await axios.get(
          `${TMDB_BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=16`
        );
      }

      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner-contents">
        <h1 className="banner-title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        {/* background image */}
        {/* title */}
        <div className="banner-buttons">
          <button className="banner-button" onClick={() => navigate("/player")}>
            Play
          </button>
          <button className="banner-button" onClick={() => navigate("/mylist")}>
            Watch list
          </button>
        </div>
        {/* tow buttons */}
        {/* description */}
        <h1 className="banner-description">{truncate(movie?.overview, 150)}</h1>
      </div>
    </header>
  );
}

export default Banner;
