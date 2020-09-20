const { Router } = require('express');
const routes = require('../routes/retirement');
const router = Router();

const depositController = require('../controllers/depositAPI');

router.post('/add', depositController.add);
router.put('/update', depositController.update);
module.exports = router;