import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';
import React, { useContext } from 'react';
import authContext from 'Helpers/AuthContext';
import dog from '../../dog.png';

import { rolesDict, checkRoles } from '../../Helpers/Roles';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios/axios';

const DELETE_URL = '/animal';
function AnimalCard({
  animal,
  from,
  fetchData,
  openRequest,
  animals,
  setAnimals,
}) {
  const { authenticated, roles } = useContext(authContext);
  const navigate = useNavigate();
  const handleDelete = (id) => {
    const newAnimals = animals.filter((animal) => id !== animal.animal_id);
    setAnimals(newAnimals);
    axios
      .delete(DELETE_URL + '/' + id, {
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
    <Card sx={{ maxWidth: 700 }}>
      <CardMedia component="img" height="100" image={dog} alt="exampleDog" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {animal.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {animal.type}, {animal.age} roky
        </Typography>
      </CardContent>
      <CardActions>
        {authenticated && from == 'animals' ? (
          <Button
            size="small"
            onClick={() => navigate('/animals/' + animal.animal_id)}
          >
            Vyvenčit
          </Button>
        ) : null}
        {from == 'care' ? (
          <Button size="small" onClick={() => openRequest(animal.animal_id)}>
            Vytvořit požadavek na veterináře
          </Button>
        ) : null}
        {from === 'care' ? (
          <Button
            size="small"
            onClick={() => navigate('/caretaker/' + animal.animal_id)}
          >
            Vytvořit rozvrh venčení
            <Link to={'/caretaker/' + animal.animal_id} state={animal} />
          </Button>
        ) : null}
        {from === 'veterinarian' ? (
          <Button
            size="small"
            onClick={() => navigate('/veteranian/' + animal.animal_id)}
          >
            Editovat zdravotní záznam
          </Button>
        ) : null}
        {from === 'veterinarian' ? (
          <Button
            size="small"
            onClick={() => navigate('/veteranian/event/' + animals.animal_id)}
          >
            Vytvořit událost pro zvíře
          </Button>
        ) : null}

        {from === 'veterinarian' || from === 'care' ? (
          <Button
            size="small"
            onClick={() => {
              handleDelete(animal.animal_id);
            }}
          >
            Smazat zvíře
          </Button>
        ) : null}
      </CardActions>
    </Card>
  );
}

export default AnimalCard;
