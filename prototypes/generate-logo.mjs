// One-off script: fetches Instrument Serif Italic from Google Fonts,
// extracts the "m" glyph path, and emits the production logo SVG
// plus rasterized PNG favicons.
//
// Usage: node prototypes/generate-logo.mjs

import { writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import opentype from '@shuding/opentype.js';

const FONT_CSS_URL = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1';
const BB10_UA =
    'Mozilla/5.0 (BB10; Touch) AppleWebKit/537.10+ (KHTML, like Gecko) Version/10.0.9.2372 Mobile Safari/537.10+';

async function fetchFont() {
    const css = await fetch(FONT_CSS_URL, { headers: { 'User-Agent': BB10_UA } }).then(r => r.text());
    const match = css.match(/src: url\((.+?)\) format\('(opentype|truetype|woff)'\)/);
    if (!match?.[1]) throw new Error('Could not find font URL in CSS');
    console.log('Fetching font:', match[1]);
    const arrayBuffer = await fetch(match[1]).then(r => r.arrayBuffer());
    return arrayBuffer;
}

// Single path: outer square + glyph path, evenodd fill rule → cleanly knocks the
// glyph out of the square. Survives every renderer (no mask compatibility issues).
function buildLogoSVG(mPathData, { withDims = true } = {}) {
    const dims = withDims ? ' width="64" height="64"' : '';
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"${dims}>
  <title>Marcus Schimizzi</title>
  <path fill="#e6b54a" fill-rule="evenodd" d="M0 0 H64 V64 H0 Z ${mPathData}"/>
</svg>
`;
}

async function main() {
    const buf = await fetchFont();
    const font = opentype.parse(buf);
    console.log('Loaded font, unitsPerEm:', font.unitsPerEm);

    const glyph = font.charToGlyph('m');
    if (!glyph) throw new Error('Glyph "m" not found');

    // Render the glyph at a chosen size, centered in the 64×64 viewBox.
    // unitsPerEm is the font's design grid. We want the m to occupy a generous
    // portion of the viewBox.
    const fontSize = 64;     // em-square size in viewBox units
    const unitsPerEm = font.unitsPerEm;
    const scale = fontSize / unitsPerEm;

    // Glyph bbox in font units (y is up in font coordinates)
    const xMin = glyph.xMin, xMax = glyph.xMax;
    const yMin = glyph.yMin, yMax = glyph.yMax;

    // Glyph visual width/height in viewBox units
    const glyphW = (xMax - xMin) * scale;
    const glyphH = (yMax - yMin) * scale;

    // Center the glyph in the 64×64 box
    const cx = 32;
    const cy = 32;
    // For opentype.getPath(x, y, fontSize): x = origin, y = baseline (positive y down).
    // The glyph extends from (xMin*scale) to (xMax*scale) horizontally relative to x.
    // To center horizontally: x = cx - glyphW/2 - xMin*scale
    // To center vertically: baseline y such that the glyph's vertical midpoint sits at cy.
    //   The glyph drawn at baseline y0 spans [y0 - yMax*scale, y0 - yMin*scale] (since font y is up).
    //   Midpoint = y0 - (yMin + yMax)*scale/2  →  y0 = cy + (yMin + yMax)*scale/2
    const x = cx - glyphW / 2 - xMin * scale;
    const y = cy + ((yMin + yMax) / 2) * scale;

    const path = glyph.getPath(x, y, fontSize);
    const pathData = path.toPathData(2);
    console.log('Glyph path (first 120 chars):', pathData.slice(0, 120) + '…');

    const logoSvg = buildLogoSVG(pathData, { withDims: true });
    const faviconSvg = buildLogoSVG(pathData, { withDims: false });

    writeFileSync('public/images/logo.svg', logoSvg);
    writeFileSync('public/favicon.svg', faviconSvg);
    console.log('Wrote: public/images/logo.svg, public/favicon.svg');

    // Rasterize PNGs with ImageMagick
    const sizes = [
        { out: 'public/favicon-16x16.png',           size: 16 },
        { out: 'public/favicon-32x32.png',           size: 32 },
        { out: 'public/apple-touch-icon.png',        size: 180 },
        { out: 'public/android-chrome-192x192.png',  size: 192 },
        { out: 'public/android-chrome-512x512.png',  size: 512 },
    ];

    for (const { out, size } of sizes) {
        // Use ImageMagick to convert SVG → PNG at the right size,
        // with a high-quality density for clean edges.
        execSync(
            `magick -background none -density 600 public/favicon.svg -resize ${size}x${size} ${out}`,
            { stdio: 'inherit' }
        );
        console.log(`Wrote: ${out}`);
    }

    // Build a multi-resolution favicon.ico from the 16, 32, and 48 sizes
    execSync(
        `magick -background none -density 600 public/favicon.svg ` +
        `\\( -clone 0 -resize 16x16 \\) ` +
        `\\( -clone 0 -resize 32x32 \\) ` +
        `\\( -clone 0 -resize 48x48 \\) ` +
        `-delete 0 public/favicon.ico`,
        { stdio: 'inherit' }
    );
    console.log('Wrote: public/favicon.ico');

    console.log('\nDone.');
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
