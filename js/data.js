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

  /* Social. Empty entries are dropped from the footer entirely.
     The social channels live in the contact section rather than in
     a column of their own: after WhatsApp, Instagram is the second
     thing people check to decide whether a travel company is real,
     and it belongs beside the other ways of reaching us. See
     contactChannels in js/main.js. Empty a field and its row
     disappears, exactly like the phone number.

     The Instagram address below is the account confirmed by the
     client. YouTube and TripAdvisor are not open yet; fill them in
     and each one appears in the contact list on its own. */
  instagram:    "https://www.instagram.com/yallaegyptt/",
  youtube:      "",
  tripadvisor:  "",

  /* Behaviour flags */
  /* Prices live one per tour, in TOURS[].price (see THE TOUR
     CATALOGUE below). While this is false — or while a tour's
     price.from is still null — the catalogue and the detail view
     print "price on request" and route the visitor to WhatsApp.
     Fill the numbers in first, then flip this. */
  showPrices:          false, // true -> a tour's price.from replaces "price on request"

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
   Coordinates are real, and every entry now matches the photograph
   actually filed under it. The order is a route, not a gallery:
   the plateau, then the temple, then the river, then the city,
   then the coast — arrival through to the slow end of a trip.

   The first three are owned photography. The last two are the
   only placeholders that survived the cut, regraded to sit in the
   same warm, low-saturation family as the owned frames; replace
   them first when the shoot delivers.
   ------------------------------------------------------------ */
const HERO = [
  { base:"assets/images/hero/giza-1",   widths:[1200,2000], name:"Giza",    geo:"29.9753°N 31.1376°E", old:"Rostau",          alt:"Five travellers in Yalla Egypt shirts facing the pyramids and the Sphinx at Giza" },
  { base:"assets/images/hero/luxor-1",  widths:[1200,2000], name:"Luxor",   geo:"25.7188°N 32.6573°E", old:"Waset",           alt:"Colossal seated statues along a temple wall at Karnak" },
  { base:"assets/images/hero/aswan-1",  widths:[1200,2000], name:"Aswan",   geo:"24.0889°N 32.8998°E", old:"Swenett",         alt:"A felucca under sail on the Nile at dusk" },
  { base:"assets/images/hero/cairo-2",  widths:[1200,2000], name:"Cairo",   geo:"30.0477°N 31.2622°E", old:"Khan el-Khalili", alt:"Narrow lane between market stalls in old Cairo" },
  { base:"assets/images/hero/redsea-1", widths:[1200,2000], name:"Red Sea", geo:"27.9158°N 34.3300°E", old:"Sinai coast",     alt:"Bare mountains meeting the Red Sea" }
];

/* ------------------------------------------------------------
   THE TOUR CATALOGUE
   Five routes, each one a complete product: the card on the home
   page and the whole detail view are rendered from the same entry
   by js/tours.js. Nothing about a tour lives anywhere else.

   ORDER IS DISPLAY ORDER. The flagship carries featured:true and
   renders as the full-width card at the head of the grid; the
   other four fill the row underneath. Reordering this array
   reorders the catalogue and renumbers the cards, and nothing
   else has to change.

   LANGUAGE-NEUTRAL FIELDS sit at the top of each entry — id,
   duration, images, price — because they are facts, not copy.
   Everything a visitor reads is inside t[lang], so adding a
   fourth language means adding one more block per tour and one
   more block in js/i18n.js.

     id         also the slug: the detail view opens at
                #tour/<id>, which is what a shared link carries
     featured   full-width card at the head of the catalogue
     days       shown as "N days", and used in the JSON-LD
     nights     hotel nights; see each tour's "included" line
                where a night is spent travelling instead
     img        the 4:3 catalogue card (see .tcard-media)
     hero       the detail view's banner. These point at the hero
                stills the home page already loads, so opening a
                tour usually costs no new image at all
     price      SEE PRICING, BELOW
     t[lang]    meta / n / tagline / d for the card; everything
                else for the detail view

   PRICING — the client sets prices later
     Every tour carries one price object and nothing else:

         price:{ from:null, currency:"EUR", per:"person" }

     With from:null the UI prints "Price on request" and the
     enquiry CTAs carry the tour name into WhatsApp and the
     contact form. To publish a price, put a number in "from" and
     set CONFIG.showPrices = true. That is the whole change — one
     field per tour, no markup and no CSS.

     "per" takes "person" or "group" and picks the wording; the
     currency is a plain ISO code and is printed as given.

   HIGHLIGHTS carry an icon key and a label:

         { i:"pyramids", h:"The Pyramids of Giza & the Sphinx" }

     The key selects a line icon from the sprite in index.html
     (see TOUR ICONS there); an unknown key renders the label with
     no icon rather than a broken one. Keys in use: pyramids,
     temple, tomb, museum, city, nile, sun, balloon, desert, atv,
     bedouin, dive, snorkel, island, sea.

   DAYS are the itinerary. Each is { d, place, h, acts[], p }:
   the day label, where it happens, its title, the four or five
   things it contains as a chip row, and one honest paragraph.

   WHAT IS AND IS NOT CONFIRMED
     Tours 3, 4 and 5 follow the day structure the client has
     confirmed. Tours 1 and 2 are composed by us from the same
     operational parts — the Hurghada city tour, the desert
     safari, the diving and island days, the Luxor and Cairo
     sites — and their day counts and hotel splits are a proposal
     the client has still to sign off. Nothing in either is
     invented out of nothing, but do not treat those two as
     confirmed until they come back from the client.

     Tour 5's eighth day is written from the three endings the
     client did confirm — back to Hurghada, onward independently,
     or an international departure from Cairo — and says plainly
     that which one applies is settled with your flights. When
     the client confirms the operational detail, replace that
     day's acts and paragraph and nothing else changes.
   ------------------------------------------------------------ */
