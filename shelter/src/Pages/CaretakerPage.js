import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import AddAnimal from "Dialogs/AddAnimal";
import AnimalCard from "Components/Cards/AnimalCard";
import RequestDialog from "Dialogs/RequestDialog";

function CaretakerPage() {
  const [openAddAnimal, setOpenAddAnimal] = useState(false);
  //functions for handling the dialog opening
  const handleOpenAddAnimal = () => {
    setOpenAddAnimal(true);
  };

  const handleCloseAddAnimal = () => {
    setOpenAddAnimal(false);
  };
  const [openRequest, setOpenRequest] = useState(false);
  //functions for handling the dialog opening
  const handleOpenRequest = () => {
    setOpenRequest(true);
  };

  const handleCloseRequest = () => {
    setOpenRequest(false);
  };
  const animals = [
    {
      id: 1,
      name: "Alík",
      type: "Pes",
      age: 3,
    },
    {
      id: 2,
      name: "Micinka",
      type: "Kočka",
      age: 5,
    },
    {
      id: 3,
      name: "Žofka",
      type: "Leguán",
      age: 6,
    },
  ];
  return (
    <>
      <AddAnimal open={openAddAnimal} handleClose={handleCloseAddAnimal} />
      <RequestDialog open={openRequest} handleClose={handleCloseRequest} />
      <Button variant="outlined" onClick={handleOpenAddAnimal}>
        Zavést nové zvíře
      </Button>

      {animals.map((animal) => (
        <AnimalCard
          openRequest={handleOpenRequest}
          key={animal.id}
          animal={animal}
          from={"care"}
        ></AnimalCard>
      ))}
    </>
  );
}

export default CaretakerPage;
