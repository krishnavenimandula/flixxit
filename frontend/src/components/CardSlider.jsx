import React, { useState } from "react";
import "./CardSlider.css"; // Import the CSS file for styles
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Card from "./Card";

export default React.memo(function CardSlider({ data, title }) {
  const listRef = React.useRef();
  const [sliderPosition, setSliderPosition] = useState(0);
  const [showControls, setShowControls] = useState(false);

  const handleDirection = (direction) => {
    let distance = listRef.current.getBoundingClientRect().x - 70;
    if (direction === "left" && sliderPosition > 0) {
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
      setSliderPosition(sliderPosition - 1);
    }
    if (direction === "right" && sliderPosition < 4) {
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
      setSliderPosition(sliderPosition + 1);
    }
  };

  return (
    <div
      className={`container column ${showControls ? "show-controls" : ""}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <h2>{title}</h2>
      <div className="wrapper">
        <div
          className={`slider-action left ${
            !showControls ? "none" : ""
          } flex j-center a-center`}
          onClick={() => handleDirection("left")}
        >
          <AiOutlineLeft />
        </div>
        <div className="slider" ref={listRef}>
          {data.map((movie, index) => (
            <Card movieData={movie} index={index} key={movie.id} />
          ))}
        </div>
        <div
          className={`slider-action right ${
            !showControls ? "none" : ""
          } flex j-center a-center`}
          onClick={() => handleDirection("right")}
        >
          <AiOutlineRight />
        </div>
      </div>
    </div>
  );
});
