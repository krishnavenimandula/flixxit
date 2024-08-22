import React, { useState } from "react";
import "./CardSlider.css";
import Card from "./Card";

export default React.memo(function CardSlider({ data, title }) {
  const listRef = React.useRef();
  const [showControls, setShowControls] = useState(false);

  return (
    <div
      className={`container column ${showControls ? "show-controls" : ""}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <h2>{title}</h2>
      <div className="wrapper">
        <div className="slider" ref={listRef}>
          {data.map((movie) => (
            <Card key={movie.id} movieData={movie} />
          ))}
        </div>
      </div>
    </div>
  );
});
