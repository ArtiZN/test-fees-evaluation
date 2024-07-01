const { cashOutFee, NATURAL_FEE, JURIDICAL_FEE, FEES_FREE_NATURAL_AMOUNT } = require('./cash-out-fees')

test('cashOutFee natural single more than minimum', () => {
    const mock = {
        "date": "2016-01-05",
        "user_id": 1,
        "user_type": "natural",
        "type": "cash_out",
        "operation": {
            "amount": 11000,
            "currency": "EUR"
        }
    }

    const fee = cashOutFee(mock, {}).fee
    const expected = (mock.operation.amount - FEES_FREE_NATURAL_AMOUNT) * NATURAL_FEE
    expect(fee).toBe(expected); // 30 EUR
})

test('cashOutFee natural single less than minimum', () => {
    const mock = {
        "date": "2016-01-05",
        "user_id": 1,
        "user_type": "natural",
        "type": "cash_out",
        "operation": {
            "amount": 500,
            "currency": "EUR"
        }
    }

    const fee = cashOutFee(mock, {}).fee
    expect(fee).toBe(0);
})

test('cashOutFee natural multiple more than minimum', () => {
    const mock = {
        "date": "2016-01-05",
        "user_id": 1,
        "user_type": "natural",
        "type": "cash_out",
        "operation": {
            "amount": 10000,
            "currency": "EUR"
        }
    }

    const mockMeta = { '1': { '2400': 11000 } }

    const fee = cashOutFee(mock, mockMeta).fee
    const expected = mock.operation.amount * NATURAL_FEE
    expect(fee).toBe(expected);
})

test('cashOutFee natural multiple less than minimum', () => {
    const mock = {
        "date": "2016-01-05",
        "user_id": 1,
        "user_type": "natural",
        "type": "cash_out",
        "operation": {
            "amount": 50,
            "currency": "EUR"
        }
    }

    const mockMeta = { '1': { '2400': 30 } }

    const fee = cashOutFee(mock, mockMeta).fee
    expect(fee).toBe(0);
})

test('cashOutFee natural multiple less than free minimum', () => {
    const mock = {
        "date": "2016-01-05",
        "user_id": 1,
        "user_type": "natural",
        "type": "cash_out",
        "operation": {
            "amount": 1000,
            "currency": "EUR"
        }
    }

    const mockMeta = { '1': { '2400': 500 } }

    const fee = cashOutFee(mock, mockMeta).fee
    const expected = (mock.operation.amount + mockMeta['1']['2400'] - FEES_FREE_NATURAL_AMOUNT) * NATURAL_FEE
    expect(fee).toBe(expected);
})

test('cashOutFee natural multiple less than fee minimum with unused metaInfo', () => {
    const mock = {
        "date": "2016-01-05",
        "user_id": 1,
        "user_type": "natural",
        "type": "cash_out",
        "operation": {
            "amount": 500,
            "currency": "EUR"
        }
    }

    const mockMeta = { '1': { '2300': 1000 } }
    
    const fee = cashOutFee(mock, mockMeta).fee
    expect(fee).toBe(0);
})

test('cashOutFee juridical more than minimum', () => {
    const mock = {
        "date": "2016-01-05",
        "user_id": 1,
        "user_type": "juridical",
        "type": "cash_out",
        "operation": {
            "amount": 10000,
            "currency": "EUR"
        }
    }
    const fee = cashOutFee(mock, {}).fee
    expect(fee).toBe(mock.operation.amount * JURIDICAL_FEE); // 30 EUR
})

test('cashOutFee juridical less than minimum', () => {
    const mock = {
        "date": "2016-01-05",
        "user_id": 1,
        "user_type": "juridical",
        "type": "cash_out",
        "operation": {
            "amount": 11,
            "currency": "EUR"
        }
    }

    expect(cashOutFee(mock, {}).fee).toBe(0.5); // 30 EUR
})

// test('Should return 5 EUR', () => {
//     const mock = {
//         "date": "2016-01-05",
//         "user_id": 1,
//         "user_type": "natural",
//         "type": "cash_out",
//         "operation": {
//             "amount": 20000,
//             "currency": "EUR"
//         }
//     }

//     expect(cashInFee(mock)).toBe(5);
// })