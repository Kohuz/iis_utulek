import { Button, Typography, Grid, Box, Tabs, Tab } from "@mui/material";
import { makeStyles } from "@mui/styles";
import WalkCard from "Components/Cards/WalkCard";
import Schedule from "Components/Schedule";
import React, { useState } from "react";

const walks = [
  {
    id: 1,
    animal: "Žofka",
    date: "2022-11-13",
  },
  {
    id: 2,
    animal: "Alík",
    date: "2022-11-13",
  },
  {
    id: 3,
    animal: "Žofka",
    date: "2022-12-15",
  },
];
const useStyles = makeStyles({
  tabBox: {
    alignItems: "center",
    justifyContent: "center",
  },
});
function WalksPage() {
  const classes = useStyles();
  const [filter, setFilter] = useState(0);

  const handleChange = (event, newValue) => {
    setFilter(newValue);
  };
  let q = new Date();
  let m = q.getMonth();
  let d = q.getDay();
  let y = q.getFullYear();

  let date = new Date(y, m, d);
  return (
    <>
      <Grid className={classes.tabBox} container>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={filter} onChange={handleChange}>
            <Tab label="Nadcházející" value={0} />
            <Tab label="Proběhlé" value={1} />
          </Tabs>
        </Box>
      </Grid>
      {walks
        .filter((walk) =>
          filter ? new Date(walk.date) > date : new Date(walk.date) < date
        )
        .map((walk) => (
          <WalkCard walk={walk} />
        ))}
    </>
  );
}

export default WalksPage;
