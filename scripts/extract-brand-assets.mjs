import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const pdfPath = join(root, "docs", "brand", "MANUAL_DE_IDENTIDADE_VISUAL_PERIFA_ECOTOUR.pdf");
const spacedPdfPath = join(root, "docs", "brand", "MANUAL DE IDENTIDADE VISUAL - PERIFA ECOTOUR.pdf");
const extractionDir = join(root, "docs", "brand", "extraction");

const candidatePythons = [
  process.env.PYTHON,
  join(process.env.USERPROFILE ?? "", ".cache", "codex-runtimes", "codex-primary-runtime", "dependencies", "python", "python.exe"),
  "python",
  "py"
].filter(Boolean);

async function ensureCanonicalPdf() {
  await mkdir(join(root, "docs", "brand"), { recursive: true });
  if (!existsSync(pdfPath) && existsSync(spacedPdfPath)) {
    const bytes = await readFile(spacedPdfPath);
    await writeFile(pdfPath, bytes);
  }
}

function runPython(source) {
  for (const python of candidatePythons) {
    const result = spawnSync(python, ["-c", source], {
      cwd: root,
      encoding: "utf8",
      maxBuffer: 1024 * 1024 * 24
    });
    if (result.status === 0) return result.stdout;
    if ((result.stderr || "").includes("No module named 'fitz'")) continue;
  }

  throw new Error(
    "Could not run PyMuPDF extraction. Install it with `python -m pip install pymupdf pillow` or set PYTHON to a Python executable with PyMuPDF."
  );
}

await ensureCanonicalPdf();
await mkdir(extractionDir, { recursive: true });

