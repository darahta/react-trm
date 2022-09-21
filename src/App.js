import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import Home from "./pages/Home";
import { useDispatch } from "react-redux";
import axios from "axios";
import CategoriesList from "./pages/CategoriesList";

function App() {
   const dispatch = useDispatch();

   useEffect(() => {
      //categories
      dispatch({ type: "FETCH_CATEGORIES_START" });
      axios
         .get("http://localhost:3004/categories")
         .then((res) => {
            dispatch({ type: "FETCH_CATEGORIES_SUCCESS", payload: res.data });
         })
         .catch((err) => {
            dispatch({
               type: "FETCH_CATEGORIES-FAIL",
               payload: "Kategorileri çekerken bir hata oluştu",
            });
         });
      //books
      dispatch({ type: "FETCH_BOOKS_START" });
      axios
         .get("http://localhost:3004/books")
         .then((res) => {
            dispatch({ type: "FETCH_BOOKS_SUCCESS", payload: res.data });
         })
         .catch((err) => {
            dispatch({
               type: "FETCH_BOOKS_FAIL",
               payload: "kitapları çekerken bir hata oluştu",
            });
         });
   }, []);
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-book" element={<AddBook />} />
            <Route path="/edit-book/:kitapId" element={<EditBook />} />
            <Route path="/categories" element={<CategoriesList />} />
         </Routes>
      </BrowserRouter>
   );
}

export default App;
