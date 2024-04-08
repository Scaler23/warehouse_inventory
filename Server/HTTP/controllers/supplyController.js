const {con} = require("../databaseInstance");
const {v4: uuidv4} = require("uuid");

/**
 *
 * @param {*} req
 * @param {*} res
 * METHOD: GET
 */
exports.getSupplies = (req, res) => {
  const q =
    "SELECT fms_g20_supply_requests.*, fms_g20_storage.name AS storage_name FROM fms_g20_supply_requests JOIN fms_g20_storage ON fms_g20_supply_requests.storage_loc = fms_g20_storage.id";
  con.query(q, (err, data) => {
    if (err) {
      console.log("Error retrieving inventory:", err);
      return res.json(err);
    }
    return res.send(data);
  });
};

exports.completed = (req, res) => {
  const q =
    "SELECT s.capacity, s.description, s.location, s.name, SUM(sr.quantity) AS total_quantity FROM fms_g20_storage AS s JOIN fms_g20_supply_requests AS sr ON s.id = sr.storage_loc WHERE sr.status = ? GROUP BY s.capacity, s.description, s.location, s.name;";

  con.query(q, ["Completed"], (err, data) => {
    if (err) {
      console.log("Error retrieving inventory:", err);
      return res.json(err);
    }
    return res.send(data);
  });
};

/**
 *
 * @param {*} req
 * @param {*} res
 * METHOD: POST
 */

exports.store = (req, res) => {
  const [model, productName, brand] = req.body.itemName.split(",");
  // console.log(sku);
  const getProductSku =
    "SELECT sku from fms_g20_dummy_prt WHERE product_name = ?";
  const getBrandSku = "SELECT sku from fms_g20_dummy_brt WHERE brand_name = ?";
  const insetSupplyRequest = `
  INSERT INTO fms_g20_supply_requests
    (supply_code, storage_loc, item_name, quantity, requester, status, date_requested, date_expected, date_arrived, comments)
  VALUES
    (?, ?, ?, ?, ?, ?, NOW(), ?, ?, ?)
`;
  con.query(getProductSku, [productName], (err, productResult) => {
    if (err) {
      console.log("Error querying product SKU:", err);
      return res.json(err);
    }

    if (!productResult || productResult.length === 0) {
      return res.status(500).send({message: `Product SKU not found`});
    }

    con.query(getBrandSku, [brand], (err, brandResult) => {
      if (err) {
        console.log("Error querying brand SKU:", err);
        return res.json(err);
      }

      if (!brandResult || brandResult.length === 0) {
        return res.status(500).send({message: `Brand SKU not found`});
      }

      const productSku = productResult[0].sku;
      const brandSku = brandResult[0].sku;
      const concatenatedSkus = productSku + brandSku;

      if ({concatenatedSkus}) {
        const getLastNo = `SELECT supply_code 
        FROM fms_g20_supply_requests 
        WHERE supply_code LIKE ? ORDER BY supply_code DESC LIMIT 1`;

        con.query(
          getLastNo,
          [`%${concatenatedSkus}%`],
          (err, productResult) => {
            if (err) {
              console.error("Error executing SQL query:", err);
              return;
            }

            var newSupplyCode;

            if (productResult.length > 0) {
              const {supply_code} = productResult[0]; // Destructuring to get supply_code
              const match = supply_code.match(/NO(\d+)$/);
              if (match) {
                newSupplyCode = supply_code.replace(
                  /NO(\d+)$/,
                  (_, num) =>
                    `NO${String(parseInt(num) + 1).padStart(num.length, "0")}`
                );
              } else {
                console.log(
                  "No 'NO' followed by numbers found in the supply code."
                );
              }
            } else {
              newSupplyCode = `${concatenatedSkus}NO01`;
            }

            const values = [
              newSupplyCode,
              req.body.storage_loc,
              model,
              req.body.quantity,
              req.body.requester,
              "Pending",
              req.body.dateExpected,
              null,
              req.body.comments,
            ];

            con.query(insetSupplyRequest, values, (insertErr, result) => {
              if (insertErr) {
                console.log("Error inserting into inventory:", insertErr);
                return res.json(insertErr);
              }

              return res.json({message: "Insert successful"});
            });
          }
        );
      }
    });
  });
};

/**
 *
 * @param {*} req
 * @param {*} res
 */

exports.patch = (req, res) => {
  try {
    const statusUpdateQuery =
      "UPDATE fms_g20_supply_requests SET storage_loc = ?, quantity = ?, comments = ?, receiver = ? WHERE supply_code = ?";
    con.query(statusUpdateQuery, values, async (err, results) => {
      if (err) {
        console.error(err);
        throw err; // Throw the error to the catch block
      } else {
        res.status(201).json({message: `Status Updated`, results});
        console.log("Number of affected rows:", results.affectedRows);
      }
    });
  } catch (error) {
    console.error("cannot patch", error);
  }
};

/**
 *
 * @param {status, supply_code} req
 * @param {*} res
 * METHOD: PATCH
 */

exports.status = (req, res) => {
  try {
    const {status, supply_code} = req.body;
    const values = [status, supply_code];
    const statusUpdateQuery =
      "UPDATE fms_g20_supply_requests SET status = ? WHERE supply_code = ?";

    con.query(statusUpdateQuery, values, async (err, results) => {
      if (err) {
        console.error(err);
        throw err; // Throw the error to the catch block
      } else {
        if (status === "Pending") {
          const ratingsUpdateQuery =
            "UPDATE fms_g20_quality_reports SET rating = ? WHERE reports_id = ?";

          con.query(ratingsUpdateQuery, [null, supply_code], (err, results) => {
            if (err) {
              console.error(err);
              throw err; // Throw the error to the catch block
            }

            res.status(201).json({message: `Status Updated`, results});
            console.log("Number of affected rows:", results.affectedRows);
          });
        }
      }
    });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({error: "Internal Server Error"});
  }
};
