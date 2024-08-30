import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardSlider from "./CardSlider";
import { fetchDataByGenreTv, getGenres } from "../store";

export default function TvSlider() {
  const dispatch = useDispatch();
  const { tvByGenre, genresLoaded } = useSelector((state) => state.flixxit);

  const [uniqueMovies, setUniqueMovies] = useState([]);

  useEffect(() => {
    if (!genresLoaded) {
      dispatch(getGenres());
    } else if (tvByGenre.length === 0) {
      dispatch(fetchDataByGenreTv({ genres: ["28", "16", "35", "99"] })); // Fetch genres
    }
  }, [dispatch, genresLoaded, tvByGenre.length]);

  useEffect(() => {
    if (tvByGenre.length > 0) {
      // Flatten the movie lists and ensure uniqueness
      const allMovies = tvByGenre.flatMap(
        (genreData) => genreData.movies || []
      );

      const uniqueMoviesMap = new Map();
      allMovies.forEach((movie) => uniqueMoviesMap.set(movie.id, movie));
      setUniqueMovies(Array.from(uniqueMoviesMap.values()));
    }
  }, [tvByGenre]);

  const getMoviesForGenre = (genreId) => {
    const genreData = tvByGenre.find(({ genre }) => genre === genreId);
    if (genreData) {
      const movies = genreData.movies.filter((movie) =>
        uniqueMovies.some((uniqueMovie) => uniqueMovie.id === movie.id)
      );
      return movies.slice(0, 15); // Limit to 15 movies
    }
    return [];
  };

  const genreNames = {
    16: "Animation",
    35: "Comedy",
    99: "Documentaries",
  };

  const genreSliders = Object.keys(genreNames).map((genreId) => (
    <CardSlider
      key={genreId} // Ensure unique key
      data={getMoviesForGenre(genreId)}
      title={genreNames[genreId]}
    />
  ));

  if (!genresLoaded || tvByGenre.length === 0) {
    return <div>Loading...</div>;
  }

  return <div className="container">{genreSliders}</div>;
}
