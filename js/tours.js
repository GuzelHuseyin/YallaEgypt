/* ============================================================
   THE TOUR CATALOGUE AND THE TOUR DETAIL VIEW
   ------------------------------------------------------------
   Loads after js/main.js and uses its helpers ($, esc, srcset,
   t, LANG, waHref) and its i18n state. Every string a visitor
   reads comes from TOURS (js/data.js) or I18N (js/i18n.js);
   nothing is written here.

   ONE COMPONENT, TWO SURFACES
     the card       #journeys-list, on the home page
     the detail     #tour-panel, a full-screen view over it

   Both are rendered from the same TOURS entry, so a tour cannot
   say one thing on the card and another inside.

   THE ROUTE IS THE HASH
     #tour/<id> opens a tour. That makes a tour linkable,
     shareable and answerable by the back button while the site
     stays what it is: one page, one set of meta tags, one
     language switch. hashchange is the only router event, which
     covers link clicks, back, forward and a pasted URL alike.

   WHY A PANEL AND NOT A PAGE
     Five separate HTML files would each need their own head,
     navigation, footer and language switch, and would take the
     visitor away from the page the whole site is built as. The
     panel keeps the single-page architecture and still gives a
     tour a URL. What it cannot do is serve its own crawlable
     document — so the five tours, their descriptions and their
     day-by-day are also published as JSON-LD in index.html,
     which is where a search engine reads them.

   WHAT IT REUSES RATHER THAN REBUILDS
     · .sec grounds, .wrap, .eyebrow, .lead, .split — the page's
       own section furniture
     · .btn / .btn--gold / .btn--line — no new button
     · .cred — the operator-facts label/value pair, reused for
       the hero's duration-and-price row and for the whole of the
       tour information block
     · .faq disclosure contract and .faq-sign — the day rows are
       driven by the same delegated handler in js/main.js
     · .rv scroll reveals, through observeReveals()
     · the floating WhatsApp button, retargeted at the open tour
   ============================================================ */
