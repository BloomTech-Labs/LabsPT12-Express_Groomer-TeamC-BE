const express = require("express")
const GroomerController = require("./groomerController")

const router = express.Router()

router.get("/", GroomerController.index.bind(GroomerController))
router.get("/:id", GroomerController.get.bind(GroomerController))
router.post("/", GroomerController.post.bind(GroomerController));
router.put("/:id", GroomerController.put.bind(GroomerController));
router.delete("/:id", GroomerController.del.bind(GroomerController))

module.exports = router