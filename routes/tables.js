const express = require("express");
router = express.Router();
tables = require("../controllers/tables");

router.get("/", tables.getTables);
router.get("/current", tables.getCurrentTables);
router.get("/whitelist", tables.getWhitelist);
router.post("/whitelist/add", tables.addToWhitelist);
router.post("/whitelist/remove", tables.removeFromWhitelist);

module.exports = router;
