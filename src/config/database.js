 const moogose = require("mongoose");

 moogose.set('useFindAndModify', false);
 moogose.connect("mongodb://localhost/transactions").then(db => console.log('Db is connected', db.connection.host));

 exports.module = moogose;