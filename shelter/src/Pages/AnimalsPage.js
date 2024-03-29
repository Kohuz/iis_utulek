import AnimalCard from 'Components/Cards/AnimalCard';
import React, { useState, useEffect } from 'react';
import axios from 'axios/axios';
import { Grid, Select, MenuItem } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { animalTypes } from 'Helpers/AnimalTypes';
import { animalTypeswithAll } from 'Helpers/AnimalTypesAll';

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
      .get(ANIMALS_URL, {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      })
      .then((response) => {
        console.log(response);
        setAnimals(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const types = animalTypeswithAll;
  const [type, setType] = useState('Všechny');
  useEffect(fetchData, []);
  return (
    <>
      <Select
        sx={{ minWidth: '400px', marginTop: '15px' }}
        label="Druh Zvířete"
        id="type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        {types.map((type) => (
          <MenuItem value={type}>{type}</MenuItem>
        ))}
      </Select>
      <div className={classes.cont}>
        <Grid container spacing={3}>
          {animals
            .filter((animal) => {
              if (type == 'Všechny') {
                return animal;
              } else if (animal.type == type) {
                return animal;
              }
            })
            .map((animal) => (
              <Grid item xs={12} md={6} lg={4}>
                <AnimalCard
                  key={animal.animal_id}
                  animal={animal}
                  fetchData={fetchData}
                  animals={animals}
                  setAnimals={setAnimals}
                  from={'animals'}
                ></AnimalCard>
              </Grid>
            ))}
        </Grid>
      </div>
    </>
  );
}

export default AnimalsPage;
