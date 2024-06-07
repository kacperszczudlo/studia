// Klasa reprezentująca pionka
class Pawn {
    constructor() {
        this.type = "PAWN";
    }

    validateMove(move) {

        // Sprawdzenie warunków poprawnego ruchu pionka
        if (move.sourceX === move.destinationX && move.destinationY === move.sourceY + 1) {
            return true; // Poprawny ruch o jedno pole do przodu
        } else {
            return false; // Niepoprawny ruch dla pionka
        }
    }
}