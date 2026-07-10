import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const distDir = resolve(root, 'dist');
const clientDir = resolve(distDir, 'client');
const serverDir = resolve(distDir, 'server');
const hostingSource = resolve(root, '.openai', 'hosting.json');
const hostingTargetDir = resolve(distDir, '.openai');
const hostingTarget = resolve(hostingTargetDir, 'hosting.json');
const serverEntry = resolve(serverDir, 'index.js');

if (!existsSync(resolve(clientDir, 'index.html'))) {
  throw new Error('Vite build did not create dist/client/index.html');
}

await mkdir(serverDir, { recursive: true });
await mkdir(hostingTargetDir, { recursive: true });
await copyFile(hostingSource, hostingTarget);

await writeFile(
  serverEntry,
  `export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const assetResponse = await env.ASSETS.fetch(request);

    if (assetResponse.status !== 404) {
      return assetResponse;
    }

    if (url.pathname.includes('.')) {
      return assetResponse;
    }

    return env.ASSETS.fetch(new Request(new URL('/index.html', url), request));
  },
};
`,
);
