import React from "react";

function PorfileItem({ name, value }) {
  return (
    <div className="PorfileItem">
      <p>{name}</p>
      <p>{value}</p>
    </div>
  );
}

export default PorfileItem;
