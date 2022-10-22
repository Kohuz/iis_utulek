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
} from "@mui/material";
import React from "react";

function AddAnimal({ open, handleClose }) {
  const types = ["Kočka", "Pes", "Aligátor"];
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nový příspěvek</DialogTitle>
        <DialogContent>
          <div>
            <TextField
              autoFocus
              required
              margin="dense"
              id="title"
              label="Jméno"
              type="text"
              fullWidth
              variant="outlined"
            />
          </div>
          <TextField
            required
            id="title"
            label="Url fotky"
            type="text"
            fullWidth
            variant="outlined"
          ></TextField>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Druh zvířete</InputLabel>
            <Select fullWidth label="Druh zvířete">
              {types.map((type) => (
                <MenuItem>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            required
            id="title"
            label="Věk"
            type="number"
            fullWidth
            variant="outlined"
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button size="large" onClick={handleClose}>
            Zrušit
          </Button>
          <Button size="large">Přidat</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddAnimal;
