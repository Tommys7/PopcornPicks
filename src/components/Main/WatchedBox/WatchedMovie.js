import { useState } from "react";
import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";

export function WatchedMovie({ movie, onDeleteWatched }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  console.log(movie.imdbId);

  const image = (
    <img
      src={movie.poster !== "N/A" ? movie.poster : "/popcorn.svg"}
      alt={`${movie.title} poster`}
      style={{
        display: imageLoaded ? "block" : "none",
        width: "100%",
        height: "59px",
      }}
      onLoad={handleImageLoad}
    />
  );
  return (
    <li key={movie.imdbID}>
      {image}
      <ReactPlaceholder
        showLoadingAnimation
        type="rect"
        style={{ width: "100%", height: 59, borderRadius: 8, gridRow: "1/-1" }}
        ready={imageLoaded}
      ></ReactPlaceholder>
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbId)}
        >
          X
        </button>
      </div>
    </li>
  );
}
