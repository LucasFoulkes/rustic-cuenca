const firebaseAdmin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://rustic-restaurant-default-rtdb.firebaseio.com",
});

const db = firebaseAdmin.database();

module.exports = { db };
