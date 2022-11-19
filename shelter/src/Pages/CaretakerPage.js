import { Button, Typography, Grid } from "@mui/material";
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
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {animals.map((animal) => (
            <AnimalCard
              openRequest={handleOpenRequest}
              key={animal.id}
              animal={animal}
              from={"care"}
            ></AnimalCard>
          ))}
        </Grid>
        <Grid item xs={6}>
          <Typography>Vypůjčená zvířata</Typography>
          <AnimalCard
            openRequest={handleOpenRequest}
            key={animals[0].id}
            animal={animals[0]}
            from={"care"}
          ></AnimalCard>
        </Grid>
      </Grid>
    </>
  );
}

export default CaretakerPage;
