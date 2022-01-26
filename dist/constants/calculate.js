"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculate = void 0;
function calculate(data) {
    const shape = data.shape.toLowerCase();
    let area = 0;
    const dimension = data.dimension;
    const num = +dimension;
    // Square shape
    area = calculateShapes(shape, area, num, dimension);
    return { message: +area.toFixed(2) };
}
exports.calculate = calculate;
function calculateShapes(shape, area, num, dimension) {
    if (shape === 'square') {
        area = num ** 2;
    }
    // Circle shape
    if (shape == 'circle') {
        area = Math.PI * num ** 2;
    }
    // Rectangle shape
    if (shape == 'rectangle') {
        const [a, b] = Object.values(dimension);
        area = a * b;
    }
    //Triangle Shape
    if (shape == 'triangle') {
        const [a, b, c] = Object.values(dimension);
        const prerimeter = (a + b + c) / 2;
        area = Math.sqrt(prerimeter * ((prerimeter - a) * (prerimeter - b) - (prerimeter - c)));
    }
    return area;
}
