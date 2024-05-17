// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClickProvider from "./components/ClickContext";
import MainTabs from "./components/mainTabs";
import FirstBlood from "./pages/firstBlood";
import FirstTower from "./pages/firstTower";
import FirstBaron from "./pages/firstBaron";
import FirstDragon from "./pages/firstDragon";
import FirstInhibitor from "./pages/firstInhibitor";
import MostKills from "./pages/mostKills";
import WinPage from "./pages/win";
import Input from "./components/input";
import "./App.css";

function App() {
  return (
    <ClickProvider>
      <Router>
        <div className="App">
          <div className="flex flex-col">
            <h1>League of Legends Prediction Tool</h1>
            <Input />
            <div className="flex justify-center">
              <MainTabs />
            </div>
            <div className="mt-5">
              <Routes>
                <Route path="/" element={<FirstBlood />} />
                <Route path="/FirstBlood" element={<FirstBlood />} />
                <Route path="/FirstTower" element={<FirstTower />} />
                <Route path="/FirstDragon" element={<FirstDragon />} />
                <Route path="/FirstBaron" element={<FirstBaron />} />
                <Route path="/FirstInhibitor" element={<FirstInhibitor />} />
                <Route path="/MostKills" element={<MostKills />} />
                <Route path="/Winner" element={<WinPage />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </ClickProvider>
  );
}

export default App;
