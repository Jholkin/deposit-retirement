const Transaction = require('../Models/transaction');
const errors = require('../config/errors');
const transaction = require('../Models/transaction');
const { json, response, urlencoded } = require('express');
const config = require('mongoose-schema-jsonschema/config');
const { array_jsonSchema } = require('mongoose-schema-jsonschema/lib/types');
const { get } = require('../routes/transaction');
const mongoose = require('mongoose-schema-jsonschema')();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

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

        const transaction = new Transaction({
            account_id: params.account_id,
            amount: params.amount,
            operation: 0,
            movement: 'DEPOSIT'
        });

        transaction.save();

        var balance = GetBalance(params.account_id);

        const BalanceActual = parseInt(balance.amount) + parseInt(transaction.amount);



        const response = { account_id: transaction.account_id, balance: BalanceActual, operation: transaction.operation };
        return response;
    } catch (error) {
        throw error;
    }
}

exports.retirement = function(params) {
    if (!this.empty(params.account_id, params.amount)) { throw errors.errorFormat('BAD_REQUEST') }
    // trae los datos del microservicio cuentas
    //let account = await microserviceAccount.findOne({account_id: params.account_id});
    /* let account = ACCOUNT.find(a => a.account_id == params.account_id);
     */
    /* if (account == null) throw errors.errorFormat('FORBIDDEN'); */
    if (!this.isAmountRetirementMinorBalance(params.amount, account.balance)) { throw { message: 'insufficient balance' } }

    const transaction = new Transaction({
        account_id: params.account_id,
        amount: params.amount,
        operation: 1,
        movement: 'RETIREMENT'
    });
    transaction.save();

    var balance = GetBalance(params.account_id);

    const BalanceActual = parseInt(balance.amount) - parseInt(transaction.amount);

    // se le envía los datos para que se actualice la cuenta en el microservicio cuentas
    //let accountSave = await microserviceAccount.findByIdAndUpdate(account);
    // se envía la transación a log
    //await this.log({account_id: params.account_id, balance: account.balance});

    const response = { account_id: transaction.account_id, balance: account.balance, operation: transaction.operation };
    return response;
}

exports.isAmountRetirementMinorBalance = function(amount, balance) {
    return amount <= balance ? true : false;
}

exports.empty = function(amount, account_id) {
    return (amount.length != 0 && account_id.length != 0) ? true : false;
}

exports.listTranscationes = async function(account_id) {


    const arreglo = await transaction.find({ account_id: account_id }).exec();

    return arreglo;

}

function Get(url) {
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET", url, false);
    Httpreq.send(null);
    return Httpreq.responseText;
}

function GetBalance(param) {
    let account = "https://apigesbanc.herokuapp.com/api/v1/checkbalance/" + param;
    var balance = JSON.parse(Get(account));
    return balance;
}