#!/usr/bin/env python3
"""Build every photographic asset the site serves, from the originals in design/.

    python tools/build-images.py

Requires Pillow. Rewrites assets/images/** and assets/icons/og-image.jpg in
place; nothing reads this script at runtime, so the repository stays a static
site. It exists because the crops and the colour grade below are decisions,
not accidents, and re-deriving them by hand the next time a photograph is
swapped would lose them.

Retained stock is graded toward the supplied photographs rather than the other
way round: those frames are warm, hazy and restrained, and the site's own art
direction asks for exactly that over the saturated HDR look the placeholder
set arrived with. See assets/images/README.txt for which files are owned,
which are stock, and which still need reshooting.
"""
import os
import sys
from PIL import Image, ImageEnhance, ImageFilter, ImageOps

ROOT   = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DESIGN = os.path.join(ROOT, "design")
OUT    = os.path.join(ROOT, "assets", "images")
ICONS  = os.path.join(ROOT, "assets", "icons")

# Short keys for the supplied set, so the mapping further down stays readable.
# The filenames are as delivered, mangled characters and all; renaming them
# would only move the problem into whatever the next batch is called.
SRC = {
    "colossi":   "WhatsApp Image 2026-08-19 at 1.43.26 PM.jpeg",   # Karnak seated colossi
    "dancer":    "WhatsApp Image 2026-08-19 at 1.43.29 PM.jpeg",   # figure in the hypostyle hall
    "columns":   "WhatsApp Image 2026-08-19 at 1.43d.29 PM.jpeg",  # painted capitals from below
    "rooftop":   "WhatsApp Image 2026-08-19 at 1.43.30 PM.jpeg",   # unused: rooftop cafe
    "felucca":   "WhatsApp Image 2026-08-19 at 1.43.30 PfM.jpeg",  # the Nile at golden hour
    "wine":      "WhatsApp Image 2026-08-19 at 1.43.30f PM.jpeg",  # a glass against Khafre
    "caravan":   "WhatsApp Image 2026-08-19 at 1.43.3f1 PM.jpeg",  # camel train, backlit (now og-image only)
    "table":     "WhatsApp Image 2026-08-19 at 1.4f3.31 PM.jpeg",  # breakfast facing the plateau
    "sphinx":    "WhatsApp Image 2026d08-19 at 1.43.31 PM.jpeg",   # unused: Sphinx in profile
    "khafre":    "WhatsApp Image f2026-08-19 at 1.43.31 PM.jpeg",  # Khafre with the Sphinx below
    "crew":      "asd.jpeg",                                       # the branded group on the plateau
}


def load(key):
    """A supplied original, by short key."""
    return ImageOps.exif_transpose(Image.open(os.path.join(DESIGN, SRC[key]))).convert("RGB")


def crop_ratio(im, ratio, ax=0.5, ay=0.5, zoom=1.0):
    """Largest ratio-correct window, scaled by `zoom`, anchored at (ax, ay).

    ax/ay are 0..1 positions of the window centre inside the frame, so
    ay=0.35 keeps a horizon high and ay=0.65 keeps it low.
    """
    W, H = im.size
    # Whichever edge is limiting sets the window; the other follows the ratio.
    w, h = (H * ratio, H) if W / H > ratio else (W, W / ratio)
    w, h = w / zoom, h / zoom
    x = min(max(ax * W - w / 2, 0), W - w)
    y = min(max(ay * H - h / 2, 0), H - h)
    return im.crop((round(x), round(y), round(x + w), round(y + h)))


def grade(im, warm=0.0, sat=1.0, contrast=1.0, bright=1.0, lift=0.0):
    """House grade: warm sand, restrained saturation, gentle contrast.

    `warm` shifts red up and blue down (positive), which is also what pulls
    the cyan out of the HDR skies in the placeholder set. `lift` raises the
    black point for the filmic haze the supplied photographs already have.
    """
    if bright != 1.0:
        im = ImageEnhance.Brightness(im).enhance(bright)
    if contrast != 1.0:
        im = ImageEnhance.Contrast(im).enhance(contrast)
    if sat != 1.0:
        im = ImageEnhance.Color(im).enhance(sat)
    if warm:
        r, g, b = im.split()
        r = r.point(lambda v: min(255, int(v * (1 + warm * 0.06) + warm * 3)))
        b = b.point(lambda v: max(0, int(v * (1 - warm * 0.055) - warm * 2)))
        im = Image.merge("RGB", (r, g, b))
    if lift:
        k = int(lift * 255)
        im = im.point(lambda v: int(k + v * (255 - k) / 255))
    return im


def finish(im, size, sharp=0.55):
    """Resize to the exact target, sharpening in proportion to the stretch."""
    up = size[0] / im.width
    im = im.resize(size, Image.LANCZOS)
    amount = sharp * (1.6 if up > 1.05 else 1.0)
    return im.filter(ImageFilter.UnsharpMask(radius=1.4, percent=int(amount * 100), threshold=3))


def save(im, relpath, q=84):
    dst = os.path.join(OUT, relpath)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    im.save(dst, "WEBP", quality=q, method=6)
    return dst, os.path.getsize(dst)


