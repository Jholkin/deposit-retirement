const requirementService = require('../services/retirementService');

exports.retirement = function (req, res) {
    const params = req.body;
    try {
        const data = requirementService.retirement(params);
        res.status(200).send();
    } catch (error) {
        console.log(error);
        res.status(400).send();
    }
    res.end();
}