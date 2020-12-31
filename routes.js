const express = require("express")
const app = express()
const router = express.Router()
const fs = require("fs")
//html pages
const indexHTML = fs.readFileSync("./public/index.html", "utf8")

router.use("/public", express.static("./public"))
router.get("/", (req, res) => {
    res.send(indexHTML)
})


module.exports = router
