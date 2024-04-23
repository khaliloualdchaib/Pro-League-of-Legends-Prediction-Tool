import "./App.css";
import map from "./img/SRFull.jpg";
import TeamSelector from "./componenets/teamSelector";
function App() {
  return (
    <div className="App">
      <h1>League of Legends Prediction Tool</h1>
      <TeamSelector></TeamSelector>
      <div class="flex flex-row">
        <div class="basis-1/5">01</div>
        <div class="basis-3/5">
          <img src={map} alt="" />
        </div>
        <div class="basis-1/5">03</div>
      </div>
    </div>
  );
}

export default App;
