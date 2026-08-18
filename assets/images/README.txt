Image assets
============

PROVENANCE
----------
Everything currently in hero/, destinations/, tours/ and misc/ is stock
photography from Unsplash, pre-cropped server-side to the exact
dimensions this site uses and cached locally as WebP, so the live site
never depends on an external image host at request time.

These are placeholders. The design audit is blunt about this being the
single highest-return item on the list: a luxury travel company is sold
on photographs, and the strongest proof it has is pictures that show it
was actually there. Owned photography beats stock by a wide margin.


REPLACING THEM
--------------
Keep the same filenames and the same width suffixes and nothing else
has to change — the srcset in js/main.js is built from the "base" path
and "widths" array in js/data.js.

  hero/           2000px + 1200px, landscape, ~16:10
                  Composed for a heavy bottom gradient: headline and
                  field-record strip sit over the lower third, so keep
                  the subject in the upper two thirds.
  destinations/    900px +  500px, portrait, 3:4.1
  tours/          1100px, landscape 4:3 for odd cards,
                  portrait 3:4 for even ones (the layout alternates)
  misc/           1800px, landscape — sits behind section 04 at 22%
                  opacity under a dark gradient, so it wants contrast
                  and shape, not detail

Two entries are waiting on files:

  * Siwa is defined in js/data.js DESTINATIONS with enabled:false.
    Add destinations/siwa-500.webp and siwa-900.webp, flip it to true.
  * team/ does not exist yet. Create it, add portraits, then fill in
    name / role / line / photo in the TEAM array in js/data.js. Until
    a photo path is set, that person renders as a marked placeholder
    tile — which is deliberate. Do not put stock faces here.


ART DIRECTION (from design/yalla-egypt-tasarim-denetimi.md)
-----------------------------------------------------------
Use:     natural light, dawn and dusk, a single human figure for scale,
         documentary framing, texture (limestone, granite, linen,
         water), interiors — hypostyle halls, hotel rooms, boat decks.
Avoid:   over-saturated HDR, posed smiling couples, drone shots only,
         empty postcard views, anything that reads as stock.

Each section's image does a specific job: hero = atmosphere,
journeys = product, destinations = geography, about = people,
final CTA = desire. Shoot to that list.


REGENERATING THE CURRENT SET (same crops and widths)
----------------------------------------------------
  https://images.unsplash.com/photo-{ID}?auto=format&fm=webp&fit=crop&w={W}&h={H}&q={Q}
