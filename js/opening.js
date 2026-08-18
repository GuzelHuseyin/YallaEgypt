/* ============================================================
   THE OPENING — "a hand pushes the mark towards you"
   ------------------------------------------------------------
   The client's idea, built as the second of the hero's three
   layers. A hand rises into frame HOLDING the Yalla Egypt mark,
   presents it for a beat, drives it towards the camera, and drops
   away as the mark falls back into its seat above the headline.

   The hold is the point. The gesture is drawn as two layers —
   #hero-gesture behind the mark, #hero-gesture-fore (two fingers
   again) in front of it — so for the first 600ms the fingers
   cross the face of the medallion and the hand is unambiguously
   holding it. Both layers run the same animation on the same
   clock; see THE OPENING in css/styles.css for why that matters.

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

  // Settling also drops the gesture layers: the hand exists for one
  // run, and every path that ends the opening goes through here.
  // Both layers go — the front fingers are painted over the mark,
  // so leaving that one behind would sit a black shape on the logo.
  const settle = () => {
    hero.classList.add("is-open");
    document.querySelectorAll(".hero-gesture").forEach(el => el.remove());
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
  // Optional. Without it the opening still runs, and only loses the
  // fingers-over-the-mark occlusion.
  const fore = document.querySelector("#hero-gesture-fore");

  /* ----------------------------------------------------------
     Optional filmed / drawn hand plates. Each replaces the built-in
     silhouette of its own layer in place; position, size and timing
     are unchanged, so plates can be swapped in without touching the
     animation at all. See OPENING.handPlate in js/data.js.

       handPlate.back   palm, thumb, fingers, forearm
       handPlate.fore   only the fingers that cross the mark

     A bare { type, src } is still accepted and still means "the
     whole hand", which is what it meant before there were two
     layers.
     ---------------------------------------------------------- */
  const plates = [];

  function loadPlate(host, cfg){
    if(!host || !cfg || !cfg.src) return;
    const fallback = host.innerHTML;          // the silhouette we replace
    let el;
    if(cfg.type === "video"){
      el = document.createElement("video");
      el.muted = true; el.defaultMuted = true;
      el.playsInline = true; el.setAttribute("playsinline", "");
      el.preload = "auto"; el.tabIndex = -1;
    } else {
      el = document.createElement("img");
      el.alt = ""; el.decoding = "async";
    }
    /* A 404, a codec the browser will not decode, or an alpha
       format it does not support must not leave a hole where the
       hand should be. Put the silhouette back and carry on — a
       plainer opening, not a broken one. */
    el.addEventListener("error", () => { host.innerHTML = fallback; }, { once:true });
    el.src = cfg.src;
    host.replaceChildren(el);
    plates.push(el);
  }

  const plateCfg = OPENING.handPlate;
  if(plateCfg){
    loadPlate(gesture, plateCfg.back || plateCfg);
    loadPlate(fore,    plateCfg.fore);

    /* A back plate with no front plate means the supplied artwork
       owns the whole hand. Keeping our two drawn fingers would lay
       a silhouette that no longer matches over the mark, so the
       front layer goes and the opening loses only its occlusion. */
    if((plateCfg.back || plateCfg.src) && !plateCfg.fore) fore?.remove();
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
    plates.forEach(p => p.pause?.());
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
        plates.forEach(p => p.play?.().catch(() => {}));

        /* The field record is the last thing to resolve, so its
           rise is the end of the opening — not the throw, which
           lands 870ms earlier. Tearing down on the throw would drop
           .is-opening while the headline, sub and CTAs were still
           rising and snap all three to their resting state.
           Falls back to the lockup if the hero has no record strip,
           and the timer is the backstop for a browser that fires
           neither. */
        const last = document.querySelector(".record") || lockup;
        last.addEventListener("animationend", e => {
          if(e.target !== last) return;                 // not a child's
          if(e.animationName === "ye-rise" || e.animationName === "ye-throw") finish();
        });
        cap = setTimeout(finish, OPENING.maxDurationMs || 2600);

        addEventListener("scroll", abandon, { once:true, passive:true });
        addEventListener("keydown", abandon, { once:true });
        addEventListener("pointerdown", abandon, { once:true, passive:true });
      });
    });
})();
