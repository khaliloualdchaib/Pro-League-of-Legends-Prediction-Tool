import React, { useState, useEffect, useContext } from "react";
import LineChart from "../components/lineChart";
import { ResponseContext } from "../components/ResponseContext";
import { ClickContext } from "../components/ClickContext";
const getMinMatches = (data) => {
  let MinValue = Infinity;
  for (let team in data) {
    for (let role in data[team]) {
      if (data[team][role].length < MinValue) {
        MinValue = data[team][role].length;
      }
    }
  }
  return MinValue;
};
const prepareChartData = (size, data, team) => {
  //data.reverse();
  //let cutData = data.slice(0, size);
  const statList = data[team];
  const result = {
    Top: [],
    Jungle: [],
    Mid: [],
    Bottom: [],
    Support: [],
  };
  for (let role in statList) {
    let tmp = statList[role]
    tmp.reverse()
    tmp = tmp.slice(0, size)
    result[role] = tmp
  }
  console.log(result)
  return result;
};

const RecentGames = () => {
  const { responseData } = useContext(ResponseContext);
  const { isClicked } = useContext(ClickContext);
  const [isBlueChecked, setIsBlueChecked] = useState(true);
  const [isRedChecked, setIsRedChecked] = useState(false);
  const [maxMatches, setMaxMatches] = useState(0);
  const [sliderValue, setSliderValue] = useState(maxMatches);
  const [pageData, setPageData] = useState({});

  const handleSliderChange = (event) => {
    setSliderValue(parseInt(event.target.value));
  };
  const handleBlueCheckboxChange = (event) => {
    setIsBlueChecked(event.target.checked); // Update checked status
  };
  const handleRedCheckboxChange = (event) => {
    setIsRedChecked(event.target.checked); // Update checked status
  };

  useEffect(() => {
    const init = () => {
      if (isClicked && responseData) {
        const stats = responseData.recentGames;
        setMaxMatches(getMinMatches(stats));
        setPageData(stats);
        if (maxMatches >= 5) {
          setSliderValue(5); // Set slider value to 5 if minMatches is greater than or equal to 5
        } else {
          setSliderValue(maxMatches); // Set slider value to minMatches if it is less than 5
        }
      }
    };
    init();
  }, [isClicked, responseData, maxMatches]);

  return (
    Object.keys(pageData).length > 0 && (
      <div class="flex flex-col">
        <div>
          <ul class="items-center w-full text-sm font-medium border rounded-lg sm:flex bg-gray-700 border-gray-600 text-white">
            <li class="w-full border-b sm:border-b-0 sm:border-r border-gray-600">
              <div class="flex items-center ps-3">
                <input
                  id="vue-checkbox-list"
                  type="checkbox"
                  value=""
                  checked={isBlueChecked}
                  onChange={handleBlueCheckboxChange}
                  class="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500"
                ></input>
                <label
                  for="vue-checkbox-list"
                  class="w-full py-3 ms-2 text-sm font-medium text-gray-300"
                >
                  Blue side
                </label>
              </div>
            </li>
            <li class="w-full border-b sm:border-b-0 sm:border-r border-gray-600">
              <div class="flex items-center ps-3">
                <input
                  id="react-checkbox-list"
                  type="checkbox"
                  value=""
                  checked={isRedChecked}
                  onChange={handleRedCheckboxChange}
                  class="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500"
                ></input>
                <label
                  for="react-checkbox-list"
                  class="w-full py-3 ms-2 text-sm font-medium text-gray-300"
                >
                  Red Side
                </label>
              </div>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-center mt-5">
          <input
            id="labels-range-input"
            type="range"
            min="0"
            max={maxMatches}
            value={sliderValue}
            onChange={handleSliderChange}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700"
          />
        </div>
        <div className="mt-5">
          <div class="flex flex-row justify-center">
            {isBlueChecked && (
              <div className="basis-1/2 w-full">
                <LineChart
                  nGames={sliderValue}
                  team={" Blue Side Team"}
                  titlecolor={"#3366ff"}
                  data={prepareChartData(sliderValue, pageData, "Team1")}
                ></LineChart>
              </div>
            )}
            {isRedChecked && (
              <div className="basis-1/2 w-full">
                <LineChart
                  nGames={sliderValue}
                  team={" Red Side Team"}
                  titlecolor={"red"}
                  data={prepareChartData(sliderValue, pageData, "Team2")}
                ></LineChart>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default RecentGames;
