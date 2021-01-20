const useFetch = (endpoint) => {
  var url = "https://cblolapi.herokuapp.com/";
  if (endpoint === "tournaments") {
    url = "https://api.pandascore.co/leagues/302";
  } else {
    url = url + "tabela";
  }
  const config = {
    method: 'get',
    url: url,
    headers: {"Content-Type": "application/json"}
  };

  return config;
};

export default useFetch;
