import { defineConfig } from 'vite';
import { readdirSync, statSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Auto-discover HTML files in example subfolders
const exampleDirs = readdirSync('examples')
  .filter(item => statSync(resolve('examples', item)).isDirectory());

const exampleFiles = exampleDirs.reduce((entries, dir) => {
  const htmlFile = resolve('examples', dir, 'index.html');
  try {
    statSync(htmlFile);
    entries[dir] = htmlFile;
  } catch {}
  return entries;
}, { index: resolve('examples', 'index.html') });

export default defineConfig({
  root: 'examples',
  build: {
    rollupOptions: {
      input: exampleFiles
    }
  },
  server: {
    port: 3000,
    open: true
  },
  esbuild: {
    target: 'es2020'
  }
});
