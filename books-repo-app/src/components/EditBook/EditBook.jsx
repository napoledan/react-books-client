import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Loading from "../Loader/Loader";
import coverImg from "../../images/cover_not_found.jpg";
import "./EditBook.css";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa"; // Import back,edit and delete icons

//const URL = "https://covers.openlibrary.org/b/id/";
// Create a BookDetails component that displays the details of a book based on the id parameter in the URL path
const EditBook = () => {
  const { id } = useParams(); // Get the id parameter from the URL path
  const location = useLocation(); // Get the location object from the useLocation hook
  const navigate = useNavigate(); // Get the navigate function from the useNavigate hook
  // Get the id parameter from the response
  //const { openlibraryid } = useParams();
  // Create state variables for loading and book details
  const [bookData, setBookData] = useState(location.state?.book || null); // Initialize the bookData state variable with the book details from the location state
  const [loading, setLoading] = useState(!location.state?.book); // Initialize the loading state variable based on the location state
  console.log(bookData);
  // Create a state variable for the book details
  //const [book, setBook] = useState(null);
  useEffect(() => {
    const fetchBookData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`YOUR_API_URL/books/${id}`);
        const data = await response.json();
        setBookData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (!bookData) {
      fetchBookData();
    }
  }, [id, bookData]);

  // Create a function to handle the edit button click

  const handleEdit = () => {
    navigate(`/book/${id}/edit`, { state: { book: bookData } });
  };

  // Create a function to handle the delete button click

  const handleDelete = async () => {
    try {
      const response = await fetch(`YOUR_API_URL/books/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        navigate("/book");
      } else {
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <Loading />;
  }

  const {
    title = "No title found",
    cover_img = coverImg,
    author = "No author found",
    date = "No date found",
    synopsis = "No synopsis found",
    genres = "No genres found",
    characters = "No characters found",
  } = bookData || {};

  return (
    <section className="book-details">
      <div className="container">
        <div className="header">
          <button
            type="button"
            className="flex flex-c icon-btn back-btn"
            onClick={() => navigate(`/book/${id}/`)}
          >
            <FaArrowLeft size={22} />
            <span className="fs-18 fw-6">Go Back</span>
          </button>
          <div className="edit-delete-buttons">
            {/* Edit button */}
            <button
              className=" icon-btn edit-btn flex flex-sb"
              onClick={handleEdit}
            >
              <FaEdit size={22} />
              <span className="fs-18 fw-6">Edit</span>
            </button>
            {/* Delete button */}
            <button
              className="icon-btn del-btn flex flex-sb"
              onClick={handleDelete}
            >
              <FaTrash size={22} />
              <span className="fs-18 fw-6">Delete</span>
            </button>
          </div>
        </div>
        <div className="book-details-content grid">
          <div className="book-details-img">
            <img src={cover_img} alt="cover img" />
          </div>
          <div className="book-details-info">
            <div className="book-details-item title">
              <span className="fw-6 fs-24">{title}</span>
            </div>
            <div className="book-details-item date">
              <span className="fw-6">First Published: </span>
              <span>{date}</span>
            </div>
            <div className="book-details-item synopsis">
              <span className="fw-6">Synopsis: </span>
              <span>{synopsis}</span>
            </div>
            <div className="book-details-item author">
              <span className="fw-6">Author: </span>
              <span>{author}</span>
            </div>
            <div className="book-details-item genres">
              <span className="fw-6">Genres: </span>
              <span className="text-italic">{genres}</span>
            </div>
            <div className="book-details-item characters">
              <span className="fw-6">Characters: </span>
              <span className="text-italic">{characters}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditBook;
