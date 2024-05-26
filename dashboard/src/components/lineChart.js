import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const LineChart = ({ team, nGames, titlecolor, data }) => {
  const categories = Array.from({ length: nGames }, (_, i) => nGames - i);
  const options = {
    chart: {
      type: "line",
    },
    title: {
      text: "Last " + nGames + " Game(s) of " + team,
      style: {
        color: titlecolor,
      },
    },
    xAxis: {
      categories: categories,
      title: {
        text: "Games",
      },
    },
    yAxis: {
      title: {
        text: "KDA",
      },
    },
    legend: {
      itemStyle: {
        color: "white",
      },
    },
    series: [
      {
        name: "Top",
        data: data.Top,
      },
      {
        name: "Jungle",
        data: data.Jungle,
      },
      {
        name: "Mid",
        data: data.Mid,
      },
      {
        name: "Bottom",
        data: data.Bottom,
      },
      {
        name: "Support",
        data: data.Support,
      },
    ],
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default LineChart;
