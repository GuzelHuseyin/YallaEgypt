Video assets
============

Nothing here yet. Both slots below are wired up and disabled; each
becomes live by dropping in files and flipping one flag in js/data.js.
No markup or CSS changes are needed for either.


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
  * landscape, and composed for a heavy bottom gradient: the headline
    and field-record strip sit over the lower third, so keep the
    subject in the upper two thirds
  * the still sequence stays underneath as poster and fallback, so a
    slow or failed video never leaves an empty hero
  * it does not load at all on viewports under HERO_VIDEO.minWidth
    (900px), under prefers-reduced-motion, or on Save-Data — mobile
    keeps the stills

Encode (adjust -crf until you land under 2 MB):
    ffmpeg -i source.mov -an -vf "scale=1920:-2,fps=25" -t 8 \
           -c:v libvpx-vp9 -crf 34 -b:v 0 -row-mt 1 hero.webm
    ffmpeg -i source.mov -an -vf "scale=1920:-2,fps=25" -t 8 \
           -c:v libx264 -crf 25 -preset slow -profile:v high \
           -pix_fmt yuv420p -movflags +faststart hero.mp4

Optional: HERO_VIDEO.label lets the field-record strip carry a caption
while the film runs. Leave it null and the strip hides itself rather
than describing a still that is no longer on screen.


2. BRAND INTRO — the "yalla" gesture reveal  ->  INTRO in js/data.js
--------------------------------------------------------------------
Expected file:
    assets/videos/intro.webm     (plus intro.mp4 if you need Safari)

Then set in js/data.js:
    INTRO.enabled = true;
    INTRO.media   = { type:"video", src:"assets/videos/intro.webm",
                      poster:"assets/images/hero/giza-1-1200.webp" };

js/intro.js already enforces the rules; see the comment block at the
top of that file. The short version: first visit of a session only,
skippable, hard-capped at 1.2 seconds, never under reduced motion,
and it never delays the page underneath.

This one is deliberately NOT approximated in CSS. A drawn or animated
hand would read as cheap on the first screen of a luxury travel brand,
which is worse than having no intro at all. It needs to be shot or
animated properly, then dropped in here.
