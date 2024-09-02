import reverseInteger from './0002-reverse-integer';
import fs from 'fs';
import path from 'path';

const inputPath = path.join(__dirname, '../input.txt');
const outputPath = path.join(__dirname, '../output.txt');

// Read and parse the input and output files
const inputLines: string[] = fs.readFileSync(inputPath, 'utf-8').trim().split('\n');
const outputLines: string[] = fs.readFileSync(outputPath, 'utf-8').trim().split('\n');

let allTestsPassed = true;

// Execute each test case
inputLines.forEach((line, index) => {
    const testCase: number = JSON.parse(line.trim());
    const expectedOutput: number = JSON.parse(outputLines[index].trim());
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
