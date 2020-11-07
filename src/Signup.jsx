import React, { useState } from "react";
import { makeStyles, Modal, Input, Button } from "@material-ui/core";
import { auth } from "./firebase";
// import {motion} from "framer-motion"

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

function Signup({ open, setOpen, user, setUser }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();

  const [modalStyle] = useState(getModalStyle);

  // FOR SIGNUP
  const signUp = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
    setOpen(false);
    setUsername("");
    setEmail("");
    setPassword("");
  };
  const signupVariants = {
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
      {open && (
        <Modal open={open} onClose={() => setOpen(false)}>
          {/* <motion.div
            variants={signupVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={modalStyle}
            className={classes.paper}
          > */}
          <div style={modalStyle}
            className={classes.paper}>
            <form className="app__signup">
              <center>
                <img
                  src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                  alt="Instagram"
                  className="app__headerImg"
                />
              </center>
              <Input
                placeholder="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
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
              <Button disabled={!username, !email, !password} type="submit" onClick={signUp}>
                SignUp
              </Button>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Signup;
