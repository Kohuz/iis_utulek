import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardHeader,
  Avatar,
} from '@mui/material';
import React, { useContext } from 'react';
import axios from 'axios/axios';
import authContext from 'Helpers/AuthContext';
import { deepOrange } from '@mui/material/colors';
import dog from '../../dog.png';

const USER_URL = '/user';
function VolunteerCard({
  id,
  name,
  surname,
  birthDate,
  verified,
  users,
  setUsers,
  fetchData,
}) {
  const { authenticated, roles } = useContext(authContext);

  const verify = (id) => {
    axios
      .put(
        USER_URL + '/' + id + '?token=' + localStorage.getItem('token'),
        JSON.stringify({ verified: true }),
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
      .then((response) => {
        if (response.status == 200) {
          //TODO: do this more efficiently
          fetchData();
        }
      });
  };

  const remove = (id) => {
    axios
      .delete(USER_URL + '/' + id + '?token=' + localStorage.getItem('token'))
      .then((response) => {
        if (response.status == 200) {
          //TODO: do this more efficiently
          fetchData();
        }
      });
  };
  return (
    <Card sx={{ maxWidth: 700, marginBottom: '1%' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: deepOrange[500] }} aria-label="recipe">
            {name[0]}
          </Avatar>
        }
      />

      <CardContent>
        <Typography gutterBottom variant="h5">
          {name}
          {surname}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {birthDate}
        </Typography>
      </CardContent>
      <CardActions>
        {verified ? (
          <Button
            onClick={() => {
              remove(id);
            }}
            size="small"
          >
            Odstranit dobrovolníka
          </Button>
        ) : null}
        {!verified ? (
          <Button
            size="small"
            onClick={() => {
              verify(id);
            }}
          >
            Potvrdit dobrovolníka
          </Button>
        ) : null}
        {!verified ? (
          <Button
            size="small"
            onClick={() => {
              remove(id);
            }}
          >
            Zamítnout dobrovolníka
          </Button>
        ) : null}
      </CardActions>
    </Card>
  );
}

export default VolunteerCard;
