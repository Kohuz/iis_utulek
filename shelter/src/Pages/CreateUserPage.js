import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Button,
  MenuItem,
  Divider,
  FormGroup,
  TextField,
  Typography,
  Alert,
  Grid,
} from '@mui/material';
import axios from 'axios/axios';
import { makeStyles } from '@mui/styles';
import Address from 'Components/Address';
import CreateInfo from 'Components/CreateInfo';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  form: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginTop: '3%',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '25%',
    marginRight: '25%',
    flexDirection: 'column',
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
});
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
const REGISTER_URL = '/user/register';
function CreateUserPage() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [vet, setVet] = useState(false);
  const [care, setCare] = useState(false);
  const [errPass, setErrPass] = useState(false);
  const [errEmail, setErrEmail] = useState(false);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bankAccount, setbankAccount] = useState('');
  const [address, setAddress] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const submitForm = () => {
    if (!validateEmail(email)) {
      setErrEmail(true);
      return;
    }
    if (password != passwordConfirm) {
      setErrPass(true);
      return;
    }
    axios
      .post(
        REGISTER_URL,
        JSON.stringify({
          name: name,
          surname: surname,
          email: email,
          password: password,
          is_volunteer: true,
          is_caretaker: care,
          is_veterinarian: vet,
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
    <div className={classes.container}>
      <Typography gutterBottom variant="h3">
        Vytvořit nového uživatele
      </Typography>
      <Divider variant="middle" />
      <FormGroup>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControlLabel
              control={
                <TextField
                  required
                  InputLabelProps={{ style: { fontSize: 20 } }}
                  inputProps={{ style: { fontSize: 21 } }}
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  id="name"
                  label="Jméno"
                  type="text"
                  variant="outlined"
                ></TextField>
              }
              labelPlacement="top"
              label="Jméno"
            />

            <FormControlLabel
              control={
                <TextField
                  required
                  InputLabelProps={{ style: { fontSize: 20 } }}
                  inputProps={{ style: { fontSize: 21 } }}
                  onChange={(e) => setSurname(e.target.value)}
                  value={surname}
                  id="surname"
                  label="Přijmení"
                  type="text"
                  variant="outlined"
                ></TextField>
              }
              labelPlacement="top"
              label="Přijmení"
            />
            {errEmail ? (
              <Alert variant="outlined" severity="error">
                Nevalidní email
              </Alert>
            ) : null}
            <FormControlLabel
              control={
                <TextField
                  required
                  InputLabelProps={{ style: { fontSize: 20 } }}
                  inputProps={{ style: { fontSize: 21 } }}
                  onChange={(e) => {
                    setErrEmail(false);
                    setEmail(e.target.value);
                  }}
                  value={email}
                  id="email"
                  label="Email"
                  type="text"
                  variant="outlined"
                ></TextField>
              }
              labelPlacement="top"
              label="Email"
            />
            {errPass ? (
              <Alert variant="outlined" severity="error">
                Hesla se neshodují
              </Alert>
            ) : null}
            <FormControlLabel
              control={
                <TextField
                  required
                  InputLabelProps={{ style: { fontSize: 20 } }}
                  inputProps={{ style: { fontSize: 21 } }}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  id="password"
                  label="Heslo"
                  type="text"
                  variant="outlined"
                ></TextField>
              }
              labelPlacement="top"
              label="Heslo"
            />
            <FormControlLabel
              control={
                <TextField
                  required
                  InputLabelProps={{ style: { fontSize: 20 } }}
                  inputProps={{ style: { fontSize: 21 } }}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  value={passwordConfirm}
                  id="password"
                  label="Heslo znovu"
                  type="text"
                  variant="outlined"
                ></TextField>
              }
              labelPlacement="top"
              label="Heslo znovu"
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h4">Role</Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    checked={vet}
                    onChange={() => setVet(!vet)}
                  />
                }
                label="Veterinář"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={care} onChange={() => setCare(!care)} />
                }
                label="Pečovatel"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={4}>
            {care ? (
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
                  ></TextField>
                }
                labelPlacement="top"
                label="Bankovní účet"
              />
            ) : null}
            {vet ? (
              <FormControlLabel
                control={
                  <TextField
                    sx={{ minWidth: '400px' }}
                    InputLabelProps={{ style: { fontSize: 20 } }}
                    inputProps={{ style: { fontSize: 21 } }}
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    id="address"
                    label="Adresa"
                    type="text"
                  ></TextField>
                }
                labelPlacement="top"
                label="Adresa"
              />
            ) : null}
          </Grid>
        </Grid>
      </FormGroup>
      <Button
        disabled={!care && !vet}
        variant="outlined"
        onClick={() => submitForm()}
      >
        Vytvořit
      </Button>
    </div>
  );
}

export default CreateUserPage;
