const { cashInFee } = require('./cash-in-fees');
const { cashOutFee } = require('./cash-out-fees');
const { roundFee } = require('../helpers')
/*  Funtion for processing fees
    metaInfo is information for weekly fees in format
    {
        [userId]: {
            [weekNumber]: number
        }
    }
    returns string array of fees 
*/
const processFees = (data) => {
    const feesReduce = data.reduce((acc, transaction) => {
        if (transaction.type === 'cash_in') {
            const fee = roundFee(cashInFee(transaction))
            return {
                ...acc,
                fees: [...acc.fees, fee],
            }
        }
        else {
            const cashOutInfo = cashOutFee(transaction, acc.metaInfo)
            const fee = roundFee(cashOutInfo.fee)
            const { metaInfo } = cashOutInfo
            return {
                fees: [...acc.fees, fee],
                metaInfo
            }
        }
    }, { fees: [], metaInfo: {} })
    return feesReduce
}

module.exports = {
    processFees
}