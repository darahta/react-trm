import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import Home from "./pages/Home";
import { useDispatch } from "react-redux";
import axios from "axios";

function App() {
   const dispatch = useDispatch();

   useEffect(() => {
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
   }, []);
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-book" element={<AddBook />} />
            <Route path="/edit-book/:kitapId" element={<EditBook />} />
         </Routes>
      </BrowserRouter>
   );
}

export default App;
