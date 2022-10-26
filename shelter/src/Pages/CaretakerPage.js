import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import AddAnimal from "Dialogs/AddAnimal";
import AnimalCard from "Components/AnimalCard";

function CaretakerPage() {
  const [open, setOpen] = useState(false);
  //functions for handling the dialog opening
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const animals = [
    {
      name: "Alík",
      type: "Pes",
      age: 3,
    },
    {
      name: "Micinka",
      type: "Kočka",
      age: 5,
    },
    {
      name: "Žofka",
      type: "Leguán",
      age: 6,
    },
  ];
  return (
    <>
      <AddAnimal open={open} handleClose={handleClose} />
      <Button variant="outlined" onClick={handleOpen}>
        Zavést nové zvíře
      </Button>

      {animals.map((animal) => (
        <AnimalCard
          name={animal.name}
          type={animal.type}
          age={animal.age}
          from={"care"}
        ></AnimalCard>
      ))}
    </>
  );
}

export default CaretakerPage;
