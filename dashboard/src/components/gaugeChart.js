import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";
import SolidGauge from "highcharts/modules/solid-gauge";

HighchartsMore(Highcharts);
SolidGauge(Highcharts); // Initialize the solid gauge module

const SolidGaugeChart = ({accuracy}) => {
  const options = {
    chart: {
      type: "solidgauge",
    },
    title: {
      text: "",
    },
    pane: {
      center: ["50%", "85%"], // Centered vertically
      size: "100%", // Adjust size to better fit the container
      startAngle: -90,
      endAngle: 90,
      background: {
        backgroundColor: "#EEE",
        innerRadius: "60%",
        outerRadius: "100%",
        shape: "arc",
      },
    },
    tooltip: {
      enabled: false,
    },
    yAxis: {
      min: 0, // Set the minimum value of the yAxis
      max: 100, // Set the maximum value of the yAxis to match the gauge scale
      stops: [
        [1, "#4572A7"] // Blue
      ],
      lineWidth: 0,
      minorTickInterval: null,
      tickAmount: 2,
      title: {
        y: -70,
      },
      labels: {
        y: 16,
      },
    },
    series: [
      {
        name: "Speed",
        data: [accuracy],
        dataLabels: {
          format:
            '<div style="text-align:center;color: white;"><span style="font-size:30px">{y}%</span><br/>Model<br/>Accuracy</div>',
          borderWidth: 0,
          borderColor: "black",
        },
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default SolidGaugeChart;
