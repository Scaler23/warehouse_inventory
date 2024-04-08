import React from "react";
import {Doughnut, Line} from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  PointElement,
} from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, PointElement);

const DoughnutChartComponent = ({doughnutData}) => {
  return <Doughnut data={doughnutData} style={{width: "100%"}} />;
};

export default DoughnutChartComponent;
