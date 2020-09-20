const { Router } = require('express');
const router = Router();
const transactionAPI = require('../controllers/transactionAPI');

router.post('/deposit', transactionAPI.deposit);
router.post('/retirement', transactionAPI.retirement);

module.exports = router;