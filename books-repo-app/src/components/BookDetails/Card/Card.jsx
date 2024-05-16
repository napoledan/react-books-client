import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function Card(props) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      className={`card ${expanded ? "expanded" : ""}`}
      onClick={toggleExpanded}
    >
      <img
        className="card-image"
        src={props.coverImage}
        alt="profile randomised"
      />
      <div className="card-content">
        <h2 className="card-title">{props.title}</h2>
        <p className="card-text">{props.author}</p>
        <p className="card-text">{props.date}</p>
      </div>
      {expanded && (
        <div className="expanded-content">
          <p className="card-text">{props.genres}</p>
          <p className="card-text">{props.characters}</p>
          <p className="card-text">{props.synopsis}</p>
          <hr />
          <button
            className="card-button card-edit-button"
            onClick={props.coverImage}
          >
            Edit
          </button>
          <button
            className="card-button card-delete-button"
            onClick={props.title}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
Card.propTypes = {
  coverImage: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
  date: PropTypes.string,
  genres: PropTypes.string,
  characters: PropTypes.string,
  synopsis: PropTypes.string,
};

Card.defaultProps = {
  coverImage: "https://picsum.photos/150/200",
  title: "Title",
  author: "Author",
  date: "Date",
  genres: "Genres",
  characters: "Characters",
  synopsis: "Synopsis",
};

export default Card;
