import React, { useState, useEffect } from 'react';
import AnimalCard from 'Components/Cards/AnimalCard';
import RequestCard from 'Components/Cards/RequestCard';
import axios from 'axios/axios';
import { Grid, Select, MenuItem } from '@mui/material';
import { animalTypeswithAll } from 'Helpers/AnimalTypesAll';

const ANIMALS_URL = '/animal';
const REQUEST_URL = '/request';

function VeterinarianPage() {
  const [animals, setAnimals] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = () => {
    axios
      .get(ANIMALS_URL, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
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

  useEffect(fetchData, []);
  const [requests, setRequests] = useState([]);

  const fetchRequests = () => {
    axios
      .get(REQUEST_URL, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((response) => {
        console.log(response);
        setRequests(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  };

  useEffect(fetchRequests, []);
  const types = animalTypeswithAll;
  const [type, setType] = useState('Všechny');
  return (
    <>
      <h3>Požadavky</h3>
      {requests
        .filter((request) => request.state == 'pending')
        .map((request) => (
          <RequestCard
            request={request}
            requests={requests}
            setRequests={setRequests}
            fetchRequests={fetchRequests}
          ></RequestCard>
        ))}
      <h3>Zvířata</h3>
      <Select
        sx={{ minWidth: '400px' }}
        label="Druh Zvířete"
        id="type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        {types.map((type) => (
          <MenuItem value={type}>{type}</MenuItem>
        ))}
      </Select>
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
            <Grid item xs={6} md={4} lg={2}>
              <AnimalCard
                key={animal.id}
                animal={animal}
                animals={animals}
                setAnimals={setAnimals}
                from={'veterinarian'}
              />
            </Grid>
          ))}
      </Grid>
    </>
  );
}

export default VeterinarianPage;
