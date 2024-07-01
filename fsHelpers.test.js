const { readFromJSON } = require('./fsHelpers')

test ('read from JSON', async () => {
    const json = await readFromJSON('JSONtest.json')
    const expected = [
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
    expect(json).toStrictEqual(expected)
})

test ('read from JSON with error', async () => {
    const json = await readFromJSON('notExisting.json')
    expect(json).toBe(null)
})