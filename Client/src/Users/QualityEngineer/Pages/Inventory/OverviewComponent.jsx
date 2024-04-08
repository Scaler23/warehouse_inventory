import React, {useEffect, useState} from "react";
import {Row, Col, Container} from "react-bootstrap";
import DoughnutChartComponent from "../../../../components/DoughnutChartComponent";
import {rating} from "../../../../api/quality";
const OverviewComponent = () => {
  const [ratings, setRatings] = useState([]);
  useEffect(() => {
    getQualityRatings();
  }, []);

  const getQualityRatings = async () => {
    try {
      const data = await rating();
      console.log(data);
      setRatings(data);
    } catch (error) {
      console.log(error);
    }
  };

  const doughnutData = {
    labels: ratings.map((rating) => {
      return rating.rating;
    }),
    datasets: [
      {
        label: "Rating",
        data: ratings.map((rating) => {
          return rating.count;
        }),
        backgroundColor: ["#00d400", "Yellow", "Orange", "#ff5454"],
        borderColor: ["#005800", "#535300", "#535300", "#8f0000"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container>
      <Row>
        <Col md={6} sm={12}>
          <Row className="g-2">
            <Col
              md={6}
              sm={12}
              style={{
                backgroundColor: "#00d400",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "25px",
                fontWeight: "600",
              }}
            >
              <span style={{color: "#005800", textAlign: "center"}}>
                Excellent
              </span>
            </Col>
            <Col md={6} sm={12} style={{padding: "20px"}}>
              Indicates that the supplies meet all quality standards and are
              accepted without any issues.
            </Col>
            <Col
              md={6}
              sm={12}
              style={{
                backgroundColor: "Yellow",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "25px",
                fontWeight: "600",
              }}
            >
              <span style={{color: "#535300", textAlign: "center"}}>Good</span>
            </Col>
            <Col md={6} sm={12} style={{padding: "20px"}}>
              Indicates that the supplies have minor issues or defects but are
              still usable with some adjustments or repairs.
            </Col>
            <Col
              md={6}
              sm={12}
              style={{
                backgroundColor: "Orange",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "25px",
                fontWeight: "600",
              }}
            >
              <span style={{color: "#684300", textAlign: "center"}}>Fair</span>
            </Col>
            <Col md={6} sm={12} style={{padding: "20px"}}>
              Indicates that the supplies have significant issues or defects
              that may require extensive repairs or modifications before they
              can be used.
            </Col>
            <Col
              md={6}
              sm={12}
              style={{
                backgroundColor: "#ff5454",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "25px",
                fontWeight: "600",
              }}
            >
              <span style={{color: "#8f0000", textAlign: "center"}}>Poor</span>
            </Col>
            <Col md={6} sm={12} style={{padding: "20px"}}>
              Indicates that the supplies are severely damaged or unusable and
              should be rejected.
            </Col>
          </Row>
        </Col>
        <Col md={6} sm={12}>
          {/* {ratings && console.log(ratings.count)} */}
          <DoughnutChartComponent doughnutData={doughnutData} />
        </Col>
      </Row>
    </Container>
  );
};

export default OverviewComponent;
