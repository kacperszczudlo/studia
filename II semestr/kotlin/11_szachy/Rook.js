// Klasa reprezentująca wieżę
class Rook {
    constructor() {
        this.type = "ROOK";
    }

    validateMove(move) {
        const d1 = Math.abs(move.destinationX-move.sourceX);
        const d2 = Math.abs(move.destinationY-move.sourceY);
        // Sprawdzenie warunków poprawnego ruchu pionka
        if (d1 === 0 || d2 === 0) {
            return true; // Poprawny ruch o jedno pole do przodu
        } else {
            return false; // Niepoprawny ruch dla pionka
        }
    }
}