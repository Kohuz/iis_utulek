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

function AnimalCard({ name, type, age }) {
  const { authenticated, roles } = useContext(authContext);
  return (
    <Card sx={{ maxWidth: 500 }}>
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
        {authenticated ? <Button size="small">Vyvenčit</Button> : null}
        {checkRoles(roles, [rolesDict["Admin"], rolesDict["Caretaker"]]) ? (
          <Button size="small">Vytvořit požadavek na veterináře</Button>
        ) : null}
        {checkRoles(roles, [rolesDict["Admin"], rolesDict["Caretaker"]]) ? (
          <Button size="small">Vytvořit rozvrh venčení</Button>
        ) : null}
      </CardActions>
    </Card>
  );
}

export default AnimalCard;
