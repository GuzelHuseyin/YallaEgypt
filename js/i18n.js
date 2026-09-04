/* ============================================================
   i18n — three languages, equal from the start. No language is
   bolted on later as an afterthought.

   Anything a visitor reads lives here or in js/data.js. Adding a
   fourth language means adding one more key block, nothing else.

   Entries marked tbc:true render with a visible placeholder badge
   and must be filled with real company policy before launch.
   ============================================================ */
const I18N = {

  /* ==========================================================
     ENGLISH
     ========================================================== */
  en:{
    "meta.title":"Yalla Egypt | Private journeys through Egypt",
    "meta.description":"An Egypt-based travel house planning private journeys through the Nile Valley, the Western Desert and the Red Sea coast. Turkish, English and German.",
    "skip":"Skip to content",

    "nav.journeys":"Tours","nav.experience":"Experience","nav.dest":"Destinations","nav.planning":"Planning",
    "nav.about":"About","nav.contact":"Contact","nav.cta":"Plan your trip",
    "nav.menu":"Open menu","nav.close":"Close menu","nav.home":"Yalla Egypt, home page",

    "hero.h":"In the footsteps of the pharaohs,<br>a private door onto<br><em>five thousand years.</em>",
    "hero.sub":"Away from the crowded tours. Egypt explored with a historian's rigour and a friend's warmth.",
    "hero.cta1":"Get in touch","hero.cta2":"Explore the tours",
    "hero.pause":"Pause slideshow","hero.play":"Play slideshow",
    "hero.pauseFilm":"Pause film","hero.playFilm":"Play film",
    "hero.prev":"Previous image","hero.next":"Next image",

    "trust.licence":"Licence & registration",

    "phil.eye":"Our philosophy",
    "phil.quote":"Really seeing a place means knowing the stories that belong to it. We don't take you to the pyramids. We take you into the mind of the civilisation that built them.",
    "phil.who":"The Yalla Egypt founding philosophy",
    "s3b.eye":"Sample programme",
    "s3b.lead":"Five days on the Nile",
    "s3b.cta":"Ask about this programme","s3b.cta2":"See the full programme",


    "s2.eye":"Our tours",
    "s2.lead":"Five routes, from four days to nine","s2.cta":"Explore the tour",

    /* ---- TOUR CATALOGUE + TOUR DETAIL -------------------------
       Everything a tour SAYS lives in TOURS (js/data.js). These
       are only the labels the interface puts around it, so a new
       tour needs nothing here and a fourth language needs this
       block once rather than once per tour.
       "tour.waMsg" takes {tour}, replaced with the route name;
       "wa.msg" is the general version the floating button and the
       contact row use when no single tour is on screen. Both are
       pre-filled into WhatsApp, so they are written as something a
       visitor would actually send, in their own language. */
    "tour.priceAsk":"Price on request",
    "tour.from":"From","tour.perPerson":"per person","tour.perGroup":"per group",
    "tour.days":"days","tour.nights":"nights",
    "tour.closeAria":"Close this tour and go back to the catalogue",
    "tour.back":"All tours",

    "tour.overview":"Overview",
    "tour.highlights":"Tour highlights",
    "tour.itinerary":"Day by day",
    "tour.itineraryNote":"Open a day to see what is in it.",
    /* The two facts a day is judged on once the reading is done.
       A day carrying neither field prints no row at all — see
       itineraryHTML in js/tours.js. */
    "tour.stay":"Accommodation",
    "tour.meals":"Meals included",
    "tour.mealsNone":"No meals included",
    "tour.inclusions":"Included, and not included",
    "tour.included":"What is included",
    "tour.notIncluded":"Not included",
    "tour.optional":"Optional experiences",
    "tour.info":"Tour information",
    "tour.notes":"Important notes",
    "tour.destinations":"Destinations","tour.duration":"Duration","tour.price":"Price",
    "tour.other":"The other routes",

    "tour.cta":"Ask about this tour",
    "tour.ctaWa":"Ask on WhatsApp",
    "tour.ctaLead":"Ask us anything about this route.",
    "tour.ctaBody":"Tell us your dates and who is travelling. We answer within one business day, in Turkish, English or German. The first reply is usually questions rather than a brochure.",
    "tour.waMsg":"Hello Yalla Egypt, I am interested in the {tour} tour. I would like more information.",
    "wa.msg":"Hello Yalla Egypt, I would like more information about your tours.",

    "s3.eye":"Where we work",
    "s3.lead":"The places we work in. Most journeys use two or three of them.",
    "s3.hint":"Drag or scroll sideways",


    "s5.eye":"From first message to landing",
    "s5.lead":"Five steps. You can stop after any of them.",
    "steps":[
      {h:"You write",p:"Dates, how many days, who's coming, and one line about what you'd hate to miss. That's enough to start."},
      {h:"We ask back",p:"Usually within one business day, and usually with questions rather than a brochure. The questions are the work."},
      {h:"A route, in writing",p:"The full itinerary, hotels named, what's included and what isn't. Nothing is held or confirmed at this point."},
      {h:"You change it",p:"Most routes go through two or three revisions. That's normal and it costs nothing."},
      {h:"On the ground",p:"One number to call, in your language, from landing to departure gate."}
    ],

    "s6.eye":"In their words",
    "s6.lead":"What people said afterwards.",
    "s6.rated":"Rated {n} out of 5.",
    "mq.pause":"Pause testimonials","mq.play":"Play testimonials",

    "s7.eye":"Who you'll be dealing with",
    "s7.lead":"Luxury isn't bought from a company. It's bought from people.",
    "s7.body":"Every route on this site is planned and run by the same small group. The person who answers your first message is the person who meets you at arrivals, and the person who picks up at eleven at night. No account manager, no call centre, and nothing handed to a third-party operator once you land.",

    "s8.eye":"Before you ask",
    "s8.lead":"The six questions that arrive in almost every first message.",
    "faq":[
      {q:"When should we come?",
       a:"October to April for everything inland: Cairo, Luxor, Aswan, Abu Simbel and the desert. May to September is genuinely hot in Upper Egypt: 40°C and above, which means starting at dawn and stopping by noon. The Red Sea coast works all year."},
      {q:"How many days do we need?",
       a:"Four days is enough for Cairo and Giza without rushing. Add a week for the Nile between Luxor and Aswan. Under three days we'd rather talk you out of the flight than sell you a schedule you won't enjoy."},
      {q:"Do we need a visa?",
       a:"Most European, Turkish, UK and US passport holders can get a visa on arrival or apply online in advance, and requirements change. We check the current rule for your specific passport before you book anything, but the official source is always your own foreign ministry."},
      {q:"How and when do we pay?",
       a:"A deposit confirms your dates; the balance falls due before you travel. The exact amount, the schedule and the accepted methods are set out in your written quote, and you will never be asked to pay anything before you have that in front of you. We do not take card details over chat or by phone.", tbc:true},
      {q:"What happens if we have to cancel?",
       a:"The cancellation terms sit in your quote in plain language, with the dates on which they change, before you pay anything. Hotels and internal flights carry their own conditions; we pass those on exactly as they reach us rather than hiding them inside one headline figure.", tbc:true},
      {q:"Are flights, hotels and entry tickets included?",
       a:"International flights are not. Hotels, transfers, drivers, guiding, internal flights and entry tickets are all listed line by line in your quote, and anything excluded is named. If a line is not there, it is not included. We would much rather you asked now than found out in Aswan.", tbc:true}
    ],

    "s9.eye":"Next step",
    "s9.q":"Tell us when you're free. We'll take it from there.",
    "s9.cta2":"Message on WhatsApp",

    "contact.direct.eye":"Direct",
    "contact.direct.email":"Email us","contact.direct.phone":"Call us","contact.direct.whatsapp":"Message us on WhatsApp",
    "contact.direct.instagram":"Follow us on Instagram",
    "contact.label.email":"Email","contact.label.phone":"Phone","contact.label.whatsapp":"WhatsApp",
    "contact.label.instagram":"Instagram","contact.instagram.v":"Follow us on Instagram",
    "contact.youtube.v":"Watch us on YouTube","contact.tripadvisor.v":"Read our reviews on TripAdvisor",

    "contact.form.eye":"Or write to us",
    "contact.form.name":"Full name","contact.form.email":"Email",
    "contact.form.dates":"Approximate travel dates","contact.form.people":"Number of travellers",
    "contact.form.message":"Tell us what you have in mind","contact.form.submit":"Send message",
    "contact.form.note":"We reply within one business day. Sending opens your email app with the message ready. Nothing is sent until you press send there.",
    "contact.form.about":"About:",
    "contact.form.sentH":"Your email is ready to send.",
    "contact.form.sentP":"We've opened your email app with the message filled in. Press send there and it reaches us. If nothing opened, write to us directly at",
    "contact.form.again":"Write another message",

    "foot.desc":"An Egypt-based travel house. Private journeys, planned by people who live here.",
    "foot.explore":"Explore","foot.contact":"Contact",
    "foot.office":"Office address","foot.legal":"Legal notice · Privacy · Terms",
    "foot.reg":"Company registration","foot.top":"Back to top",

    "tbc":"TBC"
  },

  /* ==========================================================
     TÜRKÇE
     ========================================================== */
  tr:{
    "meta.title":"Yalla Egypt | Mısır'da özel seyahatler",
    "meta.description":"Mısır merkezli bir seyahat atölyesi. Nil Vadisi, Batı Çölü ve Kızıldeniz kıyısında özel rotalar planlıyoruz. Türkçe, İngilizce, Almanca.",
    "skip":"İçeriğe geç",

    "nav.journeys":"Turlar","nav.experience":"Deneyim","nav.dest":"Destinasyonlar","nav.planning":"Nasıl işliyor",
    "nav.about":"Hakkımızda","nav.contact":"İletişim","nav.cta":"Rotanızı kurun",
    "nav.menu":"Menüyü aç","nav.close":"Menüyü kapat","nav.home":"Yalla Egypt, ana sayfa",

    "hero.h":"Firavunların izinde,<br>beş bin yıllık bir mirasa açılan<br><em>ayrıcalıklı bir kapı.</em>",
    "hero.sub":"Kalabalık turların dışında, Mısır'ı bir tarihçi titizliğiyle, bir dostun sıcaklığıyla keşfedin.",
    "hero.cta1":"Bize Ulaşın","hero.cta2":"Turları Keşfedin",
    "hero.pause":"Slaytları duraklat","hero.play":"Slaytları oynat",
    "hero.pauseFilm":"Filmi duraklat","hero.playFilm":"Filmi oynat",
    "hero.prev":"Önceki görsel","hero.next":"Sonraki görsel",

    "trust.licence":"Lisans & tescil",

    "phil.eye":"Felsefemiz",
    "phil.quote":"Bir yeri gerçekten görmek, oraya ait hikâyeleri bilmekten geçer. Biz sizi sadece piramitlere değil, onları inşa eden uygarlığın zihnine götürüyoruz.",
    "phil.who":"Yalla Egypt Kuruluş Felsefesi",
    "s3b.eye":"Örnek Program",
    "s3b.lead":"Nil'de beş gün",
    "s3b.cta":"Bu programı sorun","s3b.cta2":"Programın tamamını görün",


    "s2.eye":"Turlarımız",
    "s2.lead":"Beş rota, dört günden dokuz güne","s2.cta":"Turu keşfedin",

    "tour.priceAsk":"Fiyat için bize yazın",
    "tour.from":"Başlangıç","tour.perPerson":"kişi başı","tour.perGroup":"grup başına",
    "tour.days":"gün","tour.nights":"gece",
    "tour.closeAria":"Bu turu kapatın ve tur listesine dönün",
    "tour.back":"Tüm turlar",

    "tour.overview":"Genel bakış",
    "tour.highlights":"Turun öne çıkanları",
    "tour.itinerary":"Gün gün program",
    "tour.itineraryNote":"İçeriğini görmek için bir güne dokunun.",
    "tour.stay":"Konaklama",
    "tour.meals":"Dahil öğünler",
    "tour.mealsNone":"Öğün dahil değil",
    "tour.inclusions":"Dahil olanlar ve olmayanlar",
    "tour.included":"Dahil olanlar",
    "tour.notIncluded":"Dahil olmayanlar",
    "tour.optional":"Opsiyonel deneyimler",
    "tour.info":"Tur bilgileri",
    "tour.notes":"Önemli notlar",
    "tour.destinations":"Destinasyonlar","tour.duration":"Süre","tour.price":"Fiyat",
    "tour.other":"Diğer rotalar",

    "tour.cta":"Bu turu sorun",
    "tour.ctaWa":"WhatsApp'tan sorun",
    "tour.ctaLead":"Bu rotayla ilgili aklınıza gelen her şeyi sorun.",
    "tour.ctaBody":"Tarihlerinizi ve kimlerin geleceğini yazmanız yeterli. Bir iş günü içinde Türkçe, İngilizce ya da Almanca dönüş yaparız. İlk yanıt genellikle broşür değil, sorulardır.",
    "tour.waMsg":"Merhaba Yalla Egypt, {tour} turuyla ilgileniyorum. Daha fazla bilgi almak istiyorum.",
    "wa.msg":"Merhaba Yalla Egypt, turlarınız hakkında daha fazla bilgi almak istiyorum.",

    "s3.eye":"Çalıştığımız yerler",
    "s3.lead":"Rotalarımızın geçtiği yerler. Çoğu tur bunlardan iki ya da üçünü birleştirir.",
    "s3.hint":"Yana sürükleyin veya kaydırın",


    "s5.eye":"İlk mesajdan inişe kadar",
    "s5.lead":"Beş adım. Her birinin sonunda durabilirsiniz.",
    "steps":[
      {h:"Siz yazarsınız",p:"Tarihler, kaç gün, kimler geliyor ve kaçırmak istemeyeceğiniz tek şey. Başlamak için bu yeterli."},
      {h:"Biz sorarız",p:"Genellikle bir iş günü içinde ve genellikle broşürle değil soruyla. Asıl iş o sorularda."},
      {h:"Yazılı bir rota",p:"Programın tamamı, otel isimleriyle, neyin dahil olduğu ve olmadığıyla. Bu aşamada hiçbir şey tutulmuş ya da onaylanmış değildir."},
      {h:"Siz değiştirirsiniz",p:"Rotaların çoğu iki üç revizyondan geçer. Bu normaldir ve hiçbir maliyeti yoktur."},
      {h:"Sahada",p:"İnişten çıkış kapısına kadar arayabileceğiniz tek numara, kendi dilinizde."}
    ],

    "s6.eye":"Onların ifadesiyle",
    "s6.lead":"Sonrasında söyledikleri.",
    "s6.rated":"5 üzerinden {n} puan.",
    "mq.pause":"Yorumları duraklat","mq.play":"Yorumları oynat",

    "s7.eye":"Muhatabınız kim",
    "s7.lead":"Lüks bir şirketten alınmaz. İnsanlardan alınır.",
    "s7.body":"Bu sitedeki her rotayı aynı küçük ekip planlıyor ve yürütüyor. İlk mesajınızı yanıtlayan kişi, sizi gelen yolcu kapısında karşılayan ve gece on birde telefonu açan kişiyle aynı. Müşteri temsilcisi yok, çağrı merkezi yok; indikten sonra hiçbir şey üçüncü bir operatöre devredilmiyor.",

    "s8.eye":"Sormadan önce",
    "s8.lead":"Neredeyse her ilk mesajda gelen altı soru.",
    "faq":[
      {q:"Ne zaman gelmeliyiz?",
       a:"İç bölgelerin tamamı için ekim ile nisan arası: Kahire, Luksor, Asvan, Abu Simbel ve çöl. Mayıs ile eylül arasında Yukarı Mısır gerçekten sıcak olur. 40°C ve üzeri sıcaklıkta şafakta başlayıp öğlen durmak gerekir. Kızıldeniz kıyısı yıl boyu çalışır."},
      {q:"Kaç gün gerekir?",
       a:"Kahire ve Giza için acele etmeden dört gün yeter. Luksor ile Asvan arasındaki Nil için bir hafta ekleyin. Üç günün altındaysa, keyif almayacağınız bir program satmaktansa sizi uçuştan vazgeçirmeyi tercih ederiz."},
      {q:"Vize gerekiyor mu?",
       a:"Türk, Avrupa, İngiltere ve ABD pasaportlarının çoğu kapıda vize alabiliyor ya da önceden çevrimiçi başvurabiliyor; kurallar değişiyor. Hiçbir şey rezerve edilmeden önce sizin pasaportunuz için güncel durumu kontrol ediyoruz. Ancak bağlayıcı kaynak her zaman kendi dışişleri bakanlığınızdır."},
      {q:"Ödeme nasıl ve ne zaman yapılıyor?",
       a:"Kapora tarihlerinizi kesinleştirir; bakiye yola çıkmadan önce ödenir. Tutar, takvim ve kabul edilen yöntemler yazılı teklifinizde yer alır ve bu teklif elinize geçmeden sizden hiçbir ödeme istenmez. Kart bilgilerinizi sohbet üzerinden ya da telefonda almayız.", tbc:true},
      {q:"İptal etmek zorunda kalırsak ne oluyor?",
       a:"İptal koşulları, hangi tarihte neyin değiştiğiyle birlikte, siz hiçbir ödeme yapmadan önce teklifinizde açık bir dille yazılıdır. Oteller ve iç hat uçuşlarının kendi koşulları vardır; bunları tek bir rakamın içine gizlemek yerine bize ulaştığı haliyle aktarırız.", tbc:true},
      {q:"Uçuş, otel ve müze girişleri dahil mi?",
       a:"Uluslararası uçuşlar dahil değil. Oteller, transferler, şoförler, rehberlik, iç hat uçuşları ve giriş biletleri teklifinizde kalem kalem yazılıdır; hariç olan her şey de adıyla belirtilir. Bir kalem orada yoksa dahil değildir. Asvan'da öğrenmenizdense şimdi sormanızı tercih ederiz.", tbc:true}
    ],

    "s9.eye":"Sıradaki adım",
    "s9.q":"Ne zaman müsaitsiniz, söyleyin. Gerisini biz kurarız.",
    "s9.cta2":"WhatsApp'tan yazın",

    "contact.direct.eye":"Doğrudan",
    "contact.direct.email":"E-posta gönderin","contact.direct.phone":"Bizi arayın","contact.direct.whatsapp":"WhatsApp'tan yazın",
    "contact.direct.instagram":"Instagram'da bizi takip edin",
    "contact.label.email":"E-posta","contact.label.phone":"Telefon","contact.label.whatsapp":"WhatsApp",
    "contact.label.instagram":"Instagram","contact.instagram.v":"Instagram'da bizi takip edin",
    "contact.youtube.v":"YouTube'da bizi izleyin","contact.tripadvisor.v":"TripAdvisor yorumlarımızı okuyun",

    "contact.form.eye":"Ya da bize yazın",
    "contact.form.name":"Ad soyad","contact.form.email":"E-posta",
    "contact.form.dates":"Yaklaşık seyahat tarihleri","contact.form.people":"Kişi sayısı",
    "contact.form.message":"Aklınızdakini anlatın","contact.form.submit":"Mesajı gönder",
    "contact.form.note":"Bir iş günü içinde dönüş yaparız. Gönder'e bastığınızda e-posta uygulamanız mesaj hazır şekilde açılır. Siz oradan göndermeden bize ulaşmaz.",
    "contact.form.about":"Konu:",
    "contact.form.sentH":"E-postanız gönderilmeye hazır.",
    "contact.form.sentP":"E-posta uygulamanızı mesaj hazır şekilde açtık. Oradan gönderdiğinizde bize ulaşır. Hiçbir şey açılmadıysa doğrudan bu adrese yazın:",
    "contact.form.again":"Yeni bir mesaj yazın",

    "foot.desc":"Mısır merkezli bir seyahat atölyesi. Burada yaşayan insanların kurduğu özel rotalar.",
    "foot.explore":"Keşfet","foot.contact":"İletişim",
    "foot.office":"Ofis adresi","foot.legal":"Yasal bilgiler · Gizlilik · Şartlar",
    "foot.reg":"Şirket tescil bilgileri","foot.top":"Başa dön",

    "tbc":"EKLENECEK"
  },

  /* ==========================================================
     DEUTSCH
     ========================================================== */
  de:{
    "meta.title":"Yalla Egypt | Private Reisen durch Ägypten",
    "meta.description":"Ein Reisehaus mit Sitz in Ägypten. Wir planen private Reisen durch das Niltal, die Westliche Wüste und die Küste des Roten Meeres. Türkisch, Englisch, Deutsch.",
    "skip":"Zum Inhalt springen",

    "nav.journeys":"Reisen","nav.experience":"Erlebnis","nav.dest":"Ziele","nav.planning":"Ablauf",
    "nav.about":"Über uns","nav.contact":"Kontakt","nav.cta":"Reise planen",
    "nav.menu":"Menü öffnen","nav.close":"Menü schließen","nav.home":"Yalla Egypt, Startseite",

    "hero.h":"Auf den Spuren der Pharaonen,<br>eine private Tür zu<br><em>fünf Jahrtausenden.</em>",
    "hero.sub":"Abseits der überfüllten Touren. Ägypten mit der Sorgfalt eines Historikers und der Wärme eines Freundes.",
    "hero.cta1":"Kontakt aufnehmen","hero.cta2":"Touren entdecken",
    "hero.pause":"Diashow pausieren","hero.play":"Diashow starten",
    "hero.pauseFilm":"Film pausieren","hero.playFilm":"Film abspielen",
    "hero.prev":"Vorheriges Bild","hero.next":"Nächstes Bild",

    "trust.licence":"Lizenz & Registrierung",

    "phil.eye":"Unsere Haltung",
    "phil.quote":"Einen Ort wirklich zu sehen heißt, die Geschichten zu kennen, die zu ihm gehören. Wir bringen Sie nicht zu den Pyramiden. Wir bringen Sie in das Denken der Zivilisation, die sie gebaut hat.",
    "phil.who":"Die Gründungsphilosophie von Yalla Egypt",
    "s3b.eye":"Beispielprogramm",
    "s3b.lead":"Fünf Tage am Nil",
    "s3b.cta":"Nach diesem Programm fragen","s3b.cta2":"Das vollständige Programm ansehen",


    "s2.eye":"Unsere Reisen",
    "s2.lead":"Fünf Routen, von vier bis neun Tagen","s2.cta":"Reise ansehen",

    "tour.priceAsk":"Preis auf Anfrage",
    "tour.from":"Ab","tour.perPerson":"pro Person","tour.perGroup":"pro Gruppe",
    "tour.days":"Tage","tour.nights":"Nächte",
    "tour.closeAria":"Diese Reise schließen und zurück zur Übersicht",
    "tour.back":"Alle Reisen",

    "tour.overview":"Überblick",
    "tour.highlights":"Höhepunkte der Reise",
    "tour.itinerary":"Tag für Tag",
    "tour.itineraryNote":"Öffnen Sie einen Tag, um zu sehen, was er enthält.",
    "tour.stay":"Unterkunft",
    "tour.meals":"Inbegriffene Mahlzeiten",
    "tour.mealsNone":"Keine Mahlzeiten inbegriffen",
    "tour.inclusions":"Inbegriffen und nicht inbegriffen",
    "tour.included":"Inbegriffen",
    "tour.notIncluded":"Nicht inbegriffen",
    "tour.optional":"Optionale Erlebnisse",
    "tour.info":"Reiseinformationen",
    "tour.notes":"Wichtige Hinweise",
    "tour.destinations":"Ziele","tour.duration":"Dauer","tour.price":"Preis",
    "tour.other":"Die anderen Routen",

    "tour.cta":"Zu dieser Reise anfragen",
    "tour.ctaWa":"Per WhatsApp fragen",
    "tour.ctaLead":"Fragen Sie uns alles zu dieser Route.",
    "tour.ctaBody":"Nennen Sie uns Ihren Zeitraum und wer mitreist. Wir antworten innerhalb eines Werktags auf Türkisch, Englisch oder Deutsch. Die erste Antwort besteht meist aus Fragen, nicht aus einer Broschüre.",
    "tour.waMsg":"Hallo Yalla Egypt, ich interessiere mich für die Reise {tour}. Ich hätte gern mehr Informationen.",
    "wa.msg":"Hallo Yalla Egypt, ich hätte gern mehr Informationen zu Ihren Reisen.",

    "s3.eye":"Wo wir arbeiten",
    "s3.lead":"Die Orte, an denen wir arbeiten. Die meisten Reisen nutzen zwei oder drei davon.",
    "s3.hint":"Seitlich ziehen oder scrollen",


    "s5.eye":"Von der ersten Nachricht bis zur Landung",
    "s5.lead":"Fünf Schritte. Nach jedem können Sie aufhören.",
    "steps":[
      {h:"Sie schreiben",p:"Zeitraum, Anzahl der Tage, wer mitkommt und eine Zeile dazu, was Sie auf keinen Fall verpassen möchten. Das genügt für den Anfang."},
      {h:"Wir fragen nach",p:"Meist innerhalb eines Werktags, und meist mit Fragen statt mit einer Broschüre. Die Fragen sind die eigentliche Arbeit."},
      {h:"Eine Route, schriftlich",p:"Der vollständige Ablauf, Hotels mit Namen, und was enthalten ist und was nicht. Zu diesem Zeitpunkt ist nichts reserviert und nichts bestätigt."},
      {h:"Sie ändern sie",p:"Die meisten Routen durchlaufen zwei bis drei Überarbeitungen. Das ist normal und kostet nichts."},
      {h:"Vor Ort",p:"Eine Nummer, in Ihrer Sprache, von der Landung bis zum Abfluggate."}
    ],

    "s6.eye":"In ihren Worten",
    "s6.lead":"Was Gäste hinterher gesagt haben.",
    "s6.rated":"Mit {n} von 5 Sternen bewertet.",
    "mq.pause":"Bewertungen pausieren","mq.play":"Bewertungen abspielen",

    "s7.eye":"Mit wem Sie es zu tun haben",
    "s7.lead":"Luxus kauft man nicht von einem Unternehmen, sondern von Menschen.",
    "s7.body":"Jede Route auf dieser Seite wird von derselben kleinen Gruppe geplant und durchgeführt. Wer Ihre erste Nachricht beantwortet, holt Sie auch an der Ankunft ab und geht um elf Uhr nachts ans Telefon. Kein Account-Manager, kein Callcenter, und nach der Landung wird nichts an einen fremden Veranstalter übergeben.",

    "s8.eye":"Bevor Sie fragen",
    "s8.lead":"Die sechs Fragen aus fast jeder ersten Nachricht.",
    "faq":[
      {q:"Wann sollten wir kommen?",
       a:"Oktober bis April für alles im Landesinneren: Kairo, Luxor, Assuan, Abu Simbel und die Wüste. Mai bis September ist Oberägypten wirklich heiß: 40 °C und mehr, das heißt Aufbruch bei Sonnenaufgang und Schluss am Mittag. An der Küste des Roten Meeres ist das ganze Jahr über Saison."},
      {q:"Wie viele Tage brauchen wir?",
       a:"Vier Tage reichen für Kairo und Gizeh ohne Hetze. Für den Nil zwischen Luxor und Assuan rechnen Sie eine Woche dazu. Unter drei Tagen reden wir Ihnen den Flug lieber aus, als Ihnen ein Programm zu verkaufen, das keinen Spaß macht."},
      {q:"Brauchen wir ein Visum?",
       a:"Reisende mit deutschem, österreichischem, schweizerischem, türkischem oder einem anderen EU-Pass erhalten das Visum in der Regel bei der Ankunft oder beantragen es vorab online; die Regeln ändern sich. Wir prüfen den aktuellen Stand für Ihren Pass, bevor irgendetwas gebucht wird. Verbindlich ist aber immer Ihr eigenes Außenministerium."},
      {q:"Wie und wann wird bezahlt?",
       a:"Eine Anzahlung bestätigt Ihre Termine, der Restbetrag wird vor der Reise fällig. Höhe, Zahlungsplan und akzeptierte Zahlungsarten stehen in Ihrem schriftlichen Angebot, und Sie werden nie um eine Zahlung gebeten, bevor Ihnen dieses Angebot vorliegt. Kartendaten nehmen wir weder im Chat noch am Telefon entgegen.", tbc:true},
      {q:"Was passiert, wenn wir stornieren müssen?",
       a:"Die Stornobedingungen stehen in klarer Sprache in Ihrem Angebot, mit den Fristen, ab denen sie sich ändern, und zwar bevor Sie irgendetwas bezahlen. Hotels und Inlandsflüge haben eigene Bedingungen; wir geben sie genau so weiter, wie sie uns erreichen, statt sie in einer einzigen Zahl verschwinden zu lassen.", tbc:true},
      {q:"Sind Flüge, Hotels und Eintritte enthalten?",
       a:"Internationale Flüge nicht. Hotels, Transfers, Fahrer, Führungen, Inlandsflüge und Eintritte stehen Posten für Posten in Ihrem Angebot, und was nicht enthalten ist, wird ausdrücklich benannt. Was nicht aufgeführt ist, ist nicht enthalten. Fragen Sie lieber jetzt als in Assuan.", tbc:true}
    ],

    "s9.eye":"Nächster Schritt",
    "s9.q":"Sagen Sie uns, wann Sie Zeit haben. Den Rest übernehmen wir.",
    "s9.cta2":"Über WhatsApp schreiben",

    "contact.direct.eye":"Direkt",
    "contact.direct.email":"E-Mail schreiben","contact.direct.phone":"Anrufen","contact.direct.whatsapp":"Über WhatsApp schreiben",
    "contact.direct.instagram":"Folgen Sie uns auf Instagram",
    "contact.label.email":"E-Mail","contact.label.phone":"Telefon","contact.label.whatsapp":"WhatsApp",
    "contact.label.instagram":"Instagram","contact.instagram.v":"Folgen Sie uns auf Instagram",
    "contact.youtube.v":"Sehen Sie uns auf YouTube","contact.tripadvisor.v":"Unsere Bewertungen auf TripAdvisor",

    "contact.form.eye":"Oder schreiben Sie uns",
    "contact.form.name":"Vollständiger Name","contact.form.email":"E-Mail",
    "contact.form.dates":"Ungefährer Reisezeitraum","contact.form.people":"Anzahl der Reisenden",
    "contact.form.message":"Erzählen Sie uns von Ihren Plänen","contact.form.submit":"Nachricht senden",
    "contact.form.note":"Wir antworten innerhalb eines Werktags. Beim Senden öffnet sich Ihr E-Mail-Programm mit der fertigen Nachricht. Abgeschickt wird sie erst dort durch Sie.",
    "contact.form.about":"Betreff:",
    "contact.form.sentH":"Ihre E-Mail ist fertig zum Senden.",
    "contact.form.sentP":"Wir haben Ihr E-Mail-Programm mit der fertigen Nachricht geöffnet. Senden Sie sie dort ab, dann erreicht sie uns. Falls sich nichts geöffnet hat, schreiben Sie uns direkt an",
    "contact.form.again":"Weitere Nachricht schreiben",

    "foot.desc":"Ein Reisehaus mit Sitz in Ägypten. Private Reisen, geplant von Menschen, die hier leben.",
    "foot.explore":"Entdecken","foot.contact":"Kontakt",
    "foot.office":"Büroadresse","foot.legal":"Impressum · Datenschutz · AGB",
    "foot.reg":"Handelsregisterangaben","foot.top":"Nach oben",

    "tbc":"FOLGT"
  }
};
