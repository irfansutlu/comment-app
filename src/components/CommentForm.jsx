import React, { useEffect } from "react";
import { ref, get, child, set } from "firebase/database";
import { database } from "../firebase/Firebase";
import "bootstrap/dist/css/bootstrap.min.css";

function CommentForm({
  data,
  setData,
  username,
  setUsername,
  comment,
  setComment,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    set(
      ref(database, "/"),
      data
        ? [
            ...data,
            {
              name: username,
              comments: comment,
              like:0,
            },
          ]
        : [
            {
              name: username,
              comments: comment,
              like:0,
            },
          ]
    );
    getData();
    setUsername("");
    setComment("");
  };

  const getData = () => {
    const dbRef = ref(database);
    get(child(dbRef, `/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.val());
          console.log(snapshot.val());
        } else {
        
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="text-center w-50 mx-auto">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
          class="form-control mt-5"
        />
        <textarea
          cols="50"
          rows="10"
          placeholder="Enter a comment"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          required
          class="form-control"
        ></textarea>
        <button type="submit" class="btn btn-warning">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CommentForm;
