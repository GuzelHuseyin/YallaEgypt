/* ============================================================
   RENDERING + INTERACTION
   Depends on js/data.js and js/i18n.js being loaded first.
   Every string a visitor reads comes from one of those two —
   nothing is hard-coded here.
   ============================================================ */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Content contains ampersands ("Cairo & Giza", "Meha & Ibshek"),
   so anything interpolated into markup has to be escaped. */
const esc = s => String(s ?? "").replace(/[&<>"']/g, c =>
  ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));

const srcset = (base, widths) => widths.map(w => `${base}-${w}.webp ${w}w`).join(", ");

let LANG = "en";
const t = k => I18N[LANG][k];

/* ============================================================
   COMPANY LINKS
   A blank CONFIG value must never become a dead link. Each
   builder returns { href, text, tbc } so the renderer can show
   the affordance, point it somewhere that works, and mark it.
   ============================================================ */
/* An optional message is pre-filled into the chat. The tour views
   use it to name the route, so the first reply does not have to
   ask which tour this is — see js/tours.js. With no number
   configured this still returns the contact form rather than a
   dead wa.me link, exactly as before. */
const waHref  = text => {
  if(!CONFIG.whatsapp) return "#contact-form";
  const n = CONFIG.whatsapp.replace(/\D/g, "");
  return text ? `https://wa.me/${n}?text=${encodeURIComponent(text)}` : `https://wa.me/${n}`;
};
const waIsSet = () => Boolean(CONFIG.whatsapp);

function contactChannels(){
  return [
    { key:"email", href:`mailto:${CONFIG.email}`, text:CONFIG.email,
      label:t("contact.label.email"), aria:t("contact.direct.email"), tbc:false, ext:false },
    { key:"phone", href:CONFIG.phone ? `tel:${CONFIG.phone.replace(/[^\d+]/g, "")}` : null,
      text:CONFIG.phone || t("contact.label.phone"),
      label:t("contact.label.phone"), aria:t("contact.direct.phone"), tbc:!CONFIG.phone, ext:false },
    { key:"whatsapp", href:waHref(), text:t("s9.cta2"),
      label:t("contact.label.whatsapp"), aria:t("contact.direct.whatsapp"), tbc:!waIsSet(), ext:waIsSet() },
    /* Instagram sits with the direct channels rather than only in
       the footer, because after WhatsApp it is the thing people
       check to decide whether a travel company is real. It obeys
       the same rule as the phone number: no handle in CONFIG, no
       row — a link to a profile that does not exist is worse than
       no link at all. */
    { key:"instagram", href:CONFIG.instagram || null, text:t("contact.instagram.v"),
      label:t("contact.label.instagram"), aria:t("contact.direct.instagram"),
      tbc:!CONFIG.instagram, ext:Boolean(CONFIG.instagram), icon:"i-instagram" }
  ];
}

/* ============================================================
   RENDER
   ============================================================ */
/* A missing value is a gap in the launch checklist, not a claim to
   put in front of a customer. With CONFIG.showGaps off, an unfilled
   field is omitted entirely — "Licence & registration TBC" reads as
   an unlicensed company, which is the opposite of what the line is
   there to do. Turn showGaps on while building to see the gaps. */
const gapBadge = () => CONFIG.showGaps ? `<span class="tbc">${esc(t("tbc"))}</span>` : "";

/* ============================================================
   THE TOUR CATALOGUE
   The cards and the detail view they open are one component and
   live in js/tours.js, which loads after this file. setLang runs
   once before that happens, so the call is guarded; tours.js
   renders itself on boot and answers every later language change
   through this hook.
   ============================================================ */
function renderTours(){
  if(window.YE_TOURS) window.YE_TOURS.render();
}

function renderDestinations(){
  $("#strip").innerHTML = DESTINATIONS.filter(d => d.enabled).map(d => `
    <figure class="dcard">
      <div class="dcard-media">
        <img src="${d.base}-${d.widths.at(-1)}.webp" srcset="${srcset(d.base, d.widths)}"
             sizes="(min-width:900px) 21rem, 76vw" alt="${esc(d.alt)}"
             loading="lazy" decoding="async" width="900" height="1247">
      </div>
      <figcaption>
        <span class="dcard-name">${esc(d.name)}</span>
        <span class="dcard-sub">${esc(d.sub)}</span>
      </figcaption>
    </figure>`).join("");
}

