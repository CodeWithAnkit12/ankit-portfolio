"""
Turn a photo into the transparent cut-out PNG the hero needs.

    pip install "rembg[cpu]" pillow
    python scripts/cutout.py path/to/photo.jpg public/portrait.png

Also takes a URL as the source. The result is trimmed to the subject so it
sits flush on the hero baseline.
"""

import io
import sys
import urllib.request

from PIL import Image
from rembg import remove


def load(src):
    if src.startswith("http"):
        req = urllib.request.Request(src, headers={"User-Agent": "Mozilla/5.0"})
        return urllib.request.urlopen(req, timeout=60).read()
    with open(src, "rb") as fh:
        return fh.read()


def main():
    if len(sys.argv) != 3:
        sys.exit("usage: python scripts/cutout.py <source> <dest.png>")

    src, dst = sys.argv[1], sys.argv[2]
    cut = remove(Image.open(io.BytesIO(load(src))).convert("RGBA"))

    # Trim the empty margin the model leaves around the subject.
    box = cut.getbbox()
    if box:
        cut = cut.crop(box)

    cut.save(dst)
    print(f"wrote {dst} {cut.size}")


if __name__ == "__main__":
    main()
