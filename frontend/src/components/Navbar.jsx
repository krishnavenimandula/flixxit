import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPowerOff, FaSearch, FaBars, FaTimes, FaUser } from "react-icons/fa";
import "./Navbar.css";
import SearchBar from "./SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { getGenres } from "../store";
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY; // Replace with your TMDB API key

function Navbar({ isScrolled }) {
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const genres = useSelector((state) => state.flixxit.genres);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const links = [
    { name: "Movies", link: "/" },
    { name: "TV Shows", link: "/tv" },
    { name: "Watch List", link: "/mylist" },
    { name: "Subscription", link: "/subscription" },
    { name: "About", link: "/about" },
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

  const handleSearch = async (query) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
          query
        )}`
      );

      const data = await response.json();
      let movieArray = [];
      let filteredArray = data.results.filter(
        (item) =>
          item.media_type === "movie" &&
          item.backdrop_path != null &&
          item.original_language == "en"
      );

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

      setSearchResults(movieArray);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");

    navigate("/login");
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const closeSearch = () => {
    setSearchResults([]);
    setSearchQuery("");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
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
        <div className="user-icon" onClick={toggleDropdown}>
          <FaUser />
          {dropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/profile">Profile</Link>
              <Link to="/login" onClick={handleLogout}>
                Logout
              </Link>
            </div>
          )}
        </div>
        <button>
          <FaPowerOff onClick={handleLogout} />
        </button>
      </div>
      {searchResults.length > 0 && (
        <SearchBar searchResults={searchResults} onClose={closeSearch} />
      )}
    </nav>
  );
}

export default Navbar;
