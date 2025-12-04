// Cannon Ball XPBD Example
import { Canvas, Vec2, App, Hook, ECS, System, Pos, Vel, CircleData } from '../../src/ecs/index';

class Gravity {
  constructor(public vec: Vec2) {}
}

const timeStep = 1 / 60;

const startup = (ecs: ECS) => {
  ecs.createEntity([
    new Pos(new Vec2(0.2, 0.2)),
    new Vel(new Vec2(10.0, 15.0)),
    new CircleData(0.2, '#ff0000')
  ]);

  const canvas = new Canvas(
    document.getElementById('canvas') as HTMLCanvasElement,
    window,
    20
  );
  canvas.init();

  ecs.addResource(Canvas, canvas);

  ecs.addResource(Gravity, new Gravity(new Vec2(0, -9.81)));
};

const simulate = System.each(Pos, Vel, CircleData)((ecs, _, pos, vel, circle) => {
    const gravity = ecs.getResource(Gravity);
    const canvas = ecs.getResource(Canvas);

    vel.vec.addScaled(gravity.vec, timeStep);
    pos.vec.addScaled(vel.vec, timeStep);

    if (pos.vec.y - circle.radius < 0) {
        pos.vec.y = circle.radius;
        vel.vec.y *= -0.8; // simple bounce with damping
    }

    if (pos.vec.x - circle.radius < 0) {
        pos.vec.x = circle.radius;
        vel.vec.x *= -0.8;
    }

    if (pos.vec.x + circle.radius > canvas.simulationWidth) {
        pos.vec.x = canvas.simulationWidth - circle.radius;
        vel.vec.x *= -0.8;
    }
});

const clearCanvas = (ecs: ECS) => {
  const canvas = ecs.getResource(Canvas);
  const context = canvas.context;
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}

const drawCircles = System.each(Pos, CircleData)((ecs, _, pos, circle) => {
  const canvas = ecs.getResource(Canvas);
  const c = canvas.context;

  c.fillStyle = circle.fillColorHex;
  c.beginPath();
  c.arc(
      pos.vec.x * canvas.scale,
      c.canvas.height - pos.vec.y * canvas.scale,
      circle.radius * canvas.scale,
      0,
      2 * Math.PI
  );
  c.fill();
});

const app = new App();

app
    .addSystem(Hook.Startup, startup)
    .addSystem(Hook.Tick, simulate)
    .addSystem(Hook.Tick, clearCanvas)
    .addSystem(Hook.Tick, drawCircles)
    .run();
