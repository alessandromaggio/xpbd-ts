import { ECS, Entity } from './ecs';

export class System {
  public static each<C extends any[]>(
    ...components: { [K in keyof C]: new (...args: any[]) => C[K] }
  ) {
    return (
      fn: (ecs: ECS, entity: Entity, ...args: C) => void
    ) => {
      return (ecs: ECS) => {
        for (const [entity, ...comps] of ecs.query(...components)) {
          fn(ecs, entity, ...(comps as C));
        }
      };
    };
  }

  public static all<C extends any[]>(
    ...components: { [K in keyof C]: new (...args: any[]) => C[K] }
  ) {
    return (
      fn: (ecs: ECS, items: [Entity, ...C][]) => void
    ) => {
      return (ecs: ECS) => {
        fn(ecs, ecs.query(...components));
      };
    };
  }
}
