import "./App.css";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import ChampSelect from "./componenets/champSelect";
import MainTabs from "./componenets/mainTabs";
import FirstBlood from "./pages/firstBlood";
import FirstTower from "./pages/firstTower";
import FirstBaron from "./pages/firstBaron";
import FirstDragon from "./pages/firstDragon";
import FirstInhibitor from "./pages/firstInhibitor";
import MostKills from "./pages/mostKills";
import WinPage from "./pages/win";
import LeagueSelection from "./componenets/leagueSelection";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>League of Legends Prediction Tool</h1>
        <div class="grid grid-cols-5 gap-4">
          <div>
            <div class="flex flex-col">
              <div class="flex flex-row">
                <div class="basis-1/2">
                  <LeagueSelection></LeagueSelection>
                </div>
                <div class="basis-1/2">
                  <button
                    type="button"
                    class="border focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700"
                  >
                    PREDICT
                  </button>
                </div>
              </div>
              <div class="mt-2 max-w-sm p-5 rounded-lg shadow bg-gray-800 border-gray-700">
                <ChampSelect team="blue" />
              </div>
              <div className="mt-2 max-w-sm p-5 rounded-lg shadow bg-gray-800 border-gray-700">
                <ChampSelect team="red" />
              </div>
            </div>
          </div>
          <div class="col-span-4">
            <div class="flex flex-col">
              <div>
                <MainTabs></MainTabs>
              </div>
              <div className="mt-5">
                <Routes>
                  <Route path="/" element={<FirstBlood></FirstBlood>}></Route>
                  <Route
                    path="/FirstBlood"
                    element={<FirstBlood></FirstBlood>}
                  ></Route>
                  <Route
                    path="/FirstTower"
                    element={<FirstTower></FirstTower>}
                  ></Route>
                  <Route
                    path="/FirstDragon"
                    element={<FirstDragon></FirstDragon>}
                  ></Route>
                  <Route
                    path="/FirstBaron"
                    element={<FirstBaron></FirstBaron>}
                  ></Route>
                  <Route
                    path="/FirstInhibitor"
                    element={<FirstInhibitor></FirstInhibitor>}
                  ></Route>
                  <Route
                    path="/MostKills"
                    element={<MostKills></MostKills>}
                  ></Route>
                  <Route path="/Winner" element={<WinPage></WinPage>}></Route>
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
