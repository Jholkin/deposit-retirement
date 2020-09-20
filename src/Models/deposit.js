const { model, Schema } = require('mongoose');

const SchemaDeposit = new Schema({

    id: {
        type: Number,
        unique: true,
        index: true,
        required: true

    },
    amount: {
        type: Number,
        required: true,
    },
    account_id: {
        type: Number,
        required: true
    },

}, {
    timestamps: true,
})

module.exports = model('deposito', SchemaDeposit);