import React from "react";
import { useParams } from "react-router-dom";

function HealthRecord() {
  const { id } = useParams();
  return <div>HealthRecord of id: {id}</div>;
}

export default HealthRecord;

