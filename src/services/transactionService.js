const Transaction = require("../Models/transaction");
const errors = require("../config/errors");
const util = require("./util");

exports.deposit = async function (params) {
  try {
    if (!util.empty(params.account_id, params.amount)) {
      throw errors.errorFormat("BAD_REQUEST");
    }
    //let resToken = await util.getToken();
    //console.log(resToken);
    var balance = await util.getBalance(params.account_id);
    const transaction = new Transaction({
      account_id: params.account_id,
      amount: params.amount,
      operation: 0,
      movement: "deposit",
      create: new Date(),
    });
    await transaction.save();

    let response1 = await util.sendBalance_v2(
      { amount: transaction.amount, operacion: transaction.operation },
      params.account_id
    );
    let token = await util.getToken();
    let responseLog = await util.log_v2(
      { accountId: transaction.account_id, event: transaction.movement },
      token
    );

    const response = {
      account_id: transaction.account_id,
      balance: transaction.amount,
      operation: transaction.movement,
    };
    return response;
  } catch (error) {
    throw error;
  }
};

exports.retirement = async function (params) {
  try {
    if (!util.empty(params.account_id, params.amount)) {
      throw errors.errorFormat("BAD_REQUEST");
    }
    //let resToken = await util.getToken();
    var balance = await util.getBalance(params.account_id);
    /* if (account == null) throw errors.errorFormat('FORBIDDEN'); */
    if (!this.isAmountRetirementMinorBalance(params.amount, balance.amount)) {
      throw errors.errorFormat("INSUFFICIENT_BALANCE");
    }

    const transaction = new Transaction({
      account_id: params.account_id,
      amount: params.amount,
      operation: 1,
      movement: "withdraw",
      create: new Date(),
    });
    await transaction.save();

    var balanceUpdated = await util.sendBalance_v2(
      { amount: transaction.amount, operacion: transaction.operation },
      params.account_id
    );
    let token = await util.getToken();
    let res = await util.log_v2(
      { accountId: transaction.account_id, event: transaction.movement },
      token
    );
    const response = {
      account_id: transaction.account_id,
      balance: transaction.amount,
      operation: transaction.movement,
    };
    //console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};

exports.isAmountRetirementMinorBalance = function (amount, balance) {
  return amount <= balance ? true : false;
};

exports.listTranscationes = async function (account_id) {
  const arreglo = await Transaction.find({ account_id: account_id }).exec();
  return arreglo;
};
