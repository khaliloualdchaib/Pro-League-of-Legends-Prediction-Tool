const fs = require('fs');
const { parse } = require('csv-parse');



// Function to read CSV file and extract item from a specific column
function extractItemsFromCSV(csvFilePath, columnIndex, callback) {
    const all_rownames = new Set();

    // Read CSV file
    fs.createReadStream(csvFilePath)
        .pipe(parse({ delimiter: ',' }))
        .on('data', (row) => {
            // Extract item from specified columnIndex
            const rowname = row[columnIndex];

            if (rowname && rowname.trim() !== '') {
                all_rownames.add(rowname.trim());
            }
        })
        .on('end', () => {
            // Call callback function with extracted item
            callback(null, all_rownames);
        })
        .on('error', (err) => {
            // Call callback function with error if any
            console.error('Error reading CSV file:', err);
            callback(err, null);
        });
}

// Usage example
const csvFilePath = 'teams.csv';
const columnIndex = 3; // Change this to the name of your column containing item
let extractedteams; // Variable to save the extracted teams

extractItemsFromCSV(csvFilePath, columnIndex, (err, items) => {
    if (err) {
        console.error('Error reading CSV file:', err);
    } else {
        extractedteams = items; // Save the extracted teams to the variable
        console.log('Extracted items:', items);
    }
});