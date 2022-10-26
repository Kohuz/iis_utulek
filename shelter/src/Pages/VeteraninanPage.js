import React from "react";
import AnimalCard from "Components/AnimalCard";

function VeterinarianPage() {
  const animals = [
    {
      name: "Alík",
      type: "Pes",
      age: 3,
    },
    {
      name: "Micinka",
      type: "Kočka",
      age: 5,
    },
    {
      name: "Žofka",
      type: "Leguán",
      age: 6,
    },
  ];
  return (
    <>
      <h3>Požadavky</h3>
      <p>Požadavek 1</p>
      <p>Požadavek 2</p>
      <p>Požadavek 3</p>
      <h3>Zvířata</h3>
      {animals.map((animal) => (
        <AnimalCard
          name={animal.name}
          type={animal.type}
          age={animal.age}
          from={"veterinarian"}
        ></AnimalCard>
      ))}
    </>
  );
}

export default VeterinarianPage;
