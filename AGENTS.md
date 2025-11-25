# XPBD TypeScript Physics Engine

## Quick Start
```bash
npm install
npm run dev
```

This starts Vite dev server with hot reload on port 3000.

## Project Structure
- `src/` - XPBD physics engine source code
- `examples/` - Example implementations and demos
- `dist/` - Compiled TypeScript output

## Development Process
1. Edit physics engine code in `src/`
2. Create examples in `examples/` directory
3. Both engine and examples auto-reload on save
4. Examples import from `../../src/index` relative path

## Build Commands
- `npm run build` - Compile TypeScript to dist/
- `npm run dev` - Watch mode compilation + dev server
- `npm test` - Run tests (placeholder)

## Example Development
Each example is a separate folder with `index.html` and `index.ts` files. Create new examples by adding `example-name/` folder in `examples/`. Navigate between examples using the index page at `http://localhost:3000`.

## Hot Reload
Vite watches examples folder and TypeScript compiler watches src folder. Any changes trigger automatic page refresh.
