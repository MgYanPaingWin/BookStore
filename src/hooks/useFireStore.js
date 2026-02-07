import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../firebase";

export default function useFireStore() {
  
  //get collection
  let getCollection = (colName,_q,search) => {
    let qRef=useRef(_q).current
    let [error, setError] = useState("");
    let [data, setData] = useState([]);
    let [loading, setLoading] = useState(false);

    useEffect(function () {
      setLoading(true);
      let ref = collection(db,  colName);
      let queries=[];
      if(qRef){
        queries.push(where(...qRef))
      }
      queries.push(orderBy("date","desc"));
      let q = query(ref,...queries);

      onSnapshot(q, (docs) => {
        if (docs.empty) {
          setError("No books found");
          setLoading(false);
          setData([]);
        } else {
          let collectionDatas = [];
          docs.forEach((doc) => {
            let document = { id: doc.id, ...doc.data() };
            collectionDatas.push(document);
          });

          if(search.field){
            let searchedDatas=collectionDatas.filter(doc=>{
              return doc[search.field].includes(search.value)
            })
            setData(searchedDatas);
          }else{
            setData(collectionDatas);
          }
          setLoading(false);
          setError("");
        }
      });
    }, [qRef,search.field,search.value,colName]);
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
  let addCollection = async (colName,data) => {
    data.date=serverTimestamp();
    let ref = collection(db, colName);
    return addDoc(ref, data);
  };

  //delete collection
  let deleteDocument = async (colName, id) => {
    let ref = doc(db, colName, id);
    return deleteDoc(ref);
  };

  //update collection
  let updateDocument = async (colName,id,data,updateDate=true) => {
    if(updateDate){
      data.date=serverTimestamp();
    }
    let ref=doc(db,colName,id);
    return updateDoc(ref,data);
  };

  return { getCollection,getDocument, addCollection, deleteDocument, updateDocument };
}

