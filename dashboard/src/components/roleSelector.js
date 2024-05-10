import { useEffect, useState } from "react";
import axios from "axios";
const RoleSelector = ({ role }) => {
  const patch = "14.9.1";
  const url_champs =
    "http://ddragon.leagueoflegends.com/cdn/" +
    patch +
    "/data/en_US/champion.json";
  //const url_teams = "http://127.0.0.1:5000/api/teams"

  //const [teams, setTeams] = useState([])
  const [championList, setChampionList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(url_champs);
        // Extract champion names from the data object
        const champions = Object.keys(response1.data.data);
        setChampionList(champions);

        //const response2 = await axios.get(url_teams)
        //console.log(response2.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [url_champs]); // Added url to the dependency array
  return (
    <div className="flex flex-col">
      <div>
        <select className="w-full mr-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
          <option selected disabled>
            Choose {role}
          </option>
          {championList.map((championName) => (
            <option key={championName} value={championName}>
              {championName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select className="w-full mr-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
          <option selected disabled>
            Choose Player
          </option>
        </select>
      </div>
    </div>
  );
};

export default RoleSelector;
