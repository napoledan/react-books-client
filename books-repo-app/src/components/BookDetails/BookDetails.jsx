import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useBooksContext } from "./BooksContext";
import Loading from "../Loader/Loader";
import coverImg from "../../images/cover_not_found.jpg";
import "./BookDetails.css";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa"; // Import back,edit and delete icons

//const URL = "https://covers.openlibrary.org/b/id/";
// Create a BookDetails component that displays the details of a book based on the id parameter in the URL path
const BookDetails = () => {
  const { id } = useParams();
  const { deleteBook, editBook } = useBooksContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [bookData, setBookData] = useState(location.state?.book || null);
  const [loading, setLoading] = useState(!location.state?.book);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // Define showDeleteConfirmation state
  const [isEditing, setIsEditing] = useState(false); // Define isEditing state
  const [editedBookData, setEditedBookData] = useState(bookData); // Define editedBookData state
  console.log(bookData);
  // Create a state variable for the book details
  //const [book, setBook] = useState(null);

  // Create a function to handle the edit button click

  useEffect(() => {
    setEditedBookData(bookData); // Set editedBookData to bookData
  }, [bookData]);

  const handleEditStart = () => {
    setIsEditing(true); // Set isEditing to true
  };

  const handleEditCancel = () => {
    setIsEditing(false); // Set isEditing to false
    setEditedBookData(bookData); // Reset editedBookData to bookData
  };

  const handleEditSave = async () => {
    // Save edited book data
    try {
      await editBook(editedBookData); // Call the editBook function with the editedBookData parameters
      setBookData(editedBookData); // Update bookData with editedBookData
      setIsEditing(false); // Set isEditing to false
    } catch (error) {
      console.error("Failed to save changes", error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedBookData((prevData) => ({
      ...prevData, // Keep existing data
      [name]: value, // Update changed field
    }));
  };

  // Create a function to handle the delete button click

  const handleDelete = async () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    setShowDeleteConfirmation(false);
    try {
      await deleteBook(id); // Call the deleteBook function with the id parameter
      navigate("/book"); // Navigate to the book list page
    } catch (err) {
      console.error(err);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false); // Hide confirmation dialog
  };

  if (loading) {
    return <Loading />;
  }
  // Destructure bookData object and set default values
  const {
    title = "No title found",
    cover_img = coverImg,
    author = "No author found",
    date = "No date found",
    synopsis = "No synopsis found",
    genres = "No genres found",
    characters = "No characters found",
  } = bookData || {};
  // Display book details
  return (
    <div className="book-details-container">
      <section className="book-details">
        <div className="container">
          <div className="header">
            <button
              type="button"
              className="flex flex-c icon-btn back-btn"
              onClick={() => navigate("/book")}
            >
              <FaArrowLeft size={22} />
              <span className="fs-18 fw-6">Go Back</span>
            </button>
          </div>
          <div className="edit-delete-buttons">
            {/* Edit button */}
            <button
              className=" icon-btn edit-btn flex flex-sb"
              onClick={handleEditStart}
            >
              <FaEdit size={30} />
              <span className="fs-18 fw-6"></span>
            </button>
            {/* Delete button */}
            <button
              className="icon-btn del-btn flex flex-sb"
              onClick={handleDelete}
            >
              <FaTrash size={30} />
              <span className="fs-18 fw-6"></span>
            </button>
          </div>
          <div className="book-details-content grid">
            {/* Display book details and conditional rendering for edit function */}
            <div className="book-details-img">
              <img src={cover_img} alt="cover img" />

              {isEditing ? (
                <span className="book-details-edit-text fs-18 flex">
                  Edit freely and then click save. We'll do the rest.
                </span>
              ) : (
                <span className="fs-18 fw-6"></span>
              )}
            </div>

            <div className="book-details-info">
              {isEditing ? (
                <span className="fw-6">Title: </span>
              ) : (
                <span className="fw-6 fs-24"></span>
              )}
              <div className="book-details-item title">
                {isEditing ? (
                  <input
                    type="text"
                    name="title"
                    value={editedBookData.title}
                    onChange={handleEditChange}
                  />
                ) : (
                  <span className="fw-6 fs-24">{title}</span>
                )}
              </div>
              <div className="book-details-item date">
                <span className="fw-6">First Published: </span>
                {isEditing ? (
                  <input
                    type="text"
                    name="date"
                    value={editedBookData.date}
                    onChange={handleEditChange}
                  />
                ) : (
                  <span>{date}</span>
                )}
              </div>
              <div className="book-details-item synopsis">
                <span className="fw-6">Synopsis: </span>
                {isEditing ? (
                  <input
                    type="text"
                    name="synopsis"
                    value={editedBookData.synopsis}
                    onChange={handleEditChange}
                  />
                ) : (
                  <span>{synopsis}</span>
                )}
              </div>
              <div className="book-details-item author">
                <span className="fw-6">Author: </span>
                {isEditing ? (
                  <input
                    type="text"
                    name="author"
                    value={editedBookData.author}
                    onChange={handleEditChange}
                  />
                ) : (
                  <span>{author}</span>
                )}
              </div>
              <div className="book-details-item genres">
                <span className="fw-6">Genres: </span>
                {isEditing ? (
                  <input
                    type="text"
                    name="genres"
                    value={editedBookData.genres}
                    onChange={handleEditChange}
                  />
                ) : (
                  <span className="text-italic">{genres}</span>
                )}
              </div>
              <div className="book-details-item characters">
                <span className="fw-6">Characters: </span>
                {isEditing ? (
                  <input
                    type="text"
                    name="characters"
                    value={editedBookData.characters}
                    onChange={handleEditChange}
                  />
                ) : (
                  <span className="text-italic">{characters}</span>
                )}
              </div>
              {isEditing && (
                <div className="edit-actions">
                  <button onClick={handleEditSave}>Save</button>
                  <button onClick={handleEditCancel}>Cancel</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Display delete confirmation dialog */}
      <section className="book-details-delete">
        <div className="container">
          {showDeleteConfirmation && ( // Conditionally render dialog
            <div className="delete-confirmation-overlay">
              <div className="delete-confirmation-dialog">
                <p>Are you sure you want to delete this book?</p>
                <button onClick={confirmDelete}>Yes</button>
                <button onClick={cancelDelete}>No</button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BookDetails;
