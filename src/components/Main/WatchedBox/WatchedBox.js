import { useState } from "react";
import { Summary } from "./WatchedSummary";
import { WatchedList } from "./WatchedList";

export function WatchedBox({ average, watchedData, onDeleteWatched }) {
  return (
    <div className="box">
      <>
        <Summary average={average} watched={watchedData} />
        <WatchedList watched={watchedData} onDeleteWatched={onDeleteWatched} />
      </>
    </div>
  );
}