const pythonSource = String.raw`
from pathlib import Path
from PIL import Image, ImageDraw, ImageOps
import fitz, json, math

PDF = Path('docs/brand/MANUAL_DE_IDENTIDADE_VISUAL_PERIFA_ECOTOUR.pdf')
OUT = Path('public/brand/official/from-manual')
PNG = OUT/'png'
WEBP = OUT/'webp'
PRE = OUT/'previews'
SRC = OUT/'source-crops'
RENDER = Path('docs/brand/extraction/rendered-pages-hi')
for d in [PNG, WEBP, PRE, SRC, RENDER]:
    d.mkdir(parents=True, exist_ok=True)

SCALE = 4

# Relative crop boxes are based on the manual page dimensions, not screen pixels.
# from-manual assets are preferred for demo; temporary lockups are fallback only.
ASSETS = [
  dict(name='perifa-ecotour-horizontal-from-manual', page=4, rect=(0.07,0.38,0.47,0.68), bg='white', status='aprovado para demo', use='Header publico largo, rodape, paginas institucionais'),
  dict(name='perifa-ecotour-vertical-from-manual', page=4, rect=(0.60,0.32,0.88,0.75), bg='white', status='aprovado para demo', use='Blocos institucionais, certificados, composicoes verticais'),
  dict(name='ecotuca-horizontal-tagline-from-manual', page=5, rect=(0.12,0.28,0.47,0.64), bg='white', status='aprovado para demo', use='Header principal, home, login, aluno e app'),
  dict(name='ecotuca-horizontal-logo-only-from-manual', page=5, rect=(0.12,0.28,0.47,0.55), bg='white', status='aprovado para demo', use='Uso compacto quando subtitulo ficar ilegivel'),
  dict(name='ecotuca-vertical-tagline-from-manual', page=5, rect=(0.61,0.26,0.87,0.70), bg='white', status='aprovado para demo', use='Hero, splash, apresentacao e certificado'),
  dict(name='ecotuca-vertical-logo-only-from-manual', page=5, rect=(0.61,0.26,0.87,0.60), bg='white', status='aprovado para demo', use='Mobile/PWA e cards com pouco espaco'),
  dict(name='perifa-symbol-from-manual', page=6, rect=(0.20,0.18,0.39,0.47), bg='white', status='aprovado para demo', use='Icone institucional e grafismo de apoio'),
  dict(name='ecotuca-symbol-from-manual', page=6, rect=(0.55,0.18,0.79,0.45), bg='white', status='aprovado para demo', use='PWA icon, bottom nav, favicon e assinatura compacta'),
  dict(name='perifa-negative-from-manual', page=11, rect=(0.56,0.27,0.77,0.45), bg='black', status='temporario ate SVG oficial', use='Fundo escuro quando positivo/colorido nao tiver contraste'),
  dict(name='ecotuca-negative-from-manual', page=11, rect=(0.56,0.73,0.77,0.89), bg='black', status='temporario ate SVG oficial', use='Fundo escuro quando positivo/colorido nao tiver contraste'),
  dict(name='ecotuca-symbol-yellow-brown-from-manual', page=6, rect=(0.00,0.55,0.165,0.78), bg='none', status='apoio cromatico', use='Apoio visual em fundos escuros'),
  dict(name='perifa-symbol-yellow-brown-from-manual', page=6, rect=(0.833,0.77,1.00,1.00), bg='none', status='apoio cromatico', use='Apoio visual em fundos escuros'),
]

def transparentize(im, mode):
    im = im.convert('RGBA')
    if mode == 'none':
        return im
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if mode == 'white' and r > 244 and g > 244 and b > 244:
                px[x, y] = (r, g, b, 0)
            elif mode == 'black' and r < 18 and g < 18 and b < 18:
                px[x, y] = (r, g, b, 0)
    return im

def trim_alpha(im, pad_ratio=0.055):
    im = im.convert('RGBA')
    bbox = im.getchannel('A').getbbox()
    if not bbox:
        return im
    crop = im.crop(bbox)
    pad = max(24, int(max(crop.size) * pad_ratio))
    canvas = Image.new('RGBA', (crop.width + pad * 2, crop.height + pad * 2), (255, 255, 255, 0))
    canvas.alpha_composite(crop, (pad, pad))
    return canvas

def make_preview(final, name):
    checker = Image.new('RGB', final.size, '#eeeeee')
    d = ImageDraw.Draw(checker)
    tile = 24
    for yy in range(0, checker.height, tile):
        for xx in range(0, checker.width, tile):
            if (xx // tile + yy // tile) % 2:
                d.rectangle((xx, yy, xx + tile - 1, yy + tile - 1), fill='#d8d8d8')
    checker_rgba = checker.convert('RGBA')
    checker_rgba.alpha_composite(final, (0, 0))
    checker_path = PRE / f'{name}-checker.jpg'
    checker_rgba.convert('RGB').save(checker_path, quality=92)

    dark = Image.new('RGBA', final.size, '#3A1A16')
    dark.alpha_composite(final, (0, 0))
    dark_path = PRE / f'{name}-dark.jpg'
    dark.convert('RGB').save(dark_path, quality=92)
    return checker_path, dark_path

doc = fitz.open(PDF)
records = []
rendered_pages = []

for asset in ASSETS:
    page = doc.load_page(asset['page'] - 1)
    pw, ph = page.rect.width, page.rect.height
    render_path = RENDER / f"page-{asset['page']:02d}-{SCALE}x.png"
    if not render_path.exists():
        page.get_pixmap(matrix=fitz.Matrix(SCALE, SCALE), alpha=False).save(render_path)
    if str(render_path) not in rendered_pages:
        rendered_pages.append(str(render_path).replace('\\', '/'))

    x0, y0, x1, y1 = asset['rect']
    clip = fitz.Rect(x0 * pw, y0 * ph, x1 * pw, y1 * ph)
    source_path = SRC / f"{asset['name']}-source.png"
    page.get_pixmap(matrix=fitz.Matrix(SCALE, SCALE), clip=clip, alpha=False).save(source_path)

    source = Image.open(source_path)
    final = trim_alpha(transparentize(source, asset['bg']))
    png_path = PNG / f"{asset['name']}.png"
    webp_path = WEBP / f"{asset['name']}.webp"
    final.save(png_path)
    try:
        final.save(webp_path, quality=95, method=6)
    except Exception:
        webp_path = None
    checker_path, dark_path = make_preview(final, asset['name'])

    records.append({
        **asset,
        'png': str(png_path).replace('\\', '/'),
        'webp': str(webp_path).replace('\\', '/') if webp_path else '',
        'sourceCrop': str(source_path).replace('\\', '/'),
        'previewChecker': str(checker_path).replace('\\', '/'),
        'previewDark': str(dark_path).replace('\\', '/'),
        'size': final.size
    })

thumbs = []
for r in records:
    im = Image.open(r['png']).convert('RGBA')
    bg = Image.new('RGBA', (360, 260), '#f4efe7')
    left = Image.new('RGBA', (180, 190), '#ffffff')
    right = Image.new('RGBA', (180, 190), '#3A1A16')
    display = ImageOps.contain(im, (160, 150))
    left.alpha_composite(display, ((180 - display.width) // 2, (190 - display.height) // 2))
    right.alpha_composite(display, ((180 - display.width) // 2, (190 - display.height) // 2))
    bg.alpha_composite(left, (0, 0))
    bg.alpha_composite(right, (180, 0))
    d = ImageDraw.Draw(bg)
    d.text((10, 198), r['name'][:46], fill='#3A1A16')
    d.text((10, 220), f"p.{r['page']} | {r['size'][0]}x{r['size'][1]} | {r['status']}", fill='#3A1A16')
    thumbs.append(bg.convert('RGB'))

cols = 2
rows = math.ceil(len(thumbs) / cols)
sheet = Image.new('RGB', (cols * 360, rows * 260), 'white')
for i, thumb in enumerate(thumbs):
    sheet.paste(thumb, ((i % cols) * 360, (i // cols) * 260))
sheet.save('docs/brand/extraction/logo-contact-sheet.png', quality=95)

Path('docs/brand/extraction/extracted-assets.json').write_text(json.dumps({'renderedPages': rendered_pages, 'assets': records}, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({'assets': records}, ensure_ascii=False, indent=2))
`;

const stdout = runPython(pythonSource);
console.log(stdout.trim());
