import React, { useEffect, useState } from "react";
import instance from "../axios";
import requests from "../request";
import "./Banner.css";

import { useNavigate } from "react-router";
function Banner() {
  const [movie, setMovie] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const request = await instance.get(requests.fetchTrending);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      console.log(request);
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
      onClick={() => navigate("/player")}
    >
      <div className="banner-contents">
        <h1 className="banner-title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        {/* background image */}
        {/* title */}
        <div className="banner-buttons">
          <button className="banner-button">Play</button>
          <button className="banner-button">My List</button>
        </div>
        {/* tow buttons */}
        {/* description */}
        <h1 className="banner-description">{truncate(movie?.overview, 150)}</h1>
      </div>
    </header>
  );
}

export default Banner;
