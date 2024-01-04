import { useState } from "react";
import { Summary } from "./WatchedSummary";
import { WatchedList } from "./WatchedList";

export function WatchedBox({ average, watchedData, onDeleteWatched }) {
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && (
        <>
          <Summary average={average} watched={watchedData} />
          <WatchedList
            key={watchedData}
            watched={watchedData}
            onDeleteWatched={onDeleteWatched}
          />
        </>
      )}
    </div>
  );
}
