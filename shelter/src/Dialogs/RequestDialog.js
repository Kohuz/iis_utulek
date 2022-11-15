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
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
const useStyles = makeStyles({
  field: {
    marginBottom: "10px",
  },
});

function RequestDialog({ open, handleClose }) {
  const types = ["Vyšetření", "Očkování", "Whatever"];
  const [type, setType] = useState("");
  const classes = useStyles();

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
              className={classes.field}
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
            className={classes.field}
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
