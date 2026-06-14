import { execSync } from 'node:child_process';
import { cpSync, existsSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const clientDir = resolve(root, 'apps/client');
const staticDir = resolve(root, 'apps/server', 'static');
const distDir = resolve(clientDir, 'dist');

function bail(message) {
  console.error(`❌ ${message}`);
  process.exit(1);
}

// 1. Build the client
console.log('📦 Building client...');
try {
  execSync('pnpm run build', { cwd: clientDir, stdio: 'inherit' });
} catch {
  bail('Client build failed.');
}
console.log('✅ Build succeeded.');

// 2. Remove existing static folder
if (existsSync(staticDir)) {
  console.log('🗑️  Removing existing static folder...');
  try {
    rmSync(staticDir, { recursive: true, force: true });
  } catch {
    bail('Failed to remove static folder.');
  }
  console.log('✅ Static folder removed.');
}

// 3. Copy dist to static
console.log('📋 Copying dist → static...');
try {
  cpSync(distDir, staticDir, { recursive: true });
} catch {
  bail('Failed to copy dist to static.');
}
console.log('✅ Copy done.');

console.log('🚀 Build complete.');
