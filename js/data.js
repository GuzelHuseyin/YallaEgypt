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
  testimonialsAreDemo: true   // true -> the demo-content flag renders under reviews
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
   The "yalla" gesture: a hand rises into frame, pushes the mark
   towards the viewer, and drops away as the mark settles into its
   seat above the headline.

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
     Shipped as an SVG silhouette (#ye-hand in index.html): near
     black with a gold rim, motion-blurred, on screen for 1.3s.
     That is what a real plate looks like at this speed, and it is
     the one treatment that does not read as a cartoon.

     When filmed or animated footage arrives, point handPlate at it
     and the silhouette is replaced in place:

       handPlate = { type:"video", src:"assets/videos/hand.webm" }
       handPlate = { type:"image", src:"assets/images/hand-plate.png" }

     It needs an alpha channel (VP9/VP8 with alpha in .webm, or a
     transparent PNG) and should be framed so the palm sits in the
     middle of the plate — the layer is anchored on the mark, so
     the palm lands on the mark at every viewport size.
   ------------------------------------------------------------ */
const OPENING = {
  enabled: true,
  handPlate: null,      // null -> the built-in silhouette
  oncePerSession: true, // returning visitors go straight to the settled state
  maxDurationMs: 2200   // hard ceiling; the hero is released regardless
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
   JOURNEYS
   "stops" are proper nouns and stay identical across languages;
   everything a visitor reads lives in t[lang], so main.js never
   has to translate anything. Each card opens its route in place —
   no card may promise detail and deliver a contact form.
   ------------------------------------------------------------ */
const TOURS = [
  { id:"cairo-giza", img:"assets/images/tours/cairo-giza-1100.webp", days:4, price:"€—",
    stops:["Cairo","Giza","Saqqara","Dahshur"],
    t:{
      en:{ n:"Cairo & Giza",
           d:"Three pyramid fields in chronological order, so the architecture actually makes sense. Plus the Grand Egyptian Museum and two mornings in the old city.",
           best:"October to April. July and August work if you accept starting at six.",
           pace:"Two sites a day at most. Early starts, long afternoons off." },
      tr:{ n:"Kahire & Giza",
           d:"Üç piramit alanını kronolojik sırayla geziyoruz; mimarinin nasıl geliştiği ancak böyle anlaşılıyor. Büyük Mısır Müzesi ve eski şehirde iki sabah dahil.",
           best:"Ekim–Nisan arası. Temmuz ve ağustos da olur, altıda kalkmayı kabul ederseniz.",
           pace:"Günde en fazla iki nokta. Erken çıkış, uzun serbest öğleden sonra." },
      de:{ n:"Kairo & Gizeh",
           d:"Drei Pyramidenfelder in chronologischer Reihenfolge — so ergibt die Architektur Sinn. Dazu das Grand Egyptian Museum und zwei Vormittage in der Altstadt.",
           best:"Oktober bis April. Juli und August gehen auch, wenn Sie um sechs starten.",
           pace:"Höchstens zwei Stätten am Tag. Früher Aufbruch, langer freier Nachmittag." }
    } },

  { id:"nile-luxor-aswan", img:"assets/images/tours/nile-luxor-aswan-1100.webp", days:7, price:"€—",
    stops:["Luxor","Esna","Edfu","Kom Ombo","Aswan"],
    t:{
      en:{ n:"The Nile, Luxor to Aswan",
           d:"Seven days on the river. Karnak at opening, the Valley of the Kings before the heat, and long stretches where the only thing to do is watch the bank go past.",
           best:"October to April. The river is the coolest place in Egypt — though not in August.",
           pace:"One temple a day, the rest on the water. Nothing before eight after day three." },
      tr:{ n:"Nil: Luksor'dan Asvan'a",
           d:"Nehirde yedi gün. Karnak açılışta, Krallar Vadisi sıcak basmadan; aradaki uzun bölümlerde yapılacak tek şey kıyıyı izlemek.",
           best:"Ekim–Nisan arası. Nehir Mısır'ın en serin yeri — ama ağustosta değil.",
           pace:"Günde bir tapınak, kalanı suda. Üçüncü günden sonra sekizden önce program yok." },
      de:{ n:"Der Nil, Luxor bis Assuan",
           d:"Sieben Tage auf dem Fluss. Karnak zur Öffnung, das Tal der Könige vor der Hitze — und lange Strecken, auf denen man nur das Ufer vorbeiziehen sieht.",
           best:"Oktober bis April. Der Fluss ist der kühlste Ort Ägyptens — im August aber auch nicht.",
           pace:"Ein Tempel pro Tag, der Rest auf dem Wasser. Ab Tag drei nichts vor acht." }
    } },

  { id:"abu-simbel-south", img:"assets/images/tours/abu-simbel-south-1100.webp", days:3, price:"€—",
    stops:["Aswan","Philae","Abu Simbel"],
    t:{
      en:{ n:"Abu Simbel & the south",
           d:"Down to the Sudanese border and back. Abu Simbel is a four-hour drive each way — we leave early enough that you have the façade to yourself for a while.",
           best:"October to March. Aswan in June is 45°C by eleven in the morning.",
           pace:"One long day, two easy ones. The long day starts at four." },
      tr:{ n:"Abu Simbel ve güney",
           d:"Sudan sınırına kadar inip dönüyoruz. Abu Simbel tek yön dört saat; cepheyi bir süre kendinize saklayacak kadar erken çıkıyoruz.",
           best:"Ekim–Mart arası. Asvan haziranda sabah on birde 45°C.",
           pace:"Bir uzun gün, iki rahat gün. Uzun gün dörtte başlıyor." },
      de:{ n:"Abu Simbel & der Süden",
           d:"Bis zur sudanesischen Grenze und zurück. Abu Simbel liegt vier Fahrstunden entfernt — wir fahren früh genug, dass die Fassade eine Weile Ihnen gehört.",
           best:"Oktober bis März. Assuan hat im Juni schon um elf Uhr 45 °C.",
           pace:"Ein langer Tag, zwei ruhige. Der lange beginnt um vier." }
    } },

  { id:"western-desert", img:"assets/images/tours/western-desert-1100.webp", days:3, price:"€—",
    stops:["Bahariya","Black Desert","White Desert"],
    t:{
      en:{ n:"Into the Western Desert",
           d:"Two nights camping between chalk formations, three hundred kilometres from the nearest town. Not for everyone, and we will say so if we think it is not for you.",
           best:"November to February only. There is no shade and no phone signal.",
           pace:"Driving, then stopping, then nothing. Camp is set before sunset." },
      tr:{ n:"Batı Çölü'ne",
           d:"Tebeşir oluşumlarının arasında iki gece kamp; en yakın kasabaya üç yüz kilometre. Herkese göre değil — size göre olmadığını düşünürsek bunu söyleriz.",
           best:"Yalnızca kasım–şubat arası. Ne gölge var ne telefon çekiyor.",
           pace:"Yol, mola, sonra hiçbir şey. Kamp gün batmadan kuruluyor." },
      de:{ n:"In die Westliche Wüste",
           d:"Zwei Nächte zwischen Kreidefelsen, dreihundert Kilometer von der nächsten Stadt. Nicht für jeden — und wir sagen es, wenn wir es für Sie nicht passend halten.",
           best:"Nur November bis Februar. Es gibt keinen Schatten und keinen Empfang.",
           pace:"Fahren, halten, dann nichts. Das Camp steht vor Sonnenuntergang." }
    } }
];

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
   TEAM
   Nobody here is real yet, and inventing staff would be worse
   than an honest blank — but anonymous luxury does not exist,
   so the section stays and shows its gaps. Fill name / role /
   line / photo per person; an empty photo renders a marked
   placeholder tile. Delete a row to show fewer people.
   ------------------------------------------------------------ */
const TEAM = [
  { id:"founder", name:"", role:"", line:"", photo:"" },
  { id:"guide",   name:"", role:"", line:"", photo:"" },
  { id:"ops",     name:"", role:"", line:"", photo:"" }
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
