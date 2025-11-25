// Cannon Ball XPBD Example
import { Canvas, Circle, Pos } from '../../src/index';

const canvas = new Canvas(
    document.getElementById('canvas') as HTMLCanvasElement,
    window,
    20
);

canvas.init();

const circle = new Circle(new Pos(0.2, 0.2), 0.2, '#ff0000');

function draw() {
    const context = canvas.context;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    circle.draw(canvas.context, canvas.scale);
}

draw();