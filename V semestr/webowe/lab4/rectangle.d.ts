export interface Movable {
    move(dx: number, dy: number): void;
}
export declare class Point implements Movable {
    x: number;
    y: number;
    constructor(x: number, y: number);
    move(dx: number, dy: number): void;
}
export declare class Rectangle implements Movable {
    p1: Point;
    p2: Point;
    p3: Point;
    p4: Point;
    constructor(topLeft: Point, width: number, height: number);
    move(dx: number, dy: number): void;
    getArea(): number;
    getPerimeter(): number;
    rotate(angle: number): void;
    scale(factor: number): void;
}
export declare class Square extends Rectangle {
    constructor(topLeft: Point, side: number);
}
//# sourceMappingURL=rectangle.d.ts.map