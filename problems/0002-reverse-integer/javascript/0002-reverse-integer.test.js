const reverseInteger = require('./0002-reverse-integer');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../input.txt');
const outputPath = path.join(__dirname, '../output.txt');

// Read and parse the input and output files
const inputLines = fs.readFileSync(inputPath, 'utf-8').trim().split('\n');
const outputLines = fs.readFileSync(outputPath, 'utf-8').trim().split('\n');

let allTestsPassed = true;

// Execute each test case
inputLines.forEach((line, index) => {
    const testCase = JSON.parse(line.trim());
    const expectedOutput = JSON.parse(outputLines[index].trim());
    const actualOutput = reverseInteger(testCase);

    if (actualOutput === expectedOutput) {
        
    } else {
        
        
        
        
        allTestsPassed = false;
    }
});

// Print the overall result
if (allTestsPassed) {
    
} else {
    
}
