const { model, Schema } = require('mongoose');

const SchemaRetirement = new Schema({

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

Module.exports = model('retiro', SchemaRetirement);