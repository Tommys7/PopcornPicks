import { ListBox } from "./ListBox/ListBox";
import { WatchedBox } from "./WatchedBox/WatchedBox";
import { SelectedMovie } from "./SelectedMovie/SelectedMovie";
import { Loader } from "./Loader/Loader";
import { ErrorMessage } from "./Error/Error";
import { useState, useEffect, useRef } from "react";

export function Main({
  movies,
  average,
  tempWatchedData,
  isLoading,
  error,
  selectedId,
  handleSelectMovie,
  onCloseMovie,
}) {
  const [watchedMovies, setWatchedMovies] = useState(() => {
    const storedMovies = localStorage.getItem("watchedMovies");
    return storedMovies ? JSON.parse(storedMovies) : [];
  });
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const lowerRes = windowSize[0] <= 1024;
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    localStorage.setItem("watchedMovies", JSON.stringify(watchedMovies));
  }, [watchedMovies]);

  function handleAddWatched(newMovie) {
    setWatchedMovies((watchedMovies) => [...watchedMovies, newMovie]);
  }

  function handleDeleteWatched(id) {
    setWatchedMovies((watchedMovies) =>
      watchedMovies.filter((movie) => movie.imdbId !== id)
    );
  }

  return (
    <main className="main">
      <div className="main-checkbox">
        <span>Search</span>
        <div className="styled-checkbox">
          <input
            onChange={toggleCheckbox}
            checked={isChecked}
            type="checkbox"
            id="customCheckbox"
          ></input>
          <label htmlFor="customCheckbox"></label>
        </div>
        <span>Watched</span>
      </div>
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!isLoading &&
        !error &&
        (lowerRes ? !isChecked && !selectedId : true) && (
          <ListBox movies={movies} handleSelectMovie={handleSelectMovie} />
        )}
      {selectedId ? (
        <SelectedMovie
          selectedId={selectedId}
          onCloseMovie={onCloseMovie}
          onAddWatchedMovies={handleAddWatched}
          key={selectedId}
          watchedMovies={watchedMovies}
        />
      ) : (
        (lowerRes ? isChecked : true) && (
          <WatchedBox
            average={average}
            watchedData={watchedMovies}
            onDeleteWatched={handleDeleteWatched}
          />
        )
      )}
    </main>
  );
}
