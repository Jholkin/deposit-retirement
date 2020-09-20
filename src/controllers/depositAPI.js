const { createIndexes } = require('../Models/deposit');
const deposit = require('../Models/deposit');
exports.add = async function(req, res) {
    const { amount, account_id, id } = req.body;
    const new_deposit = new deposit({ amount, account_id, id });
    await new_deposit.save();
    res.send('se agrego un deposito');

}


exports.update = async function(req, res) {

    var { amount, account_id } = req.body;

    datos = parseInt(amount);


    const doc = await deposit.findOneAndUpdate({
        account_id: account_id
    }, { $set: { amount: 15 + datos } }, { upsert: false });
    res.send('se agrego saldo correctamente');
}