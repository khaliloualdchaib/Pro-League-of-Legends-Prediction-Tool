import React from "react";
import Highcharts, { color } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import drilldown from "highcharts/modules/drilldown";
drilldown(Highcharts);

Highcharts.theme = {
  chart: {
    backgroundColor: "#282c34",
  },
  title: {
    style: {
      color: "#E0E0E3",
      textTransform: "uppercase",
      fontSize: "20px",
    },
  },
  xAxis: {
    labels: {
      style: {
        color: "#E0E0E3",
      },
    },
  },
  yAxis: {
    gridLineColor: "#707073",
    labels: {
      style: {
        color: "#E0E0E3",
      },
    },
  },
  tooltip: {
    backgroundColor: "rgba(0, 0, 0)",
    style: {
      color: "#F0F0F0",
    },
  },
};

Highcharts.setOptions(Highcharts.theme);

const DrilldownChart = ({ title, importance_data }) => {
  const options = {
    chart: {
      type: "bar",
    },
    title: {
      text: title,
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      title: {
        text: "Values",
      },
    },

    series: [
      {
        name: "Main Chart",
        showInLegend: false,
        data: importance_data.map((importance) => ({
          name: importance.Feature,
          y: importance.Importance,
          drilldown: importance.Feature,
        })),
      },
    ],
    drilldown: {
      activeAxisLabelStyle: {
        color: "#12A9DB",
        textDecoration: "none",
      },
      series: importance_data.map((importance) => ({
        id: importance.Feature,
        type: "line",
        name: `${importance.Feature} Details`,
        showInLegend: false,
        data: [
          ["Metric 1", 10], // Placeholder data; replace with actual data
          ["Metric 2", 5],
          ["Metric 3", 8],
        ],
      })),
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default DrilldownChart;
