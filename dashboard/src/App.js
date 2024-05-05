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
        <div class="basis-3/5 px-2 grid relative">
          <figure class="max-w-full">
            <img className="h-2/3 w-full rounded-lg" alt="map" src={map} />
          </figure>

          <div class="absolute bottom-[45%] left-[50%] transform translate-x-[-50%]">
            <PredictionData title={"First Blood"}></PredictionData>
          </div>
          <div class="absolute bottom-[68.9%] left-[50%] transform -translate-x-[-50%]">
            <PredictionData title={"First Tower"}></PredictionData>
          </div>
          <div class="absolute bottom-[66%] left-[36%] transform -translate-x-[-50%]">
            <PredictionData title={"First Baron"}></PredictionData>
          </div>
          <div class="absolute bottom-[30%] left-[65%] transform -translate-x-[-50%]">
            <PredictionData title={"First Dragon"}></PredictionData>
          </div>
          <div class="absolute bottom-[71%] left-[73.5%] transform -translate-x-[-50%]">
            <PredictionData title={"First Inhibitor"}></PredictionData>
          </div>
          <div class="absolute bottom-[80%] left-[82.5%] transform -translate-x-[-50%]">
            <PredictionData title={"Winner"}></PredictionData>
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
