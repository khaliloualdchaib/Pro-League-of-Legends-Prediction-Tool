import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import FeatureImportance from "../components/featureImportance";
import { ResponseContext } from "../components/ResponseContext";
import { ClickContext } from "../components/ClickContext";

const Predictions = () => {
  const winTeam = "Winning Team Feature Importance";
  const firstTower = "First Tower Feature Importance";
  const firstBaron = "First Baron Feature Importance";

  const [chartTitle, setChartTitle] = useState(winTeam);
  const { responseData } = useContext(ResponseContext);
  const { isClicked } = useContext(ClickContext);

  const [importance, setImportance] = useState([]);
  const [firstBaronPrediction, SetFirstBaronPrediction] = useState("");
  const [firstTowerPrediction, SetFirstTowerPrediction] = useState("");
  const [winPrediction, SetWinPrediction] = useState("");
  const [top, setTop] = useState(10);

  const blueTeamStyle = {
    color: "blue",
  };

  const redTeamStyle = {
    color: "red",
  };

  const handleChange = (event) => {
    setTop(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    const init = () => {
      if (isClicked && responseData) {
        const predictions = responseData.predictions.classifications;
        if (predictions["firstbaron"] === 1) {
          SetFirstBaronPrediction("Blue Team");
        } else {
          SetFirstBaronPrediction("Red Team");
        }
        if (predictions["firsttower"] === 1) {
          SetFirstTowerPrediction("Blue Team");
        } else {
          SetFirstTowerPrediction("Red Team");
        }
        if (predictions["result"] === 1) {
          SetWinPrediction("Blue Team");
        } else {
          SetWinPrediction("Red Team");
        }
        const data = responseData.predictions.importance["result"];
        data.sort((a, b) => b.Importance - a.Importance);

        const topFeatures = data.slice(0, top);
        setImportance(topFeatures);
      }
    };
    init();
  }, [isClicked, responseData, top]);

  const handleSetChartTitle = (title) => () => {
    if (responseData && isClicked) {
      if (title === winTeam) {
        const data = responseData.predictions.importance["result"];
        data.sort((a, b) => b.Importance - a.Importance);

        const topFeatures = data.slice(0, top);
        setImportance(topFeatures);
      } else if (title === firstTower) {
        const data = responseData.predictions.importance["firsttower"];
        data.sort((a, b) => b.Importance - a.Importance);

        const topFeatures = data.slice(0, top);
        setImportance(topFeatures);
      } else if (title === firstBaron) {
        const data = responseData.predictions.importance["firstbaron"];
        data.sort((a, b) => b.Importance - a.Importance);

        const topFeatures = data.slice(0, top);
        setImportance(topFeatures);
      }
    }
    setChartTitle(title);
  };

  return (
    <div className="flex flex-col">
      {importance.length > 0 && (
        <div className="flex flex-nowrap justify-center gap-3">
          <div>
            <Link
              onClick={handleSetChartTitle(winTeam)}
              to="/"
              className="block max-w-sm p-6 border rounded-lg shadow bg-gray-800 border-gray-700 hover:bg-gray-700"
            >
              <h5
                className="mb-2 text-2xl font-bold tracking-tight text-white"
                class={
                  winPrediction === "Blue Team"
                    ? "text-blue-500"
                    : "text-red-500"
                }
              >
                Winning Team: {winPrediction}
              </h5>
            </Link>
          </div>
          <div>
            <Link
              onClick={handleSetChartTitle(firstTower)}
              to="/"
              className="block max-w-sm p-6 border rounded-lg shadow bg-gray-800 border-gray-700 hover:bg-gray-700"
            >
              <h5
                className="mb-2 text-2xl font-bold tracking-tight text-white"
                class={
                  firstTowerPrediction === "Blue Team"
                    ? "text-blue-500"
                    : "text-red-500"
                }
              >
                First Tower: {firstTowerPrediction}
              </h5>
            </Link>
          </div>
          <div>
            <Link
              onClick={handleSetChartTitle(firstBaron)}
              to="/"
              className="block max-w-sm p-6 border rounded-lg shadow bg-gray-800 border-gray-700 hover:bg-gray-700"
            >
              <h5
                className="mb-2 text-2xl font-bold tracking-tight"
                class={
                  firstBaronPrediction === "Blue Team"
                    ? "text-blue-500"
                    : "text-red-500"
                }
              >
                First Baron: {firstBaronPrediction}
              </h5>
            </Link>
          </div>
        </div>
      )}
      {importance.length > 0 && (
        <div>
          <FeatureImportance title={chartTitle} importance_data={importance} />
        </div>
      )}
      {importance.length > 0 && (
        <div>
          <select
            onChange={handleChange}
            class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          >
            <option selected value="10">
              Get Top 10 Features
            </option>
            <option value="15">Get Top 15 Features</option>
            <option value="20">Get Top 20 Features</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default Predictions;
