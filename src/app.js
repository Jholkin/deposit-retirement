const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
require('./config/database');

const moogose = require("mongoose");

moogose.set('useFindAndModify', false);
require('dotenv').config({ path: '.env' });
moogose.connect(process.env.MONGODB_URI, {

    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,

}).then(db => console.log('Db is connected', db.connection.host));
// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuration
const port = process.env.port || 3000;


// Routes
const transactionRouter = require('./routes/transaction');
const e = require('express');

// Functions
app.use('/api/transaction', transactionRouter);



app.listen(port, () => {
    console.log(`Server run in port ${port}`);

});

module.exports = app;