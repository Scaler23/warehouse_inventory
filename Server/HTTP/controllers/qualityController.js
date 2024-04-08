const {con} = require("../databaseInstance");

/**
 *
 * @param {*} req
 * @param {*} res
 * METHOD: GET
 */
exports.getReports = async (req, res) => {
  try {
    con.query("SELECT * FROM fms_g20_quality_reports", async (err, data) => {
      if (err) {
        console.log("Error inserting quality reports:", err);
        return res.status(500).json({error: "Internal server error"});
      }

      return res.status(201).json({message: `Quality Reports`, data});
    });
  } catch (error) {
    console.log("Error inserting quality reports:", error);
    res.status(500).json({error: "Internal server error"});
  }
};

exports.completed = (req, res) => {
  const q =
    "SELECT fms_g20_supply_requests.status as status, fms_g20_supply_requests.requester AS requester, fms_g20_supply_requests.quantity, fms_g20_quality_reports.reports_summary AS reports_summary, fms_g20_quality_reports.rating AS rating,fms_g20_quality_reports.rating AS attachment,  fms_g20_quality_reports.created_at AS checked_at FROM fms_g20_supply_requests JOIN fms_g20_quality_reports ON fms_g20_supply_requests.supply_code = fms_g20_quality_reports.reports_id WHERE status = ?";
  con.query(q, ["Completed"], (err, data) => {
    if (err) {
      console.log("Error retrieving inventory:", err);
      return res.json(err);
    }
    return res.send(data);
  });
};

exports.rating = (req, res) => {
  try {
    const q =
      "SELECT rating, COUNT(*) AS count FROM fms_g20_quality_reports WHERE rating IS NOT NULL GROUP BY rating";
    // Pass query parameters as separate arguments
    con.query(q, (err, data) => {
      if (err) {
        console.log("Error retrieving supply ratings:", err);
        return res.json(err);
      }
      return res.send(data);
    });
  } catch (error) {
    throw error;
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * METHOD: POST
 */

exports.store = async (req, res) => {
  const {
    attachment,
    isAccurateDocumentation,
    isAccurateLabels,
    isCleanliness,
    isCorrectColor,
    isCorrectQuantity,
    isFunctionalComponents,
    isNoDamages,
    isNoMissingParts,
    isProperPackaging,
    isSatisfactoryCondition,
    rating,
    reports_summary,
    receiver,
    status,
  } = req.body.data;
  const reports_id = req.body.reports_id;

  console.log(status, receiver);
  const values = [
    reports_id,
    attachment,
    !!isAccurateDocumentation,
    !!isAccurateLabels,
    !!isCleanliness,
    !!isCorrectColor,
    !!isCorrectQuantity,
    !!isFunctionalComponents,
    !!isNoDamages,
    !!isNoMissingParts,
    !!isProperPackaging,
    !!isSatisfactoryCondition,
    rating,
    reports_summary,
    new Date(), // Assuming you want the current timestamp for created_at
  ];

  console.log(values);
  console.log(receiver, status);
  try {
    con.query(
      `
        INSERT INTO fms_g20_quality_reports
          (reports_id, attachment, isAccurateDocumentation, isAccurateLabels, isCleanliness, isCorrectColor, isCorrectQuantity, isFunctionalComponents, isNoDamages, isNoMissingParts, isProperPackaging, isSatisfactoryCondition, rating, reports_summary, created_at)
        VALUES
          (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      values,
      async (err, data) => {
        if (err) {
          console.log("Error inserting quality reports:", err);
          return res.status(500).json({error: "Internal server error"});
        }

        const receiverCredential = [status, receiver, reports_id];
        console.log(receiverCredential);
        con.query(
          `UPDATE fms_g20_supply_requests SET status = ?, receiver = ?, date_arrived = NOW() WHERE supply_code = ?`,
          receiverCredential,
          async (err, data) => {
            if (err) {
              console.log("Error updating supply request:", err);
              return res.status(500).json({error: "Internal server error"});
            }
            // Handle successful update
            res.json({
              message: "Quality Inspection Done, Supply Request Updated",
            });
          }
        );
      }
    );
  } catch (error) {
    console.log("Error inserting quality reports:", error);
    res.status(500).json({error: "Internal server error"});
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 */

exports.patch = (req, res) => {
  try {
    const {
      attachment,
      isAccurateDocumentation,
      isAccurateLabels,
      isCleanliness,
      isCorrectColor,
      isCorrectQuantity,
      isFunctionalComponents,
      isNoDamages,
      isNoMissingParts,
      isProperPackaging,
      isSatisfactoryCondition,
      rating,
      reports_summary,
      status,
      receiver,
    } = req.body.data;

    const reports_id = req.body.reports_id;

    const values = [
      reports_summary,
      rating,
      attachment,
      !!isAccurateDocumentation,
      !!isAccurateLabels,
      !!isCleanliness,
      !!isCorrectColor,
      !!isCorrectQuantity,
      !!isFunctionalComponents,
      !!isNoDamages,
      !!isNoMissingParts,
      !!isProperPackaging,
      !!isSatisfactoryCondition,
      reports_id,
    ];
    const statusUpdateQuery =
      "UPDATE fms_g20_quality_reports SET reports_summary = ?, rating = ?, attachment = ?, isAccurateDocumentation = ?,isAccurateLabels = ?, isCleanliness = ?, isCorrectColor = ?, isCorrectQuantity = ?, isFunctionalComponents = ?, isNoDamages = ?, isNoMissingParts = ?, isProperPackaging = ?, isSatisfactoryCondition = ?, WHERE reports_id = ?";
    con.query(statusUpdateQuery, values, async (err, results) => {
      if (err) {
        console.error(err);
        throw err; // Throw the error to the catch block
      } else {
        const receiverCredential = [status, receiver, reports_id];

        console.log(receiverCredential);

        con.query(
          `UPDATE fms_g20_supply_requests SET status = ?, receiver = ?, date_arrived = NOW() WHERE supply_code = ?`,
          receiverCredential,
          async (err, data) => {
            if (err) {
              console.log("Error updating supply request:", err);
              return res.status(500).json({error: "Internal server error"});
            }
            // Handle successful update
            console.log("Number of affected rows:", data.affectedRows);
            res.status(201).json({message: `Status Updated`, data});
          }
        );
      }
    });
  } catch (error) {}
};
