import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { FaPowerOff, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";
import SearchBar from "./SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { searchByText, getGenres } from "../store";
const TMDB_API_KEY = "7f23e52bff7fe0dc439791818ec6e4ed"; // Replace with your TMDB API key

function Navbar({ isScrolled }) {
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const genres = useSelector((state) => state.flixxit.genres);
  //const searchResultsDetails = useSelector((state) => state.flixxit.search);
  //console.log(searchResultsDetails);
  const dispatch = useDispatch();
  const links = [
    { name: "Home", link: "/" },
    { name: "TV Shows", link: "/tv" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/mylist" },
  ];

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedQuery) {
      handleSearch(debouncedQuery);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    dispatch(getGenres());
  }, []);
  // useEffect(() => {
  //   console.log("enterd");
  //   dispatch(searchByText());
  // }, []);

  const handleSearch = async (query) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
          query
        )}`
      );

      const data = await response.json();
      console.log(data.results);
      let movieArray = [];
      let filteredArray = data.results.filter(
        (item) => item.media_type === "movie" && item.backdrop_path != null
      );

      console.log(filteredArray);
      filteredArray.forEach((movie) => {
        const movieGenres = [];
        movie.genre_ids.forEach((genre) => {
          const name = genres.find(({ id }) => id === genre);
          if (name) movieGenres.push(name.name);
        });
        movieArray.push({
          id: movie.id,
          name: movie?.original_name
            ? movie.original_name
            : movie.original_title,
          image: movie.backdrop_path,
          genres: movieGenres.slice(0, 3),
          poster: movie.poster_path,
          overview: movie.overview,
          rating: movie.vote_average,
        });
      });

      console.log(movieArray);
      setSearchResults(movieArray);
      console.log("Search results:", movieArray); // Log the results or handle them as needed
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const closeSearch = () => {
    setSearchResults([]);
    setSearchQuery("");
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-left">
        <p className="brand">Flixxit</p>
        <button className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <ul className={`links ${menuOpen ? "show-links" : ""}`}>
          {links.map(({ name, link }) => (
            <li key={name}>
              <Link to={link} onClick={() => setMenuOpen(false)}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-right">
        <div className={`search ${showSearch ? "show-search" : ""}`}>
          <button
            onFocus={() => setShowSearch(true)}
            onBlur={() => {
              if (!inputHover) {
                setShowSearch(false);
              }
            }}
          >
            <FaSearch />
          </button>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleInputChange}
            onMouseEnter={() => setInputHover(true)}
            onMouseLeave={() => setInputHover(false)}
            onBlur={() => {
              setShowSearch(false);
              setInputHover(false);
            }}
          />
        </div>
        <button>
          <FaPowerOff />
        </button>
      </div>
      {searchResults.length > 0 && (
        <SearchBar searchResults={searchResults} onClose={closeSearch} />
      )}
    </nav>
  );
}

export default Navbar;
