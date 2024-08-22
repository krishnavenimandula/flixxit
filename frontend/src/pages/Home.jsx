import React from "react";
import "./Home.css";
import Banner from "../components/Banner";

import Slider from "../components/Slider";

const Home = () => {
  return (
    <div className="app">
      <Banner type="movie" />
      <Slider />
    </div>
  );
};

export default Home;
