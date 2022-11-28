import React from 'react';
import { useState, useRef, useEffect, useContext } from 'react';
import { TextField, Button, Typography, Alert } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios/axios';
import authContext from 'Helpers/AuthContext';
import { validateEmail } from 'Helpers/validateEmail';

const useStyles = makeStyles({
  addComponent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '1%',
  },
  alert: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '1%',
  },
  alertDiv: {
    width: '20%',
  },
  log: {
    marginTop: '13px',
  },
});

const REGISTER_URL = '/user/register';

function RegisterPage({ setLogged, logged }) {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const classes = useStyles();
  const userRef = useRef();
  const { setAccessToken, setAuthenticated, setUsername, setRoles } =
    useContext(authContext);

  const [errPass, setErrPass] = useState(false);
  const [errPassLen, setErrPassLen] = useState(false);
  const [errEmail, setErrEmail] = useState(false);
  const [formName, setFormName] = useState('');
  const [formSurname, setFormSurname] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let ret = false;

    if (!validateEmail(formEmail)) {
      setErrEmail(true);
      ret = true;
    }
    if (password != passwordConfirm) {
      setErrPass(true);
      ret = true;
    }
    if (password.length < 6) {
      setErrPassLen(true);
      ret = true;
    }
    if (ret) return;
    axios
      .post(
        REGISTER_URL,
        JSON.stringify({
          name: formName,
          surname: formSurname,
          email: formEmail,
          password: password,
          is_volunteer: true,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          },
        }
      )
      .then((response) => {
        if (response.status == 200) {
          alert('Registrace úspěšná');
          navigate(from, { replace: true });
        } else {
        }
      })
      .catch((response) => {});
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
                value={formSurname}
                id="formusername"
                label="Přijmení"
                type="text"
                variant="outlined"
              ></TextField>
            </div>
            {errEmail ? (
              <div className={classes.alert}>
                <div className={classes.alertDiv}>
                  <Alert variant="outlined" severity="error">
                    Neplatná emailová adresa
                  </Alert>
                </div>
              </div>
            ) : null}
            <div className={classes.addComponent}>
              <TextField
                required
                ref={userRef}
                InputLabelProps={{ style: { fontSize: 20 } }}
                inputProps={{ style: { fontSize: 21 } }}
                onChange={(e) => {
                  setFormEmail(e.target.value);
                  setErrEmail(false);
                }}
                value={formEmail}
                id="formusername"
                label="Email"
                type="text"
                variant="outlined"
              ></TextField>
            </div>
            {errPass ? (
              <div className={classes.alert}>
                <div className={classes.alertDiv}>
                  <Alert variant="outlined" severity="error">
                    Hesla se neshodují
                  </Alert>
                </div>
              </div>
            ) : null}

            {errPassLen ? (
              <div className={classes.alert}>
                <div className={classes.alertDiv}>
                  <Alert variant="outlined" severity="error">
                    Heslo musí být delší než 5 znaků
                  </Alert>
                </div>
              </div>
            ) : null}
            <div className={classes.addComponent}>
              <TextField
                required
                InputLabelProps={{ style: { fontSize: 20 } }}
                inputProps={{ style: { fontSize: 21 } }}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrPass(false);
                  setErrPassLen(false);
                }}
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
                onChange={(e) => {
                  setPasswordConfirm(e.target.value);
                  setErrPass(false);
                }}
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
