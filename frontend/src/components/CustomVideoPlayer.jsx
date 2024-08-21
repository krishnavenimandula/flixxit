import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
import "./CustomVideoPlayer.css";
import video_hd from "../assets/Video_Hd.mp4";
import video_auto from "../assets/Video_normal.mp4";
import { useNavigate } from "react-router";
import { BsArrowLeft } from "react-icons/bs";
const CustomVideoPlayer = () => {
  const navigate = useNavigate();
  const videos = [
    {
      auto: video_auto,
      hd: video_hd,
    },
  ];
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(videos[0].auto);
  const [quality, setQuality] = useState("auto");

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleMuteToggle = () => {
    setMuted(!muted);
  };

  const handleSkipIntro = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(10, "seconds");
    }
  };

  const handleChangeQuality = (newQuality) => {
    setQuality(newQuality);
    setSelectedVideo(videos[0][newQuality]);
  };

  return (
    <div className="video-player">
      <div className="back">
        <BsArrowLeft onClick={() => navigate(-1)} />
      </div>
      <div className="video-player-container">
        <ReactPlayer
          ref={playerRef}
          url={selectedVideo}
          playing={playing}
          muted={muted}
          volume={0.8}
          controls
          width="100%"
          height="100%"
        />
        <div className="controls">
          <button onClick={handlePlayPause}>
            {playing ? "Pause" : "Play"}
          </button>
          <button onClick={handleSkipIntro}>Skip Intro</button>
          <div className="quality-controls">
            <button
              onClick={() => handleChangeQuality("auto")}
              disabled={quality === "auto"}
            >
              Auto
            </button>
            <button
              onClick={() => handleChangeQuality("hd")}
              disabled={quality === "hd"}
            >
              HD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomVideoPlayer;
