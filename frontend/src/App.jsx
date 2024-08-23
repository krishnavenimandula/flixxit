import "./App.css";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import UserListedMovies from "./pages/UserListedMovies";
import VideoPlayer from "./components/VideoPlayer";
import CustomVideoPlayer from "./components/CustomVideoPlayer";
import Subscription from "./pages/Subscription";
import AboutUs from "./pages/About";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import Tv from "./pages/tv";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  const shouldShowNavbar =
    location.pathname !== "/login" && location.pathname !== "/signup";

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY === 0 ? false : true);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {shouldShowNavbar && <Navbar isScrolled={isScrolled} />}
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Home />} />
            <Route path="/tv" element={<Tv />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/player/:id" element={<VideoPlayer />} />
            <Route path="/player" element={<CustomVideoPlayer />} />
            <Route path="/mylist" element={<UserListedMovies />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/profile" element={<Profile />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
