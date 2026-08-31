Image assets
============

PROVENANCE
----------
The set is now mixed. Owned photography carries the page; the stock
that survived is there because no owned frame covered that slot yet.

OWNED (from design/, supplied 19 Aug 2026)
  hero/giza-1              the branded group on the plateau (asd.jpeg)
  hero/luxor-1             the colossi along the Karnak wall
  hero/aswan-1             a felucca on the Nile at dusk
  destinations/giza        Khafre with the Sphinx below it
  destinations/luxor       a figure in the hypostyle hall at Karnak
  tours/cairo-giza         breakfast on a terrace facing the plateau
  tours/luxor-karnak       painted capitals seen from below
  misc/approach-bg         a glass on a ledge above the plateau
  tours/giza-caravan       the camel train, backlit -- new crop, and
                           the first slot this frame has held besides
                           the share card

STOCK, REGRADED (Unsplash, cached locally as WebP)
  hero/cairo-2             Khan el-Khalili
  hero/redsea-1            the Sinai coast
  destinations/cairo       minarets above old Cairo
  destinations/aswan       a felucca among the granite islands
  destinations/abu-simbel  see the warning below
  destinations/red-sea     a reef
  destinations/alexandria  a shoreline
  tours/nile-luxor-aswan   a felucca among the dunes
  tours/abu-simbel-south   see the warning below
  tours/red-sea-coast      the coast, from redsea-1 (new crop)
  tours/red-sea-reef       the reef, from destinations/red-sea (new crop)

Everything retained was regraded toward the owned photographs --
saturation pulled back, the sand pushed warm, the black point lifted.
The placeholder set arrived punchy and HDR-ish, which is the one look
the design audit explicitly rules out, and it read as a different
shoot next to the owned frames. The grade is in the build script, not
baked into a filter: the files on disk are the graded ones.

TWO FILES ARE STILL WRONG ON THE FACTS
  destinations/abu-simbel and tours/abu-simbel-south are both the
  colossus at LUXOR TEMPLE, not Abu Simbel. The alt text describes
  only what is visible so nothing on the page claims otherwise, but
  this is the first photograph to commission. Before this pass the
  Abu Simbel tour card carried a photograph of Cairo's mosques, and
  hero/thebes-1 -- labelled Thebes -- was also Cairo; that frame has
  been moved to destinations/cairo, where it belongs.

  destinations/alexandria is a shoreline that could be anywhere. It
  is kept because Alexandria is a place the company sells, not
  because the picture earns its place.


REPLACING THEM
--------------
Keep the same filenames and the same width suffixes and nothing else
has to change -- the srcset in js/main.js is built from the "base"
path and "widths" array in js/data.js.

  hero/           2000px + 1200px, landscape, ~16:10
                  Composed for a heavy bottom gradient: headline and
                  field-record strip sit over the lower third, so keep
                  the subject in the upper two thirds. The stage also
                  runs a slow Ken Burns push to 1.12 and crops with
                  object-fit:cover, so leave margin on all four edges
                  and keep the subject near the horizontal centre or
                  it walks out of frame on a phone.
  destinations/    900px +  500px, portrait, 3:4.1
  tours/          1100px, landscape 4:3 -- every card, including the
                  full-width flagship, crops with object-fit:cover
                  from a 4:3 box, so a portrait original is beheaded
  misc/           1800px, landscape -- sits behind section 04 at 15%
                  opacity under a mask that fades both edges, so it
                  wants contrast and shape, not detail

Two entries are waiting on files:

  * Siwa is defined in js/data.js DESTINATIONS with enabled:false.
    Add destinations/siwa-500.webp and siwa-900.webp, flip it to true.
  * team/ does not exist yet. Create it, add portraits, then fill in
    name / role / line / photo in the TEAM array in js/data.js. Until
    a photo path is set, that person renders as a marked placeholder
    tile -- which is deliberate. Do not put stock faces here.


ART DIRECTION (from design/yalla-egypt-tasarim-denetimi.md)
-----------------------------------------------------------
Use:     natural light, dawn and dusk, a single human figure for scale,
         documentary framing, texture (limestone, granite, linen,
         water), interiors -- hypostyle halls, hotel rooms, boat decks.
Avoid:   over-saturated HDR, posed smiling couples, drone shots only,
         empty postcard views, anything that reads as stock.

Each section's image does a specific job: hero = atmosphere,
journeys = product, destinations = geography, about = people,
final CTA = desire. Shoot to that list.

The hero is a route, not a gallery: plateau, temple, river, city,
coast. Keep that order when frames are added or swapped, and keep one
landmark to one appearance -- the Sphinx and the pyramids are easy to
repeat by accident across hero, strip and cards.

THE FIVE TOUR CARDS (js/data.js TOURS, in catalogue order)
  01 Best of Egypt            tours/giza-caravan     owned
  02 Egypt Family Holiday     tours/red-sea-coast    stock, regraded
  03 Hurghada Adventure       tours/red-sea-reef     stock, regraded
  04 Hurghada & Luxor         tours/luxor-karnak     owned
  05 Hurghada, Luxor & Cairo  tours/cairo-giza       owned

  The detail view behind each card reuses a hero/ still rather than
  loading a sixth photograph, so opening a tour usually costs no new
  image at all: giza-1 for 01, redsea-1 for 02 and 03, luxor-1 for
  04, cairo-2 for 05. The mapping is the "hero" field on each tour.

  WHAT THESE CARDS ARE STILL OWED. Three of the five routes are
  built on Hurghada and there is no Hurghada photograph in the set
  at all -- both sea frames are the Sinai coast and a reef, and
  neither shows the town, the marina, the desert safari, the ATVs,
  the Bedouin camp, the dive boat, the islands or a balloon over the
  West Bank. Those are the shots the catalogue most needs next, and
  they are the ones a client with boats and 4x4s can supply from a
  single working week. tours/ wants 1100px, landscape 4:3.

  nile-luxor-aswan-1100.webp is 2.1 MB on disk, roughly ten times
  every other card, and is no longer referenced by anything. Either
  rebuild it (python tools/build-images.py tours/nile) or delete it.

STILL UNPLACED: a Sphinx in profile (hazy, cluttered foreground, and
Giza is already carried by three stronger frames); a rooftop cafe (a
good, honest picture that does not read as luxury at any crop); and
the camel train, which led the hero until asd.jpeg took the Giza slot
and now survives only as assets/icons/og-image.jpg. All three are in
design/. The camel train is the strongest landscape frame in the set
and is worth a slot if one opens up.

TWO NOTES ON asd.jpeg, both worth settling before a paid campaign:

  * The logo printed on the shirts is not the mark this site uses.
    #ye-mark is the gold medallion transcribed from
    design/yalla-egypt-logo-3.pdf; the shirts carry a triangle pyramid
    mark with YALLA in navy and EGYPT in orange. That is a second
    brand identity living on the same page.
  * It is a five-across composition in a 16:10 slot. On a phone the
    stage crops to roughly the middle 40% of the width, so two of the
    five are off-frame. The branding still reads, but the group shot
    is a desktop and tablet composition; it was graded brighter than
    the other slides (CREW_HERO in tools/build-images.py) so the
    shirts survive the veil rather than the veil being lightened for
    one frame.


REGENERATING THE STOCK CROPS (same widths)
------------------------------------------
  https://images.unsplash.com/photo-{ID}?auto=format&fm=webp&fit=crop&w={W}&h={H}&q={Q}
