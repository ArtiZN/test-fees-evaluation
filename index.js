const { readFromJSON } = require('./fsHelpers');
const { processFees } = require('./fees/index');

// entry
(async () => {
    const args = process.argv;
    if (args.length < 3) {
        console.error('Usage: node app.js <path_to_input_json>');
        process.exit(1);
    }
    
    const inputFilePath = args[2];

    if (!fs.existsSync(inputFilePath)) {
        console.error(`File not found: ${inputFilePath}`);
        process.exit(1);
    }

    const data = await readFromJSON(inputFilePath);
    if (data) {
        if (Array.isArray(data)) {
            const feesReduced = processFees(data) // string[]
            feesReduced.forEach((i) => {
                console.log(i)
            })
        }
    }
})();
