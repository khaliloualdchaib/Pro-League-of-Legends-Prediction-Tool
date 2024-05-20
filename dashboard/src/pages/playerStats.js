import SpiderChart from "../components/spiderChart";
import ChartTabs from "../components/chartTabs";
import React, { useState } from "react";
import GroupedBarChart from "../components/groupedBarChart";
const playerStats = {
  Team1: {
    Top: {
      Kills: 10,
      Assists: 5,
      Deaths: 2,
      GPM: 300,
      PlayedGames: 20,
      Winrate: 60,
    },
    Jungle: {
      Kills: 8,
      Assists: 7,
      Deaths: 3,
      GPM: 250,
      PlayedGames: 25,
      Winrate: 55,
    },
    Mid: {
      Kills: 15,
      Assists: 10,
      Deaths: 5,
      GPM: 400,
      PlayedGames: 30,
      Winrate: 70,
    },
    Bottom: {
      Kills: 12,
      Assists: 8,
      Deaths: 4,
      GPM: 350,
      PlayedGames: 28,
      Winrate: 65,
    },
    Support: {
      Kills: 5,
      Assists: 15,
      Deaths: 6,
      GPM: 200,
      PlayedGames: 22,
      Winrate: 58,
    },
  },
  Team2: {
    Top: {
      Kills: 11,
      Assists: 6,
      Deaths: 3,
      GPM: 310,
      PlayedGames: 21,
      Winrate: 62,
    },
    Jungle: {
      Kills: 9,
      Assists: 8,
      Deaths: 4,
      GPM: 260,
      PlayedGames: 26,
      Winrate: 57,
    },
    Mid: {
      Kills: 14,
      Assists: 9,
      Deaths: 5,
      GPM: 390,
      PlayedGames: 29,
      Winrate: 68,
    },
    Bottom: {
      Kills: 13,
      Assists: 7,
      Deaths: 5,
      GPM: 360,
      PlayedGames: 27,
      Winrate: 66,
    },
    Support: {
      Kills: 6,
      Assists: 14,
      Deaths: 7,
      GPM: 210,
      PlayedGames: 23,
      Winrate: 60,
    },
  },
};

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
    Kills: [],
    Assists: [],
    Deaths: [],
    PlayedGames: [],
    Winrate: [],
    GPM: [],
  };
  for (let role in data) {
    for (let metric in result) {
      result[metric].push(data[role][metric]);
    }
  }
  return result;
};

const PlayerStats = () => {
  const max = maxData(playerStats);
  const team1Data = prepareData(max, playerStats.Team1);
  const team2Data = prepareData(max, playerStats.Team2);
  const roles = ["Top", "Jungle", "Mid", "Bottom", "Support"];
  const stats = ["Kills", "Assists", "Deaths", "PlayedGames", "Winrate", "GPM"];

  const [selectedRole, setSelectedRole] = useState("Top");
  const [selectedStat, setSelectedStat] = useState("Kills");

  const barData1 = getBarData(playerStats.Team1);
  const barData2 = getBarData(playerStats.Team2);
  return (
    <div class="flex flex-row">
      <div className="basis-1/2">
        <div className="flex flex-col">
          <ChartTabs tabs={roles} onChange={setSelectedRole} />
          <SpiderChart
            player1Data={team1Data[selectedRole].normal}
            player2Data={team2Data[selectedRole].normal}
            normalizedPlayer1Data={team1Data[selectedRole].normalized}
            normalizedPlayer2Data={team2Data[selectedRole].normalized}
            currentRole={selectedRole}
          />
        </div>
      </div>
      <div className="basis-1/2">
        <div className="flex flex-col">
          <ChartTabs tabs={stats} onChange={setSelectedStat}></ChartTabs>
          <GroupedBarChart
            team1Data={barData1[selectedStat]}
            team2Data={barData2[selectedStat]}
            metric={selectedStat}
          ></GroupedBarChart>
        </div>
      </div>
    </div>
  );
};

export default PlayerStats;
