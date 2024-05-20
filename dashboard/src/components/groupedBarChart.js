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
        data: team1Data,
        color: "blue", // Set the color for the Blue Team bars
      },
      {
        name: "Red Team",
        data: team2Data,
        color: "red", // Set the color for the Red Team bars
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
