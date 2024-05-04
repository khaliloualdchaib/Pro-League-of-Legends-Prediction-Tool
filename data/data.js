// dataHandler.mjs
import fs from 'fs';
import { parse } from 'csv-parse';

// Function to read CSV file and extract items from a specific column
async function extractItemsFromCSV(csvFilePath, columnIndex) {
    const allItems = new Set();

    // Read CSV file
    const stream = fs.createReadStream(csvFilePath);
    return new Promise((resolve, reject) => {
        stream.pipe(parse({ delimiter: ',' }))
            .on('data', (row) => {
                // Extract item from specified columnIndex
                const item = row[columnIndex];

                if (item && item.trim() !== '') {
                    allItems.add(item.trim());
                }
            })
            .on('end', () => {
                // Resolve with extracted items
                resolve(Array.from(allItems)); // Convert Set to Array
            })
            .on('error', (err) => {
                // Reject with error if any
                reject(err);
            });
    });
}

export { extractItemsFromCSV };
