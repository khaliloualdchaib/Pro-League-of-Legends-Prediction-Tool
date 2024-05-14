import "./App.css";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import MainTabs from "./components/mainTabs";
import FirstBlood from "./pages/firstBlood";
import FirstTower from "./pages/firstTower";
import FirstBaron from "./pages/firstBaron";
import FirstDragon from "./pages/firstDragon";
import FirstInhibitor from "./pages/firstInhibitor";
import MostKills from "./pages/mostKills";
import WinPage from "./pages/win";
import Input from "./components/input";
function App() {
  return (
    <Router>
      <div className="App">
        <div class="flex flex-col">
          <h1>League of Legends Prediction Tool</h1>
          <Input></Input>
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
