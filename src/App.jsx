import React, { useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { useState } from "react";
import { db } from "./firebase";
import { auth } from "./firebase";
import { Input, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import ImageUpload from "./ImageUpload";
import Signup from "./Signup";
import Signin from "./Signin";
import Fade from "react-reveal/Fade";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 350,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const App = () => {
  const classes = useStyles();

  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const [posts, setPosts] = useState([]);

  const [username, setUsername] = useState("");

  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(null);

  // FOR AUTHENTICATION
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in
        console.log(authUser);
        setUser(authUser);
      } else {
        // user has logged out
        setUser(null);
      }
    });
    return () => {
      // perform some cleanup actions
      unsubscribe();
    };
  }, [user, username]);

  // FOR DATABASE
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);
  return (
    <>
      <div className="app">
        <Signup open={open} setOpen={setOpen} />
        <Signin openSignIn={openSignIn} setOpenSignIn={setOpenSignIn} />

        <div className="app__header">
          <img
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt="Instagram"
            className="app__headerImg"
          />
          {user ? (
            <div>
              <ImageUpload username={user?.displayName} />
              <Button onClick={() => auth.signOut()}>Logout</Button>
            </div>
          ) : (
            <div>
              <h3>You need to signin/signup to upload</h3>
              <Button onClick={() => setOpenSignIn(true)}>SignIn</Button>
              <Button onClick={() => setOpen(true)}>SignUp</Button>
            </div>
          )}
        </div>
        <div className="app__post">
            <div className="app__postLeft">
              {posts.map(({ id, post }) => {
                return (
                  <Post
                    key={id}
                    username={post.username}
                    caption={post.caption}
                    imgurl={post.imgurl}
                    postid={id}
                    user={user}
                  />
                );
              })}
            </div>

          <Fade bottom delay={300}>
            <div className="app__postRight">
              <img
                className="app__img"
                src="https://firebasestorage.googleapis.com/v0/b/netflix-clone-b6da7.appspot.com/o/images%2Finsta.jpg?alt=media&token=f92a5984-04c7-40e6-a65c-4eeed7e908de"
                alt=""
              />
            </div>
          </Fade>
        </div>
      </div>
    </>
  );
};

export default App;
