

import { useEffect, useState } from "react";
import axios from "axios";
import Autocomplete from "./autoComplete";

const RoleSelector = ({ role, team }) => {
  const patch = "14.9.1";
  const url_champs =
    "http://ddragon.leagueoflegends.com/cdn/" +
    patch +
    "/data/en_US/champion.json";
  const url_players = team ? "http://127.0.0.1:5000/api/players?team=" + team : "";
  const [championList, setChampionList] = useState([]);
  const [players, setPlayers] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(url_champs);
        const champions = Object.keys(response1.data.data);
        
        if (team) {
          const response2 = await axios.get(url_players);
          let players_current_role = "";
          if (role === "Top"){
            players_current_role = response2.data["top"];
          } else if (role === "Jungle"){
            players_current_role = response2.data["jng"];
          } else if (role === "Mid"){
            players_current_role = response2.data["mid"];
          } else if (role === "Bottom"){
            players_current_role = response2.data["bot"];
          } else {
            players_current_role = response2.data["sup"];
          }
          players_current_role.reverse();
          setPlayers(players_current_role);
        }
        
        setChampionList(champions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  },);

  const handleChampionSelect = () => {};
  return (
    <div className="flex flex-col">
      <div>
        <Autocomplete suggestions={championList} onSuggestionSelect={handleChampionSelect}/>
      </div>
      {team && (
        <div>
          <select className="w-full mr-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
            {players.map((player) => (
              <option key={player} value={player}>
                {player}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default RoleSelector;
