import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Human_Nature from "../assets/Human_Nature.jpg";
import useTheme from "../hooks/useTheme";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/index.js";

export default function BookDetail() {
  let { id } = useParams();
  let [error, setError] = useState("");
  let [book, setBook] = useState(null);
  let [loading, setLoading] = useState(false);
  let { isDark } = useTheme();

  useEffect(function () {
      setLoading(true);
      let ref=doc(db,'books',id);
      onSnapshot(ref,doc=>{
        if (doc.exists()) {
          let book={id : doc.id,...doc.data()};
          setBook(book);
          setLoading(false);
          setError('');
        }else{
          setError("Book not found");
          setLoading(false);
        }
      })
  },[id]);

  return (
    <>
      {error && <p>{error}</p>}
      {loading && <p>loading ...</p>}
      {book && (
        <div
          className={`grid grid-cols-2 h-screen ${isDark ? "text-white" : ""}`}
        >
          <div>
            <img src={Human_Nature} alt="" className="max-h-[500px] object-contain mx-auto" />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{book.title}</h1>
            <div className="space-x-3">
              {book.categories.map((category) => (
                <span
                  className="bg-blue-500 text-white rounded-full text-sm px-2 py-1"
                  key={category}
                >
                  {category}
                </span>
              ))}
            </div>
            <p>{book.description}</p>
          </div>
        </div>
      )}
    </>
  );
}
