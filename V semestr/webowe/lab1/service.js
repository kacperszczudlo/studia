function filterOddNumbers(numbersArray) {
    const oddNumbers = numbersArray.filter(number => number % 2 !== 0);
    return oddNumbers;
}

module.exports = {
    filterOddNumbers: filterOddNumbers
};