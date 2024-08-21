import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import UserListedMovies from "./pages/UserListedMovies";
import VideoPlayer from "./components/VideoPlayer";
import CustomVideoPlayer from "./components/CustomVideoPlayer";
const App = () => {
  const user = localStorage.getItem("token");

  return (
    // navbar

    <Routes>
      {user && <Route path="/" exact element={<Home />} />}
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      {/* <Route path="/movie/:id" element={<MovieDetails />} /> */}
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/player/:id" element={<VideoPlayer />} />
      <Route path="/player" element={<CustomVideoPlayer />} />
      <Route exact path="/mylist" element={<UserListedMovies />} />
    </Routes>
  );
};

export default App;
