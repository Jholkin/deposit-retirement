const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
require('./config/database');
require('dotenv').config({ path: 'variables.env' });

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuration
const port = process.env.port || 3000;
const host = process.env.host || '0.0.0.0'

// Routes
const transactionRouter = require('./routes/transaction');
const e = require('express');

// Functions
app.use('/api/transaction', transactionRouter);


app.listen(port, () => {
    console.log(`Server run in port ${port}`);
});

module.exports = app;