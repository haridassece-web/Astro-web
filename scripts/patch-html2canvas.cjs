const fs = require('fs');
const path = require('path');

const files = [
  'node_modules/html2canvas/dist/html2canvas.esm.js',
  'node_modules/html2canvas/dist/html2canvas.js',
  'node_modules/html2canvas/dist/html2canvas.min.js'
];

files.forEach((relPath) => {
  const fullPath = path.resolve(__dirname, '..', relPath);
  if (!fs.existsSync(fullPath)) return;
  let content = fs.readFileSync(fullPath, 'utf8');
  let count = 0;
  
  // Replace the throw error with fallback transparent color
  content = content.replace(/throw new Error\((['"])Attempting to parse an unsupported color function [^)]+\);?/g, () => {
    count++;
    return 'return 0x00000000;';
  });

  if (count > 0) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Successfully patched ${relPath} (${count} occurrences)`);
  } else {
    console.log(`No occurrences found in ${relPath}`);
  }
});
