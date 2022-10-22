import { TextField, FormControlLabel } from "@mui/material";
import React from "react";

function Address() {
  return (
    <>
      <FormControlLabel
        control={<TextField></TextField>}
        labelPlacement="top"
        label="Ulice"
      />
      <FormControlLabel
        control={<TextField></TextField>}
        labelPlacement="top"
        label="Číslo popisné"
      />
      <FormControlLabel
        control={<TextField type="password"></TextField>}
        labelPlacement="top"
        label="Město"
      />
      <FormControlLabel
        control={<TextField type="password"></TextField>}
        labelPlacement="top"
        label="PSČ"
      />
    </>
  );
}

export default Address;
