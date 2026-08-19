/* ============================================================
   DATA LAYER
   Content and configuration live here, separate from rendering
   (js/main.js) and translated copy (js/i18n.js). If this project
   ever moves to a framework, this file maps directly onto
   /config/company.ts, /data/tours.ts, /data/destinations.ts,
   /data/testimonials.ts.

   Image paths point at locally cached, pre-sized WebP files under
   assets/images/ (see assets/images/README.txt for provenance).
   Each entry gives a "base" path plus the widths actually saved,
   so js/main.js can build a srcset without guessing.
   ============================================================ */

/* ------------------------------------------------------------
   COMPANY — everything a launch checklist has to fill in.
   Leave a value empty and the site degrades honestly: the
   affordance still renders, but it points somewhere that works
   and carries a visible TBC badge instead of a dead link.
   ------------------------------------------------------------ */
const CONFIG = {
  /* Contact. whatsapp takes digits only, international format,
     no plus sign and no spaces — that is what wa.me expects. */
  whatsapp:     "",                        // e.g. "201001234567"
  phone:        "",                        // e.g. "+20 100 123 4567"
  email:        "merhaba@yallaegypt.com",  // confirm the mailbox is live before launch
  address:      "",                        // office address, one line
  legalName:    "",                        // registered company name
  licence:      "",                        // travel agency licence / registration no.

  /* Social. Empty entries are dropped from the footer entirely. */
  instagram:    "",
  youtube:      "",
  tripadvisor:  "",

  /* Behaviour flags */
  showPrices:          false, // true -> the price field replaces "price on request"

  /* Reviews are demo content until real ones exist. While this is
     true the whole reviews section is left out of the page rather
     than shown behind a "demo content" label: invented praise with
     a disclaimer under it tells a visitor the company has no
     customers, which is worse than saying nothing. Drop real
     quotes into TESTIMONIALS and set this to false to bring the
     section back. */
  testimonialsAreDemo: true,

  /* Pre-launch gap markers. The site has fields that only the
     client can fill — licence number, phone, WhatsApp, office
     address. With this true they render a visible TBC badge, which
     is the pre-launch checklist. With it false they are simply
     omitted, because a customer reading "Licence & registration
     TBC" learns the company is unlicensed, not that the site is
     unfinished. Ship with false. */
  showGaps: false
};

/* ------------------------------------------------------------
   HERO BACKGROUND FILM  —  layer 1 of the hero
   The first screen is built so a cinematic film can take over the
   background without touching markup or CSS.

   TO GO LIVE
     1. Drop the encoded files into assets/videos/
        (assets/videos/README.txt carries the encode recipe).
     2. Set enabled:true below.

   Until then the still sequence plays, and it stays the permanent
   fallback for: narrow viewports with no mobile cut, reduced
   motion, save-data, blocked autoplay, and any decode error. The
   LCP element is the first still either way, so the film can never
   block first paint.

   Two workflows are supported, and the choice is made here:

     A. BACKGROUND ONLY (recommended)
        The film is landscape Egypt footage. The hand and the mark
        stay as layer 2, driven by CSS — so they stay sharp at every
        resolution, and re-cutting the film never means re-shooting
        the logo. Leave OPENING.enabled = true.

     B. FULLY COMPOSITED
        The delivered film already contains the hand and the mark.
        Set OPENING.enabled = false and the gesture layer never
        renders; the site simply plays the film and shows the mark
        at rest underneath the headline.
   ------------------------------------------------------------ */
const HERO_VIDEO = {
  enabled: false,

  /* Landscape cut, used at and above minWidth. */
  sources: [
    { src: "assets/videos/hero.webm", type: "video/webm" },
    { src: "assets/videos/hero.mp4",  type: "video/mp4"  }
  ],

  /* Optional portrait / square cut for phones. A landscape film
     centre-cropped to a 9:16 viewport loses its whole composition,
     and costs a phone the data anyway — so phones get their own cut
     or they get the stills. Leave the array empty for stills. */
  mobileSources: [
    // { src: "assets/videos/hero-mobile.webm", type: "video/webm" },
    // { src: "assets/videos/hero-mobile.mp4",  type: "video/mp4"  }
  ],

  minWidth: 900,  // below this viewport width, mobileSources (or the stills) are used

  /* Optional caption for the field-record strip while the film is
     playing. The strip describes the still sequence, so it must not
     keep labelling a frame that is no longer on screen. Leave null
     and the descriptor hides itself — the pause control stays,
     because an auto-playing film has to be stoppable (WCAG 2.2.2). */
  label: null     // { idx:"—", name:"Egypt", geo:"", old:"" }
};

