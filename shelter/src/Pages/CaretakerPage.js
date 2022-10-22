import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import AddAnimal from "Dialogs/AddAnimal";

function CaretakerPage() {
  const [open, setOpen] = useState(false);
  //functions for handling the dialog opening
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <AddAnimal open={open} handleClose={handleClose} />
      <Button variant="outlined" onClick={handleOpen}>
        Zavést nové zvíře
      </Button>

      <Typography>Zvíře 1</Typography>
      <Typography>Zvíře 2</Typography>
      <Typography>Zvíře 3</Typography>
    </>
  );
}

export default CaretakerPage;
