const Transaction = require('../Models/transaction');
const errors = require('../config/errors');
const util = require('./util');


exports.deposit = async function(params) {
    try {
        if (!util.empty(params.account_id, params.amount)) { throw errors.errorFormat('BAD_REQUEST'); }
        var balance = util.getBalance(params.account_id);
        //if(balance == 0) { throw {message: 'account not found'};} 

        const transaction = new Transaction({
            account_id: params.account_id,
            amount: params.amount,
            operation: params.operation,
            movement: 'DEPOSIT'
        });
        transaction.save();

        const balanceActual = parseFloat(balance.amount) + parseFloat(transaction.amount);
        let update = await util.sendBalance({amount: transaction.amount, operacion: transaction.operation}, params.account_id);

        const response = { account_id: transaction.account_id, balance: transaction.amount, operation: transaction.movement };
        return response;
    } catch (error) {
        throw error;
    }
}

exports.retirement = async function(params) {
    try {
        if (!util.empty(params.account_id, params.amount)) { throw errors.errorFormat('BAD_REQUEST') }
        var balance = util.getBalance(params.account_id);
        /* if (account == null) throw errors.errorFormat('FORBIDDEN'); */
        if (!this.isAmountRetirementMinorBalance(params.amount, balance.amount)) { throw errors.errorFormat('INSUFFICIENT_BALANCE'); }

        const transaction = new Transaction({
            account_id: params.account_id,
            amount: params.amount,
            operation: params.operation,
            movement: 'RETIREMENT'
        });
        transaction.save();

        const balanceActual = parseFloat(balance.amount) - parseFloat(transaction.amount);
        let update = await util.sendBalance({amount: transaction.amount, operacion: transaction.operation}, params.account_id);

        const response = { account_id: transaction.account_id, balance: transaction.amount, operation: transaction.movement };
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.isAmountRetirementMinorBalance = function(amount, balance) {
    return amount <= balance ? true : false;
}

exports.listTranscationes = async function(account_id) {
    const arreglo = await Transaction.find({ account_id: account_id }).exec();
    return arreglo;
}

