import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const GroupedBarChart = ({ team1Data, team2Data, metric }) => {
  const options = {
    chart: {
      type: "column",
    },
    title: {
      text:
        "Kills" === metric || "Assists" === metric || "Deaths" === metric || "GPM" === metric
          ? metric + " Averages"
          : metric,
    },
    xAxis: {
      categories: ["Top", "Jungle", "Mid", "Bottom", "Support"],
    },
    yAxis: {
      title: {
        text: "GPM" === metric ? "Gold/Min" : metric,
      },
    },
    series: [
      {
        name: "Blue Team",
        data: [team1Data.Top, team1Data.Jungle, team1Data.Mid, team1Data.Bottom, team1Data.Support],
        color: "#3366ff",
      },
      {
        name: "Red Team",
        data: [team2Data.Top, team2Data.Jungle, team2Data.Mid, team2Data.Bottom, team2Data.Support],
        color: "red",
      },
    ],
    legend: {
      itemStyle: {
        color: "white",
      },
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default GroupedBarChart;
