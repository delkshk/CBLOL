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
          // console.log("request torneio", response.data);
          setloading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      const datatorneio = window.sessionStorage.getItem("torneio");
      settorneio(JSON.parse(datatorneio));
      console.log("storage torneio", JSON.parse(datatorneio));
      setTimeout(() => {
        setloading(false);
      }, 1000);
    }
  };

  React.useEffect(() => {
    GetPartidas();
  }, []);

  const loadingPlaceholder = () => {
    return(
      <div>
        <LoadingCard height="280px"/>
        <LoadingCard height="280px"/>
        <LoadingCard height="280px"/>
      </div>
    )
  };

  return (
    <div>
      <div className="nav_rodada">
        <button
          onClick={() => {
            if (rodada > 1) {
              setrodada(rodada - 1);
              setloading(true);
              setTimeout(() => {
                setloading(false);
              }, 250);
            }
          }}
        >
          {"<-"}
        </button>
        <span>{rodada}</span>
        <button
          onClick={() => {
            if (rodada < 9) {
              setrodada(rodada + 1);
              setloading(true);
              setTimeout(() => {
                setloading(false);
              }, 250);
            }
          }}
        >
          {"->"}
        </button>
      </div>
      <ul>
        {!torneio ? loadingPlaceholder() : ""}  

        {torneio &&
          torneio[0].matches
            .filter((name) => name.name.includes("Week " + rodada))
            .map((partida) => {
              if (loading) {
                return <LoadingCard height="280px" key={partida.id}/>;
              } else {
                return <PartidaCard key={partida.id} partida={partida} />;
              }
          })}
      </ul>
    </div>
  );
};

export default Partidas;
