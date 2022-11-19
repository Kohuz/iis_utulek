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
import dog from "../../dog.png";
import { rolesDict, checkRoles } from "../../Helpers/Roles";
import { Link, useNavigate } from "react-router-dom";

function AnimalCard({ animal, from, openRequest }) {
  const { authenticated, roles } = useContext(authContext);
  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 700 }}>
      <CardMedia component="img" height="100" image={dog} alt="exampleDog" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {animal.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {animal.type}, {animal.age} roky
        </Typography>
      </CardContent>
      <CardActions>
        {authenticated && from == "animals" ? (
          <Button
            size="small"
            onClick={() => navigate("/animals/" + animal.id)}
          >
            Vyvenčit
          </Button>
        ) : null}
        {from == "care" ? (
          <Button size="small" onClick={() => openRequest()}>
            Vytvořit požadavek na veterináře
          </Button>
        ) : null}
        {from === "care" ? (
          <Button
            size="small"
            onClick={() => navigate("/caretaker/" + animal.id)}
          >
            Vytvořit rozvrh venčení
            <Link to={"/caretaker/" + animal.id} state={animal} />
          </Button>
        ) : null}
        {from === "veterinarian" ? (
          <Button
            size="small"
            onClick={() => navigate("/veteranian/" + animal.id)}
          >
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
