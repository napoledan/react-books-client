import React, {useRef, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from 'axios'; // import axios for making ajax requests
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context";
import "./SearchForm.css";

const SearchForm = () => 
    {
    const {setSearchTerm, setResultTitle} = useGlobalContext(); // Get the setSearchTerm and setResultTitle functions from the useGlobalContext hook
    const searchText = useRef(''); // Create a reference to the input element
    const [format, setFormat] = useState('json'); // Create a state variable for the format
    const navigate = useNavigate(); // Get the navigate function from the useNavigate hook

    useEffect(() => searchText.current.focus(), []);   // Add a useEffect hook
    
    const handleQuerySubmit = async (e) => {
        
        e.preventDefault(); // Prevent the default behavior of the form element

        let tempSearchTerm = searchText.current.value.trim(); // Get the value of the input element and trim it

        const pattern = /^[a-zA-Z0-9\s]*$/; // match only alphanumeric characters and spaces     

        if (tempSearchTerm === "") {
            // If the input is empty
            searchText.current.classList.add('shake'); // Add the 'shake' class to the search box
            setSearchTerm(''); // Clear the search term
            setResultTitle(''); // Clear the result title
            searchText.current.value = ''; // Clear the input value
            searchText.current.placeholder = 'You have to enter something ...'; // Display a message in the placeholder
            searchText.current.classList.add('shake'); // Add the 'shake' class to the search box
            searchText.current.classList.add('invalid'); // Add the 'invalid' class to change text color
            setTimeout(() => {
                searchText.current.classList.remove('shake'); // Remove the 'shake' class after the animation ends
                searchText.current.placeholder = 'Enter something valid ...'; // Restore the original placeholder
            }, 1000); // Adjust the timeout based on the duration of the shake animation           
        } 
        
        else if (!pattern.test(tempSearchTerm)) {
            // If the input contains invalid characters
            setSearchTerm(''); // Clear the search term
            setResultTitle(''); // Clear the result title
            searchText.current.value = ''; // Clear the input value
            searchText.current.placeholder = 'Invalid input. Alphanumerics only please ...'; // Display a message in the placeholder
            searchText.current.classList.add('shake'); // Add the 'shake' class to the search box
            searchText.current.classList.add('invalid'); // Add the 'invalid' class to change text color
            setTimeout(() => {
                searchText.current.classList.remove('shake'); // Remove the 'shake' class after the animation ends
                searchText.current.placeholder = 'Enter something valid ...'; // Restore the original placeholder
            }, 1000); // Adjust the timeout based on the duration of the shake animation
        }
        else {
            setSearchTerm(tempSearchTerm); // Set the search term to the value of the input element
            try {
                const response = await axios.get(`/search?q=${tempSearchTerm}&format=${format}`); // Make a GET request to the /search route
                setResultTitle(response.data.title); // Set the result title to the title of the response
                navigate("/book"); // Navigate to the /book route and show results below the search bar
                } catch (error) { // Catch any errors
                    console.error("Error searching: ", error); // Log the error
                }
            }
    };

    const handleSearchEverything = async () => 
    {
        try {
            const response = await axios.get(`/search?q=*&format=${format}`); // Make a GET request to the /search route
            setResultTitle(response.data.title); // Set the result title to the title of the response
            navigate("/book"); // Navigate to the /book route and show results below the search bar
        } catch (error) { // Catch any errors
            console.error("Error searching: ", error); // Log the error
        }
    };

    return (
        // Search form with input field, radio buttons, and search button
        <div className='search-form'>
            <div className='container'>
                <div className='search-form-content'>
                    {/** Single query submit button */}
                    <form className='search-form' onSubmit={handleQuerySubmit}>
                        <div className='search-form-elem flex flex-sb bg-white'>
                            <input type = "text" id='form-input-field' className= 'form-control' placeholder='Search specifics ...' ref = {searchText} />
                                <button type="submit" className='flex flex-c' onClick={handleQuerySubmit}>
                                    <FaSearch className='text-dark-green' size = {32}/>
                                </button>
                        </div>
                        <div className="radio-button-container">
                        {/** radio buttons for selecting the format */}
                        <div className='search-form-radio-buttons '>
                            <input type="radio" id="radio-json" className="radio-button" name="format" value="application/json" checked={format === 'json'} onChange={() => setFormat('json')} />
                                <label className="radio-label" id="json-radio-label" htmlFor="radio-json">JSON</label>
                            <input type="radio" id="radio-xml" className="radio-button" name="format" value="application/xml" checked={format === 'xml'} onChange={() => setFormat('xml')} />
                                <label className="radio-label" id="xml-radio-label" htmlFor="radio-xml">XML</label>
                            <input type="radio" id="radio-plain" className="radio-button" name="format" value="text/plain" checked={format === 'text/plain'} onChange={() => setFormat('text/plain')} />
                                <label className="radio-label" id="plain-radio-label" htmlFor="radio-plain">TEXT</label>
                        </div>   
                        </div>                 
                    </form>
                </div>
                {/* Button for searching everything */}
                <div className="search-everything-button-container">
                    <button type="submit" className="search-everything-button" onClick={handleSearchEverything}>Search everything</button>
                </div>
            </div>
        </div>
    );
};
  
  export default SearchForm;
  