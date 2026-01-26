import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import useTheme from "../hooks/useTheme.js";
import { db, storage } from "../firebase/index.js";
import useFireStore from "../hooks/useFireStore.js";
import { doc, getDoc } from "firebase/firestore";
import { AuthContext } from "../contexts/AuthContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function Create() {
  let { id } = useParams();
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [newcategory, setnewCategory] = useState("");
  let [categories, setCategories] = useState([]);
  let [isEdit, setIsEdit] = useState(false);
  let {addCollection,updateDocument}=useFireStore();
  let [imageBase64, setImageBase64] = useState("");

  let {user}=useContext(AuthContext);

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      let ref = doc(db, "books", id);
      getDoc(ref).then((doc) => {
        if (doc.exists()) {
          let {title,description,categories}=doc.data();
          setTitle(title);
          setDescription(description);
          setCategories(categories);
        }
      })
    } else {
      setIsEdit(false);
      setTitle("");
      setDescription("");
      setCategories([]);
    }
  }, []);

  let navigate = useNavigate();

  let addCategory = () => {
    if (newcategory && categories.includes(newcategory)) {
      setnewCategory("");
      return;
    }
    setCategories((prevState) => [newcategory, ...prevState]);
    setnewCategory("");
  };

  let handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // This result is the long string representing the image
        setImageBase64(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  let submitForm =async (e) => {
    e.preventDefault();
    let data = {
      title,
      description,
      categories,
      uid:user.uid,
      coverImage:imageBase64
    };

    if(isEdit){
      await updateDocument("books",id,data);  
    }else{
      await addCollection("books",data);
    }
    navigate("/");
  };

  let { isDark } = useTheme();

  return (
    <div className="min-h-screen overflow-y-auto">
      <form className="w-full max-w-lg mx-auto mt-5" onSubmit={submitForm}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${
                isDark ? "text-white" : ""
              }`}
              htmlFor="grid-password"
            >
              Book Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Book Title"
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${
                isDark ? "text-white" : ""
              }`}
              htmlFor="grid-password"
            >
              Book Descripton
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Book Description"
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${
                isDark ? "text-white" : ""
              }`}
              htmlFor="grid-password"
            >
              Categories
            </label>
            <div className="flex items-center space-x-2">
              <input
                value={newcategory}
                onChange={(e) => setnewCategory(e.target.value)}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="Book Category"
              />
              <button
                type="button"
                onClick={addCategory}
                className="bg-primary p-1 rounded-lg mb-3"
                key={newcategory}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 p-1 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap">
            {categories.map((c) => (
              <span
                key={c}
                className="mx-1 my-1 text-white rounded-full px-2 py-1 text-sm bg-primary"
              >
                {" "}
                {c}
              </span>
            ))}
          </div>
          <div className="w-full px-3 mb-6">
            {/* <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark ? "text-white" : ""}`}>
              Cover Photo (Max 1MB total doc size)
            </label> */}
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-blue-600"
            />
            {imageBase64 && (
              <img src={imageBase64} alt="Preview" className="mt-2 h-20 w-20 object-cover" />
            )}
        </div>

          <div className="w-full px-3 my-3">
            <label
              className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${
                isDark ? "text-white" : ""
              }`}
              htmlFor="grid-password"
            >
              Book Title
            </label>
          </div>

          <button className="text-white bg-primary px-3 py-2 rounded-2xl flex justify-center items-center gap-1 w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <span className="hidden md:block">
              {isEdit ? "Update" : "Create"} book
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
