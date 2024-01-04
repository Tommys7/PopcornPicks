import { useState } from "react";
import { MovieList } from "./MovieList";

export function ListBox({ movies, handleSelectMovie }) {
  return (
    <div className="box">
      <MovieList movies={movies} handleSelectMovie={handleSelectMovie} />
    </div>
  );
}
