const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
require('./config/database');

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuration
app.set('port', process.env.PORT || 3000);

// Routes
const transactionRouter = require('./routes/transaction');

// Functions
app.use('/api/v2/transaction', transactionRouter);

app.listen(app.get('port'), () => {
    console.log(`Server run ins port ${app.get('port')}`);
});

module.exports = app;