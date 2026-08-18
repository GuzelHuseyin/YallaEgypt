Video assets
============

Nothing here yet. Every slot below is wired up and disabled; each
becomes live by dropping in files and changing one value in
js/data.js. No markup or CSS changes are needed for any of them.

The hero is built as three independent layers:

    1  footage    the background film, or the still sequence
    2  gesture    the hand that pushes the mark at the viewer
    3  interface  headline, CTAs, field record

Which of the two workflows below you use is decided by whether the
delivered film contains the hand and the mark, or only Egypt.


--------------------------------------------------------------------
1. HERO BACKGROUND FILM  ->  HERO_VIDEO in js/data.js
--------------------------------------------------------------------
Expected files:
    assets/videos/hero.webm      (VP9 or AV1)
    assets/videos/hero.mp4       (H.264 High, for Safari)

Then set:  HERO_VIDEO.enabled = true

Constraints, from the design audit. These are not style preferences —
each one protects something measurable:

  * 6-8 seconds, seamless loop, NO audio track at all (an audio track
    can block autoplay in some browsers even when muted)
  * under 2 MB per file. A hero film is not worth a second of LCP
  * landscape, and composed for a heavy bottom gradient plus a centre
    vignette: the mark and headline sit over the middle of the frame
    and the field-record strip along the bottom, so keep the subject
    matter in the outer thirds and off the centre line
  * the still sequence stays underneath as poster and fallback, so a
    slow or failed video never leaves an empty hero
  * it does not load under prefers-reduced-motion or on Save-Data

Encode (adjust -crf until you land under 2 MB):
    ffmpeg -i source.mov -an -vf "scale=1920:-2,fps=25" -t 8 \
           -c:v libvpx-vp9 -crf 34 -b:v 0 -row-mt 1 hero.webm
    ffmpeg -i source.mov -an -vf "scale=1920:-2,fps=25" -t 8 \
           -c:v libx264 -crf 25 -preset slow -profile:v high \
           -pix_fmt yuv420p -movflags +faststart hero.mp4

MOBILE CUT  ->  HERO_VIDEO.mobileSources
Below HERO_VIDEO.minWidth (900px) the landscape file is not used at
all. A 16:9 film centre-cropped into a 9:16 phone viewport loses its
whole composition and still costs the visitor the download. Either
supply a portrait cut and list it in mobileSources, or leave the array
empty and phones keep the stills — both are correct, neither is a bug.

    ffmpeg -i source.mov -an -vf "scale=1080:-2,fps=25" -t 8 \
           -c:v libx264 -crf 26 -preset slow -profile:v high \
           -pix_fmt yuv420p -movflags +faststart hero-mobile.mp4

Optional: HERO_VIDEO.label lets the field-record strip carry a caption
while the film runs. Leave it null and the descriptor hides itself
rather than describing a still that is no longer on screen. The pause
control stays either way — auto-playing motion has to be stoppable.


--------------------------------------------------------------------
2. THE OPENING — the "yalla" gesture  ->  OPENING in js/data.js
--------------------------------------------------------------------
This is already live. A hand rises into the first screen HOLDING the
Yalla Egypt mark, presents it for a beat, pushes it towards the
camera, and drops away as the mark settles above the headline. It
runs once per session, never under reduced motion, and is abandoned
the moment the visitor scrolls.

The holding beat is the whole idea — it is what stops the sequence
reading as a logo zoom. Three things carry it, and any replacement
asset has to keep all three:

  * the hand and the mark move as ONE SOLID for the first 600ms
  * two fingers are drawn OVER the face of the medallion until the
    push, then let go
  * both withdraw together before the drive

The hand currently ships as an SVG silhouette (#ye-hand and
#ye-hand-fore in index.html): near black, gold rim, motion-blurred,
on screen for 1.3 seconds. It is honest placeholder artwork — it is
posed as an open pushing palm, not as a hand gripping a disc, so the
fingers cross the top third of the mark rather than wrapping its
edge. Replacing it is the single biggest available improvement to
the opening.


WHAT TO COMMISSION
------------------
Two stills, NOT video. The push is driven by CSS, so a static hand
transformed in 3D stays vector-sharp, weighs ~40KB, and can never
drift out of sync with the logo. At 1.3s under motion blur a filmed
hand does not visibly articulate anyway — and two synced alpha videos
is not a practical way to get the occlusion.

    assets/images/hand-back.webp    palm, thumb, all fingers, forearm
    assets/images/hand-fore.webp    ONLY the fingers that cross the
                                    mark; transparent everywhere else

Then set, in js/data.js:

    OPENING.handPlate = {
      back: { type:"image", src:"assets/images/hand-back.webp" },
      fore: { type:"image", src:"assets/images/hand-fore.webp" }
    };

Specification — the registration items are not style preferences,
they are what makes the palm land on the mark at every breakpoint:

  * WebP with a real alpha channel. No matte, no halo: premultiplied
    alpha fringing shows as a grey edge against the dark ground
  * 1200 x 1350 px, i.e. aspect 320:360 — matches the layer's own
    aspect-ratio, so no CSS changes
  * BOTH FILES ON ONE CANVAS, ONE REGISTRATION. hand-fore must be
    the same fingers in the same place as hand-back, just isolated.
    If they do not register, the fingers will jump at the release
  * palm centre horizontally centred, and 34% down from the top
  * forearm bleeding off the bottom edge of the canvas
  * ~50mm equivalent lens, camera slightly below and left. Not
    wide-angle — it distorts the fingers
  * back of the hand toward camera, fingers curling forward around
    where the medallion sits, as though about to release it
  * key light from upper left. Near-black body with a warm gold rim
    on the upper-left contour, to match .hand-rim in the CSS
  * a hairline linen galabeya cuff at the wrist is the only Egyptian
    detail that survives at this speed and scale. Henna and
    pharaonic cuffs read as costume and are invisible anyway

If a plate 404s or the browser cannot decode it, the layer falls back
to the built-in silhouette rather than leaving a hole.


IF YOU WANT FILMED FOOTAGE ANYWAY
---------------------------------
Point handPlate at a video instead. Supplying only `back` (no `fore`)
drops the front layer automatically, so the push survives and only
the occlusion is lost:

    OPENING.handPlate = { back:{ type:"video", src:"assets/videos/hand.webm" } };

  * about 1.3 seconds, cut off at OPENING.maxDurationMs regardless
  * same framing and registration rules as above
  * an alpha channel — there is no chroma key in the page

    ffmpeg -i hand.mov -an -t 1.4 -c:v libvpx-vp9 -pix_fmt yuva420p \
           -crf 30 -b:v 0 hand.webm

  ! SAFARI DOES NOT SUPPORT ALPHA IN VP9/WEBM. It will decode the
    file and render the transparent areas BLACK, putting a black
    rectangle over the hero. If you go the video route you need a
    second HEVC-with-alpha .mp4 for Safari and a <source> pair, or
    you accept that Safari shows the silhouette. This is the main
    reason the two-still route above is the recommendation.

--------------------------------------------------------------------
3. IF THE FILM ALREADY HAS THE HAND AND THE MARK IN IT
--------------------------------------------------------------------
Then layers 1 and 2 are the same footage, and the CSS gesture would
play a second time on top of it. Set:

    OPENING.enabled = false;

The gesture layer then never renders at all, the film plays as the
background, and the mark simply sits at rest above the headline. This
is the only change required.

Prefer the layered route where you can: the mark stays vector-sharp at
every resolution, and re-cutting the film later never means re-shooting
the logo.
