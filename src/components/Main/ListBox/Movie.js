import React, { useState } from "react";
import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";

export function Movie({ movie, handleSelectMovie }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const image = (
    <img
      src={movie.Poster !== "N/A" ? movie.Poster : "/popcorn.svg"}
      alt={`${movie.Title} poster`}
      style={{
        display: imageLoaded ? "block" : "none",
        width: "100%",
        height: "59px",
      }}
      onLoad={handleImageLoad}
    />
  );

  return (
    <li onClick={() => handleSelectMovie(movie.imdbID)}>
      {image}
      <ReactPlaceholder
        showLoadingAnimation
        type="rect"
        style={{ width: "100%", height: 59, borderRadius: 8, gridRow: "1/-1" }}
        ready={imageLoaded}
      ></ReactPlaceholder>

      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
