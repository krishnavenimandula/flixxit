import React, { useEffect, useState } from "react";
import "./Home.css";
import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Slider from "../components/Slider";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.flixxit.movies);
  const genres = useSelector((state) => state.flixxit.genres);
  const genresLoaded = useSelector((state) => state.flixxit.genresLoaded);
  console.log(movies);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "all" }));
    }
  }, [genresLoaded]);

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <div className="app">
      {/* NavBar */}
      <Navbar isScrolled={isScrolled} />
      {/* Banner */}
      <Banner />
      <Slider movies={movies} />
      {/* <Row title="Trending now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} /> */}
    </div>
  );
};

export default Home;
