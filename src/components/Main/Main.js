import { ListBox } from "./ListBox/ListBox";
import { WatchedBox } from "./WatchedBox/WatchedBox";
import { SelectedMovie } from "./SelectedMovie/SelectedMovie";
import { Loader } from "./Loader/Loader";
import { ErrorMessage } from "./Error/Error";
import { useState } from "react";

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
  const [watchedMovies, setWatchedMovies] = useState([]);

  console.log(watchedMovies);

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
      {!isLoading && !error && (
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
