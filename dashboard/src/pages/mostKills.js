import { useEffect } from "react";
import * as d3 from "d3";

//reference:
//https://codesandbox.io/p/sandbox/react-d3-demo--bar-chart-with-scales-and-axes-vf86v6?file=%2Fsrc%2FApp.jsx&from-embed=

const marginTop = 30;
const marginBottom = 70;
const marginLeft = 50;
const marginRight = 25;

const BarChart = ({ width, height, data, color, chartId }) => {
  const chartBottomY = height - marginBottom;

  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.Role))
    .range([marginLeft, width - marginRight])
    .padding(0.1);

  const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);

  // Create the vertical scale and its axis generator.
  const yScale = d3
    .scaleLinear()
    .domain([0, 100])
    .nice()
    .range([chartBottomY, marginTop]);

  const yAxis = d3.axisLeft(yScale);

  useEffect(() => {
    d3.select(`#${chartId}-x-axis`)
      .call(xAxis)
      .selectAll("text")
      .attr("font-size", "14px")
      .attr("transform", "rotate(-45)")
      .attr("text-anchor", "end");
    d3.select(`#${chartId}-y-axis`)
      .call(yAxis)
      .selectAll("text")
      .attr("font-size", "14px");
  }, [xAxis, yAxis, chartId]);

  return (
    <div className="container">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="viz"
      >
        <g className="bars">
          {data.map((d) => (
            <rect
              key={d.Role}
              x={xScale(d.Role)}
              y={yScale(d.Prediction)}
              height={chartBottomY - yScale(d.Prediction)}
              width={xScale.bandwidth()}
              fill={color}
            />
          ))}
        </g>
        <g
          id={`${chartId}-x-axis`}
          transform={`translate(0,${chartBottomY})`}
        ></g>
        <g
          id={`${chartId}-y-axis`}
          transform={`translate(${marginLeft},0)`}
        ></g>
      </svg>
    </div>
  );
};

const MostKills = () => {
  const data = [
    { Role: "Top", Prediction: 70 },
    { Role: "Jungle", Prediction: 80 },
    { Role: "Mid", Prediction: 60 },
    { Role: "Bottom", Prediction: 30 },
    { Role: "Support", Prediction: 5 },
  ];
  return (
    <div>
      <h1>Prediction for most kills per Team(%)</h1>
      <div className="flex flex-row">
        <div className="basis-1/2">
          <BarChart
            data={data}
            width={450}
            height={500}
            color={"#6baed6"}
            chartId="chart1"
          />
        </div>
        <div className="basis-1/2">
          <BarChart
            data={data}
            width={450}
            height={500}
            color={"red"}
            chartId="chart2"
          />
        </div>
      </div>
    </div>
  );
};

export default MostKills;
