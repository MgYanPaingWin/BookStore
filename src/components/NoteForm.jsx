import React, { useState } from "react";
import useFireStore from "../hooks/useFireStore";
import { useParams } from "react-router-dom";

export default function NoteForm({type='create'}) {
  let { id } = useParams();
  let [notes, setNotes] = useState("");
  let { addCollection } = useFireStore();
  let addNote = (e) => {
    e.preventDefault();
    let noteData = {
      bookId: id,
      notes: notes,
    };
    addCollection("notes", noteData);
    setNotes("");
  };
  return (
    <form action="" onSubmit={addNote}>
      <textarea
        className="p-3 shadow-md border-2 outline-0 border-gray-300 bg-gray-100 w-full"
        name=""
        id=""
        cols="30"
        rows="5"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      ></textarea>
      <div className="flex justify-end">
        <button className="text-white bg-primary px-3 py-1 my-2 rounded-lg flex items-center gap-1">
          <span className="hidden md:block">{type ==='create' ? "Add" : "Update"} note</span>
        </button>
      </div>
    </form>
  );
}
