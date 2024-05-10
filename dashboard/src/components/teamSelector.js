import RoleSelector from "./roleSelector";
import React, {useEffect, useState } from "react";
import axios from "axios";
import Autocomplete from "./autoComplete";

const TeamSelector = () => {
  const url_teams = "http://127.0.0.1:5000/api/teams";
  const [teamlist, setTeamList] = useState([])
  const [selectedTeam, setSelectedTeam] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(url_teams);
        setTeamList(response1.data.teams);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
  };
  return (
    <form>
      <div>
        <Autocomplete suggestions={teamlist} onSuggestionSelect={handleTeamSelect}/>
      </div>
      <div class="flex flex-nowrap">
        <div>
          <RoleSelector role={"Top"} team={selectedTeam}></RoleSelector>
        </div>
        <div>
          <RoleSelector role={"Jungle"} team={selectedTeam}></RoleSelector>
        </div>
        <div>
          <RoleSelector role={"Mid"} team={selectedTeam}></RoleSelector>
        </div>
        <div>
          <RoleSelector role={"Bottom"} team={selectedTeam}></RoleSelector>
        </div>
        <div>
          <RoleSelector role={"Support"} team={selectedTeam}></RoleSelector>
        </div>
      </div>
    </form>
  );
};

export default TeamSelector;
