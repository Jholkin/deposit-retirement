const modelTransaction = require('../Models/transaction');

exports.deposit = async function(params){
    if (!this.empty(params.account_id, params.amountToDeposit)) { throw {message: 'do not insert empty data in parameters'} }
    // falta validación de datos, como que account_id exista
    const new_deposit = await new modelTransaction({ account_id, amountToDeposit, operation: 1 }).save();
    //await new_deposit.save();
    res.json({ account_id: new_deposit.account_id, balance: new_deposit.balance });
}

exports.retirement = function(params) {
    if (!this.empty(params.amount, params.balance)) { throw {message: 'do not insert empty data in parameters'} }
    // falta validación de datos, como que account_id exista
    if (!this.isAmountRetirementMinorBalance(params.amount, params.balance)) { throw {message: 'insufficient balance'} }
    const new_retirement = await new modeltransaction({ amount, account_id, operation: 2 }).save();
    //await new_retirement.save();
    res.json({ account_id: new_retirement.account_id, balance: new_retirement.balance });
}

exports.isAmountRetirementMinorBalance = function(amount, balance) {
    return amount < balance ? true : false;
}

exports.empty = function(amount, account_id) {
    return (amount.length != 0 && account_id.length != 0) ? true: false;
}