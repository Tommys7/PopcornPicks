import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar/Navbar";
import { Main } from "./components/Main/Main";
import { Logo } from "./components/Navbar/Logo";
import { Search } from "./components/Navbar/Search";
import { NumResults } from "./components/Navbar/NumResults";

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const APIKEY = "1f7e4797";

export default function App() {
  const [query, setQuery] = useState("Interstellar");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedId, setSelectedId] = useState();

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function closeMovie() {
    setSelectedId("");
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `https://www.omdbapi.com/?s=${query}&apikey=${APIKEY}`
          );

          if (!res.ok) {
            throw new Error("Something went wrong with fetching movies");
          }

          const data = await res.json();

          if (data.Response === "False") {
            throw new Error("Movie not found");
          }

          setError("");
          setMovies(data.Search);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      fetchMovies();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <>
      <Navbar movies={movies}>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main
        error={error}
        isLoading={isLoading}
        movies={movies}
        average={average}
        tempWatchedData={tempWatchedData}
        selectedId={selectedId}
        handleSelectMovie={handleSelectMovie}
        onCloseMovie={closeMovie}
      />
    </>
  );
}
