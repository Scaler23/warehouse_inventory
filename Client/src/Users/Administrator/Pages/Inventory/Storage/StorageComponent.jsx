import React, {useState, useEffect} from "react";
import {getStorages} from "../../../../../api/storage";
import {Row, Col, Button} from "react-bootstrap";
import DoughnutChartComponent from "../../../../../components/DoughnutChartComponent";
import StorageTable from "./tables/StorageTable";
import StorageLocForm from "./forms/StorageForm";

const StorageComponent = () => {
  const [storageData, setStorageData] = useState([]);
  const [isShownStorageLocForm, setIsShownStorageLocation] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStorages();
        setStorageData(data);
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      }
    };
    fetchData();
  }, []);

  const doughnutData = {
    labels: storageData.map((item) => {
      return item.name;
    }),
    datasets: [
      {
        label: "My Dataset",
        data: storageData.map((item) => {
          return item.capacity;
        }),
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

  return (
    <>
      {isShownStorageLocForm ? (
        <StorageLocForm setIsShownStorageLocation={setIsShownStorageLocation} />
      ) : (
        <Row>
          <Col lg={4} md={12}>
            <DoughnutChartComponent doughnutData={doughnutData} />
          </Col>
          <Col lg={8} md={12}>
            <StorageTable
              setIsShownStorageLocation={setIsShownStorageLocation}
              storageData={storageData}
            />
          </Col>
        </Row>
      )}
    </>
  );
};

export default StorageComponent;
