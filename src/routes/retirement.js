const { Router} = require('express');
const router = Router();
const requirementAPI = require('../controllers/retirementAPI');

//router.get('/retirement', requirementAPI.retirement);

router.get('/', (req, res) => {
    res.send('hello');
});

module.exports = router;