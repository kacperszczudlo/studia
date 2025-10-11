const students = ["Olek", "Janek", "Stefan", "Tymek", "Sławek"];

function drawPerson(peopleArray) {
    const randomIndex = Math.floor(Math.random() * peopleArray.length);
    return peopleArray[randomIndex];
}

const randomStudent = drawPerson(students);
console.log("Wylosowana osoba to:", randomStudent);