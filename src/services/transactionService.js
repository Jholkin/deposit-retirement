exports.retirement = function(saldo, amount) {
    if (saldo > amount) {
        return true;
    } else {
        return false;
    }
}
exports.isAmountRetirementMinorBalance = function(amount, balance) {
    return amount < balance ? true : false;
}


exports.empty = function(amount, account_id) {
    if (amount.length != 0 && account_id.length != 0) {

        return true
    } else {
        return false
    }
}