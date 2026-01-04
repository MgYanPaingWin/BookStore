import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";

export default function useFireStore() {
  //get collection
  let getCollection = (colName) => {
    let [error, setError] = useState("");
    let [data, setData] = useState([]);
    let [loading, setLoading] = useState(false);
    useEffect(function () {
      setLoading(true);
      let ref = collection(db, colName);

      let q = query(ref, orderBy("date", "desc"));
      onSnapshot(q, (docs) => {
        if (docs.empty) {
          setError("No books found");
          setLoading(false);
        } else {
          let collectionDatas = [];
          docs.forEach((doc) => {
            let document = { id: doc.id, ...doc.data() };
            collectionDatas.push(document);
          });
          setData(collectionDatas);
          setLoading(false);
          setError("");
        }
      });
    }, []);
    return { error, data, loading };
  };

  let getDocument = (colName,id) => {
    let [error, setError] = useState("");
    let [data, setData] = useState(null);
    let [loading, setLoading] = useState(false);

    useEffect(
      function () {
        setLoading(true);
        let ref = doc(db, colName, id);
        onSnapshot(ref, (doc) => {
          if (doc.exists()) {
            let book = { id: doc.id, ...doc.data() };
            setData(book);
            setLoading(false);
            setError("");
          } else {
            setError("Book not found");
            setLoading(false);
          }
        });
      },
      [id]
    );
    return { error, data, loading };
  };

  //add collection
  let addCollection = () => {};

  //delete collection
  let deleteDocument = async (colName, id) => {
    let ref = doc(db, colName, id);
    return deleteDoc(ref);
  };

  //update collection
  let updateCollection = () => {};
  return { getCollection,getDocument, addCollection, deleteDocument, updateCollection };
}
