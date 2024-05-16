import React, { useState, useContext, useEffect } from "react"; // Import the useState, useContext, and useEffect hooks
import { useCallback } from "react"; // Import the useCallback hook
const URL = "https://openlibrary.org/search.json?title="; // Define the URL
const AppContext = React.createContext(); // Create a context object
const AppProvider = ({ children }) => {
  // Create a provider component
  const [searchTerm, setSearchTerm] = useState("The lord of the rings"); // Initialize the searchTerm state variable
  const [books, setBooks] = useState([]); // Initialize the books state variable
  const [loading, setLoading] = useState(true); // Initialize the loading state variable
  const [resultTitle, setResultTitle] = useState(""); // Initialize the resultTitle state variable
  
  const fetchBooks = useCallback(async () => {
    // Define the fetchBooks function
    setLoading(true); // Set the loading state variable to true
    try {
      const response = await fetch(`${URL}${searchTerm}`); // Fetch the data
      const data = await response.json(); // Convert the response to JSON
      console.log(data); // Log the data
      const {docs} = data; // Extract the docs property
      console.log(docs); // Log the docs
      if (docs) {
        // Check if docs is not null
     const newBooks = docs.slice(0,20).map((bookSingle) => {
      const { key, author_name, cover_i, edition_count, first_publish_year, title } = bookSingle; // Destructure the properties
      return { 
        id: key, 
        author: author_name, 
        cover_id: cover_i, edition: 
        edition_count, 
        first_publish_year: 
        first_publish_year, 
        title: title }; // Return the object with the properties
      }); // Map over the docs array
        setBooks(newBooks); // Set the books state variable to the newBooks array
        if(newBooks.length > 1){
          setResultTitle("Your search results: ");
        } else {
          setResultTitle("No books found. Please try again.");
        }
       } else {
        // If docs is null
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
