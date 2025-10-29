export class Point {
    constructor(x, y) {
        if (!Number.isFinite(x) || !Number.isFinite(y)) {
            throw new Error("Współrzędne punktu muszą być poprawnymi liczbami!");
        }
        this.x = x;
        this.y = y;
    }
    move(dx, dy) {
        if (!Number.isFinite(dx) || !Number.isFinite(dy)) {
            throw new Error("Wartości przesunięcia muszą być poprawnymi liczbami!");
        }
        this.x += dx;
        this.y += dy;
    }
}
export class Rectangle {
    constructor(topLeft, width, height) {
        if (width <= 0 || height <= 0) {
            throw new Error("Szerokość i wysokość muszą być liczbami dodatnimi!");
        }
        this.p1 = topLeft;
        this.p2 = new Point(topLeft.x + width, topLeft.y);
        this.p3 = new Point(topLeft.x, topLeft.y + height);
        this.p4 = new Point(topLeft.x + width, topLeft.y + height);
    }
    move(dx, dy) {
        this.p1.move(dx, dy);
        this.p2.move(dx, dy);
        this.p3.move(dx, dy);
        this.p4.move(dx, dy);
    }
    getArea() {
        const width = this.p2.x - this.p1.x;
        const height = this.p3.y - this.p1.y;
        return width * height;
    }
    getPerimeter() {
        const width = this.p2.x - this.p1.x;
        const height = this.p3.y - this.p1.y;
        return 2 * (width + height);
    }
    rotate(angle) {
        const angleRad = (angle * Math.PI) / 180;
        const pivot = this.p1;
        const points = [this.p2, this.p3, this.p4];
        points.forEach(p => {
            const translatedX = p.x - pivot.x;
            const translatedY = p.y - pivot.y;
            const rotatedX = translatedX * Math.cos(angleRad) - translatedY * Math.sin(angleRad);
            const rotatedY = translatedX * Math.sin(angleRad) + translatedY * Math.cos(angleRad);
            p.x = rotatedX + pivot.x;
            p.y = rotatedY + pivot.y;
        });
    }
    scale(factor) {
        if (factor <= 0) {
            throw new Error("Współczynnik skalowania musi być dodatni!");
        }
        const centerX = (this.p1.x + this.p4.x) / 2;
        const centerY = (this.p1.y + this.p4.y) / 2;
        const points = [this.p1, this.p2, this.p3, this.p4];
        points.forEach(p => {
            const vecX = p.x - centerX;
            const vecY = p.y - centerY;
            const scaledVecX = vecX * factor;
            const scaledVecY = vecY * factor;
            p.x = centerX + scaledVecX;
            p.y = centerY + scaledVecY;
        });
    }
}
export class Square extends Rectangle {
    constructor(topLeft, side) {
        super(topLeft, side, side);
    }
}
console.log("--- Test Prostokąta ---");
const p1 = new Point(10, 20);
const rect = new Rectangle(p1, 100, 50);
console.log("Początkowe pole:", rect.getArea());
console.log("Początkowy obwód:", rect.getPerimeter());
rect.move(5, -5);
console.log("Współrzędne lewego górnego rogu po przesunięciu:", rect.p1.x, rect.p1.y);
rect.scale(2);
console.log("Pole po przeskalowaniu x2:", rect.getArea());
console.log("Współrzędne po przeskalowaniu:", rect.p1, rect.p4);
console.log("\n--- Test Kwadratu ---");
const square = new Square(new Point(0, 0), 50);
console.log("Pole kwadratu:", square.getArea());
console.log("Obwód kwadratu:", square.getPerimeter());
try {
    const badPoint = new Point(NaN, 10);
}
catch (e) {
    console.error("\nPróba stworzenia złego punktu (test walidacji):", e.message);
}
//# sourceMappingURL=rectangle.js.map