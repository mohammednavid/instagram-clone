import React, { useState } from "react";
import { Button, Modal, makeStyles } from "@material-ui/core";
import { storage, db } from "./firebase";
import firebase from "firebase";
// import { motion } from "framer-motion";

// STYLED COMPONENT
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

function ImageUpload({ username }) {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  //   FOR MODAL
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // PROGRESS BAR(FUNCTION)
        const progress = Math.round(
          // PROGRESS FROM 0 TO 100
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // ERROR FUNCTION
        console.log(error);
        alert(error.message);
      },
      () => {
        // COMPLETE FUNCTION
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // ALL WORKS COME TOGETHER
            // AND
            // POSTING IMAGE INSIDE DATABASE
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imgurl: url,
              username: username,
            });
            setProgress(0);
            setCaption("");
            setImage(null);
            setOpen(false);
          });
      }
    );
  };
  // const uploadVariants = {
  //   hidden: { opacity: 0 },
  //   visible: {
  //     opacity: 1,

  //     transition: {
  //       duration: 0.5,
  //     },
  //   },
  // };

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        {/* <motion.div
          variants={uploadVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          style={modalStyle}
          className={classes.paper}
        > */}
        <div style={modalStyle}
          className={classes.paper}>
          <form>
            <center>
              <img
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="Instagram"
                className="app__headerImg"
              />
            </center>
            <progress value={progress} max="100" />
            <input
              type="text"
              placeholder="Enter a caption"
              onChange={(e) => setCaption(e.target.value)}
              value={caption}
            />
            <input type="file" onChange={handleChange} />
            <Button disabled={!image} onClick={handleUpload}>
              Upload
            </Button>
          </form>
        </div>
        {/* </motion.div> */}
      </Modal>
      <Button onClick={() => setOpen(true)}>Upload</Button>
    </>
  );
}

export default ImageUpload;
