import React, {useState, useEffect, useRef} from "react";
import {Formik, Form} from "formik";
import FormikControl from "../../../../../../components/Formik/FormikControl";
import {toast} from "react-toastify";
import {getAllItems} from "../../../../../../api/itemsApi";
import {Button, Row, Col} from "react-bootstrap";
import {getAllStorageLocation} from "../../../../../../api/storageApi";
import {insertSupplyRequests} from "../../../../../../api/suppliesApi";
import initialValues from "../../../../../../utils/initialValues.json";
import {motion} from "framer-motion";
const RequestForm = ({setIsShownStorageLocation}) => {
  const [supplyData, setSupplyData] = useState([]);
  const [storageLocationData, setStorageLocationData] = useState([]);
  const capacityChange = useRef();

  const onSubmit = async (values) => {
    try {
      // Call the function responsible for inserting supply requests
      const supply = await insertSupplyRequests(values);
      toast("Supply request submitted", {
        icon: <i className="bx bxs-layer-plus"></i>,
        progressClassName:
          "Toastify__toast-theme--colored Toastify__toast--info ",
        autoClose: 1500,
      });
      console.log(supply);
    } catch (error) {
      console.error("Error submitting supply request:", error);
    }
  };

  const reqSupplyFormStructure = [
    {
      control: "select",
      label: "Item Name",
      name: "itemName",
      options: supplyData.map((supply) => {
        return {
          key: supply.itemname,
          value: supply.id,
          display: supply.itemname,
        };
      }),
      md: 6,
    },
    {
      control: "input",
      type: "number",
      label: "Quantity",
      name: "quantity",
      placeholder: "4000",
      md: 6,
    },
    {
      control: "input",
      type: "date",
      label: "Date Expected",
      name: "dateExpected",
      placeholder: "11/08/2019",
      md: 6,
    },
    {
      control: "input",
      type: "text",
      label: "Requester",
      name: "requester",
      placeholder: "",
      md: 6,
    },
    {
      control: "select",
      label: "Storage Location",
      name: "storage_loc",
      options: storageLocationData.map((storage) => {
        return {
          key: storage.location,
          value: storage.id,
          display: storage.location,
        };
      }),
      md: 6,
    },
    {
      control: "textarea",
      label: "Notes",
      name: "comments",
      rows: 4,
      placeholder: "Place a note",
      md: 12,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sup_data = await getAllItems();
        setSupplyData(sup_data);
        const storage_location_data = await getAllStorageLocation();
        setStorageLocationData(storage_location_data);
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      }
    };

    fetchData();
  }, []);

  const handleStorageNameChange = (currentValue) => {
    storageLocationData.forEach((item) => {
      if (item.id === currentValue) {
        capacityChange.current.value = item.capacity;
      }
    });
  };
  return (
    <Formik
      initialValues={initialValues.supplyRequestFields}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          <Row className="p-3">
            {reqSupplyFormStructure.map((structure) => (
              <Col
                sm={12}
                md={structure.md}
                className="mb-3"
                key={structure.name} // Use name instead of fieldKey
              >
                {structure.control === "input" ? (
                  <FormikControl
                    control={structure.control}
                    type={structure.type}
                    label={structure.label}
                    name={structure.name}
                    onChange={formik.handleChange}
                    placeholder={structure.placeholder && structure.placeholder}
                    {...structure}
                  />
                ) : structure.control === "textarea" ? (
                  <FormikControl
                    control={structure.control}
                    label={structure.label}
                    name={structure.name}
                    rows={structure.rows}
                    onChange={formik.handleChange}
                    placeholder={structure.placeholder && structure.placeholder}
                    {...structure}
                  />
                ) : (
                  <>
                    {structure.name === "storage_loc" ? (
                      storageLocationData.length > 0 ? (
                        <FormikControl
                          control={structure.control}
                          label={structure.label}
                          name={structure.name}
                          options={structure.options}
                          onChange={(e) => {
                            formik.handleChange(e);
                            structure.name === "storage_loc" &&
                              handleStorageNameChange(e.target.value);
                          }}
                          defaultValue=""
                        />
                      ) : (
                        <Col sm={12} lg={12} className="mb-3">
                          <Button
                            variant="secondary"
                            onClick={() => setIsShownStorageLocation(true)}
                          >
                            Create Storage Location
                          </Button>
                        </Col>
                      )
                    ) : (
                      <FormikControl
                        control={structure.control}
                        label={structure.label}
                        name={structure.name}
                        options={structure.options}
                        onChange={(e) => {
                          formik.handleChange(e);
                        }}
                        defaultValue=""
                      />
                    )}
                  </>
                )}
              </Col>
            ))}

            <Col sm={12} lg={12} className="d-flex flex-row-reverse">
              <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.9}}>
                <Button variant="primary" className="p-2" type="submit">
                  Send Request
                </Button>
              </motion.div>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default RequestForm;
