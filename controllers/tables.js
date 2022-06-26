const fs = require("fs");

getTables = async (req, res) => {
  console.log("getTables");
  fs.readFile("./database.json", (err, data) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    console.log("File read successfully!");

    res.json(JSON.parse(data));
  });
};

getCurrentTables = async (req, res) => {
  console.log("getCurrentTables");
  res.json({ message: "current tables" });
};

addToWhitelist = async (req, res) => {
  console.log(`${req.params.id} added to whitelist`);
  res.json({ message: "add to whitelist" });
};

module.exports = { getTables, getCurrentTables, addToWhitelist };
