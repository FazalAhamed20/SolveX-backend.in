const fs = require('fs');
const path = require('path');
const twoSum = require('./0001-two-sum');


const inputPath = path.join(__dirname, '../input.txt');

const outputPath = path.join(__dirname, '../output.txt');

const input = fs.readFileSync(inputPath, 'utf-8').trim().split('\n').map(line => JSON.parse(line));
const expectedOutput = fs.readFileSync(outputPath, 'utf-8').trim().split('\n').map(line => JSON.parse(line));

let allTestsPassed = true;

input.forEach((testCase, index) => {
    const [nums, target] = testCase;
    const actualOutput = twoSum(nums, target);

    if (JSON.stringify(actualOutput) === JSON.stringify(expectedOutput[index])) {
        
    } else {
        
        }`);
        }`);
        allTestsPassed = false;
    }
});

if (allTestsPassed) {
    
} else {
    
}
