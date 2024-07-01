const { roundFee, getWeekNumber } = require('./helpers')

test('Should return 0 for Jan 6 1970', () => {
    expect(getWeekNumber('1970-01-06')).toBe(0);
})
test('Should return 2843 for Jul 1 2024', () => {
    expect(getWeekNumber('2024-07-01')).toBe(2843); // 2843 weeks proof: https://www.timeanddate.com/date/durationresult.html?d1=5&m1=01&y1=1970&d2=1&m2=7&y2=2024 
})

test('Should return 5.00 for 5', () => {
    expect(roundFee(5)).toBe('5.00');
})
test('Should return 3.22 for 3.2123', () => {
    expect(roundFee(3.2123)).toBe('3.22');
})
test('Should return 0.00 for 0', () => {
    expect(roundFee(0)).toBe('0.00');
})