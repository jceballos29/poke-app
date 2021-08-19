import axios from "axios";
import React, { useEffect, useState } from "react";
import "../css/Card.css";
import Type from "./Type";
import { colors } from "../services/colors.json";
import Stat from "./Stat";
import { useHistory } from "react-router-dom";

function Card({ url }) {
  const history = useHistory();

  const [pokemon, setPokemon] = useState(null);
  const [name, setName] = useState("");
  const [id, setId] = useState(null);
  const [image, setImage] = useState("");
  const [types, setTypes] = useState([]);
  const [stats, setStats] = useState([]);
  const [typeName, setTypeName] = useState(null);
  const [color, setColor] = useState(colors[0]);
  const [style, setStyle] = useState({});

  useEffect(() => {
    axios
      .get(url)
      .then((response) => setPokemon(response.data))
  }, [url]);

  useEffect(() => {
    if (pokemon) {
      setName(pokemon.name);
      setStats(
        pokemon.stats.map((s, index) => (
          <Stat
            key={index}
            baseStat={s.base_stat}
            name={s.stat.name}
          />
        ))
      );
      setTypes(
        pokemon.types.map((t) => <Type key={t.slot} type={t.type.name} />)
      );
      setTypeName(pokemon.types[0].type);
      setId(pokemon.id);
    }
  }, [pokemon]);

  useEffect(() => {
    if (typeName) {
      setColor(colors.find((item) => item.name === typeName.name));
    }
  }, [typeName]);

  useEffect(() => {
    setStyle({ backgroundColor: color.color });
  }, [color]);

  useEffect(() => {
    if (id) {
      setImage(
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
      );
    }
  }, [id]);

  return (
    <div
      className="Card"
      onClick={() => {
        history.push(`/pokedex/pokemon/${id}`, {
          name,
        });
      }}
    >
      <div className="CardHeader">
        <div className="CardName" style={style}>
          <h1>{name}</h1>
        </div>

        <div className="CardTypes">{types}</div>
      </div>

      <div className="CardContent">
        <div className="CardImage">
          <img alt={name} src={image} />
        </div>
        <div className="CardStats">{stats}</div>
      </div>
    </div>
  );
}

export default Card;
