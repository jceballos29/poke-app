import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Home.css";
import ButtonPage from "./ButtonPage";
import CardContainer from "./CardContainer";
import { useLocation } from "react-router-dom";

function Types() {
  const { state } = useLocation();
  const limit = 4;

  const [pokemons, setPokemons] = useState(null);
  const [pokemonsRenderList, setPokemonsRenderList] = useState([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(null);
  const [start, setStart] = useState(0);
  const [final, setFinal] = useState(limit);

  const getPage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    if (state) {
      axios
        .get(`https://pokeapi.co/api/v2/type/${state.type}`)
        .then((response) => {
          setPokemons(response.data.pokemon);
          setCount(response.data.pokemon.length);
        })
    }
  }, [state]);

  useEffect(() => {
    setStart(page * limit);
    setFinal(page * limit + limit);
  }, [page, limit]);

  useEffect(() => {
    if (pokemons) {
      let list = [];
      for (let i = start; i < final; i++) {
        list.push(pokemons[i].pokemon);
      }
      setPokemonsRenderList(list);
    }
  }, [start, final, pokemons]);

  return (
    <div className="Pokedex">
      <CardContainer pokemons={pokemonsRenderList} />
      <ButtonPage top={Math.ceil(count / limit)} handlePage={getPage} />
    </div>
  );
}

export default Types;
