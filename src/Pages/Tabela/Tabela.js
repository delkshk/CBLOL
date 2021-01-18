import axios from "axios";
import React, { useState } from "react";
import useFetch from "../../Hooks/useFetch";
import "./Tabela.scss";
const Tabela = () => {
  const [stading, setstading] = useState("");
  const configs = useFetch("standings");
  React.useEffect(() => {
    if (!window.sessionStorage.getItem("standing")) {
      axios(configs)
        .then(function (response) {
          window.sessionStorage.setItem(
            "standing",
            JSON.stringify(response.data)
          );
          setstading(response.data);
          console.log("Request", response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      const dataStanding = window.sessionStorage.getItem("standing");
      setstading(JSON.parse(dataStanding));
      console.log("GAMES storage", JSON.parse(dataStanding));
    }
  }, [configs]);

  return (
    <ul>
      {stading &&
        stading.map((standing) => {
          return (
            <li key={standing.rank} className={standing.team.acronym + " team"}>
              <img src={standing.team.image_url} alt={standing.team.name} />
              <div className="team info">
                <span className="team_name">{standing.team.name}</span>
                <span className="team_acro">{standing.team.acronym}</span>
                <div className="team_stats">
                  <span className="team_stats__wins">{standing.wins}</span>
                  <span className="team_stats__losses">{standing.losses}</span>
                </div>
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default Tabela;
