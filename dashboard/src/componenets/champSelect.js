import { useEffect, useState } from "react";
import axios from "axios";
const ChampSelect = ({ team }) => {
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
  const teamlist = ["team1", "team2", "team3", "team4"];
  return (
    <form className="max-w-sm mx-auto">
      <div className="flex flex-col">
        <label for="countries" class="block mb-2 text-lg font-large">
          Select {team} side
        </label>
        <div className="mb-4">
          <select
            id="countries"
            className="w-full mr-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          >
            <option selected disabled>
              Choose a Team
            </option>
            {teamlist.map((Name) => (
              <option key={Name} value={Name}>
                {Name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <select
            id="countries"
            className="w-full mr-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          >
            <option selected disabled>
              Choose Toplaner
            </option>
            {championList.map((championName) => (
              <option key={championName} value={championName}>
                {championName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <select
            id="countries"
            className="w-full mr-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          >
            <option selected disabled>
              Choose Jungle
            </option>
            {championList.map((championName) => (
              <option key={championName} value={championName}>
                {championName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <select
            id="countries"
            className="w-full mr-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          >
            <option selected disabled>
              Choose Midlaner
            </option>
            {championList.map((championName) => (
              <option key={championName} value={championName}>
                {championName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <select
            id="countries"
            className="w-full mr-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          >
            <option selected disabled>
              Choose ADC
            </option>
            {championList.map((championName) => (
              <option key={championName} value={championName}>
                {championName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            id="countries"
            className="w-full bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          >
            <option selected disabled>
              Choose Support
            </option>
            {championList.map((championName) => (
              <option key={championName} value={championName}>
                {championName}
              </option>
            ))}
          </select>
        </div>
      </div>
    </form>
  );
};

export default ChampSelect;
