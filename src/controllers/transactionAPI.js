const transaction = require('../Models/transaction');
const transactionService = require('../services/transactionService');
const util = require('../services/util');

/**
 * 
 * @request {account_id} req 
 * @response {token: "asf56sdfa665f32sdafeeg"} res 
 */
exports.getToken = function(req, res){
    const params = req.body;
    try {
        const data = util.createToken(params);
        res.json({token:data});
    } catch (error) {
        throw error;
    }
}

/**
 * 
 * @request {account_id, amountToDeposit} req 
 * @response {account_id: 15478qw8wer, balance: 100} res
 * @param {operation: {0: deposit, 1: retirement}}
 */
exports.deposit = async function(req, res) {
    const params = req.body;
    try {
        const data = await transactionService.deposit(params);
        res.json({ account_id: data.account_id, balance: data.balance, operation: data.operation });
    } catch (error) {
        console.log("error: ",error);
        res.status(500).json(error);
    }
    res.end();
}

/**
 * 
 * @request {account_id, amountToRetirement, balance} req 
 * @response {account_id: 15478qw8wer, balance: 110} res
 * @param {operation: {0: deposit, 1: retirement}} 
 */
exports.retirement = async function(req, res) {
    const params = req.body;
    try {
        const data = await transactionService.retirement(params);
        console.log(data);
        res.json({ account_id: data.account_id, balance: data.balance, operation: data.operation });
        res.end();
    } catch (error) {
        console.log("ERROR: ", error);
        return res.status(500).send(error);
    }
    res.end();
}

/**
 * 
 * @request {account_id} req 
 * @param {} res 
 */
exports.listTransaction = async function(req, res) {
    try {
        const myJson = await transactionService.listTranscationes(req.params.account_id);
        res.json(myJson);
    } catch (error) {
        console.log("ERROR: ",error);
        res.status(500).json(error);
    }
    res.end();
}