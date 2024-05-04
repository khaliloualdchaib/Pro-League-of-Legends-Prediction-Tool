import "./App.css";
import map from "./img/SRFull.jpg";
import ChampSelect from "./componenets/champSelect";
import PredictionData from "./componenets/predictiondata";

function App() {
  return (
    <div className="App">
      <h1>League of Legends Prediction Tool</h1>
      <div className="flex flex-row">
        <div className="basis-1/5">
          <ChampSelect team="blue" />
        </div>
        <div class="basis-3/5 relative max-w-5xl mx-auto px-2 grid grid-cols-3 map-container">
          <div class="relative overflow-hidden flex items-center justify-center flex-col">
            <img src={map} alt="Map" className="map-image" />
            <div class="absolute w-full h-full top-0 bottom-0 left-0 right-0 flex items-center justify-center">
              <PredictionData title={"test"}></PredictionData>
            </div>
          </div>
        </div>
        <div className="basis-1/5">
          <ChampSelect team="red" />
        </div>
      </div>
    </div>
  );
}

export default App;
