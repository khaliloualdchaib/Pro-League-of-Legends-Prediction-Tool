import "./App.css";
import map from "./img/SRFull.jpg";
import ChampSelect from "./componenets/champSelect";
function App() {
  return (
    <div className="App">
      <h1>League of Legends Prediction Tool</h1>
      <div className="flex flex-row">
        <div className="basis-1/5">
          <ChampSelect team="blue"/>
        </div>
        <div className="basis-3/5 px-4 map-container">
          <img src={map} alt="Map" className="map-image" />
        </div>

        <div className="basis-1/5">
          <ChampSelect team="red"/>
        </div>
      </div>
    </div>
  );
}

export default App;
