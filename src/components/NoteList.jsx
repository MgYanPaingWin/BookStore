import React, { useState } from "react";
import useFireStore from "../hooks/useFireStore";
import { useParams } from "react-router-dom";
import moment from "moment";
import trash from "../assets/trash.svg";
import pencilIcon from "../assets/pencil.svg";
import NoteForm from "./NoteForm";

export default function NoteList() {
  let { id } = useParams();
  let { getCollection,deleteDocument } = useFireStore();

  let { data: note } = getCollection("notes", ["bookId", "==", id]);
  let [editNote,setEditNote]=useState(null);

  let deleteNote = async (id) => {
      await deleteDocument("notes", id);
  }

  return (
    !!note.length &&
    note.map((n) => (
      <div key={n.id} className="shadow-md p-3 outline-0 my-3">
        <div className="flex space-x-3 justify-between">
          <div>
            <img
              src="https://avatars.githubusercontent.com/u/142674055?v=4"
              alt=""
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3>Yan Paing Win</h3>
              <div className="text-gray-400">
                {moment(n?.date?.seconds * 1000).fromNow()}
              </div>
            </div>
          </div>
          <div>
            <img onClick={() => setEditNote(n)} src={pencilIcon} alt="Edit" className=" cursor-pointer" />
            <img onClick={() => deleteNote(n.id)} src={trash} alt="Delete note" className="cursor-pointer" />
          </div>
        </div>
        <div className="mt-3">
          {n.notes}
          {editNote?.id==n.id && <NoteForm type="update"/>}
          </div>
      </div>
    ))
  );
}