function renderSteps(){
  $("#steps").innerHTML = t("steps").map((s, i) => `
    <li class="step rv">
      <span class="step-num" aria-hidden="true">${i + 1}</span>
      <h3>${esc(s.h)}</h3>
      <p>${esc(s.p)}</p>
    </li>`).join("");
}

function renderTestimonials(){
  const card = x => `
    <blockquote class="tm">
      <span class="tm-stars" aria-hidden="true">★★★★★</span>
      <span class="sr-only">Rated 5 out of 5.</span>
      <p class="tm-q">${esc(x.q)}</p>
      <footer class="tm-who">${esc(x.who)}</footer>
    </blockquote>`;
  const rows = [TESTIMONIALS.slice(0, 3), TESTIMONIALS.slice(3, 6), TESTIMONIALS.slice(6, 9)];
  $("#mq-rows").innerHTML = rows.map((row, i) => {
    // Tripled then doubled: the track has to be twice its visible
    // width for the -50% keyframe to loop without a jump.
    const set = row.concat(row, row).map(card).join("");
    return `<div class="mq-row"><div class="mq ${i % 2 ? "mq-r" : "mq-l"}"><div class="mq-track">${set}${set}</div></div></div>`;
  }).join("");
  $("#demo-flag").hidden = !CONFIG.testimonialsAreDemo;
}

/* ============================================================
   SAMPLE PROGRAMME
   Reads ITINERARY (js/data.js), which is pinned by tourId to a real
   entry in TOURS — so the day count and the route name come from
   the tour rather than being repeated, and the two cannot drift
   apart when one is edited.
   ============================================================ */
function renderItinerary(){
  const host = $("#itin");
  if(!host || typeof ITINERARY === "undefined") return;
  const c = ITINERARY.t[LANG] || ITINERARY.t.en;

  host.innerHTML = c.days.map(d => `
    <li class="itin-day rv">
      <div class="itin-when">
        <span class="itin-d">${esc(d.d)}</span>
        <span class="itin-place">${esc(d.place)}</span>
      </div>
      <div class="itin-body">
        <h3 class="itin-h">${esc(d.h)}</h3>
        <p class="itin-p">${esc(d.p)}</p>
      </div>
    </li>`).join("");

  $("#itin-note").textContent = c.note;

  // Both links under the programme follow ITINERARY.tourId: the
  // enquiry names the route so the contact form arrives pre-filled,
  // and the quiet link opens that tour's full day-by-day. Repoint
  // tourId and the pair moves with it.
  const tour = typeof TOURS !== "undefined" && TOURS.find(x => x.id === ITINERARY.tourId);
  if(tour){
    const name = (tour.t[LANG] || tour.t.en).n;
    $("#itin-cta")?.setAttribute("data-journey", name);
    $("#itin-full")?.setAttribute("href", `#tour/${tour.id}`);
  }
  // No matching tour means no tour to open — better an absent link
  // than one that opens nothing.
  const full = $("#itin-full");
  if(full) full.hidden = !tour;
}

/* ============================================================
   OPERATOR FACTS
   Only ever renders values CONFIG actually has. An empty licence
   or address prints nothing rather than a placeholder — see
   gapBadge above for why.
   ============================================================ */
