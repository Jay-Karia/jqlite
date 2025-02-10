import { execSync } from 'child_process';

try {
  // Bundle code with tsup
  execSync('npx tsup src/index.ts --dts --outDir dist --format esm,cjs --watch', { stdio: 'inherit' });

  //  Minify Terser
  execSync('npx terser dist/index.js -o dist/index.min.js -c -m', { stdio: 'inherit' });

  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}