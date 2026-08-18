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
const waHref  = () => CONFIG.whatsapp ? `https://wa.me/${CONFIG.whatsapp.replace(/\D/g, "")}` : "#contact-form";
const waIsSet = () => Boolean(CONFIG.whatsapp);

function contactChannels(){
  return [
    { key:"email", href:`mailto:${CONFIG.email}`, text:CONFIG.email,
      label:t("contact.label.email"), aria:t("contact.direct.email"), tbc:false, ext:false },
    { key:"phone", href:CONFIG.phone ? `tel:${CONFIG.phone.replace(/[^\d+]/g, "")}` : null,
      text:CONFIG.phone || t("contact.label.phone"),
      label:t("contact.label.phone"), aria:t("contact.direct.phone"), tbc:!CONFIG.phone, ext:false },
    { key:"whatsapp", href:waHref(), text:t("s9.cta2"),
      label:t("contact.label.whatsapp"), aria:t("contact.direct.whatsapp"), tbc:!waIsSet(), ext:waIsSet() }
  ];
}

/* ============================================================
   RENDER
   ============================================================ */
function renderBand(){
  const items = t("trust").map(x => `<li>${esc(x)}</li>`);
  items.push(CONFIG.licence
    ? `<li>${esc(t("trust.licence"))} ${esc(CONFIG.licence)}</li>`
    : `<li>${esc(t("trust.licence"))}<span class="tbc">${esc(t("tbc"))}</span></li>`);
  $("#band-list").innerHTML = items.join("");
}

function renderJourneys(){
  $("#journeys-list").innerHTML = TOURS.map((tour, i) => {
    const c = tour.t[LANG] || tour.t.en;
    const id = `jd-${tour.id}`;
    const portrait = i % 2 === 1;
    const w = portrait ? 825 : 1100, h = portrait ? 1100 : 825;
    const price = CONFIG.showPrices ? `<b>${esc(tour.price)}</b>` : esc(t("s2.price"));
    return `
    <article class="journey rv">
      <div class="j-media">
        <img src="${tour.img}" alt="${esc(c.n)}" loading="lazy" decoding="async" width="${w}" height="${h}">
      </div>
      <div class="j-body">
        <p class="j-index">${String(i + 1).padStart(2, "0")}</p>
        <h3 class="j-title">${esc(c.n)}</h3>
        <p class="j-desc">${esc(c.d)}</p>
        <ul class="j-meta">
          <li><b>${tour.days}</b> ${esc(t("s2.days"))}</li>
          <li>${esc(t("s2.private"))}</li>
          <li>${price}</li>
        </ul>

        <button class="j-toggle" type="button" aria-expanded="false" aria-controls="${id}"
                data-journey="${esc(c.n)}">
          <i aria-hidden="true"></i><span class="j-toggle-label">${esc(t("s2.more"))}</span>
        </button>

        <div class="j-detail" id="${id}" role="region" aria-label="${esc(c.n)}">
          <div class="j-detail-in">
            <div class="j-detail-pad">
              <dl class="j-dl">
                <dt>${esc(t("s2.route"))}</dt>
                <dd><ol class="j-stops">${tour.stops.map(s => `<li>${esc(s)}</li>`).join("")}</ol></dd>
                <dt>${esc(t("s2.best"))}</dt><dd>${esc(c.best)}</dd>
                <dt>${esc(t("s2.pace"))}</dt><dd>${esc(c.pace)}</dd>
              </dl>
              <div class="j-foot">
                <a class="btn btn--line j-ask" href="#contact-form" data-journey="${esc(c.n)}">${esc(t("s2.ask"))}</a>
                <p class="j-note">${esc(t("s2.written"))}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>`;
  }).join("");

  $$(".j-detail").forEach(d => { d.inert = true; });
}

function renderDestinations(){
  $("#strip").innerHTML = DESTINATIONS.filter(d => d.enabled).map(d => `
    <figure class="dcard">
      <div class="dcard-media">
        <img src="${d.base}-${d.widths.at(-1)}.webp" srcset="${srcset(d.base, d.widths)}"
             sizes="(min-width:900px) 21rem, 76vw" alt="${esc(d.alt)}"
             loading="lazy" decoding="async" width="900" height="1230">
      </div>
      <figcaption>
        <span class="dcard-name">${esc(d.name)}</span>
        <span class="dcard-sub">${esc(d.sub)}</span>
      </figcaption>
    </figure>`).join("");
}

