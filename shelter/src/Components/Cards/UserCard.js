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
import React, { useContext, useEffect } from 'react';
import axios from 'axios/axios';
import authContext from 'Helpers/AuthContext';
import { deepOrange } from '@mui/material/colors';
import dog from '../../dog.png';

const USER_URL = '/user';
function UserCard({ user, users, setUsers, fetchData }) {
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
          //let newArr = [...users];
          //newArr.find((user) => user.id).verified = true;
          //setUsers([...newArr]);

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
    <>
      <Card sx={{ maxWidth: 700, marginBottom: '1%' }}>
        <CardContent>
          <Avatar sx={{ bgcolor: deepOrange[500] }} aria-label="recipe">
            {user.name[0]}
          </Avatar>
          <Typography gutterBottom>
            {user.name}
            {user.surname}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.birthDate}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => {
              remove(user.id);
            }}
            size="small"
          >
            Odstranit uživatele
          </Button>

          <Button
            size="small"
            onClick={() => {
              verify(user.id);
            }}
          >
            Upravit uživatele
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default UserCard;
