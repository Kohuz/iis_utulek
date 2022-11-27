import { Button, Typography, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddAnimal from 'Dialogs/AddAnimal';
import AnimalCard from 'Components/Cards/AnimalCard';
import RequestDialog from 'Dialogs/RequestDialog';
import axios from 'axios/axios';

const ANIMALS_URL = '/animal';

function CaretakerPage() {
  const [openAddAnimal, setOpenAddAnimal] = useState(false);
  //functions for handling the dialog opening
  const handleOpenAddAnimal = () => {
    setOpenAddAnimal(true);
  };

  const handleCloseAddAnimal = () => {
    setOpenAddAnimal(false);
    fetchData();
  };

  const [animals, setAnimals] = useState([]);
  const [requests, setRequests] = useState([]);
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

  useEffect(fetchData, []);
  const [borrowed, setBorrowed] = useState([]);

  const fetchBorrowed = () => {
    axios
      .get(ANIMALS_URL + '/borrowed', {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      })
      .then((response) => {
        console.log(response);
        setBorrowed(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  };

  useEffect(fetchBorrowed, []);

  const fetchRequests = () => {
    axios
      .get('/request/' + sessionStorage.getItem('userId'), {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
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
  const remove = (id) => {
    const newRequests = requests.filter((request) => id !== request.request_id);
    setRequests(newRequests);
    axios
      .delete('request/' + id, {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      })
      .then((response) => {
        if (response.status == 200) {
          fetchData();
        }
      })
      .catch(() => fetchData());
  };

  return (
    <>
      {/*TODO: CONTINUE HERE*/}
      <AddAnimal open={openAddAnimal} handleClose={handleCloseAddAnimal} />
      {/* <RequestDialog open={openRequest} handleClose={handleCloseRequest} /> */}
      <Button variant="outlined" onClick={handleOpenAddAnimal}>
        Zavést nové zvíře
      </Button>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {animals.map((animal) => (
            <>
              <AnimalCard
                key={animal.animal_id}
                animal={animal}
                animals={animals}
                setAnimals={setAnimals}
                fetchData={fetchData}
                from={'care'}
              ></AnimalCard>
            </>
          ))}
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h4">Zamítnuté žádosti:</Typography>
          <br></br>
          {requests.filter((request) => request.state == 'rejected').length ==
          0 ? (
            <Typography color="success" variant="h6">
              Žádné zamítnuté žádosti
            </Typography>
          ) : null}
          {requests
            .filter((request) => request.state == 'rejected')
            .map((request) => (
              <>
                <Typography>Žádost na zvíře {request.animal_name}</Typography>
                <Button onClick={() => remove(request.request_id)}>
                  Odstranit žádost
                </Button>
              </>
            ))}
          <Typography variant="h4">Zapůjčená zvířata: </Typography>
          <br></br>
          {borrowed.length == 0 ? (
            <Typography color="success" variant="h6">
              Žádná zapůjčená zvířata
            </Typography>
          ) : null}
          {borrowed.map((animal) => (
            <>
              <p>{animal.name}</p>
            </>
          ))}
        </Grid>
      </Grid>
    </>
  );
}

export default CaretakerPage;
