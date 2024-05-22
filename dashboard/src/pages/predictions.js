import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import FeatureImportance from "../components/featureImportance";
import { ResponseContext } from "../components/ResponseContext";
import { ClickContext } from "../components/ClickContext";
import SolidGaugeChart from "../components/gaugeChart";

const Predictions = () => {
  const winTeam = "Winning Team Feature Importance";
  const firstTower = "First Tower Feature Importance";
  const firstBaron = "First Baron Feature Importance";
  const winAccuracy = 98;
  const firstTowerAccuracy = 68;
  const firstBaronAccuracy = 80;
  const [accuracy, setAccuracy] = useState(winAccuracy);

  const [chartTitle, setChartTitle] = useState(winTeam);
  const { responseData } = useContext(ResponseContext);
  const { isClicked } = useContext(ClickContext);

  const [importance, setImportance] = useState([]);
  const [firstBaronPrediction, setFirstBaronPrediction] = useState("");
  const [firstTowerPrediction, setFirstTowerPrediction] = useState("");
  const [winPrediction, setWinPrediction] = useState("");
  const [top, setTop] = useState(10);
  const [clickedLink, setClickedLink] = useState(winTeam); // State to track the clicked link

  const handleChange = (event) => {
    const newTop = parseInt(event.target.value, 10);
    setTop(newTop);
    let data;
    if (chartTitle === winTeam) {
      data = responseData.predictions.importance["result"];
    } else if (chartTitle === firstTower) {
      data = responseData.predictions.importance["firsttower"];
    } else if (chartTitle === firstBaron) {
      data = responseData.predictions.importance["firstbaron"];
    }
    data.sort((a, b) => b.Importance - a.Importance);

    const topFeatures = data.slice(0, newTop);
    setImportance(topFeatures);
  };

  useEffect(() => {
    const init = () => {
      if (isClicked && responseData) {
        const predictions = responseData.predictions.classifications;
        setFirstBaronPrediction(
          predictions["firstbaron"] === 1 ? "Blue Team" : "Red Team"
        );
        setFirstTowerPrediction(
          predictions["firsttower"] === 1 ? "Blue Team" : "Red Team"
        );
        setWinPrediction(
          predictions["result"] === 1 ? "Blue Team" : "Red Team"
        );

        const data = responseData.predictions.importance["result"];
        data.sort((a, b) => b.Importance - a.Importance);

        const topFeatures = data.slice(0, top);
        setImportance(topFeatures);
      }
    };
    const updateImportanceData = () => {
      if (responseData && isClicked) {
        let data;
        if (chartTitle === winTeam) {
          data = responseData.predictions.importance["result"];
          setAccuracy(winAccuracy);
        } else if (chartTitle === firstTower) {
          data = responseData.predictions.importance["firsttower"];
          setAccuracy(firstTowerAccuracy);
        } else if (chartTitle === firstBaron) {
          data = responseData.predictions.importance["firstbaron"];
          setAccuracy(firstBaronAccuracy);
        }
        data.sort((a, b) => b.Importance - a.Importance);

        const topFeatures = data.slice(0, top);
        setImportance(topFeatures);
      }
    };
    init();
    updateImportanceData();
  }, [isClicked, responseData, top, chartTitle]);

  const handleSetChartTitle = (title) => () => {
    if (responseData && isClicked) {
      let data;
      if (title === winTeam) {
        data = responseData.predictions.importance["result"];
        setAccuracy(winAccuracy);
      } else if (title === firstTower) {
        data = responseData.predictions.importance["firsttower"];
        setAccuracy(firstTowerAccuracy);
      } else if (title === firstBaron) {
        data = responseData.predictions.importance["firstbaron"];
        setAccuracy(firstBaronAccuracy);
      }
      data.sort((a, b) => b.Importance - a.Importance);

      const topFeatures = data.slice(0, top);
      setImportance(topFeatures);
      setChartTitle(title);
      setClickedLink(title);
    }
  };

  return (
    <div className="flex flex-col">
      {importance.length > 0 && (
        <div className="flex flex-nowrap justify-center gap-3">
          <div>
            <Link
              onClick={handleSetChartTitle(winTeam)}
              to="/"
              className={`block max-w-sm p-6 border rounded-lg shadow ${
                clickedLink === winTeam ? "bg-gray-700" : "bg-gray-800"
              } border-gray-700 hover:bg-gray-700`}
            >
              <h5
                className={`mb-2 text-2xl font-bold tracking-tight ${
                  winPrediction === "Blue Team"
                    ? "text-blue-500"
                    : "text-red-500"
                }`}
              >
                Winning Team: {winPrediction}
              </h5>
            </Link>
          </div>
          <div>
            <Link
              onClick={handleSetChartTitle(firstTower)}
              to="/"
              className={`block max-w-sm p-6 border rounded-lg shadow ${
                clickedLink === firstTower ? "bg-gray-700" : "bg-gray-800"
              } border-gray-700 hover:bg-gray-700`}
            >
              <h5
                className={`mb-2 text-2xl font-bold tracking-tight ${
                  firstTowerPrediction === "Blue Team"
                    ? "text-blue-500"
                    : "text-red-500"
                }`}
              >
                First Tower: {firstTowerPrediction}
              </h5>
            </Link>
          </div>
          <div>
            <Link
              onClick={handleSetChartTitle(firstBaron)}
              to="/"
              className={`block max-w-sm p-6 border rounded-lg shadow ${
                clickedLink === firstBaron ? "bg-gray-700" : "bg-gray-800"
              } border-gray-700 hover:bg-gray-700`}
            >
              <h5
                className={`mb-2 text-2xl font-bold tracking-tight ${
                  firstBaronPrediction === "Blue Team"
                    ? "text-blue-500"
                    : "text-red-500"
                }`}
              >
                First Baron: {firstBaronPrediction}
              </h5>
            </Link>
          </div>
        </div>
      )}
      <div className="flex flex-nowrap justify-center">
        {importance.length > 0 && (
          <div>
            <FeatureImportance
              title={chartTitle}
              importance_data={importance}
            />
            <div className="flex justify-center mt-5">
              <span className="text-sm text-gray-400">Min (1)</span>
              <input
                id="labels-range-input"
                type="range"
                value={top}
                min="1"
                max="20"
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700"
                onChange={handleChange}
              />
              <span className="text-sm text-gray-400">Max (20)</span>
            </div>
          </div>
        )}
        {importance.length > 0 && (
          <div>
            <SolidGaugeChart accuracy={accuracy}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default Predictions;
