export enum Hook {
    Startup,
    Tick
}

export class App {
    private fns: Record<Hook, (() => void)[]> = {
        [Hook.Startup]: [],
        [Hook.Tick]: []
    };

    public addFn(hook: Hook,fn: () => void): App {
        this.fns[hook].push(fn);
        return this
    }

    private runHook(hook: Hook): void {
        for (const fn of this.fns[hook]) {
            fn();
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