function renderCredentials(){
  const host = $("#creds");
  if(!host) return;
  const rows = [];
  if(CONFIG.legalName) rows.push([t("foot.reg"),    CONFIG.legalName]);
  if(CONFIG.licence)   rows.push([t("trust.licence"), CONFIG.licence]);
  if(CONFIG.address)   rows.push([t("foot.office"),  CONFIG.address]);
  host.innerHTML = rows.map(([k, v]) =>
    `<div class="cred"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("");
  host.hidden = rows.length === 0;
}

/* ============================================================
   SECTION NUMBERS
   The numbers are assigned here, over the sections that are
   actually in the page, rather than baked into the translated
   eyebrow strings. Hiding a section (reviews, while they are demo
   content) therefore renumbers the rest instead of leaving a hole
   in the sequence, and adding one never means editing three
   language files.
   ============================================================ */
function numberSections(){
  $$("[data-secnum]")
    .filter(el => !el.closest("section")?.hidden)
    .forEach((el, i) => { el.dataset.n = String(i + 1).padStart(2, "0"); });
}

function renderFaq(){
  $("#faq-list").innerHTML = t("faq").map((f, i) => `
    <div class="faq-item">
      <h3>
        <button class="faq-q" type="button" aria-expanded="false" aria-controls="faq-a-${i}">
          <span>${esc(f.q)}${f.tbc ? gapBadge() : ""}</span>
          <i class="faq-sign" aria-hidden="true"></i>
        </button>
      </h3>
      <div class="faq-a" id="faq-a-${i}" role="region">
        <div class="faq-a-in"><p>${esc(f.a)}</p></div>
      </div>
    </div>`).join("");
  $$(".faq-a").forEach(a => { a.inert = true; });
}

function renderContact(){
  $("#direct-list").innerHTML = contactChannels().filter(c => !c.tbc || CONFIG.showGaps).map(c => {
    const badge = c.tbc ? gapBadge() : "";
    const icon = c.icon
      ? `<span class="contact-i" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><use href="#${esc(c.icon)}"/></svg></span>`
      : "";
    const body = `<span class="k">${esc(c.label)}</span><span class="v">${icon}${esc(c.text)}${badge}</span>`;
    if(!c.href) return `<li><div class="contact-row">${body}</div></li>`;
    const ext = c.ext ? ` target="_blank" rel="noopener noreferrer"` : "";
    return `<li><a class="contact-row" href="${c.href}" aria-label="${esc(c.aria)}"${ext}>${body}</a></li>`;
  }).join("");
}

function renderFooter(){
  const tbc = gapBadge();
  const rows = [`<li><a href="mailto:${CONFIG.email}">${esc(CONFIG.email)}</a></li>`];
  if(CONFIG.phone)          rows.push(`<li><a href="tel:${CONFIG.phone.replace(/[^\d+]/g, "")}">${esc(CONFIG.phone)}</a></li>`);
  else if(CONFIG.showGaps)  rows.push(`<li>${esc(t("contact.label.phone"))}${tbc}</li>`);
  if(CONFIG.address)        rows.push(`<li>${esc(CONFIG.address)}</li>`);
  else if(CONFIG.showGaps)  rows.push(`<li>${esc(t("foot.office"))}${tbc}</li>`);
  $("#foot-contact").innerHTML = rows.join("");

  const social = [["Instagram", CONFIG.instagram], ["YouTube", CONFIG.youtube], ["TripAdvisor", CONFIG.tripadvisor]]
    .filter(([, url]) => url)
    .map(([name, url]) => `<li><a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${name}</a></li>`);
  $("#foot-social").innerHTML = social.length
    ? social.join("")
    : CONFIG.showGaps
      ? ["Instagram", "YouTube", "TripAdvisor"].map(n => `<li>${n}${tbc}</li>`).join("")
      : "";
  // A "Follow" heading over nothing is worse than no column.
  $("#foot-social").closest(".foot-col").hidden = !social.length && !CONFIG.showGaps;

  const reg = [CONFIG.legalName, CONFIG.licence].filter(Boolean).join(" · ");
  $("#foot-reg").innerHTML = reg ? esc(reg) : (CONFIG.showGaps ? `${esc(t("foot.reg"))}${tbc}` : "");
}

/* ============================================================
   HERO — still sequence
   ============================================================ */
const SLIDE_MS = 7400;
let cur = 0, timer = null, t0 = 0, raf = null;
let userPaused = RM;      // reduced motion starts paused
let videoTookOver = false;

function buildHero(){
  $("#stage").innerHTML = HERO.map((s, i) => `
    <div class="slide" data-i="${i}">
      <img src="${s.base}-${s.widths.at(-1)}.webp" srcset="${srcset(s.base, s.widths)}" sizes="100vw"
           alt="${esc(s.alt)}" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}
           decoding="async" width="2000" height="1260">
    </div>`).join("");
  show(0, true);
  syncHeroToggle();
}

function show(i, silent){
  cur = (i + HERO.length) % HERO.length;
  $$(".slide").forEach(s => s.classList.toggle("is-live", +s.dataset.i === cur));
  const s = HERO[cur];
  $("#a-idx").textContent  = `${String(cur + 1).padStart(2, "0")} / ${String(HERO.length).padStart(2, "0")}`;
  $("#a-name").textContent = s.name;
  $("#a-geo").textContent  = s.geo;
  $("#a-old").textContent  = s.old;
  if(!silent) $("#live").textContent = `${s.name}, ${cur + 1} / ${HERO.length}`;

  const next = HERO[(cur + 1) % HERO.length];          // warm the next frame
  new Image().src = `${next.base}-${next.widths.at(-1)}.webp`;
  restart();
}

function restart(){
  clearTimeout(timer); cancelAnimationFrame(raf);
  const bar = $("#prog");
  if(RM || userPaused || videoTookOver){ if(bar) bar.style.width = "0%"; return; }
  t0 = performance.now();
  timer = setTimeout(() => show(cur + 1), SLIDE_MS);
  const tick = now => {
    const p = Math.min((now - t0) / SLIDE_MS, 1);
    if(bar) bar.style.width = (p * 100).toFixed(2) + "%";
    if(p < 1) raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
}

const heroVideo = () => $("#hero-video-slot video");

function syncHeroToggle(){
  const b = $("#hero-toggle");
  if(!b) return;
  const film = videoTookOver;
  b.classList.toggle("is-paused", userPaused);
  b.setAttribute("aria-pressed", String(userPaused));
  b.setAttribute("aria-label", t(
    userPaused ? (film ? "hero.playFilm"  : "hero.play")
               : (film ? "hero.pauseFilm" : "hero.pause")));
}

/* One control, two things to stop. Whichever is on screen is what
   the button governs — a film that cannot be stopped fails WCAG
   2.2.2 just as surely as a slideshow that cannot. */
function toggleHero(){
  userPaused = !userPaused;
  syncHeroToggle();

  if(videoTookOver){
    const v = heroVideo();
    if(v){ userPaused ? v.pause() : v.play().catch(() => {}); }
    return;
  }
  if(userPaused){ clearTimeout(timer); cancelAnimationFrame(raf); const b = $("#prog"); if(b) b.style.width = "0%"; }
  else restart();
}

/* ============================================================
   HERO — optional background film
   The stills stay underneath as the poster, so a slow or failed
   video never leaves an empty hero. See HERO_VIDEO in data.js.
   ============================================================ */
function initHeroVideo(){
  if(!HERO_VIDEO.enabled || RM) return;

  /* A landscape film centre-cropped into a 9:16 viewport loses its
     composition and costs a phone the data anyway, so narrow
     screens get their own cut or they keep the stills. */
  const narrow  = innerWidth < HERO_VIDEO.minWidth;
  const sources = narrow ? (HERO_VIDEO.mobileSources || []) : HERO_VIDEO.sources;
  if(!sources.length) return;

  const net = navigator.connection;
  if(net && (net.saveData || /(^|\W)[23]g/.test(net.effectiveType || ""))) return;

  const v = document.createElement("video");
  v.muted = true; v.defaultMuted = true; v.loop = true; v.autoplay = true;
  v.playsInline = true; v.setAttribute("playsinline", "");
  v.preload = "auto"; v.tabIndex = -1;
  sources.forEach(s => {
    const el = document.createElement("source");
    el.src = s.src; el.type = s.type;
    v.append(el);
  });

  const drop = () => { v.remove(); videoTookOver = false; restart(); };
  v.addEventListener("error", drop, { once:true });
  v.addEventListener("playing", () => {
    v.classList.add("is-live");
    videoTookOver = true;
    clearTimeout(timer); cancelAnimationFrame(raf);
    const bar = $("#prog"); if(bar) bar.style.width = "0%";
    applyVideoLabel();
    syncHeroToggle();                                        // the control now governs the film
  }, { once:true });

  $("#hero-video-slot").append(v);
  const p = v.play();
  if(p && p.catch) p.catch(drop);                            // autoplay blocked
}

/* The field record describes the still sequence, so with a film
   running it either carries the film's own caption (HERO_VIDEO.label)
   or shows nothing — it must never keep labelling a frame that is no
   longer on screen. The controls stay either way: the previous/next
   buttons go, because there is nothing to step through, but pause
   remains, because the film is auto-playing motion. */
function applyVideoLabel(){
  const rec = $(".record");
  if(!rec) return;
  const L = HERO_VIDEO.label;
  $("#a-idx").textContent  = L ? (L.idx  || "") : "";
  $("#a-name").textContent = L ? (L.name || "") : "";
  $("#a-geo").textContent  = L ? (L.geo  || "") : "";
  $("#a-old").textContent  = L ? (L.old  || "") : "";
  $("#prev").hidden = true;
  $("#next").hidden = true;
}

/* ============================================================
   DISCLOSURES — journeys and FAQ
   Same contract: aria-expanded on the trigger, inert on the
   panel while closed, so it leaves the tab order too.
   ============================================================ */
function toggleDisclosure(btn, panel, host, openClass, labelEl, labels){
  const open = btn.getAttribute("aria-expanded") !== "true";
  btn.setAttribute("aria-expanded", String(open));
  host.classList.toggle(openClass, open);
  panel.inert = !open;
  if(labelEl && labels) labelEl.textContent = open ? labels[1] : labels[0];
}

function initDisclosures(){
  document.addEventListener("click", e => {
    /* One handler, two disclosures: the FAQ answers on the page and
       the day rows inside a tour detail view. They keep the same
       contract — aria-expanded on the button, inert on the panel —
       so the itinerary needed no second mechanism. */
    const dq = e.target.closest(".faq-q, .tday-q");
    if(dq){
      toggleDisclosure(dq, $(`#${dq.getAttribute("aria-controls")}`),
                       dq.closest(".faq-item, .tday"), "is-open");
      return;
    }
    /* Any link that names a route carries it into the form — the
       tour cards and the sample-programme CTA both set data-journey. */
    const ask = e.target.closest("[data-journey]");
    if(ask) prefillJourney(ask.dataset.journey);
  });
}

