import { Button, Typography } from "@mui/material";
import WalkCard from "Components/Cards/WalkCard";
import Schedule from "Components/Schedule";
import React, { useState } from "react";

const walks = [
  {
    id: 1,
    animal: "Žofka",
    date: "13/11/2022",
  },
  {
    id: 2,
    animal: "Alík",
    date: "13/12/2022",
  },
  {
    id: 3,
    animal: "Žofka",
    date: "15/11/2022",
  },
];
function WalksPage() {
  return (
    <>
      {walks.map((walk) => (
        <WalkCard walk={walk} />
      ))}
    </>
  );
}

export default WalksPage;
