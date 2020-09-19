const express = require('express');
const app = express();
require('./config/database');

// Routes
const retiremetRouter = require('./routes/retirement');

// Configuration
const port = 3000;


// Middleware
app.use(express.json());

<<<<<<< HEAD
// Routes
const retiremetRouter = require('./routes/retirement');
const depostiRouter = require('./routes/deposit');

=======
>>>>>>> 6477c151e87ca0898aa6deb8719c3ce56a2104ab
// Functions
app.get('/', (req, res) => {
    res.send('Hello Microservices');
});

app.use('/api/retirement', retiremetRouter);
<<<<<<< HEAD
app.use('/api/deposit', depostiRouter);
=======
>>>>>>> 6477c151e87ca0898aa6deb8719c3ce56a2104ab

app.listen(port, () => {
    console.log(`Server run in port ${port}`);
});

module.exports = app;