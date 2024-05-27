import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loader/Loader";
import { useBooksContext } from "../BookDetails/BooksContext";
import "./AddBook.css"; // Create a CSS file for styling if needed
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const AddBook = () => {
  const { addBook } = useBooksContext(); // Add a function to add a book in BooksContext
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [format, setFormat] = useState("application/json"); //use format state from original search
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    date: "",
    synopsis: "",
    genres: "",
    characters: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBook(bookData); // Call the addBook function with the bookData
      navigate("/book"); // Navigate to the book list page after adding
    } catch (error) {
      console.error("Failed to add book", error);
    }
  };

  return (
    <section className="add-book">
      <div className="container">
        <Link to="/">
          <button
            type="button"
            className="flex flex-c icon-btn back-btn"
            onClick={() => navigate()}
          >
            <FaArrowLeft size={22} />
            <span className="fs-18 fw-6">Go Back</span>
          </button>
        </Link>
        <form onSubmit={handleSubmit}>
          <h2>Add New Book</h2>
          <div className="add-book-text">
            <p>Fill in the details below to add a new book to the library.</p>
          </div>
          <div className="add-book-format">
            <label>Format:</label>
            <select
              name="format"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              required
            >
              <option value="applicaiton/json">JSON</option>
              <option value="application/xml">XML</option>
              <option value="plain/text">TEXT</option>
            </select>
          </div>
          <div className="add-book-title">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={bookData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Author:</label>
            <input
              type="text"
              name="author"
              value={bookData.author}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Release Date:</label>
            <input
              type="date"
              name="date"
              value={bookData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Synopsis:</label>
            <textarea
              name="synopsis"
              value={bookData.synopsis}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Genres:</label>
            <input
              type="text"
              name="genres"
              value={bookData.genres}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Characters:</label>
            <input
              type="text"
              name="characters"
              value={bookData.characters}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Add Book</button>
        </form>
      </div>
    </section>
  );
};

export default AddBook;
