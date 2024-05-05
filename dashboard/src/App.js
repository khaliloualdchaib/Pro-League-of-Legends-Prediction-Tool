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

          <div class="absolute bottom-[60%] left-[46%]">
            <PredictionData title={"First Blood"}></PredictionData>
          </div>
          <div class="absolute bottom-[68.9%] left-[58.5%]">
            <PredictionData title={"First Tower"}></PredictionData>
          </div>
          <div class="absolute bottom-[77%] left-[36%]">
            <PredictionData title={"First Baron"}></PredictionData>
          </div>
          <div class="absolute bottom-[52%] left-[65%]">
            <PredictionData title={"First Dragon"}></PredictionData>
          </div>
          <div class="absolute bottom-[80%] left-[73%]">
            <PredictionData title={"First Inhibitor"}></PredictionData>
          </div>
          <div class="absolute bottom-[86%] left-[82%]">
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
