/* ============================================================
   BRAND INTRO — the "yalla" gesture reveal
   ------------------------------------------------------------
   STATUS: shell only, and deliberately so.

   The concept is a hand entering frame and pushing the Yalla
   Egypt mark into view. That has to be filmed or animated by a
   motion designer. A CSS hand, an emoji, or a stock loop would
   read as cheap on the first screen of a luxury travel brand —
   which is worse than having no intro at all. So this file
   ships the enforcement, not an imitation.

   What it enforces (from the design audit — an entrance
   animation impresses once and obstructs every time after):
     · first visit of a session only
     · skippable, by button or Escape
     · hard ceiling of INTRO.maxDurationMs, whatever the media does
     · never blocks content — the page is fully rendered and
       interactive underneath from the first frame
     · never runs under prefers-reduced-motion
     · nothing at all is injected while disabled: no DOM, no CSS,
       no listeners, no cost

   TO ACTIVATE, in js/data.js:
     INTRO.enabled = true;
     INTRO.media   = { type:"video", src:"assets/videos/intro.webm",
                       poster:"assets/images/hero/giza-1-1200.webp" };

   Supported media types: "video" and "image".
   ============================================================ */
(() => {
  if(typeof INTRO === "undefined" || !INTRO.enabled || !INTRO.media) return;
  if(matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const KEY = "ye-intro-seen";
  if(INTRO.oncePerSession){
    try{
      if(sessionStorage.getItem(KEY)) return;
      sessionStorage.setItem(KEY, "1");
    }catch{ /* private mode — play it, just don't remember */ }
  }

  const css = `
    .ye-intro{position:fixed;inset:0;z-index:300;display:grid;place-items:center;
      background:#0B0A08;transition:opacity .5s cubic-bezier(.22,.61,.36,1)}
    .ye-intro.is-out{opacity:0;pointer-events:none}
    .ye-intro>video,.ye-intro>img{width:100%;height:100%;object-fit:cover}
    .ye-intro-skip{position:absolute;right:1.5rem;bottom:1.5rem;
      padding:.7rem 1.2rem;border:1px solid rgba(201,162,75,.5);color:#E8C77A;
      font-family:Jost,system-ui,sans-serif;font-size:.6875rem;font-weight:500;
      text-transform:uppercase;letter-spacing:.16em;cursor:pointer;background:none}
    .ye-intro-skip:hover,.ye-intro-skip:focus-visible{background:#C9A24B;color:#0B0A08}`;

  const style = document.createElement("style");
  style.textContent = css;
  document.head.append(style);

  const box = document.createElement("div");
  box.className = "ye-intro";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-label", "Yalla Egypt");

  const m = INTRO.media;
  let media;
  if(m.type === "video"){
    media = document.createElement("video");
    media.src = m.src;
    if(m.poster) media.poster = m.poster;
    media.muted = true; media.defaultMuted = true; media.autoplay = true;
    media.playsInline = true; media.setAttribute("playsinline", "");
    media.addEventListener("ended", () => end(), { once:true });
    media.addEventListener("error", () => end(), { once:true });
  } else {
    media = document.createElement("img");
    media.src = m.src;
    media.alt = "";
  }
  box.append(media);

  const skip = document.createElement("button");
  skip.type = "button";
  skip.className = "ye-intro-skip";
  skip.textContent = "Skip";
  skip.addEventListener("click", () => end());
  box.append(skip);

  const onKey = e => { if(e.key === "Escape") end(); };
  let done = false;

  function end(){
    if(done) return;
    done = true;
    clearTimeout(cap);
    removeEventListener("keydown", onKey);
    box.classList.add("is-out");
    setTimeout(() => { box.remove(); style.remove(); }, 520);
  }

  const cap = setTimeout(end, Math.min(INTRO.maxDurationMs || 1200, 2000));
  addEventListener("keydown", onKey);
  document.addEventListener("DOMContentLoaded", () => {
    document.body.append(box);
    skip.focus({ preventScroll:true });
    if(m.type === "video") media.play?.().catch(() => end());
  }, { once:true });
})();
