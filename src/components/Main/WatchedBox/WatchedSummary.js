export function Summary({ average, watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  const roundedAvgImdbRating = avgImdbRating.toFixed(1);
  const roundedAvgUserRating = avgUserRating.toFixed(1);
  const roundedAvgRuntime = Math.round(avgRuntime);
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{roundedAvgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{roundedAvgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{roundedAvgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
