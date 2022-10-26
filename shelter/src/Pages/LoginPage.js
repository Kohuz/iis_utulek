import React from "react";
import { useState, useRef, useEffect, useContext } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios/axios";
import authContext from "Helpers/AuthContext";

const useStyles = makeStyles({
  addComponent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "1%",
  },
  log: {
    marginTop: "13px",
  },
});

const LOGIN_URL = "future login url";

function LoginPage({ setLogged, logged }) {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const classes = useStyles();
  const userRef = useRef();
  const { setAccessToken, setAuthenticated, setUsername, setRoles } =
    useContext(authContext);

  const [err, setErr] = useState("false");
  const [formUsername, setFormUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ formUsername, password }),
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }
      );
    } catch (err) {
      if (!err?.response) {
        setErr("No error message");
      }
      //TODO: Add ifs for response codes
    }

    const roles = [1, 2, 3];
    const auth = "true";
    const token = "token";
    setFormUsername("");
    setPassword("");
    setSuccess(true);
    setAuthenticated(auth);
    setRoles(roles);
    setAccessToken(token);
    setUsername(formUsername);

    localStorage.setItem("username", formUsername);
    localStorage.setItem("authenticated", auth);
    localStorage.setItem("roles", JSON.stringify(roles));
    localStorage.setItem("token", token);

    navigate(from, { replace: true });
  };

  return (
    <>
      {success ? (
        <h1>successs</h1>
      ) : (
        <>
          <div className={classes.log}>
            <Typography variant="h5" align="center">
              Přihlášení
            </Typography>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={classes.addComponent}>
              <TextField
                required
                ref={userRef}
                InputLabelProps={{ style: { fontSize: 20 } }}
                inputProps={{ style: { fontSize: 21 } }}
                onChange={(e) => setFormUsername(e.target.value)}
                value={formUsername}
                id="formusername"
                label="Přihlašovací jméno"
                type="text"
                variant="outlined"
              ></TextField>
            </div>
            <div className={classes.addComponent}>
              <TextField
                required
                InputLabelProps={{ style: { fontSize: 20 } }}
                inputProps={{ style: { fontSize: 21 } }}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                label="Heslo"
                type="password"
                variant="outlined"
              ></TextField>
            </div>
            <div className={classes.addComponent}>
              <Button type="submit" variant="outlined">
                Přihlásit se
              </Button>
            </div>
          </form>
        </>
      )}
    </>
  );
}

export default LoginPage;
