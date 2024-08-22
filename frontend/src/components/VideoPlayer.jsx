import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import { useLocation } from "react-router-dom";
import "./VideoPlayer.css";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const VideoPlayer = () => {
  const location = useLocation();
  const { movie } = location.state;

  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`
        );

        const trailers = response.data.results.filter(
          (video) => video.type === "Trailer"
        );

        if (trailers.length > 0) {
          const trailerKey = trailers[0].key;
          setVideoUrl(`https://www.youtube.com/watch?v=${trailerKey}`);
        } else {
          console.log("No trailers found.");
        }
      } catch (error) {
        console.error("Error fetching the trailer:", error);
      }
    };

    fetchTrailer();
  }, [movie.id]);

  return (
    <div className="video-player-normal">
      {videoUrl ? (
        <ReactPlayer url={videoUrl} controls={true} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default VideoPlayer;
