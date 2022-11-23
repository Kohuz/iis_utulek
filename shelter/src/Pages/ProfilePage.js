import { Button, FormControlLabel, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { validateEmail } from 'Helpers/validateEmail';
import axios from 'axios/axios';
import { useNavigate } from 'react-router-dom';

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

    axios
      .put(
        USR_URL,
        JSON.stringify({
          email: email,
          password: password,
          is_volunteer: true,
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
      <form>
        <div className={classes.form}>
          <Typography variant="h4">Změna hesla</Typography>
          <TextField label="Heslo"></TextField>

          <TextField label="Potvrdit heslo"></TextField>
          <Button variant="outlined"> Potvrdit změnu</Button>
        </div>
      </form>
      <form>
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

          <Button variant="outlined"> Potvrdit změnu</Button>
        </div>
      </form>
    </>
  );
}

export default ProfilePage;
