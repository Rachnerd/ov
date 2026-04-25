import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = './apps/website/public/';
const outputDir = './apps/website/public/';

// Allowed image extensions
const validExtensions = ['.jpg', '.jpeg', '.png', '.tiff', '.gif', '.avif'];

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

fs.readdirSync(inputDir).forEach((file) => {
  const ext = path.extname(file).toLowerCase();

  // Skip non-image files
  if (!validExtensions.includes(ext)) {
    console.log(`Skipped (not an image): ${file}`);
    return;
  }

  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(outputDir, path.parse(file).name + '.webp');

  sharp(inputPath)
    .webp({ quality: 50 })
    .toFile(outputPath)
    .then(() => console.log(`Converted: ${file}`))
    .catch((err) => console.error(`Error processing ${file}:`, err));
});
