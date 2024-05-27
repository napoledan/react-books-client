import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppProvider } from "./context";
import HomePage from "./pages/Home/HomePage";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import AddBook from "./components/AddBook/AddBook";
import BookList from "./components/BookList/BookList";
import BookDetails from "./components/BookDetails/BookDetails";
import Edit from "./components/EditBook/EditBook";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BooksProvider } from "./components/BookDetails/BooksContext";
/**
 * @description This is the main component of the application into which the other pages and components are rendered
 * The index calls this page and renders it in the root element first
 * @returns {JSX} The main component of the application with the routes established here
 */
// create the root element for the application. This creates the DOM element that the application will be rendered into

// create a new instance of the QueryClient
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <BooksProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />}>
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="book" element={<BookList />} />
                <Route path="/book/add-book" element={<AddBook />} />
                <Route path="/book/:id" element={<BookDetails />} />
                <Route path="/book/:id/edit" element={<Edit />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </BooksProvider>
      </AppProvider>
    </QueryClientProvider>
  );
};

createRoot(document.getElementById("root")).render(<App />);
