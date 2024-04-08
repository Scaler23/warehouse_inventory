import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
} from "chart.js";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement
);
import {Doughnut, Line} from "react-chartjs-2";
import {motion} from "framer-motion";
const Dashboard = () => {
  const doughnutData = {
    labels: ["Category 1", "Category 2", "Category 3"],
    datasets: [
      {
        label: "My Dataset",
        data: [30, 50, 20],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const lineData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "My Data",
        data: [50, 60, 70, 80, 65, 75, 50, 60, 70, 80, 65, 75],
        fill: false,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Another Dataset",
        data: [40, 45, 55, 65, 50, 60, 40, 45, 55, 65, 50, 60],
        fill: false,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };
  const options = {
    scales: {
      x: {
        type: "linear", // Change to 'linear' or 'logarithmic' as needed
      },
    },
  };
  return (
    <>
      <div className="row">
        <motion.div
          initial={{scaleY: 0.5, opacity: 0}}
          whileInView={{scaleY: 1, opacity: 1}}
          transition={{duration: 0.4}}
          className="col-sm-12, col-md-8"
        >
          <div className="card ">
            <div className="card-header" id="theme-toggle">
              <div className="card-title">
                <h5 className="text-center">Sales Update</h5>
              </div>
            </div>
            <Line data={lineData} style={{width: "100%"}} />
          </div>
        </motion.div>
        <motion.div
          initial={{scaleY: 0.5, opacity: 0}}
          whileInView={{scaleY: 1, opacity: 1}}
          transition={{duration: 0.4}}
          className="col-sm-12, col-md-4"
        >
          <div className="card">
            <div className="card-header" id="theme-toggle">
              <div className="card-title">
                <h5>Dashboard</h5>
              </div>
            </div>
            <Doughnut data={doughnutData} />
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Dashboard;
