// This is likely an integrational test and not unit tests 
// at this point but anyway it's better to have it than not to have

const { processFees } = require('./index');

test('processFees', () => {
    const mockData = [
        {
            date: '2016-01-05',
            user_id: 1,
            user_type: 'natural',
            type: 'cash_in',
            operation: { amount: 200, currency: 'EUR' }
        },
        {
            date: '2016-01-06',
            user_id: 2,
            user_type: 'juridical',
            type: 'cash_out',
            operation: { amount: 300, currency: 'EUR' }
        },
        {
            date: '2016-01-06',
            user_id: 1,
            user_type: 'natural',
            type: 'cash_out',
            operation: { amount: 30000, currency: 'EUR' }
        },
        {
            date: '2016-01-07',
            user_id: 1,
            user_type: 'natural',
            type: 'cash_out',
            operation: { amount: 1000, currency: 'EUR' }
        },
        {
            date: '2016-01-07',
            user_id: 1,
            user_type: 'natural',
            type: 'cash_out',
            operation: { amount: 100, currency: 'EUR' }
        },
        {
            date: '2016-01-10',
            user_id: 1,
            user_type: 'natural',
            type: 'cash_out',
            operation: { amount: 100, currency: 'EUR' }
        },
        {
            date: '2016-01-10',
            user_id: 2,
            user_type: 'juridical',
            type: 'cash_in',
            operation: { amount: 1000000, currency: 'EUR' }
        },
        {
            date: '2016-01-10',
            user_id: 3,
            user_type: 'natural',
            type: 'cash_out',
            operation: { amount: 1000, currency: 'EUR' }
        },
        {
            date: '2016-02-15',
            user_id: 1,
            user_type: 'natural',
            type: 'cash_out',
            operation: { amount: 300, currency: 'EUR' }
        }
    ]

    const expected = [
        '0.06', '0.90', '87.00', 
        '3.00', '0.30', '0.30',
        '5.00', '0.00', '0.00'
    ]
    const fees = processFees(mockData)
    expect(fees).toStrictEqual(expected)
})