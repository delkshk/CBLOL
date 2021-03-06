import axios from "axios";
import React, { useState } from "react";
import LoadingCard from "../../Components/LoadingCard";
import useFetch from "../../Hooks/useFetch";
import "./Tabela.scss";
const Tabela = () => {
  const [stading, setstading] = useState("");
  const [loading, setloading] = useState(true);
  const GetTabela = () => {
    const configs = useFetch("standings");
    if (!window.sessionStorage.getItem("standing")) {
      axios(configs)
        .then(function (response) {
          window.sessionStorage.setItem(
            "standing",
            JSON.stringify(response.data)
          );
          setstading(response.data);
          // console.log("Request Tabela", response.data);
          setloading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      const dataStanding = window.sessionStorage.getItem("standing");
      setstading(JSON.parse(dataStanding));
      // console.log("storage Tabela", JSON.parse(dataStanding));
      setTimeout(() => {
        setloading(false);
      }, 1000);
    }
  };
  React.useEffect(() => {
    GetTabela();
  }, []);

  const loadingPlaceholder = () => {
    return(
      <div>
        <LoadingCard height="60px"/>
        <LoadingCard height="60px"/>
        <LoadingCard height="60px"/>
      </div>
    )
  };
  return (
    <ul>
      {!stading ? loadingPlaceholder() : ""}  
      {stading &&
        stading.map((standing) => {
          if (loading) {
            return <LoadingCard height="60px" key={standing.team.acronym} />;
          } else {
            return (
              <li
                key={standing.team.acronym}
                className={standing.team.acronym + " team"}
              >
                <img
                  className={standing.team.acronym + " logo"}
                  src={standing.team.image_url}
                  alt={standing.team.name}
                />
                <div className="team_info">
                  <span className="team_pos">{standing.rank}</span>
                  <span className="team_name">{standing.team.name}</span>
                  <div className="team_stats">
                    <span className="team_stats__wins">{standing.wins}</span>
                    <span className="team_stats__losses">
                      {standing.losses}
                    </span>
                  </div>
                </div>
              </li>
            );
          }
        })}
    </ul>
  );
};

export default Tabela;
