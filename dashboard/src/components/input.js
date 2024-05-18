import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Autocomplete from "./autoComplete";
import { ClickContext } from "./ClickContext";
import { ResponseContext } from "./ResponseContext";

const get_players = async (team) => {
  try {
    const url_players = "http://127.0.0.1:5000/api/players?team=" + team;
    const response = await axios.get(url_players);
    console.log(response);
    const comp = {
      Top: response.data["top"].reverse(),
      Jungle: response.data["jng"].reverse(),
      Mid: response.data["mid"].reverse(),
      Bottom: response.data["bot"].reverse(),
      Support: response.data["sup"].reverse(),
    };
    console.log(comp);
    return comp;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const Input = () => {
  const { setIsClicked } = useContext(ClickContext);
  const { setResponseData } = useContext(ResponseContext);
  const roles = ["Top", "Jungle", "Mid", "Bottom", "Support"];
  const patch = "14.9.1";
  const url_teams = "http://127.0.0.1:5000/api/teams";
  const url_champs =
    "http://ddragon.leagueoflegends.com/cdn/" +
    patch +
    "/data/en_US/champion.json";

  //List of all the teams
  const [teamlist, setTeamList] = useState([]);
  //List of all the champs
  const [championList, setChampionList] = useState([]);

  //Players of each team, is a json where key is role and value is list of players in that role
  const [players1, setPlayers1] = useState({});
  const [players2, setPlayers2] = useState({});

  //Players that are selected for the request key role and value the player
  const [selectedPlayers1, setSelectedPlayers1] = useState({});
  const [selectedPlayers2, setSelectedPlayers2] = useState({});

  //Selected teams for the match
  const [selectedTeam1, setSelectedTeam1] = useState("");
  const [selectedTeam2, setSelectedTeam2] = useState("");

  //champs chosen for each role by each team
  const [selectedTop1, setSelectedTop1] = useState("");
  const [selectedJungle1, setSelectedJungle1] = useState("");
  const [selectedMid1, setSelectedMid1] = useState("");
  const [selectedADC1, setSelectedADC1] = useState("");
  const [selectedSupport1, setSelectedSupport1] = useState("");

  const [selectedTop2, setSelectedTop2] = useState("");
  const [selectedJungle2, setSelectedJungle2] = useState("");
  const [selectedMid2, setSelectedMid2] = useState("");
  const [selectedADC2, setSelectedADC2] = useState("");
  const [selectedSupport2, setSelectedSupport2] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(url_teams);
        setTeamList(response1.data.teams);
        const response2 = await axios.get(url_champs);
        const champions = Object.keys(response2.data.data);
        setChampionList(champions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [url_champs]);

  const formSubmit = async (event) => {
    event.preventDefault();
    setIsClicked(true);
    const champComp1 = {
      Top: selectedTop1,
      Jungle: selectedJungle1,
      Mid: selectedMid1,
      Bottom: selectedADC1,
      Support: selectedSupport1,
    };
    const champComp2 = {
      Top: selectedTop2,
      Jungle: selectedJungle2,
      Mid: selectedMid2,
      Bottom: selectedADC2,
      Support: selectedSupport2,
    };

    const big_url =
      "http://127.0.0.1:5000/api/main?team1Players=" +
      encodeURIComponent(JSON.stringify(selectedPlayers1)) +
      "&team1Champs=" +
      encodeURIComponent(JSON.stringify(champComp1)) +
      "&team2Players=" +
      encodeURIComponent(JSON.stringify(selectedPlayers2)) +
      "&team2Champs=" +
      encodeURIComponent(JSON.stringify(champComp2));

    try {
      const response = await axios.get(big_url);
      //console.log(response.data);
      setResponseData(response.data);
    } catch (error) {
      console.error("There was an error with the request:", error);
    }
  };

  const handleTeam1Select = async (team) => {
    setSelectedTeam1(team);
    const tmp = await get_players(team);
    setPlayers1(tmp);
    const currentPlayers = {
      Top: tmp["Top"][0],
      Jungle: tmp["Jungle"][0],
      Mid: tmp["Mid"][0],
      Bottom: tmp["Bottom"][0],
      Support: tmp["Support"][0],
    };
    setSelectedPlayers1(currentPlayers);
  };

  const handleTeam2Select = async (team) => {
    setSelectedTeam2(team);
    const tmp = await get_players(team);
    setPlayers2(tmp);
    const currentPlayers = {
      Top: tmp["Top"][0],
      Jungle: tmp["Jungle"][0],
      Mid: tmp["Mid"][0],
      Bottom: tmp["Bottom"][0],
      Support: tmp["Support"][0],
    };
    setSelectedPlayers2(currentPlayers);
  };

  const handleTop1Select = (champ) => {
    setSelectedTop1(champ);
  };
  const handleTop2Select = (champ) => {
    setSelectedTop2(champ);
  };

  const handleJungle1Select = (champ) => {
    setSelectedJungle1(champ);
  };

  const handleJungle2Select = (champ) => {
    setSelectedJungle2(champ);
  };

  const handleMid1Select = (champ) => {
    setSelectedMid1(champ);
  };

  const handleMid2Select = (champ) => {
    setSelectedMid2(champ);
  };

  const handleADC1Select = (champ) => {
    setSelectedADC1(champ);
  };

  const handleADC2Select = (champ) => {
    setSelectedADC2(champ);
  };

  const handleSupport1Select = (champ) => {
    setSelectedSupport1(champ);
  };
  const handleSupport2Select = (champ) => {
    setSelectedSupport2(champ);
  };

  const champSelect1 = [
    handleTop1Select,
    handleJungle1Select,
    handleMid1Select,
    handleADC1Select,
    handleSupport1Select,
  ];

  const champSelect2 = [
    handleTop2Select,
    handleJungle2Select,
    handleMid2Select,
    handleADC2Select,
    handleSupport2Select,
  ];
  return (
    <form>
      <div class="flex flex-nowrap justify-center">
        <div class="flex flex-col">
          <div>
            <Autocomplete
              suggestions={teamlist}
              onSuggestionSelect={handleTeam1Select}
            />
          </div>
          <div className="flex flex-nowrap">
            {champSelect1.map((selecthandler) => (
              <div key={selecthandler}>
                <Autocomplete
                  suggestions={championList}
                  onSuggestionSelect={selecthandler}
                />
              </div>
            ))}
          </div>
          {selectedTeam1 && (
            <div className="flex flex-basis">
              {roles.map((role) => (
                <div className="basis-1/2" key={role}>
                  <select
                    id="countries"
                    class=" border text-sm block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  >
                    {players1[role]?.map(
                      (
                        player // Add optional chaining here
                      ) => (
                        <option key={player} value={player}>
                          {player}
                        </option>
                      )
                    )}
                  </select>
                </div>
              ))}
            </div>
          )}
        </div>
        <div class="flex flex-col">
          <div>
            <Autocomplete
              suggestions={teamlist}
              onSuggestionSelect={handleTeam2Select}
            />
          </div>
          <div className="flex flex-nowrap">
            {champSelect2.map((selecthandler) => (
              <div key={selecthandler}>
                <Autocomplete
                  suggestions={championList}
                  onSuggestionSelect={selecthandler}
                />
              </div>
            ))}
          </div>
          {selectedTeam2 && (
            <div className="flex flex-basis">
              {roles.map((role) => (
                <div className="basis-1/2" key={role}>
                  <select
                    id="countries"
                    className="border text-sm block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  >
                    {players2[role]?.map((player) => (
                      <option key={player} value={player}>
                        {player}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <button
        onClick={formSubmit}
        type="submit"
        class="border w-full focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700"
      >
        UPDATE
      </button>
    </form>
  );
};

export default Input;
