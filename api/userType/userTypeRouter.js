const express = require("express");
const authRequired = require("./../middleware/authRequired");
const UserTypeController = require("./userTypeController");

const router = express.Router()

router.get("/", UserTypeController.index.bind(UserTypeController));
router.get("/:id", UserTypeController.get.bind(UserTypeController));

module.exports = router