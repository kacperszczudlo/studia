function appendToDisplay(value){
    const display = document.getElementById('display');
    display.value += value;
}

function clearDisplay(){
    document.getElementById('display').value = '';
}

function calculateResult(){
    try {
        const display = document.getElementById('display');
        const input = display.value;

        if (input.includes('/0')) {
            display.value = 'Nie można dzielić przez zero';
            return;
        }

        const result = eval(input);
        display.value = result;
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
}
