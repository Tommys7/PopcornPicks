import { useEffect, useState } from "react";
import { StarRating } from "../StarRating/StarRating";
import LoadingMovie from "./LoadingMovie";
import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";

export function SelectedMovie({
  selectedId,
  onCloseMovie,
  onAddWatchedMovies,
  watchedMovies,
}) {
  const APIKEY = "1f7e4797";

  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [userRating, setUserRating] = useState();

  const isWatched = watchedMovies
    .map((movie) => movie.imdbId)
    .includes(selectedId);

  const watchedUserRating = watchedMovies.find(
    (movie) => movie.imdbId === selectedId
  )?.userRating;

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const res = await fetch(
          `https://www.omdbapi.com/?i=${selectedId}&apikey=${APIKEY}`
        );
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const image = (
    <img
      src={poster !== "N/A" ? poster : "./popcorn.svg"}
      alt={`Poster of ${title}`}
      style={{
        display: imageLoaded ? "block" : "none",
      }}
      onLoad={handleImageLoad}
    />
  );

  function handleAddWatched() {
    const newWatchedMovie = {
      imdbId: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };
    onAddWatchedMovies(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;
      return function () {
        document.title = "PopcornPicks";
      };
    },
    [title]
  );

  return (
    <>
      {isLoading ? (
        <LoadingMovie onCloseMovie={onCloseMovie} />
      ) : (
        <div className="box details">
          <header>
            <button className="btn-back" onClick={() => onCloseMovie()}>
              &larr;
            </button>
            {image}
            <ReactPlaceholder
              showLoadingAnimation
              type="rect"
              style={{
                width: "33%",
                height: 232,
                marginRight: 0,
                background: "#343a40",
              }}
              ready={imageLoaded}
            ></ReactPlaceholder>
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️{imdbRating} IMDb rating</span>
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating && (
                    <button className="btn-add" onClick={handleAddWatched}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>You already rated this movie by {watchedUserRating} ⭐️</p>
              )}
            </div>
            <em>{plot}</em>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </div>
      )}
    </>
  );
}
