import { useEffect, useState } from "react";
import { StarRating } from "../StarRating/StarRating";
import { Loader } from "../Loader/Loader";
import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";

export default function SelectedMovie({ onCloseMovie }) {
  document.title = `Movie`;

  return (
    <div className="box details">
      <header>
        <button className="btn-back" onClick={() => onCloseMovie()}>
          &larr;
        </button>
        <ReactPlaceholder
          showLoadingAnimation
          type="rect"
          style={{
            width: "33%",
            height: 232,
            marginRight: 0,
            background: "#515A63",
          }}
          ready={false}
        ></ReactPlaceholder>
        <div className="details-overview">
          <h2>
            <ReactPlaceholder
              showLoadingAnimation
              type="text"
              rows={1}
              color="#515A63"
            ></ReactPlaceholder>
          </h2>
          <p>
            <ReactPlaceholder
              showLoadingAnimation
              type="text"
              rows={1}
              color="#515A63"
            ></ReactPlaceholder>
          </p>
          <p>
            <ReactPlaceholder
              showLoadingAnimation
              type="text"
              rows={1}
              color="#515A63"
            ></ReactPlaceholder>
          </p>
          <p>
            <ReactPlaceholder
              showLoadingAnimation
              type="text"
              rows={1}
              color="#515A63"
            ></ReactPlaceholder>
          </p>
        </div>
      </header>

      <section>
        <div className="rating rating-loading">&nbsp;</div>
        <em>
          <ReactPlaceholder
            showLoadingAnimation
            type="text"
            rows={4}
            color="#515A63"
          ></ReactPlaceholder>
        </em>
        <p>
          <ReactPlaceholder
            showLoadingAnimation
            type="text"
            rows={1}
            color="#515A63"
          ></ReactPlaceholder>
        </p>
        <p>
          <ReactPlaceholder
            showLoadingAnimation
            type="text"
            rows={1}
            color="#515A63"
          ></ReactPlaceholder>
        </p>
      </section>
    </div>
  );
}
