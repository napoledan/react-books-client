import React, { useState, useContext, useEffect, useCallback } from "react"; // Import the useState, useContext, and useEffect hooks
import axios from "axios"; // Import the axios library

//const URL = "https://openlibrary.org/search.json?title="; // Define the URL for api

const URL = "http://localhost:8080/RestAPI/books-api"; // Define the URL for api

const AppContext = React.createContext(); // Create a context object

const AppProvider = ({ children }) => {
  // Create a provider component
  const [searchTerm, setSearchTerm] = useState(""); // Initialize the searchTerm state variable
  const [books, setBooks] = useState([]); // Initialize the books state variable
  const [loading, setLoading] = useState(true); // Initialize the loading state variable
  const [resultTitle, setResultTitle] = useState(""); // Initialize the resultTitle state variable
  const [format, setFormat] = useState("application/json"); // Initialize the format state variable

  const fetchBooks = useCallback(
    async (searchTerm) => {
      // Define the fetchBooks function
      setLoading(true); // Set the loading state variable to true
      try {
        const url =
          searchTerm !== "*" ? `${URL}?searchTerm=${searchTerm}` : URL; // Construct the URL
        const response = await axios.get(url, {
          headers: {
            Accept: format, // request format header
            "Content-Type": format, // response format header (FOR GET) TODO - should I use POST?
          },
          withCredentials: true,
        }); // Fetch the data from the URL
        
        const data = response.data; // Extract response data
        //let newBooks = []; // Initialize the newBooks array for storing response data as agnostic objects for the formats
        console.log(data); // Log the data to check they came back

        //JSON format
        if (format === "application/json") {
        if (data && Array.isArray(data)) { // Check if books is not null and is an array
          // Check if books is not null
          const newBooks = data.slice(0, 20).map((bookSingle) => { // Map over the books array and return a new array with the properties I need
            const { 
              id,
              bookCoverUrl,
              title,
              author,
              date,
              genres,
              characters,
              synopsis,
            } = bookSingle; // Destructure the properties

            return {
              id: id,
              bookcoverurl: bookCoverUrl,
              title: title,
              author: author,
              date: date,
              genres: genres,
              characters: characters,
              synopsis: synopsis,
            }; // Return the object with the properties
          }); // Slice the data to get only the first 20 books TODO - CHANGE THIS TO ALLOW PAGINATION LATER
        } else if (format === "application/xml") {
          const parser = new DOMParser(); // Create a new DOMParser object
          const xmlDoc = parser.parseFromString(data, "application/xml"); // Parse the XML data
          newBooks = Array.from(xmlDoc.getElementsByTagName("book")).map( // Map over the books array and return a new array with the properties I need
          book => ({
            id: book.getElementsByTagName("id")[0].textContent,
            bookcoverurl: book.getElementsByTagName("bookCoverUrl")[0].textContent,
            title: book.getElementsByTagName("title")[0].textContent,
            author: book.getElementsByTagName("author")[0].textContent,
            date: book.getElementsByTagName("date")[0].textContent,
            genres: book.getElementsByTagName("genres")[0].textContent,
            characters: book.getElementsByTagName("characters")[0].textContent,
            synopsis: book.getElementsByTagName("synopsis")[0].textContent,
          }));
        } else if (format === "text/plain") {
          
          setBooks(newBooks); // Set the books state variable to the newBooks array
          if (newBooks.length > 0) {
            setResultTitle(
              "We have found treasures. Click on a book to know more."
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
        console.log(error); // Log the error
        setLoading(false); // Set the loading state variable to false
      }
    },
    [format]
  ); // Define the dependencies

  useEffect(() => {
    // Define the useEffect hook
    // Call the fetchBooks function only if searchterm is not empty
    if (searchTerm.trim() !== "") {
      fetchBooks(searchTerm);
    } else if (searchTerm.trim() === "*") {
      fetchBooks(searchTerm);
    }
  }, [searchTerm, fetchBooks]); // Define the dependencies

  return (
    <AppContext.Provider
      value={{
        loading,
        books,
        setSearchTerm,
        resultTitle,
        setResultTitle,
        setFormat,
      }}
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
