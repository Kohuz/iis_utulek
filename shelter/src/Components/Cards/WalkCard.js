import {
  CardHeader,
  Card,
  Avatar,
  Typography,
  CardContent,
  CardActions,
} from '@mui/material';
import React from 'react';

function WalkCard({ walk }) {
  return (
    <Card sx={{ maxWidth: 700, marginTop: '1%' }}>
      <CardContent>
        <Typography gutterBottom variant="h5">
          Procházka s {walk.animal.name}
        </Typography>
        <Typography gutterBottom variant="h6">
          {walk.date}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default WalkCard;
