import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios/axios';

function RequestCard({ request, requests, setRequests, fetchRequests }) {
  const navigate = useNavigate();
  const reject = () => {
    const newRequests = requests.filter(
      (deleteReq) => deleteReq.request_id !== requests.request_id
    );
    setRequests(newRequests);
    axios
      .put(
        'request/' + request.request_id,
        JSON.stringify({
          state: 'rejected',
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          },
        }
      )
      .then((response) => {
        if (response.status == 200) {
          fetchRequests();
        } else {
        }
      })
      .catch((response) => {});
  };
  const remove = () => {
    const newRequests = requests.filter(
      (deleteReq) => deleteReq.request_id !== requests.request_id
    );
    setRequests(newRequests);
    axios
      .delete('request/' + request.request_id, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      })
      .then((response) => {
        if (response.status == 200) {
          fetchRequests();
        } else {
        }
      })
      .catch((response) => {});
  };
  return (
    <Card sx={{ maxWidth: 700 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Zvíře: {request.animal_name}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Autor: {request.author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Datum: {request.date}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => navigate('/veteranian/event/' + request.animal_id)}
        >
          Naplánovat událost
        </Button>
        <Button size="small" onClick={() => remove()}>
          Smazat jako vyřešenou
        </Button>
        <Button size="small" onClick={() => reject()}>
          Zamítnout
        </Button>
      </CardActions>
    </Card>
  );
}

export default RequestCard;
