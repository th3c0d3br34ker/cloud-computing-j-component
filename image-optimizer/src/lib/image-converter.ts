import sharp from "sharp";
import fs from "fs";

import { compressFolder } from "../config";

// check what's the output file format and depending on it it execute a different function to convert the images
export async function convert(
  image: any,
  toFile: string,
  options: {
    format: string;
    quality: number;
    width: number;
    height: number;
  }
) {
  const { format, quality, width, height } = options;
  // check if the folder where you are going to export the images exists, if it doesn't then create it
  if (!fs.existsSync(__dirname + compressFolder)) {
    fs.mkdirSync(__dirname + compressFolder);
  }
  // depending on the selected output file format execute a function to convert the images to that format
  switch (format) {
    // export to JPEG
    case "jpeg":
      await toJpeg(image, toFile, { quality, width, height });
      break;
    // export to PNG
    case "png":
      await toPng(image, toFile, { quality, width, height });
      break;
    // export to WebP
    case "webp":
      await toWebp(image, toFile, { quality, width, height });
      break;
    // export to AVIF
    case "avif":
      await toAvif(image, toFile, { quality, width, height });
      break;
    // export to TIFF
    case "tiff":
      await toTiff(image, toFile, { quality, width, height });
      break;
  }
}

// take a file and convert it to JPEG
async function toJpeg(
  image: any,
  toFile: string,
  options: {
    quality: number;
    width: number;
    height: number;
  }
) {
  const { quality, width, height } = options;
  await sharp(image)
    .jpeg({ quality })
    .resize(width, height, {
      fit: "cover",
      position: "center",
    })
    .toFile(toFile);
}

// take a file and convert it to PNG
async function toPng(
  image: any,
  toFile: string,
  options: {
    quality: number;
    width: number;
    height: number;
  }
) {
  const { quality, width, height } = options;
  await sharp(image)
    .png({ quality })
    .resize(width, height, {
      fit: "cover",
      position: "center",
    })
    .toFile(toFile);
}

// take a file and convert it to WebP
async function toWebp(
  image: any,
  toFile: string,
  options: {
    quality: number;
    width: number;
    height: number;
  }
) {
  const { quality, width, height } = options;
  await sharp(image)
    .webp({ quality })
    .resize(width, height, {
      fit: "cover",
      position: "center",
    })
    .toFile(toFile);
}

// take a file and convert it to AVIF
async function toAvif(
  image: any,
  toFile: string,
  options: {
    quality: number;
    width: number;
    height: number;
  }
) {
  const { quality, width, height } = options;
  await sharp(image)
    .avif({ quality })
    .resize(width, height, {
      fit: "cover",
      position: "center",
    })
    .toFile(toFile);
}

// take a file and convert it to TIFF
async function toTiff(
  image: any,
  toFile: string,
  options: {
    quality: number;
    width: number;
    height: number;
  }
) {
  const { quality, width, height } = options;
  await sharp(image)
    .tiff({ quality })
    .resize(width, height, {
      fit: "cover",
      position: "center",
    })
    .toFile(toFile);
}
