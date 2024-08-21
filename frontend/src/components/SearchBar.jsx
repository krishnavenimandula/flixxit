import React from "react";
import Card from "./Card";
import "./SearchBar.css";

function SearchBar({ searchResults, onClose }) {
  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-results" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        {searchResults.map((movie, index) => (
          <Card
            movieData={movie}
            index={index}
            key={movie.id}
            showTitle={true}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