function prefillJourney(name){
  // Coming from a journey card while the confirmation is still on
  // screen means starting a second enquiry — put the fields back
  // first, or the route note appears above a hidden form.
  if($("#cform-sent") && !$("#cform-sent").hidden) resetForm();
  const note = $("#cform-about");
  if(note && name){
    note.textContent = `${t("contact.form.about")} ${name}`;
    note.hidden = false;
  }
  const msg = $("#cf-message");
  if(msg && name && !msg.value.trim()) msg.value = `${t("contact.form.about")} ${name}\n\n`;
  setTimeout(() => $("#cf-name")?.focus({ preventScroll:true }), 500);
}

/* ============================================================
   TESTIMONIAL MARQUEE
   ============================================================ */
let mqPaused = false;
function syncMqToggle(){
  const b = $("#mq-toggle");
  if(!b) return;
  $(".mq-toggle-label", b).textContent = t(mqPaused ? "mq.play" : "mq.pause");
  b.setAttribute("aria-pressed", String(mqPaused));
  b.classList.toggle("is-paused", mqPaused);
}
function initMarquee(){
  $("#mq-toggle")?.addEventListener("click", () => {
    mqPaused = !mqPaused;
    document.body.classList.toggle("mq-paused", mqPaused);
    syncMqToggle();
  });
}

