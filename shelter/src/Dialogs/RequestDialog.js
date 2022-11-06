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
import React, { useState } from "react";

function RequestDialog({ open, handleClose }) {
  const types = ["Vyšetření", "Očkování", "Whatever"];
  const [type, setType] = useState("");

  const handleChange = (event) => {
    setType(event.target.value);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nový požadavek pro zvíře TODO</DialogTitle>
        <DialogContent>
          <div>
            <TextField
              autoFocus
              required
              margin="dense"
              id="title"
              label="Název požadavku"
              type="text"
              fullWidth
              variant="outlined"
            />
          </div>
          <TextField
            required
            id="title"
            label="Text požadavku"
            type="text"
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
          <Button size="large">Odeslat</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default RequestDialog;

