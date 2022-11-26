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
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import axios from 'axios/axios';
const useStyles = makeStyles({
  field: {
    marginBottom: '10px',
  },
});

const CREATE_URL = '/request';
function RequestDialog({ open, handleClose, id, name }) {
  const types = ['Vyšetření', 'Očkování', 'Whatever'];
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [commentary, setCommentary] = useState('');
  const classes = useStyles();

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const send = () => {
    axios
      .post(
        CREATE_URL,
        JSON.stringify({
          // title: title,
          type: type,
          commentary: commentary,
          user_id: localStorage.getItem('userId'),
          animal_id: id,
          author: localStorage.getItem('name'),
          animal_name: name,
        }),
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
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
        <DialogTitle>Nový požadavek pro zvíře {name} </DialogTitle>
        <DialogContent>
          <div>
            <TextField
              className={classes.field}
              autoFocus
              required
              margin="dense"
              id="title"
              label="Název požadavku"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              fullWidth
              variant="outlined"
            />
          </div>
          <TextField
            className={classes.field}
            required
            id="title"
            label="Text požadavku"
            type="text"
            onChange={(e) => setCommentary(e.target.value)}
            value={commentary}
            fullWidth
            variant="outlined"
          ></TextField>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Druh požadavku
            </InputLabel>
            <Select
              fullWidth
              label="Druh požadavku"
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
          <Button size="large" onClick={send}>
            Odeslat
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default RequestDialog;
