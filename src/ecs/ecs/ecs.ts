export type Entity = number;

class Archetype {
  entities: Entity[] = [];
  components = new Map<any, any[]>();
}

export class ECS {
  private next: number = 0;
  private archetypes = new Map<string, Archetype>();
  private resources: Map<any, any> = new Map();

  private key(components: any[]): string {
    return components.map((c) => c.constructor.name).sort().join("|");
  }

  createEntity(components: any[]): Entity {
    const e = this.next++;
    const key = this.key(components);

    let archetype = this.archetypes.get(key);
    if (!archetype) {
      archetype = new Archetype();
      for (const comp of components) {
        archetype.components.set(comp.constructor, []);
      }
      this.archetypes.set(key, archetype);
    }

    for (const comp of components) {
      archetype.components.get(comp.constructor)!.push(comp);
    }

    archetype.entities.push(e);
    return e;
  }

  addResource<T>(type: new (...args: any[]) => T, instance: T): void {
    this.resources.set(type, instance);
  }

  getResource<T>(type: new (...args: any[]) => T): T {
    return this.resources.get(type)!;
  }

  query<Cs extends any[]>(...components: any[]): Array<[Entity, ...Cs]> {
    const out: Array<[Entity, ...Cs]> = [];

    for (const archetype of this.archetypes.values()) {
      if (!components.every(c => archetype.components.has(c))) continue;

      const arrays = components.map(c => archetype.components.get(c)!) as {
        [K in keyof Cs]: Cs[K][]
      };

      for (let i = 0; i < archetype.entities.length; i++) {
        const row = arrays.map(a => a[i]) as Cs;
        out.push([archetype.entities[i], ...row])
      }
    }

    return out;
  }
}
