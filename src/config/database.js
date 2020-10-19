 const moogose = require("mongoose");

 moogose.connect("mongodb://localhost:27017/transactions").then(db => console.log('Db is connected', db.connection.host));

 exports.module = moogose;