import React, { useState } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

function Comments() {
  const [data, setData] = useState(null);
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");


 
  return (
    <div>
      <CommentForm
        data={data}
        setData={setData}
        username={username}
        setUsername={setUsername}
        comment={comment}
        setComment={setComment}
      />
      <Comment
        data={data}
        setData={setData}
        username={username}
        setUsername={setUsername}
        comment={comment}
        setComment={setComment}
      />
    </div>
  );
}

export default Comments;
