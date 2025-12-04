import { Canvas, Vec2, App, Hook, ECS, System, Pos, Vel, CircleData, Mass } from '../../src/ecs/index';

const DT = 1 / 60;
const NUM_BALLS = 20;

type Ball = {
  pos: Vec2;
  vel: Vec2;
  radius: number;
  mass: number;
}

type World = {
  width: number;
  height: number;
}

class Restitution {
  constructor(public value: number) {}
}

const startup = (ecs: ECS) => {
   const canvas = new Canvas(
    document.getElementById('canvas') as HTMLCanvasElement,
    window,
    20
  );
  canvas.init();

  const restitution = new Restitution(0.9);
  ecs.addResource(Canvas, canvas);
  ecs.addResource(Restitution, restitution);

  for (let i = 1; i < NUM_BALLS; i++) {
    const radius = (0.05 + Math.random() * 0.1) * 5;
    ecs.createEntity([
      new Pos(new Vec2(Math.random() * canvas.simulationWidth, Math.random() * canvas.simulationHeight)),
      new Vel(new Vec2(-1.0 + Math.random() * 4.0, -1.0 + Math.random() * 4.0)),
      new CircleData(radius, `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`),
      new Mass(Math.PI * radius * radius)
    ]);
  }

  window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
      restitution.value = Math.min(1.0, restitution.value + 0.05);
    } else if (event.key === 'ArrowDown') {
      restitution.value = Math.max(0.0, restitution.value - 0.05);
    }
  });
};

function handleBallCollision(b1: Ball, b2: Ball, restitution: number) {
  const dir = b1.pos.clone().subtract(b2.pos);
  const d = dir.length();
  if (d === 0.0 || d >= b1.radius + b2.radius) {
    return;
  }

  dir.normalize();

  const correction = (b1.radius + b2.radius - d) / 2;
  b1.pos.addScaled(dir, correction);
  b2.pos.addScaled(dir, -correction);

  const v1 = b1.vel.clone().dot(dir);
  const v2 = b2.vel.clone().dot(dir);
  const m1 = b1.mass;
  const m2 = b2.mass;

  const newV1 = (m1 * v1 + m2 * v2 - m2 * (v1 - v2) * restitution) / (m1 + m2);
  const newV2 = (m1 * v1 + m2 * v2 - m1 * (v2 - v1) * restitution) / (m1 + m2);

  b1.vel.addScaled(dir, newV1 - v1);
  b2.vel.addScaled(dir, newV2 - v2);
}

function handleWallCollisions(ball: Ball, world: World) {
  if (ball.pos.x < ball.radius) {
    ball.pos.x = ball.radius;
    ball.vel.x = -ball.vel.x;
  }

  if (ball.pos.x > world.width - ball.radius) {
    ball.pos.x = world.width - ball.radius;
    ball.vel.x = -ball.vel.x;
  }

  if (ball.pos.y < ball.radius) {
    ball.pos.y = ball.radius;
    ball.vel.y = -ball.vel.y;
  }

  if (ball.pos.y > world.height - ball.radius) {
    ball.pos.y = world.height - ball.radius;
    ball.vel.y = -ball.vel.y;
  }
}

const integrate = System.each(Pos, Vel)((ecs, _, pos, vel) => {
  pos.vec.addScaled(vel.vec, DT);
});


const simulate = System.all(Pos, Vel, Mass, CircleData)((ecs, items) => {
  const restitution = ecs.getResource(Restitution);
  const canvas = ecs.getResource(Canvas);
  const world: World = {
    width: canvas.simulationWidth,
    height: canvas.simulationHeight
  };

  for (const [aEntity, aPos, aVel, aMass, aCircleData] of items) {
    for (const [bEntity, bPos, bVel, bMass, bCircleData] of items) {
      if (aEntity === bEntity) continue;

      const b1: Ball = {
        pos: aPos.vec,
        vel: aVel.vec,
        radius: aCircleData.radius,
        mass: aMass.value
      };

      const b2: Ball = {
        pos: bPos.vec,
        vel: bVel.vec,
        radius: bCircleData.radius,
        mass: bMass.value
      };

      handleBallCollision(b1, b2, restitution.value);
      handleWallCollisions(b1, world);
    }
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

const drawDebug = (ecs: ECS) => {
  const restitution = ecs.getResource(Restitution);
  const canvas = ecs.getResource(Canvas);
  const c = canvas.context;

  c.fillStyle = 'black';
  c.font = '16px Arial';
  c.fillText(`Restitution: ${restitution.value.toFixed(2)}`, 10, 20);
};

const app = new App();

app
    .addSystem(Hook.Startup, startup)
    .addSystem(Hook.Tick, integrate)
    .addSystem(Hook.Tick, simulate)
    .addSystem(Hook.Tick, clearCanvas)
    .addSystem(Hook.Tick, drawCircles)
    .addSystem(Hook.Tick, drawDebug)
    .run();
