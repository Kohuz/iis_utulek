import AnimalCard from 'Components/Cards/AnimalCard';
import React, { useState, useEffect } from 'react';
import axios from 'axios/axios';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

const ANIMALS_URL = '/animal';

const useStyles = makeStyles({
  cont: {
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '1%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
function AnimalsPage() {
  const classes = useStyles();
  const [animals, setAnimals] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = () => {
    axios
      .get(ANIMALS_URL + '?token=' + localStorage.getItem('token'))
      .then((response) => {
        console.log(response);
        setAnimals(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  };

  useEffect(fetchData, []);
  return (
    <div className={classes.cont}>
      <Grid container spacing={3}>
        {animals.map((animal) => (
          <Grid item xs={12} md={6} lg={4}>
            <AnimalCard
              key={animal.id}
              animal={animal}
              fetchData={fetchData}
              from={'animals'}
            ></AnimalCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default AnimalsPage;
