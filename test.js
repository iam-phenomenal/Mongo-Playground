const fs = require('fs');

function arrayToCSV(array, filePath) {
    // Convert array of objects to array of values (assuming each object has a single key-value pair)

    // Join all values into a single CSV string
    const csvString = array.join(',');

    // Write the CSV string to a file
    fs.writeFile(filePath, csvString, (err) => {
        if (err) {
            console.error('Error writing to file', err);
        } else {
            console.log('CSV file has been written successfully');
        }
    });
}

arrayToCSV(phoneArray, "nonTopUp.csv") 