/* ============================================================
   i18n + URL sync
   ============================================================ */
const urlLang = () => {
  const p = new URLSearchParams(location.search).get("lang");
  return p && I18N[p] ? p : null;
};
const initialLang = () => {
  const nav = (navigator.language || "en").slice(0, 2).toLowerCase();
  return urlLang() || (I18N[nav] ? nav : "en");
};

function setMeta(sel, attr, value){
  const el = document.querySelector(sel);
  if(el) el.setAttribute(attr, value);
}

function setLang(l){
  LANG = I18N[l] ? l : "en";
  document.documentElement.lang = LANG;
  document.title = t("meta.title");
  setMeta('meta[name="description"]',      "content", t("meta.description"));
  setMeta('meta[property="og:title"]',     "content", t("meta.title"));
  setMeta('meta[property="og:description"]', "content", t("meta.description"));
  setMeta('meta[name="twitter:title"]',    "content", t("meta.title"));
  setMeta('meta[name="twitter:description"]', "content", t("meta.description"));
  setMeta('meta[property="og:locale"]',    "content", { en:"en_US", tr:"tr_TR", de:"de_DE" }[LANG]);

  $$("[data-i18n]").forEach(el => {
    const v = I18N[LANG][el.dataset.i18n];
    if(v == null) return;
    if(el.hasAttribute("data-i18n-html")) el.innerHTML = v; else el.textContent = v;
  });
  $$("[data-i18n-aria]").forEach(el => {
    const v = I18N[LANG][el.dataset.i18nAria];
    if(v != null) el.setAttribute("aria-label", v);
  });
  $$(".lang button").forEach(b => b.setAttribute("aria-current", String(b.dataset.lang === LANG)));

  renderTours();
  renderSteps();
  renderItinerary();
  renderCredentials();
  renderFaq();
  renderContact();
  renderFooter();
  syncHeroToggle();
  syncMqToggle();
  observeReveals();

  const url = new URL(location.href);
  url.searchParams.set("lang", LANG);
  history.replaceState(null, "", url);
}

