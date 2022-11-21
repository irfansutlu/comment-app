import React from "react";
import { ref, get, child, remove, set } from "firebase/database";
import { AiFillDelete, AiFillLike } from "react-icons/ai";
import { BsFillReplyFill } from "react-icons/bs";
import { database } from "../firebase/Firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import { isEmpty } from "@firebase/util";

function Comment({
  data,
  setData,
  username,
  setUsername,
  comment,
  setComment,
}) {
  const getData = () => {
    const dbRef = ref(database);
    get(child(dbRef, `/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.val());
          console.log(snapshot.val());
        } else {
          setData([]);
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const dataDel = async (index) => {
      await remove(ref(database, `/${index}`));
      getData();
  };

  const dataLike = (index) => {
    console.log(data[index].like + 1);
    set(ref(database, `/${index}`), {
      ...data[index],
      like: data[index].like + 1,
    });
    getData();
  };

  const addReply = (index) => {
    if (username && comment) {
      set(
        ref(database, `/${index}/replies`),
        data[index]?.replies
          ? [
              ...data[index].replies,
              {
                name: username,
                comments: comment,
              },
            ]
          : [
              {
                name: username,
                comments: comment,
              },
            ]
      );
    }
    getData();
  };

  return (
    <div>
      {data?.map((item, i) => {
        const index = data.indexOf(item);
        return (
          <div key={i} className="card bg-dark w-50 mt-3 text-light">
            <div className="card-header ">
              <h3>{item?.name}</h3>
            </div>
            <div className="card-body card-text bg-secondary">
              <p>{item?.comments}</p>
            </div>
            <div className="bg-info">
              <span>
                <AiFillLike
                  onClick={(e) => {
                    dataLike(index);
                  }}
                />
                {item.like}
              </span>
              <AiFillDelete
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure that you want to remove comment?"
                    )
                  ) {
                    dataDel(index);
                  }
                }}
              />
              <BsFillReplyFill
                onClick={(e) => {
                  addReply(index);
                }}
              />
            </div>
            <div>
              {data[i]?.replies?.map((reply) => (
                <div key={reply} className="mx-5 card bg-light text-dark">
                  <h3 className="card-title">{reply?.name}</h3>
                  <p className="card-text">{reply?.comments}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Comment;
