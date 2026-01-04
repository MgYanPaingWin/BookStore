import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default function useRealtimeCollection(colName) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    const ref = collection(db, colName);
    const q = query(ref, orderBy("date", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (snapshot.empty) {
          setError("No documents found");
          setData([]);
        } else {
          const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setData(docs);
          setError("");
        }
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [colName]);

  return { data, loading, error };
}
