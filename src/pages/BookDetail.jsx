import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Human_Nature from "../assets/Human_Nature.jpg";

export default function BookDetail() {
  //dynamic id
  let { id } = useParams();

  let {data : book,loading,error}=useFetch(`http://localhost:3000/books/${id}`);
  
  return (
    <>
        {error && <p>{error}</p>}
        {loading && <p>loading ...</p>}
        {book && (
            <div className="grid grid-cols-2">
              <div>
                <img src={Human_Nature} alt="" className="w-[80%]"/>
              </div>
              <div>
                <h1 className="text-3xl font-bold">{book.title}</h1>
                <div>
                  <span className="bg-blue-500 text-white rounded-full text-xs px-2 py-1" >HTML</span>
                </div>
              </div>
            </div>
        )}
    </>
  )
}
