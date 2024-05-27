import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

const BooksContext = createContext();

const BooksProvider = ({ children }) => {
  // States for loading, books, and error handling
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [format, setFormat] = useState("application/json"); //use format state from original search

  const BASE_URL = "http://localhost:8080/RestAPI"; // Adjust if necessary

  const fetchBooks = useCallback(async (searchTerm = "") => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/books-api?searchTerm=${encodeURIComponent(searchTerm)}`,
        {
          withCredentials: true,
        }
      );
      setBooks(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteBook = useCallback(async (bookId) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/books-api?id=${bookId}`,
        {
          withCredentials: true,
        }
      );
      if (response.ok) {
        // Update books state after successful deletion
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId)); // Filter out the deleted book
      } else {
        throw new Error("Failed to delete book.");
      }
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const editBook = useCallback(
    async (updatedBook) => {
      try {
        const formattedBook = { ...updatedBook }; // Create a copy of the updated book
        const response = await axios.put(
          // Use the PUT method to update the book
          `${BASE_URL}/books-api`,
          formattedBook,
          {
            headers: {
              "Content-Type": format,
              Accept: format, // Add the Accept header. this is the format of the response. Provides the format of the response that the client is expecting
            },
            withCredentials: true,
          }
        );

        if (
          response.ok ||
          response.status === 200 ||
          response.contains("Book updated successfully.")
        ) {
          // Update books state after successful update
          setBooks((prevBooks) =>
            prevBooks.map(
              (book) => (book.id === updatedBook.id ? updatedBook : book) // Replace the updated book
            )
          );
        } else {
          throw new Error("Failed to update book."); // Throw an error if the update fails - but why is it throwing still if update is successful?
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          console.error(error.response.data.error); // Use the backend's error message
        } else {
          console.error(
            "An unexpected error occurred while updating the book."
          );
        }
        if (error.response) {
          // Log detailed error information
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          console.error("No response received from server.", error.request);
        } else {
          console.error("Error message:", error.message);
        }
      }
    },
    [format]
  ); // Add format as a dependency

  const addBook = useCallback(
    async (newBook) => {
      // Define addBook function with newBook param. this parameter will pass the new book data to the function from addBook component
      try {
        const response = await axios.post(
          // Send a POST request to server
          `${BASE_URL}/books-api`, // Use the books-api endpoint
          newBook, // Pass the new book data to the server
          {
            headers: {
              "Content-Type": format, // Set the Content-Type header to the format state based on chosen format
              Accept: format, // Add accept header which will be the format of the response to match the request
            },
            withCredentials: true,
          }
        );

        if (
          response.ok ||
          response.status === 200 ||
          response.contains("Book inserted successfully.")
        ) {
          // Update books state after successful update
          setBooks((prevBooks) => [...prevBooks, response.data]); // Add the new book to the books array and the response message
        } else {
          throw new Error(response.data); // Throw an error if the update fails - but why is it throwing still if update is successful?
        }
      } catch (error) {
        console.error(
          "An unexpected error occurred while updating the book.",
          error
        );
      }
    },
    [format]
  ); // Add format as a dependency

  return (
    <BooksContext.Provider // Provide the context values to the children components
      value={{
        loading,
        books,
        fetchBooks,
        deleteBook,
        editBook,
        addBook,
        error,
        format,
        setFormat,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

const useBooksContext = () => {
  return useContext(BooksContext);
};

export { BooksProvider, useBooksContext };
