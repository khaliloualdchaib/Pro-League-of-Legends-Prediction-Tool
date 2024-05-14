import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_more from "highcharts/highcharts-more";
import Radio from "../components/radio";

HC_more(Highcharts);

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

const options = (title, color, data) => ({
  chart: {
    renderTo: "container",
    type: "column",
  },
  title: {
    text: title,
  },
  xAxis: {
    categories: ["Top", "Jungle", "Mid", "Bottom", "Support"],
    title: {
      text: "Role",
    },
  },
  yAxis: {
    title: {
      text: "Probability(%)",
    },
    tickInterval: 10,
  },
  tooltip: {
    pointFormat: "<b>Probability</b>: {point.y}%",
  },
  plotOptions: {
    column: {
      color: color,
    },
  },
  series: [
    {
      showInLegend: false,
      data: [
        {
          name: "Top",
          y: data["Top"],
        },
        {
          name: "Jungle",
          y: data["Jungle"],
        },
        {
          name: "Mid",
          y: data["Mid"],
        },
        {
          name: "Bottom",
          y: data["Bottom"],
        },
        {
          name: "Support",
          y: data["Support"],
        },
      ],
    },
  ],
});
const MostKills = () => {
  const dataProbsRed = {
    Top: 80,
    Jungle: 75,
    Mid: 90,
    Bottom: 50,
    Support: 15,
  };
  const dataProbsBlue = {
    Top: 80,
    Jungle: 75,
    Mid: 90,
    Bottom: 50,
    Support: 15,
  };
  const red = "#FF0000";
  const blue = "#0000FF";
  return (
    <>
      <div class="flex flex-nowrap justify-center">
        <div>
          <HighchartsReact
            highcharts={Highcharts}
            options={options("Number of Kills Red Team", red, dataProbsRed)}
          ></HighchartsReact>
        </div>
        <div>
          <HighchartsReact
            highcharts={Highcharts}
            options={options("Number of Kills  Blue Team", blue, dataProbsBlue)}
          ></HighchartsReact>
        </div>
      </div>
      <Radio options={["test1", "test2", "test3"]}></Radio>
    </>
  );
};

export default MostKills;
