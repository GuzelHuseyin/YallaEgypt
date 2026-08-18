/* ============================================================
   THE OPENING — "a hand pushes the mark towards you"
   ------------------------------------------------------------
   The client's idea, built as the second of the hero's three
   layers. A hand rises into frame, drives the Yalla Egypt mark
   towards the camera, and drops away as the mark falls back into
   its seat above the headline.

   This file does one job: decide whether the opening should run,
   and if so start it and clean up after it. All of the motion is
   CSS — see the THE OPENING block in css/styles.css. Nothing here
   animates anything, which is why it stays this short.

   WHAT IT REFUSES TO DO, AND WHY
     · run under prefers-reduced-motion            — accessibility
     · run twice in a session                      — an entrance
       impresses once and obstructs every time after
     · run when the tab is not being looked at     — the one run a
       session gets should not be spent off-screen
     · run when the visitor arrived below the hero — deep links to
       #contact are not an audience for a brand entrance
     · delay anything                              — the page is
       rendered, scrollable and clickable underneath from the
       first frame, and the opening is abandoned the moment the
       visitor touches the page

   THE RESTING STATE IS THE DEFAULT
     Every element involved is styled at its final position in
     plain CSS. This file only adds .is-opening, which layers the
     animation on top, and removes it when the run is over. So the
     hero is complete and correct with JavaScript disabled, with
     this file deleted, on a repeat visit, or the instant someone
     scrolls — there is no state to get stuck in.

   Loaded last, after js/main.js, because it needs the hero stills
   that main.js renders.
   ============================================================ */
(() => {
  const hero = document.querySelector(".hero");
  if(!hero) return;

  // Settling also drops the gesture layer: the hand exists for one
  // run, and every path that ends the opening goes through here.
  const settle = () => {
    hero.classList.add("is-open");
    document.querySelector("#hero-gesture")?.remove();
  };

  if(typeof OPENING === "undefined" || !OPENING.enabled){ settle(); return; }
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){ settle(); return; }
  if(scrollY > 80){ settle(); return; }                    // arrived past the hero

  const KEY = "ye-opening-seen";
  const seen = () => { try{ return sessionStorage.getItem(KEY); }catch{ return null; } };
  const mark = () => { try{ sessionStorage.setItem(KEY, "1"); }catch{ /* private mode */ } };
  if(OPENING.oncePerSession && seen()){ settle(); return; }

  const gesture = document.querySelector("#hero-gesture");
  const lockup  = document.querySelector("#hero-lockup");
  if(!gesture || !lockup){ settle(); return; }

  /* ----------------------------------------------------------
     Optional filmed / animated hand plate. Replaces the built-in
     silhouette in place; the layer's position, size and timing
     are unchanged, so a plate can be swapped in without touching
     anything else. See OPENING.handPlate in js/data.js.
     ---------------------------------------------------------- */
  let plate = null;
  if(OPENING.handPlate && OPENING.handPlate.src){
    const cfg = OPENING.handPlate;
    if(cfg.type === "video"){
      plate = document.createElement("video");
      plate.src = cfg.src;
      plate.muted = true; plate.defaultMuted = true;
      plate.playsInline = true; plate.setAttribute("playsinline", "");
      plate.preload = "auto"; plate.tabIndex = -1;
    } else {
      plate = document.createElement("img");
      plate.src = cfg.src;
      plate.alt = "";
      plate.decoding = "async";
    }
    gesture.replaceChildren(plate);
  }

  /* ----------------------------------------------------------
     Wait for the frame the mark will be thrown across.
     Throwing a logo over an empty black hero wastes the whole
     effect, so hold for the first still and for the wordmark's
     face — but hold on a timer, never indefinitely. A slow
     network gets a slightly plainer opening, not a stalled one.
     ---------------------------------------------------------- */
  const wait = ms => new Promise(r => setTimeout(r, ms));

  const firstStill = () => {
    const img = document.querySelector("#stage img");
    if(!img) return Promise.resolve();
    if(img.complete) return Promise.resolve();
    return new Promise(r => {
      img.addEventListener("load",  r, { once:true });
      img.addEventListener("error", r, { once:true });
    });
  };

  const visible = () => document.hidden
    ? new Promise(r => document.addEventListener("visibilitychange", function once(){
        if(document.hidden) return;
        document.removeEventListener("visibilitychange", once);
        r();
      }))
    : Promise.resolve();

  const fonts = document.fonts ? document.fonts.ready : Promise.resolve();

  /* ----------------------------------------------------------
     Teardown. Runs exactly once, whether the animation finished,
     hit its ceiling, or was abandoned. Removing .is-opening drops
     every element back to its resting CSS, so an interrupted run
     lands in the same place a completed one does.
     ---------------------------------------------------------- */
  let done = false, cap = 0;

  function finish(){
    if(done) return;
    done = true;
    clearTimeout(cap);
    removeEventListener("scroll", abandon);
    removeEventListener("keydown", abandon);
    removeEventListener("pointerdown", abandon);
    hero.classList.remove("is-opening");
    settle();
    lockup.style.willChange = "";
    plate?.pause?.();
  }

  function abandon(){ finish(); }

  /* ---------------------------------------------------------- */
  visible()
    .then(() => Promise.race([ Promise.all([ firstStill(), fonts ]), wait(1600) ]))
    .then(() => {
      if(done || scrollY > 80) return finish();
      mark();

      // One frame's grace so the class lands on a painted hero.
      requestAnimationFrame(() => {
        if(done) return;
        hero.classList.add("is-opening");
        plate?.play?.().catch(() => {});

        // The throw is the last thing to settle, so its end is the
        // end of the opening. The timer is the backstop for a
        // browser that never fires it.
        lockup.addEventListener("animationend", e => {
          if(e.animationName === "ye-throw") finish();
        });
        cap = setTimeout(finish, OPENING.maxDurationMs || 2200);

        addEventListener("scroll", abandon, { once:true, passive:true });
        addEventListener("keydown", abandon, { once:true });
        addEventListener("pointerdown", abandon, { once:true, passive:true });
      });
    });
})();
