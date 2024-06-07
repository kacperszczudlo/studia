// Klasa reprezentująca skoczka / konika
class Knight {
    constructor() {
        this.type = "KNIGHT";
    }

    validateMove(move) {
        const d1 = Math.abs(move.destinationX-move.sourceX);
        const d2 = Math.abs(move.destinationY-move.sourceY);
        // Sprawdzenie warunków poprawnego ruchu pionka
        if ((d1 === 2 && d2 === 1) || (d1 === 1 && d2 === 2)) {
            return true; // Poprawny ruch o jedno pole do przodu
        } else {
            return false; // Niepoprawny ruch dla pionka
        }
    }
}