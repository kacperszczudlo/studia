let c1 = { re: 2, im: 3 };
let c2 = { re: 4, im: -1 };
let result;

function add(comp1, comp2) {
    let newComp = {
        re: comp1.re + comp2.re,
        im: comp1.im + comp2.im
    };
    return newComp;
}

function subtract(comp1, comp2) {
    let newComp = {
        re: comp1.re - comp2.re,
        im: comp1.im - comp2.im
    };
    return newComp;
}

function modulus(comp) {
    return Math.sqrt(comp.re * comp.re + comp.im * comp.im);
}

function toString(comp) {
    if (comp.im >= 0) {
        return `${comp.re} + ${comp.im}i`;
    } else {
        return `${comp.re} - ${Math.abs(comp.im)}i`;
    }
}

console.log("Liczba 1:", toString(c1));
console.log("Liczba 2:", toString(c2));
console.log("--------------------------");

result = add(c1, c2);
console.log("Wynik dodawania:", toString(result));

result = subtract(result, c1);
console.log("Wynik odejmowania:", toString(result));

let mod = modulus(result);
console.log("Moduł z wyniku:", mod);