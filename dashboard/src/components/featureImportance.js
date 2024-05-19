import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

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

const FeatureImportance = ({ title, importance_data }) => {
  const label_completer = {
    // Blue side
    Bluetopwr: "Blue side Top Win rate Importance",
    Bluejngwr: "Blue side Jungle Win rate Importance",
    Bluemidwr: "Blue side Mid Win rate Importance",
    Bluebotwr: "Blue side ADC Win rate Importance",
    Bluesupwr: "Blue side Support Win rate Importance",
    Bluetopgolddiffat15: "Blue side Top gold difference at min15 Importance",
    Bluetopgolddiffat10: "Blue side Top gold difference at min10 Importance",
    Bluejnggolddiffat15: "Blue side Jungle gold difference at min15 Importance",
    Bluejnggolddiffat10: "Blue side Jungle gold difference at min10 Importance",
    Bluemidgolddiffat15: "Blue side Mid gold difference at min15 Importance",
    Bluemidgolddiffat10: "Blue side Mid gold difference at min10 Importance",
    Bluebotgolddiffat15: "Blue side ADC gold difference at min15 Importance",
    Bluebotgolddiffat10: "Blue side ADC gold difference at min10 Importance",
    Bluesupgolddiffat15:
      "Blue side Support gold difference at min15 Importance",
    Bluesupgolddiffat10:
      "Blue side Support gold difference at min10 Importance",
    Bluetopgp: "Blue side Top games played on that champ Importance",
    Bluejnggp: "Blue side Jungle games played on that champ Importance",
    Bluemidgp: "Blue side Mid games played on that champ Importance",
    Bluebotgp: "Blue side ADC games played on that champ Importance",
    Bluesupgp: "Blue side Support games played on that champ Importance",
    Bluetopkda: "Blue side Top KDA Importance",
    Bluetopkda10: "Blue side Top KDA at min10 Importance",
    Bluetopkda15: "Blue side Top KDA at min15 Importance",
    Bluejngkda: "Blue side Jungle KDA Importance",
    Bluejngkda10: "Blue side Jungle KDA at min10 Importance",
    Bluejngkda15: "Blue side Jungle KDA at min15 Importance",
    Bluemidkda: "Blue side Mid KDA Importance",
    Bluemidkda10: "Blue side Mid KDA at min10 Importance",
    Bluemidkda15: "Blue side Mid KDA at min15 Importance",
    Bluebotkda: "Blue side ADC KDA Importance",
    Bluebotkda10: "Blue side ADC KDA at min10 Importance",
    Bluebotkda15: "Blue side ADC KDA at min15 Importance",
    Bluesupkda: "Blue side Support KDA Importance",
    Bluesupkda10: "Blue side Support KDA at min10 Importance",
    Bluesupkda15: "Blue side Support KDA at min15 Importance",

    // Red side
    Redtopwr: "Red side Top Win rate Importance",
    Redjngwr: "Red side Jungle Win rate Importance",
    Redmidwr: "Red side Mid Win rate Importance",
    Redbotwr: "Red side ADC Win rate Importance",
    Redsupwr: "Red side Support Win rate Importance",
    Redtopgolddiffat15: "Red side Top gold difference at min15 Importance",
    Redtopgolddiffat10: "Red side Top gold difference at min10 Importance",
    Redjnggolddiffat15: "Red side Jungle gold difference at min15 Importance",
    Redjnggolddiffat10: "Red side Jungle gold difference at min10 Importance",
    Redmidgolddiffat15: "Red side Mid gold difference at min15 Importance",
    Redmidgolddiffat10: "Red side Mid gold difference at min10 Importance",
    Redbotgolddiffat15: "Red side ADC gold difference at min15 Importance",
    Redbotgolddiffat10: "Red side ADC gold difference at min10 Importance",
    Redsupgolddiffat15: "Red side Support gold difference at min15 Importance",
    Redsupgolddiffat10: "Red side Support gold difference at min10 Importance",
    Redtopgp: "Red side Top games played on that champ Importance",
    Redjnggp: "Red side Jungle games played on that champ Importance",
    Redmidgp: "Red side Mid games played on that champ Importance",
    Redbotgp: "Red side ADC games played on that champ Importance",
    Redsupgp: "Red side Support games played on that champ Importance",
    Redtopkda: "Red side Top KDA Importance",
    Redtopkda10: "Red side Top KDA at min10 Importance",
    Redtopkda15: "Red side Top KDA at min15 Importance",
    Redjngkda: "Red side Jungle KDA Importance",
    Redjngkda10: "Red side Jungle KDA at min10 Importance",
    Redjngkda15: "Red side Jungle KDA at min15 Importance",
    Redmidkda: "Red side Mid KDA Importance",
    Redmidkda10: "Red side Mid KDA at min10 Importance",
    Redmidkda15: "Red side Mid KDA at min15 Importance",
    Redbotkda: "Red side ADC KDA Importance",
    Redbotkda10: "Red side ADC KDA at min10 Importance",
    Redbotkda15: "Red side ADC KDA at min15 Importance",
    Redsupkda: "Red side Support KDA Importance",
    Redsupkda10: "Red side Support KDA at min10 Importance",
    Redsupkda15: "Red side Support KDA at min15 Importance",
  };

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
    tooltip: {
      formatter: function () {
        const label = label_completer[this.point.name];
        return `<b>${label}</b>: ${this.point.y}`;
      },
    },
    series: [
      {
        showInLegend: false,
        data: importance_data.map((importance) => ({
          name: importance.Feature,
          y: importance.Importance,
          drilldown: importance.Feature,
        })),
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default FeatureImportance;
