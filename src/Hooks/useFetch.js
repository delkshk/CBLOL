const useFetch = (endpoint) => {
  var url = ""
  if (endpoint === "tournaments") {
    url = "https://api.pandascore.co/leagues/302";
  } else {
    url = "https://api.pandascore.co/tournaments/5329";
  }

  const config = {
    method: "get",
    url: url + "/" + endpoint,
    headers: {
      Authorization:
        "Bearer kqx262D7qNXlM7I68k8ssl7FSqiIO81SHUOpQhHnXkoWTahiHzs",
    },
  }

  return config;
};

export default useFetch;
