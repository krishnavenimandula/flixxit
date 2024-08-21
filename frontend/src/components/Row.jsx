import React, { useEffect, useState } from "react";
import instance from "../axios";
import "./Row.css";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";

const baseUrl = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  //const [isHovered, setIsHovered] = useState(false);
  const [hoveredMovieId, setHoveredMovieId] = useState(null);

  // Fetch movies when component mounts or fetchUrl changes
  useEffect(() => {
    async function fetchData() {
      const request = await instance.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row-container">
        <div className="row-posters">
          {movies.map((movie) => (
            // <Link
            //   key={movie.id}
            //   to={`/movie/${movie.id}`} // Navigate to MovieDetails page with movie ID
            // >
            <div
              key={movie.id}
              className="row-item"
              onMouseEnter={() => setHoveredMovieId(movie.id)}
              onMouseLeave={() => setHoveredMovieId(null)}
            >
              <img
                key={movie.id}
                className="row-poster"
                src={`${baseUrl}${movie.backdrop_path}`}
                alt={movie.name}
              />

              {hoveredMovieId === movie.id && (
                <div className="hover">
                  <div className="image-video-container">
                    <img
                      className="row-poster"
                      src={`${baseUrl}${movie.backdrop_path}`}
                      alt={movie.name}
                    />
                  </div>
                  <div className="info-container flex column">
                    <h3>{movie.name}</h3>
                  </div>
                  <div>
                    <RiThumbUpFill title="Like" />
                    <RiThumbDownFill title="DisLike" />
                  </div>
                </div>
              )}
            </div>
            // </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Row;
