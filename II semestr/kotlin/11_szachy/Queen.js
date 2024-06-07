// Klasa reprezentująca królową
class Queen {
    constructor() {
        this.type = "QUEEN";
    }

    validateMove(move) {
        const d1 = Math.abs(move.destinationX-move.sourceX);
        const d2 = Math.abs(move.destinationY-move.sourceY);
        // Sprawdzenie warunków poprawnego ruchu pionka
        if (d1 === 0 || d2 === 0 || d1 === d2) {
            return true; // Poprawny ruch o jedno pole do przodu
        } else {
            return false; // Niepoprawny ruch dla pionka
        }
    }
}