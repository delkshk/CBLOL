import axios from "axios";
import React, { useState } from "react";
import LazyLoad from "react-lazyload";
import useFetch from "../../Hooks/useFetch";
import "./Partida.scss";
import PartidaCard from "./PartidaCard";
const Partidas = () => {
  const [torneio, settorneio] = useState("");
  const [rodada, setrodada] = useState(1);
  const GetPartidas = () => {
    const configs = useFetch("tournaments");
    if (!window.sessionStorage.getItem("torneio")) {
      axios(configs)
        .then(function (response) {
          window.sessionStorage.setItem(
            "torneio",
            JSON.stringify(response.data)
          );
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
  };

  React.useEffect(() => {
    GetPartidas();
  }, []);
  return (
    <div>
      <div>
        <button onClick={()=>{if(rodada > 1 ){setrodada(rodada-1)}}}>Prev</button>
        <span>{rodada}</span>
        <button onClick={()=>{if(rodada < 9 ){setrodada(rodada+1)}}}>Next</button>
      </div>
      <ul>
        {torneio &&
          torneio[0].matches.filter(name => name.name.includes('Week '+ rodada)).map((partida) => {
            return <LazyLoad minHeight={288} placeholder={<LoadingCard/>}><PartidaCard partida={partida}/></LazyLoad>;
          })}
      </ul>
    </div>
  );
};

const LoadingCard = () => {
  return (
    <div>
      
    </div>
  )
}

export default Partidas;
