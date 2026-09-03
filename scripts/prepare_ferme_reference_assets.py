from pathlib import Path
from PIL import Image, ImageOps


ROOT = Path(r"C:\Users\Imthi\Downloads\farm2table")
SRC = Path(r"C:\Users\Imthi\AppData\Local\Temp\codex-clipboard-d06b910c-7817-4081-aed5-d279ccdd99d4.png")
OUT = ROOT / "public" / "ferme"


VIEW_W = 1324
VIEW_H = 6000


def scale_box(box):
    img = Image.open(SRC)
    sx = img.width / VIEW_W
    sy = img.height / VIEW_H
    return tuple(round(value * (sx if index % 2 == 0 else sy)) for index, value in enumerate(box))


def crop(name, box, size):
    img = Image.open(SRC).convert("RGB")
    part = img.crop(scale_box(box))
    part = ImageOps.fit(part, size, method=Image.Resampling.LANCZOS)
    part.save(OUT / name, quality=95)


def main():
    OUT.mkdir(parents=True, exist_ok=True)

    crops = {
        "hero-cows.jpg": ((526, 85, 1097, 638), (980, 950)),
        "product-chicken.jpg": ((228, 1154, 430, 1355), (640, 640)),
        "product-cheese.jpg": ((449, 1154, 652, 1355), (640, 640)),
        "product-sprouts.jpg": ((671, 1154, 873, 1355), (640, 640)),
        "product-beef.jpg": ((893, 1154, 1096, 1355), (640, 640)),
        "product-milk.jpg": ((228, 1477, 430, 1679), (640, 640)),
        "product-cookies.jpg": ((449, 1477, 652, 1679), (640, 640)),
        "product-kefir.jpg": ((671, 1477, 873, 1679), (640, 640)),
        "product-avocado.jpg": ((893, 1477, 1096, 1679), (640, 640)),
        "bundle-cheese.jpg": ((228, 2036, 474, 2260), (760, 620)),
        "bundle-dairy.jpg": ((524, 2036, 770, 2260), (760, 620)),
        "bundle-breakfast.jpg": ((821, 2036, 1068, 2260), (760, 620)),
        "farm-video.jpg": ((228, 2785, 1096, 3200), (1440, 760)),
        "visit-kids.jpg": ((228, 3888, 575, 4150), (720, 560)),
        "visit-cow.jpg": ((890, 4050, 1095, 4252), (460, 460)),
        "recipe-salad.jpg": ((528, 4755, 803, 5068), (660, 660)),
        "recipe-lamb.jpg": ((824, 4755, 1096, 5068), (660, 660)),
    }

    for name, (box, size) in crops.items():
        crop(name, box, size)


if __name__ == "__main__":
    main()
