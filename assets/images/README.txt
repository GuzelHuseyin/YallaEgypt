Image assets
============

PROVENANCE
----------
The set is now mixed. Owned photography carries the page; the stock
that survived is there because no owned frame covered that slot yet.

OWNED (from design/, supplied 19 Aug 2026)
  hero/giza-1              camel train below the plateau  -- the lead frame
  hero/luxor-1             the colossi along the Karnak wall
  hero/aswan-1             a felucca on the Nile at dusk
  destinations/giza        Khafre with the Sphinx below it
  destinations/luxor       a figure in the hypostyle hall at Karnak
  tours/cairo-giza         the branded group facing the plateau (asd.jpeg)
  tours/luxor-karnak       painted capitals seen from below
  misc/approach-bg         a glass on a ledge above the plateau

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
  tours/          1100px, landscape 4:3 for odd cards,
                  portrait 3:4 for even ones (the layout alternates)
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

STILL UNPLACED: a Sphinx in profile (hazy, cluttered foreground, and
Giza is already carried by three stronger frames); a rooftop cafe (a
good, honest picture that does not read as luxury at any crop); and
the breakfast terrace facing the plateau, which held tours/cairo-giza
until asd.jpeg replaced it and would suit an editorial or "about"
slot if one is ever added. All three are in design/.

One note on asd.jpeg: the logo printed on the shirts is not the mark
this site uses. The site's #ye-mark is the gold medallion transcribed
from design/yalla-egypt-logo-3.pdf; the shirts carry a triangle
pyramid mark with YALLA in navy and EGYPT in orange. At card size the
difference is easy to miss, but it is a second brand identity living
on the same page, and worth settling before print or paid social.


REGENERATING THE STOCK CROPS (same widths)
------------------------------------------
  https://images.unsplash.com/photo-{ID}?auto=format&fm=webp&fit=crop&w={W}&h={H}&q={Q}
