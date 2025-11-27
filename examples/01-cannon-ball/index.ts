// Cannon Ball XPBD Example
import { Canvas, Circle, Vec2, App, Hook } from '../../src/index';

const canvas = new Canvas(
    document.getElementById('canvas') as HTMLCanvasElement,
    window,
    20
);

const gravity = new Vec2(0, -9.81);
const timeStep = 1 / 60;

const circle = new Circle(
    new Vec2(0.2, 0.2), // Position
    new Vec2(10.0, 15.0), // Velocity
        0.2,
        '#ff0000'
    );

function startup() {
    canvas.init();
}


function simulate() {
    circle.vel = circle.vel.add(gravity.scale(timeStep));
    circle.pos = circle.pos.add(circle.vel.scale(timeStep));

    if (circle.pos.y - circle.radius < 0) {
        circle.pos.y = circle.radius;
        circle.vel.y *= -0.8; // simple bounce with damping
    }

    if (circle.pos.x - circle.radius < 0) {
        circle.pos.x = circle.radius;
        circle.vel.x *= -0.8;
    }

    if (circle.pos.x + circle.radius > canvas.simulationWidth) {
        circle.pos.x = canvas.simulationWidth - circle.radius;
        circle.vel.x *= -0.8;
    }
}

function draw() {
    const context = canvas.context;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    circle.draw({ c: canvas.context, scale: canvas.scale } );
}

const app = new App();

app
    .addFn(Hook.Startup, startup)
    .addFn(Hook.Tick, simulate)
    .addFn(Hook.Tick, draw)
    .run();