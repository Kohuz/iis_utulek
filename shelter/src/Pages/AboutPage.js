import { Typography } from '@mui/material';
import { animalTypes } from 'Helpers/AnimalTypes';
import React from 'react';

function AboutPage() {
  return (
    <>
      <Typography variant="h4">
        Jsme útulek, ve kterém najdete spoustu druhů zvířat:
      </Typography>
      <br></br>
      <ul>
        {animalTypes.map((animal) => (
          <li>{animal}</li>
        ))}
      </ul>
      <br></br>
      <Typography variant="h5">
        Zvířata si můžete rezervovat k venčení v čase od 8 do 17 hodin, každý
        den pokud má dané zvíře vytvořený rozvrh
      </Typography>
      <br></br>
      <Typography variant="h4">Adresa:</Typography>
      <Typography variant="h5">
        Božetěchova 1/2, 612 00 Brno-Královo Pole
      </Typography>
      <Typography variant="h4">Kontaktní osoba:</Typography>
      <Typography variant="h5">
        Jakub Kozubek xkozub07@stud.fit.vutbr.cz
      </Typography>
    </>
  );
}

export default AboutPage;
