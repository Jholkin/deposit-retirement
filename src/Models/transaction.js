const { model, Schema } = require('mongoose');

const SchemaTransaction = new Schema({

    operation: {
        type: Number,
        require: true,
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

module.exports = model('transaction', SchemaTransaction);