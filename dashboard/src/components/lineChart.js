import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const LineChart = ({ team, nGames, titlecolor, data }) => {
  const categories = Array.from({ length: nGames }, (_, i) => i + 1);
  const options = {
    chart: {
      type: "line",
    },
    title: {
      text: "Last " + nGames + " Game(s) of " + team,
      style: {
        color: titlecolor
      }
    },
    xAxis: {
      categories: categories,
      title: {
        text: "Games",
      },
    },
    yAxis: {
      title: {
        text: "Statistics",
      },
    },
    legend: {
      itemStyle: {
        color: "white",
      },
    },
    series: [
      {
        name: "Kills",
        data: data.kills,
      },
      {
        name: "Assists",
        data: data.assists,
      },
      {
        name: "Deaths",
        data: data.deaths,
      },
      {
        name: "Team Kills",
        data: data.teamKills, 
      },
    ],
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default LineChart;
