import React from "react";
import "./tv.css";
import Banner from "../components/Banner";
import TvSlider from "../components/TvSlider";

const Tv = () => {
  return (
    <div className="app">
      <Banner type="tv" />
      <TvSlider />
    </div>
  );
};

export default Tv;
