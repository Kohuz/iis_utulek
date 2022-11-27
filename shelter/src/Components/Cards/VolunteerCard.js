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
import React, { useContext, useState } from 'react';
import axios from 'axios/axios';
import authContext from 'Helpers/AuthContext';
import { deepOrange } from '@mui/material/colors';
import dog from '../../dog.png';

const USER_URL = '/user';
function VolunteerCard({ user, users, setUsers, fetchData }) {
  const [loading, setLoading] = useState(false);
  const { authenticated, roles } = useContext(authContext);
  const verify = (id) => {
    const newUsers = users.filter((user) => id !== user.user_id);
    setUsers(newUsers);
    const updateObject = { verified: true };
    axios
      .put(USER_URL + '/' + id, JSON.stringify({ updateObject }), {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((response) => {
        if (response.status == 200) {
          // let newArr = [...users];
          // newArr.find((user) => user.user_id).verified = true;
          // setUsers([...newArr]);

          fetchData();
        }
      });
  };

  const remove = (id) => {
    const newUsers = users.filter((user) => id !== user.user_id);
    setUsers(newUsers);
    axios
      .delete(USER_URL + '/' + id, {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      })
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
            {user.name[0]}
          </Avatar>
        }
      />

      <CardContent>
        <Typography gutterBottom variant="h5">
          {user.name}
          {user.surname}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.birthDate}
        </Typography>
      </CardContent>
      <CardActions>
        {user.verified ? (
          <Button
            onClick={() => {
              remove(user.user_id);
            }}
            size="small"
          >
            Odstranit dobrovolníka
          </Button>
        ) : null}
        {!user.verified ? (
          <Button
            size="small"
            onClick={() => {
              verify(user.user_id);
            }}
          >
            Potvrdit dobrovolníka
          </Button>
        ) : null}
        {!user.verified ? (
          <Button
            size="small"
            onClick={() => {
              remove(user.user_id);
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
