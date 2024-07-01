const fs = require('fs').promises

/**
 * 
 */
async function readFromJSON(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8')
        return JSON.parse(data)
    } catch (err) {
        console.error('Error reading or parsing file', err)
        return null
    }
}

module.exports = {
    readFromJSON
}