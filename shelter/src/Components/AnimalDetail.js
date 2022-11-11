import { Typography } from "@mui/material";
import React from "react";

function AnimalDetail({ animal }) {
  return (
    <>
      <Typography variant="h3">animal.name</Typography>
      <Typography variant="h5">Věk</Typography>
      <Typography>{animal.age}</Typography>
      <Typography variant="h5">Váha</Typography>
      <Typography>{animal.weight}</Typography>
      <Typography variant="h5">Věk</Typography>
      <Typography>{animal.age}</Typography>
      <Typography variant="h5">Stav</Typography>
      <Typography>{animal.state}</Typography>
    </>
  );
}

export default AnimalDetail;
