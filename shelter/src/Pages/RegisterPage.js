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

const REGISTER_URL = "future login url";

function RegisterPage({ setLogged, logged }) {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const classes = useStyles();
  const userRef = useRef();
  const { setAccessToken, setAuthenticated, setUsername, setRoles } =
    useContext(authContext);

  const [err, setErr] = useState("false");
  const [formName, setFormName] = useState("");
  const [formSurname, setFormSurname] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // try {
    //   const response = await axios.post(
    //     REGISTER_URL,
    //     JSON.stringify({ formUsername, password }),
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         withCredentials: true,
    //       },
    //     }
    //   );
    // } catch (err) {
    //   if (!err?.response) {
    //     setErr("No error message");
    //   }
    //   //TODO: Add ifs for response codes
    // }

    const roles = [1, 2, 3];
    const auth = "true";
    const token = "token";
    setFormName("");
    setFormSurname("");
    setFormEmail("");
    setPassword("");
    setSuccess(true);
    setAuthenticated(auth);
    setRoles(roles);
    setAccessToken(token);
    // setUsername(formUsername);

    // localStorage.setItem("username", formUsername);
    // localStorage.setItem("authenticated", auth);
    // localStorage.setItem("roles", JSON.stringify(roles));
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
              Registrace
            </Typography>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={classes.addComponent}>
              <TextField
                required
                ref={userRef}
                InputLabelProps={{ style: { fontSize: 20 } }}
                inputProps={{ style: { fontSize: 21 } }}
                onChange={(e) => setFormName(e.target.value)}
                value={formName}
                id="formusername"
                label="Jméno"
                type="text"
                variant="outlined"
              ></TextField>
            </div>
            <div className={classes.addComponent}>
              <TextField
                required
                ref={userRef}
                InputLabelProps={{ style: { fontSize: 20 } }}
                inputProps={{ style: { fontSize: 21 } }}
                onChange={(e) => setFormSurname(e.target.value)}
                value={setFormSurname}
                id="formusername"
                label="Přijmení"
                type="text"
                variant="outlined"
              ></TextField>
            </div>
            <div className={classes.addComponent}>
              <TextField
                required
                ref={userRef}
                InputLabelProps={{ style: { fontSize: 20 } }}
                inputProps={{ style: { fontSize: 21 } }}
                onChange={(e) => setFormEmail(e.target.value)}
                value={formEmail}
                id="formusername"
                label="mail"
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
                value={password}
                id="password"
                label="Heslo"
                type="password"
                variant="outlined"
              ></TextField>
            </div>
            <div className={classes.addComponent}>
              <TextField
                required
                InputLabelProps={{ style: { fontSize: 20 } }}
                inputProps={{ style: { fontSize: 21 } }}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                value={passwordConfirm}
                id="password"
                label="Heslo znovu"
                type="password"
                variant="outlined"
              ></TextField>
            </div>
            <div className={classes.addComponent}>
              <Button type="submit" variant="outlined">
                Registrovat se
              </Button>
            </div>
          </form>
        </>
      )}
    </>
  );
}

export default RegisterPage;