/* ------------------------------------------------------------
   THE OPENING  —  layer 2 of the hero
   The "yalla" gesture: a hand rises into frame HOLDING the mark,
   presents it for a beat, pushes it towards the viewer, and drops
   away as the mark settles into its seat above the headline.

   The holding beat is what stops this reading as a logo zoom. The
   hand and the mark travel as one solid for the first 600ms — same
   clock, same vertical travel, matched scale — and two fingers are
   drawn over the face of the medallion until the push. The timing
   lives in css/styles.css, THE OPENING; nothing here animates.

   This replaces the earlier full-screen intro overlay, which was
   the wrong shape for the idea: an overlay holds the whole site
   hostage for its own duration and has to be skippable, whereas
   this happens inside the first screen, over the footage, on top
   of a page that is already rendered, scrollable and interactive.
   Nothing waits for it.

   The rules it keeps from the design audit are unchanged:
     · first visit of a session only — an entrance impresses once
       and obstructs every time after
     · never under prefers-reduced-motion
     · never blocks content, never delays a click
     · abandoned the moment the visitor scrolls or hits a key

   THE HAND
     Shipped as an SVG silhouette (#ye-hand / #ye-hand-fore in
     index.html): near black with a gold rim, motion-blurred, on
     screen for 1.3s. That is what a real plate looks like at this
     speed, and it is the one treatment that does not read as a
     cartoon. It is a placeholder for a real plate all the same —
     see assets/videos/README.txt for what to commission.

     Two layers, because the mark is held BETWEEN them:

       handPlate.back   palm, thumb, fingers, forearm  (behind)
       handPlate.fore   only the fingers crossing the mark (front)

       handPlate = {
         back: { type:"image", src:"assets/images/hand-back.webp" },
         fore: { type:"image", src:"assets/images/hand-fore.webp" }
       }

     A bare { type, src } is still accepted and still means "the
     whole hand"; supplying a back plate without a fore plate drops
     the front layer, so the opening keeps the push and loses only
     the fingers-over-the-mark occlusion.

     Both plates need an alpha channel and must share one canvas
     and one registration: palm centre horizontally centred, 34%
     down, forearm bleeding off the bottom edge. The layer is
     anchored on the mark, so a correctly registered palm lands on
     the mark at every viewport size. A plate that fails to load
     falls back to the silhouette rather than leaving a hole.
   ------------------------------------------------------------ */
const OPENING = {
  enabled: true,
  handPlate: null,      // null -> the built-in silhouette
  oncePerSession: true, // returning visitors go straight to the settled state
  maxDurationMs: 2600   // hard ceiling; the hero is released regardless
};

/* ------------------------------------------------------------
   HERO STILLS — the cinematic sequence.
   Coordinates are real. The image/location pairing should be
   re-verified once owned photography replaces these stand-ins.
   ------------------------------------------------------------ */
const HERO = [
  { base:"assets/images/hero/giza-1",   widths:[1200,2000], name:"Giza",    geo:"29.9753°N 31.1376°E", old:"Rostau",          alt:"A lone figure walking below the Great Sphinx at Giza" },
  { base:"assets/images/hero/luxor-1",  widths:[1200,2000], name:"Luxor",   geo:"25.7188°N 32.6573°E", old:"Waset",           alt:"Colonnade of a temple at Luxor seen from below" },
  { base:"assets/images/hero/aswan-1",  widths:[1200,2000], name:"Aswan",   geo:"24.0889°N 32.8998°E", old:"Swenett",         alt:"A felucca under sail on the Nile at Aswan" },
  { base:"assets/images/hero/redsea-1", widths:[1200,2000], name:"Red Sea", geo:"27.9158°N 34.3300°E", old:"Sinai coast",     alt:"Bare mountains meeting the Red Sea" },
  { base:"assets/images/hero/thebes-1", widths:[1200,2000], name:"Thebes",  geo:"25.7380°N 32.6067°E", old:"West Bank",       alt:"Terraced limestone temple on the Theban west bank" },
  { base:"assets/images/hero/giza-2",   widths:[1200,2000], name:"Giza",    geo:"29.9792°N 31.1342°E", old:"Plateau",         alt:"Camels crossing the sand below the pyramids" },
  { base:"assets/images/hero/cairo-1",  widths:[1200,2000], name:"Cairo",   geo:"30.0444°N 31.2357°E", old:"Al-Qahira",       alt:"A sailboat on the Nile with Cairo behind it" },
  { base:"assets/images/hero/cairo-2",  widths:[1200,2000], name:"Cairo",   geo:"30.0477°N 31.2622°E", old:"Khan el-Khalili", alt:"Narrow lane between market stalls in old Cairo" }
];