/* ============================================================
   SCROLL / NAV
   ============================================================ */
function observeReveals(){
  // $$ , not $ : this reveals every deferred element at once when
  // there is nothing to defer to. With $ (querySelector) it threw a
  // TypeError, which under reduced motion aborted the rest of
  // setLang — and on a browser without IntersectionObserver left
  // every .rv element stuck at opacity 0.
  if(RM || !("IntersectionObserver" in window)){ $$(".rv").forEach(e => e.classList.add("in")); return; }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if(!e.isIntersecting) return;
      e.target.classList.add("in");
      obs.unobserve(e.target);
    });
  }, { threshold:.1, rootMargin:"0px 0px -6% 0px" });
  $$(".rv:not(.in)").forEach(e => io.observe(e));
}

function initGround(){
  const nav = $("#nav");
  // A thin band just under the header decides which ground the
  // navigation is sitting on.
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(!e.isIntersecting) return;
      const g = e.target.dataset.ground || "light";
      document.documentElement.dataset.ground = g;
      nav.classList.toggle("on-paper", g === "light");
    });
  }, { rootMargin:"-70px 0px -88% 0px" });
  $$("main [data-ground], footer[data-ground]").forEach(s => io.observe(s));

  const hero = $(".hero");
  new IntersectionObserver(([e]) => {
    nav.classList.toggle("is-stuck", !e.isIntersecting);
    document.body.classList.toggle("past-hero", !e.isIntersecting);

    // A background film decoding behind six screens of text is
    // battery and bandwidth spent on nothing.
    const v = heroVideo();
    if(v && !userPaused) e.isIntersecting ? v.play().catch(() => {}) : v.pause();
  }, { rootMargin:"-70px 0px 0px 0px" }).observe(hero);
}

/* ============================================================
   MOBILE MENU
   Full-screen overlay: it locks the page, traps Tab, and hands
   focus back to the button it came from.
   ============================================================ */
function initMenu(){
  const btn = $("#burger"), menu = $("#mmenu");
  let open = false;

  const focusables = () => $$("a[href], button:not([disabled])", menu);

  const setOpen = next => {
    if(next === open) return;
    open = next;
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", t(open ? "nav.close" : "nav.menu"));
    document.body.classList.toggle("menu-open", open);
    document.body.style.overflow = open ? "hidden" : "";
    if(open){
      menu.hidden = false;
      requestAnimationFrame(() => menu.classList.add("is-open"));
      focusables()[0]?.focus();
    } else {
      menu.classList.remove("is-open");
      const done = () => { menu.hidden = true; };
      RM ? done() : setTimeout(done, 400);
      btn.focus();
    }
  };

  btn.addEventListener("click", () => setOpen(!open));
  $$("a", menu).forEach(a => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", e => {
    if(!open) return;
    if(e.key === "Escape"){ setOpen(false); return; }
    if(e.key !== "Tab") return;
    const f = focusables();
    if(!f.length) return;
    const first = f[0], last = f.at(-1);
    if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
  });
  // Rotating past the breakpoint should not leave the overlay stranded
  matchMedia("(min-width:1101px)").addEventListener("change", e => { if(e.matches) setOpen(false); });
}

/* ============================================================
   DESTINATION STRIP — drag to scroll + progress bar
   ============================================================ */
function initStrip(){
  const el = $("#strip"), bar = $("#strip-bar-i");
  let down = false, startX = 0, startLeft = 0, moved = 0;

  const sync = () => {
    const max = el.scrollWidth - el.clientWidth;
    const w = Math.max(12, (el.clientWidth / el.scrollWidth) * 100);
    bar.style.width = w + "%";
    bar.style.transform = `translateX(${(max > 0 ? el.scrollLeft / max : 0) * (100 - w) / w * 100}%)`;
  };

  el.addEventListener("scroll", sync, { passive:true });
  addEventListener("resize", sync, { passive:true });

  el.addEventListener("pointerdown", e => {
    if(e.pointerType !== "mouse") return;
    down = true; moved = 0; startX = e.clientX; startLeft = el.scrollLeft;
    el.classList.add("is-drag");
  });
  addEventListener("pointermove", e => {
    if(!down) return;
    const dx = e.clientX - startX;
    moved = Math.abs(dx);
    el.scrollLeft = startLeft - dx;
  });
  addEventListener("pointerup", () => { down = false; el.classList.remove("is-drag"); });
  sync();
}

