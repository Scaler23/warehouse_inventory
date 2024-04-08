const {con} = require("../databaseInstance");

exports.getStorages = (req, res) => {
  try {
    const select = "SELECT * FROM fms_g20_storage";
    con.query(select, (err, data) => {
      if (err) {
        console.log("Error retrieving inventory:", err);
        return res.json(err);
      }
      return res.send(data);
    });
  } catch (error) {
    console.error(`Cannot get data`, error);
  }
};

exports.store = (req, res) => {
  try {
    const values = [
      req.body.name,
      req.body.location,
      req.body.description,
      req.body.capacity,
    ];

    const store = `
    INSERT INTO fms_g20_storage
      (name, location, description, capacity, created_at)
    VALUES
      (?, ?, ?, ?, NOW())
  `;

    con.query(store, values, (insertErr, result) => {
      if (insertErr) {
        console.log("Error inserting into inventory:", insertErr);
        return res.json(insertErr);
      }

      return res.json({message: "Insert successful"});
    });
  } catch (error) {
    console.error(`Cannot store data`, error);
  }
};

exports.patch = (req, res) => {
  try {
    const {name, location, description, capacity, id} = req.body;
    values = [name, location, description, capacity, id];
    const patch =
      "UPDATE fms_g20_storage SET name = ?, location = ?, description = ?, capacity = ? WHERE id = ?";

    con.query(patch, values, async (err, result) => {
      if (err) {
        console.error(`cannot patch data`, err);
        res.status(500).json({message: "cannot patch data", err});
      }
      console.log("data patched", result);
      res.status(201).json({message: "data patched", result});
    });
  } catch (error) {
    console.error(`cannot patch data`, error);
    res.status(500).json({message: "cannot patch data", error});
  }
};