/* ------------------------------------------------------------
   SIGNATURE ROUTES
   Four cards, one per route. "meta" is the duration and the base
   town, shown above the title; everything a visitor reads lives in
   t[lang], so js/main.js never has to translate anything.

   Each card links straight to the contact section rather than
   opening its detail in place: the card is the pitch, and the
   conversation is the next step.

   Source aspect ratios differ on purpose — the card media carries
   its own aspect-ratio with object-fit:cover, so a portrait and a
   landscape original both crop correctly into the same grid.
   ------------------------------------------------------------ */
const TOURS = [
  { id:"kahire-giza",
    img:"assets/images/tours/cairo-giza-1100.webp", iw:1100, ih:825,
    t:{
      tr:{ meta:"3 Gün · Kahire", n:"Kahire & Giza",
           d:"Son ayakta kalan antik dünya harikası eşliğinde; Sfenks, Mısır Müzesi ve Kahire'nin tarihi çarşıları." },
      en:{ meta:"3 days · Cairo", n:"Cairo & Giza",
           d:"The last surviving wonder of the ancient world, with the Sphinx, the Egyptian Museum and the old bazaars of Cairo." },
      de:{ meta:"3 Tage · Kairo", n:"Kairo & Gizeh",
           d:"Das letzte erhaltene Weltwunder der Antike, dazu die Sphinx, das Ägyptische Museum und die alten Basare von Kairo." }
    } },

  { id:"luksor-karnak",
    img:"assets/images/destinations/luxor-900.webp", iw:900, ih:1247,
    t:{
      tr:{ meta:"4 Gün · Luksor", n:"Luksor & Karnak",
           d:"Firavunların açık hava başkentinde; Karnak'ın dev sütunları, Kral Vadisi'nin gizli mezarları." },
      en:{ meta:"4 days · Luxor", n:"Luxor & Karnak",
           d:"The open-air capital of the pharaohs: the great columns of Karnak and the hidden tombs of the Valley of the Kings." },
      de:{ meta:"4 Tage · Luxor", n:"Luxor & Karnak",
           d:"Die Freiluft-Hauptstadt der Pharaonen: die gewaltigen Säulen von Karnak und die verborgenen Gräber im Tal der Könige." }
    } },

  { id:"nil-cruise",
    img:"assets/images/tours/nile-luxor-aswan-1100.webp", iw:825, ih:1100,
    t:{
      tr:{ meta:"7 Gece · Nil", n:"Nil'de Lüks Cruise",
           d:"Beş yıldızlı bir tekne güvertesinden, nehrin iki yakasındaki tapınakları ve köy hayatını izleyin." },
      en:{ meta:"7 nights · The Nile", n:"A Luxury Nile Cruise",
           d:"From the deck of a five-star boat, watch the temples and the village life pass on both banks of the river." },
      de:{ meta:"7 Nächte · Nil", n:"Luxus-Nilkreuzfahrt",
           d:"Vom Deck eines Fünf-Sterne-Schiffes ziehen die Tempel und das Dorfleben an beiden Ufern des Flusses vorbei." }
    } },

  { id:"ebu-simbel",
    img:"assets/images/tours/abu-simbel-south-1100.webp", iw:1100, ih:825,
    t:{
      tr:{ meta:"Günübirlik · Aswan", n:"Ebu Simbel",
           d:"II. Ramses'in kayalara oyulmuş devasa tapınağı; güneşin doğuşuyla birlikte unutulmaz bir sabah." },
      en:{ meta:"Day trip · Aswan", n:"Abu Simbel",
           d:"The colossal temple of Ramesses II cut into the rock face, reached at first light for an unforgettable sunrise." },
      de:{ meta:"Tagesausflug · Assuan", n:"Abu Simbel",
           d:"Der kolossale, in den Fels geschlagene Tempel Ramses' II., erreicht im ersten Licht zu einem unvergesslichen Sonnenaufgang." }
    } }
];

