const express = require("express");
router = express.Router();
tables = require("../controllers/tables");

router.get("/", tables.getTables);
router.get("/current", tables.getCurrentTables);
router.post("/whitelist/:id", tables.addToWhitelist);

module.exports = router;
