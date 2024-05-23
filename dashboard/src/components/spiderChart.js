import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const SpiderChart = ({
  player1Data,
  player2Data,
  normalizedPlayer1Data,
  normalizedPlayer2Data,
}) => {
  const options = {
    chart: {
      polar: true,
      type: "line",
    },
    title: {
      text: "",
    },
    pane: {
      size: "80%",
    },
    xAxis: {
      categories: [
        "Average Kills",
        "Average Assists",
        "Average Deaths",
        "Games Played",
        "Win Rate",
        "Average Gold/Min",
      ],
      tickmarkPlacement: "on",
      lineWidth: 0,
    },
    yAxis: {
      gridLineInterpolation: "polygon",
      lineWidth: 0,
      min: 0,
      max: 1,
    },
    legend: {
      align: "center",
      verticalAlign: "bottom",
      layout: "horizontal",
      itemStyle: {
        color: "white",
      },
    },
    tooltip: {
      formatter: function () {
        let actualData;
        if (this.series.name === "Blue Side") {
          actualData = player1Data[this.point.index];
        } else if (this.series.name === "Red Side") {
          actualData = player2Data[this.point.index];
        }
        return `<b>${this.series.name}</b><br/>${this.x}: ${actualData}`;
      },
    },
    series: [
      {
        name: "Blue Side",
        data: normalizedPlayer1Data,
        pointPlacement: "on",
        color: "#3366ff",
      },
      {
        name: "Red Side",
        data: normalizedPlayer2Data,
        pointPlacement: "on",
        color: "red",
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default SpiderChart;
