const {con} = require("../databaseInstance");

exports.getDummySupplies = (req, res) => {
  const q = "SELECT sku, product_name, brand, model FROM fms_g20_dummy_supply";
  con.query(q, (err, data) => {
    if (err) {
      console.log("Error retrieving inventory:", err);
      return res.json(err);
    }
    return res.send(data);
  });
};
