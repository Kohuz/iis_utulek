import AnimalCard from "Components/Cards/AnimalCard";
import React from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  cont: {
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: "1%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
function AnimalsPage() {
  const classes = useStyles();
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
    <div className={classes.cont}>
      <Grid container spacing={3}>
        {animals.map((animal) => (
          <Grid item xs={12} md={6} lg={4}>
            <AnimalCard
              key={animal.id}
              animal={animal}
              from={"animals"}
            ></AnimalCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default AnimalsPage;
