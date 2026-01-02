import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Human_Nature from "../assets/Human_Nature.jpg";
import useTheme from "../hooks/useTheme";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/index.js";
import useFireStore from "../hooks/useFireStore.js";

export default function BookDetail() {
  let { id } = useParams();
  let { isDark } = useTheme();

  let {getDocument}=useFireStore();
  let { error, data: book, loading } = getDocument('books',id);

  

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
