import React, { useState, useContext, useEffect } from "react"; // Import the useState, useContext, and useEffect hooks
import { useCallback } from "react"; // Import the useCallback hook
import axios from "axios"; // Import the axios library

//const URL = "https://openlibrary.org/search.json?title="; // Define the URL for api

const URL = "http://localhost:8080/RestAPI/";

const AppContext = React.createContext(); // Create a context object

const AppProvider = ({ children }) => {
  // Create a provider component
  const [searchTerm, setSearchTerm] = useState(""); // Initialize the searchTerm state variable
  const [books, setBooks] = useState([]); // Initialize the books state variable
  const [loading, setLoading] = useState(true); // Initialize the loading state variable
  const [resultTitle, setResultTitle] = useState(""); // Initialize the resultTitle state variable

  const fetchBooks = useCallback(async () => {
    // Define the fetchBooks function
    setLoading(true); // Set the loading state variable to true
    try {
      const response = await axios.get(`${URL}${searchTerm}`, {
        headers: {
          Accept: "application/json",
        },
        withCredentials: true,
      }); // Fetch the data from the URL
      const data = response.data; // Extract response data
      console.log(data); // Log the data

      if (data) {
        // Check if books is not null and bring back 40 books if available
        const newBooks = data.slice(0, 40).map((bookSingle) => {
          const {
            id,
            openLibraryId,
            title,
            author,
            date,
            genres,
            characters,
            synopsis,
          } = bookSingle; // Destructure the properties

          return {
            id: id,
            openlibraryid: openLibraryId,
            title: title,
            author: author,
            date: date,
            genres: genres,
            characters: characters,
            synopsis: synopsis,
          }; // Return the object with the properties
        }); // Map over the books array
        setBooks(newBooks); // Set the books state variable to the newBooks array
        if (newBooks.length > 1) {
          setResultTitle(
            "We have found treasures. Click on the book to know more."
          );
        } else {
          setResultTitle("No books found. Please try again.");
        }
      } else {
        // If books is null
        setBooks([]); // Set the books state variable to an empty array
        setResultTitle("No books found. Please try again."); // Set the resultTitle state variable to a message
      }
      setLoading(false); // Set the loading state variable to false
    } catch (error) {
      // Catch any errors
    } finally {
      // Finally
      setLoading(false); // Set the loading state variable to false
    }
  }, [searchTerm]); // Define the dependencies

  useEffect(() => {
    // Define the useEffect hook
    fetchBooks(); // Call the fetchBooks function
  }, [searchTerm, fetchBooks]); // Define the dependencies

  return (
    <AppContext.Provider
      value={{ loading, books, setSearchTerm, resultTitle, setResultTitle }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  // Define the useGlobalContext hook
  return useContext(AppContext); // Return the useContext hook
};
export { AppContext, AppProvider }; // Export the AppContext and AppProvider
