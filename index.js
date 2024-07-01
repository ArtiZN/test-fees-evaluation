const { readFromJSON } = require('./fsHelpers');
const { processFees } = require('./fees/index');

// entry
(async () => {
    const data = await readFromJSON('example.json');
    if (data) {
        if (Array.isArray(data)) {
            const feesReduced = processFees(data) // string[]
            feesReduced.forEach((i) => {
                console.log(i)
            })
        }
    }
})();
