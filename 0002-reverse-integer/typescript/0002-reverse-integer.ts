const reverseInteger = (num: number): number => {
    let reversed = 0;
    const isNegative = num < 0;
    let remainder = isNegative ? -num : num;

    while (remainder > 0) {
        reversed = reversed * 10 + remainder % 10;
        remainder = Math.floor(remainder / 10);
    }

    // Handle negative case
    if (isNegative) {
        reversed = -reversed;
    }

    return reversed;
};

export default reverseInteger;
