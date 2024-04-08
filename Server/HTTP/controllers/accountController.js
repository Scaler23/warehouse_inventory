const {con} = require("../databaseInstance");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); // For secure password hashing
const {v4: uuidv4} = require("uuid");

/**
 *
 * @param {*} req
 * @param {*} res
 * METHOD: GET
 * @returns
 */

exports.verify = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).send({message: "Authorization token missing"});
  }

  try {
    const decodedToken = jwt.verify(token, "wms_secret"); // Replace with your secret key
    const {id, name} = decodedToken.user;

    // Fetch user by username
    const q =
      "SELECT fms_g20_users.*, fms_g20_userroles.role_name, fms_g20_userroles.role_desc, fms_g20_userroles.created_at AS role_date_created FROM fms_g20_users INNER JOIN fms_g20_userroles ON fms_g20_userroles.role_id = fms_g20_users.user_role WHERE fms_g20_users.id = ? AND fms_g20_users.name = ? LIMIT 1";
    con.query(q, [id, name], (err, data) => {
      if (err) {
        console.log("Error retrieving inventory:", err);
        return res.status(401).send({message: "User not found"});
      }

      const userData = data[0];
      return res.json({
        message: "User verification successful",
        data: userData,
        token: token,
      });
    });
    // You can include additional checks based on your requirements
  } catch (err) {
    console.error("Error occurred while logging in:", err);
    res.status(500).send({message: "Error occurred while logging in"});
  }
};

exports.getUsers = async (req, res) => {
  try {
    // Fetch user by username
    const q =
      "SELECT fms_g20_users.*, fms_g20_userroles.role_name, fms_g20_userroles.role_desc, fms_g20_userroles.created_at AS role_date_created FROM fms_g20_users INNER JOIN fms_g20_userroles ON fms_g20_userroles.role_id = fms_g20_users.user_role";
    con.query(q, async (err, data) => {
      if (err) {
        console.log("Error retrieving user:", err);
        return res.status(401).send({message: "There are Some Issue Boss!"});
      }

      if (data.length === 0) {
        return res
          .status(401)
          .send({message: "We Cannot find any users boss!"});
      }
      return res
        .status(201)
        .json({message: "User verification successful", data});
    });
  } catch (err) {
    console.error("Error occurred while logging in:", err);
    res.status(500).send({message: "Error occurred while logging in"});
  }
};

exports.getManager = async (req, res) => {
  try {
    // Fetch user by username
    const q =
      "SELECT fms_g20_users.name, fms_g20_users.email, fms_g20_userroles.role_name FROM fms_g20_users INNER JOIN fms_g20_userroles ON fms_g20_userroles.role_id = fms_g20_users.user_role WHERE fms_g20_userroles.role_name = ?";
    con.query(q, ["Warehouse Manager"], async (err, data) => {
      if (err) {
        console.log("Error retrieving user:", err);
        return res.status(401).send({message: "There are Some Issue Boss!"});
      }

      if (data.length === 0) {
        return res
          .status(401)
          .send({message: "We Cannot find any users boss!"});
      }
      console.log(data[0]);
      return res
        .status(201)
        .json({message: "User verification successful", data});
    });
  } catch (err) {
    console.error("Error occurred while logging in:", err);
    res.status(500).send({message: "Error occurred while logging in"});
  }
};

exports.getAssociate = async (req, res) => {
  try {
    // Fetch user by username
    const q =
      "SELECT fms_g20_users.name, fms_g20_users.email, fms_g20_userroles.role_name FROM fms_g20_users INNER JOIN fms_g20_userroles ON fms_g20_userroles.role_id = fms_g20_users.user_role WHERE fms_g20_userroles.role_name = ?";
    con.query(q, ["Warehouse Associate"], async (err, data) => {
      if (err) {
        console.log("Error retrieving user:", err);
        return res.status(401).send({message: "There are Some Issue Boss!"});
      }

      if (data.length === 0) {
        return res
          .status(401)
          .send({message: "We Cannot find any users boss!"});
      }
      console.log(data[0]);
      return res
        .status(201)
        .json({message: "User verification successful", data});
    });
  } catch (err) {
    console.error("Error occurred while logging in:", err);
    res.status(500).send({message: "Error occurred while logging in"});
  }
};

