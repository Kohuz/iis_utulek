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
  Select,
} from '@mui/material';
import React, { useState } from 'react';

const CREATE_URL = '/animal';
function AddAnimal({ open, handleClose }) {
  const types = ['Kočka', 'Pes', 'Aligátor'];
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [age, setAge] = useState(0);
  const [commentary, setCommentary] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        CREATE_URL + '?token=' + localStorage.getItem('token'),
        JSON.stringify({
          name: name,
          type: type,
          age: age,
          commentary: commentary,
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
          handleClose();
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
                onChange={(e) => setAge(parseInt(e.target.value))}
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
                onChange={(e) => setCommentary(e.target.value)}
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
          <Button size="large" onClick={handleClose}>
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
