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

function RequestCard({ request }) {
  const navigate = useNavigate();
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
          onClick={() => navigate('/veteranian/event/' + request.id)}
        >
          Naplánovat událost
        </Button>

        <Button size="small">Zamítnout</Button>
      </CardActions>
    </Card>
  );
}

export default RequestCard;
