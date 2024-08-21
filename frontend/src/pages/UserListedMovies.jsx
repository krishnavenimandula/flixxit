import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { getUsersLikedMovies } from "../store";
import { useDispatch, useSelector } from "react-redux";
import "./UserListedMovies.css"; // Import the new CSS file
import Navbar from "../components/NavBar";
export default function UserListedMovies() {
  const movies = useSelector((state) => state.flixxit.movies);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [email, setEmail] = useState(undefined);
  const userEmail = localStorage.getItem("email");
  useEffect(() => {
    setEmail(userEmail);
    if (email) {
      dispatch(getUsersLikedMovies(email));
    }
  }, [email]);

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <div className="user-listed-movies-container">
      <Navbar isScrolled={isScrolled} />
      <div className="content flex column">
        <h1>My List</h1>
        <div className="grid flex">
          {movies.map((movie, index) => {
            return (
              <Card
                movieData={movie}
                index={index}
                key={movie.id}
                isLiked={true}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