function renderPromises(){
  $("#promise-grid").innerHTML = t("ap").map((a, i) => `
    <div class="promise rv">
      <span class="promise-num">0${i + 1}</span>
      <h3>${esc(a.h)}</h3>
      <p>${esc(a.p)}</p>
    </div>`).join("");
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

function renderTeam(){
  const slotIcon = `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true">
      <circle cx="16" cy="11" r="6"/><path d="M4 30c0-6.6 5.4-11 12-11s12 4.4 12 11"/></svg>`;
  $("#team").innerHTML = TEAM.map(m => {
    const media = m.photo
      ? `<img src="${esc(m.photo)}" alt="${esc(m.name)}" loading="lazy" decoding="async" width="640" height="800">`
      : `<div class="member-slot">${slotIcon}<span>${esc(t("s7.slot"))}</span><span class="tbc">${esc(t("tbc"))}</span></div>`;
    return `
    <figure class="member rv">
      <div class="member-media">${media}</div>
      ${m.name ? `<figcaption class="member-name">${esc(m.name)}</figcaption>` : ""}
      ${m.role ? `<p class="member-role">${esc(m.role)}</p>` : ""}
      ${m.line ? `<p class="member-line">${esc(m.line)}</p>` : ""}
    </figure>`;
  }).join("");
}

function renderFaq(){
  $("#faq-list").innerHTML = t("faq").map((f, i) => `
    <div class="faq-item">
      <h3>
        <button class="faq-q" type="button" aria-expanded="false" aria-controls="faq-a-${i}">
          <span>${esc(f.q)}${f.tbc ? `<span class="tbc">${esc(t("tbc"))}</span>` : ""}</span>
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
  $("#direct-list").innerHTML = contactChannels().map(c => {
    const badge = c.tbc ? `<span class="tbc">${esc(t("tbc"))}</span>` : "";
    const body = `<span class="k">${esc(c.label)}</span><span class="v">${esc(c.text)}${badge}</span>`;
    if(!c.href) return `<li><div class="contact-row">${body}</div></li>`;
    const ext = c.ext ? ` target="_blank" rel="noopener noreferrer"` : "";
    return `<li><a class="contact-row" href="${c.href}" aria-label="${esc(c.aria)}"${ext}>${body}</a></li>`;
  }).join("");
}

function renderFooter(){
  const tbc = `<span class="tbc">${esc(t("tbc"))}</span>`;
  const rows = [`<li><a href="mailto:${CONFIG.email}">${esc(CONFIG.email)}</a></li>`];
  rows.push(CONFIG.phone
    ? `<li><a href="tel:${CONFIG.phone.replace(/[^\d+]/g, "")}">${esc(CONFIG.phone)}</a></li>`
    : `<li>${esc(t("contact.label.phone"))}${tbc}</li>`);
  rows.push(CONFIG.address
    ? `<li>${esc(CONFIG.address)}</li>`
    : `<li>${esc(t("foot.office"))}${tbc}</li>`);
  $("#foot-contact").innerHTML = rows.join("");

  const social = [["Instagram", CONFIG.instagram], ["YouTube", CONFIG.youtube], ["TripAdvisor", CONFIG.tripadvisor]]
    .filter(([, url]) => url)
    .map(([name, url]) => `<li><a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${name}</a></li>`);
  $("#foot-social").innerHTML = social.length
    ? social.join("")
    : ["Instagram", "YouTube", "TripAdvisor"].map(n => `<li>${n}${tbc}</li>`).join("");

  const reg = [CONFIG.legalName, CONFIG.licence].filter(Boolean).join(" · ");
  $("#foot-reg").innerHTML = reg ? esc(reg) : `${esc(t("foot.reg"))}${tbc}`;
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

function syncHeroToggle(){
  const b = $("#hero-toggle");
  if(!b) return;
  b.classList.toggle("is-paused", userPaused);
  b.setAttribute("aria-pressed", String(userPaused));
  b.setAttribute("aria-label", t(userPaused ? "hero.play" : "hero.pause"));
}

function toggleHero(){
  userPaused = !userPaused;
  syncHeroToggle();
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
  if(innerWidth < HERO_VIDEO.minWidth) return;              // data cost on phones
  const net = navigator.connection;
  if(net && (net.saveData || /(^|\W)[23]g/.test(net.effectiveType || ""))) return;

  const v = document.createElement("video");
  v.muted = true; v.defaultMuted = true; v.loop = true; v.autoplay = true;
  v.playsInline = true; v.setAttribute("playsinline", "");
  v.preload = "auto"; v.tabIndex = -1;
  HERO_VIDEO.sources.forEach(s => {
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
  }, { once:true });

  $("#hero-video-slot").append(v);
  const p = v.play();
  if(p && p.catch) p.catch(drop);                            // autoplay blocked
}

/* The field record belongs to the still sequence. With a film
   running it either carries the film's own caption or steps
   aside — it must never describe a frame that isn't on screen. */
function applyVideoLabel(){
  const rec = $(".record");
  if(!rec) return;
  const L = HERO_VIDEO.label;
  if(L){
    $("#a-idx").textContent  = L.idx  || "";
    $("#a-name").textContent = L.name || "";
    $("#a-geo").textContent  = L.geo  || "";
    $("#a-old").textContent  = L.old  || "";
    $(".record-r").hidden = true;
  } else {
    rec.hidden = true;
  }
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
    const jt = e.target.closest(".j-toggle");
    if(jt){
      const art = jt.closest(".journey");
      toggleDisclosure(jt, $(`#${jt.getAttribute("aria-controls")}`), art, "is-open",
                       $(".j-toggle-label", jt), [t("s2.more"), t("s2.less")]);
      return;
    }
    const fq = e.target.closest(".faq-q");
    if(fq){
      toggleDisclosure(fq, $(`#${fq.getAttribute("aria-controls")}`), fq.closest(".faq-item"), "is-open");
      return;
    }
    // "Ask about this journey" — carry the journey into the form
    const ask = e.target.closest(".j-ask");
    if(ask) prefillJourney(ask.dataset.journey);
  });
}

function prefillJourney(name){
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

  renderBand();
  renderJourneys();
  renderPromises();
  renderSteps();
  renderTeam();
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
  if(RM || !("IntersectionObserver" in window)){ $(".rv").forEach(e => e.classList.add("in")); return; }
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
  });
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
renderTestimonials();
setLang(initialLang());
initHeroVideo();
initGround();
initMenu();
initStrip();
initMarquee();
initDisclosures();
initForm();
initWhatsApp();
$("#yr").textContent = new Date().getFullYear();

$("#next").addEventListener("click", () => show(cur + 1));
$("#prev").addEventListener("click", () => show(cur - 1));
$("#hero-toggle").addEventListener("click", toggleHero);
$$(".lang button").forEach(b => b.addEventListener("click", () => setLang(b.dataset.lang)));

document.addEventListener("visibilitychange", () => {
  if(document.hidden){ clearTimeout(timer); cancelAnimationFrame(raf); }
  else restart();
});