/* ------------------------------------------------------------
   SAMPLE PROGRAMME
   One route, written out hour by hour. Every other section on the
   page describes how we work; this is the only one that shows it,
   which is why it earns a section of its own rather than living
   inside a journey card.

   It deliberately documents the SEVEN-DAY NILE ROUTE that already
   exists in TOURS ("nile-luxor-aswan"), so the two never drift:
   tourId below is the link, and js/main.js reads the day count and
   the route name from that entry rather than repeating them here.

   The content is a real working itinerary, not a brochure. Note
   what it admits: two mornings with nothing scheduled, one site
   dropped in summer, and an afternoon that is explicitly free. A
   sample programme that claims every hour is the thing customers
   have learned to distrust.
   ------------------------------------------------------------ */
const ITINERARY = {
  tourId: "nil-cruise",
  t: {
    tr: {
      days: [
        { d:"1. Gün", place:"Kahire",    h:"Giza Piramitleri & Sfenks",
          p:"Varışın ardından, Büyük Piramit'in gölgesinde özel rehberli bir keşif ve Kahire'de karşılama akşam yemeği." },
        { d:"2. Gün", place:"Kahire",    h:"Mısır Müzesi & Eski Kahire",
          p:"Tutankhamun hazineleri eşliğinde bir sabah, ardından Kıpti mahallesi ve Han el-Halili çarşısında öğleden sonra." },
        { d:"3. Gün", place:"Luksor",    h:"Karnak & Luksor Tapınakları",
          p:"Kısa bir uçuşla Luksor'a geçiş; öğleden sonra Karnak'ın dev sütunlu salonu, akşam ışık gösterisi." },
        { d:"4. Gün", place:"Batı Kıyı", h:"Kral Vadisi & Nil'de Gemi",
          p:"Hatşepsut Tapınağı ve kraliyet mezarları sonrası, akşam Nil üzerinde beş yıldızlı gemiye yerleşim." },
        { d:"5. Gün", place:"Aswan",     h:"Ebu Simbel Günübirlik Gezisi",
          p:"Şafak vakti yola çıkış; II. Ramses Tapınağı'nda güneşin taş yüzlere vuruşuna tanıklık ederek yolculuğun kapanışı." }
      ],
      note:"Bu, yazıya dökülmüş gerçek bir program. Sizinki aynısı olmayacak: tarihler, tempo ve önemsedikleriniz onu değiştirir; hiçbir şey kesinleşmeden önce baştan yazılır."
    },
    en: {
      days: [
        { d:"Day 1", place:"Cairo",     h:"The Pyramids of Giza & the Sphinx",
          p:"After the arrival transfer, a privately guided walk in the shadow of the Great Pyramid, and a welcome dinner in Cairo." },
        { d:"Day 2", place:"Cairo",     h:"The Egyptian Museum & Old Cairo",
          p:"A morning with the treasures of Tutankhamun, then an afternoon in the Coptic quarter and the Khan el-Khalili bazaar." },
        { d:"Day 3", place:"Luxor",     h:"Karnak & Luxor Temples",
          p:"A short flight to Luxor; the great hypostyle hall of Karnak in the afternoon, and the sound and light show that evening." },
        { d:"Day 4", place:"West Bank", h:"Valley of the Kings & boarding",
          p:"The temple of Hatshepsut and the royal tombs, then boarding a five-star boat on the Nile in the evening." },
        { d:"Day 5", place:"Aswan",     h:"Abu Simbel day trip",
          p:"A departure at dawn; the journey closes at the temple of Ramesses II, watching the sun reach the stone faces." }
      ],
      note:"This is one real programme, written out. Yours will not be identical: dates, pace and what you care about change it, and it is rewritten in full before anything is confirmed."
    },
    de: {
      days: [
        { d:"Tag 1", place:"Kairo",    h:"Pyramiden von Gizeh & Sphinx",
          p:"Nach der Ankunft ein privat geführter Rundgang im Schatten der Cheops-Pyramide und ein Willkommensessen in Kairo." },
        { d:"Tag 2", place:"Kairo",    h:"Ägyptisches Museum & Alt-Kairo",
          p:"Ein Vormittag bei den Schätzen des Tutanchamun, danach das koptische Viertel und der Basar Chan el-Chalili." },
        { d:"Tag 3", place:"Luxor",    h:"Karnak- & Luxor-Tempel",
          p:"Mit einem kurzen Flug nach Luxor; nachmittags die große Säulenhalle von Karnak, abends die Ton- und Lichtshow." },
        { d:"Tag 4", place:"Westufer", h:"Tal der Könige & Einschiffung",
          p:"Der Tempel der Hatschepsut und die Königsgräber, am Abend die Einschiffung auf ein Fünf-Sterne-Schiff auf dem Nil." },
        { d:"Tag 5", place:"Assuan",   h:"Tagesausflug nach Abu Simbel",
          p:"Aufbruch im Morgengrauen; die Reise endet am Tempel Ramses' II., wenn die Sonne die steinernen Gesichter erreicht." }
      ],
      note:"Das ist ein echtes Programm, ausgeschrieben. Ihres wird nicht identisch sein: Daten, Tempo und Ihre Interessen verändern es, und es wird vollständig neu geschrieben, bevor irgendetwas bestätigt wird."
    }
  }
};

