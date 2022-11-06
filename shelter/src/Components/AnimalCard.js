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
import { useNavigate } from "react-router-dom";

function AnimalCard({ id, name, type, age, from, openRequest }) {
  const { authenticated, roles } = useContext(authContext);
  const navigate = useNavigate();
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
        {from === "animals" ? (
          <Button size="small" onClick={() => navigate("/animals/" + id)}>
            Vyvenčit
          </Button>
        ) : null}
        {from == "care" ? (
          <Button size="small" onClick={() => openRequest()}>
            Vytvořit požadavek na veterináře
          </Button>
        ) : null}
        {from === "care" ? (
          <Button size="small" onClick={() => navigate("/caretaker/" + id)}>
            Venčení zvířete
          </Button>
        ) : null}
        {from === "veterinarian" ? (
          <Button size="small" onClick={() => navigate("/veteranian/" + id)}>
            Editovat zdravotní záznam
          </Button>
        ) : null}
        {from === "veterinarian" || from === "care" ? (
          <Button size="small">Smazat zvíře</Button>
        ) : null}
      </CardActions>
    </Card>
  );
}

export default AnimalCard;
