const service = require('./service.js');

const myNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const oddNumbers = service.filterOddNumbers(myNumbers);

console.log("Liczby nieparzyste z tablicy:");
oddNumbers.forEach(function(number) {
    console.log(number);
});