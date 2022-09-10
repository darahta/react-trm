import React, { useEffect, useState } from "react";
import axios from "axios";
const AddBookForm = (props) => {
   useEffect(() => {
      axios
         .get("http://localhost:3004/categories")
         .then((res) => {})
         .catch((err) => console.log(err));
   }, []);
   return (
      <div className="container my-5">
         <form>
            <div className="row">
               <div className="col">
                  <input
                     type="text"
                     class="form-control"
                     placeholder="Kitap Adı"
                  />
               </div>
               <div className="col">
                  <input
                     type="text"
                     class="form-control"
                     placeholder="Kitap Yazarı"
                  />
               </div>
            </div>
            <div className="row my-5">
               <div className="col">
                  <input type="text" class="form-control" placeholder="ISBN" />
               </div>
               <div className="col">
                  <select className="form-select">
                     <option selected>Open this select menu</option>
                     <option value="1">One</option>
                     <option value="2">Two</option>
                     <option value="3">Three</option>
                  </select>
               </div>
            </div>
         </form>
      </div>
   );
};

export default AddBookForm;
