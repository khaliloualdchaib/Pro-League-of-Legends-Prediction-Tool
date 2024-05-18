import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import DrilldownChart from "../components/drillDownChart";
import { ResponseContext } from "../components/ResponseContext";
import { ClickContext } from "../components/ClickContext";

const Predictions = () => {
  const winTeam = "Winning Team Feature Ranking"
  const firstTower =  "First Tower Feature Ranking"
  const firstBaron = "First Baron Feature Ranking"

  const [chartTitle, setChartTitle] = useState(winTeam);
  const { responseData } = useContext(ResponseContext);
  const { isClicked } = useContext(ClickContext);

  const [importance, setImportance] = useState([]);



  useEffect(() => {
    const init = () => {
      if (isClicked && responseData) {
        const data = responseData.predictions.importance["result"];
        data.sort((a, b) => b.Importance - a.Importance);

        const topFeatures = data.slice(0, 10);
        setImportance(topFeatures);
      }
    };
    init();
  }, [isClicked, responseData]);

  const handleSetChartTitle = (title) => () => {
    if (responseData && isClicked) {
      if (title === winTeam) {
        const data = responseData.predictions.importance["result"];
        data.sort((a, b) => b.Importance - a.Importance);

        const topFeatures = data.slice(0, 10);
        setImportance(topFeatures);
      } else if (title === firstTower) {
        const data = responseData.predictions.importance["firsttower"];
        data.sort((a, b) => b.Importance - a.Importance);

        const topFeatures = data.slice(0, 10);
        setImportance(topFeatures);
      } else if (title === firstBaron) {
        const data = responseData.predictions.importance["firstbaron"];
        data.sort((a, b) => b.Importance - a.Importance);

        const topFeatures = data.slice(0, 10);
        setImportance(topFeatures);
      }
    }
    setChartTitle(title);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-nowrap justify-center gap-3">
        <div>
          <Link
            onClick={handleSetChartTitle(winTeam)}
            to="/"
            className="block max-w-sm p-6 border rounded-lg shadow bg-gray-800 border-gray-700 hover:bg-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
              Winning Team: Blue Team
            </h5>
          </Link>
        </div>
        <div>
          <Link
            onClick={handleSetChartTitle(firstTower)}
            to="/"
            className="block max-w-sm p-6 border rounded-lg shadow bg-gray-800 border-gray-700 hover:bg-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
              First Tower: Blue Team
            </h5>
          </Link>
        </div>
        <div>
          <Link
            onClick={handleSetChartTitle(firstBaron)}
            to="/"
            className="block max-w-sm p-6 border rounded-lg shadow bg-gray-800 border-gray-700 hover:bg-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
              First Baron: Blue Team
            </h5>
          </Link>
        </div>
      </div>
      {importance.length > 0 && (
        <DrilldownChart title={chartTitle} importance_data={importance} />
      )}
    </div>
  );
};

export default Predictions;
