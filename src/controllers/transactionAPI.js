const transaction = require('../Models/transaction');
const transactionService = require('../services/transactionService');

/**
 * 
 * @request {account_id, amountToDeposit} req 
 * @response {account_id: 15478qw8wer, balance: 100} res
 * @param {operation: {1: deposit, 2: retirement}}
 */
exports.deposit = function(req, res) {
    const params = req.body;
    try {
        const data = transactionService.deposit(params);
        res.status(200).json({ account_id: data.account_id, balance: data.balance });
    } catch (error) {
        /* console.log("ERROR: ", error);
        errorCode = error.errorCode || 403;
        res.status(errorCode).json(error); */
        res.status(403).send({ message: error });
    }
    res.end();
}

/**
 * 
 * @request {account_id, amountToRetirement, balance} req 
 * @response {account_id: 15478qw8wer, balance: 110} res
 * @param {operation: {1: deposit, 2: retirement}} 
 */
exports.retirement = function(req, res) {
    const params = req.body;
    try {
        const data = transactionService.retirement(params);
        res.status(200).json({ account_id: data.account_id, balance: data.balance });
    } catch (error) {
        res.status(400).json({ message: error });
    }
    res.end();
}

exports.listTransaction = function(req, res) {
    try {
        Lista = transactionService.listTranscation(req.params.account_id);
        res.status(200).json(Lista);
    } catch (e) {
        res.status(400).json({ message: e })
    }
}