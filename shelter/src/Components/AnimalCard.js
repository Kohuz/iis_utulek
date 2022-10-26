import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import React, { useContext } from "react";
import authContext from "Helpers/AuthContext";
import dog from "../dog.png";
import { rolesDict, checkRoles } from "../Helpers/Roles";

function AnimalCard({ name, type, age, from }) {
  const { authenticated, roles } = useContext(authContext);
  return (
    <Card sx={{ maxWidth: 700 }}>
      <CardMedia component="img" height="100" image={dog} alt="exampleDog" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {type}, {age} roky
        </Typography>
      </CardContent>
      <CardActions>
        {from === "animals" ? <Button size="small">Vyvenčit</Button> : null}
        {from == "care" ? (
          <Button size="small">Vytvořit požadavek na veterináře</Button>
        ) : null}
        {from === "care" ? <Button size="small">Venčení zvířete</Button> : null}
        {from === "veterinarian" ? (
          <Button size="small">Editovat zdravotní záznam</Button>
        ) : null}
        {from === "veterinarian" || from === "care" ? (
          <Button size="small">Smazat zvíře</Button>
        ) : null}
      </CardActions>
    </Card>
  );
}

export default AnimalCard;
