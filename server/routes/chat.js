const express = require("express");
const router = express.Router();

const { findMessages } = require("../controllers/chat");

router.get("/", (req, res) => {
  findMessages(req, res)
});


module.exports = router;