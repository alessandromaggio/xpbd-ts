import { ECS } from './index';

type System = (ecs: ECS) => void;

export enum Hook {
    Startup,
    Tick
}

export class App {
  private systems: Record<Hook, System[]> = {
    [Hook.Startup]: [],
    [Hook.Tick]: []
  };

  constructor(private ecs: ECS = new ECS()) {}

  public addSystem(hook: Hook, system: System): App {
    this.systems[hook].push(system);
    return this;
  }

  private runHook(hook: Hook): void {
    for (const system of this.systems[hook]) {
      system(this.ecs);
    }
  }

  private tick(): void {
    this.runHook(Hook.Tick);
  }

  private startup(): void {
    this.runHook(Hook.Startup);
  }

  public run(): void {
    const loop = () => {
      this.tick();
      requestAnimationFrame(loop);
    };

    this.startup();
    requestAnimationFrame(loop);
  }
}
