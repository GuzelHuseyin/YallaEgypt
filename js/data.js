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
  tourId: "nile-luxor-aswan",
  t: {
    en: {
      days: [
        { d:"Day 1", place:"Luxor",   h:"Land, and do nothing",
          p:"Airport pickup and the east bank hotel. Nothing is scheduled. If you land early enough, the corniche at sunset is a ten-minute walk and costs nothing." },
        { d:"Day 2", place:"Karnak",  h:"Karnak at opening, then off",
          p:"At the gate for 06:00, an hour before the coaches. The hypostyle hall takes about ninety minutes properly. Back at the hotel by eleven, out of the heat. The afternoon is yours." },
        { d:"Day 3", place:"West Bank", h:"The Valley, early",
          p:"Valley of the Kings before the heat — three tombs included, and we will tell you which third one is worth the extra ticket that day. Hatshepsut's terraces after, then the river." },
        { d:"Day 4", place:"Esna · Edfu", h:"On the water",
          p:"Through the Esna lock in the morning. Edfu in the late afternoon, when the light comes in sideways along the pylon. Most of this day is deck and riverbank." },
        { d:"Day 5", place:"Kom Ombo", h:"Two gods, one temple",
          p:"An hour at Kom Ombo at dusk — it is small, it is symmetrical, and it does not need longer. The crocodile museum next door takes twenty minutes and is worth them." },
        { d:"Day 6", place:"Aswan",   h:"Philae, and a felucca",
          p:"Philae by motorboat in the morning. The afternoon is a felucca around Elephantine with nothing planned at the other end. This is the day people remember." },
        { d:"Day 7", place:"Aswan",   h:"Abu Simbel, or a slow morning",
          p:"Either the early run south to Abu Simbel — three hours each way, worth it once — or a slow breakfast and a late flight. We will have told you honestly which suits your group." }
      ],
      note:"This is one real route, written out. Yours will not be identical: dates, pace and what you care about change it, and it is rewritten in full before anything is confirmed."
    },
    tr: {
      days: [
        { d:"1. Gün", place:"Luksor",  h:"İn, ve hiçbir şey yapma",
          p:"Havaalanı karşılaması ve doğu yakasındaki otel. Programda hiçbir şey yok. Erken indiyseniz gün batımında korniş on dakikalık yürüme mesafesinde ve bedava." },
        { d:"2. Gün", place:"Karnak",  h:"Açılışta Karnak, sonra çıkış",
          p:"06:00'da kapıda, otobüslerden bir saat önce. Sütunlu salon düzgün gezilirse doksan dakika. On birde otelde, sıcaktan uzakta. Öğleden sonrası size ait." },
        { d:"3. Gün", place:"Batı Yakası", h:"Vadi, erkenden",
          p:"Sıcak basmadan Krallar Vadisi — üç mezar dahil, o gün hangi üçüncü mezarın ekstra bileti hak ettiğini size söyleriz. Ardından Hatşepsut terasları, sonra nehir." },
        { d:"4. Gün", place:"Esna · Edfu", h:"Suyun üstünde",
          p:"Sabah Esna kilidinden geçiş. Edfu ikindi vakti, ışık pilonun yanından yatık geldiğinde. Bu günün çoğu güverte ve kıyı." },
        { d:"5. Gün", place:"Kom Ombo", h:"İki tanrı, tek tapınak",
          p:"Alacakaranlıkta Kom Ombo'da bir saat — küçük, simetrik, daha fazlasına ihtiyacı yok. Yanındaki timsah müzesi yirmi dakika sürer ve o yirmi dakikayı hak eder." },
        { d:"6. Gün", place:"Asvan",   h:"Philae ve bir felucca",
          p:"Sabah motorla Philae. Öğleden sonra Elephantine çevresinde felucca; varışta hiçbir plan yok. İnsanların hatırladığı gün bu." },
        { d:"7. Gün", place:"Asvan",   h:"Abu Simbel ya da ağır bir sabah",
          p:"Ya güneye erken kalkış Abu Simbel — gidiş dönüş üçer saat, bir kez değer — ya da geç bir kahvaltı ve geç uçuş. Grubunuza hangisinin uyduğunu size dürüstçe söylemiş oluruz." }
      ],
      note:"Bu, yazıya dökülmüş gerçek bir rota. Sizinki aynısı olmayacak: tarihler, tempo ve önemsedikleriniz onu değiştirir; hiçbir şey kesinleşmeden önce baştan yazılır."
    },
    de: {
      days: [
        { d:"Tag 1", place:"Luxor",    h:"Ankommen, sonst nichts",
          p:"Abholung am Flughafen, Hotel am Ostufer. Nichts ist geplant. Wer früh genug landet: die Corniche bei Sonnenuntergang liegt zehn Minuten entfernt und kostet nichts." },
        { d:"Tag 2", place:"Karnak",   h:"Karnak zur Öffnung, dann weg",
          p:"Um 06:00 am Tor, eine Stunde vor den Bussen. Die Säulenhalle braucht in Ruhe etwa neunzig Minuten. Um elf zurück im Hotel, aus der Hitze. Der Nachmittag gehört Ihnen." },
        { d:"Tag 3", place:"Westufer", h:"Das Tal, früh",
          p:"Tal der Könige vor der Hitze — drei Gräber inklusive, und wir sagen Ihnen, welches dritte an diesem Tag das Extraticket wert ist. Danach die Terrassen der Hatschepsut, dann der Fluss." },
        { d:"Tag 4", place:"Esna · Edfu", h:"Auf dem Wasser",
          p:"Morgens durch die Schleuse von Esna. Edfu am späten Nachmittag, wenn das Licht seitlich am Pylon entlangfällt. Dieser Tag ist überwiegend Deck und Uferlandschaft." },
        { d:"Tag 5", place:"Kom Ombo", h:"Zwei Götter, ein Tempel",
          p:"Eine Stunde in Kom Ombo in der Dämmerung — klein, symmetrisch, mehr braucht es nicht. Das Krokodilmuseum nebenan dauert zwanzig Minuten und lohnt sie." },
        { d:"Tag 6", place:"Assuan",   h:"Philae und eine Feluke",
          p:"Vormittags mit dem Boot nach Philae. Nachmittags eine Feluke um Elephantine, ohne Programm am anderen Ende. Das ist der Tag, an den man sich erinnert." },
        { d:"Tag 7", place:"Assuan",   h:"Abu Simbel — oder ein langsamer Morgen",
          p:"Entweder die frühe Fahrt nach Süden zu Abu Simbel — drei Stunden pro Richtung, einmal im Leben wert — oder ein spätes Frühstück und ein später Flug. Was zu Ihrer Gruppe passt, haben wir Ihnen vorher ehrlich gesagt." }
      ],
      note:"Das ist eine echte Route, ausgeschrieben. Ihre wird nicht identisch sein: Daten, Tempo und Ihre Interessen verändern sie, und sie wird vollständig neu geschrieben, bevor irgendetwas bestätigt wird."
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
