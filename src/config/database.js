 const moogose = require("mongoose");
 require('dotenv').config({ path: 'variables.env' })

 moogose.set('useFindAndModify', false);

 moogose.connect(process.env.DBMONGODB_URI, {

     useNewUrlParser: true,
     useUnifiedTopology: true,
     useFindAndModify: false,
     useCreateIndex: true,

 }).then(db => console.log('Db is connected', db.connection.host));