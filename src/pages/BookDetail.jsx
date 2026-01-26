import { useParams } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import useFireStore from "../hooks/useFireStore.js";
import { useState } from "react";

export default function BookDetail() {
  let { id } = useParams();
  let { isDark } = useTheme();
  let [notes, setNotes] = useState("");
  let { getDocument, addCollection,getCollection } = useFireStore();
  let { error, data: book, loading } = getDocument("books", id);
  let {data:note}=getCollection("notes",['bookId','==',id])

  let addNote=(e)=>{
    e.preventDefault();
    let noteData={
      bookId:id,
      notes:notes,
    }
    addCollection("notes",noteData);
    setNotes("");
  }

  return (
    <>
      {error && <p>{error}</p>}
      {loading && <p>loading ...</p>}
      {book && (
        <>
          <div className={`grid grid-cols-2 ${isDark ? "text-white" : ""}`}>
            <div>
              <img
                src={book.coverImage}
                alt=""
                className="max-h-[300px] object-contain mx-auto"
              />
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

          <div>
            <form action="" onSubmit={addNote}>
              <h3 className="font-bold text-xl text-primary mt-20 mb-5 text-center">
              My Notes
            </h3>
            <textarea
              className="p-3 shadow-md border-2 outline-0 border-gray-300 bg-gray-100 w-full"
              name=""
              id=""
              cols="30"
              rows="5"
              value={notes}
              onChange={(e)=>setNotes(e.target.value)}
            ></textarea>
            <div className="flex justify-end">
              <button className="text-white bg-primary px-3 py-1 my-2 rounded-lg flex items-center gap-1">
              <span className="hidden md:block">Add note</span>
            </button>
            </div>
            </form>

            {note.map((n) => (
                <div key={n.id} className="shadow-md p-3 outline-0 my-3">
                  <div className="flex space-x-3">
                    <img
                      src="https://avatars.githubusercontent.com/u/142674055?v=4"
                      alt=""
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3>Yan Paing Win</h3>
                      <div className="text-gray-400">25.1.2026</div>
                    </div>
                  </div>
                  <div className="mt-3">
                    {/* Render the specific note data */}
                    {n.notes}
                  </div>
                </div>
              ))}

          </div>
        </>
      )}
    </>
  );
}
