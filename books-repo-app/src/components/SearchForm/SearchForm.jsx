import React, {useRef, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from 'axios'; // import axios for making ajax requests
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context";
import "./SearchForm.css";

const SearchForm = () => {
    const {setSearchTerm, setResultTitle} = useGlobalContext(); // Get the setSearchTerm and setResultTitle functions from the useGlobalContext hook
    const searchText = useRef(''); // Create a reference to the input element
    const [format, setFormat] = useState('json'); // Create a state variable for the format
    const navigate = useNavigate(); // Get the navigate function from the useNavigate hook

    useEffect(() => searchText.current.focus(), []);   // Add a useEffect hook
    
    const handleSubmit = async (e) => {
        
        e.preventDefault(); // Prevent the default behavior

        let tempSearchTerm = searchText.current.value.trim(); // Get the value of the input element and trim it

        const pattern = /^[a-zA-Z0-9\s]*$/; // Create a regular expression pattern to match only alphanumeric characters and spaces     

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
                searchText.current.placeholder = 'Enter a valid search ...'; // Restore the original placeholder
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
                searchText.current.placeholder = 'Enter a valid search ...'; // Restore the original placeholder
            }, 1000); // Adjust the timeout based on the duration of the shake animation
        }
        else {
            setSearchTerm(tempSearchTerm); // Set the search term to the value of the input element
            navigate("/book"); // Navigate to the /book route and show results below the search bar
        }       
    };
    return (
        <div className='search-form'>
            <div className='container'>
                <div className='search-form-content'>
                    <form className='search-form' onSubmit={handleSubmit}>
                        <div className='search-form-elem flex flex-sb bg-white'>
                        <input type = "text" className= 'form-control' placeholder='Search our pages ...' ref = {searchText} />
                        <button type="submit" className='flex flex-c' onClick={handleSubmit}>
                        <FaSearch className='text-dark-green' size = {32}/>
                        </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
  }
  
  export default SearchForm;
  