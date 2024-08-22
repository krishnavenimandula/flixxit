import React, { useEffect, useState, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { getUsersLikedMovies } from "../store";
import { useDispatch, useSelector } from "react-redux";
import "./UserListedMovies.css";

const Card = React.lazy(() => import("../components/Card"));

export default function UserListedMovies() {
  const movies = useSelector((state) => state.flixxit.movies);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    setEmail(userEmail);
    if (email) {
      dispatch(getUsersLikedMovies(email)).finally(() => setIsLoading(false));
    }
  }, [email]);

  return (
    <div className="user-listed-movies-container">
      <div className="content flex column">
        <h1>Watch List</h1>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid flex">
            <Suspense fallback={<div>Loading movies...</div>}>
              {movies.map((movie, index) => (
                <Card
                  movieData={movie}
                  index={index}
                  key={movie.id}
                  isLiked={true}
                />
              ))}
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
}
