import { ECS, Entity } from './ecs';

export function system<C extends any[]>(
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