def stock(name):
    """An ungraded placeholder original, from design/stock/.

    Every retained placeholder is read from there rather than from
    assets/images/, because each one is both an input to this script and an
    output of it — reading the live file would grade an already-graded file
    a second time on every run. design/stock/ is the pristine copy and is
    never written to, which is what makes the script idempotent.

    Two of those files no longer have a matching output name. thebes-1 was a
    photograph of Cairo filed under Thebes and now lives at
    destinations/cairo; the old aswan-1 hero moved down to
    destinations/aswan, its hero slot taken by the supplied felucca.
    """
    return Image.open(os.path.join(DESIGN, "stock", name + ".webp")).convert("RGB")


# Matching the placeholder set to the supplied look: pull saturation back,
# push the sand warm, lift the black point so nothing sits at true black.
STOCK_GRADE = dict(warm=0.9, sat=0.74, contrast=0.97, bright=1.03, lift=0.055)
# The sea frames start far bluer than anything else on the page.
SEA_GRADE   = dict(warm=1.3, sat=0.55, contrast=0.96, bright=1.05, lift=0.07)
# The Luxor colossus arrived with a teal sky and crushed shadows; it needs
# the HDR pulled out of it entirely before it sits beside anything else.
DEHDR_GRADE = dict(warm=1.9, sat=0.30, contrast=0.94, bright=1.06, lift=0.085)
# The supplied frames only need the haze pulled out of the flatter ones.
NEW_SOFT    = dict(warm=0.15, sat=1.03, contrast=1.06, lift=0.012)
NEW_PLAIN   = dict(warm=0.1,  sat=1.0,  contrast=1.02)
# The hero veil is heavy — a dark bottom band over the lower 48vh and a
# radial darkening centred at 38% — and the branded frame carries its
# subject exactly where that lands. Rather than lighten the veil, which
# every other slide is composed for, this one frame is graded brighter so
# it arrives at the same place the others do once the overlay is on top.
CREW_HERO   = dict(warm=0.15, sat=1.06, contrast=1.10, bright=1.14)

HERO = (2000, 1260), (1200, 760)
DEST = (900, 1247), (500, 693)

jobs = []   # (label, graded image, [(relpath, size), ...])


def hero(base, im, crop, gr):
    im = grade(crop_ratio(im, HERO[0][0] / HERO[0][1], **crop), **gr)
    jobs.append((base, im, [("hero/%s-%d.webp" % (base, w), (w, h)) for w, h in HERO]))


def dest(base, im, crop, gr):
    im = grade(crop_ratio(im, DEST[0][0] / DEST[0][1], **crop), **gr)
    jobs.append((base, im, [("destinations/%s-%d.webp" % (base, w), (w, h)) for w, h in DEST]))


def one(rel, im, size, crop, gr):
    jobs.append((rel, grade(crop_ratio(im, size[0] / size[1], **crop), **gr), [(rel, size)]))


# ---------------------------------------------------------------- hero
# A route, not a gallery: plateau, temple, river, city, coast. The stage
# crops with object-fit:cover and pushes to scale(1.12), so every crop
# leaves margin and keeps its subject near the horizontal centre — that is
# the only part of the frame a phone is guaranteed to show.
# The Giza slot takes the branded group frame. It goes here rather than in
# any other slide because it is shot on the plateau, so the slide's name,
# coordinates and ancient name stay true and the rotation keeps five
# distinct places. The source is 3:2 against a 16:10 slot, so the window
# keeps the full width and trims 56px of height — there is almost no room
# to reposition, which is why the grade above does the work instead.
hero("giza-1",  load("crew"), dict(ay=0.52), CREW_HERO)
hero("luxor-1", load("colossi"), dict(ax=0.55, ay=0.40), NEW_PLAIN)
hero("aswan-1", load("felucca"), dict(ax=0.46, ay=0.48), NEW_SOFT)
# The last two are the only placeholders that survived the cut.
hero("cairo-2",  stock("cairo-2-2000"),  dict(ay=0.46), STOCK_GRADE)
hero("redsea-1", stock("redsea-1-2000"), dict(ay=0.50), SEA_GRADE)

# -------------------------------------------------------- destinations
dest("giza",  load("khafre"), dict(ax=0.50, ay=0.50), NEW_SOFT)
dest("luxor", load("dancer"), dict(ax=0.52, ay=0.52), NEW_PLAIN)
# Cairo previously ran on a souvenir papyrus. The mosque skyline filed under
# hero/thebes-1 is actually Cairo, so it lands where it belongs.
dest("cairo", stock("thebes-1-2000"), dict(ax=0.46, ay=0.50), STOCK_GRADE)
# Aswan previously ran on a motor yacht on open blue water. The old Aswan
# hero is a felucca among the granite islands, which is the real place.
dest("aswan", stock("aswan-1-2000"), dict(ax=0.30, ay=0.50), SEA_GRADE)
dest("abu-simbel", stock("abu-simbel-900"), dict(), DEHDR_GRADE)
# Reef: the wide frame was mostly empty water, so push into the coral.
dest("red-sea", stock("red-sea-900"), dict(ay=0.66, zoom=1.35), STOCK_GRADE)
# Shore: crop away the palm frond overhead and the tiled floor underfoot,
# both of which read as a holiday snapshot rather than a coastline.
dest("alexandria", stock("alexandria-900"), dict(ay=0.60, zoom=1.50), STOCK_GRADE)

