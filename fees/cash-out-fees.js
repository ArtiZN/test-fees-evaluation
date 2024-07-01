const { getWeekNumber } = require('../helpers')

const JURIDICAL_FEE = 0.003 // 0.3%
const MINIMAL_JURIDICAL_FEE = 0.5 // 0.5 EUR

const FEES_FREE_NATURAL_AMOUNT = 1000 // 1000 EUR
const NATURAL_FEE = 0.003 // 0.3%

// some sort of enum
const USER_TYPES = {
    juridical: 'juridical',
    natural: 'natural'
}

const cashOutFee = (transaction, metaInfo) => {
    const { 
        user_id: userId,
        user_type: userType, 
        operation: { amount }, 
        date, 
    } = transaction

    let result;

    // Juridical fee
    if (userType === USER_TYPES.juridical) {
        const fee = amount * JURIDICAL_FEE
        result = fee > MINIMAL_JURIDICAL_FEE ? fee : MINIMAL_JURIDICAL_FEE
    }

    // Natural fee
    else {
        const weekNumber = getWeekNumber(date)
        try { // I used try-catch to reduce the amount of 'if' because anywaay I need only metaInfo[userId][weekNumber]
            const amountByWeek = metaInfo[userId][weekNumber]
            if (amountByWeek > FEES_FREE_NATURAL_AMOUNT) {
                result = amount * NATURAL_FEE
            } else {
                const diff = (amount + amountByWeek - FEES_FREE_NATURAL_AMOUNT)
                result = diff > 0 ? diff * NATURAL_FEE : 0
            }
            metaInfo = {
                ...metaInfo,
                [userId]: {
                    ...metaInfo[userId],
                    [weekNumber]: (amountByWeek ?? 0) + amount
                }
            }
        } catch (e) {
            const diff = amount - FEES_FREE_NATURAL_AMOUNT
                const amountToFee = diff > 0 ? diff : 0
                result = amountToFee * NATURAL_FEE
                metaInfo = {
                    ...metaInfo,
                    [userId]: {
                        ...metaInfo[userId],
                        [weekNumber]: amount
                    }
                }
        }
    }
    return {
        fee: result,
        metaInfo
    }


}

module.exports = {
    cashOutFee,
    JURIDICAL_FEE,
    NATURAL_FEE,
    FEES_FREE_NATURAL_AMOUNT
}