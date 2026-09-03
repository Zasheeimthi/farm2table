from pathlib import Path
from PIL import Image, ImageFilter, ImageOps


ROOT = Path(r"C:\Users\Imthi\Downloads\farm2table")
SRC = ROOT / "src" / "assets" / "figma-home-export.png"
OUT = ROOT / "public" / "storefront"


def crop(name, box, size=None):
    img = Image.open(SRC).convert("RGB")
    part = img.crop(box)
    if size:
        part = ImageOps.fit(part, size, method=Image.Resampling.LANCZOS)
    part.save(OUT / name, quality=94)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    crop("hero-farmer.jpg", (760, 130, 1440, 560), (1800, 640))
    crop("hero-produce.jpg", (80, 1780, 660, 2090), (980, 600))

    crops = {
        "category-meat.jpg": (70, 785, 270, 965),
        "category-eggs.jpg": (295, 785, 505, 965),
        "category-dairy.jpg": (520, 785, 730, 965),
        "category-veg.jpg": (750, 785, 960, 965),
        "category-fruit.jpg": (975, 785, 1185, 965),
        "category-honey.jpg": (1200, 785, 1410, 965),
        "farm-green-valley.jpg": (65, 1115, 385, 1275),
        "farm-sunny-side.jpg": (400, 1115, 720, 1275),
        "farm-heritage.jpg": (735, 1115, 1055, 1275),
        "farm-pure-roots.jpg": (1070, 1115, 1390, 1275),
        "product-chicken.jpg": (70, 1492, 270, 1680),
        "product-eggs.jpg": (295, 1492, 505, 1680),
        "product-milk.jpg": (520, 1492, 730, 1680),
        "product-mutton.jpg": (750, 1492, 960, 1680),
        "product-honey.jpg": (975, 1492, 1185, 1680),
        "product-paneer.jpg": (1200, 1492, 1410, 1680),
    }
    for name, box in crops.items():
        crop(name, box, (640, 440))

    # A softly blurred texture for sections that need depth behind content.
    bg = Image.open(OUT / "hero-farmer.jpg").convert("RGB").resize((1600, 900), Image.Resampling.LANCZOS)
    bg = bg.filter(ImageFilter.GaussianBlur(18))
    bg.save(OUT / "organic-blur.jpg", quality=88)


if __name__ == "__main__":
    main()
