exports.retirement = function (params) {
    try {
        // traer el balance de la cuenta
        let balance = 50;

        // comprobar que el monto a retirar sea menor que el saldo en la cuenta
        if (!this.isAmountRetirementMinorBalance(params.amount, balance)) { throw error }

        // hacer el retiro
        params.new_balance = balance - params.amount;
        params.date = Date();

        // actualizar balance


        // retornar nuevo balance
        const response = { balance: params.new_balance };
        return response;
    } catch (error) {
        throw error;
    }
}

exports.isAmountRetirementMinorBalance = function(amount, balance) {
    return amount < balance ? true : false;
}