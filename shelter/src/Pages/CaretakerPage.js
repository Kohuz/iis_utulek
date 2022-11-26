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
  const [openRequest, setOpenRequest] = useState(false);
  //functions for handling the dialog opening
  const handleOpenRequest = () => {
    setOpenRequest(true);
  };

  const handleCloseRequest = () => {
    setOpenRequest(false);
  };
  const [animals, setAnimals] = useState([]);
  const [requests, setRequests] = useState([]);
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

  const fetchRequests = () => {
    axios
      .get('/request/' + localStorage.getItem('userId'), {
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
  const remove = (id) => {
    const newRequests = requests.filter((request) => id !== request.request_id);
    setRequests(newRequests);
    axios
      .delete('request/' + id, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
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
                openRequest={handleOpenRequest}
                key={animal.animal_id}
                animal={animal}
                animals={animals}
                setAnimals={setAnimals}
                fetchData={fetchData}
                from={'care'}
              ></AnimalCard>
              <RequestDialog
                open={openRequest}
                id={animal.animal_id}
                name={animal.name}
                handleClose={handleCloseRequest}
              />
            </>
          ))}
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5">Zamítnuté žádosti</Typography>
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
        </Grid>
      </Grid>
    </>
  );
}

export default CaretakerPage;
