const transactionService = require('../services/transactionService');

/**
 * 
 * @request {account_id, amountToDeposit} req 
 * @response {account_id: 15478qw8wer, balance: 100} res
 * @param {operation: {1: deposit, 2: retirement}}
 */
exports.deposit = async function(req, res) {
    const params = req.body;
    try {
        const data = transactionService.deposit(params);
        res.status(200).json({account_id: data.account_id, balance: data.balance});
    } catch (error) {
        res.status(400).json({message: error})
    }
}

/**
 * 
 * @request {account_id, amount, balance} req 
 * @response {account_id: 15478qw8wer, balance: 110} res
 * @param {operation: {1: deposit, 2: retirement}} 
 */
exports.retirement = async function(req, res) {
    const params = req.body;
    try {
        const data = transactionService.retirement(params);
        res.status(200).json({account_id: data.account_id, balance: data.balance});
    } catch (error) {
        res.status(400).json({message: error});
    }
}