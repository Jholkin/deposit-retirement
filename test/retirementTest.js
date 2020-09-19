// mocha -t 100000 test/retirementTest.js --grep xx

const expect = require('chai').expect;
const assert = require("assert");
const retirementService = require('../src/services/retirementService');

describe('Retirement', () => {
    it('Should retirement ok', () => {
        let params = {
            amount: 20,
            account_id: 1
        };

        const res = retirementService.retirement(params);
        console.log(res);
        const new_balance = res.balance;

        expect(res).to.have.property("balance");
        expect(new_balance).to.equal(50-params.amount);
    })
})