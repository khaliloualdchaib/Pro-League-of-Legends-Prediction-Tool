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
const prepareChartData = (size, role, data, team) => {
  const statList = data[team][role].slice(0, size);
  const result = {
    kills: [],
    assists: [],
    deaths: [],
    teamKills: [],
    goldEarned: [],
  };
  for (let i = 0; i < statList.length; i++) {
    result.kills.push(statList[i].kills);
    result.assists.push(statList[i].assists);
    result.deaths.push(statList[i].deaths);
    result.teamKills.push(statList[i].teamkills);
    result.goldEarned.push(statList[i].earned_gpm);
  }
  console.log(result);
  return result;
};

const RecentGames = () => {
  const { responseData } = useContext(ResponseContext);
  const { isClicked } = useContext(ClickContext);
  const [isBlueChecked, setIsBlueChecked] = useState(true);
  const [isRedChecked, setIsRedChecked] = useState(false);
  const [maxMatches, setMaxMatches] = useState(0);
  const [sliderValue, setSliderValue] = useState(maxMatches);
  const [selectedRadio, setSelectedRadio] = useState("Top");
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
  const handleRadioChange = (event) => {
    setSelectedRadio(event.target.value);
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
        <div className="mt-1">
          <ul class="items-center w-full text-sm font-medium border rounded-lg sm:flex bg-gray-700 border-gray-600 text-white">
            <li class="w-full border-b sm:border-b-0 sm:border-r border-gray-600">
              <div class="flex items-center ps-3">
                <input
                  id="horizontal-list-radio-license"
                  type="radio"
                  name="list-radio"
                  class="w-4 h-4 text-blue-600 focus:ring-blue-600 ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500"
                  value="Top"
                  checked={selectedRadio === "Top"}
                  onChange={handleRadioChange}
                ></input>
                <label
                  for="horizontal-list-radio-license"
                  class="w-full py-3 ms-2 text-sm font-medium text-gray-300"
                >
                  Top
                </label>
              </div>
            </li>
            <li class="w-full border-b sm:border-b-0 sm:border-r border-gray-600">
              <div class="flex items-center ps-3">
                <input
                  id="horizontal-list-radio-license"
                  type="radio"
                  name="list-radio"
                  class="w-4 h-4 text-blue-600 focus:ring-blue-600 ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500"
                  value="Jungle"
                  checked={selectedRadio === "Jungle"}
                  onChange={handleRadioChange}
                ></input>
                <label
                  for="horizontal-list-radio-license"
                  class="w-full py-3 ms-2 text-sm font-medium text-gray-300"
                >
                  Jungle
                </label>
              </div>
            </li>
            <li class="w-full border-b sm:border-b-0 sm:border-r border-gray-600">
              <div class="flex items-center ps-3">
                <input
                  id="horizontal-list-radio-license"
                  type="radio"
                  name="list-radio"
                  class="w-4 h-4 text-blue-600 focus:ring-blue-600 ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500"
                  value="Mid"
                  checked={selectedRadio === "Mid"}
                  onChange={handleRadioChange}
                ></input>
                <label
                  for="horizontal-list-radio-license"
                  class="w-full py-3 ms-2 text-sm font-medium text-gray-300"
                >
                  Mid
                </label>
              </div>
            </li>
            <li class="w-full border-b sm:border-b-0 sm:border-r border-gray-600">
              <div class="flex items-center ps-3">
                <input
                  id="horizontal-list-radio-license"
                  type="radio"
                  name="list-radio"
                  class="w-4 h-4 text-blue-600 focus:ring-blue-600 ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500"
                  value="Bottom"
                  checked={selectedRadio === "Bottom"}
                  onChange={handleRadioChange}
                ></input>
                <label
                  for="horizontal-list-radio-license"
                  class="w-full py-3 ms-2 text-sm font-medium text-gray-300"
                >
                  Bottom
                </label>
              </div>
            </li>
            <li class="w-full border-b sm:border-b-0 sm:border-r border-gray-600">
              <div class="flex items-center ps-3">
                <input
                  id="horizontal-list-radio-license"
                  type="radio"
                  name="list-radio"
                  class="w-4 h-4 text-blue-600 focus:ring-blue-600 ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500"
                  value="Support"
                  checked={selectedRadio === "Support"}
                  onChange={handleRadioChange}
                ></input>
                <label
                  for="horizontal-list-radio-license"
                  class="w-full py-3 ms-2 text-sm font-medium text-gray-300"
                >
                  Support
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
                  team={selectedRadio + " Blue Side Team"}
                  titlecolor={"blue"}
                  data={prepareChartData(
                    sliderValue,
                    selectedRadio,
                    pageData,
                    "Team1"
                  )}
                ></LineChart>
              </div>
            )}
            {isRedChecked && (
              <div className="basis-1/2 w-full">
                <LineChart
                  nGames={sliderValue}
                  team={selectedRadio +" Red Side Team"}
                  titlecolor={"red"}
                  data={prepareChartData(
                    sliderValue,
                    selectedRadio,
                    pageData,
                    "Team2"
                  )}
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
