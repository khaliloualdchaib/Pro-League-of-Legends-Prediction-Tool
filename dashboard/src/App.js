import "./App.css";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import TeamSelector from "./components/teamSelector";
import MainTabs from "./components/mainTabs";
import FirstBlood from "./pages/firstBlood";
import FirstTower from "./pages/firstTower";
import FirstBaron from "./pages/firstBaron";
import FirstDragon from "./pages/firstDragon";
import FirstInhibitor from "./pages/firstInhibitor";
import MostKills from "./pages/mostKills";
import WinPage from "./pages/win";

function App() {
  return (
    <Router>
      <div className="App">
        <div class="flex flex-col">
          <h1>League of Legends Prediction Tool</h1>
          <div className="flex flex-row">
            <div className="basis-1/2 mr-5">
              <TeamSelector />
            </div>
            <div className="basis-1/2">
              <TeamSelector />
            </div>
          </div>
          <div>
            <button
              type="button"
              class="border w-full focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700"
            >
              UPDATE
            </button>
          </div>
          <div className="flex justify-center">
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
    </Router>
  );
}

export default App;
