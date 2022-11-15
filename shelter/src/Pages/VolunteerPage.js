import { Typography } from "@mui/material";
import VolunteerCard from "Components/Cards/VolunteerCard";
import React from "react";

function VolunteerPage() {
  const users = [
    {
      name: "Pepa",
      surname: "Jouda",
      birthDate: "exampleDate",
      verified: false,
    },
    {
      name: "Mike",
      surname: "Pán",
      birthDate: "exampleDate",
      verified: true,
    },
    {
      name: "Marek",
      surname: "Pazdera",
      birthDate: "exampleDate",
      verified: true,
    },
  ];
  return (
    <>
      <Typography>Neověření dobrovolníci</Typography>
      {users
        .filter((user) => !user.verified)
        .map((user) => (
          <VolunteerCard
            name={user.name}
            surname={user.type}
            birthDate={user.age}
            verified={user.verified}
          ></VolunteerCard>
        ))}
      <Typography>Dobrovolníci</Typography>
      {users
        .filter((user) => user.verified)
        .map((user) => (
          <VolunteerCard
            name={user.name}
            surname={user.surname}
            birthDate={user.age}
            verified={user.verified}
          ></VolunteerCard>
        ))}
    </>
  );
}

export default VolunteerPage;
