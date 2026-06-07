import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const svgDir = join(root, "public", "brand", "official", "svg");
const pngDir = join(root, "public", "brand", "official", "png");
const sourceDir = join(root, "public", "brand", "official", "source");
const reportPath = join(root, "docs", "brand", "BRAND_ASSET_EXTRACTION_REPORT.md");

const pngTargets = {
  "ecotuca-horizontal.svg": "ecotuca-horizontal.png",
  "ecotuca-vertical.svg": "ecotuca-vertical.png",
  "ecotuca-horizontal-tagline.svg": "ecotuca-horizontal-tagline.png",
  "ecotuca-vertical-tagline.svg": "ecotuca-vertical-tagline.png",
  "perifa-ecotour-horizontal.svg": "perifa-ecotour-horizontal.png",
  "perifa-ecotour-vertical.svg": "perifa-ecotour-vertical.png",
  "simbolo-ecotuca.svg": "simbolo-ecotuca.png",
  "simbolo-perifa.svg": "simbolo-perifa.png"
};

async function ensureDirs() {
  await mkdir(svgDir, { recursive: true });
  await mkdir(pngDir, { recursive: true });
  await mkdir(sourceDir, { recursive: true });
  await mkdir(join(root, "docs", "brand", "extraction"), { recursive: true });
}

async function renderPngs() {
  const sharp = (await import("sharp")).default;
  const files = await readdir(svgDir);
  const generated = [];

  for (const file of files) {
    if (!pngTargets[file]) continue;
    const source = join(svgDir, file);
    const target = join(pngDir, pngTargets[file]);
    const metadata = await sharp(source).metadata();
    await sharp(source)
      .resize({ width: Math.max(metadata.width ?? 512, 512), withoutEnlargement: false })
      .png({ compressionLevel: 9 })
      .toFile(target);
    generated.push(`public/brand/official/png/${pngTargets[file]}`);
  }

  return generated;
}

async function writeReport(generated) {
  const pdfPath = join(root, "docs", "brand", "MANUAL_DE_IDENTIDADE_VISUAL_PERIFA_ECOTOUR.pdf");
  const pdfStats = await stat(pdfPath).catch(() => null);
  const lines = [
    "# Brand Asset Extraction Report",
    "",
    "## Source Reviewed",
    "",
    `- PDF: \`docs/brand/MANUAL_DE_IDENTIDADE_VISUAL_PERIFA_ECOTOUR.pdf\`${pdfStats ? ` (${pdfStats.size} bytes)` : " (not found)"}`,
    "- Local extraction folder reviewed: `docs/brand/extracted/`.",
    "- Preview/contact sheet generated in `docs/brand/extraction/`.",
    "",
    "## Extraction Result",
    "",
    "The current PDF contains MVP proposal content, Gamma-generated illustrations and UI mockups. It does not contain the official ECOTUCA/Perifa Ecotour logo pages, vector marks, positive/negative logo variants or brand prohibition pages described in the design prompt.",
    "",
    "Because of that, no official logo was extracted from the PDF in this round. The generated files below are temporary presentation lockups using the official palette, created only to remove low-quality placeholders from the product UI while keeping future replacement simple.",
    "",
    "## Generated Temporary Assets",
    "",
    ...generated.map((file) => `- \`${file}\``),
    "",
    "## Pending Official Assets",
    "",
    "- Official ECOTUCA horizontal logo in SVG and transparent PNG.",
    "- Official ECOTUCA vertical logo in SVG and transparent PNG.",
    "- Official ECOTUCA symbol/PWA mark.",
    "- Official ECOTUCA tagline lockup with approved wording.",
    "- Official Perifa Ecotour horizontal and vertical logos.",
    "- Official Perifa Ecotour symbol.",
    "- Positive and negative variants approved for light and dark backgrounds.",
    "",
    "## Usage Recommendation",
    "",
    "- Use ECOTUCA as the main app/product brand in headers, login, student area, mobile demo and certificates.",
    "- Use Perifa Ecotour as institutional/territorial signature in footers, public context blocks and route/tourism surfaces.",
    "- Keep all logo images inside proportion-preserving containers. Never stretch, recolor, crop, outline, tilt, add effects or remove elements.",
    "- Replace temporary assets before final public launch or printed material production.",
    ""
  ];

  await writeFile(reportPath, `${lines.join("\n")}\n`, "utf8");
}

await ensureDirs();
const generated = await renderPngs();
await writeReport(generated);
console.log(`Generated ${generated.length} temporary brand assets.`);
