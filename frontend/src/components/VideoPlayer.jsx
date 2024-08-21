import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import { useLocation } from "react-router-dom";
const API_KEY = "7f23e52bff7fe0dc439791818ec6e4ed";
const VideoPlayer = () => {
  const location = useLocation();
  const { movie } = location.state;

  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const API_KEY = "your_tmdb_api_key_here";
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=7f23e52bff7fe0dc439791818ec6e4ed`
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
    <div className="video-player">
      {videoUrl ? (
        <ReactPlayer url={videoUrl} controls={true} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default VideoPlayer;