const TOURS = [

  /* ==========================================================
     01 · BEST OF EGYPT — the flagship
     Composed by us, not supplied: it takes the four legacy
     signature routes (Cairo & Giza, Luxor & Karnak, the Nile,
     Abu Simbel) and runs them as one line, which is what the
     client asked the reference operator's own listing to be
     matched against for depth of information.
     ========================================================== */
  { id:"best-of-egypt", featured:true, days:9, nights:8,
    img:"assets/images/tours/giza-caravan-1100.webp", iw:1100, ih:825,
    hero:{ base:"assets/images/hero/giza-1", widths:[1200,2000], w:2000, h:1260 },
    price:{ from:null, currency:"EUR", per:"person" },
    t:{

    en:{
      meta:"9 days · Cairo, Luxor & Aswan",
      n:"Best of Egypt",
      tagline:"Four thousand years, in the order they were built.",
      d:"Cairo, Luxor and Aswan in one line: the plateau at Giza, the hypostyle hall at Karnak, the royal tombs, and the river that runs between them. Our fullest route.",
      imgAlt:"A camel train crossing the sand in front of the pyramids at Giza",
      destinations:["Cairo","Giza","Luxor","Edfu & Kom Ombo","Aswan","Abu Simbel"],
      overview:[
        "Best of Egypt is the complete route: three days in and around Cairo, three in ancient Thebes, and the stretch of river between Luxor and Aswan that shorter itineraries skip. It is built for travellers coming a long way who would rather do this once, properly, than come back for the half they missed.",
        "The pace is full without being punishing. Sites are visited at the hour they are worth visiting: Giza and Karnak early, Luxor Temple at dusk, Abu Simbel at first light. The afternoons between them are deliberately open. You travel privately throughout, with a licensed Egyptologist on every guided day, so nothing here runs to a coach timetable."
      ],
      highlights:[
        { i:"pyramids", h:"The Pyramids of Giza & the Sphinx" },
        { i:"museum",   h:"The Tutankhamun collection, in one room" },
        { i:"city",     h:"Coptic Cairo & the Khan el-Khalili bazaar" },
        { i:"temple",   h:"Karnak & Luxor Temples" },
        { i:"tomb",     h:"The Valley of the Kings" },
        { i:"nile",     h:"The river between Luxor and Aswan" },
        { i:"sun",      h:"Abu Simbel at first light" },
        { i:"balloon",  h:"A dawn balloon over the West Bank (optional)" }
      ],
      days:[
        { d:"Day 1", place:"Cairo", h:"Arrival in Cairo",
          acts:["Airport transfer","Hotel check-in","An easy first evening","Welcome dinner"],
          p:"You are met inside the terminal and driven to the hotel. Nothing is scheduled beyond dinner: most people reach this airport tired, and the plateau deserves a morning rather than the tail of an afternoon." },
        { d:"Day 2", place:"Giza & Saqqara", h:"The Pyramids of Giza & the Sphinx",
          acts:["The Giza plateau","Inside the Great Pyramid","The Sphinx","Saqqara & Memphis"],
          p:"An early start, because the first hour on the plateau is the quiet one. The Great Pyramid can be entered on a separate ticket. It is a stooped climb up a low corridor that not everyone enjoys, and we would rather you decided that in advance. Saqqara and the step pyramid of Djoser in the afternoon, which is where the whole idea begins." },
        { d:"Day 3", place:"Cairo", h:"The museum, and old Cairo",
          acts:["The Egyptian museum","Coptic Cairo","Khan el-Khalili","Free evening"],
          p:"A morning with the Tutankhamun collection, then the Coptic quarter with the Hanging Church and Ben Ezra, and the Khan el-Khalili at the end of the afternoon, when the light in the lanes is worth the crowds. Which museum you visit depends on what is open on the day, and it is named in your written programme." },
        { d:"Day 4", place:"Luxor", h:"South to Luxor: Karnak & Luxor Temple",
          acts:["Morning flight to Luxor","Karnak Temple","The hypostyle hall","Luxor Temple at dusk"],
          p:"A short flight south. Karnak in the afternoon, and the hypostyle hall, which is the one room in Egypt that photographs do not prepare anyone for. Luxor Temple after sunset, lit, a ten-minute walk from the hotel." },
        { d:"Day 5", place:"West Bank", h:"The Valley of the Kings",
          acts:["Valley of the Kings","Temple of Hatshepsut","Colossi of Memnon","Free afternoon"],
          p:"The standard ticket covers three tombs; Seti I and Tutankhamun are extra, and we will tell you honestly which are worth it in the month you are travelling. Hatshepsut afterwards, the Colossi on the way back, and the afternoon left free. In summer the West Bank is a morning." },
        { d:"Day 6", place:"Edfu & Kom Ombo", h:"Along the Nile to Aswan",
          acts:["Esna","The temple of Horus at Edfu","Kom Ombo","Arrive Aswan"],
          p:"The river stretch, with the temples as stops. This route is written for the road, which keeps all three and gives the days back to Luxor and Aswan. If you would rather do this leg on the water, say so early: the boats run on fixed departure days and the rest of the route moves around them." },
        { d:"Day 7", place:"Aswan", h:"Aswan, and the river at its best",
          acts:["Philae Temple","The unfinished obelisk","A felucca at sunset","A Nubian village"],
          p:"Philae is reached by boat, and it is both the prettiest of the major sites and the least crowded. The afternoon is a felucca around Elephantine Island: no engine, no schedule, and the part of the week most people describe first when they get home." },
        { d:"Day 8", place:"Abu Simbel", h:"Abu Simbel at first light",
          acts:["Departure before dawn","The temple of Ramesses II","The temple of Nefertari","Back to Aswan"],
          p:"Three hours south in the dark, so that the facade is lit from the front as the sun comes up. It is a long morning and it is the right decision. Back in Aswan by early afternoon, with the evening free." },
        { d:"Day 9", place:"Aswan or Cairo", h:"Departure",
          acts:["Free morning","Transfer to the airport","Optional Cairo connection"],
          p:"Most people fly home through Cairo, and the connection is simpler than it looks on paper. With an evening flight we hold the room and fill the day. If you would rather finish on the Red Sea, that is a common ending to this route and we will quote it." }
      ],
      included:[
        "Eight nights of accommodation on the standard named in your quote",
        "Daily breakfast, and the meals named in the day-by-day above",
        "Airport transfers and all private transport inside Egypt",
        "The internal flights on the itinerary",
        "A licensed Egyptologist guide on every guided day, in Turkish, English or German",
        "Entrance to every site listed in the itinerary",
        "One local contact, reachable at any hour from landing to departure"
      ],
      notIncluded:[
        "International flights to and from Egypt",
        "The Egyptian entry visa and any consular fees",
        "Travel insurance",
        "Meals and drinks not named above",
        "The extra tickets named in the itinerary: the Great Pyramid interior, Seti I, Nefertari",
        "Optional experiences, tips, and anything of a personal nature"
      ],
      optional:[
        "A dawn hot-air balloon over the West Bank, confirmed the evening before and weather dependent",
        "The Luxor to Aswan leg by boat over three nights instead of by road in a day",
        "Three or four nights on the Red Sea added to the end of the route",
        "A second day in Cairo for the Islamic city: the Citadel, Ibn Tulun, al-Muizz street",
        "Sound and light at Karnak or at Philae"
      ],
      info:[
        ["Duration","9 days / 8 nights"],
        ["Destinations","Cairo · Giza · Luxor · Edfu & Kom Ombo · Aswan · Abu Simbel"],
        ["Travel style","Private, guided, culture-led"],
        ["Group","Private departures only. Your party, your guide, your vehicle"],
        ["Activity level","Moderate. Long visits on uneven ground, and early starts on four of the nine days"],
        ["Best for","First visits that need to cover the country, returning travellers filling the gaps, photographers"],
        ["Best months","October to April. May to September works with dawn starts and afternoons indoors"]
      ],
      notes:[
        "Opening hours, ticket rules and which tombs are open change through the year. Your written programme is checked against the current position before anything is booked.",
        "The balloon, the felucca and the Abu Simbel road all depend on weather and on the operators own safety calls. Where something cannot run we rearrange the day rather than drop it."
      ]
    },

    tr:{
      meta:"9 Gün · Kahire, Luksor ve Asvan",
      n:"En İyisiyle Mısır",
      tagline:"Dört bin yıl, inşa edildiği sırayla.",
      d:"Kahire, Luksor ve Asvan tek bir hatta: Giza platosu, Karnak'ın sütunlu salonu, kral mezarları ve aralarından geçen nehir. En kapsamlı rotamız.",
      imgAlt:"Giza piramitlerinin önünde kumu geçen bir deve kervanı",
      destinations:["Kahire","Giza","Luksor","Edfu ve Kom Ombo","Asvan","Abu Simbel"],
      overview:[
        "En İyisiyle Mısır, tam rota: Kahire ve çevresinde üç gün, antik Thebes'te üç gün ve kısa programların atladığı Luksor ile Asvan arasındaki nehir bölümü. Uzun yoldan gelen ve bunu bir kez, doğru dürüst yapmak isteyenler için kuruldu.",
        "Tempo dolu ama yorucu değil. Her yer, görülmeye değdiği saatte geziliyor: Giza ve Karnak erken, Luksor Tapınağı akşam ışığında, Abu Simbel şafakta. Aradaki öğleden sonraları bilerek boş bırakıldı. Tüm ulaşım özel, rehberli günlerde lisanslı bir Mısırbilimci var; yani burada hiçbir şey otobüs saatine göre işlemiyor."
      ],
      highlights:[
        { i:"pyramids", h:"Giza Piramitleri ve Sfenks" },
        { i:"museum",   h:"Tutankhamun koleksiyonu, tek bir salonda" },
        { i:"city",     h:"Kıpti Kahire ve Han el-Halili çarşısı" },
        { i:"temple",   h:"Karnak ve Luksor Tapınakları" },
        { i:"tomb",     h:"Kral Vadisi" },
        { i:"nile",     h:"Luksor ile Asvan arasındaki nehir" },
        { i:"sun",      h:"Şafak vakti Abu Simbel" },
        { i:"balloon",  h:"Batı Yaka üzerinde şafak balonu (opsiyonel)" }
      ],
      days:[
        { d:"1. Gün", place:"Kahire", h:"Kahire'ye varış",
          acts:["Havalimanı karşılama","Otele yerleşme","Sakin bir ilk akşam","Karşılama yemeği"],
          p:"Sizi terminalin içinde karşılıyor, otele götürüyoruz. Akşam yemeği dışında hiçbir şey planlanmadı: bu havalimanına çoğu insan yorgun iniyor ve plato, bir öğleden sonranın artığını değil, tam bir sabahı hak ediyor." },
        { d:"2. Gün", place:"Giza ve Sakkara", h:"Giza Piramitleri ve Sfenks",
          acts:["Giza platosu","Büyük Piramit'in içi","Sfenks","Sakkara ve Memfis"],
          p:"Erken başlıyoruz, çünkü platoda sessiz olan ilk saattir. Büyük Piramit'e ayrı biletle girilebiliyor. Alçak bir koridorda eğilerek çıkılan, herkesin keyif almadığı bir tırmanış; bunu kapıda değil önceden bilmenizi tercih ederiz. Öğleden sonra Sakkara ve Coser'in Basamaklı Piramidi: fikrin başladığı yer." },
        { d:"3. Gün", place:"Kahire", h:"Müze ve Eski Kahire",
          acts:["Mısır müzesi","Kıpti Kahire","Han el-Halili","Serbest akşam"],
          p:"Sabah Tutankhamun koleksiyonu, ardından Kıpti mahallede Asma Kilise ve Ben Ezra. Öğleden sonranın sonunda, dar sokaklardaki ışık kalabalığa değdiğinde Han el-Halili. Hangi müzeye gidileceği o gün neyin açık olduğuna bağlı ve yazılı programınızda adıyla belirtiliyor." },
        { d:"4. Gün", place:"Luksor", h:"Güneye, Luksor'a: Karnak ve Luksor Tapınağı",
          acts:["Sabah Luksor uçuşu","Karnak Tapınağı","Sütunlu salon","Akşam ışığında Luksor Tapınağı"],
          p:"Kısa bir uçuşla güneye. Öğleden sonra Karnak ve sütunlu salon: Mısır'da fotoğrafın kimseyi hazırlayamadığı tek mekân. Gün battıktan sonra, aydınlatılmış Luksor Tapınağı; otele on dakika yürüme mesafesinde." },
        { d:"5. Gün", place:"Batı Yaka", h:"Kral Vadisi",
          acts:["Kral Vadisi","Hatşepsut Tapınağı","Memnon Kolosları","Serbest öğleden sonra"],
          p:"Standart bilet üç mezar kapsıyor; I. Seti ve Tutankhamun ayrı biletli ve seyahat ettiğiniz ayda hangisinin değdiğini açıkça söyleriz. Ardından Hatşepsut, dönüşte Kolos'lar ve boş bırakılmış bir öğleden sonra. Yazın Batı Yaka bir sabah işidir." },
        { d:"6. Gün", place:"Edfu ve Kom Ombo", h:"Nil boyunca Asvan'a",
          acts:["Esna","Edfu'da Horus Tapınağı","Kom Ombo","Asvan'a varış"],
          p:"Nehir bölümü, tapınaklar durak olarak. Bu rota kara yolu için yazıldı: üç tapınağı da koruyor ve kazanılan günleri Luksor ile Asvan'a geri veriyor. Bu bölümü su üstünde geçmek isterseniz erken söyleyin. Gemiler sabit kalkış günlerinde çalışır ve rotanın geri kalanı onlara göre kurulur." },
        { d:"7. Gün", place:"Asvan", h:"Asvan ve nehrin en güzel hâli",
          acts:["Philae Tapınağı","Bitmemiş Obelisk","Gün batımında felucca","Nubya köyü"],
          p:"Philae'ye tekneyle gidiliyor; büyük yerler arasında hem en güzeli hem en az kalabalık olanı. Öğleden sonra Elephantine Adası çevresinde bir felucca: motor yok, program yok. Eve dönenlerin ilk anlattığı bölüm genelde burasıdır." },
        { d:"8. Gün", place:"Abu Simbel", h:"Şafak vakti Abu Simbel",
          acts:["Gün doğmadan yola çıkış","II. Ramses Tapınağı","Nefertari Tapınağı","Asvan'a dönüş"],
          p:"Karanlıkta üç saat güneye; böylece güneş doğarken cephe önden aydınlanıyor. Uzun bir sabah ve doğru karar. Öğleden sonranın başında Asvan'da oluyoruz, akşam serbest." },
        { d:"9. Gün", place:"Asvan ya da Kahire", h:"Dönüş",
          acts:["Serbest sabah","Havalimanı transferi","Opsiyonel Kahire bağlantısı"],
          p:"Çoğu kişi Kahire aktarmalı dönüyor ve bağlantı kâğıt üzerinde göründüğünden kolay. Akşam uçuşunda odayı tutar, günü doldururuz. Rotayı Kızıldeniz'de bitirmek isterseniz bu sık tercih edilen bir kapanış; fiyatlandırıp sunarız." }
      ],
      included:[
        "Teklifinizde adı geçen standartta sekiz gece konaklama",
        "Her gün kahvaltı ve yukarıdaki programda adı geçen öğünler",
        "Havalimanı transferleri ve Mısır içindeki tüm özel ulaşım",
        "Programdaki iç hat uçuşları",
        "Rehberli her günde lisanslı Mısırbilimci rehber; Türkçe, İngilizce ya da Almanca",
        "Programda yazan tüm ören yeri girişleri",
        "İnişten dönüşe kadar her saat ulaşabileceğiniz tek bir yerel irtibat"
      ],
      notIncluded:[
        "Mısır'a gidiş ve dönüş uluslararası uçuşlar",
        "Mısır giriş vizesi ve konsolosluk masrafları",
        "Seyahat sigortası",
        "Yukarıda adı geçmeyen yemek ve içecekler",
        "Programda belirtilen ek biletler: Büyük Piramit içi, I. Seti, Nefertari",
        "Opsiyonel deneyimler, bahşişler ve kişisel harcamalar"
      ],
      optional:[
        "Batı Yaka üzerinde şafak balonu; bir önceki akşam teyit edilir, hava koşullarına bağlıdır",
        "Luksor ile Asvan arasındaki bölümün bir gün yerine üç gece gemiyle yapılması",
        "Rotanın sonuna eklenen üç ya da dört gece Kızıldeniz",
        "İslami Kahire için ikinci bir gün: Kale, İbn Tulun, Muiz Sokağı",
        "Karnak ya da Philae'de ışık ve ses gösterisi"
      ],
      info:[
        ["Süre","9 gün / 8 gece"],
        ["Destinasyonlar","Kahire · Giza · Luksor · Edfu ve Kom Ombo · Asvan · Abu Simbel"],
        ["Seyahat tarzı","Özel, rehberli, kültür ağırlıklı"],
        ["Grup","Yalnızca özel hareketler. Kendi grubunuz, kendi rehberiniz, kendi aracınız"],
        ["Zorluk","Orta. Engebeli zeminde uzun geziler, dokuz günün dördünde erken kalkış"],
        ["Kimler için","Ülkeyi bir seferde görmek isteyen ilk ziyaretçiler, eksik kalanı tamamlayanlar, fotoğrafçılar"],
        ["En iyi aylar","Ekim ile nisan arası. Mayıs ile eylül arasında şafakta başlayıp öğleden sonra kapalı mekânlarla mümkün"]
      ],
      notes:[
        "Açılış saatleri, bilet kuralları ve hangi mezarların açık olduğu yıl içinde değişiyor. Yazılı programınız, hiçbir şey rezerve edilmeden önce güncel duruma göre kontrol ediliyor.",
        "Balon, felucca ve Abu Simbel yolu hava koşullarına ve işletmecilerin kendi güvenlik kararlarına bağlı. Bir şey yapılamadığında günü iptal etmiyor, yeniden kuruyoruz."
      ]
    },

    de:{
      meta:"9 Tage · Kairo, Luxor & Assuan",
      n:"Das Beste Ägyptens",
      tagline:"Viertausend Jahre, in der Reihenfolge ihrer Entstehung.",
      d:"Kairo, Luxor und Assuan in einer Linie: das Plateau von Gizeh, die Säulenhalle von Karnak, die Königsgräber und der Fluss dazwischen. Unsere umfassendste Route.",
      imgAlt:"Eine Kamelkarawane zieht vor den Pyramiden von Gizeh durch den Sand",
      destinations:["Kairo","Gizeh","Luxor","Edfu & Kom Ombo","Assuan","Abu Simbel"],
      overview:[
        "Das Beste Ägyptens ist die vollständige Route: drei Tage in und um Kairo, drei im alten Theben und jener Flussabschnitt zwischen Luxor und Assuan, den kürzere Programme auslassen. Sie ist für Reisende gebaut, die weit anreisen und das lieber einmal richtig machen, als für die fehlende Hälfte wiederzukommen.",
        "Das Tempo ist voll, aber nicht zermürbend. Jede Stätte wird zu der Stunde besucht, zu der sie es wert ist: Gizeh und Karnak früh, der Luxor-Tempel in der Dämmerung, Abu Simbel im ersten Licht. Die Nachmittage dazwischen bleiben bewusst offen. Sie reisen durchgehend privat, an jedem geführten Tag mit einem lizenzierten Ägyptologen. Hier läuft nichts nach Busfahrplan."
      ],
      highlights:[
        { i:"pyramids", h:"Die Pyramiden von Gizeh & die Sphinx" },
        { i:"museum",   h:"Die Tutanchamun-Sammlung, in einem Raum" },
        { i:"city",     h:"Das koptische Kairo & der Basar Chan el-Chalili" },
        { i:"temple",   h:"Karnak- & Luxor-Tempel" },
        { i:"tomb",     h:"Das Tal der Könige" },
        { i:"nile",     h:"Der Fluss zwischen Luxor und Assuan" },
        { i:"sun",      h:"Abu Simbel im ersten Licht" },
        { i:"balloon",  h:"Eine Ballonfahrt über dem Westufer im Morgengrauen (optional)" }
      ],
      days:[
        { d:"Tag 1", place:"Kairo", h:"Ankunft in Kairo",
          acts:["Flughafentransfer","Check-in im Hotel","Ein ruhiger erster Abend","Willkommensessen"],
          p:"Wir holen Sie im Terminal ab und bringen Sie ins Hotel. Außer dem Abendessen ist nichts geplant: Die meisten erreichen diesen Flughafen müde, und das Plateau verdient einen Vormittag und nicht den Rest eines Nachmittags." },
        { d:"Tag 2", place:"Gizeh & Sakkara", h:"Die Pyramiden von Gizeh & die Sphinx",
          acts:["Das Plateau von Gizeh","Im Inneren der Cheops-Pyramide","Die Sphinx","Sakkara & Memphis"],
          p:"Früher Start, denn die erste Stunde auf dem Plateau ist die ruhige. Die Cheops-Pyramide lässt sich mit einem gesonderten Ticket betreten. Es ist ein gebückter Aufstieg durch einen niedrigen Gang, der nicht jedem Freude macht; das sollten Sie vorher wissen, nicht am Eingang. Nachmittags Sakkara und die Stufenpyramide des Djoser, wo die ganze Idee beginnt." },
        { d:"Tag 3", place:"Kairo", h:"Das Museum und Alt-Kairo",
          acts:["Das ägyptische Museum","Koptisches Kairo","Chan el-Chalili","Freier Abend"],
          p:"Ein Vormittag bei der Tutanchamun-Sammlung, danach das koptische Viertel mit der Hängenden Kirche und Ben Esra, und am späten Nachmittag der Chan el-Chalili, wenn das Licht in den Gassen die Menge aufwiegt. Welches Museum besucht wird, hängt davon ab, was an dem Tag geöffnet ist, und steht namentlich in Ihrem Programm." },
        { d:"Tag 4", place:"Luxor", h:"Nach Süden: Karnak & Luxor-Tempel",
          acts:["Vormittagsflug nach Luxor","Karnak-Tempel","Die Säulenhalle","Luxor-Tempel in der Dämmerung"],
          p:"Ein kurzer Flug nach Süden. Nachmittags Karnak und die große Säulenhalle, der eine Raum in Ägypten, auf den kein Foto vorbereitet. Nach Sonnenuntergang der beleuchtete Luxor-Tempel, zehn Gehminuten vom Hotel." },
        { d:"Tag 5", place:"Westufer", h:"Das Tal der Könige",
          acts:["Tal der Könige","Tempel der Hatschepsut","Memnonkolosse","Freier Nachmittag"],
          p:"Das Standardticket umfasst drei Gräber; Sethos I. und Tutanchamun kosten extra, und wir sagen Ihnen offen, welches sich im Monat Ihrer Reise lohnt. Danach Hatschepsut, auf dem Rückweg die Kolosse, und ein bewusst freier Nachmittag: Im Sommer ist das Westufer eine Vormittagssache." },
        { d:"Tag 6", place:"Edfu & Kom Ombo", h:"Den Nil entlang nach Assuan",
          acts:["Esna","Der Horus-Tempel von Edfu","Kom Ombo","Ankunft in Assuan"],
          p:"Der Flussabschnitt, mit den Tempeln als Stationen. Diese Route ist für die Straße geschrieben: Sie behält alle drei und gibt die gewonnenen Tage an Luxor und Assuan zurück. Wenn Sie diesen Abschnitt lieber auf dem Wasser zurücklegen, sagen Sie es früh. Die Schiffe fahren an festen Tagen, und die übrige Route ordnet sich ihnen unter." },
        { d:"Tag 7", place:"Assuan", h:"Assuan, und der Fluss von seiner besten Seite",
          acts:["Philae-Tempel","Der unvollendete Obelisk","Eine Feluke bei Sonnenuntergang","Ein nubisches Dorf"],
          p:"Philae erreicht man mit dem Boot; es ist zugleich die schönste der großen Stätten und die am wenigsten überlaufene. Nachmittags eine Feluke um die Insel Elephantine: kein Motor, kein Zeitplan, und meist das Erste, wovon zu Hause erzählt wird." },
        { d:"Tag 8", place:"Abu Simbel", h:"Abu Simbel im ersten Licht",
          acts:["Abfahrt vor Sonnenaufgang","Der Tempel Ramses II.","Der Tempel der Nefertari","Zurück nach Assuan"],
          p:"Drei Stunden im Dunkeln nach Süden, damit die Fassade von vorn beleuchtet ist, wenn die Sonne aufgeht. Ein langer Vormittag und die richtige Entscheidung. Am frühen Nachmittag zurück in Assuan, der Abend ist frei." },
        { d:"Tag 9", place:"Assuan oder Kairo", h:"Abreise",
          acts:["Freier Vormittag","Transfer zum Flughafen","Optionale Kairo-Verbindung"],
          p:"Die meisten fliegen über Kairo zurück, und die Verbindung ist einfacher, als sie auf dem Papier aussieht. Bei einem Abendflug halten wir das Zimmer und füllen den Tag. Wenn Sie am Roten Meer enden möchten: ein häufiger Abschluss dieser Route, den wir Ihnen gern kalkulieren." }
      ],
      included:[
        "Acht Übernachtungen in der in Ihrem Angebot genannten Kategorie",
        "Täglich Frühstück sowie die oben genannten Mahlzeiten",
        "Flughafentransfers und sämtliche private Beförderung innerhalb Ägyptens",
        "Die Inlandsflüge des Programms",
        "An jedem geführten Tag ein lizenzierter ägyptologischer Guide, auf Türkisch, Englisch oder Deutsch",
        "Eintritt zu allen im Programm genannten Stätten",
        "Ein örtlicher Ansprechpartner, rund um die Uhr erreichbar"
      ],
      notIncluded:[
        "Internationale Flüge nach und von Ägypten",
        "Das ägyptische Einreisevisum und konsularische Gebühren",
        "Reiseversicherung",
        "Nicht genannte Mahlzeiten und Getränke",
        "Die im Programm genannten Zusatztickets: Inneres der Cheops-Pyramide, Sethos I., Nefertari",
        "Optionale Erlebnisse, Trinkgelder und persönliche Ausgaben"
      ],
      optional:[
        "Eine Ballonfahrt über dem Westufer im Morgengrauen; am Vorabend bestätigt und wetterabhängig",
        "Der Abschnitt Luxor bis Assuan per Schiff über drei Nächte statt an einem Tag auf der Straße",
        "Drei oder vier Nächte am Roten Meer am Ende der Route",
        "Ein zweiter Tag in Kairo für die islamische Stadt: Zitadelle, Ibn Tulun, al-Muizz-Straße",
        "Ton- und Lichtshow in Karnak oder auf Philae"
      ],
      info:[
        ["Dauer","9 Tage / 8 Nächte"],
        ["Ziele","Kairo · Gizeh · Luxor · Edfu & Kom Ombo · Assuan · Abu Simbel"],
        ["Reisestil","Privat, geführt, kulturbetont"],
        ["Gruppe","Ausschließlich private Abreisen. Ihre Gruppe, Ihr Guide, Ihr Fahrzeug"],
        ["Anspruch","Mittel. Lange Besichtigungen auf unebenem Boden, an vier von neun Tagen früher Start"],
        ["Geeignet für","Erstbesuche, die das Land abdecken sollen, Wiederkehrende, Fotografierende"],
        ["Beste Monate","Oktober bis April. Mai bis September mit Start im Morgengrauen und Nachmittagen im Innenraum"]
      ],
      notes:[
        "Öffnungszeiten, Ticketregeln und die Frage, welche Gräber geöffnet sind, ändern sich im Jahresverlauf. Ihr schriftliches Programm wird vor jeder Buchung gegen den aktuellen Stand geprüft.",
        "Ballon, Feluke und die Straße nach Abu Simbel hängen vom Wetter und von den Sicherheitsentscheidungen der Betreiber ab. Was nicht stattfinden kann, wird umgelegt und nicht gestrichen."
      ]
    }

    } },

  /* ==========================================================
     02 · EGYPT FAMILY HOLIDAY
     Composed by us from confirmed parts. The shape — one base on
     the coast, a single culture block in the middle of the week
     — is the proposal; the day count and the Hurghada / Luxor
     hotel split still need the client's sign-off.
     ========================================================== */
  { id:"egypt-family-holiday", days:7, nights:6,
    img:"assets/images/tours/red-sea-coast-1100.webp", iw:1100, ih:825,
    hero:{ base:"assets/images/hero/redsea-1", widths:[1200,2000], w:2000, h:1260 },
    price:{ from:null, currency:"EUR", per:"person" },
    t:{

    en:{
      meta:"7 days · Hurghada & Luxor",
      n:"Egypt Family Holiday",
      tagline:"The Red Sea at a family's pace, and one great day among the pharaohs.",
      d:"A week built around one hotel on the Red Sea: an island boat day, an afternoon in the desert, and two days in Luxor. Short travel days, early nights, nothing that has to be endured.",
      imgAlt:"Red Sea coastline where the desert mountains meet the water",
      destinations:["Hurghada","The Red Sea islands","Luxor East Bank","Luxor West Bank"],
      overview:[
        "This is the route we plan most often for families, and it turns on one decision: a single base on the Red Sea rather than a new hotel every night. Children unpack once. The sea is twenty minutes from breakfast. The two Luxor days are the only ones that involve a road, and they sit in the middle of the week, when everybody is rested.",
        "Everything on land is private, so the day starts when your family starts rather than when a coach fills. Where an activity carries an age or a height limit, such as the quad bikes or an introductory dive, we say so before you book rather than at the door, and there is always something for whoever cannot join in."
      ],
      highlights:[
        { i:"sea",     h:"Free beach days on the Red Sea" },
        { i:"island",  h:"A boat day out to the islands" },
        { i:"snorkel", h:"Snorkelling in shallow, sheltered water" },
        { i:"desert",  h:"A desert safari late in the day" },
        { i:"bedouin", h:"Dinner and stars at a Bedouin camp" },
        { i:"city",    h:"Hurghada old town and the marina" },
        { i:"temple",  h:"Karnak and Luxor Temple" },
        { i:"tomb",    h:"The Valley of the Kings" }
      ],
      days:[
        { d:"Day 1", place:"Hurghada", h:"Arrival in Hurghada",
          acts:["Airport transfer","Hotel check-in","An easy first evening","Dinner"],
          p:"Twenty minutes from the airport to the hotel. Nothing is planned for the first evening on purpose: with children the first day belongs to the pool and an early night." },
        { d:"Day 2", place:"Hurghada", h:"The town, and the sea",
          acts:["The old town and Sekalla","The fish market","The marina","A free afternoon on the beach"],
          p:"A short morning in town takes in the old quarter, the fish market and the marina, and the whole afternoon is free. This is the day the week settles down, and it is deliberately the emptiest one." },
        { d:"Day 3", place:"The Red Sea", h:"The island boat day",
          acts:["Boat out to the islands","Two snorkelling stops","Lunch on board","Beach time"],
          p:"Out at nine, back by late afternoon. The snorkelling stops are chosen for shallow, sheltered water rather than for depth, and the crew stays in the water with the children throughout. Anyone who would rather not swim stays on the boat and misses nothing." },
        { d:"Day 4", place:"The Eastern Desert", h:"The desert, late in the day",
          acts:["4x4 desert safari","Camel ride","A Bedouin camp","Dinner under the stars"],
          p:"The desert is a late-afternoon place, not a midday one. Quad bikes are available to the adults and to older children where the operator's age and height limits allow; where they do not, the 4x4 covers the same ground and nobody sits the evening out." },
        { d:"Day 5", place:"Luxor", h:"To Luxor: Karnak & Luxor Temple",
          acts:["Morning road transfer","Karnak Temple","The Luxor Museum","Luxor Temple after dark"],
          p:"About four hours across the desert road, with a stop. Karnak after lunch, when the hall is at its most theatrical, then the museum, which is small and superbly lit. Luxor Temple lit after dinner is a ten-minute walk from the hotel and the part children tend to remember." },
        { d:"Day 6", place:"West Bank", h:"The Valley of the Kings, then back to the coast",
          acts:["Valley of the Kings","Temple of Hatshepsut","Colossi of Memnon","Return to Hurghada"],
          p:"An early start, three tombs, and out of the valley before the heat. Hatshepsut and the Colossi on the way, then the road back to the sea in the afternoon. It is the one long day of the week and it is placed where a family can absorb it." },
        { d:"Day 7", place:"Hurghada", h:"A last morning on the Red Sea",
          acts:["Free morning","Late check-out where possible","Airport transfer"],
          p:"One more morning in the water. We hold the transfer as late as your flight allows, and where the hotel will give a late check-out we ask for it as a matter of course rather than as a favour." }
      ],
      included:[
        "Six nights of accommodation on the standard named in your quote: five on the Red Sea, one in Luxor",
        "Daily breakfast, and the meals named in the day-by-day above",
        "Airport transfers, the Luxor road transfer, and all private transport on land",
        "A licensed Egyptologist guide on both Luxor days, in Turkish, English or German",
        "Entrance to every site listed in the itinerary",
        "The island boat day with lunch and snorkelling equipment, and the desert evening with dinner",
        "One local contact, reachable at any hour"
      ],
      notIncluded:[
        "International flights to and from Egypt",
        "The Egyptian entry visa and any consular fees",
        "Travel insurance",
        "Meals and drinks not named above",
        "Optional experiences and any extra tomb tickets",
        "Tips, and anything of a personal nature"
      ],
      optional:[
        "A dawn hot-air balloon over the West Bank on the Luxor morning, weather dependent",
        "Quad bikes on the desert afternoon, where age and height limits allow",
        "An introductory dive for beginners, subject to a medical questionnaire and a minimum age",
        "A glass-bottom boat for children who would rather look than swim",
        "A day in Cairo by air, added at either end of the week"
      ],
      info:[
        ["Duration","7 days / 6 nights"],
        ["Destinations","Hurghada · the Red Sea islands · Luxor"],
        ["Travel style","Relaxed and sea-based, with one culture block in the middle"],
        ["Group","Private on land. Your family, your guide, your vehicle. Boats may be shared"],
        ["Activity level","Easy. One long road day and one early start"],
        ["Best for","Families with children, mixed-age groups, and first visits to Egypt"],
        ["Best months","October to May on the coast. The Luxor days are much easier outside July and August"]
      ],
      notes:[
        "Water sports carry the operators own age, height and medical limits. We will tell you what they are for your party before you book, not on the jetty.",
        "The Luxor road transfer is about four hours each way. Where a family would rather fly it, connections exist and we will quote them.",
        "This route is our proposal rather than a fixed departure. The number of nights and the Hurghada to Luxor split are both easy to move. Tell us your dates and who is coming and we will rewrite it."
      ]
    },

    tr:{
      meta:"7 Gün · Hurghada ve Luksor",
      n:"Ailece Mısır Tatili",
      tagline:"Kızıldeniz'de aile temposu ve firavunlarla geçen tek bir büyük gün.",
      d:"Kızıldeniz'de tek bir otel çevresinde kurulmuş bir hafta: adalara tekne günü, çölde bir öğleden sonra ve Luksor'da iki gün. Kısa yol günleri, erken akşamlar, katlanılacak hiçbir şey yok.",
      imgAlt:"Çöl dağlarının denizle buluştuğu Kızıldeniz kıyısı",
      destinations:["Hurghada","Kızıldeniz adaları","Luksor Doğu Yaka","Luksor Batı Yaka"],
      overview:[
        "Aileler için en sık kurduğumuz rota bu ve tek bir karar üzerine oturuyor: her gece yeni bir otel yerine Kızıldeniz'de tek bir üs. Çocuklar bavulu bir kez açıyor. Deniz, kahvaltıdan yirmi dakika uzakta. Yol içeren tek bölüm Luksor'daki iki gün ve o da haftanın ortasında, herkes dinlenmişken.",
        "Karadaki her şey özel; yani gün, otobüs dolduğunda değil sizin aileniz hazır olduğunda başlıyor. Bir aktivitede yaş ya da boy sınırı varsa, örneğin ATV ya da deneme dalışında, bunu kapıda değil rezervasyondan önce söylüyoruz ve katılamayan için her zaman bir alternatif oluyor."
      ],
      highlights:[
        { i:"sea",     h:"Kızıldeniz'de serbest plaj günleri" },
        { i:"island",  h:"Adalara tekne günü" },
        { i:"snorkel", h:"Sığ ve korunaklı suda şnorkelle yüzme" },
        { i:"desert",  h:"Günün sonunda çöl safarisi" },
        { i:"bedouin", h:"Bedevi kampında akşam yemeği ve yıldızlar" },
        { i:"city",    h:"Hurghada eski şehir ve marina" },
        { i:"temple",  h:"Karnak ve Luksor Tapınağı" },
        { i:"tomb",    h:"Kral Vadisi" }
      ],
      days:[
        { d:"1. Gün", place:"Hurghada", h:"Hurghada'ya varış",
          acts:["Havalimanı transferi","Otele yerleşme","Sakin bir ilk akşam","Akşam yemeği"],
          p:"Havalimanından otele yirmi dakika. İlk akşam bilerek boş: çocuklu bir seyahatte ilk gün havuzun ve erken uykunun günüdür." },
        { d:"2. Gün", place:"Hurghada", h:"Şehir ve deniz",
          acts:["Eski şehir ve Sekalla","Balık pazarı","Marina","Serbest öğleden sonra"],
          p:"Şehirde kısa bir sabah: eski mahalle, balık pazarı ve marina. Ardından tamamen serbest bir öğleden sonra. Haftanın oturduğu gün budur ve bilerek en boş gündür." },
        { d:"3. Gün", place:"Kızıldeniz", h:"Adalara tekne günü",
          acts:["Adalara tekne","İki şnorkel durağı","Teknede öğle yemeği","Plaj zamanı"],
          p:"Dokuzda çıkış, öğleden sonranın sonunda dönüş. Şnorkel durakları derinliğe göre değil, sığ ve korunaklı suya göre seçiliyor; ekip çocuklarla birlikte suda kalıyor. Yüzmek istemeyen teknede kalıyor ve hiçbir şey kaçırmıyor." },
        { d:"4. Gün", place:"Doğu Çölü", h:"Günün sonunda çöl",
          acts:["4x4 çöl safarisi","Deve turu","Bedevi kampı","Yıldızlar altında akşam yemeği"],
          p:"Çöl öğle vaktinin değil, günün sonunun yeridir. ATV yetişkinler ve işletmecinin yaş ve boy sınırlarına uyan büyük çocuklar için var; uymadığında 4x4 aynı araziyi geziyor ve kimse akşamın dışında kalmıyor." },
        { d:"5. Gün", place:"Luksor", h:"Luksor'a: Karnak ve Luksor Tapınağı",
          acts:["Sabah kara yolu transferi","Karnak Tapınağı","Luksor Müzesi","Karanlıkta Luksor Tapınağı"],
          p:"Çöl yolunda molalı yaklaşık dört saat. Öğleden sonra, salonun en etkileyici olduğu saatte Karnak; ardından küçük ve çok iyi aydınlatılmış müze. Akşam yemeğinden sonra aydınlatılmış Luksor Tapınağı otele on dakika yürüme mesafesinde ve çocukların aklında kalan kısım genelde burası." },
        { d:"6. Gün", place:"Batı Yaka", h:"Kral Vadisi ve kıyıya dönüş",
          acts:["Kral Vadisi","Hatşepsut Tapınağı","Memnon Kolosları","Hurghada'ya dönüş"],
          p:"Erken kalkış, üç mezar ve sıcak basmadan vadiden çıkış. Yolda Hatşepsut ve Kolos'lar, ardından öğleden sonra denize dönüş. Haftanın tek uzun günü ve bir ailenin kaldırabileceği yere yerleştirildi." },
        { d:"7. Gün", place:"Hurghada", h:"Kızıldeniz'de son bir sabah",
          acts:["Serbest sabah","Mümkünse geç çıkış","Havalimanı transferi"],
          p:"Suda bir sabah daha. Transferi uçuşunuzun izin verdiği kadar geç tutuyoruz ve otel geç çıkış veriyorsa bunu bir lütuf gibi değil, olağan bir talep olarak istiyoruz." }
      ],
      included:[
        "Teklifinizde adı geçen standartta altı gece konaklama: beş gece Kızıldeniz, bir gece Luksor",
        "Her gün kahvaltı ve yukarıdaki programda adı geçen öğünler",
        "Havalimanı transferleri, Luksor kara yolu transferi ve karadaki tüm özel ulaşım",
        "Her iki Luksor gününde lisanslı Mısırbilimci rehber; Türkçe, İngilizce ya da Almanca",
        "Programda yazan tüm ören yeri girişleri",
        "Öğle yemeği ve şnorkel ekipmanıyla ada tekne günü; akşam yemeğiyle çöl akşamı",
        "Her saat ulaşabileceğiniz tek bir yerel irtibat"
      ],
      notIncluded:[
        "Mısır'a gidiş ve dönüş uluslararası uçuşlar",
        "Mısır giriş vizesi ve konsolosluk masrafları",
        "Seyahat sigortası",
        "Yukarıda adı geçmeyen yemek ve içecekler",
        "Opsiyonel deneyimler ve ek mezar biletleri",
        "Bahşişler ve kişisel harcamalar"
      ],
      optional:[
        "Luksor sabahında Batı Yaka üzerinde şafak balonu, hava koşullarına bağlı",
        "Çöl öğleden sonrasında ATV; yaş ve boy sınırlarının izin verdiği ölçüde",
        "Yeni başlayanlar için deneme dalışı; sağlık formu ve alt yaş sınırına tabi",
        "Yüzmek yerine bakmayı tercih eden çocuklar için cam tabanlı tekne",
        "Haftanın başına ya da sonuna uçakla eklenen bir Kahire günü"
      ],
      info:[
        ["Süre","7 gün / 6 gece"],
        ["Destinasyonlar","Hurghada · Kızıldeniz adaları · Luksor"],
        ["Seyahat tarzı","Sakin, deniz merkezli; ortada tek bir kültür bloğu"],
        ["Grup","Karada özel. Kendi aileniz, rehberiniz, aracınız. Tekneler paylaşımlı olabilir"],
        ["Zorluk","Kolay. Bir uzun yol günü ve bir erken kalkış"],
        ["Kimler için","Çocuklu aileler, karma yaş grupları ve Mısır'a ilk gelenler"],
        ["En iyi aylar","Kıyıda ekim ile mayıs arası. Luksor günleri temmuz ve ağustos dışında çok daha rahat"]
      ],
      notes:[
        "Su sporlarında yaş, boy ve sağlık sınırlarını işletmeciler koyuyor. Bunları iskelede değil, rezervasyondan önce sizin grubunuz için söylüyoruz.",
        "Luksor kara yolu transferi tek yön yaklaşık dört saat. Uçmayı tercih eden aileler için bağlantılar mevcut ve fiyatlandırıyoruz.",
        "Bu rota sabit bir hareket değil, bizim önerimiz. Gece sayısı ve Hurghada ile Luksor dağılımı kolayca değişir; tarihlerinizi ve kimlerin geleceğini yazın, yeniden kuralım."
      ]
    },

    de:{
      meta:"7 Tage · Hurghada & Luxor",
      n:"Ägypten für Familien",
      tagline:"Das Rote Meer im Familientempo, und ein großer Tag bei den Pharaonen.",
      d:"Eine Woche um ein einziges Hotel am Roten Meer: ein Bootstag zu den Inseln, ein Nachmittag in der Wüste und zwei Tage in Luxor. Kurze Fahrtage, frühe Abende, nichts, was man aushalten muss.",
      imgAlt:"Küste des Roten Meeres, wo die Wüstenberge auf das Wasser treffen",
      destinations:["Hurghada","Die Inseln im Roten Meer","Luxor Ostufer","Luxor Westufer"],
      overview:[
        "Diese Route planen wir für Familien am häufigsten, und sie hängt an einer Entscheidung: ein fester Standort am Roten Meer statt jede Nacht ein neues Hotel. Die Kinder packen einmal aus. Das Meer liegt zwanzig Minuten hinter dem Frühstück. Nur die beiden Luxor-Tage bedeuten Straße, und sie liegen in der Wochenmitte, wenn alle ausgeruht sind.",
        "An Land ist alles privat: Der Tag beginnt, wenn Ihre Familie so weit ist, und nicht, wenn ein Bus voll ist. Wo eine Aktivität eine Alters- oder Größengrenze hat, etwa die Quads oder ein Schnuppertauchgang, sagen wir das vor der Buchung und nicht am Steg, und für alle, die nicht mitmachen können, gibt es immer etwas anderes."
      ],
      highlights:[
        { i:"sea",     h:"Freie Strandtage am Roten Meer" },
        { i:"island",  h:"Ein Bootstag zu den Inseln" },
        { i:"snorkel", h:"Schnorcheln im flachen, geschützten Wasser" },
        { i:"desert",  h:"Eine Wüstensafari am späten Nachmittag" },
        { i:"bedouin", h:"Abendessen und Sterne im Beduinencamp" },
        { i:"city",    h:"Die Altstadt von Hurghada und die Marina" },
        { i:"temple",  h:"Karnak- und Luxor-Tempel" },
        { i:"tomb",    h:"Das Tal der Könige" }
      ],
      days:[
        { d:"Tag 1", place:"Hurghada", h:"Ankunft in Hurghada",
          acts:["Flughafentransfer","Check-in im Hotel","Ein ruhiger erster Abend","Abendessen"],
          p:"Zwanzig Minuten vom Flughafen zum Hotel. Für den ersten Abend ist bewusst nichts geplant: Mit Kindern gehört der erste Tag dem Pool und einem frühen Abend." },
        { d:"Tag 2", place:"Hurghada", h:"Die Stadt und das Meer",
          acts:["Altstadt und Sekalla","Der Fischmarkt","Die Marina","Ein freier Nachmittag am Strand"],
          p:"Ein kurzer Vormittag in der Stadt: das alte Viertel, der Fischmarkt, die Marina. Der ganze Nachmittag bleibt frei. An diesem Tag kommt die Woche zur Ruhe, und er ist absichtlich der leerste." },
        { d:"Tag 3", place:"Rotes Meer", h:"Der Bootstag zu den Inseln",
          acts:["Mit dem Boot zu den Inseln","Zwei Schnorchelstopps","Mittagessen an Bord","Zeit am Strand"],
          p:"Um neun hinaus, am späten Nachmittag zurück. Die Schnorchelstopps sind nach flachem, geschütztem Wasser ausgesucht und nicht nach Tiefe, und die Crew bleibt durchgehend mit den Kindern im Wasser. Wer lieber nicht schwimmt, bleibt an Bord und verpasst nichts." },
        { d:"Tag 4", place:"Östliche Wüste", h:"Die Wüste am späten Nachmittag",
          acts:["4x4-Wüstensafari","Kamelritt","Ein Beduinencamp","Abendessen unter Sternen"],
          p:"Die Wüste ist ein Ort für den späten Nachmittag, nicht für die Mittagszeit. Quads gibt es für Erwachsene und für ältere Kinder, soweit die Alters- und Größengrenzen des Betreibers es zulassen; sonst fährt der Geländewagen dieselbe Strecke, und niemand sitzt den Abend aus." },
        { d:"Tag 5", place:"Luxor", h:"Nach Luxor: Karnak & Luxor-Tempel",
          acts:["Transfer am Vormittag","Karnak-Tempel","Das Luxor-Museum","Luxor-Tempel nach Einbruch der Dunkelheit"],
          p:"Rund vier Stunden über die Wüstenstraße, mit Pause. Karnak am Nachmittag, wenn die Halle am eindrucksvollsten ist, danach das Museum, klein und hervorragend beleuchtet. Der beleuchtete Luxor-Tempel nach dem Abendessen liegt zehn Gehminuten vom Hotel und bleibt Kindern meist am stärksten in Erinnerung." },
        { d:"Tag 6", place:"Westufer", h:"Das Tal der Könige, dann zurück ans Meer",
          acts:["Tal der Könige","Tempel der Hatschepsut","Memnonkolosse","Rückfahrt nach Hurghada"],
          p:"Früher Start, drei Gräber und aus dem Tal heraus, bevor die Hitze kommt. Unterwegs Hatschepsut und die Kolosse, am Nachmittag zurück ans Meer. Es ist der eine lange Tag der Woche und liegt dort, wo eine Familie ihn verkraftet." },
        { d:"Tag 7", place:"Hurghada", h:"Ein letzter Morgen am Roten Meer",
          acts:["Freier Vormittag","Später Check-out, wo möglich","Flughafentransfer"],
          p:"Noch ein Vormittag im Wasser. Wir legen den Transfer so spät, wie Ihr Flug es erlaubt, und wo das Hotel einen späten Check-out gewährt, fragen wir ihn selbstverständlich an." }
      ],
      included:[
        "Sechs Übernachtungen in der in Ihrem Angebot genannten Kategorie: fünf am Roten Meer, eine in Luxor",
        "Täglich Frühstück sowie die oben genannten Mahlzeiten",
        "Flughafentransfers, der Transfer nach Luxor und sämtliche private Beförderung an Land",
        "An beiden Luxor-Tagen ein lizenzierter ägyptologischer Guide, auf Türkisch, Englisch oder Deutsch",
        "Eintritt zu allen im Programm genannten Stätten",
        "Der Bootstag mit Mittagessen und Schnorchelausrüstung sowie der Wüstenabend mit Abendessen",
        "Ein örtlicher Ansprechpartner, rund um die Uhr erreichbar"
      ],
      notIncluded:[
        "Internationale Flüge nach und von Ägypten",
        "Das ägyptische Einreisevisum und konsularische Gebühren",
        "Reiseversicherung",
        "Nicht genannte Mahlzeiten und Getränke",
        "Optionale Erlebnisse und zusätzliche Grabtickets",
        "Trinkgelder und persönliche Ausgaben"
      ],
      optional:[
        "Eine Ballonfahrt über dem Westufer am Luxor-Morgen, wetterabhängig",
        "Quads am Wüstennachmittag, soweit Alters- und Größengrenzen es zulassen",
        "Ein Schnuppertauchgang, mit medizinischem Fragebogen und Mindestalter",
        "Ein Glasbodenboot für Kinder, die lieber schauen als schwimmen",
        "Ein Tag in Kairo per Flug, am Anfang oder Ende der Woche"
      ],
      info:[
        ["Dauer","7 Tage / 6 Nächte"],
        ["Ziele","Hurghada · die Inseln im Roten Meer · Luxor"],
        ["Reisestil","Entspannt und am Meer, mit einem Kulturblock in der Mitte"],
        ["Gruppe","An Land privat. Ihre Familie, Ihr Guide, Ihr Fahrzeug. Boote können geteilt sein"],
        ["Anspruch","Leicht. Ein langer Fahrtag und ein früher Start"],
        ["Geeignet für","Familien mit Kindern, Gruppen unterschiedlichen Alters, erste Ägyptenreisen"],
        ["Beste Monate","An der Küste Oktober bis Mai. Die Luxor-Tage sind außerhalb von Juli und August deutlich angenehmer"]
      ],
      notes:[
        "Bei Wassersport setzen die Betreiber eigene Alters-, Größen- und Gesundheitsgrenzen. Wir nennen sie Ihnen vor der Buchung und nicht am Steg.",
        "Der Transfer nach Luxor dauert etwa vier Stunden je Richtung. Wer lieber fliegt: Es gibt Verbindungen, und wir kalkulieren sie.",
        "Diese Route ist unser Vorschlag, keine feste Abreise. Nächtezahl und die Aufteilung zwischen Hurghada und Luxor lassen sich leicht ändern. Schreiben Sie uns Ihre Termine und wer mitkommt, dann schreiben wir sie neu."
      ]
    }

    } },

  /* ==========================================================
     03 · HURGHADA ADVENTURE — 4 days
     Day structure confirmed by the client: city, desert, diving,
     islands. The wording around weather, certification and the
     no-fly interval after diving is ours, and is deliberately
     conditional: none of it may read as a guarantee.
     ========================================================== */
  { id:"hurghada-adventure", days:4, nights:3,
    img:"assets/images/tours/red-sea-reef-1100.webp", iw:1100, ih:825,
    hero:{ base:"assets/images/hero/redsea-1", widths:[1200,2000], w:2000, h:1260 },
    price:{ from:null, currency:"EUR", per:"person" },
    t:{

    en:{
      meta:"4 days · Hurghada",
      n:"Hurghada Adventure",
      tagline:"Desert, reef and island, in four days.",
      d:"Four days on the Red Sea with one thing in each: the town, a desert night with the Bedouin, a full day's diving, and a boat out to the islands.",
      imgAlt:"A wall of coral and shoals of orange anthias on a Red Sea reef",
      destinations:["Hurghada","The Eastern Desert","The Red Sea reefs","Giftun and the islands"],
      overview:[
        "Four days is enough for the Red Sea if the days are built properly. This route gives each of them one thing: the town on the first, the desert on the second, the reef on the third, the islands on the fourth. Nothing is doubled up and no morning starts earlier than it needs to.",
        "It suits a long weekend, an addition to a longer trip, or a first look at Egypt for people who would rather be in the water than in a museum. Diving is the centre of the third day and is run by a certified operator; certification, the medical questionnaire and the minimum age are all settled before you arrive rather than on the jetty."
      ],
      highlights:[
        { i:"city",    h:"Hurghada old town and the marina" },
        { i:"desert",  h:"A 4x4 safari into the Eastern Desert" },
        { i:"atv",     h:"The quad-bike stage, on a marked course" },
        { i:"bedouin", h:"A Bedouin camp, dinner and stars" },
        { i:"dive",    h:"A full day's diving on the Red Sea" },
        { i:"snorkel", h:"Snorkelling from the same boat for non-divers" },
        { i:"island",  h:"A boat day out to the islands" },
        { i:"sea",     h:"Some of the clearest water anywhere" }
      ],
      days:[
        { d:"Day 1", place:"Hurghada", h:"Arrival & the city",
          acts:["Airport transfer","Hotel check-in","Hurghada city tour","An evening at the marina","Dinner"],
          p:"Met at the airport and into the hotel by early afternoon. The city tour takes in the old quarter, the fish market and the mosque, and finishes at the marina, which is where the evening goes." },
        { d:"Day 2", place:"The Eastern Desert", h:"Desert safari & a Bedouin evening",
          acts:["4x4 desert safari","Quad bikes","Camel ride","A Bedouin camp and dinner","Stars"],
          p:"Out into the Eastern Desert late in the afternoon, when the light is worth having and the ground has come off the boil. The quad stage runs on a marked course with a guide in front and one behind. Dinner at the camp, and a sky that people who live in cities do not expect." },
        { d:"Day 3", place:"The Red Sea", h:"A full day's diving",
          acts:["Boat out to the reefs","Two dives for certified divers","An introductory dive for beginners","Snorkelling and lunch on board"],
          p:"A full day on the water. Certified divers get two dives; anyone without a certificate can make a supervised introductory dive with an instructor, and anyone who would rather not can snorkel from the same boat. The sites are chosen on the morning by the skipper according to wind and swell, which is the only way this is done properly." },
        { d:"Day 4", place:"Giftun", h:"The islands, then the airport",
          acts:["Morning boat to the islands","Snorkelling","Beach time","Transfer to the airport"],
          p:"The last morning belongs to the islands: white sand, shallow water and a reef you can swim to from the beach. Back at the marina by mid-afternoon and at the airport with time in hand." }
      ],
      included:[
        "Three nights of accommodation in Hurghada, on the standard named in your quote",
        "Airport transfers and all private transport on land",
        "Daily breakfast, and the meals named in the day-by-day above",
        "The desert safari, with the Bedouin camp and dinner",
        "The diving day, with boat, tanks, weights and a certified instructor or divemaster",
        "The island boat day, with lunch and snorkelling equipment",
        "One local contact, reachable at any hour"
      ],
      notIncluded:[
        "International flights to and from Egypt",
        "The Egyptian entry visa and any consular fees",
        "Travel insurance, including any diving cover you may need",
        "Dive equipment hire beyond tanks and weights, and any certification course",
        "Meals and drinks not named above",
        "Optional experiences, tips, and anything of a personal nature"
      ],
      optional:[
        "An introductory dive for beginners, subject to a medical questionnaire and a minimum age",
        "A certification course over the four days, which changes the shape of the week, so ask early",
        "A night dive, where conditions and the operator allow",
        "A private boat rather than a shared one on either water day",
        "A day trip to Luxor, or to Cairo by air"
      ],
      info:[
        ["Duration","4 days / 3 nights"],
        ["Destinations","Hurghada · the Eastern Desert · the Red Sea reefs · Giftun"],
        ["Travel style","Active. Sea and desert, private on land"],
        ["Group","Private on land. The dive boat and the island boat may be shared unless you take a private charter"],
        ["Activity level","Moderate to active. Swimming ability is needed for both water days"],
        ["Best for","Divers and would-be divers, long weekends, an addition to Luxor or Cairo"],
        ["Best months","All year. The water is warmest from June to October, and the wind is lightest in spring and autumn"]
      ],
      notes:[
        "Every water day depends on the weather. Where the sea is closed the day is rearranged rather than cancelled, and nothing is charged twice.",
        "Diving requires a medical questionnaire, and some conditions require a doctor's clearance. Minimum ages and depth limits are set by the operator and by the certifying agency, not by us.",
        "You should not fly within about 24 hours of a dive. The route puts the islands after the reef and not before for exactly that reason. Tell us your flight time and we will check it against your last dive."
      ]
    },

    tr:{
      meta:"4 Gün · Hurghada",
      n:"Hurghada Macerası",
      tagline:"Çöl, resif ve ada; dört günde.",
      d:"Kızıldeniz'de her gününde tek bir şey olan dört gün: şehir, Bedevilerle bir çöl gecesi, tam bir dalış günü ve adalara tekne.",
      imgAlt:"Kızıldeniz resifinde mercan duvarı ve turuncu anthias sürüleri",
      destinations:["Hurghada","Doğu Çölü","Kızıldeniz resifleri","Giftun ve adalar"],
      overview:[
        "Günler doğru kurulduğunda Kızıldeniz için dört gün yeter. Bu rota her güne tek bir şey veriyor: birinci gün şehir, ikinci gün çöl, üçüncü gün resif, dördüncü gün adalar. Hiçbir şey üst üste binmiyor ve hiçbir sabah gereğinden erken başlamıyor.",
        "Uzun bir hafta sonu, daha uzun bir seyahate ek ya da müzeden çok suda olmayı tercih edenler için Mısır'a ilk bakış olarak uygun. Üçüncü günün merkezinde dalış var ve sertifikalı bir işletme tarafından yürütülüyor; sertifika, sağlık formu ve alt yaş sınırı iskelede değil, siz gelmeden önce netleşiyor."
      ],
      highlights:[
        { i:"city",    h:"Hurghada eski şehir ve marina" },
        { i:"desert",  h:"Doğu Çölü'ne 4x4 safari" },
        { i:"atv",     h:"İşaretli parkurda ATV bölümü" },
        { i:"bedouin", h:"Bedevi kampı, akşam yemeği ve yıldızlar" },
        { i:"dive",    h:"Kızıldeniz'de tam bir dalış günü" },
        { i:"snorkel", h:"Dalmayanlar için aynı teknede şnorkel" },
        { i:"island",  h:"Adalara tekne günü" },
        { i:"sea",     h:"Dünyanın en berrak sularından biri" }
      ],
      days:[
        { d:"1. Gün", place:"Hurghada", h:"Varış ve şehir",
          acts:["Havalimanı karşılama","Otele yerleşme","Hurghada şehir turu","Marinada akşam","Akşam yemeği"],
          p:"Havalimanında karşılama ve öğleden sonranın başında otelde oluyorsunuz. Şehir turu eski mahalleyi, balık pazarını ve camiyi kapsıyor ve marinada bitiyor; akşam da orada geçiyor." },
        { d:"2. Gün", place:"Doğu Çölü", h:"Çöl safarisi ve Bedevi akşamı",
          acts:["4x4 çöl safarisi","ATV","Deve turu","Bedevi kampı ve akşam yemeği","Yıldızlar"],
          p:"Işığın değdiği ve zeminin serinlediği saatte, öğleden sonranın sonunda Doğu Çölü'ne çıkış. ATV bölümü işaretli parkurda, önde bir ve arkada bir rehberle yapılıyor. Kampta akşam yemeği ve şehirde yaşayanların beklemediği bir gökyüzü." },
        { d:"3. Gün", place:"Kızıldeniz", h:"Tam bir dalış günü",
          acts:["Resiflere tekne","Sertifikalı dalgıçlar için iki dalış","Yeni başlayanlar için deneme dalışı","Şnorkel ve teknede öğle yemeği"],
          p:"Suda tam bir gün. Sertifikalı dalgıçlar iki dalış yapıyor; sertifikası olmayan, eğitmen eşliğinde denetimli bir deneme dalışı yapabiliyor; dalmak istemeyen aynı tekneden şnorkelle yüzüyor. Noktalar sabahında kaptan tarafından rüzgâra ve dalgaya göre seçiliyor; bunun düzgün yapılmasının tek yolu bu." },
        { d:"4. Gün", place:"Giftun", h:"Adalar ve havalimanı",
          acts:["Sabah adalara tekne","Şnorkel","Plaj zamanı","Havalimanı transferi"],
          p:"Son sabah adaların: beyaz kum, sığ su ve plajdan yüzerek varılabilen bir resif. Öğleden sonranın ortasında marinada, havalimanında ise rahat bir zaman payıyla oluyorsunuz." }
      ],
      included:[
        "Teklifinizde adı geçen standartta Hurghada'da üç gece konaklama",
        "Havalimanı transferleri ve karadaki tüm özel ulaşım",
        "Her gün kahvaltı ve yukarıdaki programda adı geçen öğünler",
        "Bedevi kampı ve akşam yemeğiyle çöl safarisi",
        "Tekne, tüp, ağırlık ve sertifikalı eğitmen ya da dalış liderini içeren dalış günü",
        "Öğle yemeği ve şnorkel ekipmanıyla ada tekne günü",
        "Her saat ulaşabileceğiniz tek bir yerel irtibat"
      ],
      notIncluded:[
        "Mısır'a gidiş ve dönüş uluslararası uçuşlar",
        "Mısır giriş vizesi ve konsolosluk masrafları",
        "Seyahat sigortası ve gerekiyorsa dalış teminatı",
        "Tüp ve ağırlık dışındaki dalış ekipmanı kiralaması ve sertifika kursları",
        "Yukarıda adı geçmeyen yemek ve içecekler",
        "Opsiyonel deneyimler, bahşişler ve kişisel harcamalar"
      ],
      optional:[
        "Yeni başlayanlar için deneme dalışı; sağlık formu ve alt yaş sınırına tabi",
        "Dört güne yayılan sertifika kursu; haftanın şeklini değiştirir, erken sorun",
        "Koşullar ve işletme izin verdiğinde gece dalışı",
        "Su günlerinde paylaşımlı tekne yerine özel tekne",
        "Luksor'a günübirlik gezi ya da uçakla Kahire"
      ],
      info:[
        ["Süre","4 gün / 3 gece"],
        ["Destinasyonlar","Hurghada · Doğu Çölü · Kızıldeniz resifleri · Giftun"],
        ["Seyahat tarzı","Hareketli. Deniz ve çöl, karada özel"],
        ["Grup","Karada özel. Dalış ve ada tekneleri, özel kiralamadıkça paylaşımlı olabilir"],
        ["Zorluk","Orta düzeyde hareketli. Her iki su günü için yüzme bilmek gerekir"],
        ["Kimler için","Dalgıçlar ve dalmaya niyetlenenler, uzun hafta sonları, Luksor veya Kahire'ye ek"],
        ["En iyi aylar","Tüm yıl. Su haziran ile ekim arasında en sıcak, rüzgâr ilkbahar ve sonbaharda en hafif"]
      ],
      notes:[
        "Her su günü hava koşullarına bağlı. Deniz kapandığında gün iptal edilmiyor, yeniden kuruluyor ve iki kez ücretlendirilmiyor.",
        "Dalış için sağlık formu gerekiyor; bazı durumlarda doktor onayı isteniyor. Alt yaş sınırlarını ve derinlik limitlerini biz değil, işletme ve sertifika kuruluşu belirliyor.",
        "Dalıştan sonra yaklaşık 24 saat uçulmaması gerekir. Adaların resiften sonra olmasının sebebi tam olarak budur. Uçuş saatinizi bize yazın, son dalışınıza göre kontrol edelim."
      ]
    },

    de:{
      meta:"4 Tage · Hurghada",
      n:"Hurghada-Abenteuer",
      tagline:"Wüste, Riff und Insel in vier Tagen.",
      d:"Vier Tage am Roten Meer mit je einer Sache pro Tag: die Stadt, eine Wüstennacht bei den Beduinen, ein ganzer Tauchtag und ein Boot hinaus zu den Inseln.",
      imgAlt:"Eine Korallenwand mit Schwärmen orangefarbener Fahnenbarsche am Riff des Roten Meeres",
      destinations:["Hurghada","Die östliche Wüste","Die Riffe des Roten Meeres","Giftun und die Inseln"],
      overview:[
        "Vier Tage reichen für das Rote Meer, wenn die Tage richtig gebaut sind. Diese Route gibt jedem Tag eine Sache: am ersten die Stadt, am zweiten die Wüste, am dritten das Riff, am vierten die Inseln. Nichts wird doppelt belegt, und kein Morgen beginnt früher als nötig.",
        "Sie passt zu einem langen Wochenende, als Ergänzung einer längeren Reise oder als erster Blick auf Ägypten für alle, die lieber im Wasser als im Museum sind. Das Tauchen bildet die Mitte des dritten Tages und wird von einem zertifizierten Betrieb durchgeführt; Brevet, medizinischer Fragebogen und Mindestalter werden vor Ihrer Ankunft geklärt und nicht am Steg."
      ],
      highlights:[
        { i:"city",    h:"Die Altstadt von Hurghada und die Marina" },
        { i:"desert",  h:"Eine 4x4-Safari in die östliche Wüste" },
        { i:"atv",     h:"Die Quad-Etappe auf markierter Strecke" },
        { i:"bedouin", h:"Ein Beduinencamp, Abendessen und Sterne" },
        { i:"dive",    h:"Ein ganzer Tauchtag am Roten Meer" },
        { i:"snorkel", h:"Schnorcheln vom selben Boot für Nichttaucher" },
        { i:"island",  h:"Ein Bootstag zu den Inseln" },
        { i:"sea",     h:"Eines der klarsten Gewässer überhaupt" }
      ],
      days:[
        { d:"Tag 1", place:"Hurghada", h:"Ankunft & die Stadt",
          acts:["Flughafentransfer","Check-in im Hotel","Stadtrundgang Hurghada","Ein Abend an der Marina","Abendessen"],
          p:"Empfang am Flughafen und am frühen Nachmittag im Hotel. Der Stadtrundgang führt durch das alte Viertel, über den Fischmarkt und zur Moschee und endet an der Marina. Dort verbringt man den Abend." },
        { d:"Tag 2", place:"Östliche Wüste", h:"Wüstensafari & ein Beduinenabend",
          acts:["4x4-Wüstensafari","Quads","Kamelritt","Beduinencamp und Abendessen","Sterne"],
          p:"Am späten Nachmittag hinaus in die östliche Wüste, wenn das Licht lohnt und der Boden abgekühlt ist. Die Quad-Etappe läuft auf markierter Strecke, mit einem Guide vorn und einem hinten. Abendessen im Camp und ein Himmel, mit dem Stadtbewohner nicht rechnen." },
        { d:"Tag 3", place:"Rotes Meer", h:"Ein ganzer Tauchtag",
          acts:["Mit dem Boot zu den Riffen","Zwei Tauchgänge für Brevetierte","Ein Schnuppertauchgang für Anfänger","Schnorcheln und Mittagessen an Bord"],
          p:"Ein ganzer Tag auf dem Wasser. Brevetierte machen zwei Tauchgänge; wer kein Brevet hat, kann mit einem Instructor einen begleiteten Schnuppertauchgang machen, und wer lieber nicht taucht, schnorchelt vom selben Boot. Die Plätze wählt der Skipper am Morgen nach Wind und Welle. Anders lässt sich das nicht seriös machen." },
        { d:"Tag 4", place:"Giftun", h:"Die Inseln, dann der Flughafen",
          acts:["Vormittags mit dem Boot zu den Inseln","Schnorcheln","Zeit am Strand","Transfer zum Flughafen"],
          p:"Der letzte Vormittag gehört den Inseln: weißer Sand, flaches Wasser und ein Riff, zu dem man vom Strand aus schwimmen kann. Am frühen Nachmittag zurück an der Marina und mit Puffer am Flughafen." }
      ],
      included:[
        "Drei Übernachtungen in Hurghada in der in Ihrem Angebot genannten Kategorie",
        "Flughafentransfers und sämtliche private Beförderung an Land",
        "Täglich Frühstück sowie die oben genannten Mahlzeiten",
        "Die Wüstensafari mit Beduinencamp und Abendessen",
        "Der Tauchtag mit Boot, Flaschen, Blei und zertifiziertem Instructor oder Divemaster",
        "Der Bootstag zu den Inseln mit Mittagessen und Schnorchelausrüstung",
        "Ein örtlicher Ansprechpartner, rund um die Uhr erreichbar"
      ],
      notIncluded:[
        "Internationale Flüge nach und von Ägypten",
        "Das ägyptische Einreisevisum und konsularische Gebühren",
        "Reiseversicherung, gegebenenfalls einschließlich Tauchversicherung",
        "Ausrüstungsmiete über Flaschen und Blei hinaus sowie Brevetkurse",
        "Nicht genannte Mahlzeiten und Getränke",
        "Optionale Erlebnisse, Trinkgelder und persönliche Ausgaben"
      ],
      optional:[
        "Ein Schnuppertauchgang für Anfänger, mit medizinischem Fragebogen und Mindestalter",
        "Ein Brevetkurs über die vier Tage, der die Woche verändert, bitte früh ansprechen",
        "Ein Nachttauchgang, wo Bedingungen und Betreiber es zulassen",
        "Ein privates statt eines geteilten Bootes an einem der Wassertage",
        "Ein Tagesausflug nach Luxor oder per Flug nach Kairo"
      ],
      info:[
        ["Dauer","4 Tage / 3 Nächte"],
        ["Ziele","Hurghada · die östliche Wüste · die Riffe des Roten Meeres · Giftun"],
        ["Reisestil","Aktiv. Meer und Wüste, an Land privat"],
        ["Gruppe","An Land privat. Tauch- und Inselboot können geteilt sein, sofern Sie nicht privat chartern"],
        ["Anspruch","Mittel bis aktiv. Für beide Wassertage ist Schwimmen erforderlich"],
        ["Geeignet für","Taucherinnen und Taucher, Einsteiger, lange Wochenenden, Ergänzung zu Luxor oder Kairo"],
        ["Beste Monate","Ganzjährig. Am wärmsten ist das Wasser von Juni bis Oktober, am ruhigsten der Wind im Frühjahr und Herbst"]
      ],
      notes:[
        "Jeder Wassertag hängt vom Wetter ab. Wird das Meer gesperrt, wird der Tag umgelegt statt gestrichen, und nichts wird doppelt berechnet.",
        "Tauchen setzt einen medizinischen Fragebogen voraus, manche Vorerkrankungen eine ärztliche Freigabe. Mindestalter und Tiefenlimits legen der Betrieb und der Verband fest, nicht wir.",
        "Nach einem Tauchgang sollte etwa 24 Stunden nicht geflogen werden. Genau deshalb liegen die Inseln nach dem Riff und nicht davor. Nennen Sie uns Ihre Flugzeit, wir prüfen sie gegen den letzten Tauchgang."
      ]
    }

    } },

  /* ==========================================================
     04 · HURGHADA & LUXOR — 7 days
     Day structure confirmed by the client, including the evening
     road transfer to Luxor on day 4 and the return to Hurghada
     with free time on day 7. The route ends in Hurghada rather
     than at the airport, which is why the notes say what happens
     to the last night.
     ========================================================== */
  { id:"hurghada-luxor", days:7, nights:6,
    img:"assets/images/tours/luxor-karnak-1100.webp", iw:1100, ih:825,
    hero:{ base:"assets/images/hero/luxor-1", widths:[1200,2000], w:2000, h:1260 },
    price:{ from:null, currency:"EUR", per:"person" },
    t:{

    en:{
      meta:"7 days · Red Sea & the Nile",
      n:"Hurghada & Luxor",
      tagline:"Red Sea mornings, and three days among the pharaohs.",
      d:"The Red Sea week extended: desert, reef and island first, then the road to Luxor for Karnak, the Valley of the Kings and the Valley of the Queens.",
      imgAlt:"Painted capitals in the hypostyle hall at Karnak, seen from below",
      destinations:["Hurghada","The Eastern Desert","The Red Sea reefs","Giftun","Luxor East Bank","Luxor West Bank"],
      overview:[
        "Two halves, deliberately. The first four days are the Red Sea at its best: the town, the desert, a full day's diving and a boat out to the islands. The last three are ancient Thebes, which holds the densest concentration of standing antiquity anywhere in the world.",
        "The move between them is made in the evening, so no daylight is spent on the road. You sleep in Luxor and wake up beside Karnak. Everything on land is private and guided; the two boat days may be shared unless you charter."
      ],
      highlights:[
        { i:"city",    h:"Hurghada old town and the marina" },
        { i:"desert",  h:"A 4x4 safari and the quad-bike stage" },
        { i:"bedouin", h:"A Bedouin camp, dinner and stars" },
        { i:"dive",    h:"A full day's diving on the Red Sea" },
        { i:"island",  h:"A boat day out to the islands" },
        { i:"temple",  h:"Karnak and Luxor Temple" },
        { i:"museum",  h:"The Luxor Museum" },
        { i:"tomb",    h:"The Valley of the Kings and the Valley of the Queens" }
      ],
      days:[
        { d:"Day 1", place:"Hurghada", h:"Arrival & the city",
          acts:["Airport transfer","Hotel check-in","Hurghada city tour","An evening at the marina","Dinner"],
          p:"Met at the airport and into the hotel by early afternoon. The city tour takes in the old quarter, the fish market and the mosque, and finishes at the marina, which is where the evening goes." },
        { d:"Day 2", place:"The Eastern Desert", h:"Desert safari & the quad stage",
          acts:["4x4 desert safari","Quad bikes","A Bedouin camp and dinner","Stars"],
          p:"Out into the Eastern Desert late in the afternoon. The quad stage runs on a marked course with a guide in front and one behind, and the evening ends at the Bedouin camp with dinner and a sky that people who live in cities do not expect." },
        { d:"Day 3", place:"The Red Sea", h:"A full day's diving",
          acts:["Boat out to the reefs","Two dives for certified divers","An introductory dive for beginners","Snorkelling and lunch on board"],
          p:"A full day on the water. Certified divers get two dives, beginners can make a supervised introductory dive with an instructor, and anyone who would rather not can snorkel from the same boat. The sites are chosen on the morning according to wind and swell." },
        { d:"Day 4", place:"Giftun, then Luxor", h:"The islands, then the road to Luxor",
          acts:["Morning boat to the islands","Snorkelling and beach time","Evening transfer to Luxor","Hotel check-in in Luxor"],
          p:"The islands in the morning and back at the marina by mid-afternoon. The road to Luxor is driven in the evening and takes about four hours across the desert, so the day loses nothing to travel and you wake up on the Nile." },
        { d:"Day 5", place:"Luxor", h:"Discover Luxor",
          acts:["Luxor Temple","The Luxor Museum","Karnak Temple","The hypostyle hall at dusk"],
          p:"Luxor Temple first, then the museum, which is small, superbly lit and the best single hour of explanation in Egypt. Karnak in the late afternoon, with the hypostyle hall as the light goes." },
        { d:"Day 6", place:"West Bank", h:"Ancient Egyptian treasures",
          acts:["Valley of the Kings","Valley of the Queens","Temple of Hatshepsut","Colossi of Memnon"],
          p:"An early start and the whole day on the West Bank. Three tombs on the standard ticket in the Valley of the Kings. Nefertari, in the Valley of the Queens, is a separate, limited and expensive ticket and the finest painted tomb in Egypt. We will tell you whether it is open, and what it costs, before you decide." },
        { d:"Day 7", place:"Hurghada", h:"Back to the coast",
          acts:["Morning road transfer","Free time in the city centre","The marina","The last evening"],
          p:"The road back in the morning, and the rest of the day free in Hurghada: the centre, the marina, the beach, or nothing at all. Where your flight leaves the following day, the last night is added and quoted with it." }
      ],
      included:[
        "Six nights of accommodation on the standard named in your quote: three in Hurghada, three in Luxor",
        "Airport transfers, both road transfers between Hurghada and Luxor, and all private transport on land",
        "Daily breakfast, and the meals named in the day-by-day above",
        "A licensed Egyptologist guide on the Luxor days, in Turkish, English or German",
        "Entrance to every site listed in the itinerary",
        "The desert safari with dinner, the diving day, and the island boat day with lunch",
        "One local contact, reachable at any hour"
      ],
      notIncluded:[
        "International flights to and from Egypt",
        "The Egyptian entry visa and any consular fees",
        "Travel insurance, including any diving cover you may need",
        "The separate tickets named in the itinerary, Nefertari's tomb among them",
        "Dive equipment hire beyond tanks and weights",
        "Meals and drinks not named above, optional experiences, tips and personal expenses"
      ],
      optional:[
        "A dawn hot-air balloon over the West Bank on the morning of day 6, weather dependent",
        "Nefertari's tomb in the Valley of the Queens, where it is open",
        "Medinet Habu, Deir el-Medina or the Ramesseum added to the West Bank day",
        "Dendera or Abydos as a full day added to the Luxor half",
        "A private boat rather than a shared one on either water day"
      ],
      info:[
        ["Duration","7 days / 6 nights"],
        ["Destinations","Hurghada · the Eastern Desert · the Red Sea reefs · Giftun · Luxor"],
        ["Travel style","Half sea, half antiquity. Private and guided on land"],
        ["Group","Private on land. Boats may be shared unless you charter"],
        ["Activity level","Moderate to active. Swimming for the water days, two early starts, one evening transfer"],
        ["Best for","Divers who also want Luxor, couples, and second visits to Egypt"],
        ["Best months","October to April for the Luxor half. The coast works all year"]
      ],
      notes:[
        "The route ends in Hurghada rather than at the airport. Where your flight home leaves the next morning, the extra night and the airport transfer are quoted with it.",
        "You should not fly within about 24 hours of a dive. The diving day sits on day 3 and the flight home is on day 7 or 8, which leaves a wide margin, but tell us your flight time and we will check it.",
        "Water days depend on the weather. Where the sea is closed the day is rearranged rather than cancelled."
      ]
    },

    tr:{
      meta:"7 Gün · Kızıldeniz ve Nil",
      n:"Hurghada ve Luksor",
      tagline:"Kızıldeniz sabahları ve firavunlarla üç gün.",
      d:"Kızıldeniz haftasının uzatılmış hâli: önce çöl, resif ve ada; ardından Karnak, Kral Vadisi ve Kraliçeler Vadisi için Luksor yolu.",
      imgAlt:"Karnak'ta sütunlu salonun aşağıdan görülen boyalı sütun başlıkları",
      destinations:["Hurghada","Doğu Çölü","Kızıldeniz resifleri","Giftun","Luksor Doğu Yaka","Luksor Batı Yaka"],
      overview:[
        "Bilerek iki yarım. İlk dört gün Kızıldeniz'in en iyi hâli: şehir, çöl, tam bir dalış günü ve adalara tekne. Son üç gün, dünyada ayakta duran antik yapının en yoğun bulunduğu yer olan antik Thebes.",
        "İki yarım arasındaki geçiş akşam yapılıyor; yani gündüzden yola hiçbir şey harcanmıyor. Luksor'da uyuyup Karnak'ın yanında uyanıyorsunuz. Karadaki her şey özel ve rehberli; iki tekne günü, özel kiralanmadıkça paylaşımlı olabilir."
      ],
      highlights:[
        { i:"city",    h:"Hurghada eski şehir ve marina" },
        { i:"desert",  h:"4x4 safari ve ATV bölümü" },
        { i:"bedouin", h:"Bedevi kampı, akşam yemeği ve yıldızlar" },
        { i:"dive",    h:"Kızıldeniz'de tam bir dalış günü" },
        { i:"island",  h:"Adalara tekne günü" },
        { i:"temple",  h:"Karnak ve Luksor Tapınağı" },
        { i:"museum",  h:"Luksor Müzesi" },
        { i:"tomb",    h:"Kral Vadisi ve Kraliçeler Vadisi" }
      ],
      days:[
        { d:"1. Gün", place:"Hurghada", h:"Varış ve şehir",
          acts:["Havalimanı karşılama","Otele yerleşme","Hurghada şehir turu","Marinada akşam","Akşam yemeği"],
          p:"Havalimanında karşılama ve öğleden sonranın başında otelde oluyorsunuz. Şehir turu eski mahalleyi, balık pazarını ve camiyi kapsıyor ve marinada bitiyor; akşam da orada geçiyor." },
        { d:"2. Gün", place:"Doğu Çölü", h:"Çöl safarisi ve ATV",
          acts:["4x4 çöl safarisi","ATV","Bedevi kampı ve akşam yemeği","Yıldızlar"],
          p:"Öğleden sonranın sonunda Doğu Çölü'ne çıkış. ATV bölümü işaretli parkurda, önde bir ve arkada bir rehberle yapılıyor; akşam Bedevi kampında yemek ve şehirde yaşayanların beklemediği bir gökyüzüyle bitiyor." },
        { d:"3. Gün", place:"Kızıldeniz", h:"Tam bir dalış günü",
          acts:["Resiflere tekne","Sertifikalı dalgıçlar için iki dalış","Yeni başlayanlar için deneme dalışı","Şnorkel ve teknede öğle yemeği"],
          p:"Suda tam bir gün. Sertifikalı dalgıçlar iki dalış yapıyor, yeni başlayanlar eğitmen eşliğinde deneme dalışı yapabiliyor, dalmak istemeyen aynı tekneden şnorkelle yüzüyor. Noktalar o sabah rüzgâra ve dalgaya göre seçiliyor." },
        { d:"4. Gün", place:"Giftun, ardından Luksor", h:"Adalar ve Luksor yolu",
          acts:["Sabah adalara tekne","Şnorkel ve plaj","Akşam Luksor transferi","Luksor'da otele yerleşme"],
          p:"Sabah adalar, öğleden sonranın ortasında marinaya dönüş. Luksor yolu akşam sürülüyor ve çölde yaklaşık dört saat sürüyor, böylece gün yola hiçbir şey kaybetmiyor ve Nil kıyısında uyanıyorsunuz." },
        { d:"5. Gün", place:"Luksor", h:"Luksor'u keşfedin",
          acts:["Luksor Tapınağı","Luksor Müzesi","Karnak Tapınağı","Akşam ışığında sütunlu salon"],
          p:"Önce Luksor Tapınağı, ardından küçük, çok iyi aydınlatılmış ve Mısır'da tek başına en iyi açıklamayı sunan müze. Öğleden sonranın sonunda Karnak ve ışık çekilirken sütunlu salon." },
        { d:"6. Gün", place:"Batı Yaka", h:"Antik Mısır hazineleri",
          acts:["Kral Vadisi","Kraliçeler Vadisi","Hatşepsut Tapınağı","Memnon Kolosları"],
          p:"Erken kalkış ve tüm gün Batı Yaka'da. Kral Vadisi'nde standart biletle üç mezar. Kraliçeler Vadisi'ndeki Nefertari ayrı, sınırlı ve pahalı bir bilet ve Mısır'ın en güzel boyalı mezarı. Açık olup olmadığını ve fiyatını siz karar vermeden önce söyleriz." },
        { d:"7. Gün", place:"Hurghada", h:"Kıyıya dönüş",
          acts:["Sabah kara yolu transferi","Şehir merkezinde serbest zaman","Marina","Son akşam"],
          p:"Sabah dönüş yolu, günün geri kalanı Hurghada'da serbest: merkez, marina, plaj ya da hiçbir şey. Uçuşunuz ertesi güne denk geliyorsa son gece eklenir ve birlikte fiyatlandırılır." }
      ],
      included:[
        "Teklifinizde adı geçen standartta altı gece konaklama: üç gece Hurghada, üç gece Luksor",
        "Havalimanı transferleri, Hurghada ile Luksor arası iki kara yolu transferi ve karadaki tüm özel ulaşım",
        "Her gün kahvaltı ve yukarıdaki programda adı geçen öğünler",
        "Luksor günlerinde lisanslı Mısırbilimci rehber; Türkçe, İngilizce ya da Almanca",
        "Programda yazan tüm ören yeri girişleri",
        "Akşam yemekli çöl safarisi, dalış günü ve öğle yemekli ada tekne günü",
        "Her saat ulaşabileceğiniz tek bir yerel irtibat"
      ],
      notIncluded:[
        "Mısır'a gidiş ve dönüş uluslararası uçuşlar",
        "Mısır giriş vizesi ve konsolosluk masrafları",
        "Seyahat sigortası ve gerekiyorsa dalış teminatı",
        "Programda belirtilen ayrı biletler, Nefertari mezarı dahil",
        "Tüp ve ağırlık dışındaki dalış ekipmanı kiralaması",
        "Yukarıda adı geçmeyen yemekler, opsiyonel deneyimler, bahşişler ve kişisel harcamalar"
      ],
      optional:[
        "6. günün sabahında Batı Yaka üzerinde şafak balonu, hava koşullarına bağlı",
        "Açık olduğunda Kraliçeler Vadisi'ndeki Nefertari mezarı",
        "Batı Yaka gününe eklenen Medinet Habu, Deir el-Medina ya da Ramesseum",
        "Luksor bölümüne tam gün olarak eklenen Dendera ya da Abydos",
        "Su günlerinde paylaşımlı tekne yerine özel tekne"
      ],
      info:[
        ["Süre","7 gün / 6 gece"],
        ["Destinasyonlar","Hurghada · Doğu Çölü · Kızıldeniz resifleri · Giftun · Luksor"],
        ["Seyahat tarzı","Yarısı deniz, yarısı antik. Karada özel ve rehberli"],
        ["Grup","Karada özel. Tekneler, özel kiralanmadıkça paylaşımlı olabilir"],
        ["Zorluk","Orta düzeyde hareketli. Su günleri için yüzme, iki erken kalkış, bir akşam transferi"],
        ["Kimler için","Luksor'u da isteyen dalgıçlar, çiftler ve Mısır'a ikinci kez gelenler"],
        ["En iyi aylar","Luksor bölümü için ekim ile nisan arası. Kıyı yıl boyu çalışır"]
      ],
      notes:[
        "Rota havalimanında değil Hurghada'da bitiyor. Dönüş uçuşunuz ertesi sabahsa ek gece ve havalimanı transferi birlikte fiyatlandırılır.",
        "Dalıştan sonra yaklaşık 24 saat uçulmaması gerekir. Dalış günü 3. günde, dönüş uçuşu 7. ya da 8. günde; aralık geniş, yine de uçuş saatinizi yazın, kontrol edelim.",
        "Su günleri hava koşullarına bağlı. Deniz kapandığında gün iptal edilmiyor, yeniden kuruluyor."
      ]
    },

    de:{
      meta:"7 Tage · Rotes Meer & Nil",
      n:"Hurghada & Luxor",
      tagline:"Morgen am Roten Meer und drei Tage bei den Pharaonen.",
      d:"Die Woche am Roten Meer, erweitert: erst Wüste, Riff und Insel, dann die Straße nach Luxor zu Karnak, zum Tal der Könige und zum Tal der Königinnen.",
      imgAlt:"Bemalte Säulenkapitelle in der Säulenhalle von Karnak, von unten gesehen",
      destinations:["Hurghada","Die östliche Wüste","Die Riffe des Roten Meeres","Giftun","Luxor Ostufer","Luxor Westufer"],
      overview:[
        "Bewusst zwei Hälften. Die ersten vier Tage sind das Rote Meer von seiner besten Seite: die Stadt, die Wüste, ein ganzer Tauchtag und ein Boot zu den Inseln. Die letzten drei sind das alte Theben, wo antike Bauten so dicht stehen wie nirgendwo sonst auf der Welt.",
        "Der Wechsel dazwischen findet am Abend statt, sodass kein Tageslicht auf der Straße verloren geht. Sie schlafen in Luxor und wachen neben Karnak auf. An Land ist alles privat und geführt; die beiden Bootstage können geteilt sein, sofern Sie nicht chartern."
      ],
      highlights:[
        { i:"city",    h:"Die Altstadt von Hurghada und die Marina" },
        { i:"desert",  h:"Eine 4x4-Safari und die Quad-Etappe" },
        { i:"bedouin", h:"Ein Beduinencamp, Abendessen und Sterne" },
        { i:"dive",    h:"Ein ganzer Tauchtag am Roten Meer" },
        { i:"island",  h:"Ein Bootstag zu den Inseln" },
        { i:"temple",  h:"Karnak- und Luxor-Tempel" },
        { i:"museum",  h:"Das Luxor-Museum" },
        { i:"tomb",    h:"Das Tal der Könige und das Tal der Königinnen" }
      ],
      days:[
        { d:"Tag 1", place:"Hurghada", h:"Ankunft & die Stadt",
          acts:["Flughafentransfer","Check-in im Hotel","Stadtrundgang Hurghada","Ein Abend an der Marina","Abendessen"],
          p:"Empfang am Flughafen und am frühen Nachmittag im Hotel. Der Stadtrundgang führt durch das alte Viertel, über den Fischmarkt und zur Moschee und endet an der Marina. Dort verbringt man den Abend." },
        { d:"Tag 2", place:"Östliche Wüste", h:"Wüstensafari & die Quad-Etappe",
          acts:["4x4-Wüstensafari","Quads","Beduinencamp und Abendessen","Sterne"],
          p:"Am späten Nachmittag hinaus in die östliche Wüste. Die Quad-Etappe läuft auf markierter Strecke mit einem Guide vorn und einem hinten, und der Abend endet im Beduinencamp mit Abendessen und einem Himmel, mit dem Stadtbewohner nicht rechnen." },
        { d:"Tag 3", place:"Rotes Meer", h:"Ein ganzer Tauchtag",
          acts:["Mit dem Boot zu den Riffen","Zwei Tauchgänge für Brevetierte","Ein Schnuppertauchgang für Anfänger","Schnorcheln und Mittagessen an Bord"],
          p:"Ein ganzer Tag auf dem Wasser. Brevetierte machen zwei Tauchgänge, Anfänger einen begleiteten Schnuppertauchgang mit Instructor, und wer lieber nicht taucht, schnorchelt vom selben Boot. Die Plätze werden am Morgen nach Wind und Welle gewählt." },
        { d:"Tag 4", place:"Giftun, dann Luxor", h:"Die Inseln, dann die Straße nach Luxor",
          acts:["Vormittags mit dem Boot zu den Inseln","Schnorcheln und Strand","Abendtransfer nach Luxor","Check-in in Luxor"],
          p:"Vormittags die Inseln, am frühen Nachmittag zurück an der Marina. Die Straße nach Luxor wird am Abend gefahren und dauert rund vier Stunden durch die Wüste, sodass der Tag nichts an die Fahrt verliert und Sie am Nil aufwachen." },
        { d:"Tag 5", place:"Luxor", h:"Luxor entdecken",
          acts:["Luxor-Tempel","Das Luxor-Museum","Karnak-Tempel","Die Säulenhalle in der Dämmerung"],
          p:"Zuerst der Luxor-Tempel, dann das Museum: klein, hervorragend beleuchtet und die beste einzelne Erklärstunde in Ägypten. Karnak am späten Nachmittag, mit der Säulenhalle, während das Licht geht." },
        { d:"Tag 6", place:"Westufer", h:"Schätze des alten Ägypten",
          acts:["Tal der Könige","Tal der Königinnen","Tempel der Hatschepsut","Memnonkolosse"],
          p:"Früher Start und der ganze Tag am Westufer. Im Tal der Könige drei Gräber auf dem Standardticket. Nefertari im Tal der Königinnen ist ein gesondertes, limitiertes und teures Ticket und das schönste bemalte Grab Ägyptens. Ob es geöffnet ist und was es kostet, sagen wir Ihnen vor Ihrer Entscheidung." },
        { d:"Tag 7", place:"Hurghada", h:"Zurück an die Küste",
          acts:["Transfer am Vormittag","Freie Zeit im Stadtzentrum","Die Marina","Der letzte Abend"],
          p:"Am Vormittag zurück, der Rest des Tages frei in Hurghada: Zentrum, Marina, Strand oder gar nichts. Fliegt Ihr Flug erst am Folgetag, wird die letzte Nacht ergänzt und mit angeboten." }
      ],
      included:[
        "Sechs Übernachtungen in der in Ihrem Angebot genannten Kategorie: drei in Hurghada, drei in Luxor",
        "Flughafentransfers, beide Straßentransfers zwischen Hurghada und Luxor und sämtliche private Beförderung an Land",
        "Täglich Frühstück sowie die oben genannten Mahlzeiten",
        "An den Luxor-Tagen ein lizenzierter ägyptologischer Guide, auf Türkisch, Englisch oder Deutsch",
        "Eintritt zu allen im Programm genannten Stätten",
        "Die Wüstensafari mit Abendessen, der Tauchtag und der Bootstag mit Mittagessen",
        "Ein örtlicher Ansprechpartner, rund um die Uhr erreichbar"
      ],
      notIncluded:[
        "Internationale Flüge nach und von Ägypten",
        "Das ägyptische Einreisevisum und konsularische Gebühren",
        "Reiseversicherung, gegebenenfalls einschließlich Tauchversicherung",
        "Die im Programm genannten gesonderten Tickets, darunter das Grab der Nefertari",
        "Ausrüstungsmiete über Flaschen und Blei hinaus",
        "Nicht genannte Mahlzeiten, optionale Erlebnisse, Trinkgelder und persönliche Ausgaben"
      ],
      optional:[
        "Eine Ballonfahrt über dem Westufer am Morgen von Tag 6, wetterabhängig",
        "Das Grab der Nefertari im Tal der Königinnen, sofern geöffnet",
        "Medinet Habu, Deir el-Medina oder das Ramesseum, ergänzt am Westufer-Tag",
        "Dendera oder Abydos als ganzer Tag in der Luxor-Hälfte",
        "Ein privates statt eines geteilten Bootes an einem der Wassertage"
      ],
      info:[
        ["Dauer","7 Tage / 6 Nächte"],
        ["Ziele","Hurghada · die östliche Wüste · die Riffe des Roten Meeres · Giftun · Luxor"],
        ["Reisestil","Halb Meer, halb Antike. An Land privat und geführt"],
        ["Gruppe","An Land privat. Boote können geteilt sein, sofern Sie nicht chartern"],
        ["Anspruch","Mittel bis aktiv. Schwimmen für die Wassertage, zwei frühe Starts, ein Abendtransfer"],
        ["Geeignet für","Tauchende, die auch Luxor wollen, Paare und zweite Ägyptenreisen"],
        ["Beste Monate","Für die Luxor-Hälfte Oktober bis April. Die Küste geht ganzjährig"]
      ],
      notes:[
        "Die Route endet in Hurghada und nicht am Flughafen. Fliegt Ihr Rückflug am nächsten Morgen, werden die zusätzliche Nacht und der Flughafentransfer mit angeboten.",
        "Nach einem Tauchgang sollte etwa 24 Stunden nicht geflogen werden. Der Tauchtag liegt auf Tag 3, der Rückflug auf Tag 7 oder 8. Der Abstand ist groß, nennen Sie uns dennoch Ihre Flugzeit.",
        "Wassertage hängen vom Wetter ab. Wird das Meer gesperrt, wird der Tag umgelegt statt gestrichen."
      ]
    }

    } },

  /* ==========================================================
     05 · HURGHADA, LUXOR & CAIRO — 8 days
     Days 1 to 7 are the client's confirmed structure, including
     the balloon on day 4 and the evening bus to Cairo on day 6.

     DAY 8 — THE ONE GAP IN THE SUPPLIED CONTENT
     The client described this as an eight-day tour but supplied
     seven days of detail. Rather than invent an eighth, day 8 is
     written from the three endings the client DID confirm —
     return to Hurghada, continue independently, or an
     international departure from Cairo — and says plainly that
     which one applies is settled with your flights. Nothing is
     promised about transport, timing or price.

     TO FILL IT IN LATER: replace that day's acts[] and p in all
     three languages and, if the shape changes, adjust days /
     nights at the top of this entry. Nothing else in the site
     reads day 8 specially.
     ========================================================== */
  { id:"hurghada-luxor-cairo", days:8, nights:7,
    img:"assets/images/tours/cairo-giza-1100.webp", iw:1100, ih:825,
    hero:{ base:"assets/images/hero/cairo-2", widths:[1200,2000], w:2000, h:1260 },
    price:{ from:null, currency:"EUR", per:"person" },
    t:{

    en:{
      meta:"8 days · Coast, Nile & capital",
      n:"Hurghada, Luxor & Cairo",
      tagline:"The coast, the river and the capital, in one line.",
      d:"Eight days across the whole country: the Red Sea and the desert, a balloon over the West Bank at dawn, the reef and the islands, and the Pyramids at the end.",
      imgAlt:"A terrace table looking out to the pyramids at Giza",
      destinations:["Hurghada","The Eastern Desert","Luxor East Bank","Luxor West Bank","The Red Sea reefs","Giftun","Cairo & Giza"],
      overview:[
        "This is the longest of the Red Sea routes and the only one that reaches Cairo. It runs coast, river, capital: two days on the sea and in the desert, two in Luxor with a balloon over the West Bank at dawn, back to the water for the diving and the islands, then the road north for the Pyramids and the museum.",
        "It covers a great deal of ground for eight days, and it does that by travelling at night rather than by cutting visits short. If that is not how you like to travel, say so. The same content stretches comfortably to ten days with two internal flights, and we will quote both side by side."
      ],
      highlights:[
        { i:"desert",  h:"A 4x4 safari and the quad-bike stage" },
        { i:"bedouin", h:"A Bedouin camp, dinner and stars" },
        { i:"tomb",    h:"The Valley of the Kings" },
        { i:"temple",  h:"Karnak and Luxor Temple" },
        { i:"balloon", h:"A hot-air balloon over the West Bank at dawn" },
        { i:"dive",    h:"Diving and snorkelling on the Red Sea" },
        { i:"island",  h:"A boat day out to the islands" },
        { i:"pyramids",h:"The Pyramids of Giza and the Sphinx" },
        { i:"museum",  h:"The new Egyptian museum at Giza" }
      ],
      days:[
        { d:"Day 1", place:"Hurghada", h:"Arrival in Hurghada",
          acts:["Airport transfer","Hotel check-in","Hurghada city tour","An evening at the marina","Dinner"],
          p:"Met at the airport and into the hotel by early afternoon. The city tour takes in the old quarter, the fish market and the mosque, and finishes at the marina, which is where the evening goes." },
        { d:"Day 2", place:"The Eastern Desert", h:"The desert",
          acts:["4x4 desert safari","Quad bikes","A Bedouin camp","Dinner under the stars"],
          p:"Out into the Eastern Desert late in the afternoon, when the light is worth having. The quad stage runs on a marked course with a guide in front and one behind, and the evening ends at the camp with dinner and a sky that people who live in cities do not expect." },
        { d:"Day 3", place:"Luxor", h:"Luxor: the tombs and the temples",
          acts:["Early transfer to Luxor","Valley of the Kings","Karnak Temple","The Luxor Museum","Luxor Temple after dark"],
          p:"An early start across the desert road and a full day in Thebes: the royal tombs first, while the valley is still cool, then Karnak, the museum in the afternoon and Luxor Temple lit after dinner. You sleep in Luxor." },
        { d:"Day 4", place:"West Bank, then Hurghada", h:"A balloon at dawn, then back to the sea",
          acts:["Hot-air balloon over the West Bank","Temple of Hatshepsut","Colossi of Memnon","Return to Hurghada"],
          p:"Up before four for the balloon, which lifts as the sun comes over the eastern hills and puts the whole of Thebes underneath you: the tombs, the temples, the green strip and the desert edge. Hatshepsut and the Colossi afterwards, then the road back to the coast in the afternoon." },
        { d:"Day 5", place:"The Red Sea", h:"Diving and snorkelling",
          acts:["Boat out to the reefs","Diving for certified divers","An introductory dive for beginners","Snorkelling and lunch on board"],
          p:"A full day on the water. Certified divers dive, beginners can make a supervised introductory dive with an instructor, and everyone else snorkels from the same boat. The sites are chosen on the morning according to wind and swell." },
        { d:"Day 6", place:"Giftun, then the road north", h:"The islands, then the night journey to Cairo",
          acts:["Morning boat to the islands","Snorkelling and beach time","Evening departure for Cairo","Arrive Cairo overnight"],
          p:"The islands in the morning, then the long road north in the evening. It is a real journey of six hours or so, and it buys the whole of the following day in Cairo. Where you would rather fly it, say so early: the day-by-day does not change, only the way you get there." },
        { d:"Day 7", place:"Cairo & Giza", h:"Cairo, and the Pyramids",
          acts:["The Pyramids of Giza and the Sphinx","The new Egyptian museum","City tour","Dinner"],
          p:"The plateau first thing, while it is still quiet, then the museum at Giza, where the Tutankhamun collection stands together in one building for the first time. The afternoon takes in the city, and dinner is the last evening of the route." },
        { d:"Day 8", place:"Cairo", h:"Departure, and where you go from here",
          acts:["A free morning","Return to Hurghada, or","Continue independently, or","An international departure from Cairo"],
          p:"The route ends in Cairo, and there are three ordinary ways to end it: travel back to Hurghada, carry on under your own arrangements, or fly home from Cairo, which is the country's largest airport and usually the simplest way out. Which of the three we build depends on your flights, and it is settled in writing before anything is booked." }
      ],
      included:[
        "Seven nights on the route: six in hotels and one overnight road journey between Hurghada and Cairo",
        "Airport transfers and all private transport on land, including both Luxor transfers and the journey to Cairo",
        "Daily breakfast, and the meals named in the day-by-day above",
        "A licensed Egyptologist guide on the Luxor and Cairo days, in Turkish, English or German",
        "Entrance to every site listed in the itinerary",
        "The desert safari with dinner, the diving day, the island boat day, and the balloon flight on day 4",
        "One local contact, reachable at any hour"
      ],
      notIncluded:[
        "International flights to and from Egypt",
        "The Egyptian entry visa and any consular fees",
        "Travel insurance, including any diving cover you may need",
        "Extra tomb and monument tickets not named in the itinerary",
        "Dive equipment hire beyond tanks and weights",
        "Meals and drinks not named above, optional experiences, tips and personal expenses"
      ],
      optional:[
        "The Hurghada to Cairo leg by air instead of by road, which returns an evening to the route",
        "Saqqara and Memphis added to the Cairo day",
        "A ninth day in Cairo for the Islamic city: the Citadel, Ibn Tulun, al-Muizz street",
        "Nefertari's tomb in the Valley of the Queens, where it is open",
        "An onward transfer at the end, back to Hurghada or on to Alexandria or the Sinai"
      ],
      info:[
        ["Duration","8 days / 7 nights"],
        ["Destinations","Hurghada · the Eastern Desert · Luxor · the Red Sea reefs · Giftun · Cairo & Giza"],
        ["Travel style","Full and wide-ranging, with two overnight moves"],
        ["Group","Private on land. Boats may be shared unless you charter"],
        ["Activity level","Active. Two very early starts and one overnight road journey"],
        ["Best for","Travellers with one week who want the whole country, second visits, groups of friends"],
        ["Best months","October to April"]
      ],
      notes:[
        "The last day is written around the three endings this route actually supports: back to Hurghada, onward independently, or an international departure from Cairo. Which one applies is settled in writing with your flights before anything is booked.",
        "The balloon flies at the operator's discretion and only in the right wind. Where it cannot fly, the morning moves to the West Bank sites and the flight is refunded or rebooked.",
        "You should not fly within about 24 hours of a dive. The diving day sits on day 5 and any flight is on day 8, but tell us your flight time and we will check it.",
        "The overnight road journey to Cairo is long. It is the reason eight days can hold this much, and it is also the first thing we change for anyone who would rather not do it."
      ]
    },

    tr:{
      meta:"8 Gün · Kıyı, Nil ve başkent",
      n:"Hurghada, Luksor ve Kahire",
      tagline:"Kıyı, nehir ve başkent; tek bir hatta.",
      d:"Ülkenin tamamında sekiz gün: Kızıldeniz ve çöl, şafakta Batı Yaka üzerinde balon, resif ve adalar, sonunda da Piramitler.",
      imgAlt:"Giza piramitlerine bakan bir terasta masa",
      destinations:["Hurghada","Doğu Çölü","Luksor Doğu Yaka","Luksor Batı Yaka","Kızıldeniz resifleri","Giftun","Kahire ve Giza"],
      overview:[
        "Kızıldeniz rotalarının en uzunu ve Kahire'ye ulaşan tek olanı. Sırayla kıyı, nehir, başkent: denizde ve çölde iki gün, şafakta balonla Batı Yaka üzerinde iki Luksor günü, dalış ve adalar için suya dönüş, ardından Piramitler ve müze için kuzeye yol.",
        "Sekiz gün için çok geniş bir alanı kapsıyor ve bunu gezileri kısaltarak değil, geceleri yol alarak yapıyor. Sizin seyahat tarzınız bu değilse söyleyin. Aynı içerik iki iç hat uçuşuyla rahatça on güne yayılır; ikisini de yan yana fiyatlandırırız."
      ],
      highlights:[
        { i:"desert",  h:"4x4 safari ve ATV bölümü" },
        { i:"bedouin", h:"Bedevi kampı, akşam yemeği ve yıldızlar" },
        { i:"tomb",    h:"Kral Vadisi" },
        { i:"temple",  h:"Karnak ve Luksor Tapınağı" },
        { i:"balloon", h:"Şafakta Batı Yaka üzerinde sıcak hava balonu" },
        { i:"dive",    h:"Kızıldeniz'de dalış ve şnorkel" },
        { i:"island",  h:"Adalara tekne günü" },
        { i:"pyramids",h:"Giza Piramitleri ve Sfenks" },
        { i:"museum",  h:"Giza'daki yeni Mısır müzesi" }
      ],
      days:[
        { d:"1. Gün", place:"Hurghada", h:"Hurghada'ya varış",
          acts:["Havalimanı karşılama","Otele yerleşme","Hurghada şehir turu","Marinada akşam","Akşam yemeği"],
          p:"Havalimanında karşılama ve öğleden sonranın başında otelde oluyorsunuz. Şehir turu eski mahalleyi, balık pazarını ve camiyi kapsıyor ve marinada bitiyor; akşam da orada geçiyor." },
        { d:"2. Gün", place:"Doğu Çölü", h:"Çöl",
          acts:["4x4 çöl safarisi","ATV","Bedevi kampı","Yıldızlar altında akşam yemeği"],
          p:"Işığın değdiği saatte, öğleden sonranın sonunda Doğu Çölü'ne çıkış. ATV bölümü işaretli parkurda, önde bir ve arkada bir rehberle yapılıyor; akşam kampta yemek ve şehirde yaşayanların beklemediği bir gökyüzüyle bitiyor." },
        { d:"3. Gün", place:"Luksor", h:"Luksor: mezarlar ve tapınaklar",
          acts:["Erken Luksor transferi","Kral Vadisi","Karnak Tapınağı","Luksor Müzesi","Karanlıkta Luksor Tapınağı"],
          p:"Çöl yolunda erken bir başlangıç ve Thebes'te dolu bir gün: vadi hâlâ serinken önce kral mezarları, ardından Karnak, öğleden sonra müze ve akşam yemeğinden sonra aydınlatılmış Luksor Tapınağı. Geceyi Luksor'da geçiriyorsunuz." },
        { d:"4. Gün", place:"Batı Yaka, ardından Hurghada", h:"Şafakta balon, sonra denize dönüş",
          acts:["Batı Yaka üzerinde sıcak hava balonu","Hatşepsut Tapınağı","Memnon Kolosları","Hurghada'ya dönüş"],
          p:"Balon için dörtten önce kalkış; güneş doğu tepelerinden çıkarken havalanıyor ve tüm Thebes'i altınıza seriyor: mezarlar, tapınaklar, yeşil şerit ve çölün kenarı. Ardından Hatşepsut ve Kolos'lar, öğleden sonra kıyıya dönüş." },
        { d:"5. Gün", place:"Kızıldeniz", h:"Dalış ve şnorkel",
          acts:["Resiflere tekne","Sertifikalı dalgıçlar için dalış","Yeni başlayanlar için deneme dalışı","Şnorkel ve teknede öğle yemeği"],
          p:"Suda tam bir gün. Sertifikalılar dalıyor, yeni başlayanlar eğitmen eşliğinde deneme dalışı yapabiliyor, diğer herkes aynı tekneden şnorkelle yüzüyor. Noktalar o sabah rüzgâra ve dalgaya göre seçiliyor." },
        { d:"6. Gün", place:"Giftun, ardından kuzey yolu", h:"Adalar ve Kahire'ye gece yolculuğu",
          acts:["Sabah adalara tekne","Şnorkel ve plaj","Akşam Kahire'ye hareket","Gece Kahire'ye varış"],
          p:"Sabah adalar, akşam kuzeye uzun yol. Altı saat kadar süren gerçek bir yolculuk ve karşılığında ertesi günün tamamını Kahire'de kazandırıyor. Uçmayı tercih ederseniz erken söyleyin: program değişmiyor, yalnızca oraya gidiş şekli değişiyor." },
        { d:"7. Gün", place:"Kahire ve Giza", h:"Kahire ve Piramitler",
          acts:["Giza Piramitleri ve Sfenks","Yeni Mısır müzesi","Şehir turu","Akşam yemeği"],
          p:"Sabahın ilk saatinde, hâlâ sessizken plato; ardından Giza'daki müze. Tutankhamun koleksiyonu ilk kez tek bir binada bir arada. Öğleden sonra şehir, akşam yemeği ise rotanın son akşamı." },
        { d:"8. Gün", place:"Kahire", h:"Dönüş ve buradan sonrası",
          acts:["Serbest sabah","Hurghada'ya dönüş ya da","Kendi planınızla devam ya da","Kahire'den uluslararası çıkış"],
          p:"Rota Kahire'de bitiyor ve bunu bitirmenin üç olağan yolu var: Hurghada'ya geri dönmek, kendi düzenlemelerinizle devam etmek ya da ülkenin en büyük havalimanı olan ve genellikle en pratik çıkışı sunan Kahire'den uçmak. Hangisini kuracağımız uçuşlarınıza bağlı ve hiçbir şey rezerve edilmeden önce yazılı olarak netleşiyor." }
      ],
      included:[
        "Rota boyunca yedi gece: altısı otelde, biri Hurghada ile Kahire arası gece yolculuğunda",
        "Havalimanı transferleri ve karadaki tüm özel ulaşım; iki Luksor transferi ve Kahire yolculuğu dahil",
        "Her gün kahvaltı ve yukarıdaki programda adı geçen öğünler",
        "Luksor ve Kahire günlerinde lisanslı Mısırbilimci rehber; Türkçe, İngilizce ya da Almanca",
        "Programda yazan tüm ören yeri girişleri",
        "Akşam yemekli çöl safarisi, dalış günü, ada tekne günü ve 4. gündeki balon uçuşu",
        "Her saat ulaşabileceğiniz tek bir yerel irtibat"
      ],
      notIncluded:[
        "Mısır'a gidiş ve dönüş uluslararası uçuşlar",
        "Mısır giriş vizesi ve konsolosluk masrafları",
        "Seyahat sigortası ve gerekiyorsa dalış teminatı",
        "Programda adı geçmeyen ek mezar ve anıt biletleri",
        "Tüp ve ağırlık dışındaki dalış ekipmanı kiralaması",
        "Yukarıda adı geçmeyen yemekler, opsiyonel deneyimler, bahşişler ve kişisel harcamalar"
      ],
      optional:[
        "Hurghada ile Kahire arasındaki bölümün kara yolu yerine uçakla yapılması; rotaya bir akşam geri kazandırır",
        "Kahire gününe eklenen Sakkara ve Memfis",
        "İslami Kahire için dokuzuncu bir gün: Kale, İbn Tulun, Muiz Sokağı",
        "Açık olduğunda Kraliçeler Vadisi'ndeki Nefertari mezarı",
        "Sonda devam transferi: Hurghada'ya geri ya da İskenderiye veya Sina'ya"
      ],
      info:[
        ["Süre","8 gün / 7 gece"],
        ["Destinasyonlar","Hurghada · Doğu Çölü · Luksor · Kızıldeniz resifleri · Giftun · Kahire ve Giza"],
        ["Seyahat tarzı","Dolu ve geniş kapsamlı; iki gece yolculuğuyla"],
        ["Grup","Karada özel. Tekneler, özel kiralanmadıkça paylaşımlı olabilir"],
        ["Zorluk","Hareketli. İki çok erken kalkış ve bir gece yolculuğu"],
        ["Kimler için","Bir haftada ülkenin tamamını görmek isteyenler, ikinci kez gelenler, arkadaş grupları"],
        ["En iyi aylar","Ekim ile nisan arası"]
      ],
      notes:[
        "Son gün, bu rotanın gerçekten desteklediği üç kapanış üzerine yazıldı: Hurghada'ya dönüş, kendi planınızla devam ya da Kahire'den uluslararası çıkış. Hangisinin geçerli olacağı, hiçbir şey rezerve edilmeden önce uçuşlarınızla birlikte yazılı olarak netleşir.",
        "Balon, işletmenin takdirine ve uygun rüzgâra bağlı olarak uçar. Uçamadığında sabah Batı Yaka ören yerlerine kayar ve uçuş iade edilir ya da yeniden planlanır.",
        "Dalıştan sonra yaklaşık 24 saat uçulmaması gerekir. Dalış günü 5. günde, uçuş 8. günde; yine de uçuş saatinizi yazın, kontrol edelim.",
        "Kahire'ye gece yolculuğu uzundur. Sekiz günün bu kadarını taşıyabilmesinin sebebi odur ve bunu yapmak istemeyenler için ilk değiştirdiğimiz şey de odur."
      ]
    },

    de:{
      meta:"8 Tage · Küste, Nil & Hauptstadt",
      n:"Hurghada, Luxor & Kairo",
      tagline:"Küste, Fluss und Hauptstadt in einer Linie.",
      d:"Acht Tage quer durch das Land: das Rote Meer und die Wüste, eine Ballonfahrt über dem Westufer im Morgengrauen, Riff und Inseln, und am Ende die Pyramiden.",
      imgAlt:"Ein Tisch auf einer Terrasse mit Blick auf die Pyramiden von Gizeh",
      destinations:["Hurghada","Die östliche Wüste","Luxor Ostufer","Luxor Westufer","Die Riffe des Roten Meeres","Giftun","Kairo & Gizeh"],
      overview:[
        "Dies ist die längste der Routen am Roten Meer und die einzige, die Kairo erreicht. Sie verläuft Küste, Fluss, Hauptstadt: zwei Tage am Meer und in der Wüste, zwei in Luxor mit einer Ballonfahrt über dem Westufer im Morgengrauen, zurück ans Wasser für Tauchen und Inseln, dann die Straße nach Norden zu den Pyramiden und zum Museum.",
        "Für acht Tage deckt sie sehr viel ab, und zwar dadurch, dass nachts gefahren und nicht bei den Besichtigungen gekürzt wird. Wenn das nicht Ihre Art zu reisen ist, sagen Sie es: Derselbe Inhalt lässt sich mit zwei Inlandsflügen bequem auf zehn Tage strecken, und wir kalkulieren beides nebeneinander."
      ],
      highlights:[
        { i:"desert",  h:"Eine 4x4-Safari und die Quad-Etappe" },
        { i:"bedouin", h:"Ein Beduinencamp, Abendessen und Sterne" },
        { i:"tomb",    h:"Das Tal der Könige" },
        { i:"temple",  h:"Karnak- und Luxor-Tempel" },
        { i:"balloon", h:"Eine Ballonfahrt über dem Westufer im Morgengrauen" },
        { i:"dive",    h:"Tauchen und Schnorcheln am Roten Meer" },
        { i:"island",  h:"Ein Bootstag zu den Inseln" },
        { i:"pyramids",h:"Die Pyramiden von Gizeh und die Sphinx" },
        { i:"museum",  h:"Das neue ägyptische Museum in Gizeh" }
      ],
      days:[
        { d:"Tag 1", place:"Hurghada", h:"Ankunft in Hurghada",
          acts:["Flughafentransfer","Check-in im Hotel","Stadtrundgang Hurghada","Ein Abend an der Marina","Abendessen"],
          p:"Empfang am Flughafen und am frühen Nachmittag im Hotel. Der Stadtrundgang führt durch das alte Viertel, über den Fischmarkt und zur Moschee und endet an der Marina. Dort verbringt man den Abend." },
        { d:"Tag 2", place:"Östliche Wüste", h:"Die Wüste",
          acts:["4x4-Wüstensafari","Quads","Ein Beduinencamp","Abendessen unter Sternen"],
          p:"Am späten Nachmittag hinaus in die östliche Wüste, wenn das Licht lohnt. Die Quad-Etappe läuft auf markierter Strecke mit einem Guide vorn und einem hinten, und der Abend endet im Camp mit Abendessen und einem Himmel, mit dem Stadtbewohner nicht rechnen." },
        { d:"Tag 3", place:"Luxor", h:"Luxor: die Gräber und die Tempel",
          acts:["Früher Transfer nach Luxor","Tal der Könige","Karnak-Tempel","Das Luxor-Museum","Luxor-Tempel nach Einbruch der Dunkelheit"],
          p:"Früher Start über die Wüstenstraße und ein voller Tag in Theben: zuerst die Königsgräber, solange das Tal noch kühl ist, dann Karnak, nachmittags das Museum und nach dem Abendessen der beleuchtete Luxor-Tempel. Sie übernachten in Luxor." },
        { d:"Tag 4", place:"Westufer, dann Hurghada", h:"Ballon im Morgengrauen, dann zurück ans Meer",
          acts:["Ballonfahrt über dem Westufer","Tempel der Hatschepsut","Memnonkolosse","Rückfahrt nach Hurghada"],
          p:"Vor vier Uhr auf für den Ballon, der aufsteigt, wenn die Sonne über die östlichen Hügel kommt, und ganz Theben unter Sie legt: Gräber, Tempel, der grüne Streifen und der Rand der Wüste. Danach Hatschepsut und die Kolosse, am Nachmittag zurück an die Küste." },
        { d:"Tag 5", place:"Rotes Meer", h:"Tauchen und Schnorcheln",
          acts:["Mit dem Boot zu den Riffen","Tauchgänge für Brevetierte","Ein Schnuppertauchgang für Anfänger","Schnorcheln und Mittagessen an Bord"],
          p:"Ein ganzer Tag auf dem Wasser. Brevetierte tauchen, Anfänger können einen begleiteten Schnuppertauchgang machen, alle anderen schnorcheln vom selben Boot. Die Plätze werden am Morgen nach Wind und Welle gewählt." },
        { d:"Tag 6", place:"Giftun, dann nach Norden", h:"Die Inseln, dann die Nachtfahrt nach Kairo",
          acts:["Vormittags mit dem Boot zu den Inseln","Schnorcheln und Strand","Abends Aufbruch nach Kairo","Ankunft in Kairo über Nacht"],
          p:"Vormittags die Inseln, abends die lange Fahrt nach Norden. Es ist eine echte Reise von etwa sechs Stunden, und sie kauft den ganzen folgenden Tag in Kairo. Wenn Sie lieber fliegen, sagen Sie es früh: Das Programm ändert sich nicht, nur der Weg dorthin." },
        { d:"Tag 7", place:"Kairo & Gizeh", h:"Kairo und die Pyramiden",
          acts:["Die Pyramiden von Gizeh und die Sphinx","Das neue ägyptische Museum","Stadtrundfahrt","Abendessen"],
          p:"Zuerst das Plateau, solange es noch ruhig ist, dann das Museum in Gizeh, wo die Tutanchamun-Sammlung erstmals gemeinsam in einem Haus steht. Der Nachmittag gehört der Stadt, und das Abendessen ist der letzte Abend der Route." },
        { d:"Tag 8", place:"Kairo", h:"Abreise, und wie es weitergeht",
          acts:["Ein freier Vormittag","Zurück nach Hurghada, oder","Auf eigene Faust weiter, oder","Internationale Abreise ab Kairo"],
          p:"Die Route endet in Kairo, und es gibt drei gängige Arten, sie zu beenden: zurück nach Hurghada reisen, auf eigene Faust weiterziehen oder ab Kairo nach Hause fliegen, dem größten Flughafen des Landes und meist dem einfachsten Weg hinaus. Welche der drei wir bauen, hängt von Ihren Flügen ab und wird schriftlich geklärt, bevor irgendetwas gebucht wird." }
      ],
      included:[
        "Sieben Nächte auf der Route: sechs im Hotel und eine Nachtfahrt zwischen Hurghada und Kairo",
        "Flughafentransfers und sämtliche private Beförderung an Land, einschließlich beider Luxor-Transfers und der Fahrt nach Kairo",
        "Täglich Frühstück sowie die oben genannten Mahlzeiten",
        "An den Tagen in Luxor und Kairo ein lizenzierter ägyptologischer Guide, auf Türkisch, Englisch oder Deutsch",
        "Eintritt zu allen im Programm genannten Stätten",
        "Die Wüstensafari mit Abendessen, der Tauchtag, der Bootstag und die Ballonfahrt an Tag 4",
        "Ein örtlicher Ansprechpartner, rund um die Uhr erreichbar"
      ],
      notIncluded:[
        "Internationale Flüge nach und von Ägypten",
        "Das ägyptische Einreisevisum und konsularische Gebühren",
        "Reiseversicherung, gegebenenfalls einschließlich Tauchversicherung",
        "Zusätzliche Grab- und Monumenttickets, die nicht im Programm genannt sind",
        "Ausrüstungsmiete über Flaschen und Blei hinaus",
        "Nicht genannte Mahlzeiten, optionale Erlebnisse, Trinkgelder und persönliche Ausgaben"
      ],
      optional:[
        "Der Abschnitt Hurghada bis Kairo per Flug statt auf der Straße, was der Route einen Abend zurückgibt",
        "Sakkara und Memphis, ergänzt am Kairo-Tag",
        "Ein neunter Tag in Kairo für die islamische Stadt: Zitadelle, Ibn Tulun, al-Muizz-Straße",
        "Das Grab der Nefertari im Tal der Königinnen, sofern geöffnet",
        "Ein Anschlusstransfer am Ende, zurück nach Hurghada oder nach Alexandria oder auf den Sinai"
      ],
      info:[
        ["Dauer","8 Tage / 7 Nächte"],
        ["Ziele","Hurghada · die östliche Wüste · Luxor · die Riffe des Roten Meeres · Giftun · Kairo & Gizeh"],
        ["Reisestil","Voll und weiträumig, mit zwei Nachtetappen"],
        ["Gruppe","An Land privat. Boote können geteilt sein, sofern Sie nicht chartern"],
        ["Anspruch","Aktiv. Zwei sehr frühe Starts und eine Nachtfahrt"],
        ["Geeignet für","Reisende mit einer Woche, die das ganze Land wollen, zweite Besuche, Freundesgruppen"],
        ["Beste Monate","Oktober bis April"]
      ],
      notes:[
        "Der letzte Tag ist um die drei Enden herum geschrieben, die diese Route tatsächlich trägt: zurück nach Hurghada, auf eigene Faust weiter, oder internationale Abreise ab Kairo. Welches gilt, wird schriftlich mit Ihren Flügen geklärt, bevor gebucht wird.",
        "Der Ballon startet nach Ermessen des Betreibers und nur bei passendem Wind. Wenn er nicht fliegen kann, verschiebt sich der Morgen auf die Stätten des Westufers, und die Fahrt wird erstattet oder neu gelegt.",
        "Nach einem Tauchgang sollte etwa 24 Stunden nicht geflogen werden. Der Tauchtag liegt auf Tag 5, ein Flug auf Tag 8. Nennen Sie uns dennoch Ihre Flugzeit.",
        "Die Nachtfahrt nach Kairo ist lang. Sie ist der Grund, warum acht Tage so viel tragen, und zugleich das Erste, was wir für alle ändern, die sie lieber vermeiden."
      ]
    }

    } }
];

