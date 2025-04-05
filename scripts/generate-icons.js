const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputSvg = path.join(__dirname, '../frontend/public/favicon.svg');
const outputDir = path.join(__dirname, '../frontend/public');

async function generateIcons() {
  const svgBuffer = fs.readFileSync(inputSvg);

  // Generate PNG icons
  const sizes = [
    { size: 48, name: 'favicon.png' },
    { size: 192, name: 'icon-192.png' },
    { size: 512, name: 'icon-512.png' },
    { size: 180, name: 'apple-touch-icon.png' }
  ];

  for (const { size, name } of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .toFormat('png')
      .toFile(path.join(outputDir, name));
  }

  // For favicon.ico, we'll just use the 48x48 PNG for now
  // In a production environment, you might want to use a proper ICO converter
  fs.copyFileSync(
    path.join(outputDir, 'favicon.png'),
    path.join(outputDir, 'favicon.ico')
  );

  // Clean up temporary file
  fs.unlinkSync(path.join(outputDir, 'favicon.png'));

  console.log('All icons generated successfully!');
}

generateIcons().catch(console.error); 