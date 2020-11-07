import React, { useState, useEffect } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "./firebase";
import firebase from "firebase";
import Fade from "react-reveal/Fade";

const Post = ({ username, caption, imgurl, postid, user }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postid) {
      unsubscribe = db
        .collection("posts")
        .doc(postid)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postid]);

  const postComment = (e) => {
    e.preventDefault();
    db.collection("posts").doc(postid).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <>
          <Fade bottom delay={300}>
    <div className="post">
      <div className="post__header">
        <Avatar className="post__avatar" alt={username} />
        <h4>{username}</h4>
      </div>
      <img src={imgurl} alt="" className="post__img" />

      <p className="post__caption">
        <span className="post__captionUsername">{username} </span>
        {caption}
      </p>
      <div className="post__comments">
        {comments.map((comment) => {
          return (
            <p>
              <strong className="post__commentsUsername">
                {comment.username}
              </strong>
              {comment.text}
            </p>
          );
        })}
      </div>
      <form className="post__commentBox">
        <input
          className="post__input"
          type="text"
          value={comment}
          placeholder="Add a comment..."
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className="post__button"
          disabled={!comment}
          type="submit"
          onClick={postComment}
        >
          Post
        </button>
      </form>
    </div>
    </Fade>
    </>
  );
};
export default Post;