/* ------------------------------------------------------------
   DESTINATIONS
   enabled:false is filtered out before render — Siwa has no
   cached image yet (add destinations/siwa-{500,900}.webp first).
   ------------------------------------------------------------ */
const DESTINATIONS = [
  { name:"Giza",       sub:"Rostau",                base:"assets/images/destinations/giza",       widths:[500,900], enabled:true,  alt:"The Great Pyramid rising above the plateau" },
  { name:"Luxor",      sub:"Waset",                 base:"assets/images/destinations/luxor",      widths:[500,900], enabled:true,  alt:"Visitors dwarfed by temple columns at Luxor" },
  { name:"Aswan",      sub:"Swenett",               base:"assets/images/destinations/aswan",      widths:[500,900], enabled:true,  alt:"A boat under sail on the Nile near Aswan" },
  { name:"Cairo",      sub:"Al-Qahira",             base:"assets/images/destinations/cairo",      widths:[500,900], enabled:true,  alt:"A doorway in old Cairo" },
  { name:"Abu Simbel", sub:"Meha & Ibshek",         base:"assets/images/destinations/abu-simbel", widths:[500,900], enabled:true,  alt:"Colossal seated statue carved from rock" },
  { name:"Red Sea",    sub:"Marsa Alam · Hurghada", base:"assets/images/destinations/red-sea",    widths:[500,900], enabled:true,  alt:"A shoal of fish over a Red Sea reef" },
  { name:"Alexandria", sub:"Rhakotis",              base:"assets/images/destinations/alexandria", widths:[500,900], enabled:true,  alt:"The Mediterranean shore at Alexandria" },
  { name:"Siwa",       sub:"Ammonium",              base:"assets/images/destinations/siwa",       widths:[500,900], enabled:false, alt:"Mudbrick architecture at Siwa oasis" }
];

/* ------------------------------------------------------------
   DEMO REVIEWS — not real, and must not be used in marketing.
   Swap this array 1:1 for genuine reviews, then set
   CONFIG.testimonialsAreDemo to false.
   ------------------------------------------------------------ */
const TESTIMONIALS = [
  { q:"They moved two days around when my flight changed. No fuss.",        who:"Demo — Name, City" },
  { q:"We asked for less walking. The whole route was rebuilt.",            who:"Demo — Name, City" },
  { q:"Someone answered at eleven at night, in Turkish.",                   who:"Demo — Name, City" },
  { q:"The driver waited three hours at the airport. Never mentioned it.",  who:"Demo — Name, City" },
  { q:"Karnak at seven in the morning was the right call.",                 who:"Demo — Name, City" },
  { q:"Prices were the same at the end as at the beginning.",               who:"Demo — Name, City" },
  { q:"Our guide knew when to stop talking.",                               who:"Demo — Name, City" },
  { q:"They told us one site was not worth the drive. It was not.",         who:"Demo — Name, City" },
  { q:"Two kids, seven days, nobody cried. Including us.",                  who:"Demo — Name, City" }
];
