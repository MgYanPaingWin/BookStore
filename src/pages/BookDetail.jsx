import { useParams } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import useFireStore from "../hooks/useFireStore.js";
import NoteForm from "../components/NoteForm.jsx";
import NoteList from "../components/NoteList.jsx";

export default function BookDetail() {
  let { id } = useParams();
  let { isDark } = useTheme();
  let { getDocument } = useFireStore();
  let { error, data: book, loading } = getDocument("books", id);

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
            <NoteForm/>
            <NoteList/>
          </div>
        </>
      )}
    </>
  );
}
