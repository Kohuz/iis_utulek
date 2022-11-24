import { Button, FormControlLabel, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useContext, useState } from 'react';
import { validateEmail } from 'Helpers/validateEmail';
import axios from 'axios/axios';
import { useNavigate } from 'react-router-dom';
import authContext from 'Helpers/AuthContext';

const useStyles = makeStyles({
  form: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginTop: '1%',
  },
  log: {
    marginTop: '13px',
  },
});

const USR_URL = '/user/';
function ProfilePage() {
  const { roles } = useContext(authContext);
  const navigate = useNavigate();
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [bankAccount, setbankAccount] = useState('');
  const [address, setAddress] = useState('');
  const [errPass, setErrPass] = useState(false);
  const [errEmail, setErrEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const handleSubmit = () => {
    if (!validateEmail(email)) {
      setErrEmail(true);
      return;
    }
    if (password != passwordConfirm) {
      setErrPass(true);
      return;
    }

    let updateObject = {};
    if (email != '') {
      updateObject.email = email;
    }
    if (password != '') {
      updateObject.password = password;
    }
    if (address != '') {
      updateObject.address = address;
    }
    if (bankAccount != '') {
      updateObject.bankAccount = bankAccount;
    }
    axios
      .put(
        USR_URL + '?token=' + localStorage.getItem('token'),
        JSON.stringify({
          updateObject,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
      .then((response) => {
        if (response.status == 200) {
          navigate('/');
        } else {
        }
      })
      .catch((response) => {});
  };
  return (
    <>
      <div className={classes.form}>
        <Typography variant="h4">Změna hesla</Typography>
        <FormControlLabel
          control={
            <TextField
              autoComplete="off"
              InputLabelProps={{ style: { fontSize: 20 } }}
              inputProps={{ style: { fontSize: 21 } }}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              id="password"
              label="Heslo"
              type="password"
              variant="outlined"
            ></TextField>
          }
          labelPlacement="top"
          label="Heslo"
        />

        <FormControlLabel
          control={
            <TextField
              InputLabelProps={{ style: { fontSize: 20 } }}
              inputProps={{ style: { fontSize: 21 } }}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              value={setPasswordConfirm}
              id="passwordConfirm"
              label="Heslo znovu"
              type="password"
              variant="outlined"
            ></TextField>
          }
          labelPlacement="top"
          label="Heslo znovu  "
        />
      </div>

      <div className={classes.form}>
        <Typography variant="h4">Změna dalších údajů</Typography>
        <FormControlLabel
          control={
            <TextField
              InputLabelProps={{ style: { fontSize: 20 } }}
              inputProps={{ style: { fontSize: 21 } }}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              id="email"
              label="Email"
              type="email"
              variant="outlined"
            ></TextField>
          }
          labelPlacement="top"
          label="Email"
        />
        {roles.includes(3) ? (
          <FormControlLabel
            control={
              <TextField
                InputLabelProps={{ style: { fontSize: 20 } }}
                inputProps={{ style: { fontSize: 21 } }}
                onChange={(e) => setbankAccount(e.target.value)}
                value={bankAccount}
                id="bankAccount"
                label="Bankovní účet"
                type="text"
                variant="outlined"
              ></TextField>
            }
            labelPlacement="top"
            label="Bankovní účet"
          />
        ) : null}
        {roles.includes(2) || roles.includes(3) ? (
          <FormControlLabel
            control={
              <TextField
                InputLabelProps={{ style: { fontSize: 20 } }}
                inputProps={{ style: { fontSize: 21 } }}
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                id="address"
                label="Adresa"
                type="text"
                variant="outlined"
              ></TextField>
            }
            labelPlacement="top"
            label="Adresa"
          />
        ) : null}

        <Button
          disabled={
            password == '' && email == '' && bankAccount == '' && address == ''
          }
          variant="outlined"
          onClick={() => handleSubmit()}
        >
          Potvrdit změnu
        </Button>
      </div>
    </>
  );
}

export default ProfilePage;
