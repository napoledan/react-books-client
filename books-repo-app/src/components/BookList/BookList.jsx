import React from "react";
import { useGlobalContext } from "../../context";
import Book from "../BookList/Book";
import Loading from "../Loader/Loader";
import coverImg from "../../images/cover_not_found.jpg";
import "./BookList.css";
//https://openlibrary.org/dev/docs/api/covers - cover image API
//https://openlibrary.org/dev/docs/api/books - book details API
//https://covers.openlibrary.org/b/id/240727-S.jpg - cover image URL example
const BookList = () => {
  const { books, loading, resultTitle } = useGlobalContext(); // Get the books, loading, and resultTitle variables from the useGlobalContext hook

  const booksWithCovers = books.map((singleBook) => {
    // Map over the books array and return a new array with the cover image URL
    return {
      ...singleBook,
      //remove works to get onlyu the id
      //id: singleBook.id.replace("/works/", ""),
      cover_img: singleBook.openlibraryid
        ? `https://covers.openlibrary.org/b/id/${singleBook.openlibraryid}-L.jpg`
        : coverImg,
    };
  });

  console.log(booksWithCovers); // Log the booksWithCovers array
  if (loading) {
    // Check if the loading state variable is true
    return <Loading />; // Return the Loading component
  }
  return (
    <section className="booklist">
      <div className="container">
        <div className="section-title">
          <h2>{resultTitle}</h2>
          <div className="booklist-content grid">
            {booksWithCovers.slice(0, 30).map((book, index) => {
              return <Book key={index} {...book} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookList;
