// Rounds any number with 2 decimals
// Returns string
const roundFee = (amount) => {
    return (Math.ceil(amount * 100)/100).toFixed(2)
}

// Get week number since 1 Jan 1970
// Returns number
function getWeekNumber(dateString) {
    const currentDate = new Date(dateString)
    const startDate = new Date(1970, 0, 5) // January 5, 1970 because it's the first Monday since 1 Jan 1970
    const millisecondsPerDay = 24 * 60 * 60 * 1000
    const daysFromStart = Math.floor((currentDate - startDate) / millisecondsPerDay)
    const weekNumber = Math.floor(daysFromStart / 7)
    return weekNumber
}

module.exports = {
    roundFee,
    getWeekNumber
}