(() => {

  const PANEL  = $("#tour-panel");
  const DIALOG = $("#tour-dialog");
  if(!PANEL || !DIALOG || typeof TOURS === "undefined") return;

  /* Icon keys that exist in the sprite (index.html, TOUR ICONS).
     A highlight naming anything else renders as a label with no
     icon, which is the right failure: a missing picture, not a
     broken <use> drawing nothing at all. */
  const ICONS = new Set(["pyramids","temple","tomb","museum","city","nile","sun",
                         "balloon","desert","atv","bedouin","dive","snorkel","island","sea"]);

  const byId  = id => TOURS.find(x => x.id === id);
  const copy  = tour => tour.t[LANG] || tour.t.en;
  /* The hero images are the home page's own stills, so their alt
     text is already written and already checked — see HERO in
     js/data.js. Reusing it beats describing a photograph twice. */
  const heroAlt = tour => (typeof HERO !== "undefined"
    && HERO.find(h => h.base === tour.hero.base)?.alt) || "";

  let openId   = null;   // the tour on screen, or null
  let lastFocus = null;  // where to put focus back on close

  /* ==========================================================
     PRICE
     One field per tour decides this. While CONFIG.showPrices is
     off, or while a tour's price.from is still null, the line
     says "price on request" — never a placeholder number, and
     never nothing at all, because silence about price reads to a
     customer as evasion rather than as discretion.
     ========================================================== */
  function priceLine(tour){
    const p = tour.price || {};
    if(!CONFIG.showPrices || p.from == null) return esc(t("tour.priceAsk"));
    const per = t(p.per === "group" ? "tour.perGroup" : "tour.perPerson");
    return `${esc(t("tour.from"))} <b>${esc(p.currency || "")} ${esc(String(p.from))}</b> ${esc(per)}`;
  }

  /* ==========================================================
     ENQUIRY
     WhatsApp is the conversion, and the message carries the
     route name so the first reply does not have to ask which
     tour this is. Until CONFIG.whatsapp is filled in there is no
     WhatsApp link to give, so the affordance is not drawn —
     the same rule renderContact already follows for the phone
     number. The contact form takes over, with data-journey
     naming the route so it arrives pre-filled either way.
     ========================================================== */
  const waMessage = name => t("tour.waMsg").replace("{tour}", name);
  const waTourHref = name => (waIsSet() ? waHref(waMessage(name)) : null);

  function ctaRow(tour, primaryOnly){
    const name = copy(tour).n;
    const wa   = waTourHref(name);
    const ask  = `<a class="btn ${wa ? "btn--line" : "btn--gold"}" href="#contact-form"
                     data-journey="${esc(name)}" data-tour-exit>${esc(t("tour.cta"))}</a>`;
    if(!wa) return ask;
    const waBtn = `<a class="btn btn--gold" href="${esc(wa)}" target="_blank" rel="noopener noreferrer"
                      >${esc(t("tour.ctaWa"))}</a>`;
    return primaryOnly ? waBtn : waBtn + ask;
  }

  /* ==========================================================
     THE CARD
     Identical in kind to the card this replaces — hairline box,
     photograph, number, meta, title, description — with a
     highlight row, a price line, and a link that now goes where
     it says it goes. The old card sent "see the details" to the
     contact form, which the design audit flagged as a dark
     pattern; the details now exist, so it opens them.

     Still exactly one link per card in the accessibility tree:
     the title link is stretched over the whole card and the CTA
     underneath stays decorative.
     ========================================================== */
  function cardHTML(tour, i){
    const c  = copy(tour);
    const hl = (c.highlights || []).slice(0, 3)
      .map(h => `<li class="chip">${esc(h.h)}</li>`).join("");
    return `
    <article class="tcard rv${tour.featured ? " tcard--feature" : ""}">
      <div class="tcard-media">
        <img src="${esc(tour.img)}" alt="${esc(c.imgAlt || "")}" loading="lazy" decoding="async"
             width="${tour.iw}" height="${tour.ih}">
      </div>
      <div class="tcard-body">
        <p class="tcard-num">${String(i + 1).padStart(2, "0")}</p>
        <p class="tcard-meta">${esc(c.meta)}</p>
        <h3 class="tcard-title">
          <a href="#tour/${esc(tour.id)}">${esc(c.n)}</a>
        </h3>
        <p class="tcard-desc">${esc(c.d)}</p>
        ${hl ? `<ul class="tcard-hl">${hl}</ul>` : ""}
        <div class="tcard-foot">
          <p class="tcard-price">${priceLine(tour)}</p>
          <span class="tcard-cta" aria-hidden="true">${esc(t("s2.cta"))} <i>&rarr;</i></span>
        </div>
      </div>
    </article>`;
  }

  function renderCatalogue(){
    const host = $("#journeys-list");
    if(!host) return;
    host.innerHTML = TOURS.map(cardHTML).join("");
    /* The cards are .rv, and they are created after setLang has
       already run its pass — so without this they would sit at
       opacity 0 for ever on a first load. */
    if(typeof observeReveals === "function") observeReveals();
  }

  /* ==========================================================
     THE DETAIL VIEW
     Seven bands on the page's own alternating grounds: hero,
     overview, highlights, day-by-day, what is and is not
     included, the practical information, and the enquiry.
     ========================================================== */
  const section = (ground, inner) =>
    `<section class="sec sec--${ground}">
       <div class="wrap">${inner}</div>
     </section>`;

  /* A heading, not a paragraph. The eyebrows on the home page label
     sections that each carry their own h2; here the eyebrow IS the
     section's heading, and a seven-band document with no outline is
     hard to move around with a screen reader. The class is unchanged,
     so it looks identical. h2 tour name -> h3 section -> h4 within. */
  const eyebrow = k => `<h3 class="eyebrow"><span>${esc(t(k))}</span></h3>`;

  const list = (items, cls) => `<ul class="tlist${cls || ""}">${
    items.map(x => `<li>${esc(x)}</li>`).join("")}</ul>`;

  function heroHTML(tour){
    const c = copy(tour);
    const h = tour.hero;
    /* Duration is built from the tour's own numbers rather than
       repeated in three languages, and the destinations are not
       here: the eyebrow above already names them and the overview
       lists them in full. Two facts and a price is what a hero
       can hold without becoming a table. */
    const facts = [
      [t("tour.duration"),
       `${tour.days} ${t("tour.days")} / ${tour.nights} ${t("tour.nights")}`],
      [t("tour.price"), null]
    ].map(([k, v]) => `<div class="cred"><dt>${esc(k)}</dt><dd>${v === null ? priceLine(tour) : esc(v)}</dd></div>`).join("");

    return `
    <header class="tour-hero">
      <div class="tour-hero-media">
        <img src="${esc(h.base)}-${h.widths.at(-1)}.webp" srcset="${srcset(h.base, h.widths)}"
             sizes="100vw" alt="${esc(heroAlt(tour))}"
             width="${h.w}" height="${h.h}" fetchpriority="high" decoding="async">
      </div>
      <div class="tour-hero-veil" aria-hidden="true"></div>
      <div class="tour-hero-in">
        <p class="eyebrow"><span>${esc(c.meta)}</span></p>
        <h2 id="tour-h" class="lead tour-h">${esc(c.n)}</h2>
        <p class="tour-tag">${esc(c.tagline)}</p>
        <dl class="tour-facts">${facts}</dl>
        <div class="tour-cta-row">${ctaRow(tour)}</div>
      </div>
    </header>`;
  }

  function overviewHTML(tour){
    const c = copy(tour);
    const dest = (c.destinations || []).map(d => `<li>${esc(d)}</li>`).join("");
    return section("paper", `
      ${eyebrow("tour.overview")}
      <div class="split">
        <div class="tour-where rv">
          <span class="rule-gold" aria-hidden="true"></span>
          <h4 class="eyebrow eyebrow--plain"><span>${esc(t("tour.destinations"))}</span></h4>
          ${dest ? `<ul class="tour-dest">${dest}</ul>` : ""}
        </div>
        <div class="split-body tour-prose rv">${(c.overview || []).map(p => `<p>${esc(p)}</p>`).join("")}</div>
      </div>`);
  }

  function highlightsHTML(tour){
    const c = copy(tour);
    if(!c.highlights || !c.highlights.length) return "";
    const cells = c.highlights.map(h => `
      <li class="thl">
        ${ICONS.has(h.i)
          ? `<span class="thl-i" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><use href="#ti-${esc(h.i)}"/></svg></span>`
          : ""}
        <span class="thl-t">${esc(h.h)}</span>
      </li>`).join("");
    return section("paper-deep", `
      ${eyebrow("tour.highlights")}
      <ul class="thl-grid rv">${cells}</ul>`);
  }

  /* WHERE YOU SLEEP AND WHAT YOU EAT
     The two questions a day-by-day is actually read for, and the
     two a paragraph is the wrong shape to answer. They are a
     .cred label/value pair — the same component the tour hero and
     the information block use — so a day gains a small table and
     the page gains no new typography.

     Both fields are optional per day, and the block is drawn only
     for a day that carries at least one of them. A tour whose
     days predate the fields renders exactly as it did before,
     rather than gaining a row that says "no meals included" about
     a day nobody has checked. Within a tour that does carry them:

       stay:""        the tour ends that day — the row is dropped
                      rather than printed empty
       meals:[]       nothing is included — said in words, because
                      a missing line reads as an oversight
     ------------------------------------------------------------ */
  function dayFactsHTML(d){
    const hasStay  = typeof d.stay === "string";
    const hasMeals = Array.isArray(d.meals);
    if(!hasStay && !hasMeals) return "";

    const rows = [];
    if(hasStay && d.stay) rows.push([t("tour.stay"), d.stay]);
    if(hasMeals) rows.push([t("tour.meals"),
      d.meals.length ? d.meals.join(" · ") : t("tour.mealsNone")]);
    if(!rows.length) return "";

    return `<dl class="tday-facts">${rows.map(([k, v]) =>
      `<div class="cred"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>`;
  }

  /* The day rows use the FAQ's disclosure contract exactly: a
     button carrying aria-expanded, a panel carrying inert while
     it is closed, and .is-open on the row. js/main.js toggles
     both from one delegated handler. Day one opens on arrival so
     the section shows what it is rather than a stack of shut
     drawers. */
  function itineraryHTML(tour){
    const c = copy(tour);
    const days = (c.days || []).map((d, i) => {
      const open = i === 0;
      const acts = (d.acts || []).map(a => `<li class="chip">${esc(a)}</li>`).join("");
      return `
      <li class="tday${open ? " is-open" : ""}">
        <span class="tday-num" aria-hidden="true">${i + 1}</span>
        <h4 class="tday-h">
          <button class="tday-q" type="button" id="tday-q-${i}"
                  aria-expanded="${open}" aria-controls="tday-a-${i}">
            <span class="tday-t">
              <span class="tday-when">
                <span class="tday-d">${esc(d.d)}</span>
                <span class="tday-place">${esc(d.place)}</span>
              </span>
              <span class="tday-title">${esc(d.h)}</span>
            </span>
            <i class="faq-sign" aria-hidden="true"></i>
          </button>
        </h4>
        <div class="tday-a" id="tday-a-${i}" role="region" aria-labelledby="tday-q-${i}">
          <div class="tday-a-in">
            <div class="tday-body">
              ${acts ? `<ul class="tday-acts">${acts}</ul>` : ""}
              <p class="tday-p">${esc(d.p)}</p>
              ${dayFactsHTML(d)}
            </div>
          </div>
        </div>
      </li>`;
    }).join("");

    return section("paper", `
      ${eyebrow("tour.itinerary")}
      <p class="tdays-note">${esc(t("tour.itineraryNote"))}</p>
      <ol class="tdays">${days}</ol>`);
  }

  function inclusionsHTML(tour){
    const c = copy(tour);
    const col = (key, items, cls) => items && items.length
      ? `<div class="tcol"><h4>${esc(t(key))}</h4>${list(items, cls)}</div>` : "";
    return section("paper-deep", `
      ${eyebrow("tour.inclusions")}
      <div class="tcols rv">
        ${col("tour.included",    c.included)}
        ${col("tour.notIncluded", c.notIncluded, " tlist--out")}
        ${col("tour.optional",    c.optional)}
      </div>`);
  }

  function infoHTML(tour){
    const c = copy(tour);
    const rows = (c.info || [])
      .map(([k, v]) => `<div class="cred"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("");
    const notes = (c.notes || []).length
      ? `<h4 class="eyebrow eyebrow--plain tour-sub"><span>${esc(t("tour.notes"))}</span></h4>
         <ul class="tnotes">${c.notes.map(n => `<li>${esc(n)}</li>`).join("")}</ul>`
      : "";
    return section("paper", `
      ${eyebrow("tour.info")}
      <dl class="creds tinfo rv">${rows}</dl>
      ${notes}`);
  }

  function finalHTML(tour){
    const others = TOURS.filter(x => x.id !== tour.id).map(x => {
      const o = copy(x);
      return `<a href="#tour/${esc(x.id)}">
                <span class="tother-m">${esc(o.meta)}</span>
                <span class="tother-n">${esc(o.n)}</span>
              </a>`;
    }).join("");

    return `
    <section class="sec sec--paper-deep tour-final">
      <div class="wrap">
        <div class="split">
          <h3 class="lead rv">${esc(t("tour.ctaLead"))}</h3>
          <div class="split-body">
            <p class="rv">${esc(t("tour.ctaBody"))}</p>
            <div class="tour-cta-row">${ctaRow(tour)}</div>
          </div>
        </div>
        <h4 class="eyebrow eyebrow--plain tour-sub"><span>${esc(t("tour.other"))}</span></h4>
        <nav class="tother" aria-label="${esc(t("tour.other"))}">${others}</nav>
      </div>
    </section>`;
  }

  function detailHTML(tour){
    const c = copy(tour);
    return `
    <div class="tour-bar">
      <button class="tour-back" type="button" id="tour-close"
              aria-label="${esc(t("tour.closeAria"))}"><i aria-hidden="true">&larr;</i> ${esc(t("tour.back"))}</button>
      <span class="tour-bar-name">${esc(c.n)}</span>
      ${ctaRow(tour, true).replace('class="btn ', 'class="tour-bar-cta btn ')}
    </div>
    ${heroHTML(tour)}
    ${overviewHTML(tour)}
    ${highlightsHTML(tour)}
    ${itineraryHTML(tour)}
    ${inclusionsHTML(tour)}
    ${infoHTML(tour)}
    ${finalHTML(tour)}`;
  }

  /* ==========================================================
     OPEN / CLOSE
     The page behind is made inert rather than merely covered, so
     a keyboard or screen-reader user cannot tab into a document
     they cannot see. Focus lands on the panel, returns to the
     card it came from, and Escape closes — the same contract the
     mobile menu keeps.
     ========================================================== */
  const BEHIND = () => [$("#nav"), $("#mmenu"), $("#main"), $("footer.foot")].filter(Boolean);

  function paint(tour){
    DIALOG.innerHTML = detailHTML(tour);
    DIALOG.setAttribute("tabindex", "-1");
    // Closed panels leave the tab order as well as the screen.
    $$(".tday", DIALOG).forEach(row => {
      const panel = $(".tday-a", row);
      if(panel) panel.inert = !row.classList.contains("is-open");
    });
    if(typeof observeReveals === "function") observeReveals();
  }

  function open(tour){
    if(openId === null){
      lastFocus = document.activeElement;
      PANEL.hidden = false;
      document.body.classList.add("tour-open");
      document.body.style.overflow = "hidden";
      BEHIND().forEach(el => { el.inert = true; });
    }
    openId = tour.id;
    paint(tour);
    DIALOG.scrollTop = 0;
    retargetWhatsApp(tour);
    DIALOG.focus({ preventScroll:true });
    const live = $("#live");
    if(live) live.textContent = copy(tour).n;
  }

  function close(){
    if(openId === null) return;
    openId = null;
    PANEL.hidden = true;
    DIALOG.innerHTML = "";
    document.body.classList.remove("tour-open");
    document.body.style.overflow = "";
    BEHIND().forEach(el => { el.inert = false; });
    if(typeof initWhatsApp === "function") initWhatsApp();
    if(lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll:true });
    lastFocus = null;
  }

  /* The floating button is the site's WhatsApp affordance; while
     a tour is open it should carry that tour's message rather
     than a blank one. With no number configured it keeps falling
     back to the contact form, exactly as initWhatsApp leaves it,
     but now with the route named. */
  function retargetWhatsApp(tour){
    const fab = $("#wa");
    if(!fab) return;
    const name = copy(tour).n;
    const wa = waTourHref(name);
    if(wa){
      fab.href = wa; fab.target = "_blank"; fab.rel = "noopener noreferrer";
      fab.removeAttribute("data-journey"); fab.removeAttribute("data-tour-exit");
    } else {
      fab.href = "#contact-form"; fab.removeAttribute("target"); fab.removeAttribute("rel");
      fab.setAttribute("data-journey", name);
      fab.setAttribute("data-tour-exit", "");
    }
  }

  /* The close button says "all tours", so it goes there. The
     entry is replaced rather than pushed, which keeps opening and
     closing tours from filling the back stack; the browser's own
     back button still retraces whatever came before. The panel is
     torn down first, because a fragment navigation scrolls before
     hashchange fires and a locked <body> would swallow it. */
  function requestClose(){
    close();
    const url = new URL(location.href);
    url.hash = "#journeys";
    location.replace(url);
  }

  function route(){
    const m = /^#tour\/([A-Za-z0-9_-]+)$/.exec(location.hash || "");
    const tour = m && byId(m[1]);
    if(tour) open(tour);
    else close();
  }

  /* ==========================================================
     WIRING
     ========================================================== */
  addEventListener("hashchange", route);

  document.addEventListener("click", e => {
    if(e.target.closest("#tour-close")){ requestClose(); return; }
    // Anything inside the panel that points at the page behind —
    // the enquiry buttons, the floating WhatsApp when it is
    // standing in for one — has to put the page back first.
    if(openId !== null && e.target.closest("[data-tour-exit]")) close();
  });

  document.addEventListener("keydown", e => {
    if(openId === null) return;
    if(e.key === "Escape"){ requestClose(); return; }
    if(e.key !== "Tab") return;
    const f = $$('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])', DIALOG)
      .filter(el => el.offsetParent !== null);
    if(!f.length) return;
    const first = f[0], last = f.at(-1);
    if(e.shiftKey && (document.activeElement === first || document.activeElement === DIALOG)){
      e.preventDefault(); last.focus();
    } else if(!e.shiftKey && document.activeElement === last){
      e.preventDefault(); first.focus();
    }
  });

  /* setLang calls render() on every language change. The
     catalogue is redrawn, and an open tour is repainted in place
     so switching language does not close what you were reading. */
  window.YE_TOURS = {
    render(){
      renderCatalogue();
      if(openId !== null){
        const tour = byId(openId);
        if(tour){ paint(tour); retargetWhatsApp(tour); }
      }
    }
  };

  renderCatalogue();
  route();
})();