/* ------------------------------------------------------------
   SAMPLE PROGRAMME
   One route, condensed to five days, as a taste of how a programme
   is written. It sits between the catalogue and the destinations
   as the bridge into the detail views: the CTA underneath opens
   the full itinerary of the tour it is drawn from.

   It documents the SPINE OF "best-of-egypt" — Cairo, Cairo,
   Luxor, the West Bank, Abu Simbel — so the two can never drift:
   tourId below is the link, and js/main.js reads the route name
   from that entry rather than repeating it here. Repoint tourId
   at another tour and the CTA follows it.

   The content is a real working itinerary, not a brochure. Note
   what it admits: two mornings with nothing scheduled, one site
   dropped in summer, and an afternoon that is explicitly free. A
   sample programme that claims every hour is the thing customers
   have learned to distrust.
   ------------------------------------------------------------ */
const ITINERARY = {
  tourId: "best-of-egypt",
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

   Giza and Luxor are owned photography. The rest are regraded
   placeholders, and two of them are wrong on the facts rather
   than merely generic:

     * Abu Simbel shows the colossus at Luxor Temple, not Abu
       Simbel. The alt text describes only what is in frame, so
       nothing here claims otherwise, but this is the one card
       that a real photograph has to replace before launch.
     * Alexandria is a shoreline that could be almost anywhere.

   Both are still enabled: they are places the company sells, and
   an empty card would say less than a weak one.
   ------------------------------------------------------------ */
const DESTINATIONS = [
  { name:"Giza",       sub:"Rostau",                base:"assets/images/destinations/giza",       widths:[500,900], enabled:true,  alt:"The pyramid of Khafre with the Sphinx below it" },
  { name:"Luxor",      sub:"Waset",                 base:"assets/images/destinations/luxor",      widths:[500,900], enabled:true,  alt:"A visitor dwarfed by the painted columns of the hypostyle hall at Karnak" },
  { name:"Aswan",      sub:"Swenett",               base:"assets/images/destinations/aswan",      widths:[500,900], enabled:true,  alt:"A felucca under sail past the dunes at Aswan" },
  { name:"Cairo",      sub:"Al-Qahira",             base:"assets/images/destinations/cairo",      widths:[500,900], enabled:true,  alt:"Minarets and domes above the rooftops of old Cairo" },
  { name:"Abu Simbel", sub:"Meha & Ibshek",         base:"assets/images/destinations/abu-simbel", widths:[500,900], enabled:true,  alt:"A colossal seated statue of Ramesses II against a temple pylon" },
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
  { q:"They moved two days around when my flight changed. No fuss.",        who:"Demo, Name, City" },
  { q:"We asked for less walking. The whole route was rebuilt.",            who:"Demo, Name, City" },
  { q:"Someone answered at eleven at night, in Turkish.",                   who:"Demo, Name, City" },
  { q:"The driver waited three hours at the airport. Never mentioned it.",  who:"Demo, Name, City" },
  { q:"Karnak at seven in the morning was the right call.",                 who:"Demo, Name, City" },
  { q:"Prices were the same at the end as at the beginning.",               who:"Demo, Name, City" },
  { q:"Our guide knew when to stop talking.",                               who:"Demo, Name, City" },
  { q:"They told us one site was not worth the drive. It was not.",         who:"Demo, Name, City" },
  { q:"Two kids, seven days, nobody cried. Including us.",                  who:"Demo, Name, City" }
];
