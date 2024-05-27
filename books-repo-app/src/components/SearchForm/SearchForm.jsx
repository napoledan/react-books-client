import React, { useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
//import axios from "axios"; // import axios for making ajax requests
//import { useHistory } from "react-router-dom";
import { useGlobalContext } from "../../context";
import { useNavigate } from "react-router-dom";
import "./SearchForm.css";

const SearchForm = () => {
  //const history = useHistory(); // Get the history object from the useHistory hook
  const { setSearchTerm, setFormat } = useGlobalContext(); // Get the setSearchTerm and setResultTitle functions from the useGlobalContext hook
  const searchText = useRef(""); // Create a reference to the input element
  const [format, setLocalFormat] = useState("application/json"); // Create a state variable for the format
  const navigate = useNavigate(); // Get the navigate function from the useNavigate hook
  //useEffect(() => searchText.current.focus(), []); // Add a useEffect hook

  const handleQuerySubmit = (e) => {
    e.preventDefault(); // Prevent the default behavior of the form element
    const term = searchText.current.value.trim(); // Get the value of the input element and trim it
    //input validation - TODO - move to a helper function
    const isValid = /^[a-zA-Z0-9\s]*$/.test(term) && term !== ""; // match only alphanumeric characters and spaces

    if (!isValid) {
      // If the input is empty or contains invalid characters
      searchText.current.classList.add("shake"); // Add the 'shake' class to the search box
      setSearchTerm(""); // Clear the search term
      searchText.current.value = ""; // Clear the input value
      searchText.current.placeholder =
        "Only alphanumerics. Use a real search term"; // Display a message in the placeholder
      searchText.current.classList.add("shake"); // Add the 'shake' class to the search box
      searchText.current.classList.add("invalid"); // Add the 'invalid' class to change text color
      setTimeout(() => {
        searchText.current.classList.remove("shake"); // Remove the 'shake' class after the animation ends
        searchText.current.placeholder = "Enter something valid ..."; // Restore the original placeholder
      }, 1000); // Adjust the timeout based on the duration of the shake animation
      return; // Exit the function
    }
    //what happens when the search button is clicked? - TODO - move to a helper function
    setSearchTerm(term); // Set the search term to the value of the input element
    setFormat(format); // Set the format to the selected format
    //handleSubmit(term); // Call the handleSubmit function with the search term as an argument
    //fetchBooks(term); // Call the fetchBooks function
    navigate("/book"); // Navigate to the /book route and show results below the search bar
  };

  const handleSearchEverything = (e) => {
    e.preventDefault(); // Prevent the default behavior of the form element
    console.log("Search Button Clicked");
    const term = searchText.current.value.trim(); // Get the value of the input element and trim it
    setSearchTerm("*"); // Set the search term to '*' for all
    setFormat(format); // Set the format to the selected format
    console.log("Search term set to:", term); // Log the term
    console.log("Format set to:", format); // Log the format
    //fetchBooks(term); // Call the fetchBooks function
    navigate("/book"); // Navigate to the /book route and show results below the search bar
  };

  return (
    // Search form with input field, radio buttons, and search button
    <div className="search-form">
      <div className="container">
        <div className="search-form-content">
          {/** Single query submit button */}
          <form className="search-form" onSubmit={handleQuerySubmit}>
            <div className="search-form-elem flex flex-sb bg-white">
              <input
                type="text"
                id="form-input-field"
                className="form-control"
                placeholder="Search specifics ..."
                ref={searchText}
              />
              <button type="submit" className="flex flex-c">
                <FaSearch className="text-purple" size={32} />
              </button>
            </div>
            <div className="radio-button-container">
              {/** radio buttons for selecting the format */}
              <div className="search-form-radio-buttons ">
                <input
                  type="radio"
                  id="radio-json"
                  className="radio-button"
                  name="format"
                  value="application/json"
                  checked={format === "application/json"}
                  onChange={() => setLocalFormat("application/json")}
                />
                <label
                  className="radio-label"
                  id="json-radio-label"
                  htmlFor="radio-json"
                >
                  JSON
                </label>
                <input
                  type="radio"
                  id="radio-xml"
                  className="radio-button"
                  name="format"
                  value="application/xml"
                  checked={format === "application/xml"}
                  onChange={() => setLocalFormat("application/xml")}
                />
                <label
                  className="radio-label"
                  id="xml-radio-label"
                  htmlFor="radio-xml"
                >
                  XML
                </label>
                <input
                  type="radio"
                  id="radio-plain"
                  className="radio-button"
                  name="format"
                  value="text/plain"
                  checked={format === "text/plain"}
                  onChange={() => setLocalFormat("text/plain")}
                />
                <label
                  className="radio-label"
                  id="plain-radio-label"
                  htmlFor="radio-plain"
                >
                  TEXT
                </label>
              </div>
            </div>
          </form>
        </div>
        {/* Button for searching everything */}
        <div className="search-everything-button-container">
          <button
            type="button"
            className="search-everything-button"
            onClick={handleSearchEverything}
          >
            Search everything
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
