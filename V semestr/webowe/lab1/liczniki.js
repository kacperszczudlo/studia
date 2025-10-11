function randomNumbersWithInterval(count, intervalTime) {
    let drawnCount = 0;
    console.log(`Rozpoczynam losowanie ${count} liczb co ${intervalTime}ms...`);

    const myInterval = setInterval(function() {
        if (drawnCount >= count) {
            clearInterval(myInterval);
            console.log("Zakończono losowanie.");
            return;
        }
        const randomNumber = Math.random();
        drawnCount++;
        console.log(`Losowanie ${drawnCount}: ${randomNumber}`);
    }, intervalTime);
}

function greetUser(userName) {
    console.log(`\nUżytkownik ${userName} połączył się z serwerem.`);
    console.log("Powitanie będzie wyświetlane co 3 sekundy. Naciśnij Ctrl+C, aby zakończyć.");
    
    setInterval(function() {
        console.log(`Witaj, ${userName}!`);
    }, 3000);
}

randomNumbersWithInterval(5, 1000);