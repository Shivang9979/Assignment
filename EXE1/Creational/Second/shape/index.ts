// Shape interface
interface Shape {
    draw(): void;
    area(): number;
    perimeter(): number;
}

// Circle class
class Circle implements Shape {
    constructor(private radius: number) {}

    draw(): void {
        console.log(`Drawing a Circle with radius: ${this.radius}`);
    }

    area(): number {
        return Math.PI * this.radius * this.radius;
    }

    perimeter(): number {
        return 2 * Math.PI * this.radius;
    }
}

// Rectangle class
class Rectangle implements Shape {
    constructor(private width: number, private height: number) {}

    draw(): void {
        console.log(`Drawing a Rectangle with width: ${this.width} and height: ${this.height}`);
    }

    area(): number {
        return this.width * this.height;
    }

    perimeter(): number {
        return 2 * (this.width + this.height);
    }
}

// Style interface
interface Style {
    applyStyle(shape: Shape): void;
}

// Solid Style class
class SolidStyle implements Style {
    applyStyle(shape: Shape): void {
        console.log(`Applying solid style to shape.`);
        shape.draw();
    }
}

// Dashed Style class
class DashedStyle implements Style {
    applyStyle(shape: Shape): void {
        console.log(`Applying dashed style to shape.`);
        shape.draw();
    }
}

// Abstract Factory interface
abstract class ShapeFactory {
    abstract createShape(): Shape;
    abstract createStyle(): Style;
}

// Circle Factory
class CircleFactory extends ShapeFactory {
    constructor(private radius: number, private styleType: 'solid' | 'dashed') {
        super();
    }

    createShape(): Shape {
        return new Circle(this.radius);
    }

    createStyle(): Style {
        if (this.styleType === 'solid') {
            return new SolidStyle();
        } else {
            return new DashedStyle();
        }
    }
}

// Rectangle Factory
class RectangleFactory extends ShapeFactory {
    constructor(private width: number, private height: number, private styleType: 'solid' | 'dashed') {
        super();
    }

    createShape(): Shape {
        return new Rectangle(this.width, this.height);
    }

    createStyle(): Style {
        if (this.styleType === 'solid') {
            return new SolidStyle();
        } else {
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
