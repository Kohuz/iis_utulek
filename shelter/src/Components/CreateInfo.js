import { TextField, FormControlLabel } from "@mui/material";
import React from "react";

function CreateInfo() {
  return (
    <>
      <FormControlLabel
        control={<TextField></TextField>}
        labelPlacement="top"
        label="Jméno"
      />
      <FormControlLabel
        control={<TextField></TextField>}
        labelPlacement="top"
        label="Přijmení"
      />
      <FormControlLabel
        control={<TextField type="password"></TextField>}
        labelPlacement="top"
        label="Heslo"
      />
    </>
  );
}

export default CreateInfo;
