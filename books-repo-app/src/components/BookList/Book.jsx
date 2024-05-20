import React from "react";
import { Link } from "react-router-dom";
import "./BookList.css";
import "./Book.css";
import PropTypes from "prop-types";

const Book = (book) => {
  // Destructure book object from props
  //pass book object as props to Book component

  //helper function to truncate text
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="book-item flex flex-column flex-sb">
      <div className="book-item-img">
        <img src={book.cover_img} alt="cover" />
      </div>
      <div className="book-item-info text-center">
        <Link to={`/book/${book.id}`} state={{ book }}>
          <div className="book-item-info-item title fw-7 fs-18">
            <span>{book.title}</span>
          </div>
        </Link>

        <div className="book-item-info-item author fs-15">
          <span className="text-capitalize fw-7">Author: </span>
          <span>{truncateText(book.author, 20)}</span>
        </div>

        <div className="book-item-info-item date fs-15">
          <span className="text-capitalize fw-7">Date: </span>
          <span>{book.date}</span>
        </div>

        <div className="book-item-info-item synopsis fs-15">
          <span className="text-capitalize fw-7">Synopsis: </span>
          <span>{truncateText(book.synopsis, 40)}</span>
        </div>
      </div>
    </div>
  );
};

export default Book;
