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
This is already live. A hand rises into the first screen, pushes the
Yalla Egypt mark towards the camera, and drops away as the mark
settles above the headline. It runs once per session, never under
reduced motion, and is abandoned the moment the visitor scrolls.

The hand currently ships as an SVG silhouette (#ye-hand in
index.html): near black, gold rim, motion-blurred, on screen for 1.3
seconds. That is what a real plate looks like at this speed, and it
is the one treatment that does not read as a cartoon.

If you have footage of a real hand, point OPENING.handPlate at it and
the silhouette is replaced in place:

    OPENING.handPlate = { type:"video", src:"assets/videos/hand.webm" };
    OPENING.handPlate = { type:"image", src:"assets/images/hand-plate.png" };

Requirements for a plate:
  * an alpha channel — VP9 or VP8 with alpha in .webm, or a
    transparent PNG. There is no chroma key in the page
  * framed with the palm in the middle of the plate. The layer is
    anchored on the mark, so a centred palm lands on the mark at
    every viewport size
  * about 1.3 seconds, and short: it is cut off at OPENING.maxDurationMs
  * shot against a dark ground, lit from upper left, to match the
    rim on the current silhouette

Encode with alpha:
    ffmpeg -i hand.mov -an -t 1.4 -c:v libvpx-vp9 -pix_fmt yuva420p \
           -crf 30 -b:v 0 hand.webm


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
