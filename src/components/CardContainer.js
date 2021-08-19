import React, { useEffect, useState } from "react";
import Card from "./Card";
import "../css/CardContainer.css";

function CardContainer({ pokemons }) {
  const [renderLisnt, setRenderList] = useState([]);

  useEffect(() => {
    if (pokemons) {
      setRenderList(
        pokemons.map((pokemon, index) => <Card key={index} url={pokemon.url} />)
      );
      console.log(pokemons[0]);
    }
  }, [pokemons]);

  return <div className="CardContainer">{renderLisnt}</div>;
}

export default CardContainer;
