import React, {useState, useEffect, useRef} from "react";
import {Formik, Form} from "formik";
import FormikControl from "../../../../../../components/Formik/FormikControl";
import {toast} from "react-toastify";
import {getDummySupplies} from "../../../../../../api/dummysupply";
import {getManager} from "../../../../../../api/account";
import {Button, Row, Col} from "react-bootstrap";
import {getStorages} from "../../../../../../api/storage";
import {store} from "../../../../../../api/supply";
import initialValues from "../../../../../../utils/initialValues.json";
import {motion} from "framer-motion";
const RequestForm = ({setIsShownStorageLocation}) => {
  const [supplyData, setSupplyData] = useState([]);
  const [storageLocationData, setStorageLocationData] = useState([]);
  const [managers, setManagers] = useState([]);
  const capacityChange = useRef();

  const onSubmit = async (values) => {
    try {
      // Call the function responsible for inserting supply requests
      await store(values);
      toast("Supply request submitted", {
        icon: <i className="bx bxs-layer-plus"></i>,
        progressClassName:
          "Toastify__toast-theme--colored Toastify__toast--info ",
        autoClose: 1500,
      });
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
          key: supply.sku,
          value: [supply.model, supply.product_name, supply.brand],
          display: supply.model,
        };
      }),
      md: 6,
    },
    {
      control: "input",
      type: "number",
      label: "Quantity",
      name: "quantity",
      placeholder: "How many unit",
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
      control: "select",
      label: "Requester",
      name: "requester",
      options: managers.map((manager) => {
        return {
          key: manager.name,
          value: manager.name,
          display: manager.name,
        };
      }),
      md: 6,
    },
    {
      control: "select",
      label: "Storage Location",
      name: "storage_loc",
      options: storageLocationData.map((storage) => {
        return {
          key: storage.name,
          value: storage.id,
          display: storage.name,
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
        const sup_data = await getDummySupplies();
        setSupplyData(sup_data);

        const storage_location_data = await getStorages();
        setStorageLocationData(storage_location_data);

        const managers = await getManager();
        setManagers(managers.data);
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