# --------------------------------------------------------------- tours
one("tours/cairo-giza-1100.webp", load("table"), (1100, 825),
    dict(ax=0.50, ay=0.40), NEW_SOFT)
# Every tour card renders at aspect-ratio:4/3 (see .tcard-media), so
# both of these are built landscape. They were 825x1100 portrait, which
# object-fit:cover then centre-cropped to the middle 56% of the height —
# that is what sliced the felucca's sail and hull off the Nile card and
# hid the river almost entirely.
one("tours/luxor-karnak-1100.webp", load("columns"), (1100, 825),
    dict(ax=0.50, ay=0.45), NEW_PLAIN)
# Recomposed from the full 2000px frame rather than the pre-cut 825px
# one, which had already lost the boat. The window keeps the whole
# vessel with headroom for the card's 1.04 hover zoom, sets the hull
# near the lower-left third, and holds a real band of river across the
# bottom — the river being the one thing this card has to say. Same
# photograph as destinations/aswan, but a wide landscape crop against
# that card's tall one; the alternative source for either is markedly
# worse.
one("tours/nile-luxor-aswan-1100.webp", stock("aswan-1-2000"),
    (1100, 825), dict(ax=0.385, ay=0.458, zoom=1.0909), SEA_GRADE)
# Was a photograph of Cairo's mosques on the Abu Simbel card. Ramesside
# statuary is at least the right subject; a real Abu Simbel frame is still owed.
one("tours/abu-simbel-south-1100.webp", stock("abu-simbel-900"),
    (1100, 825), dict(ay=0.42), DEHDR_GRADE)

# Three more 4:3 cards, added with the five-tour catalogue. Same ratio and
# the same grades as the four above — these are new crops of frames the
# repository already holds, not new photography, which is why no file
# appears in design/ alongside them.
#
# The Red Sea coast and the reef are the only two sea frames in the set and
# they now carry two different tours, so they are cropped to say different
# things: the coast card is the place (mountains meeting the water), the
# reef card is the activity (the wall of coral the diving day is spent on).
one("tours/red-sea-coast-1100.webp", stock("redsea-1-2000"), (1100, 825),
    dict(ax=0.52, ay=0.52), SEA_GRADE)
# The reef original is 900x1247 with the top half open water. The window
# takes the lower right, where the coral and the anthias are, and accepts a
# 1.22x upscale — finish() sharpens in proportion, and the alternative is a
# card that is two thirds empty blue.
one("tours/red-sea-reef-1100.webp", stock("red-sea-900"), (1100, 825),
    dict(ax=0.62, ay=0.74), STOCK_GRADE)
# The camel train: the strongest landscape frame in the supplied set, and
# until now used only as the share card. It leads the eight-day route,
# which is the only one of the five that reaches Giza.
one("tours/giza-caravan-1100.webp", load("caravan"), (1100, 825),
    dict(ax=0.50, ay=0.54), NEW_PLAIN)

# ---------------------------------------------------------------- misc
# Sits behind section 04 at 15% opacity: wants shape, not detail.
one("misc/approach-bg-1800.webp", load("wine"), (1800, 1000),
    dict(ax=0.50, ay=0.46), NEW_SOFT)

# ---------------------------------------------------------- share card
# Whatever leads the hero also leads every link anyone pastes.
OG = grade(crop_ratio(load("caravan"), 1200 / 630, ax=0.56, ay=0.50), **NEW_PLAIN)


if __name__ == "__main__":
    # With no arguments every asset is rebuilt. With arguments, only the
    # outputs whose path contains one of them — "python tools/build-images.py
    # tours/" rebuilds the cards and leaves the rest of the tree untouched,
    # which keeps a one-card change out of the other forty files.
    only = sys.argv[1:]
    total = 0
    for _label, im, outs in jobs:
        if only:
            outs = [o for o in outs if any(k in o[0] for k in only)]
            if not outs:
                continue
        for rel, size in outs:
            _, n = save(finish(im, size), rel, q=86 if size[0] >= 1600 else 84)
            total += n
            print("  %-44s %dx%-5d %7.1f KB" % (rel, size[0], size[1], n / 1024))

    # The share card is derived from the hero set, so a partial run has no
    # business rewriting it.
    if not only:
        dst = os.path.join(ICONS, "og-image.jpg")
        finish(OG, (1200, 630)).save(dst, "JPEG", quality=88, optimize=True, progressive=True)
        n = os.path.getsize(dst)
        total += n
        print("  %-44s %dx%-5d %7.1f KB" % ("../icons/og-image.jpg", 1200, 630, n / 1024))
    print("\n%.2f MB written" % (total / 1024 / 1024))
