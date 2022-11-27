import axios from 'axios/axios';
import {
  DialogContent,
  TextField,
  Dialog,
  DialogTitle,
  FormControlLabel,
  DialogActions,
  Button,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Alert,
  Select,
} from '@mui/material';
import React, { useState } from 'react';
import { animalTypes } from 'Helpers/AnimalTypes';

const CREATE_URL = '/animal';
function AddAnimal({ open, handleClose }) {
  const types = animalTypes;
  const [name, setName] = useState('');
  const [type, setType] = useState('Pes');
  const [age, setAge] = useState(0);
  const [ageErr, setAgeErr] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [commentary, setCommentary] = useState('');

  const handleSubmit = (e) => {
    if (age < 0 || age > 80) {
      setAgeErr(true);
      return;
    }
    if (name == '' || commentary == '') {
      setEmpty(true);
      return;
    }
    e.preventDefault();
    handleClose();
    axios
      .post(
        CREATE_URL,
        JSON.stringify({
          name: name,
          type: type,
          age: age,
          commentary: commentary,
        }),
        {
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
      .then((response) => {
        if (response.status == 200) {
          handleClose();
          setName('');
          setCommentary('');
          alert('Zvíře úspěšně uloženo');
        } else {
        }
      })
      .catch((response) => {});
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nový příspěvek</DialogTitle>
        <DialogContent>
          {empty ? (
            <div>
              <Alert variant="outlined" severity="error">
                Vyplňte všechna pole
              </Alert>
            </div>
          ) : null}
          <FormControlLabel
            control={
              <TextField
                required
                InputLabelProps={{ style: { fontSize: 20 } }}
                inputProps={{ style: { fontSize: 21 } }}
                onChange={(e) => {
                  setName(e.target.value);
                  setEmpty(false);
                }}
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
          {ageErr ? (
            <div>
              <Alert variant="outlined" severity="error">
                Věk musí být mezi 0 - 80 roky
              </Alert>
            </div>
          ) : null}

          <FormControlLabel
            control={
              <TextField
                required
                InputLabelProps={{ style: { fontSize: 20 } }}
                inputProps={{ style: { fontSize: 21 } }}
                onChange={(e) => {
                  setAge(parseInt(e.target.value));
                  setAgeErr(false);
                }}
                value={age}
                id="age"
                label="Věk"
                type="number"
                variant="outlined"
              ></TextField>
            }
            labelPlacement="top"
            label="Věk"
          />
          <FormControlLabel
            control={
              <TextField
                required
                InputLabelProps={{ style: { fontSize: 20 } }}
                inputProps={{ style: { fontSize: 21 } }}
                onChange={(e) => {
                  setCommentary(e.target.value);
                  setEmpty(false);
                }}
                value={commentary}
                id="commentary"
                label="Komentář"
                type="text"
                variant="outlined"
              ></TextField>
            }
            labelPlacement="top"
            label="Komentář"
          />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Druh Zvířete</InputLabel>
            <Select
              fullWidth
              label="Druh Zvířete"
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              {types.map((type) => (
                <MenuItem value={type}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            size="large"
            onClick={() => {
              handleClose();
              setName('');
              setCommentary('');
            }}
          >
            Zrušit
          </Button>
          <Button size="large" onClick={handleSubmit}>
            Přidat
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddAnimal;
