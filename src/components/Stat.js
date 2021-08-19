import React from "react";
import "../css/Stat.css";
import { abb } from "../services/abbreviations.json";

function Stat({ baseStat, name}) {
  const nameAbb = abb.find((n) => n.name === name);
  const style = { width: `${baseStat}%` };

  return (
    <div className="Stat">
      <div className="stat_name">{nameAbb.abb}</div>
      <div className="stat_progess">
        <span style={style}> </span>
      </div>
    </div>
  );
}

export default Stat;
