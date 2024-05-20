import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppProvider } from "./context";
import HomePage from "./pages/Home/HomePage";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import BookList from "./components/BookList/BookList";
import BookDetails from "./components/BookDetails/BookDetails";
import "./index.css";
/**
 * @description This is the main component of the application into which the other pages and components are rendered
 * The index calls this page and renders it in the root element first
 * @returns {JSX} The main component of the application with the routes established here
 */
// create the root element for the application. This creates the DOM element that the application will be rendered into
const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="book" element={<BookList />} />
            <Route path="/book/:openlibraryid" element={<BookDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

createRoot(document.getElementById("root")).render(<App />);
