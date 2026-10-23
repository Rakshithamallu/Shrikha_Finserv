const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Paths
const originalPath = path.join(__dirname, '..', 'public', 'assets', 'logo-original.png');
const transparentPath = path.join(__dirname, '..', 'public', 'assets', 'logo-transparent.png');
const markPath = path.join(__dirname, '..', 'public', 'assets', 'logo-mark.png');

// Standard CRC32 table for PNG chunk generation
const crcTable = new Int32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ -1) >>> 0;
}

function makeChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const typeAndData = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  chunk.writeUInt32BE(crc32(typeAndData), 8 + len);
  return chunk;
}

function encodePng(width, height, rgbaBuffer) {
  const rowSize = width * 4;
  const rawData = Buffer.alloc(height * (rowSize + 1));
  let destPos = 0;
  for (let y = 0; y < height; y++) {
    rawData[destPos++] = 0; // PNG filter type 0 (None)
    rgbaBuffer.copy(rawData, destPos, y * rowSize, (y + 1) * rowSize);
    destPos += rowSize;
  }
  const compressed = zlib.deflateSync(rawData);
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    sig,
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', compressed),
    makeChunk('IEND', Buffer.alloc(0))
  ]);
}

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

// 1. Read input logo
const fileBuf = fs.readFileSync(originalPath);
let idatChunks = [];
let offset = 8;
while (offset < fileBuf.length) {
  const len = fileBuf.readUInt32BE(offset);
  const type = fileBuf.toString('ascii', offset + 4, offset + 8);
  if (type === 'IDAT') {
    idatChunks.push(fileBuf.subarray(offset + 8, offset + 8 + len));
  }
  offset += 12 + len;
}

const decompressed = zlib.inflateSync(Buffer.concat(idatChunks));
const width = 197;
const height = 190;
const bpp = 4;
const rowSize = width * bpp;
const raw = Buffer.alloc(width * height * bpp);

let srcPos = 0;
for (let y = 0; y < height; y++) {
  const filterType = decompressed[srcPos++];
  const rowStart = y * rowSize;
  const prevRowStart = (y - 1) * rowSize;
  for (let x = 0; x < rowSize; x++) {
    const rawByte = decompressed[srcPos++];
    const a = (x >= bpp) ? raw[rowStart + x - bpp] : 0;
    const b = (y > 0) ? raw[prevRowStart + x] : 0;
    const c = (x >= bpp && y > 0) ? raw[prevRowStart + x - bpp] : 0;
    let val = 0;
    if (filterType === 0) val = rawByte;
    else if (filterType === 1) val = (rawByte + a) & 0xff;
    else if (filterType === 2) val = (rawByte + b) & 0xff;
    else if (filterType === 3) val = (rawByte + Math.floor((a + b) / 2)) & 0xff;
    else if (filterType === 4) val = (rawByte + paeth(a, b, c)) & 0xff;
    raw[rowStart + x] = val;
  }
}

// 2. Fix 1px screenshot white line on col 0 by copying col 1
for (let y = 0; y < height; y++) {
  const idx0 = (y * width) * 4;
  const idx1 = (y * width + 1) * 4;
  raw[idx0] = raw[idx1];
  raw[idx0 + 1] = raw[idx1 + 1];
  raw[idx0 + 2] = raw[idx1 + 2];
  raw[idx0 + 3] = raw[idx1 + 3];
}

// 3. Create transparent version
const transparentRaw = Buffer.from(raw);
for (let i = 0; i < width * height; i++) {
  const idx = i * 4;
  const r = transparentRaw[idx];
  const g = transparentRaw[idx + 1];
  const b = transparentRaw[idx + 2];
  const maxBrightness = Math.max(r, g, b);

  if (maxBrightness <= 28) {
    transparentRaw[idx + 3] = 0; // pure transparent
  } else if (maxBrightness < 65) {
    // smooth antialiasing transition
    const alphaRatio = (maxBrightness - 28) / (65 - 28);
    transparentRaw[idx + 3] = Math.round(alphaRatio * 255);
  }
}

// 4. Crop circular emblem mark (from bounds: x 37 to 160, y 5 to 129)
const markW = 124;
const markH = 124;
const startX = 37;
const startY = 5;
const markRaw = Buffer.alloc(markW * markH * 4);

for (let my = 0; my < markH; my++) {
  const sy = startY + my;
  for (let mx = 0; mx < markW; mx++) {
    const sx = startX + mx;
    const srcIdx = (sy * width + sx) * 4;
    const destIdx = (my * markW + mx) * 4;
    markRaw[destIdx] = transparentRaw[srcIdx];
    markRaw[destIdx + 1] = transparentRaw[srcIdx + 1];
    markRaw[destIdx + 2] = transparentRaw[srcIdx + 2];
    markRaw[destIdx + 3] = transparentRaw[srcIdx + 3];
  }
}

// Save outputs
fs.writeFileSync(originalPath, encodePng(width, height, raw));
const transparentPngBuffer = encodePng(width, height, transparentRaw);
fs.writeFileSync(transparentPath, transparentPngBuffer);
fs.writeFileSync(markPath, encodePng(markW, markH, markRaw));

// 5. Generate SVG wrappers for /assets/logo.svg and /assets/logo-white.svg fallback
const base64Data = transparentPngBuffer.toString('base64');
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 197 190" width="197" height="190">
  <image href="data:image/png;base64,${base64Data}" x="0" y="0" width="197" height="190" />
</svg>
`;
const svgPath = path.join(__dirname, '..', 'public', 'assets', 'logo.svg');
const svgWhitePath = path.join(__dirname, '..', 'public', 'assets', 'logo-white.svg');
fs.writeFileSync(svgPath, svgContent);
fs.writeFileSync(svgWhitePath, svgContent);

console.log('Successfully generated:');
console.log(' - ' + originalPath);
console.log(' - ' + transparentPath);
console.log(' - ' + markPath);
console.log(' - ' + svgPath);
console.log(' - ' + svgWhitePath);

