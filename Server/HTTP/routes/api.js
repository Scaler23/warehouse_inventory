const express = require("express");

const accountController = require("../controllers/accountController");
const supplyController = require("../controllers/supplyController");
const storageLocController = require("../controllers/storageLocController");
const dummySupplierController = require("../controllers/dummySupplierController");
const messageController = require("../controllers/messageController");
const qualityController = require("../controllers/qualityController");

const router = express.Router();

// Define routes

router.get("/", (req, res) => {
  res.send("Hello, this is the dashboard");
});

/**
 * ACCOUNT
 */
router.get("/verify", accountController.verify);
router.get("/getUsers", accountController.getUsers);
router.get("/getUser/manager", accountController.getManager);
router.get("/getUser/associate", accountController.getAssociate);
router.get("/roles", accountController.roles);
router.post("/login", accountController.login);
router.post("/register", accountController.register);
router.post("/roles/store", accountController.storeRoles);

/**
 *SUPPLIES
 */
router.get("/supplies", supplyController.getSupplies);
router.get("/supplies/completed", supplyController.completed);
router.post("/supplies/store", supplyController.store);
router.patch("/supplies/patch", supplyController.patch);
router.patch("/supplies/status", supplyController.status);

/**
 * STORAGES
 */
router.get("/storageloc", storageLocController.getStorages);
router.post("/storageloc/store", storageLocController.store);
router.patch("/storageloc/patch", storageLocController.patch);

/**
 * DUMMY SUPPLIER
 */
router.get("/dummysupplies", dummySupplierController.getDummySupplies);

/**
 * MESSAGES
 */
router.get("/messages/:id", messageController.getMessages);
router.get("/message/:id/:id2", messageController.getMessage);
router.post("/messages/store", messageController.store);

/**
 * QUALITY CONTROL
 */
router.get("/quality", qualityController.getReports);
router.get("/quality/rating", qualityController.rating);
router.get("/quality/completed", qualityController.completed);
router.post("/quality/store", qualityController.store);
router.patch("/quality/patch/:id", qualityController.patch);

module.exports = router;
