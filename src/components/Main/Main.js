import { ListBox } from "./ListBox/ListBox";
import { WatchedBox } from "./WatchedBox/WatchedBox";
import { SelectedMovie } from "./SelectedMovie/SelectedMovie";
import { Loader } from "./Loader/Loader";
import { ErrorMessage } from "./Error/Error";
import { useState, useEffect } from "react";

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
    console.log("remove");
  }
  return (
    <main className="main">
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!isLoading && !error && !selectedId && (
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
        <WatchedBox
          average={average}
          watchedData={watchedMovies}
          onDeleteWatched={handleDeleteWatched}
        />
      )}
    </main>
  );
}
