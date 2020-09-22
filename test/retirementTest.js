// mocha -t 100000 test/retirementTest.js --grep xx

const expect = require('chai').expect;
const assert = require("assert");
const transactionService = require('../src/services/transactionService');

describe('Deposit', () => {
    it('Should deposit ok', () => {
        let params = {
            account_id: 1,
            amount: 20
        };

        const res = transactionService.deposit(params);
        const new_balance = res.balance;

        expect(res).to.have.property("account_id");
        expect(res).to.have.property("balance");
        //expect(new_balance).to.equal(50-params.amount);
    });

    /* it('Should deposit failed by account_id not found', () => {
        let params = {
            account_id: 6,
            amount: 20
        };

        const res = transactionService.deposit(params);
        console.log("res in test: ", res);
        expect(res).to.have.property("The authentication for de microservice are incorrect");
    }) */
})

describe('Retirement', () => {
    it('Should retirement ok', () => {
        let params = {
            account_id: 3,
            amount: 20
        };

        const res = transactionService.retirement(params);

        expect(res).to.have.property("account_id");
        expect(res).to.have.property("balance");
    });

    it('Should retirement failed by insufficient balance', () => {
        let params = {
            account_id: 2,
            amount: 50
        };

        const res = transactionService.retirement(params);

        //expect(res).to.have.status(400);
        expect(res).to.have.property("message");
    })
})