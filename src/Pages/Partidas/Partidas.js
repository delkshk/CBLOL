import axios from "axios";
import React, { useState } from "react";
import useFetch from "../../Hooks/useFetch";

const Partidas = () => {
  const [torneio, settorneio] = useState("");
  const configs = useFetch("tournaments");
  React.useEffect(() => {
    if (!window.sessionStorage.getItem("torneio")) {
      axios(configs)
        .then(function (response) {
          window.sessionStorage.setItem("torneio", JSON.stringify(response.data));
          settorneio(response.data);
          console.log("torneio", response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      const datatorneio = window.sessionStorage.getItem("torneio");
      settorneio(JSON.parse(datatorneio));
      console.log("torneio storage", JSON.parse(datatorneio));
    }
  }, []);

  const DataPartida = (dataParam) => {
    const dt = new Date(dataParam);
    return dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();
  };
  const isToday = (dataParam) => {
    const today = new Date();
    const dt = new Date(dataParam);
    return (
      dt.getDate() == today.getDate() &&
      dt.getMonth() == today.getMonth() &&
      dt.getFullYear() == today.getFullYear()
    );
  };
  return (
    <div>
      {" "}
      <ul>
        {torneio &&
          torneio[0].matches.map((partida) => {
            return (
              <li data-istoday={isToday(partida.scheduled_at)}>
                <p>{partida.name}</p>
                <p>{partida.status}</p>
                <p>{DataPartida(partida.scheduled_at)}</p>
                <p>Hoje? { isToday(partida.scheduled_at) ? "SIM" : "NAO"}</p>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Partidas;
