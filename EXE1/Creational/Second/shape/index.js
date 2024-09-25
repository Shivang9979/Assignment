"use strict";
// Circle class
class Circle {
    constructor(radius) {
        this.radius = radius;
    }
    draw() {
        console.log(`Drawing a Circle with radius: ${this.radius}`);
    }
    area() {
        return Math.PI * this.radius * this.radius;
    }
    perimeter() {
        return 2 * Math.PI * this.radius;
    }
}
// Rectangle class
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    draw() {
        console.log(`Drawing a Rectangle with width: ${this.width} and height: ${this.height}`);
    }
    area() {
        return this.width * this.height;
    }
    perimeter() {
        return 2 * (this.width + this.height);
    }
}
// Solid Style class
class SolidStyle {
    applyStyle(shape) {
        console.log(`Applying solid style to shape.`);
        shape.draw();
    }
}
// Dashed Style class
class DashedStyle {
    applyStyle(shape) {
        console.log(`Applying dashed style to shape.`);
        shape.draw();
    }
}
// Abstract Factory interface
class ShapeFactory {
}
// Circle Factory
class CircleFactory extends ShapeFactory {
    constructor(radius, styleType) {
        super();
        this.radius = radius;
        this.styleType = styleType;
    }
    createShape() {
        return new Circle(this.radius);
    }
    createStyle() {
        if (this.styleType === 'solid') {
            return new SolidStyle();
        }
        else {
            return new DashedStyle();
        }
    }
}
// Rectangle Factory
class RectangleFactory extends ShapeFactory {
    constructor(width, height, styleType) {
        super();
        this.width = width;
        this.height = height;
        this.styleType = styleType;
    }
    createShape() {
        return new Rectangle(this.width, this.height);
    }
    createStyle() {
        if (this.styleType === 'solid') {
            return new SolidStyle();
        }
        else {
            return new DashedStyle();
        }
    }
}
// Client Code
function main() {
    // Create a solid circle
    const circleFactory = new CircleFactory(5, 'solid');
    const circle = circleFactory.createShape();
    const circleStyle = circleFactory.createStyle();
    circleStyle.applyStyle(circle);
    console.log(`Circle Area: ${circle.area()}, Perimeter: ${circle.perimeter()}`);
    // Create a dashed rectangle
    const rectangleFactory = new RectangleFactory(4, 6, 'dashed');
    const rectangle = rectangleFactory.createShape();
    const rectangleStyle = rectangleFactory.createStyle();
    rectangleStyle.applyStyle(rectangle);
    console.log(`Rectangle Area: ${rectangle.area()}, Perimeter: ${rectangle.perimeter()}`);
}
// Run the client code
main();
