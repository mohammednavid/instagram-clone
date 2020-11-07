import React, { useState } from "react";
import { makeStyles, Modal, Input, Button } from "@material-ui/core";
import { auth } from "./firebase";
// import { motion } from "framer-motion";

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

function Signin({ openSignIn, setOpenSignIn }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();

  const [modalStyle] = useState(getModalStyle);

  // FOR SIGNIN
  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
    setOpenSignIn(false);
    setEmail("");
    setPassword("");
  };

  const signinVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,

      transition: {
        duration: 0.5,
      },
    },
  };
  return (
    <div className="signup">
      {/* {openSignIn && ( */}
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle}
          className={classes.paper}
        >
          <form className="app__signup">
            <center>
              <img
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="Instagram"
                className="app__headerImg"
              />
            </center>
            <Input
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button disabled={!email, !password} type="submit" onClick={signIn}>
              Signin
            </Button>
          </form>
        </div>
      </Modal>
      {/* )} */}
    </div>
  );
}

export default Signin;
