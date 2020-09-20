const modeltransaction = require('../Models/transaction');
const transaction = require('../services/transactionService');

/* Operation -> 1 (Deposito)
    Operation -> 2 (Retiro) */

exports.add = async function(req, res) {
    const { amount, account_id } = req.body;
    if (transaction.empty(amount, account_id)) {
        const new_deposit = new modeltransaction({ amount, account_id, operation: 1 });
        await new_deposit.save();
        res.json({
            message: 'successful deposit',

        });
    } else {
        res.json({
            message: 'do not insert empty data in parameters',

        });

    }

}
exports.retirement = async function(req, res) {

    var { amount, account_id, saldo } = req.body;
    if (transaction.empty(amount, saldo)) {
        if (transaction.retirement(saldo, amount)) {
            const new_retirement = new modeltransaction({ amount, account_id, operation: 2 });
            await new_retirement.save();
            res.json({
                message: 'successful retirement',

            });
        } else {
            res.json({
                message: 'insufficient balance',

            });
        }
    } else {
        res.json({
            message: 'do not insert empty data in parameters',

        });
    }
}