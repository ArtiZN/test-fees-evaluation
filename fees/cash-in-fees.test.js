const { cashInFee, CASH_IN_FEE } = require('./cash-in-fees')

test('Should return less than 5 eur', () => {
    const mock = {
        "date": "2016-01-05",
        "user_id": 1,
        "user_type": "natural",
        "type": "cash_in",
        "operation": {
            "amount": 10000,
            "currency": "EUR"
        }
    }

    expect(cashInFee(mock)).toBe(10000 * CASH_IN_FEE); // 3$
})

test('Should return 5 EUR', () => {
    const mock = {
        "date": "2016-01-05",
        "user_id": 1,
        "user_type": "natural",
        "type": "cash_in",
        "operation": {
            "amount": 20000,
            "currency": "EUR"
        }
    }

    expect(cashInFee(mock)).toBe(5);
})