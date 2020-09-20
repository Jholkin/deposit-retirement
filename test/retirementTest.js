// mocha -t 100000 test/retirementTest.js --grep xx

const expect = require('chai').expect;
const assert = require("assert");
const retirementService = require('../src/services/retirementService');

describe('Deposit', () => {
    it('Should deposit ok', () => {
        let params = {
            amount: 20,
            account_id: 1
        };

        const res = retirementService.retirement(params);
        console.log(res);
        const new_balance = res.balance;

        expect(res).to.have.property("balance");
        expect(new_balance).to.equal(50-params.amount);
    });

    it('Should deposit failed by account_id not found', () => {

    })
})

describe('Retirement', () => {
    it('Should retirement ok', () => {
        let params = {
            amount: 20,
            account_id: 1
        };

        const res = retirementService.retirement(params);
        console.log(res);
        const new_balance = res.balance;

        expect(res).to.have.status(200);
        expect(res).to.have.property("balance");
        expect(new_balance).to.equal(50-params.amount);
    });

    it('Should retirement failed by insufficient balance', () => {
        let params = {
            amount: 50,
            account_id: 1
        };

        const res = retirementService.retirement(params);
        console.log(res);
        const new_balance = res.balance;

        expect(res).to.have.status(400);
        expect(res).to.have.property("message");
        expect(new_balance).to.equal(50-params.amount);
    })
})