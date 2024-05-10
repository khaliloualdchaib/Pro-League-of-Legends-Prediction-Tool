import { useEffect, useState } from "react";
import axios from "axios";
import Autocomplete from "./autoComplete";
const suggestions = ["Apple", "Banana", "Orange", "Pear", "Pineapple"];
const RoleSelector = ({ role }) => {
  const patch = "14.9.1";
  const url_champs =
    "http://ddragon.leagueoflegends.com/cdn/" +
    patch +
    "/data/en_US/champion.json";
  const [championList, setChampionList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(url_champs);
        const champions = Object.keys(response1.data.data);
        setChampionList(champions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="flex flex-col">
      <div>
        <select className="w-full mr-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
          <option selected disabled>
            {role}
          </option>
          {championList.map((championName) => (
            <option key={championName} value={championName}>
              {championName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Autocomplete suggestions={suggestions} />
      </div>
    </div>
  );
};

export default RoleSelector;
