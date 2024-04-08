const {con} = require("../databaseInstance");
const jwt = require("jsonwebtoken");
const {v4: uuidv4} = require("uuid");

/**
 *
 * @param {*} req
 * @param {*} res
 * METHOD: GET
 */

exports.getMessages = (req, res) => {
  // Extract the token from the authorization header
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  const id = req.params.id && req.params.id;

  if (!token) {
    return res.status(401).send({message: "Unauthorized: Missing token"});
  }

  // Assuming you have a function to verify and decode the token
  const decodedToken = jwt.verify(token, "wms_secret"); // Replace with your secret key

  if (!decodedToken) {
    return res.status(401).send({message: "Unauthorized: Invalid token"});
  }

  con.query(
    "SELECT u.id AS user_id, u.name AS user_name, m.content AS recent_message_content, m.sent_at AS recent_message_time, u.image_link AS user_image_link, r.role_name AS role_name FROM fms_g20_users u LEFT JOIN (SELECT IF(sender_id = ?, receiver_id, sender_id) AS user_id, MAX(sent_at) AS recent_message_time FROM fms_g20_messages WHERE sender_id = ? OR receiver_id = ? GROUP BY IF(sender_id = ?, receiver_id, sender_id)) AS recent_messages ON u.id = recent_messages.user_id LEFT JOIN fms_g20_messages m ON (u.id = m.sender_id OR u.id = m.receiver_id) AND (m.sender_id = ? OR m.receiver_id = ?) AND m.sent_at = recent_messages.recent_message_time LEFT JOIN fms_g20_userroles r ON u.user_role = r.role_id WHERE u.id <> ?",
    [id, id, id, id, id, id, id],
    (err, result) => {
      if (err) {
        console.error(
          "Error occurred while retrieving users with messages:",
          err
        );
        return res.status(500).send({
          message: "Error occurred while retrieving users with messages",
        });
      } else {
        if (result) {
          res.send(result);
        } else {
          res.status(401).send({message: "No users with messages found"});
        }
      }
    }
  );
};

exports.getMessage = (req, res) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  const id1 = req.params.id && req.params.id;
  const id2 = req.params.id2 && req.params.id2;
  console.log(`id 1 : ${id1} id2: ${id2}`);
  con.query(
    "SELECT * FROM fms_g20_messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) order by sent_at ASC",
    [id1, id2, id2, id1],
    (err, result) => {
      if (err) {
        console.error(
          "Error occurred while retrieving users with messages:",
          err
        );
        return res.status(500).send({
          message: "Error occurred while retrieving users with messages",
        });
      } else {
        if (result) {
          console.log(result);
          return res.status(201).send(result);
        } else {
          res.status(401).send({message: "No users with messages found"});
        }
      }
    }
  );
};

/**
 *
 * @param {*} req
 * @param {*} res
 * METHOD: POST
 * @returns
 */
exports.store = (req, res) => {
  const {sender_id, receiver_id, content} = req.body;

  // Validate that required fields are provided
  if (!sender_id || !receiver_id || !content) {
    return res.status(400).send({
      message: "Message, sender_id, and receiver_id are required fields",
    });
  }
  const userId = uuidv4();
  const q =
    "INSERT INTO fms_g20_messages (msg_id, sender_id, receiver_id, content, sent_at) VALUES (?, ?, ?, ?, NOW())";

  const values = [userId, sender_id, receiver_id, content];
  console.log(`values to be inserted from ${req} is :${values}`);
  con.query(q, values, (err, result) => {
    if (err) {
      console.error("Error occurred while inserting message:", err);
      return res
        .status(500)
        .send({message: "Error occurred while inserting message"});
    }

    // The message was successfully inserted
    return res.status(201).send({
      message: "Message inserted successfully",
      messageId: result.msg_id,
    });
  });
};
