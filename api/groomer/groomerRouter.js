const express = require("express")
const GroomerController = require("./groomerController")
const authRequired = require("./../middleware/authRequired")

const router = express.Router()

router.get("/", authRequired, GroomerController.index.bind(GroomerController))
router.get("/:id", authRequired, GroomerController.get.bind(GroomerController))
router.post("/", authRequired, GroomerController.post.bind(GroomerController));
router.put("/:id", authRequired, GroomerController.put.bind(GroomerController));
router.delete("/:id", authRequired, GroomerController.del.bind(GroomerController))

module.exports = router