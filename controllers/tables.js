const { db } = require("../firebase");
const fs = require("fs");

getTables = async (req, res) => {
  console.log("getTables");
  fs.readFile("./database.json", (err, data) => {
    if (err) {
      return;
    }
    res.json(JSON.parse(data));
  });
};

getCurrentTables = async (req, res) => {
  res.json({ message: "current tables" });
};

addToWhitelist = async (req, res) => {
  const ref = db.ref("/whitelist");
  ref.once("value", function (snapshot) {
    if (snapshot.val() === null) {
      ref.set([req.body.index]);
    } else {
      const whitelist = snapshot.val();
      if (!whitelist.includes(req.body.index)) {
        whitelist.push(req.body.index);
      }
      ref.set(whitelist);
    }
  });
  //  for some reason this bit, yeah even the .json bit is very important
  res.status(200).json({ message: "added to whitelist" });
};

removeFromWhitelist = async (req, res) => {
  const ref = db.ref("/whitelist");
  ref.once("value", function (snapshot) {
    if (snapshot.val() === null) {
      ref.set([req.body.index]);
    } else {
      const whitelist = snapshot.val();
      if (whitelist.includes(req.body.index)) {
        whitelist.splice(whitelist.indexOf(req.body.index), 1);
      }
      ref.set(whitelist);
    }
  });
  res.status(200).json({ message: "removed from whitelist" });
};

getWhitelist = async (req, res) => {
  const ref = db.ref("/whitelist");
  ref.once("value", function (snapshot) {
    if (snapshot.val() === null) {
      ref.set([]);
    } else {
      res.json(snapshot.val());
    }
  });
};

module.exports = {
  getTables,
  getCurrentTables,
  addToWhitelist,
  getWhitelist,
  removeFromWhitelist,
};
