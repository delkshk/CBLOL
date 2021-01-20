import axios from "axios";
import React, { useState } from "react";
import LoadingCard from "../../Components/LoadingCard";
import useFetch from "../../Hooks/useFetch";
import "./Partida.scss";
import PartidaCard from "./PartidaCard";
const Partidas = () => {
  const [torneio, settorneio] = useState("");
  const [rodada, setrodada] = useState(1);
  const [loading, setloading] = useState(true);
  const GetPartidas = () => {
    setloading(true);
    const configs = useFetch("tournaments");
    if (!window.sessionStorage.getItem("torneio")) {
      axios(configs)
        .then(function (response) {
          window.sessionStorage.setItem(
            "torneio",
            JSON.stringify(response.data)
          );
          settorneio(response.data);
          // console.log("torneio", response.data);
          setloading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      const datatorneio = window.sessionStorage.getItem("torneio");
      settorneio(JSON.parse(datatorneio));
      // console.log("torneio storage", JSON.parse(datatorneio));
      setTimeout(() => {
        setloading(false);
      }, 1000);
      
    }
  };

  React.useEffect(() => {
    GetPartidas();

  }, []);
  return (
    <div>
      <div>
        <button onClick={()=>{if(rodada > 1 ){setrodada(rodada-1);setloading(true);setTimeout(() => {setloading(false);}, 250);}}}>Prev</button>
        <span>{rodada}</span>
        <button onClick={()=>{if(rodada < 9 ){setrodada(rodada+1);setloading(true);setTimeout(() => {setloading(false);}, 250);}}}>Next</button>
      </div>
      <ul>
        {torneio &&
          torneio[0].matches.filter(name => name.name.includes('Week '+ rodada)).map((partida) => {
            if (loading) {
              return <LoadingCard height="288px" key={partida.id}/>
            }else{
              return <PartidaCard key={partida.id} partida={partida}/>;
            }
          })}
      </ul>
    </div>
  );
};

export default Partidas;
