const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const files = [
  "public/blogs/lockerswide.png",
  "public/blogs/Locker3DRender.png",
  "public/images/DSC09589.jpg",
  "public/images/DSC09598.jpg",
  "public/images/DSC09353.jpg",
  "public/images/DSC09351.jpg",
  "public/images/DSC09597.jpg",
  "public/images/slide1.jpg",
];

async function compress(file) {
  const input = path.join(process.cwd(), file);
  const output = input.replace(/\.(jpg|jpeg|png)$/i, ".webp");

  if (!fs.existsSync(input)) {
    console.log("Missing:", file);
    return;
  }

  await sharp(input)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(output);

  console.log("Compressed:", output);
}

Promise.all(files.map(compress));