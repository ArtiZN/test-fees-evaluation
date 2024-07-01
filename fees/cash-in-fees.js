// Cash-In constants
const CASH_IN_FEE = 0.0003  // 0.03%
const MAX_CASH_FEE = 5      // 5$

const cashInFee = (transaction) => {
    const fee = transaction.operation.amount * CASH_IN_FEE
    return fee < MAX_CASH_FEE ? fee : MAX_CASH_FEE
}

module.exports = { 
    cashInFee,
    CASH_IN_FEE // for tests
}