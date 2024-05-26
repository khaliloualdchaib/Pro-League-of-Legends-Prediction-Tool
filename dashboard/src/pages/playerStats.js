import SpiderChart from "../components/spiderChart";
import ChartTabs from "../components/chartTabs";
import React, { useState, useContext, useEffect } from "react";
import GroupedBarChart from "../components/groupedBarChart";
import { ResponseContext } from "../components/ResponseContext";
import { ClickContext } from "../components/ClickContext";

const maxData = (data) => {
  let maxKills = 0;
  let maxAssists = 0;
  let maxDeaths = 0;
  let maxGPM = 0;
  let maxPlayedGames = 0;
  let maxWinrate = 0;
  for (const team in data) {
    for (const role in data[team]) {
      const stats = data[team][role];
      if (stats.Kills > maxKills) maxKills = stats.Kills;
      if (stats.Assists > maxAssists) maxAssists = stats.Assists;
      if (stats.Deaths > maxDeaths) maxDeaths = stats.Deaths;
      if (stats.GPM > maxGPM) maxGPM = stats.GPM;
      if (stats.PlayedGames > maxPlayedGames)
        maxPlayedGames = stats.PlayedGames;
      if (stats.Winrate > maxWinrate) maxWinrate = stats.Winrate;
    }
  }

  return {
    maxKills: maxKills,
    maxAssists: maxAssists,
    maxDeaths: maxDeaths,
    maxGPM: maxGPM,
    maxPlayedGames: maxPlayedGames,
    maxWinrate: maxWinrate,
  };
};

const prepareData = (maxdata, team) => {
  const data = {};
  for (let role in team) {
    data[role] = {};
    data[role]["normal"] = [
      team[role].Kills,
      team[role].Assists,
      team[role].Deaths,
      team[role].PlayedGames,
      team[role].Winrate,
      team[role].GPM,
    ];
    data[role]["normalized"] = [
      team[role].Kills / maxdata.maxKills,
      team[role].Assists / maxdata.maxAssists,
      team[role].Deaths / maxdata.maxDeaths,
      team[role].PlayedGames / maxdata.maxPlayedGames,
      team[role].Winrate / maxdata.maxWinrate,
      team[role].GPM / maxdata.maxGPM,
    ];
  }
  return data;
};
const getBarData = (data) => {
  const result = {
    Kills: {},
    Assists: {},
    Deaths: {},
    PlayedGames: {},
    Winrate: {},
    GPM: {},
  };
  for (let role in data) {
    for (let metric in result) {
      result[metric][role] = data[role][metric]
    }
  }
  console.log(result)
  return result;
};

const PlayerStats = () => {
  const roles = ["Top", "Jungle", "Mid", "Bottom", "Support"];
  const stats = ["Kills", "Assists", "Deaths", "PlayedGames", "Winrate", "GPM"];

  const [selectedRole, setSelectedRole] = useState("Top");
  const [selectedStat, setSelectedStat] = useState("Kills");
  const [team1SpiderData, setTeam1SpiderData] = useState({});
  const [team2SpiderData, setTeam2SpiderData] = useState({});
  const [team1BarData, setTeam1BarData] = useState({});
  const [team2BarData, setTeam2BarData] = useState({});
  const { responseData } = useContext(ResponseContext);
  const { isClicked } = useContext(ClickContext);

  useEffect(() => {
    const init = () => {
      if (isClicked && responseData) {
        const stats = responseData.playerStats;
        const max = maxData(stats);
        const team1Data = prepareData(max, stats.Team1);
        const team2Data = prepareData(max, stats.Team2);
        const barData1 = getBarData(stats.Team1);
        const barData2 = getBarData(stats.Team2);
        setTeam1SpiderData(team1Data);
        setTeam2SpiderData(team2Data);
        setTeam1BarData(barData1);
        setTeam2BarData(barData2);
      }
    };
    init();
  }, [isClicked, responseData, selectedRole, selectedStat]);
  return (
    <>
      <h1>Player statistics with the chosen champion</h1>
      {Object.keys(team1SpiderData).length > 0 && (
        <div class="flex flex-row">
          <div className="basis-1/2">
            <div className="flex flex-col">
              <ChartTabs tabs={roles} onChange={setSelectedRole} />
              <SpiderChart
                player1Data={team1SpiderData[selectedRole].normal}
                player2Data={team2SpiderData[selectedRole].normal}
                normalizedPlayer1Data={team1SpiderData[selectedRole].normalized}
                normalizedPlayer2Data={team2SpiderData[selectedRole].normalized}
              />
            </div>
          </div>
          <div className="basis-1/2">
            <div className="flex flex-col">
              <ChartTabs tabs={stats} onChange={setSelectedStat}></ChartTabs>
              <GroupedBarChart
                team1Data={team1BarData[selectedStat]}
                team2Data={team2BarData[selectedStat]}
                metric={selectedStat}
              ></GroupedBarChart>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlayerStats;
