import React from 'react';
import { useState, useRef, useEffect, useContext } from 'react';
import { TextField, Button, Typography, Alert } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios/axios';
import authContext from 'Helpers/AuthContext';

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

const LOGIN_URL = '/user/login';

function LoginPage({ setLogged, logged }) {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const classes = useStyles();
  const userRef = useRef();
  const { setAccessToken, setAuthenticated, setUsername, setRoles } =
    useContext(authContext);

  const [err, setErr] = useState(false);
  const [formUsername, setFormUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(LOGIN_URL, JSON.stringify({ email: formUsername, password }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((response) => {
        if (response.status == 200) {
          //TODO roles
          const roles = response.data.roles;
          const auth = 'true';
          const token = response.data.token;
          setFormUsername('');
          setPassword('');
          setSuccess(true);
          setAuthenticated(auth);
          setRoles(roles);
          setAccessToken(token);
          setUsername(formUsername);

          localStorage.setItem('username', formUsername);
          localStorage.setItem('authenticated', auth);
          localStorage.setItem('roles', JSON.stringify(roles));
          localStorage.setItem('token', token);
          localStorage.setItem('userId', response.data.user_data.user_id);
          localStorage.setItem('name', response.data.user_data.name);

          navigate(from, { replace: true });
        } else {
          setErr(true);
        }
      })
      .catch((response) => {
        setErr(true);
      });
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
          {err ? (
            <div className={classes.alert}>
              <div className={classes.alertDiv}>
                <Alert variant="outlined" severity="error">
                  Špatné jméno nebo heslo
                </Alert>
              </div>
            </div>
          ) : null}
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
