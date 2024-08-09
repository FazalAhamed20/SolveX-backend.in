const fs = require('fs');
const path = require('path');
const twoSum = require('./0001-two-sum');


const inputPath = path.join(__dirname, '../input.txt');
console.log("...",inputPath);
const outputPath = path.join(__dirname, '../output.txt');

const input = fs.readFileSync(inputPath, 'utf-8').trim().split('\n').map(line => JSON.parse(line));
const expectedOutput = fs.readFileSync(outputPath, 'utf-8').trim().split('\n').map(line => JSON.parse(line));

let allTestsPassed = true;

input.forEach((testCase, index) => {
    const [nums, target] = testCase;
    const actualOutput = twoSum(nums, target);

    if (JSON.stringify(actualOutput) === JSON.stringify(expectedOutput[index])) {
        console.log(`Test case ${index + 1} passed.`);
    } else {
        console.log(`Test case ${index + 1} failed.`);
        console.log(`Expected: ${JSON.stringify(expectedOutput[index])}`);
        console.log(`Got: ${JSON.stringify(actualOutput)}`);
        allTestsPassed = false;
    }
});

if (allTestsPassed) {
    console.log('All test cases passed!');
} else {
    console.log('Some test cases failed.');
}
