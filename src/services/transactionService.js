const Transaction = require('../Models/transaction');
const errors = require('../config/errors');
const transaction = require('../Models/transaction');

let ACCOUNT = [
    { account_id: 1, balance: 100 },
    { account_id: 2, balance: 0 },
    { account_id: 3, balance: 20 },
    { account_id: 4, balance: 1000 },
    { account_id: 5, balance: 42 },
];

exports.deposit = function(params) {
    try {
        if (!this.empty(params.account_id, params.amount)) { throw errors.errorFormat('BAD_REQUEST'); }
        // trae los datos del microservicio cuentas
        //let account = await microserviceAccount.findOne({account_id: params.account_id});
        let account = ACCOUNT.find(a => a.account_id == params.account_id);
        if (account == null) { throw errors.errorFormat('FORBIDDEN'); }

        const transaction = new Transaction({
            account_id: params.account_id,
            amount: params.amount,
            operation: 1,
            movement: 'DEPOSIT'
        });
        transaction.save();

        account.balance = transaction.amount + account.balance;
        // se le envía los datos para que se actualice la cuenta en el microservicio cuentas
        //let accountSave = await microserviceAccount.findByIdAndUpdate(account);

        // se envía la transación a log
        //await this.log({account_id: params.account_id, balance: account.balance});

        const response = { account_id: transaction.account_id, balance: account.balance };
        return response;
    } catch (error) {
        throw error;
    }
}

exports.retirement = function(params) {
    if (!this.empty(params.account_id, params.amount)) { throw errors.errorFormat('BAD_REQUEST') }
    // trae los datos del microservicio cuentas
    //let account = await microserviceAccount.findOne({account_id: params.account_id});
    let account = ACCOUNT.find(a => a.account_id == params.account_id);

    if (account == null) throw errors.errorFormat('FORBIDDEN');

    if (!this.isAmountRetirementMinorBalance(params.amount, account.balance)) { throw { message: 'insufficient balance' } }

    const transaction = new Transaction({
        account_id: params.account_id,
        amount: params.amount,
        operation: 2,
        movement: 'RETIREMENT'
    });
    transaction.save();

    account.balance = account.balance - transaction.amount;
    // se le envía los datos para que se actualice la cuenta en el microservicio cuentas
    //let accountSave = await microserviceAccount.findByIdAndUpdate(account);
    // se envía la transación a log
    //await this.log({account_id: params.account_id, balance: account.balance});

    const response = { account_id: transaction.account_id, balance: account.balance };
    return response;
}

exports.isAmountRetirementMinorBalance = function(amount, balance) {
    return amount <= balance ? true : false;
}

exports.empty = function(amount, account_id) {
    return (amount.length != 0 && account_id.length != 0) ? true : false;
}

exports.listTranscation = async function(account_id) {

    let account = await transaction.findOne({ account_id: account_id });
    return account;
}