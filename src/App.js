import Partidas from "./Pages/Partidas/Partidas";
import Tabela from "./Pages/Tabela/Tabela";
import './App.scss'
function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-md-6">
            <Tabela></Tabela>
          </div>
          <div className="col-lg-7 col-md-6">
            <Partidas></Partidas>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
