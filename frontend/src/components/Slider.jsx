import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardSlider from "./CardSlider";
import { fetchDataByGenre, getGenres } from "../store";

export default function Slider() {
  const dispatch = useDispatch();
  const { moviesByGenre, genresLoaded } = useSelector((state) => state.flixxit);

  const [uniqueMovies, setUniqueMovies] = useState([]);

  useEffect(() => {
    if (!genresLoaded) {
      dispatch(getGenres());
    } else if (moviesByGenre.length === 0) {
      dispatch(fetchDataByGenre({ genres: ["28", "16", "35", "99"] })); // Fetch genres
    }
  }, [dispatch, genresLoaded, moviesByGenre.length]);

  useEffect(() => {
    if (moviesByGenre.length > 0) {
      // Flatten the movie lists and ensure uniqueness
      const allMovies = moviesByGenre.flatMap(
        (genreData) => genreData.movies || []
      );

      const uniqueMoviesMap = new Map();
      allMovies.forEach((movie) => uniqueMoviesMap.set(movie.id, movie));
      setUniqueMovies(Array.from(uniqueMoviesMap.values()));
    }
  }, [moviesByGenre]);

  const getMoviesForGenre = (genreId) => {
    const genreData = moviesByGenre.find(({ genre }) => genre === genreId);
    if (genreData) {
      const movies = genreData.movies.filter((movie) =>
        uniqueMovies.some((uniqueMovie) => uniqueMovie.id === movie.id)
      );
      return movies.slice(0, 15); // Limit to 15 movies
    }
    return [];
  };

  const genreNames = {
    28: "Action Movies",
    16: "Animation Movies",
    35: "Comedy Movies",
    99: "Documentaries",
  };

  const genreSliders = Object.keys(genreNames).map((genreId) => (
    <CardSlider
      key={genreId} // Ensure unique key
      data={getMoviesForGenre(genreId)}
      title={genreNames[genreId]}
    />
  ));

  if (!genresLoaded || moviesByGenre.length === 0) {
    return <div>Loading...</div>;
  }

  return <div className="container">{genreSliders}</div>;
}
