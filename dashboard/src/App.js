// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClickProvider from "./components/ClickContext";
import MainTabs from "./components/mainTabs";
import PlayerStats from "./pages/playerStats";
import Input from "./components/input";
import "./App.css";
import Predictions from "./pages/predictions";
import ResponseProvider from "./components/ResponseContext";
import RecentGames from "./pages/recentGames";
function App() {
  return (
    <ClickProvider>
      <ResponseProvider>
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
                  <Route path="/" element={<Predictions />} />
                  <Route path="/PlayerStats" element={<PlayerStats />} />
                  <Route path="/RecentGames" element={<RecentGames />} />
                </Routes>
              </div>
            </div>
          </div>
        </Router>
      </ResponseProvider>
    </ClickProvider>
  );
}

export default App;
