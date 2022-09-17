import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import Modal from "../components/Modal";

const EditBook = (props) => {
   const params = useParams();
   const navigate = useNavigate();
   console.log("params", params);

   const [bookname, setBookname] = useState("");
   const [author, setAuthor] = useState("");
   const [isbn, setIsbn] = useState("");
   const [category, setCategory] = useState("");
   const [categories, setCategories] = useState(null);
   const [showModal, setShowModal] = useState(false);

   useEffect(() => {
      axios
         .get(`http://localhost:3004/books/${params.kitapId}`)
         .then((res) => {
            console.log(res.data);
            setBookname(res.data.name);
            setAuthor(res.data.author);
            setIsbn(res.data.isbn);
            setCategory(res.data.categoryId);
            axios
               .get("http://localhost:3004/categories")
               .then((res) => {
                  setCategories(res.data);
               })
               .catch((err) => console.log("categories err", err));
         })
         .catch((err) => console.log(err));
   }, []);

   const handleSubmit = (event) => {
      event.preventDefault();
      setShowModal(true);
   };

   const editBook = () => {
      if (bookname === "" || author === "" || category === "") {
         alert("kitap adı, kitap yazarı boş bırakılamaz");
         return;
      }
      const updatedBook = {
         id: params.kitapId,
         name: bookname,
         author: author,
         categoryId: category,
         isbn: isbn,
      };
      console.log("updateBook", updatedBook);
      axios
         .put(`http://localhost:3004/books/${params.kitapId}`, updatedBook)
         .then((res) => {
            console.log(res);
            setShowModal(false);
            navigate("/");
         })
         .catch((err) => console.log("edit error", err));
   };

   if (categories === null) {
      return <Loading />;
   }

   return (
      <div>
         <Header />
         <div className="container my-5">
            <form onSubmit={handleSubmit}>
               <div className="row">
                  <div className="col">
                     <input
                        type="text"
                        className="form-control"
                        placeholder="Kitap Adı"
                        value={bookname}
                        onChange={(event) => setBookname(event.target.value)}
                     />
                  </div>
                  <div className="col">
                     <input
                        type="text"
                        className="form-control"
                        placeholder="Kitap Yazarı"
                        value={author}
                        onChange={(event) => setAuthor(event.target.value)}
                     />
                  </div>
               </div>
               <div className="row my-5">
                  <div className="col">
                     <input
                        type="text"
                        className="form-control"
                        placeholder="ISBN"
                        value={isbn}
                        onChange={(event) => setIsbn(event.target.value)}
                     />
                  </div>
                  <div className="col">
                     <select
                        className="form-select"
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                     >
                        <option value={""} selected>
                           kategori seçin
                        </option>
                        {categories.map((cat) => {
                           return (
                              <option key={cat.id} value={cat.id}>
                                 {cat.name}
                              </option>
                           );
                        })}
                     </select>
                  </div>
               </div>
               <div className="d-flex justify-content-center">
                  <button
                     onClick={() => navigate("/")}
                     type="button"
                     className="btn btn-outline-danger w-25 mx-3"
                  >
                     Vazgeç
                  </button>
                  <button type="submit" className="btn btn-primary w-25">
                     Kaydet
                  </button>
               </div>
            </form>
         </div>
         {showModal === true && (
            <Modal
               title="Kitap güncelleme"
               aciklama={`${bookname} Kitabı güncellemek için onaylayınız`}
               onCancel={() => setShowModal(false)}
               onConfirm={() => editBook()}
            />
         )}
      </div>
   );
};

export default EditBook;
