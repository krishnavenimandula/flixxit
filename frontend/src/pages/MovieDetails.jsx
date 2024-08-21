import React from "react";
import { useLocation } from "react-router-dom";
import "./MovieDetails.css";
import Navbar from "../components/Navbar";
function MovieDetails() {
  const location = useLocation();
  const { movie } = location.state;
  console.log(movie);
  return (
    <div className="movie-details">
      <Navbar isScrolled={true} />
      <div>
        <h1>{movie.name}</h1>
      </div>
      <div className="movie-fields">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
          alt={movie.name}
          className="movie-details-image"
        />
        <div className="movie-description">
          <h3>Overview: </h3>
          <p>{movie.overview}</p>
          <h3>Rating: </h3>
          <div className="rating-circle">{Math.floor(movie.rating)}</div>
        </div>
      </div>
      {/* Add more details as needed */}
    </div>
  );
}

export default MovieDetails;
