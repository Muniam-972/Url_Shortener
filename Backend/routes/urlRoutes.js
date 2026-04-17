const express = require("express")
const router = express.Router()

const {createUrl, redirectUrl} = require("../controllers/urlController")

router.post("/create", createUrl)
router.get("/:shortId", redirectUrl)

module.exports = router