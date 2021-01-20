import React from "react";

const PartidaCard = (props) => {
  const partida = props.partida;
  const DataPartida = (dataParam) => {
    const dt = new Date(dataParam);
    return dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();
  };
  const isToday = (dataParam) => {
    const today = new Date();
    const dt = new Date(dataParam);
    return (
      dt.getDate() === today.getDate() &&
      dt.getMonth() === today.getMonth() &&
      dt.getFullYear() === today.getFullYear()
    );
  };
  const getTeams = (slug) => {
    var StringTratada = slug.substr(0, slug.length - 11);
    StringTratada = StringTratada.replace("-vs-", " vs ");
    StringTratada = StringTratada.split(" vs ");
    const teams = [
      NameGlobalizer(StringTratada[0]),
      NameGlobalizer(StringTratada[1]),
    ];
    return teams;
  };
  const getWeek = (slug) => {
    var StringTratada = slug.substr(0, 6);
    StringTratada = StringTratada.replace("Week ", "");
    // StringTratada = StringTratada.split(" vs ");
    const rodada = Number(StringTratada);
    return rodada;
  };

  const getTeamsImage = (search) => {
    switch (search) {
      case "PNG":
        return "https://cdn.pandascore.co/images/team/image/94/pain-gaming-farnhu45.png";
      case "LOUD":
        return "https://cdn.pandascore.co/images/team/image/128313/lou_dlogo_square.png";
      case "RNS":
        return "https://cdn.pandascore.co/images/team/image/128314/rensga_esportslogo_square.png";
      case "KBM":
        return "https://cdn.pandascore.co/images/team/image/33/kabum-orange-egig9edp.png";
      case "ITZ":
        return "https://cdn.pandascore.co/images/team/image/158/intz-ijdoekud.png";
      case "FLA":
        return "https://cdn.pandascore.co/images/team/image/2580/220px_flamengo_e_sportslogo_square.png";
      case "RCC":
        return "https://cdn.pandascore.co/images/team/image/161/red-canids-3ci94wz2.png";
      case "FUR":
        return "https://cdn.pandascore.co/images/team/image/126688/220px_furia_uppercutlogo_square.png";
      case "VRX":
        return "https://cdn.pandascore.co/images/team/image/128315/voraxlogo_profile.png";
      case "CRZ":
        return "https://cdn.pandascore.co/images/team/image/128312/cruzeiro_e_sportslogo_square.png";
      default:
        break;
    }
  };
  const NameGlobalizer = (orgName) => {
    switch (orgName) {
      case "pain-gaming":
        return "PNG";
      case "loud":
        return "LOUD";
      case "rensga-esports":
        return "RNS";
      case "kabum-esports":
        return "KBM";
      case "intz-e-sports":
        return "ITZ";
      case "flamengo-esports":
        return "FLA";
      case "red-canids":
        return "RCC";
      case "furia-esports":
        return "FUR";
      case "vorax":
        return "VRX";
      case "cruzeiro-esports":
        return "CRZ";
      default:
        break;
    }
  };
  const teams = getTeams(partida.slug);

    return (
      <li
        className="partida_card"
        istoday={isToday(partida.scheduled_at).toString()}
        rodada={getWeek(partida.name)}
        teamhome={teams[0]}
        teamaway={teams[1]}
      >
        <p className="partida_card__nome">{partida.name}</p>
        <p className="partida_card__data">{DataPartida(partida.scheduled_at)}</p>
        <div className="partida_card__img_container">
          <img src={getTeamsImage(teams[0])} alt={teams[0]} />
          <span>VS</span>
          <img src={getTeamsImage(teams[1])} alt={teams[1]} />
        </div>
  
        <p className="partida_card__status">
          {partida.status === "finished" ? "Finalizada" : ""}
          {partida.status === "not_started" && !isToday(partida.scheduled_at)
            ? "Em Breve"
            : ""}
          {partida.status === "not_started" && isToday(partida.scheduled_at)
            ? "A Seguir"
            : ""}
          {partida.status === "running" ? "Partida em Andamento" : ""}
        </p>
        {isToday(partida.scheduled_at) ? (
          <p className="partida_card__today">Hoje? </p>
        ) : (
          ""
        )}
      </li>
    );

};

export default PartidaCard;
