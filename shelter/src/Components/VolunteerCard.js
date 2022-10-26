import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardHeader,
  Avatar,
} from "@mui/material";
import React, { useContext } from "react";
import authContext from "Helpers/AuthContext";
import { deepOrange } from "@mui/material/colors";
import dog from "../dog.png";

function VolunteerCard({ name, surname, birthDate, verified }) {
  const { authenticated, roles } = useContext(authContext);
  return (
    <Card sx={{ maxWidth: 700 }}>
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
        {!verified ? <Button size="small">Potvrdit dobrovolníka</Button> : null}
      </CardActions>
    </Card>
  );
}

export default VolunteerCard;
