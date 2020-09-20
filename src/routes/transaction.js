const { Router } = require('express');
const router = Router();

const depositController = require('../controllers/transactionAPI');

router.post('/deposit', depositController.add);
router.post('/retirement', depositController.retirement);
module.exports = router;