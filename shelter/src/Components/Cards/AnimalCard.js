import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import authContext from 'Helpers/AuthContext';
import dog from '../../dog.png';
import cat from '../../cat.png';
import aligator from '../../aligator.png';
import hamster from '../../hamster.png';
import bunny from '../../bunny.png';
import leguan from '../../leguan.png';
import parrot from '../../parrot.png';
import { rolesDict, checkRoles } from '../../Helpers/Roles';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios/axios';
import RequestDialog from 'Dialogs/RequestDialog';

const DELETE_URL = '/animal';
function AnimalCard({ animal, from, fetchData, animals, setAnimals }) {
  const [openRequest, setOpenRequest] = useState(false);
  const handleOpenRequest = () => {
    setOpenRequest(true);
  };

  const handleCloseRequest = () => {
    setOpenRequest(false);
  };
  const { authenticated, roles } = useContext(authContext);
  const navigate = useNavigate();
  const handleDelete = (id) => {
    const newAnimals = animals.filter((animal) => id !== animal.animal_id);
    setAnimals(newAnimals);
    axios
      .delete(DELETE_URL + '/' + id, {
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
      <RequestDialog
        key={animal.animal_id}
        open={openRequest}
        id={animal.animal_id}
        name={animal.name}
        handleClose={handleCloseRequest}
      />
      <Card sx={{ maxWidth: 700 }}>
        {animal.type == 'Pes' ? (
          <CardMedia>
            <img src={dog} width="245"></img>
          </CardMedia>
        ) : null}
        {animal.type == 'Kočka' ? (
          <CardMedia>
            <img src={cat} width="245"></img>
          </CardMedia>
        ) : null}
        {animal.type == 'Aligátor' ? (
          <CardMedia>
            <img src={aligator} width="245"></img>
          </CardMedia>
        ) : null}
        {animal.type == 'Křeček' ? (
          <CardMedia>
            <img src={hamster} width="245"></img>
          </CardMedia>
        ) : null}
        {animal.type == 'Králík' ? (
          <CardMedia>
            <img src={bunny} width="245"></img>
          </CardMedia>
        ) : null}
        {animal.type == 'Papoušek' ? (
          <CardMedia>
            <img src={parrot} width="245"></img>
          </CardMedia>
        ) : null}
        {animal.type == 'Leguán' ? (
          <CardMedia>
            <img src={leguan} width="245"></img>
          </CardMedia>
        ) : null}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {animal.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {animal.type}, {animal.age} {animal.age == 1 ? 'rok' : null}
            {animal.age == 2 || animal.age == 3 || animal.age == 4
              ? 'roky'
              : null}
            {animal.age > 4 ? 'let' : null}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Popis: {animal.commentary}
          </Typography>
        </CardContent>
        <CardActions>
          {sessionStorage.getItem('verified') == 'false' ? (
            <Typography>Nemůžete venčit, ještě jste nebyl ověřen</Typography>
          ) : null}
          {authenticated &&
          from == 'animals' &&
          sessionStorage.getItem('verified') == 'true' ? (
            <Button
              size="small"
              onClick={() => navigate('/animals/' + animal.animal_id)}
            >
              Vyvenčit
            </Button>
          ) : null}
          {from == 'care' ? (
            <Button size="small" onClick={() => handleOpenRequest()}>
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
              Zobrazit zdravotní záznam
            </Button>
          ) : null}
          {from === 'veterinarian' ? (
            <Button
              size="small"
              onClick={() => navigate('/veteranian/event/' + animal.animal_id)}
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
    </>
  );
}

export default AnimalCard;
