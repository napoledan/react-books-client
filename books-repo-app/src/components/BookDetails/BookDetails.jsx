import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Loading from "../Loader/Loader";
import coverImg from "../../images/cover_not_found.jpg";
import "./BookDetails.css";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa"; // Import back,edit and delete icons
import { useNavigate } from 'react-router-dom';

const URL = "https://openlibrary.org/works/";
// Create a BookDetails component that displays the details of a book based on the id parameter in the URL path
const BookDetails = () => {
  // Get the id parameter from the response
  const {id} = useParams();
  // Create state variables for loading and book details
  const [loading, setLoading] = useState(false);
  // Create a state variable for the book details
  const [book, setBook] = useState(null);
  // Get the navigate function from the useNavigate hook
  const navigate = useNavigate();
// Use the useEffect hook to fetch book details based on the id parameter
  useEffect(() => {
    setLoading(true);
    async function getBookDetails(){
      try{
        // Fetch book details based on the id parameter
        const response = await fetch(`${URL}${id}.json`);
        // Convert the response to JSON
        const data = await response.json();
        // Log the data
        console.log(data);
        // Check if the data is not null for validation
        if(data){
          // Destructure the data object
          const {description, title, covers, subject_places, subject_people, subjects} = data;
          // Create a new book object with the required properties
          const newBook = {
            // Check if the description is available, otherwise set it to a default value
            description: description ? description.value : "No description found",
            // Set the title
            title: title ? title : "Unknown title",
            cover_img: covers ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg` : coverImg,
            subject_places: subject_places ? subject_places.join(", ") : "No subject places found",
            subject_people : subject_people ? subject_people.join(", ") : "No subject people found",
            subjects: subjects ? subjects.join(", ") : "No subjects found"
          };
          setBook(newBook);
        } else {
          setBook(null);
        }
        setLoading(false);
      } catch(error){
        console.log(error);
        setLoading(false);
      }
    }
    getBookDetails();
  }, [id]);

  if(loading) return <Loading />;

  return (
    <section className='book-details'>
      <div className='container'>
        <div className="header">
          <button type='button' className='flex flex-c icon-btn back-btn' onClick={() => navigate("/book")}>
            <FaArrowLeft size = {22} />
            <span className='fs-18 fw-6'>Go Back</span>
          </button>
          <div className='edit-delete-buttons'>
            {/* Edit button */}
            <button className=" icon-btn edit-btn flex flex-sb" onClick={() => {}}>
              <FaEdit size = {22} />
              <span className='fs-18 fw-6'>Edit</span>
            </button>
            {/* Delete button */}
            <button className="icon-btn del-btn flex flex-sb" onClick={() => {}}>
              <FaTrash size = {22} />
              <span className='fs-18 fw-6'>Delete</span>
            </button>
          </div>
        </div>
        <div className='book-details-content grid'>
          <div className='book-details-img'>
            <img src = {book?.cover_img} alt = "cover img" />
          </div>
          <div className='book-details-info'>
            <div className='book-details-item title'>
              <span className='fw-6 fs-24'>{book?.title}</span>
            </div>
            <div className='book-details-item description'>
              <span>{book?.description}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Subject Places: </span>
              <span className='text-italic'>{book?.subject_places}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Subject People: </span>
              <span className='text-italic'>{book?.subject_people}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Subjects: </span>
              <span>{book?.subjects}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookDetails