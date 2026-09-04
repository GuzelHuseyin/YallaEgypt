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
  whatsapp:     "905523981104",            // +90 552 398 11 04
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
     nights     the nights of the trip. Where one of them is
                spent travelling rather than in a hotel — the
                sleeper train on tours 1 and 2 — the tour's
                "included" line splits the number out in words
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

   DAYS are the itinerary. Each is
   { d, place, h, acts[], p, stay, meals[] }: the day label, where
   it happens, its title, the four or five things it contains as a
   chip row, one honest paragraph, and the two facts a day-by-day
   is actually read for.

     stay    the hotel for THAT NIGHT, named, with "or similar"
             while the booking is a proposal rather than held.
             "" on a day the tour ends, and the row is dropped
             rather than printed empty.
     meals[] the meals actually included, in the order they are
             eaten, written in the language of the block they sit
             in. An empty array is not the same as a missing one:
             [] prints "no meals included", which is a fact, and
             a day with neither field prints no table at all.

     Both are optional per day. Tours 3, 4 and 5 predate them and
     render exactly as they did before — see dayFactsHTML in
     js/tours.js. Fill them in there and the table appears; no
     markup, no CSS, no i18n key.

   WHAT IS AND IS NOT CONFIRMED
     Tours 1 and 2 now follow a day-by-day the client supplied:
     the route, the per-day meals and the hotels are theirs, and
     the wording around them is ours. The hotels carry "or
     similar" because the bookings are not held.

     Tours 3, 4 and 5 follow the day structure the client has
     confirmed, but carry no per-day hotel or meal data yet.
     Nothing in them is invented out of nothing; they are simply
     older, and the two fields above are what they are missing.

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
     Supplied by the client, day by day, with the hotels and the
     meals named. Eight days: Cairo and Giza, the night train
     south, two nights in Aswan, the felucca and Kom Ombo, three
     nights in Luxor, and a morning flight back to Cairo.

     Abu Simbel is NOT on this route any more. It is an optional
     excursion on the free Aswan day, and it is named as one in
     "optional" and nowhere else — not in destinations, not in
     highlights, and not in the JSON-LD in index.html.
     ========================================================== */
  { id:"best-of-egypt", featured:true, days:8, nights:7,
    img:"assets/images/tours/giza-caravan-1100.webp", iw:1100, ih:825,
    hero:{ base:"assets/images/hero/giza-1", widths:[1200,2000], w:2000, h:1260 },
    price:{ from:null, currency:"EUR", per:"person" },
    t:{

    en:{
      meta:"8 days · Cairo, Aswan & Luxor",
      n:"Best of Egypt",
      tagline:"Cairo, the night train south, and the Nile from Aswan to Luxor.",
      d:"Eight days from the Pyramids to the Valley of the Kings: Giza and the Grand Egyptian Museum, the sleeper train to Aswan, a felucca and the crocodile temple at Kom Ombo, and three nights in Luxor.",
      imgAlt:"A camel train crossing the sand in front of the pyramids at Giza",
      destinations:["Cairo","Giza","Aswan","Kom Ombo","Luxor"],
      overview:[
        "Best of Egypt runs the country north to south, in the order it is easiest to travel. Two days for Cairo and Giza, the sleeper train overnight to Aswan, two days on the river there, then a felucca and Kom Ombo on the road into Luxor and three nights among the temples and tombs of ancient Thebes. One direction, no backtracking, and a flight home from Cairo at the end of it.",
        "The free time is part of the plan rather than what is left of it: a whole free day in Aswan, a free afternoon in Luxor, and evenings that belong to you. What is scheduled is scheduled properly — a Nubian family's kitchen on a river island, lunch with a family on the West Bank, tea at a village project run by the people who live around it — and the rest is deliberately open."
      ],
      highlights:[
        { i:"pyramids", h:"The Great Pyramid of Giza & the Sphinx" },
        { i:"museum",   h:"The Grand Egyptian Museum" },
        { i:"island",   h:"A Nubian village on a Nile island" },
        { i:"nile",     h:"A felucca under sail, with lunch on board" },
        { i:"temple",   h:"Kom Ombo, the temple of the crocodile god" },
        { i:"tomb",     h:"The Valley of the Kings" },
        { i:"temple",   h:"Karnak and the great hypostyle hall" },
        { i:"city",     h:"A bicycle ride through a West Bank village" }
      ],
      days:[
        { d:"Day 1", place:"Cairo", h:"Arrival in Cairo",
          acts:["Arrive at any time","Evening welcome meeting","Meet your leader","Optional dinner together"],
          p:"Arrive whenever your flight lands. Nothing is scheduled before the welcome meeting in the evening, where you meet your leader and the others travelling with you, and most people go out to dinner together afterwards. If this is your first time in Egypt, book an airport transfer in advance rather than arranging one on the concourse. There is also an optional Islamic and Coptic Cairo tour at 10:00 for anyone who adds a night beforehand.",
          stay:"Cosmopolitan Cairo Hotel",
          meals:[] },
        { d:"Day 2", place:"Cairo/Aswan", h:"Giza, the museum, and the night train south",
          acts:["The Great Pyramid of Giza","The Great Sphinx","Grand Egyptian Museum","The sleeper train to Aswan"],
          p:"The Great Pyramid and the Sphinx in the morning, while the plateau is still cool, then a guided visit to the Grand Egyptian Museum — the collection that took twenty years to build a home for. In the evening you board the overnight sleeper train south, two berths to a cabin, with dinner served on board and breakfast before Aswan.",
          stay:"Overnight sleeper train",
          meals:["Breakfast","Dinner"] },
        { d:"Day 3", place:"Aswan", h:"Into Aswan, and a Nubian village on the river",
          acts:["Free morning","The souk and the corniche","Aga Khan Mausoleum & Kitchener Island","Dinner with a Nubian family"],
          p:"The train reaches Aswan in the morning, occasionally late, which is worth knowing in advance rather than worrying about on the day. The morning is yours for the souk or a walk along the corniche. In the afternoon a boat carries on past the Aga Khan Mausoleum and Kitchener Island to one of the river islands, where you visit a Nubian village and sit down to a home-cooked dinner with a local family.",
          stay:"Obelisk Hotel Aswan",
          meals:["Breakfast","Dinner"] },
        { d:"Day 4", place:"Aswan", h:"A free day in Aswan",
          acts:["Nothing scheduled","Abu Simbel (optional)","The Unfinished Obelisk & High Dam (optional)","The Nubian Museum (optional)"],
          p:"Nothing is planned today. The long option is Abu Simbel, three hours south, and it is worth booking before you travel rather than the night before. Closer to hand there is a half day covering the Unfinished Obelisk, the High Dam and Philae Temple, and there is the Nubian Museum, which is the one indoor hour that explains most of what you have already seen here.",
          stay:"Obelisk Hotel Aswan",
          meals:["Breakfast"] },
        { d:"Day 5", place:"Aswan/Luxor", h:"A felucca, Kom Ombo, and on to Luxor",
          acts:["Felucca to Aswan Bridge","Lunch on board","The temple at Kom Ombo","Dinner at the Luxor market"],
          p:"The morning is spent under sail: a felucca down to Aswan Bridge, lunch served on board, and no engine the whole way. A private vehicle takes over from there for Kom Ombo, where the temple stands right at the water's edge and is divided between two gods — one of them a crocodile, and the mummified ones are still on site. Into Luxor in the evening, and dinner at the market.",
          stay:"Emilio Hotel Luxor or similar",
          meals:["Breakfast","Lunch","Dinner"] },
        { d:"Day 6", place:"Luxor", h:"The Valley of the Kings and the West Bank",
          acts:["Valley of the Kings","Temple of Hatshepsut","Colossi of Memnon","Lunch with a local family","An alabaster workshop"],
          p:"An early crossing to the West Bank for the Valley of the Kings. Bring 300 EGP in cash if you want to take a camera in — the photo permit is bought at the gate. Hatshepsut's terraced temple and the Colossi of Memnon follow, then lunch cooked at home by a family on the West Bank and a stop at an alabaster workshop on the way back into town. The afternoon is free.",
          stay:"Emilio Hotel Luxor or similar",
          meals:["Breakfast","Lunch"] },
        { d:"Day 7", place:"Luxor", h:"Karnak, and a village on the West Bank",
          acts:["Karnak Temple","The local ferry across","A cycle through the village","The Funtasia Project Centre","Free time at the bazaar"],
          p:"Karnak in the morning, while the hypostyle hall is still cool and half empty. Afterwards the local ferry across the river, where a student guide leads a ride through the village by bicycle, and tea at the Funtasia Project Centre, a Planeterra project run by and for the people who live around it. The rest of the day is yours; the bazaar is best walked slowly.",
          stay:"Emilio Hotel Luxor or similar",
          meals:["Breakfast"] },
        { d:"Day 8", place:"Luxor/Cairo", h:"North to Cairo, and departure",
          acts:["Morning flight to Cairo","The trip ends at the airport","Memphis & Saqqara (optional)","Onward flights after 14:00"],
          p:"A morning flight north, and the trip ends when you land at Cairo International. Do not book an onward flight before 14:00, and if you are staying on in Egypt, book the extra nights before you travel rather than at the desk. There is an optional Memphis and Saqqara excursion that leaves from the airport at about 10:30 and finishes at the group hotel in the afternoon; if you are flying home the same day, that means a departure after 18:00.",
          stay:"",
          meals:["Breakfast"] }
      ],
      included:[
        "Seven nights: six in the hotels named in the day-by-day above, and one in a twin-berth cabin on the sleeper train",
        "The meals named in the day-by-day above",
        "The overnight sleeper train from Cairo to Aswan",
        "The internal flight from Luxor to Cairo",
        "A tour leader for the whole trip, and licensed local guides at the sites",
        "All transport on the itinerary, including the felucca to Aswan Bridge",
        "Entrance to every site listed in the itinerary",
        "One local contact, reachable at any hour from landing to departure"
      ],
      notIncluded:[
        "International flights to and from Egypt",
        "The Egyptian entry visa and any consular fees",
        "Travel insurance",
        "Airport transfers, unless arranged in advance",
        "Meals and drinks not named above",
        "The 300 EGP camera permit at the Valley of the Kings",
        "Optional excursions, tips, and anything of a personal nature"
      ],
      optional:[
        "Abu Simbel from Aswan on the free day, best booked before you travel",
        "A half day covering the Unfinished Obelisk, the High Dam and Philae Temple",
        "The Nubian Museum in Aswan",
        "Islamic and Coptic Cairo on the first morning, with an extra night in Cairo beforehand",
        "Memphis and Saqqara on the last day, straight from the airport"
      ],
      info:[
        ["Duration","8 days / 7 nights"],
        ["Destinations","Cairo · Giza · Aswan · Kom Ombo · Luxor"],
        ["Travel style","Culture-led, with the free time built in rather than left over"],
        ["Group","Small group with a tour leader throughout. The same route runs as a private departure on request"],
        ["Activity level","Moderate. Long visits on uneven ground, one night on a train, and two early starts"],
        ["Best for","First visits that want the whole country in one line, and travellers who would rather not drive it themselves"],
        ["Best months","October to April. May to September works with early starts and afternoons indoors"]
      ],
      notes:[
        "Trains in Egypt occasionally run late. Day three is written with that in mind: nothing is scheduled before the afternoon.",
        "A camera permit in the Valley of the Kings costs 300 EGP, is bought at the gate and is payable in cash. Phones are free.",
        "Abu Simbel is an optional excursion on the free Aswan day rather than a scheduled one, and places go early. Arrange it before you travel.",
        "Opening hours, ticket rules and which tombs are open change through the year. Your written programme is checked against the current position before anything is booked.",
        "The trip ends at Cairo airport on the morning of day eight. Book onward flights after 14:00, or after 18:00 if you take the Memphis and Saqqara excursion."
      ]
    },

    tr:{
      meta:"8 Gün · Kahire, Asvan ve Luksor",
      n:"En İyisiyle Mısır",
      tagline:"Kahire, güneye gece treni ve Asvan'dan Luksor'a Nil.",
      d:"Piramitlerden Kral Vadisi'ne sekiz gün: Giza ve Büyük Mısır Müzesi, Asvan'a gece treni, bir felucca ve Kom Ombo'daki timsah tapınağı, ardından Luksor'da üç gece.",
      imgAlt:"Giza piramitlerinin önünde kumu geçen bir deve kervanı",
      destinations:["Kahire","Giza","Asvan","Kom Ombo","Luksor"],
      overview:[
        "En İyisiyle Mısır, ülkeyi kuzeyden güneye, en kolay gezilebilecek sırayla kat ediyor. Kahire ve Giza için iki gün, gece treniyle Asvan'a geçiş, orada nehir kıyısında iki gün, sonra Luksor yolunda felucca ve Kom Ombo, ardından antik Thebes'in tapınakları ve mezarları arasında üç gece. Tek yön, geri dönüş yok ve sonunda Kahire'den dönüş uçuşu.",
        "Boş zaman, artakalan değil planın parçası: Asvan'da tam bir serbest gün, Luksor'da serbest bir öğleden sonra ve size ait akşamlar. Planlanan şeyler ise gerçekten planlanmış — nehir adasında bir Nubya ailesinin mutfağı, Batı Yaka'da bir ailenin evinde öğle yemeği, orada yaşayanların yürüttüğü bir köy projesinde çay — gerisi bilerek açık bırakıldı."
      ],
      highlights:[
        { i:"pyramids", h:"Giza'nın Büyük Piramidi ve Sfenks" },
        { i:"museum",   h:"Büyük Mısır Müzesi" },
        { i:"island",   h:"Nil adasında bir Nubya köyü" },
        { i:"nile",     h:"Yelken açmış bir felucca, teknede öğle yemeği" },
        { i:"temple",   h:"Kom Ombo, timsah tanrının tapınağı" },
        { i:"tomb",     h:"Kral Vadisi" },
        { i:"temple",   h:"Karnak ve dev sütunlu salon" },
        { i:"city",     h:"Batı Yaka'da bisikletle bir köy turu" }
      ],
      days:[
        { d:"1. Gün", place:"Kahire", h:"Kahire'ye varış",
          acts:["İstediğiniz saatte varış","Akşam karşılama toplantısı","Tur liderinizle tanışma","Opsiyonel ortak akşam yemeği"],
          p:"Uçağınız kaçta inerse insin. Akşamki karşılama toplantısından önce hiçbir şey planlanmadı; orada tur lideriniz ve sizinle birlikte seyahat edecek kişilerle tanışıyorsunuz ve çoğu kişi ardından birlikte yemeğe çıkıyor. Mısır'a ilk kez geliyorsanız havalimanı transferini terminalde ayarlamak yerine önceden ayırtın. Bir gece önceden gelenler için saat 10:00'da başlayan opsiyonel bir İslami ve Kıpti Kahire turu da var.",
          stay:"Cosmopolitan Cairo Hotel",
          meals:[] },
        { d:"2. Gün", place:"Kahire/Asvan", h:"Giza, müze ve güneye gece treni",
          acts:["Giza'nın Büyük Piramidi","Büyük Sfenks","Büyük Mısır Müzesi","Asvan'a gece treni"],
          p:"Sabah, plato henüz serinken Büyük Piramit ve Sfenks; ardından rehberli olarak Büyük Mısır Müzesi — kendine bir ev bulması yirmi yıl süren koleksiyon. Akşam güneye giden gece trenine biniyorsunuz: kabin başına iki kuşet, trende akşam yemeği ve Asvan'dan önce kahvaltı.",
          stay:"Gece treni, kuşetli kabin",
          meals:["Kahvaltı","Akşam yemeği"] },
        { d:"3. Gün", place:"Asvan", h:"Asvan'a varış ve nehirde bir Nubya köyü",
          acts:["Serbest sabah","Çarşı ve kordon","Ağa Han Türbesi ve Kitchener Adası","Nubyalı bir ailede akşam yemeği"],
          p:"Tren sabah Asvan'a varıyor; zaman zaman geç kalabiliyor ve bunu o gün endişelenmek yerine önceden bilmek daha iyi. Sabah, çarşı ya da nehir kıyısında bir yürüyüş için serbest. Öğleden sonra tekne Ağa Han Türbesi ve Kitchener Adası'nın yanından geçerek nehir adalarından birine ulaşıyor; orada bir Nubya köyünü geziyor ve bir ailenin evinde ev yemeği sofrasına oturuyorsunuz.",
          stay:"Obelisk Hotel Aswan",
          meals:["Kahvaltı","Akşam yemeği"] },
        { d:"4. Gün", place:"Asvan", h:"Asvan'da serbest gün",
          acts:["Program yok","Abu Simbel (opsiyonel)","Bitmemiş Obelisk ve Baraj (opsiyonel)","Nubya Müzesi (opsiyonel)"],
          p:"Bugün hiçbir şey planlanmadı. Uzun seçenek Abu Simbel: üç saat güneyde ve bir gece önceden değil, seyahatten önce ayırtmakta fayda var. Daha yakında Bitmemiş Obelisk, Yüksek Baraj ve Philae Tapınağı'nı kapsayan yarım günlük bir tur var; bir de Nubya Müzesi, burada gördüklerinizin çoğunu açıklayan tek kapalı mekân saati.",
          stay:"Obelisk Hotel Aswan",
          meals:["Kahvaltı"] },
        { d:"5. Gün", place:"Asvan/Luksor", h:"Felucca, Kom Ombo ve Luksor yolu",
          acts:["Asvan Köprüsü'ne felucca","Teknede öğle yemeği","Kom Ombo Tapınağı","Luksor çarşısında akşam yemeği"],
          p:"Sabah yelken altında geçiyor: Asvan Köprüsü'ne kadar bir felucca, teknede öğle yemeği ve yol boyunca motor sesi yok. Oradan özel araçla Kom Ombo'ya devam ediyoruz; tapınak tam suyun kıyısında duruyor ve iki tanrı arasında bölüşülmüş — biri timsah, mumyalanmış olanları hâlâ yerinde. Akşam Luksor'a varış ve çarşıda akşam yemeği.",
          stay:"Emilio Hotel Luxor ya da benzeri",
          meals:["Kahvaltı","Öğle yemeği","Akşam yemeği"] },
        { d:"6. Gün", place:"Luksor", h:"Kral Vadisi ve Batı Yaka",
          acts:["Kral Vadisi","Hatşepsut Tapınağı","Memnon Kolosları","Bir ailede öğle yemeği","Kaymaktaşı atölyesi"],
          p:"Erkenden Batı Yaka'ya geçip Kral Vadisi'ne. Fotoğraf makinesiyle girmek isterseniz yanınızda 300 EGP nakit bulundurun; izin belgesi kapıda alınıyor. Ardından Hatşepsut'un teraslı tapınağı ve Memnon Kolosları, sonra Batı Yaka'da bir ailenin evinde pişmiş öğle yemeği ve dönüş yolunda bir kaymaktaşı atölyesi. Öğleden sonra serbest.",
          stay:"Emilio Hotel Luxor ya da benzeri",
          meals:["Kahvaltı","Öğle yemeği"] },
        { d:"7. Gün", place:"Luksor", h:"Karnak ve Batı Yaka'da bir köy",
          acts:["Karnak Tapınağı","Karşıya vapur","Bisikletle köy turu","Funtasia Proje Merkezi","Çarşıda serbest zaman"],
          p:"Sabah Karnak; sütunlu salon henüz serin ve yarı boş. Ardından yerel vapurla karşıya geçiyoruz: öğrenci bir rehber eşliğinde bisikletle köy turu ve Funtasia Proje Merkezi'nde çay — çevresinde yaşayanlar tarafından, onlar için yürütülen bir Planeterra projesi. Günün kalanı size ait; çarşı yavaş yürünürse daha iyi.",
          stay:"Emilio Hotel Luxor ya da benzeri",
          meals:["Kahvaltı"] },
        { d:"8. Gün", place:"Luksor/Kahire", h:"Kuzeye, Kahire'ye ve dönüş",
          acts:["Sabah Kahire uçuşu","Tur havalimanında sona erer","Memfis ve Sakkara (opsiyonel)","14:00 sonrası bağlantı uçuşu"],
          p:"Sabah kuzeye bir uçuş ve tur, Kahire Uluslararası Havalimanı'na inişle sona eriyor. Bağlantı uçuşunuzu 14:00'ten önceye almayın; Mısır'da kalacaksanız ek geceleri resepsiyonda değil, seyahatten önce ayırtın. Havalimanından yaklaşık 10:30'da kalkıp öğleden sonra grup otelinde biten opsiyonel bir Memfis ve Sakkara turu var; aynı gün dönüyorsanız bu, 18:00'den sonraki bir uçuş demek.",
          stay:"",
          meals:["Kahvaltı"] }
      ],
      included:[
        "Yedi gece: altısı yukarıdaki programda adı geçen otellerde, biri gece treninde iki kuşetli kabinde",
        "Yukarıdaki programda adı geçen öğünler",
        "Kahire'den Asvan'a gece treni",
        "Luksor'dan Kahire'ye iç hat uçuşu",
        "Tur boyunca bir tur lideri ve ören yerlerinde lisanslı yerel rehberler",
        "Programdaki tüm ulaşım ve Asvan Köprüsü'ne felucca",
        "Programda yazan tüm ören yeri girişleri",
        "İnişten dönüşe kadar her saat ulaşabileceğiniz tek bir yerel irtibat"
      ],
      notIncluded:[
        "Mısır'a gidiş ve dönüş uluslararası uçuşlar",
        "Mısır giriş vizesi ve konsolosluk masrafları",
        "Seyahat sigortası",
        "Önceden ayarlanmadıysa havalimanı transferleri",
        "Yukarıda adı geçmeyen yemek ve içecekler",
        "Kral Vadisi'nde 300 EGP fotoğraf izni",
        "Opsiyonel turlar, bahşişler ve kişisel harcamalar"
      ],
      optional:[
        "Serbest günde Asvan'dan Abu Simbel; seyahatten önce ayırtmak en iyisi",
        "Bitmemiş Obelisk, Yüksek Baraj ve Philae Tapınağı'nı kapsayan yarım gün",
        "Asvan'da Nubya Müzesi",
        "İlk sabah İslami ve Kıpti Kahire; öncesinde Kahire'de bir ek gece gerekir",
        "Son gün, doğrudan havalimanından Memfis ve Sakkara"
      ],
      info:[
        ["Süre","8 gün / 7 gece"],
        ["Destinasyonlar","Kahire · Giza · Asvan · Kom Ombo · Luksor"],
        ["Seyahat tarzı","Kültür ağırlıklı; boş zaman artakalan değil, planın parçası"],
        ["Grup","Tur boyunca tur liderli küçük grup. Aynı rota talep üzerine özel hareket olarak da düzenlenir"],
        ["Zorluk","Orta. Engebeli zeminde uzun geziler, trende bir gece ve iki erken kalkış"],
        ["Kimler için","Ülkeyi tek bir hatta görmek isteyen ilk ziyaretçiler ve bu yolu kendisi sürmek istemeyenler"],
        ["En iyi aylar","Ekim ile nisan arası. Mayıs ile eylül arasında erken kalkış ve kapalı mekânlı öğleden sonralarla mümkün"]
      ],
      notes:[
        "Mısır'da trenler zaman zaman geç kalıyor. Üçüncü gün buna göre yazıldı: öğleden sonraya kadar hiçbir şey planlanmadı.",
        "Kral Vadisi'nde fotoğraf makinesi izni 300 EGP, kapıda ve nakit alınıyor. Telefonlar ücretsiz.",
        "Abu Simbel programa dahil değil, Asvan'daki serbest günün opsiyonel turu; kontenjan erken doluyor, seyahatten önce ayarlayın.",
        "Açılış saatleri, bilet kuralları ve hangi mezarların açık olduğu yıl içinde değişiyor. Yazılı programınız, hiçbir şey rezerve edilmeden önce güncel duruma göre kontrol ediliyor.",
        "Tur, sekizinci günün sabahı Kahire havalimanında sona eriyor. Dönüş uçuşunuzu 14:00'ten sonraya, Memfis ve Sakkara turunu alacaksanız 18:00'den sonraya alın."
      ]
    },

    de:{
      meta:"8 Tage · Kairo, Assuan & Luxor",
      n:"Das Beste Ägyptens",
      tagline:"Kairo, der Nachtzug nach Süden und der Nil von Assuan bis Luxor.",
      d:"Acht Tage von den Pyramiden bis ins Tal der Könige: Gizeh und das Grand Egyptian Museum, der Nachtzug nach Assuan, eine Feluke und der Krokodiltempel von Kom Ombo, dazu drei Nächte in Luxor.",
      imgAlt:"Eine Kamelkarawane zieht vor den Pyramiden von Gizeh durch den Sand",
      destinations:["Kairo","Gizeh","Assuan","Kom Ombo","Luxor"],
      overview:[
        "Das Beste Ägyptens durchquert das Land von Norden nach Süden, in der Reihenfolge, in der es sich am leichtesten bereisen lässt. Zwei Tage für Kairo und Gizeh, über Nacht mit dem Schlafwagen nach Assuan, dort zwei Tage am Fluss, dann eine Feluke und Kom Ombo auf dem Weg nach Luxor und drei Nächte zwischen den Tempeln und Gräbern des alten Theben. Eine Richtung, kein Zurück, und am Ende der Rückflug ab Kairo.",
        "Die freie Zeit ist Teil des Plans und nicht das, was übrig bleibt: ein ganzer freier Tag in Assuan, ein freier Nachmittag in Luxor und Abende, die Ihnen gehören. Was geplant ist, ist richtig geplant — die Küche einer nubischen Familie auf einer Nilinsel, das Mittagessen bei einer Familie am Westufer, Tee in einem Dorfprojekt, das von den Menschen vor Ort geführt wird. Der Rest bleibt bewusst offen."
      ],
      highlights:[
        { i:"pyramids", h:"Die Cheops-Pyramide von Gizeh & die Sphinx" },
        { i:"museum",   h:"Das Grand Egyptian Museum" },
        { i:"island",   h:"Ein nubisches Dorf auf einer Nilinsel" },
        { i:"nile",     h:"Eine Feluke unter Segeln, mit Mittagessen an Bord" },
        { i:"temple",   h:"Kom Ombo, der Tempel des Krokodilgottes" },
        { i:"tomb",     h:"Das Tal der Könige" },
        { i:"temple",   h:"Karnak und die große Säulenhalle" },
        { i:"city",     h:"Mit dem Rad durch ein Dorf am Westufer" }
      ],
      days:[
        { d:"Tag 1", place:"Kairo", h:"Ankunft in Kairo",
          acts:["Ankunft zu jeder Zeit","Willkommenstreffen am Abend","Ihre Reiseleitung kennenlernen","Optionales gemeinsames Abendessen"],
          p:"Kommen Sie an, wann immer Ihr Flug landet. Vor dem Willkommenstreffen am Abend ist nichts geplant; dort lernen Sie Ihre Reiseleitung und die anderen Mitreisenden kennen, und die meisten gehen anschließend gemeinsam essen. Wenn Sie zum ersten Mal in Ägypten sind, buchen Sie den Flughafentransfer vorab und nicht erst in der Ankunftshalle. Für alle, die eine Nacht früher anreisen, gibt es zusätzlich eine optionale Tour durch das islamische und koptische Kairo, Beginn um 10:00 Uhr.",
          stay:"Cosmopolitan Cairo Hotel",
          meals:[] },
        { d:"Tag 2", place:"Kairo/Assuan", h:"Gizeh, das Museum und der Nachtzug nach Süden",
          acts:["Die Cheops-Pyramide","Die Große Sphinx","Grand Egyptian Museum","Der Nachtzug nach Assuan"],
          p:"Am Vormittag die Cheops-Pyramide und die Sphinx, solange das Plateau noch kühl ist, danach eine Führung durch das Grand Egyptian Museum — jene Sammlung, für die zwanzig Jahre lang ein Haus gebaut wurde. Am Abend steigen Sie in den Nachtzug nach Süden: zwei Betten je Abteil, Abendessen an Bord und Frühstück vor Assuan.",
          stay:"Nachtzug, Schlafwagenabteil",
          meals:["Frühstück","Abendessen"] },
        { d:"Tag 3", place:"Assuan", h:"Ankunft in Assuan und ein nubisches Dorf am Fluss",
          acts:["Freier Vormittag","Souk und Corniche","Aga-Khan-Mausoleum & Kitchener-Insel","Abendessen bei einer nubischen Familie"],
          p:"Der Zug erreicht Assuan am Vormittag, gelegentlich mit Verspätung, was man besser vorher weiß, als sich am Tag selbst darüber zu ärgern. Der Vormittag gehört Ihnen, für den Souk oder einen Spaziergang an der Corniche. Am Nachmittag fährt ein Boot am Aga-Khan-Mausoleum und an der Kitchener-Insel vorbei zu einer der Nilinseln; dort besuchen Sie ein nubisches Dorf und essen bei einer Familie zu Hause.",
          stay:"Obelisk Hotel Aswan",
          meals:["Frühstück","Abendessen"] },
        { d:"Tag 4", place:"Assuan", h:"Ein freier Tag in Assuan",
          acts:["Nichts geplant","Abu Simbel (optional)","Unvollendeter Obelisk & Staudamm (optional)","Das Nubische Museum (optional)"],
          p:"Heute ist nichts geplant. Die lange Variante ist Abu Simbel, drei Stunden südlich, und sie sollte vor der Reise gebucht werden und nicht am Abend davor. Näher liegen ein halber Tag mit dem Unvollendeten Obelisken, dem Hochdamm und dem Philae-Tempel sowie das Nubische Museum, jene eine Stunde im Innenraum, die das meiste von dem erklärt, was Sie hier schon gesehen haben.",
          stay:"Obelisk Hotel Aswan",
          meals:["Frühstück"] },
        { d:"Tag 5", place:"Assuan/Luxor", h:"Eine Feluke, Kom Ombo und weiter nach Luxor",
          acts:["Feluke bis zur Assuan-Brücke","Mittagessen an Bord","Der Tempel von Kom Ombo","Abendessen auf dem Markt von Luxor"],
          p:"Der Vormittag vergeht unter Segeln: mit der Feluke bis zur Assuan-Brücke, Mittagessen an Bord und die ganze Strecke ohne Motor. Von dort übernimmt ein privates Fahrzeug bis Kom Ombo, wo der Tempel unmittelbar am Wasser steht und zwischen zwei Göttern geteilt ist — einer davon ein Krokodil, und die mumifizierten liegen noch vor Ort. Am Abend Ankunft in Luxor und Abendessen auf dem Markt.",
          stay:"Emilio Hotel Luxor oder ähnlich",
          meals:["Frühstück","Mittagessen","Abendessen"] },
        { d:"Tag 6", place:"Luxor", h:"Das Tal der Könige und das Westufer",
          acts:["Tal der Könige","Tempel der Hatschepsut","Memnonkolosse","Mittagessen bei einer Familie","Eine Alabasterwerkstatt"],
          p:"Früh über den Fluss ans Westufer, ins Tal der Könige. Nehmen Sie 300 EGP in bar mit, wenn Sie eine Kamera hineinnehmen möchten — die Fotoerlaubnis wird am Eingang gekauft. Danach der Terrassentempel der Hatschepsut und die Memnonkolosse, anschließend ein zu Hause gekochtes Mittagessen bei einer Familie am Westufer und auf dem Rückweg ein Halt in einer Alabasterwerkstatt. Der Nachmittag ist frei.",
          stay:"Emilio Hotel Luxor oder ähnlich",
          meals:["Frühstück","Mittagessen"] },
        { d:"Tag 7", place:"Luxor", h:"Karnak und ein Dorf am Westufer",
          acts:["Karnak-Tempel","Mit der Fähre hinüber","Mit dem Rad durchs Dorf","Das Funtasia-Projektzentrum","Freie Zeit im Basar"],
          p:"Am Vormittag Karnak, solange die Säulenhalle noch kühl und halb leer ist. Danach mit der örtlichen Fähre über den Fluss: eine Radtour durch das Dorf mit einem studentischen Guide und Tee im Funtasia-Projektzentrum, einem Planeterra-Projekt, das von den Menschen der Umgebung und für sie geführt wird. Der Rest des Tages gehört Ihnen; den Basar geht man am besten langsam.",
          stay:"Emilio Hotel Luxor oder ähnlich",
          meals:["Frühstück"] },
        { d:"Tag 8", place:"Luxor/Kairo", h:"Nach Norden nach Kairo, und Abreise",
          acts:["Vormittagsflug nach Kairo","Die Reise endet am Flughafen","Memphis & Sakkara (optional)","Anschlussflüge ab 14:00 Uhr"],
          p:"Ein Flug am Vormittag nach Norden, und die Reise endet mit der Landung in Kairo International. Buchen Sie keinen Anschlussflug vor 14:00 Uhr, und wenn Sie in Ägypten bleiben, buchen Sie die zusätzlichen Nächte vor der Reise und nicht erst an der Rezeption. Es gibt einen optionalen Ausflug nach Memphis und Sakkara, der gegen 10:30 Uhr am Flughafen startet und am Nachmittag am Gruppenhotel endet; wer am selben Tag heimfliegt, sollte dafür einen Abflug nach 18:00 Uhr wählen.",
          stay:"",
          meals:["Frühstück"] }
      ],
      included:[
        "Sieben Nächte: sechs in den oben im Tagesprogramm genannten Hotels und eine im Zweibettabteil des Nachtzugs",
        "Die oben im Tagesprogramm genannten Mahlzeiten",
        "Der Nachtzug von Kairo nach Assuan",
        "Der Inlandsflug von Luxor nach Kairo",
        "Eine Reiseleitung für die gesamte Reise und lizenzierte örtliche Guides an den Stätten",
        "Sämtliche Beförderung des Programms, einschließlich der Feluke bis zur Assuan-Brücke",
        "Eintritt zu allen im Programm genannten Stätten",
        "Ein örtlicher Ansprechpartner, von der Landung bis zur Abreise rund um die Uhr erreichbar"
      ],
      notIncluded:[
        "Internationale Flüge nach und von Ägypten",
        "Das ägyptische Einreisevisum und konsularische Gebühren",
        "Reiseversicherung",
        "Flughafentransfers, sofern nicht vorab vereinbart",
        "Nicht genannte Mahlzeiten und Getränke",
        "Die Fotoerlaubnis von 300 EGP im Tal der Könige",
        "Optionale Ausflüge, Trinkgelder und persönliche Ausgaben"
      ],
      optional:[
        "Abu Simbel ab Assuan am freien Tag, am besten vor der Reise gebucht",
        "Ein halber Tag mit dem Unvollendeten Obelisken, dem Hochdamm und dem Philae-Tempel",
        "Das Nubische Museum in Assuan",
        "Islamisches und koptisches Kairo am ersten Vormittag, mit einer zusätzlichen Nacht in Kairo davor",
        "Memphis und Sakkara am letzten Tag, direkt vom Flughafen aus"
      ],
      info:[
        ["Dauer","8 Tage / 7 Nächte"],
        ["Ziele","Kairo · Gizeh · Assuan · Kom Ombo · Luxor"],
        ["Reisestil","Kulturbetont, mit eingeplanter statt übrig gebliebener freier Zeit"],
        ["Gruppe","Kleine Gruppe mit durchgehender Reiseleitung. Dieselbe Route auf Wunsch auch als private Abreise"],
        ["Anspruch","Mittel. Lange Besichtigungen auf unebenem Boden, eine Nacht im Zug und zwei frühe Starts"],
        ["Geeignet für","Erstbesuche, die das Land in einer Linie sehen wollen, und alle, die diese Strecke nicht selbst fahren möchten"],
        ["Beste Monate","Oktober bis April. Mai bis September mit frühen Starts und Nachmittagen im Innenraum"]
      ],
      notes:[
        "Züge in Ägypten haben gelegentlich Verspätung. Tag drei ist darauf ausgelegt: vor dem Nachmittag ist nichts geplant.",
        "Die Fotoerlaubnis im Tal der Könige kostet 300 EGP, wird am Eingang gekauft und ist bar zu zahlen. Handys sind frei.",
        "Abu Simbel ist ein optionaler Ausflug am freien Tag in Assuan und nicht Teil des Programms. Die Plätze sind früh vergeben, planen Sie ihn vor der Reise ein.",
        "Öffnungszeiten, Ticketregeln und die Frage, welche Gräber geöffnet sind, ändern sich im Jahresverlauf. Ihr schriftliches Programm wird vor jeder Buchung gegen den aktuellen Stand geprüft.",
        "Die Reise endet am Vormittag des achten Tages am Flughafen Kairo. Buchen Sie Anschlussflüge nach 14:00 Uhr, bei Teilnahme am Ausflug nach Memphis und Sakkara nach 18:00 Uhr."
      ]
    }

    } },

  /* ==========================================================
     02 · EGYPT FAMILY HOLIDAY
     Supplied by the client, day by day, with the hotels and the
     meals named. Nine days, and no longer a single base on the
     coast: Cairo and Giza, the night train, two nights in Aswan,
     two in Luxor, then two all-inclusive nights in Hurghada.

     The culture is front-loaded while everyone is fresh and the
     week ends on the beach, which is the shape the card and the
     Red Sea photograph are selling.
     ========================================================== */
  { id:"egypt-family-holiday", days:9, nights:8,
    img:"assets/images/tours/red-sea-coast-1100.webp", iw:1100, ih:825,
    hero:{ base:"assets/images/hero/redsea-1", widths:[1200,2000], w:2000, h:1260 },
    price:{ from:null, currency:"EUR", per:"person" },
    t:{

    en:{
      meta:"9 days · Cairo, Aswan, Luxor & Hurghada",
      n:"Egypt Family Holiday",
      tagline:"The whole country first, and the Red Sea to finish.",
      d:"Nine days built for families: the Pyramids and the Grand Egyptian Museum, the sleeper train south, Aswan and Luxor with a family kitchen in each, then two all-inclusive nights on the Red Sea.",
      imgAlt:"Red Sea coastline where the desert mountains meet the water",
      destinations:["Cairo","Giza","Aswan","Luxor","Hurghada","The Red Sea"],
      overview:[
        "This is the route for families who want to see the country properly and still come home rested. The culture is front-loaded, while everybody is fresh: Giza and the Grand Egyptian Museum on day two, the sleeper train south, Philae and a felucca at Aswan, then Karnak and the Valley of the Kings. The last three days are on the Red Sea, all-inclusive, with nothing scheduled at all.",
        "It is built around the things children actually remember rather than the things brochures list — koshary in a Cairo restaurant, a night on a train, dinner in a Nubian village, lunch cooked by a family on the West Bank, and water shallow enough to stand up in. There are two whole free days in the middle of it, and where an activity carries an age or a health limit we say so before you book rather than at the jetty."
      ],
      highlights:[
        { i:"pyramids", h:"The Pyramids of Giza & the Great Sphinx" },
        { i:"museum",   h:"The Grand Egyptian Museum" },
        { i:"nile",     h:"A felucca on the Nile at sunset" },
        { i:"bedouin",  h:"Dinner with a family in a Nubian village" },
        { i:"temple",   h:"Karnak and the Avenue of Sphinxes" },
        { i:"tomb",     h:"The Valley of the Kings, and three tombs" },
        { i:"sea",      h:"Two all-inclusive nights on the Red Sea" },
        { i:"snorkel",  h:"Snorkelling on the reef (optional)" }
      ],
      days:[
        { d:"Day 1", place:"Cairo", h:"Arrival in Cairo",
          acts:["Arrive at any time","Welcome meeting at 5 pm","Coptic Cairo or the markets","Optional dinner together"],
          p:"The only fixed point today is the welcome meeting at five. Arrive earlier and there is time for the markets, or for Coptic Cairo, where the Hanging Church and the Ben Ezra Synagogue stand a few minutes' walk apart. Afterwards most people go out to dinner with the leader. If you have a spare morning, Saqqara and Memphis, or the National Museum of Egyptian Civilisation with its Royal Mummy Room, both run as optional excursions.",
          stay:"Pyramids Park Hotel or similar",
          meals:["Dinner"] },
        { d:"Day 2", place:"Cairo", h:"Giza, the museum, and the night train south",
          acts:["The Giza plateau","The Great Sphinx","Koshary for lunch","Grand Egyptian Museum","The sleeper train to Aswan"],
          p:"Out to Giza in the morning for the long view across the plateau and a walk up to the Great Sphinx, then koshary at a local restaurant — lentils, rice, pasta and fried onions, and the one Egyptian dish children reliably finish. The Grand Egyptian Museum follows in the afternoon. In the evening you board the overnight sleeper train to Aswan. Going inside the Great Pyramid of Cheops, or the smaller pyramid of Menkaure, is a separate ticket bought on the day.",
          stay:"Overnight sleeper train",
          meals:["Breakfast","Dinner"] },
        { d:"Day 3", place:"Aswan", h:"Philae, and dinner in a Nubian village",
          acts:["Arrive in Aswan","Drop the bags at the hotel","Philae Temple on Agilkia Island","A free afternoon","Dinner with a Nubian family"],
          p:"The train arrives in the morning. Bags go to the hotel and a boat takes you out to Agilkia Island for Philae, the temple of Isis, which was cut into pieces and moved here block by block when the dam went up. The afternoon is free. In the evening you cross to a Nubian village for dinner with a family at home — the houses are painted, the walk to them is short, and it is usually the evening children talk about afterwards.",
          stay:"Obelisk Hotel or similar",
          meals:["Breakfast","Dinner"] },
        { d:"Day 4", place:"Aswan", h:"A free day, and a felucca at sunset",
          acts:["Nothing scheduled","Abu Simbel (optional)","The Unfinished Obelisk (optional)","A felucca at sunset","Dinner in town"],
          p:"The day is yours. Abu Simbel is the long option, three hours south and back by mid-afternoon; the Unfinished Obelisk is the short one, still lying in the granite quarry where it cracked. Either way the evening is a felucca on the Nile as the sun goes down — no engine, no schedule, and the water is usually flat. Dinner afterwards at a restaurant in town.",
          stay:"Obelisk Hotel or similar",
          meals:["Breakfast","Dinner"] },
        { d:"Day 5", place:"Luxor", h:"North to Luxor, and Karnak",
          acts:["Road transfer to Luxor","The Avenue of Sphinxes","The Great Temple of Amun","Animal Care in Egypt","Karnak sound and light (optional)"],
          p:"The road north to Luxor, and then Karnak: the Avenue of Sphinxes, the Great Temple of Amun, and a hypostyle hall that no photograph has ever managed. Later there is a visit to Animal Care in Egypt, a working veterinary clinic and an Intrepid Foundation partner, which treats the horses and donkeys the town runs on. The sound and light show at Karnak is an optional extra in the evening.",
          stay:"Pyramisa Isis Hotel or similar",
          meals:["Breakfast"] },
        { d:"Day 6", place:"Luxor", h:"The Valley of the Kings",
          acts:["Valley of the Kings","Entry to three tombs","Lunch with a local family","A free afternoon","A sunrise balloon (optional)"],
          p:"An early crossing to the Valley of the Kings, where the standard ticket covers three tombs; the tomb of Tutankhamun is a separate ticket if you want it. Afterwards, lunch cooked at home by a family, and a free afternoon. Anyone who wants to see the valley from above can book the sunrise balloon — it means a very early start, and everyone who does it says the same thing about the light.",
          stay:"Pyramisa Isis Hotel or similar",
          meals:["Breakfast","Lunch"] },
        { d:"Day 7", place:"Hurghada", h:"Across to the Red Sea",
          acts:["Road transfer to Hurghada","All-inclusive check-in","The pool and the beach","Hurghada Museum (optional)"],
          p:"Across to the coast, and into a beachfront all-inclusive hotel for two nights. Nothing is planned from here on. The pool and the beach are the point, and for anyone who wants an hour indoors, the Hurghada Museum is close by and small enough to see properly.",
          stay:"AMC Royal Hotel or similar",
          meals:["Breakfast","Lunch","Dinner"] },
        { d:"Day 8", place:"Hurghada", h:"A free day on the Red Sea",
          acts:["Nothing scheduled","Snorkelling trip (optional)","The beach and the pool","A last dinner together"],
          p:"A free day. The optional trip is snorkelling on the reef, either joining a shared boat or taking one privately, and the water here is shallow, warm and clear enough that children who have never snorkelled before usually take to it in ten minutes. The group gathers for a last dinner in the evening.",
          stay:"AMC Royal Hotel or similar",
          meals:["Breakfast","Lunch","Dinner"] },
        { d:"Day 9", place:"Hurghada", h:"Departure",
          acts:["Breakfast","The trip ends","Extra nights (optional)","Group transfer to Cairo (optional)"],
          p:"The trip ends after breakfast. Extra nights and airport transfers can both be arranged in advance rather than on the morning, and there is an optional group transfer to Cairo that leaves at around nine and arrives at about three in the afternoon.",
          stay:"",
          meals:["Breakfast"] }
      ],
      included:[
        "Eight nights: seven in the hotels named in the day-by-day above, and one in a cabin on the sleeper train",
        "The meals named in the day-by-day above, including every meal at the all-inclusive hotel",
        "The overnight sleeper train from Cairo to Aswan",
        "All road transport on the itinerary, including Luxor to Hurghada",
        "A tour leader for the whole trip, and licensed local guides at the sites",
        "Entrance to every site listed in the itinerary, including three tombs in the Valley of the Kings",
        "The felucca at Aswan, and the two meals cooked by local families",
        "One local contact, reachable at any hour"
      ],
      notIncluded:[
        "International flights to and from Egypt",
        "The Egyptian entry visa and any consular fees",
        "Travel insurance",
        "Airport transfers, unless arranged in advance",
        "Meals and drinks not named above",
        "The extra tickets named in the itinerary: inside the Great Pyramid, the third pyramid, the tomb of Tutankhamun",
        "Optional excursions, tips, and anything of a personal nature"
      ],
      optional:[
        "Saqqara and Memphis, or the National Museum of Egyptian Civilisation and the Royal Mummy Room, on the first day",
        "Inside the Great Pyramid of Cheops, or the third pyramid of Menkaure, at Giza",
        "Abu Simbel or the Unfinished Obelisk on the free day in Aswan",
        "The sound and light show at Karnak",
        "The tomb of Tutankhamun, and a sunrise balloon over the Valley of the Kings",
        "A snorkelling trip on the Red Sea, on a shared boat or a private one",
        "A group transfer from Hurghada to Cairo on the last day, leaving at around 9 am"
      ],
      info:[
        ["Duration","9 days / 8 nights"],
        ["Destinations","Cairo · Giza · Aswan · Luxor · Hurghada"],
        ["Travel style","Family-paced, culture first and the beach last"],
        ["Group","Small group with a tour leader throughout. The same route runs as a private departure on request"],
        ["Activity level","Easy to moderate. Two long road days, one night on a train, and early starts in Luxor"],
        ["Best for","Families with children, mixed-age groups, and first visits to Egypt"],
        ["Best months","October to April. July and August are hard work in Luxor and perfectly fine on the coast"]
      ],
      notes:[
        "Trains in Egypt occasionally run late. Day three is written with that in mind, and the afternoon has room in it.",
        "Cabins on the sleeper train are twin-berth. Families are put together where the carriage layout allows, and we confirm that before you book rather than on the platform.",
        "The Red Sea hotel is all-inclusive, which is why days seven and eight carry all three meals. Everywhere else, the meals in the day-by-day are the meals included.",
        "Water activities carry the operator's own age, height and health limits. We will tell you what they are for your party before you book, not on the jetty.",
        "Optional excursions are arranged and paid for locally unless we say otherwise. Abu Simbel and the balloon are both worth booking before you travel."
      ]
    },

    tr:{
      meta:"9 Gün · Kahire, Asvan, Luksor ve Hurghada",
      n:"Ailece Mısır Tatili",
      tagline:"Önce ülkenin tamamı, sonra kapanış için Kızıldeniz.",
      d:"Aileler için kurulmuş dokuz gün: Piramitler ve Büyük Mısır Müzesi, güneye gece treni, her birinde bir aile sofrası olan Asvan ve Luksor, ardından Kızıldeniz'de her şey dahil iki gece.",
      imgAlt:"Çöl dağlarının denizle buluştuğu Kızıldeniz kıyısı",
      destinations:["Kahire","Giza","Asvan","Luksor","Hurghada","Kızıldeniz"],
      overview:[
        "Bu rota, ülkeyi doğru dürüst görmek ama eve dinlenmiş dönmek isteyen aileler için. Kültür kısmı öne alındı, herkes zindeyken: ikinci gün Giza ve Büyük Mısır Müzesi, ardından güneye gece treni, Asvan'da Philae ve felucca, sonra Karnak ve Kral Vadisi. Son üç gün Kızıldeniz'de, her şey dahil ve hiçbir program olmadan geçiyor.",
        "Program, broşürlerin sıraladıklarına değil çocukların gerçekten hatırladıklarına göre kuruldu: Kahire'de bir lokantada koshary, trende bir gece, Nubya köyünde akşam yemeği, Batı Yaka'da bir ailenin evinde öğle yemeği ve ayakta durulabilecek kadar sığ bir deniz. Ortasında iki tam serbest gün var; bir aktivitede yaş ya da sağlık sınırı varsa bunu iskelede değil, rezervasyondan önce söylüyoruz."
      ],
      highlights:[
        { i:"pyramids", h:"Giza Piramitleri ve Büyük Sfenks" },
        { i:"museum",   h:"Büyük Mısır Müzesi" },
        { i:"nile",     h:"Gün batımında Nil'de felucca" },
        { i:"bedouin",  h:"Nubya köyünde bir ailede akşam yemeği" },
        { i:"temple",   h:"Karnak ve Sfenksler Yolu" },
        { i:"tomb",     h:"Kral Vadisi ve üç mezar" },
        { i:"sea",      h:"Kızıldeniz'de her şey dahil iki gece" },
        { i:"snorkel",  h:"Resifte şnorkelle yüzme (opsiyonel)" }
      ],
      days:[
        { d:"1. Gün", place:"Kahire", h:"Kahire'ye varış",
          acts:["İstediğiniz saatte varış","17:00'de karşılama toplantısı","Kıpti Kahire ya da çarşılar","Opsiyonel ortak akşam yemeği"],
          p:"Bugünün tek sabit noktası saat beşteki karşılama toplantısı. Erken gelirseniz çarşılara ya da Kıpti Kahire'ye vakit kalıyor; Asma Kilise ile Ben Ezra Sinagogu birbirine birkaç dakika yürüme mesafesinde. Toplantının ardından çoğu kişi tur lideriyle birlikte yemeğe çıkıyor. Boş bir sabahınız varsa Sakkara ve Memfis ya da Mısır Medeniyeti Ulusal Müzesi ile Kraliyet Mumyaları Salonu opsiyonel tur olarak düzenleniyor.",
          stay:"Pyramids Park Hotel ya da benzeri",
          meals:["Akşam yemeği"] },
        { d:"2. Gün", place:"Kahire", h:"Giza, müze ve güneye gece treni",
          acts:["Giza platosu","Büyük Sfenks","Öğle yemeğinde koshary","Büyük Mısır Müzesi","Asvan'a gece treni"],
          p:"Sabah Giza'ya: plato boyunca uzanan manzara ve Büyük Sfenks'e kadar bir yürüyüş. Ardından yerel bir lokantada koshary — mercimek, pirinç, makarna ve kızarmış soğan; çocukların tabağını güvenilir biçimde bitirdiği tek Mısır yemeği. Öğleden sonra Büyük Mısır Müzesi. Akşam Asvan'a giden gece trenine biniyorsunuz. Keops'un Büyük Piramidi'ne ya da daha küçük Mikerinos Piramidi'ne girmek, o gün alınan ayrı bir bilet.",
          stay:"Gece treni, kuşetli kabin",
          meals:["Kahvaltı","Akşam yemeği"] },
        { d:"3. Gün", place:"Asvan", h:"Philae ve Nubya köyünde akşam yemeği",
          acts:["Asvan'a varış","Bavulları otele bırakma","Agilkia Adası'nda Philae Tapınağı","Serbest öğleden sonra","Nubyalı bir ailede akşam yemeği"],
          p:"Tren sabah varıyor. Bavullar otele gidiyor, tekne sizi Agilkia Adası'na, İsis'in tapınağı Philae'ye götürüyor: baraj yükselince parçalara ayrılıp taş taş buraya taşınmış bir yapı. Öğleden sonra serbest. Akşam bir Nubya köyüne geçip bir ailenin evinde yemeğe oturuyorsunuz — evler boyalı, yol kısa ve çocukların sonradan en çok anlattığı akşam genelde bu.",
          stay:"Obelisk Hotel ya da benzeri",
          meals:["Kahvaltı","Akşam yemeği"] },
        { d:"4. Gün", place:"Asvan", h:"Serbest gün ve gün batımında felucca",
          acts:["Program yok","Abu Simbel (opsiyonel)","Bitmemiş Obelisk (opsiyonel)","Gün batımında felucca","Şehirde akşam yemeği"],
          p:"Gün size ait. Uzun seçenek Abu Simbel: üç saat güneyde ve öğleden sonranın ortasında dönüş. Kısa seçenek Bitmemiş Obelisk; çatladığı granit ocağında hâlâ olduğu gibi duruyor. Hangisi olursa olsun akşam, güneş batarken Nil'de bir felucca demek: motor yok, program yok ve su genelde ayna gibi. Ardından şehirde bir lokantada akşam yemeği.",
          stay:"Obelisk Hotel ya da benzeri",
          meals:["Kahvaltı","Akşam yemeği"] },
        { d:"5. Gün", place:"Luksor", h:"Kuzeye, Luksor'a ve Karnak",
          acts:["Luksor'a kara yolu transferi","Sfenksler Yolu","Amon'un Büyük Tapınağı","Animal Care in Egypt","Karnak ışık ve ses gösterisi (opsiyonel)"],
          p:"Kuzeye, Luksor yoluna; ardından Karnak: Sfenksler Yolu, Amon'un Büyük Tapınağı ve hiçbir fotoğrafın altından kalkamadığı sütunlu salon. Günün ilerleyen saatinde Animal Care in Egypt ziyareti var: şehrin ayakta durmasını sağlayan at ve eşeklere bakan, faal bir veteriner kliniği ve bir Intrepid Foundation ortağı. Karnak'taki ışık ve ses gösterisi akşam için opsiyonel bir ek.",
          stay:"Pyramisa Isis Hotel ya da benzeri",
          meals:["Kahvaltı"] },
        { d:"6. Gün", place:"Luksor", h:"Kral Vadisi",
          acts:["Kral Vadisi","Üç mezara giriş","Bir ailede öğle yemeği","Serbest öğleden sonra","Şafakta balon (opsiyonel)"],
          p:"Erkenden Kral Vadisi'ne geçiyoruz; standart bilet üç mezarı kapsıyor, Tutankhamun'un mezarı isterseniz ayrı biletli. Ardından bir ailenin evinde pişmiş öğle yemeği ve serbest bir öğleden sonra. Vadiyi yukarıdan görmek isteyenler şafak balonunu ayırtabilir — çok erken kalkmak gerekiyor ve bunu yapan herkes ışık için aynı şeyi söylüyor.",
          stay:"Pyramisa Isis Hotel ya da benzeri",
          meals:["Kahvaltı","Öğle yemeği"] },
        { d:"7. Gün", place:"Hurghada", h:"Kızıldeniz'e geçiş",
          acts:["Hurghada'ya kara yolu transferi","Her şey dahil otele yerleşme","Havuz ve plaj","Hurghada Müzesi (opsiyonel)"],
          p:"Kıyıya geçiş ve iki gecelik, plaj cephesinde her şey dahil bir otel. Buradan sonrası için hiçbir şey planlanmadı. Mesele havuz ve plaj; kapalı mekânda bir saat geçirmek isteyenler için Hurghada Müzesi yakında ve doğru dürüst gezilecek kadar küçük.",
          stay:"AMC Royal Hotel ya da benzeri",
          meals:["Kahvaltı","Öğle yemeği","Akşam yemeği"] },
        { d:"8. Gün", place:"Hurghada", h:"Kızıldeniz'de serbest gün",
          acts:["Program yok","Şnorkel turu (opsiyonel)","Plaj ve havuz","Birlikte son akşam yemeği"],
          p:"Serbest gün. Opsiyonel tur resifte şnorkelle yüzmek; ister paylaşımlı bir tekneye katılın ister özel tutun. Buradaki su sığ, ılık ve daha önce hiç şnorkel takmamış çocukların on dakikada alıştığı kadar berrak. Akşam grup, son bir yemekte bir araya geliyor.",
          stay:"AMC Royal Hotel ya da benzeri",
          meals:["Kahvaltı","Öğle yemeği","Akşam yemeği"] },
        { d:"9. Gün", place:"Hurghada", h:"Dönüş",
          acts:["Kahvaltı","Turun sonu","Ek geceler (opsiyonel)","Kahire'ye grup transferi (opsiyonel)"],
          p:"Tur kahvaltıdan sonra sona eriyor. Ek geceler ve havalimanı transferleri o sabah değil, önceden ayarlanabiliyor. Ayrıca yaklaşık dokuzda kalkıp öğleden sonra üç gibi varan, Kahire'ye opsiyonel bir grup transferi var.",
          stay:"",
          meals:["Kahvaltı"] }
      ],
      included:[
        "Sekiz gece: yedisi yukarıdaki programda adı geçen otellerde, biri gece treninde kuşetli kabinde",
        "Yukarıdaki programda adı geçen öğünler; her şey dahil oteldeki tüm öğünler buna dahil",
        "Kahire'den Asvan'a gece treni",
        "Luksor'dan Hurghada'ya olan bölüm dahil, programdaki tüm kara yolu ulaşımı",
        "Tur boyunca bir tur lideri ve ören yerlerinde lisanslı yerel rehberler",
        "Kral Vadisi'ndeki üç mezar dahil, programda yazan tüm ören yeri girişleri",
        "Asvan'da felucca ve yerel ailelerin hazırladığı iki öğün",
        "Her saat ulaşabileceğiniz tek bir yerel irtibat"
      ],
      notIncluded:[
        "Mısır'a gidiş ve dönüş uluslararası uçuşlar",
        "Mısır giriş vizesi ve konsolosluk masrafları",
        "Seyahat sigortası",
        "Önceden ayarlanmadıysa havalimanı transferleri",
        "Yukarıda adı geçmeyen yemek ve içecekler",
        "Programda belirtilen ek biletler: Büyük Piramit içi, üçüncü piramit, Tutankhamun'un mezarı",
        "Opsiyonel turlar, bahşişler ve kişisel harcamalar"
      ],
      optional:[
        "İlk gün Sakkara ve Memfis ya da Mısır Medeniyeti Ulusal Müzesi ile Kraliyet Mumyaları Salonu",
        "Giza'da Keops'un Büyük Piramidi'nin ya da üçüncü piramit Mikerinos'un içi",
        "Asvan'daki serbest günde Abu Simbel ya da Bitmemiş Obelisk",
        "Karnak'ta ışık ve ses gösterisi",
        "Tutankhamun'un mezarı ve Kral Vadisi üzerinde şafak balonu",
        "Kızıldeniz'de paylaşımlı ya da özel tekneyle şnorkel turu",
        "Son gün Hurghada'dan Kahire'ye, yaklaşık 09:00'da kalkan grup transferi"
      ],
      info:[
        ["Süre","9 gün / 8 gece"],
        ["Destinasyonlar","Kahire · Giza · Asvan · Luksor · Hurghada"],
        ["Seyahat tarzı","Aile temposu; önce kültür, sonunda plaj"],
        ["Grup","Tur boyunca tur liderli küçük grup. Aynı rota talep üzerine özel hareket olarak da düzenlenir"],
        ["Zorluk","Kolay-orta. İki uzun yol günü, trende bir gece ve Luksor'da erken kalkışlar"],
        ["Kimler için","Çocuklu aileler, karma yaş grupları ve Mısır'a ilk gelenler"],
        ["En iyi aylar","Ekim ile nisan arası. Temmuz ve ağustos Luksor'da zorlu, kıyıda gayet iyi"]
      ],
      notes:[
        "Mısır'da trenler zaman zaman geç kalıyor. Üçüncü gün buna göre yazıldı ve öğleden sonrada pay bırakıldı.",
        "Gece treninde kabinler iki kuşetli. Vagon düzeni izin verdiği ölçüde aileler bir araya yerleştiriliyor ve bunu peronda değil, rezervasyondan önce teyit ediyoruz.",
        "Kızıldeniz'deki otel her şey dahil; yedinci ve sekizinci günün üç öğün taşımasının nedeni bu. Diğer her yerde programda yazan öğünler, dahil olan öğünlerdir.",
        "Su aktivitelerinde yaş, boy ve sağlık sınırlarını işletmeciler koyuyor. Bunları iskelede değil, rezervasyondan önce sizin grubunuz için söylüyoruz.",
        "Aksi belirtilmedikçe opsiyonel turlar yerinde ayarlanıp ödeniyor. Abu Simbel ve balon, seyahatten önce ayırtmaya değer."
      ]
    },

    de:{
      meta:"9 Tage · Kairo, Assuan, Luxor & Hurghada",
      n:"Ägypten für Familien",
      tagline:"Erst das ganze Land, zum Abschluss das Rote Meer.",
      d:"Neun Tage für Familien: die Pyramiden und das Grand Egyptian Museum, der Nachtzug nach Süden, Assuan und Luxor mit je einem Essen bei einer Familie, danach zwei All-inclusive-Nächte am Roten Meer.",
      imgAlt:"Küste des Roten Meeres, wo die Wüstenberge auf das Wasser treffen",
      destinations:["Kairo","Gizeh","Assuan","Luxor","Hurghada","Das Rote Meer"],
      overview:[
        "Diese Route ist für Familien, die das Land wirklich sehen und trotzdem erholt heimkommen wollen. Die Kultur steht am Anfang, solange alle frisch sind: Gizeh und das Grand Egyptian Museum am zweiten Tag, der Nachtzug nach Süden, Philae und eine Feluke in Assuan, dann Karnak und das Tal der Könige. Die letzten drei Tage liegen am Roten Meer, all inclusive und ohne jedes Programm.",
        "Gebaut ist sie um das, woran Kinder sich tatsächlich erinnern, und nicht um das, was in Prospekten steht: Koschari in einem Lokal in Kairo, eine Nacht im Zug, Abendessen in einem nubischen Dorf, ein Mittagessen bei einer Familie am Westufer und Wasser, in dem man stehen kann. In der Mitte liegen zwei ganze freie Tage, und wo eine Aktivität eine Alters- oder Gesundheitsgrenze hat, sagen wir das vor der Buchung und nicht am Steg."
      ],
      highlights:[
        { i:"pyramids", h:"Die Pyramiden von Gizeh & die Große Sphinx" },
        { i:"museum",   h:"Das Grand Egyptian Museum" },
        { i:"nile",     h:"Eine Feluke auf dem Nil bei Sonnenuntergang" },
        { i:"bedouin",  h:"Abendessen bei einer Familie im nubischen Dorf" },
        { i:"temple",   h:"Karnak und die Sphingenallee" },
        { i:"tomb",     h:"Das Tal der Könige und drei Gräber" },
        { i:"sea",      h:"Zwei All-inclusive-Nächte am Roten Meer" },
        { i:"snorkel",  h:"Schnorcheln am Riff (optional)" }
      ],
      days:[
        { d:"Tag 1", place:"Kairo", h:"Ankunft in Kairo",
          acts:["Ankunft zu jeder Zeit","Willkommenstreffen um 17 Uhr","Koptisches Kairo oder die Märkte","Optionales gemeinsames Abendessen"],
          p:"Der einzige feste Punkt heute ist das Willkommenstreffen um fünf. Wer früher ankommt, hat Zeit für die Märkte oder für das koptische Kairo, wo die Hängende Kirche und die Ben-Esra-Synagoge nur wenige Gehminuten auseinanderliegen. Danach gehen die meisten mit der Reiseleitung essen. Wer einen Vormittag übrig hat: Sakkara und Memphis oder das Nationalmuseum der Ägyptischen Zivilisation mit seinem Saal der königlichen Mumien werden beide als optionale Ausflüge angeboten.",
          stay:"Pyramids Park Hotel oder ähnlich",
          meals:["Abendessen"] },
        { d:"Tag 2", place:"Kairo", h:"Gizeh, das Museum und der Nachtzug nach Süden",
          acts:["Das Plateau von Gizeh","Die Große Sphinx","Koschari zu Mittag","Grand Egyptian Museum","Der Nachtzug nach Assuan"],
          p:"Am Vormittag hinaus nach Gizeh, für den weiten Blick über das Plateau und einen Gang hinauf zur Großen Sphinx, danach Koschari in einem einheimischen Lokal — Linsen, Reis, Nudeln und geröstete Zwiebeln, das eine ägyptische Gericht, das Kinder zuverlässig aufessen. Am Nachmittag folgt das Grand Egyptian Museum. Am Abend steigen Sie in den Nachtzug nach Assuan. Das Innere der Cheops-Pyramide oder der kleineren Mykerinos-Pyramide ist ein gesondertes Ticket, das vor Ort gekauft wird.",
          stay:"Nachtzug, Schlafwagenabteil",
          meals:["Frühstück","Abendessen"] },
        { d:"Tag 3", place:"Assuan", h:"Philae und Abendessen im nubischen Dorf",
          acts:["Ankunft in Assuan","Gepäck ins Hotel","Philae-Tempel auf der Insel Agilkia","Freier Nachmittag","Abendessen bei einer nubischen Familie"],
          p:"Der Zug kommt am Vormittag an. Das Gepäck geht ins Hotel, und ein Boot bringt Sie zur Insel Agilkia zum Philae-Tempel, dem Heiligtum der Isis, das beim Bau des Staudamms zerlegt und Block für Block hierher versetzt wurde. Der Nachmittag ist frei. Am Abend geht es hinüber in ein nubisches Dorf, zum Essen bei einer Familie zu Hause — die Häuser sind bemalt, der Weg dorthin ist kurz, und es ist meist der Abend, von dem Kinder später erzählen.",
          stay:"Obelisk Hotel oder ähnlich",
          meals:["Frühstück","Abendessen"] },
        { d:"Tag 4", place:"Assuan", h:"Ein freier Tag und eine Feluke bei Sonnenuntergang",
          acts:["Nichts geplant","Abu Simbel (optional)","Der Unvollendete Obelisk (optional)","Feluke bei Sonnenuntergang","Abendessen in der Stadt"],
          p:"Der Tag gehört Ihnen. Abu Simbel ist die lange Variante, drei Stunden südlich und am frühen Nachmittag zurück; der Unvollendete Obelisk ist die kurze und liegt noch immer im Granitbruch, in dem er zerbrach. So oder so gehört der Abend einer Feluke auf dem Nil, während die Sonne untergeht: kein Motor, kein Zeitplan, und das Wasser meist spiegelglatt. Danach Abendessen in einem Lokal in der Stadt.",
          stay:"Obelisk Hotel oder ähnlich",
          meals:["Frühstück","Abendessen"] },
        { d:"Tag 5", place:"Luxor", h:"Nach Norden nach Luxor, und Karnak",
          acts:["Fahrt nach Luxor","Die Sphingenallee","Der Große Amun-Tempel","Animal Care in Egypt","Ton- und Lichtshow in Karnak (optional)"],
          p:"Die Straße nach Norden bis Luxor, danach Karnak: die Sphingenallee, der Große Amun-Tempel und eine Säulenhalle, an der bisher jedes Foto gescheitert ist. Später steht ein Besuch bei Animal Care in Egypt an, einer arbeitenden Tierklinik und Partnerin der Intrepid Foundation, die sich um die Pferde und Esel kümmert, von denen die Stadt lebt. Die Ton- und Lichtshow in Karnak ist am Abend optional zubuchbar.",
          stay:"Pyramisa Isis Hotel oder ähnlich",
          meals:["Frühstück"] },
        { d:"Tag 6", place:"Luxor", h:"Das Tal der Könige",
          acts:["Tal der Könige","Eintritt in drei Gräber","Mittagessen bei einer Familie","Freier Nachmittag","Ballonfahrt bei Sonnenaufgang (optional)"],
          p:"Früh hinüber ins Tal der Könige, wo das Standardticket drei Gräber umfasst; das Grab des Tutanchamun ist ein gesondertes Ticket, wenn Sie es sehen möchten. Danach ein zu Hause gekochtes Mittagessen bei einer Familie und ein freier Nachmittag. Wer das Tal von oben sehen will, kann die Ballonfahrt bei Sonnenaufgang buchen — sie bedeutet einen sehr frühen Start, und alle, die sie machen, sagen dasselbe über das Licht.",
          stay:"Pyramisa Isis Hotel oder ähnlich",
          meals:["Frühstück","Mittagessen"] },
        { d:"Tag 7", place:"Hurghada", h:"Hinüber ans Rote Meer",
          acts:["Fahrt nach Hurghada","Check-in im All-inclusive-Hotel","Pool und Strand","Museum von Hurghada (optional)"],
          p:"Hinüber an die Küste und für zwei Nächte in ein All-inclusive-Hotel direkt am Strand. Von hier an ist nichts mehr geplant. Pool und Strand sind der Punkt, und wer eine Stunde im Innenraum möchte: Das Museum von Hurghada liegt nah und ist klein genug, um es wirklich anzusehen.",
          stay:"AMC Royal Hotel oder ähnlich",
          meals:["Frühstück","Mittagessen","Abendessen"] },
        { d:"Tag 8", place:"Hurghada", h:"Ein freier Tag am Roten Meer",
          acts:["Nichts geplant","Schnorchelausflug (optional)","Strand und Pool","Ein letztes gemeinsames Abendessen"],
          p:"Ein freier Tag. Der optionale Ausflug ist Schnorcheln am Riff, entweder auf einem geteilten Boot oder privat. Das Wasser hier ist flach, warm und klar genug, dass Kinder, die noch nie geschnorchelt haben, es meist in zehn Minuten begreifen. Am Abend kommt die Gruppe zu einem letzten gemeinsamen Essen zusammen.",
          stay:"AMC Royal Hotel oder ähnlich",
          meals:["Frühstück","Mittagessen","Abendessen"] },
        { d:"Tag 9", place:"Hurghada", h:"Abreise",
          acts:["Frühstück","Die Reise endet","Zusätzliche Nächte (optional)","Gruppentransfer nach Kairo (optional)"],
          p:"Die Reise endet nach dem Frühstück. Zusätzliche Nächte und Flughafentransfers lassen sich beide vorab vereinbaren und nicht erst am Morgen. Außerdem gibt es einen optionalen Gruppentransfer nach Kairo, der gegen neun Uhr abfährt und am Nachmittag gegen drei ankommt.",
          stay:"",
          meals:["Frühstück"] }
      ],
      included:[
        "Acht Nächte: sieben in den oben im Tagesprogramm genannten Hotels und eine im Schlafwagenabteil",
        "Die oben im Tagesprogramm genannten Mahlzeiten, einschließlich sämtlicher Mahlzeiten im All-inclusive-Hotel",
        "Der Nachtzug von Kairo nach Assuan",
        "Sämtliche Straßenbeförderung des Programms, einschließlich Luxor bis Hurghada",
        "Eine Reiseleitung für die gesamte Reise und lizenzierte örtliche Guides an den Stätten",
        "Eintritt zu allen im Programm genannten Stätten, einschließlich dreier Gräber im Tal der Könige",
        "Die Feluke in Assuan und die beiden von Familien gekochten Mahlzeiten",
        "Ein örtlicher Ansprechpartner, rund um die Uhr erreichbar"
      ],
      notIncluded:[
        "Internationale Flüge nach und von Ägypten",
        "Das ägyptische Einreisevisum und konsularische Gebühren",
        "Reiseversicherung",
        "Flughafentransfers, sofern nicht vorab vereinbart",
        "Nicht genannte Mahlzeiten und Getränke",
        "Die im Programm genannten Zusatztickets: Inneres der Cheops-Pyramide, dritte Pyramide, Grab des Tutanchamun",
        "Optionale Ausflüge, Trinkgelder und persönliche Ausgaben"
      ],
      optional:[
        "Sakkara und Memphis oder das Nationalmuseum der Ägyptischen Zivilisation mit dem Saal der königlichen Mumien, am ersten Tag",
        "Das Innere der Cheops-Pyramide oder der dritten Pyramide des Mykerinos in Gizeh",
        "Abu Simbel oder der Unvollendete Obelisk am freien Tag in Assuan",
        "Die Ton- und Lichtshow in Karnak",
        "Das Grab des Tutanchamun und eine Ballonfahrt über dem Tal der Könige bei Sonnenaufgang",
        "Ein Schnorchelausflug am Roten Meer, auf einem geteilten oder einem privaten Boot",
        "Ein Gruppentransfer von Hurghada nach Kairo am letzten Tag, Abfahrt gegen 9 Uhr"
      ],
      info:[
        ["Dauer","9 Tage / 8 Nächte"],
        ["Ziele","Kairo · Gizeh · Assuan · Luxor · Hurghada"],
        ["Reisestil","Familientempo, erst die Kultur und zum Schluss der Strand"],
        ["Gruppe","Kleine Gruppe mit durchgehender Reiseleitung. Dieselbe Route auf Wunsch auch als private Abreise"],
        ["Anspruch","Leicht bis mittel. Zwei lange Fahrtage, eine Nacht im Zug und frühe Starts in Luxor"],
        ["Geeignet für","Familien mit Kindern, Gruppen unterschiedlichen Alters und erste Ägyptenreisen"],
        ["Beste Monate","Oktober bis April. Juli und August sind in Luxor anstrengend und an der Küste völlig unproblematisch"]
      ],
      notes:[
        "Züge in Ägypten haben gelegentlich Verspätung. Tag drei ist darauf ausgelegt, und der Nachmittag hat Luft.",
        "Die Abteile im Nachtzug haben zwei Betten. Familien werden zusammengelegt, soweit der Wagen es zulässt, und wir bestätigen das vor der Buchung und nicht auf dem Bahnsteig.",
        "Das Hotel am Roten Meer ist all inclusive; deshalb tragen Tag sieben und acht alle drei Mahlzeiten. Überall sonst sind die im Tagesprogramm genannten Mahlzeiten die inbegriffenen.",
        "Bei Wasseraktivitäten setzen die Betreiber eigene Alters-, Größen- und Gesundheitsgrenzen. Wir nennen sie Ihnen für Ihre Gruppe vor der Buchung und nicht am Steg.",
        "Optionale Ausflüge werden vor Ort gebucht und bezahlt, sofern nicht anders angegeben. Abu Simbel und die Ballonfahrt lohnt es sich vor der Reise zu buchen."
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
          acts:["Morning boat to the islands","Snorkelling and beach time","Evening transfer to Luxor","Check-in at the Luxor hotel"],
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

   It documents the SPINE OF "best-of-egypt" — Giza, Aswan, the
   free day, the felucca and Kom Ombo, Luxor — so the two can
   never drift: tourId below is the link, and js/main.js reads the
   route name from that entry rather than repeating it here.
   Repoint tourId at another tour and the CTA follows it.

   It is a condensation and not a copy: the eight days of the tour
   are five here, the arrival day and the departure day are left
   out, and Abu Simbel appears as what it is on that route — an
   optional excursion on the free day, not a scheduled one.

   The content is a real working itinerary, not a brochure. Note
   what it admits: a whole day with nothing scheduled, an optional
   that is named as optional, and a free afternoon. A sample
   programme that claims every hour is the thing customers have
   learned to distrust.
   ------------------------------------------------------------ */
const ITINERARY = {
  tourId: "best-of-egypt",
  t: {
    tr: {
      days: [
        { d:"1. Gün", place:"Kahire", h:"Giza, Sfenks ve Büyük Mısır Müzesi",
          p:"Plato henüz serinken Büyük Piramit ve Sfenks, öğleden sonra Büyük Mısır Müzesi ve akşam güneye giden gece treni." },
        { d:"2. Gün", place:"Asvan",  h:"Trenden iner inmez nehre",
          p:"Çarşıda serbest bir sabah; öğleden sonra Ağa Han Türbesi'nin yanından geçen tekneyle bir nehir adasına ve bir Nubya ailesinin evinde akşam yemeği." },
        { d:"3. Gün", place:"Asvan",  h:"Serbest gün, isterseniz Abu Simbel",
          p:"Program yok. Abu Simbel üç saat güneyde ve erken kalkmaya değer; kısa hâli Bitmemiş Obelisk, Yüksek Baraj ve Philae." },
        { d:"4. Gün", place:"Kom Ombo", h:"Felucca ve timsah tapınağı",
          p:"Asvan Köprüsü'ne kadar yelken altında, teknede öğle yemeğiyle; ardından suyun kıyısındaki Kom Ombo ve hâlâ yerinde duran mumyalanmış timsahlar." },
        { d:"5. Gün", place:"Luksor", h:"Kral Vadisi ve Karnak",
          p:"Sıcak basmadan vadide üç mezar, Batı Yaka'da bir ailenin evinde öğle yemeği ve kapanışta Karnak'ın dev sütunlu salonu." }
      ],
      note:"Bu, yazıya dökülmüş gerçek bir program. Sizinki aynısı olmayacak: tarihler, tempo ve önemsedikleriniz onu değiştirir; hiçbir şey kesinleşmeden önce baştan yazılır."
    },
    en: {
      days: [
        { d:"Day 1", place:"Cairo", h:"Giza, the Sphinx & the Grand Egyptian Museum",
          p:"The Great Pyramid and the Sphinx while the plateau is still cool, the Grand Egyptian Museum in the afternoon, and the sleeper train south that evening." },
        { d:"Day 2", place:"Aswan", h:"Off the night train, onto the river",
          p:"A free morning in the souk, then a boat past the Aga Khan Mausoleum to a river island, and dinner cooked at home by a Nubian family." },
        { d:"Day 3", place:"Aswan", h:"A free day, and Abu Simbel if you want it",
          p:"Nothing scheduled. Abu Simbel is three hours south and worth the early start; the short version is the Unfinished Obelisk, the High Dam and Philae." },
        { d:"Day 4", place:"Kom Ombo", h:"A felucca, then the crocodile temple",
          p:"Under sail as far as Aswan Bridge with lunch on board, then Kom Ombo, where the temple stands at the water's edge and the mummified crocodiles are still on site." },
        { d:"Day 5", place:"Luxor", h:"The Valley of the Kings & Karnak",
          p:"Three tombs in the valley before the heat, lunch with a family on the West Bank, and the great hypostyle hall at Karnak to close." }
      ],
      note:"This is one real programme, written out. Yours will not be identical: dates, pace and what you care about change it, and it is rewritten in full before anything is confirmed."
    },
    de: {
      days: [
        { d:"Tag 1", place:"Kairo", h:"Gizeh, die Sphinx & das Grand Egyptian Museum",
          p:"Die Cheops-Pyramide und die Sphinx, solange das Plateau kühl ist, am Nachmittag das Grand Egyptian Museum und am Abend der Nachtzug nach Süden." },
        { d:"Tag 2", place:"Assuan", h:"Aus dem Nachtzug an den Fluss",
          p:"Ein freier Vormittag im Souk, danach mit dem Boot am Aga-Khan-Mausoleum vorbei zu einer Nilinsel und Abendessen bei einer nubischen Familie zu Hause." },
        { d:"Tag 3", place:"Assuan", h:"Ein freier Tag, und Abu Simbel, wenn Sie mögen",
          p:"Nichts geplant. Abu Simbel liegt drei Stunden südlich und ist den frühen Start wert; die kurze Fassung sind der Unvollendete Obelisk, der Hochdamm und Philae." },
        { d:"Tag 4", place:"Kom Ombo", h:"Eine Feluke, dann der Krokodiltempel",
          p:"Unter Segeln bis zur Assuan-Brücke, mit Mittagessen an Bord, danach Kom Ombo, wo der Tempel am Wasser steht und die mumifizierten Krokodile noch vor Ort liegen." },
        { d:"Tag 5", place:"Luxor", h:"Das Tal der Könige & Karnak",
          p:"Drei Gräber im Tal, bevor die Hitze kommt, Mittagessen bei einer Familie am Westufer und zum Abschluss die große Säulenhalle von Karnak." }
      ],
      note:"Das ist ein echtes Programm, ausgeschrieben. Ihres wird nicht identisch sein: Termine, Tempo und Ihre Schwerpunkte verändern es, und es wird vollständig neu geschrieben, bevor irgendetwas bestätigt wird."
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
   DEMO REVIEWS — PLACEHOLDER CONTENT, NOT REAL CUSTOMERS

   Every name, rating and sentence below is invented. Nothing here
   may be quoted in marketing, screenshots or advertising until it
   is replaced by genuine feedback.

   THE PAGE ITSELF NO LONGER SAYS SO. The visible "demo content"
   badge that used to sit under the rows has been removed for the
   client presentation, so this comment is now the only marker that
   these are placeholders. Replace them before the site is put in
   front of real customers.

   TO GO LIVE WITH REAL REVIEWS
     1. Replace the entries below one for one. Keep the shape:

          { n:"Reviewer name",          // shown, and its first
                                        // letter becomes the avatar
            r:5,                        // 1-5, drives the stars
            q:{ en:"…", tr:"…", de:"…" } }   // the review itself

     2. Nothing else has to change: the section, the marquee and
        the layout do not care whether the quotes are real.

   WHY THE NAME AND THE RATING SIT OUTSIDE q
     A person's name and the number of stars they gave do not get
     translated, so they are written once. Only the sentence has a
     per-language version, and those are written natural in each
     language rather than translated word for word — the same
     opinion, phrased the way that language would phrase it.

   HOW THEY ARE SPREAD OVER THE THREE ROWS
     js/main.js cuts this list into MQ_ROWS consecutive blocks, so
     no row ever repeats another row's cards. At two rows that is
     1-6 and 7-12. Keep the list a multiple of MQ_ROWS and every
     row stays even.
   ------------------------------------------------------------ */
const TESTIMONIALS = [
  /* ---- row 1 ---- */
  { n:"Elif Yıldırım", r:5, q:{
    en:"Our guide in Luxor answered every question my father had, and he had a lot of them. We were never once made to hurry.",
    tr:"Luksor'daki rehberimiz babamın bütün sorularını yanıtladı, ki az soru sormadı. Hiçbir yerde acele ettirilmedik.",
    de:"Unser Guide in Luxor hat meinem Vater jede Frage beantwortet, und er hatte viele. Gehetzt wurden wir kein einziges Mal." } },

  { n:"Michael Brandt", r:5, q:{
    en:"Standing at Giza before the coaches arrived made the whole difference. Worth every minute of the early alarm.",
    tr:"Giza'ya otobüsler gelmeden varmak her şeyi değiştirdi. Erken kalkmaya fazlasıyla değdi.",
    de:"Vor den Reisebussen in Gizeh zu stehen, hat den entscheidenden Unterschied gemacht. Der frühe Wecker hat sich gelohnt." } },

  { n:"Sarah Whitfield", r:4, q:{
    en:"The planning was faultless and the guides were excellent. One hotel was a little tired, and they moved us the next day without being asked twice.",
    tr:"Planlama kusursuzdu, rehberler çok iyiydi. Bir otel biraz yorgundu; ikinci kez söylememize gerek kalmadan ertesi gün bizi başka yere aldılar.",
    de:"Die Planung war tadellos und die Guides hervorragend. Ein Hotel war etwas in die Jahre gekommen — wir wurden am nächsten Tag umquartiert, ohne zweimal fragen zu müssen." } },

  { n:"Burak Demir", r:5, q:{
    en:"I wrote at midnight expecting an answer in the morning. Someone replied within ten minutes, in my own language.",
    tr:"Gece yarısı yazdım, sabaha cevap beklerken on dakika içinde kendi dilimde dönüş aldım.",
    de:"Ich schrieb um Mitternacht und rechnete mit einer Antwort am Morgen. Nach zehn Minuten kam sie, in meiner eigenen Sprache." } },

  /* ---- row 2 ---- */
  { n:"Katharina Vogel", r:5, q:{
    en:"The evening on the Nile was the quietest hour of our year. No engine, no schedule, just the water.",
    tr:"Nil'de geçirdiğimiz akşam, yılımızın en sakin saatiydi. Motor yok, program yok, sadece su.",
    de:"Der Abend auf dem Nil war die ruhigste Stunde unseres Jahres. Kein Motor, kein Zeitplan, nur das Wasser." } },

  { n:"James Holloway", r:5, q:{
    en:"Nine days, four cities, and not one transfer went wrong. Someone had clearly thought the whole thing through in advance.",
    tr:"Dokuz gün, dört şehir ve tek bir transfer bile aksamadı. Belli ki her ayrıntı önceden düşünülmüş.",
    de:"Neun Tage, vier Städte, und kein einziger Transfer ging schief. Da hatte offensichtlich jemand vorher mitgedacht." } },

  { n:"Ayşe Kaya", r:4, q:{
    en:"Luxor in August is hard work and they said so before we booked. We went anyway, and they built each day around the heat.",
    tr:"Ağustosta Luksor zorlu ve bunu rezervasyondan önce söylediler. Yine de gittik; günleri sıcağa göre kurdular.",
    de:"Luxor im August ist anstrengend, und das haben sie vor der Buchung gesagt. Wir sind trotzdem gefahren, und sie haben jeden Tag um die Hitze herum geplant." } },

  { n:"Thomas Reinhardt", r:5, q:{
    en:"We saw the Valley of the Kings before the heat, then ate lunch with a family on the West Bank. That lunch is what my children still talk about.",
    tr:"Kral Vadisi'ni sıcak basmadan gezdik, ardından Batı Yaka'da bir ailenin evinde öğle yemeği yedik. Çocuklarımın hâlâ anlattığı şey o yemek.",
    de:"Wir haben das Tal der Könige vor der Hitze gesehen und danach bei einer Familie am Westufer zu Mittag gegessen. Von diesem Essen erzählen meine Kinder bis heute." } },

  /* ---- row 3 ---- */
  { n:"Zeynep Arslan", r:5, q:{
    en:"The price we were quoted at the start was the price we paid at the end. Nothing appeared afterwards.",
    tr:"Başta verilen fiyat, sonunda ödediğimiz fiyattı. Sonradan tek bir kalem bile eklenmedi.",
    de:"Der Preis vom Anfang war der Preis am Ende. Nachträglich kam nichts mehr dazu." } },

  { n:"Daniel Fischer", r:5, q:{
    en:"Two hours in the Grand Egyptian Museum with someone who knew what to skip. That alone is worth paying for.",
    tr:"Büyük Mısır Müzesi'nde, neyi atlamak gerektiğini bilen biriyle iki saat. Tek başına parasını hak ediyor.",
    de:"Zwei Stunden im Grand Egyptian Museum mit jemandem, der wusste, was man auslassen kann. Allein dafür zahlt man gern." } },

  { n:"Claire Bennett", r:5, q:{
    en:"My flight was cancelled and the whole itinerary was rebuilt overnight. I never had to ask for anything twice.",
    tr:"Uçuşum iptal oldu ve bütün program bir gecede yeniden kuruldu. Hiçbir şeyi iki kez sormam gerekmedi.",
    de:"Mein Flug fiel aus, und das gesamte Programm wurde über Nacht neu gebaut. Ich musste nie zweimal um etwas bitten." } },

  { n:"Mert Özkan", r:4, q:{
    en:"The sleeper train is not luxury and nobody pretended otherwise. It was clean, it left on time, and we woke up in Aswan.",
    tr:"Gece treni lüks değil ve kimse öyleymiş gibi anlatmadı. Temizdi, saatinde kalktı ve Asvan'da uyandık.",
    de:"Der Nachtzug ist kein Luxus, und niemand hat etwas anderes behauptet. Er war sauber, fuhr pünktlich, und wir sind in Assuan aufgewacht." } }
];