/* ============================================================
   CONTACT FORM
   A static site has no backend, so this composes a pre-filled
   message and hands it to the visitor's mail client — which
   genuinely works today. Swap for a POST endpoint at launch.
   ============================================================ */
/* Handing off to mailto: is silent by design — the browser fires no
   event for "the mail client opened", and on a desktop with none
   configured absolutely nothing happens. Without a confirmation the
   visitor is left looking at a filled-in form wondering whether it
   sent, which is where enquiries are lost. So the form always states
   what happened and always repeats the address, which is the one
   route that still works when mailto: does not. */
function showSent(){
  const form = $("#contact-form");
  const panel = $("#cform-sent");
  if(!form || !panel) return;
  $$(".cform-row, .cform-submit, .cform-note, .cform-about, .field", form).forEach(el => { el.hidden = true; });
  const mail = $("#cform-sent-mail");
  if(mail){ mail.textContent = CONFIG.email; mail.href = `mailto:${CONFIG.email}`; }
  panel.hidden = false;
  // role="status" announces it; focus moves so a keyboard or screen
  // reader user lands on the outcome rather than on vanished fields.
  panel.focus({ preventScroll:true });
}

function resetForm(){
  const form = $("#contact-form");
  if(!form) return;
  $("#cform-sent").hidden = true;
  $$(".cform-row, .cform-submit, .cform-note, .field", form).forEach(el => { el.hidden = false; });
  form.reset();
  $("#cform-about").hidden = true;
  $("#cf-name")?.focus({ preventScroll:true });
}

function initForm(){
  const form = $("#contact-form");
  if(!form) return;
  form.addEventListener("submit", e => {
    e.preventDefault();
    if(!form.reportValidity()) return;
    const fd = new FormData(form);
    const get = k => (fd.get(k) || "").toString().trim();
    const subject = `Trip enquiry — ${get("name") || "yallaegypt.com"}`;
    const body = [
      `Name: ${get("name")}`,
      `Email: ${get("email")}`,
      `Approx. dates: ${get("dates")}`,
      `Travellers: ${get("people")}`,
      "", get("message")
    ].join("\n");
    location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    showSent();
  });
  $("#cform-again")?.addEventListener("click", resetForm);
}

function initWhatsApp(){
  const fab = $("#wa");
  if(!fab) return;
  fab.href = waHref();
  if(waIsSet()){ fab.target = "_blank"; fab.rel = "noopener noreferrer"; }
}

/* ============================================================
   BOOT
   ============================================================ */
buildHero();
renderDestinations();

/* Demo reviews are not shown at all. Invented praise behind a
   "demo content" label tells a visitor the company has no
   customers — worse than an absent section. Drop real quotes into
   TESTIMONIALS and set CONFIG.testimonialsAreDemo = false. */
const reviewsSection = $("#reviews");
if(CONFIG.testimonialsAreDemo){
  if(reviewsSection) reviewsSection.hidden = true;
} else {
  renderTestimonials();
  $("#demo-flag")?.remove();
}

setLang(initialLang());
numberSections();
initHeroVideo();
initGround();
initMenu();
initStrip();
if(!CONFIG.testimonialsAreDemo) initMarquee();
initDisclosures();
initForm();
initWhatsApp();
$("#yr").textContent = new Date().getFullYear();

$("#next").addEventListener("click", () => show(cur + 1));
$("#prev").addEventListener("click", () => show(cur - 1));
$("#hero-toggle").addEventListener("click", toggleHero);
$$(".lang button").forEach(b => b.addEventListener("click", () => setLang(b.dataset.lang)));

document.addEventListener("visibilitychange", () => {
  if(document.hidden){ clearTimeout(timer); cancelAnimationFrame(raf); heroVideo()?.pause(); }
  else if(videoTookOver){ if(!userPaused) heroVideo()?.play().catch(() => {}); }
  else restart();
});