exports.roles = async (req, res) => {
  const q = "SELECT * From fms_g20_userroles";

  con.query(q, async (err, data) => {
    if (data.length === 0) {
      return res.status(401).send({message: "There is no roles yet"});
    }

    return res.status(201).json({message: "We caught roles data boss!", data});
  });
};

/**
 *
 * @param {*} req
 * @param {*} res
 *
 * METHOD : POST
 */

exports.login = async (req, res) => {
  // const {username, password} = req.body;
  const username = req.body.username;
  const password = req.body.password;
  try {
    // Fetch user by username
    const q =
      "SELECT fms_g20_users.*, fms_g20_userroles.role_name, fms_g20_userroles.role_desc, fms_g20_userroles.created_at AS role_date_created FROM fms_g20_users INNER JOIN fms_g20_userroles ON fms_g20_userroles.role_id = fms_g20_users.user_role WHERE fms_g20_users.name = ? LIMIT 1";
    con.query(q, [username], async (err, data) => {
      if (err) {
        console.log("Error retrieving user:", err);
        return res.status(401).send({message: "User not found"});
      }

      if (data.length === 0) {
        return res.status(401).send({message: "User not found"});
      }

      const user = data[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).send({message: "Wrong username or password"});
      }

      console.log(user);
      const token = jwt.sign({user}, "wms_secret", {
        expiresIn: "30m",
      });

      return res
        .status(201)
        .json({message: "User verification successful", token});
    });
  } catch (err) {
    console.error("Error occurred while logging in:", err);
    res.status(500).send({message: "Error occurred while logging in"});
  }
};

exports.register = async (req, res) => {
  const {
    username,
    email,
    password,
    user_role,
    contact,
    address,
    age,
    marital_status,
    image_link,
  } = req.body; // Assuming role 1 for simplicity; adjust as needed

  if (
    !email ||
    !username ||
    !password ||
    !user_role ||
    !contact ||
    !address ||
    !age ||
    !marital_status ||
    !image_link ||
    email == "" ||
    username == "" ||
    password == "" ||
    user_role == "" ||
    contact == "" ||
    address == "" ||
    age == "" ||
    marital_status == "" ||
    image_link == ""
  ) {
    return res.status(401).json({message: "Registration successful"});
  }

  const q = "SELECT * FROM fms_g20_users WHERE name = ? LIMIT 1";
  con.query(q, [username], async (err, data) => {
    if (data.length >> 0) {
      return res.status(401).json({message: "Existing user"});
    }
  });
  // Check for empty fields

  try {
    // Hash the password using bcrypt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userId = uuidv4();
    // Insert user with hashed password
    con.query(
      "INSERT INTO fms_g20_users (id, email, name, password, user_role, contact, address, age, marital_status, image_link) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        userId,
        email,
        username,
        hashedPassword,
        user_role,
        contact,
        address,
        age,
        marital_status,
        image_link,
      ],
      (err, result) => {
        if (err) {
          console.error("Error occurred while registering user:", err);
          return res
            .status(500)
            .send({message: "Error occurred while registering user"});
        } else {
          console.log("User registered successfully");
          return res
            .status(201)
            .json({message: "Registration successful", result});
        }
      }
    );
  } catch (err) {
    console.error("Error occurred while registering user:", err);
    res.status(500).send({message: "Error occurred while registering user"});
  }
};

exports.storeRoles = async (req, res) => {
  const {role_name, role_desc} = req.body;
  if (!role_name || !role_desc || role_name == "" || role_desc == "") {
    return res.status(401).json({message: "Registration successful"});
  }
  try {
    con.query(
      "INSERT INTO fms_g20_userroles (role_name, role_desc, created_at) VALUES (?, ?, NOW())",
      [role_name, role_desc],
      (err, result) => {
        if (err) {
          console.error("Error occurred while registering user:", err);
          return res
            .status(500)
            .send({message: "Error occurred while registering user"});
        } else {
          console.log("User registered successfully");
          return res
            .status(201)
            .json({message: "Registration successful", result});
        }
      }
    );
  } catch (err) {
    console.error("Error occurred while registering user:", err);
    res.status(500).send({message: "Error occurred while registering user"});
  }
};
