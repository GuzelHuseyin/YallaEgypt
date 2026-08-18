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
    "meta.title":"Yalla Egypt — Private journeys through Egypt",
    "meta.description":"An Egypt-based travel house planning private journeys through the Nile Valley, the Western Desert and the Red Sea coast. Turkish, English and German.",
    "skip":"Skip to content",

    "nav.journeys":"Journeys","nav.dest":"Destinations","nav.planning":"Planning",
    "nav.about":"About","nav.contact":"Contact","nav.cta":"Plan your trip",
    "nav.menu":"Open menu","nav.close":"Close menu","nav.home":"Yalla Egypt — home",

    "hero.h":"Egypt,<br><em>unhurried.</em>",
    "hero.sub":"An Egypt-based travel house. We plan private journeys through the Nile Valley, the Western Desert and the Red Sea coast — built around the time you actually have.",
    "hero.cta1":"Explore journeys","hero.cta2":"Talk to us first",
    "hero.pause":"Pause slideshow","hero.play":"Play slideshow",
    "hero.pauseFilm":"Pause film","hero.playFilm":"Play film",
    "hero.prev":"Previous image","hero.next":"Next image",

    "trust":[
      "Private departures only",
      "Written route before anything is confirmed",
      "Turkish · English · German",
      "Based in Egypt, not resold from abroad"
    ],
    "trust.licence":"Licence & registration",

    "s1.eye":"01 — How we work",
    "s1.lead":"Most people see Egypt through a coach window.",
    "s1.body":"Six sites in a day, a guide with a raised umbrella, a departure at seven whether you slept or not. We work the other way round. You tell us how many days you have and what you actually care about — and we build the route from there. Which morning you stand in Karnak before the light gets hard. Which afternoon you spend on the water. Which day you do nothing at all.",
    "s1.body2":"Everything is private. No fixed departures, no shared coaches, no shopping stops.",

    "s2.eye":"02 — Journeys",
    "s2.lead":"Four routes we know well enough to argue about.",
    "s2.days":"days","s2.private":"Private","s2.price":"Price on request",
    "s2.more":"See the route","s2.less":"Close",
    "s2.route":"Route","s2.best":"When to go","s2.pace":"Pace",
    "s2.written":"Every route is rewritten around your dates before anything is confirmed.",
    "s2.ask":"Ask about this journey",

    "s3.eye":"03 — Where we work",
    "s3.lead":"The places we work in. Most journeys use two or three of them.",
    "s3.hint":"Drag or scroll sideways",

    "s4.eye":"04 — What you can hold us to",
    "s4.lead":"Four things we put in writing, and mean.",
    "ap":[
      {h:"One person, start to finish",p:"The same name answers your first message and your question from the airport. Not a shared inbox."},
      {h:"Written before it's booked",p:"You get the full route, what's included and what isn't, in writing — before anything is confirmed."},
      {h:"We'll tell you what to skip",p:"Some sites aren't worth the drive in August. We'd rather say so than sell you the day."},
      {h:"Turkish, English, German",p:"Planning, guiding and support in all three. Not translated brochures."}
    ],

    "s5.eye":"05 — From first message to landing",
    "s5.lead":"Five steps. You can stop after any of them.",
    "steps":[
      {h:"You write",p:"Dates, how many days, who's coming, and one line about what you'd hate to miss. That's enough to start."},
      {h:"We ask back",p:"Usually within one business day, and usually with questions rather than a brochure. The questions are the work."},
      {h:"A route, in writing",p:"The full itinerary, hotels named, what's included and what isn't. Nothing is held or confirmed at this point."},
      {h:"You change it",p:"Most routes go through two or three revisions. That's normal and it costs nothing."},
      {h:"On the ground",p:"One number to call, in your language, from landing to departure gate."}
    ],

    "s6.eye":"06 — In their words",
    "s6.lead":"What people said afterwards.",
    "s6.demo":"Demo content — replace via js/data.js",
    "mq.pause":"Pause testimonials","mq.play":"Play testimonials",

    "s7.eye":"07 — Who you'll be dealing with",
    "s7.lead":"Luxury isn't bought from a company. It's bought from people.",
    "s7.body":"Every route on this site is planned and run by the same small group — the people below plan it, meet you at arrivals and answer the phone at eleven at night. Their names, faces and credentials belong here, and they go in before launch.",
    "s7.quote":"Really seeing a place means knowing the stories that belong to it. We don't take you to the pyramids — we take you into the mind of the civilisation that built them.",
    "s7.quoteWho":"Founder, Yalla Egypt",
    "s7.slot":"Name, role and portrait",
    "s7.rolePh":"Role",

    "s8.eye":"08 — Before you ask",
    "s8.lead":"The six questions that arrive in almost every first message.",
    "faq":[
      {q:"When should we come?",
       a:"October to April for everything inland — Cairo, Luxor, Aswan, Abu Simbel and the desert. May to September is genuinely hot in Upper Egypt: 40°C and above, which means starting at dawn and stopping by noon. The Red Sea coast works all year."},
      {q:"How many days do we need?",
       a:"Four days is enough for Cairo and Giza without rushing. Add a week for the Nile between Luxor and Aswan. Under three days we'd rather talk you out of the flight than sell you a schedule you won't enjoy."},
      {q:"Do we need a visa?",
       a:"Most European, Turkish, UK and US passport holders can get a visa on arrival or apply online in advance, and requirements change. We check the current rule for your specific passport before you book anything — but the official source is always your own foreign ministry."},
      {q:"How and when do we pay?",
       a:"Deposit amount, payment schedule and accepted methods go here.", tbc:true},
      {q:"What happens if we have to cancel?",
       a:"Cancellation and refund terms go here, in plain language, with the deadlines that matter.", tbc:true},
      {q:"Are flights, hotels and entry tickets included?",
       a:"What a quoted price does and does not cover goes here.", tbc:true}
    ],

    "s9.eye":"09 — Next step",
    "s9.q":"Tell us when you're free. We'll take it from there.",
    "s9.cta1":"Plan your trip","s9.cta2":"Message on WhatsApp",

    "contact.direct.eye":"Direct",
    "contact.direct.email":"Email us","contact.direct.phone":"Call us","contact.direct.whatsapp":"Message us on WhatsApp",
    "contact.label.email":"Email","contact.label.phone":"Phone","contact.label.whatsapp":"WhatsApp",

    "contact.form.eye":"Or write to us",
    "contact.form.name":"Full name","contact.form.email":"Email",
    "contact.form.dates":"Approximate travel dates","contact.form.people":"Number of travellers",
    "contact.form.message":"Tell us what you have in mind","contact.form.submit":"Send message",
    "contact.form.note":"We reply within one business day. This form opens your email client — wire it to a booking backend or form service before launch.",
    "contact.form.about":"About:",

    "foot.desc":"An Egypt-based travel house. Private journeys, planned by people who live here.",
    "foot.explore":"Explore","foot.contact":"Contact","foot.follow":"Follow",
    "foot.office":"Office address","foot.legal":"Legal notice · Privacy · Terms",
    "foot.reg":"Company registration","foot.top":"Back to top",

    "tbc":"TBC"
  },

  /* ==========================================================
     TÜRKÇE
     ========================================================== */
  tr:{
    "meta.title":"Yalla Egypt — Mısır'da özel seyahatler",
    "meta.description":"Mısır merkezli bir seyahat atölyesi. Nil Vadisi, Batı Çölü ve Kızıldeniz kıyısında özel rotalar planlıyoruz. Türkçe, İngilizce, Almanca.",
    "skip":"İçeriğe geç",

    "nav.journeys":"Rotalar","nav.dest":"Destinasyonlar","nav.planning":"Nasıl işliyor",
    "nav.about":"Hakkımızda","nav.contact":"İletişim","nav.cta":"Rotanı kur",
    "nav.menu":"Menüyü aç","nav.close":"Menüyü kapat","nav.home":"Yalla Egypt — ana sayfa",

    "hero.h":"Mısır,<br><em>acele etmeden.</em>",
    "hero.sub":"Mısır merkezli bir seyahat atölyesi. Nil Vadisi, Batı Çölü ve Kızıldeniz kıyısında özel rotalar kuruyoruz — elinizdeki gerçek süreye göre.",
    "hero.cta1":"Rotaları gör","hero.cta2":"Önce konuşalım",
    "hero.pause":"Slaytları duraklat","hero.play":"Slaytları oynat",
    "hero.pauseFilm":"Filmi duraklat","hero.playFilm":"Filmi oynat",
    "hero.prev":"Önceki görsel","hero.next":"Sonraki görsel",

    "trust":[
      "Yalnızca özel kalkışlar",
      "Onaydan önce yazılı rota",
      "Türkçe · İngilizce · Almanca",
      "Mısır'da yerleşiğiz, aracı değiliz"
    ],
    "trust.licence":"Lisans & tescil",

    "s1.eye":"01 — Nasıl çalışıyoruz",
    "s1.lead":"Çoğu insan Mısır'ı otobüs camından görüyor.",
    "s1.body":"Günde altı nokta, şemsiyesini kaldırmış bir rehber, uyusanız da uyumasanız da yedide kalkış. Biz tersinden çalışıyoruz. Kaç gününüz var ve gerçekten neyi merak ediyorsunuz — rotayı buradan kuruyoruz. Karnak'ta hangi sabah, ışık sertleşmeden. Hangi öğleden sonra suda. Hangi gün hiçbir şey yapmadan.",
    "s1.body2":"Her şey özel. Sabit kalkış yok, ortak otobüs yok, alışveriş molası yok.",

    "s2.eye":"02 — Rotalar",
    "s2.lead":"Üzerine tartışacak kadar iyi bildiğimiz dört rota.",
    "s2.days":"gün","s2.private":"Özel","s2.price":"Fiyat talep üzerine",
    "s2.more":"Rotayı gör","s2.less":"Kapat",
    "s2.route":"Güzergâh","s2.best":"Ne zaman gidilir","s2.pace":"Tempo",
    "s2.written":"Her rota, onaydan önce sizin tarihlerinize göre yeniden yazılır.",
    "s2.ask":"Bu rotayı sorun",

    "s3.eye":"03 — Çalıştığımız yerler",
    "s3.lead":"Çalıştığımız yerler. Çoğu rota bunlardan iki üçünü kullanıyor.",
    "s3.hint":"Yana sürükleyin veya kaydırın",

    "s4.eye":"04 — Bizi bağlayan şeyler",
    "s4.lead":"Yazıya döktüğümüz ve arkasında durduğumuz dört şey.",
    "ap":[
      {h:"Baştan sona tek kişi",p:"İlk mesajınıza cevap veren isim, havaalanından sorduğunuz soruya da cevap verir. Ortak gelen kutusu değil."},
      {h:"Onaydan önce yazılı",p:"Rotanın tamamı, neyin dahil olduğu ve olmadığı — hiçbir şey kesinleşmeden önce yazılı olarak elinizde."},
      {h:"Neyi atlamanız gerektiğini söyleriz",p:"Bazı noktalar ağustosta o yolu hak etmiyor. Günü size satmaktansa bunu söylemeyi tercih ederiz."},
      {h:"Türkçe, İngilizce, Almanca",p:"Planlama, rehberlik ve destek üçünde de. Çevrilmiş broşür değil."}
    ],

    "s5.eye":"05 — İlk mesajdan inişe kadar",
    "s5.lead":"Beş adım. Her birinin sonunda durabilirsiniz.",
    "steps":[
      {h:"Siz yazarsınız",p:"Tarihler, kaç gün, kimler geliyor ve kaçırmak istemeyeceğiniz tek şey. Başlamak için bu yeterli."},
      {h:"Biz sorarız",p:"Genellikle bir iş günü içinde ve genellikle broşürle değil soruyla. Asıl iş o sorularda."},
      {h:"Yazılı bir rota",p:"Programın tamamı, otel isimleriyle, neyin dahil olduğu ve olmadığıyla. Bu aşamada hiçbir şey tutulmuş ya da onaylanmış değildir."},
      {h:"Siz değiştirirsiniz",p:"Rotaların çoğu iki üç revizyondan geçer. Bu normaldir ve hiçbir maliyeti yoktur."},
      {h:"Sahada",p:"İnişten çıkış kapısına kadar arayabileceğiniz tek numara, kendi dilinizde."}
    ],

    "s6.eye":"06 — Onların ifadesiyle",
    "s6.lead":"Sonrasında söyledikleri.",
    "s6.demo":"Demo içerik — js/data.js üzerinden değiştirilecek",
    "mq.pause":"Yorumları duraklat","mq.play":"Yorumları oynat",

    "s7.eye":"07 — Muhatabınız kim",
    "s7.lead":"Lüks bir şirketten alınmaz. İnsanlardan alınır.",
    "s7.body":"Bu sitedeki her rotayı aynı küçük ekip planlıyor ve yürütüyor — aşağıdaki isimler rotayı kuruyor, sizi gelen yolcu kapısında karşılıyor ve gece on birde telefonu açıyor. İsimleri, yüzleri ve belgeleri buraya ait; yayına girmeden önce buraya eklenecek.",
    "s7.quote":"Bir yeri gerçekten görmek, oraya ait hikâyeleri bilmekten geçer. Biz sizi sadece piramitlere değil, onları inşa eden uygarlığın zihnine götürüyoruz.",
    "s7.quoteWho":"Kurucu, Yalla Egypt",
    "s7.slot":"İsim, görev ve fotoğraf",
    "s7.rolePh":"Görev",

    "s8.eye":"08 — Sormadan önce",
    "s8.lead":"Neredeyse her ilk mesajda gelen altı soru.",
    "faq":[
      {q:"Ne zaman gelmeliyiz?",
       a:"İç bölgelerin tamamı için ekim–nisan arası: Kahire, Luksor, Asvan, Abu Simbel ve çöl. Mayıs–eylül arası Yukarı Mısır gerçekten sıcak — 40°C ve üzeri, yani şafakta başlayıp öğlen durmak gerekir. Kızıldeniz kıyısı yıl boyu çalışır."},
      {q:"Kaç gün gerekir?",
       a:"Kahire ve Giza için acele etmeden dört gün yeter. Luksor–Asvan arası Nil için bir hafta ekleyin. Üç günün altındaysa, keyif almayacağınız bir program satmaktansa sizi uçuştan vazgeçirmeyi tercih ederiz."},
      {q:"Vize gerekiyor mu?",
       a:"Türk, Avrupa, İngiltere ve ABD pasaportlarının çoğu kapıda vize alabiliyor ya da önceden çevrimiçi başvurabiliyor; kurallar değişiyor. Hiçbir şey rezerve edilmeden önce sizin pasaportunuz için güncel durumu kontrol ediyoruz — ama bağlayıcı kaynak her zaman kendi dışişleri bakanlığınızdır."},
      {q:"Ödeme nasıl ve ne zaman yapılıyor?",
       a:"Kapora tutarı, ödeme takvimi ve kabul edilen yöntemler buraya gelecek.", tbc:true},
      {q:"İptal etmek zorunda kalırsak ne oluyor?",
       a:"İptal ve iade koşulları, önemli tarihlerle birlikte, açık bir dille buraya gelecek.", tbc:true},
      {q:"Uçuş, otel ve müze girişleri dahil mi?",
       a:"Verilen fiyatın neyi kapsayıp neyi kapsamadığı buraya gelecek.", tbc:true}
    ],

    "s9.eye":"09 — Sıradaki adım",
    "s9.q":"Ne zaman müsaitsiniz, söyleyin. Gerisini biz kurarız.",
    "s9.cta1":"Rotanı kur","s9.cta2":"WhatsApp'tan yazın",

    "contact.direct.eye":"Doğrudan",
    "contact.direct.email":"E-posta gönderin","contact.direct.phone":"Bizi arayın","contact.direct.whatsapp":"WhatsApp'tan yazın",
    "contact.label.email":"E-posta","contact.label.phone":"Telefon","contact.label.whatsapp":"WhatsApp",

    "contact.form.eye":"Ya da bize yazın",
    "contact.form.name":"Ad soyad","contact.form.email":"E-posta",
    "contact.form.dates":"Yaklaşık seyahat tarihleri","contact.form.people":"Kişi sayısı",
    "contact.form.message":"Aklınızdakini anlatın","contact.form.submit":"Mesajı gönder",
    "contact.form.note":"Bir iş günü içinde dönüş yaparız. Bu form e-posta uygulamanızı açar — yayına almadan önce bir rezervasyon sistemine ya da form servisine bağlayın.",
    "contact.form.about":"Konu:",

    "foot.desc":"Mısır merkezli bir seyahat atölyesi. Burada yaşayan insanların kurduğu özel rotalar.",
    "foot.explore":"Keşfet","foot.contact":"İletişim","foot.follow":"Takip et",
    "foot.office":"Ofis adresi","foot.legal":"Yasal bilgiler · Gizlilik · Şartlar",
    "foot.reg":"Şirket tescil bilgileri","foot.top":"Başa dön",

    "tbc":"EKLENECEK"
  },

  /* ==========================================================
     DEUTSCH
     ========================================================== */
  de:{
    "meta.title":"Yalla Egypt — Private Reisen durch Ägypten",
    "meta.description":"Ein Reisehaus mit Sitz in Ägypten. Wir planen private Reisen durch das Niltal, die Westliche Wüste und die Küste des Roten Meeres. Türkisch, Englisch, Deutsch.",
    "skip":"Zum Inhalt springen",

    "nav.journeys":"Reisen","nav.dest":"Ziele","nav.planning":"Ablauf",
    "nav.about":"Über uns","nav.contact":"Kontakt","nav.cta":"Reise planen",
    "nav.menu":"Menü öffnen","nav.close":"Menü schließen","nav.home":"Yalla Egypt — Startseite",

    "hero.h":"Ägypten,<br><em>ohne Eile.</em>",
    "hero.sub":"Ein Reisehaus mit Sitz in Ägypten. Wir planen private Reisen durch das Niltal, die Westliche Wüste und die Küste des Roten Meeres — nach der Zeit, die Sie wirklich haben.",
    "hero.cta1":"Reisen ansehen","hero.cta2":"Erst sprechen",
    "hero.pause":"Diashow pausieren","hero.play":"Diashow starten",
    "hero.pauseFilm":"Film pausieren","hero.playFilm":"Film abspielen",
    "hero.prev":"Vorheriges Bild","hero.next":"Nächstes Bild",

    "trust":[
      "Ausschließlich private Abfahrten",
      "Schriftliche Route vor jeder Bestätigung",
      "Türkisch · Englisch · Deutsch",
      "Ansässig in Ägypten, nicht weitervermittelt"
    ],
    "trust.licence":"Lizenz & Registrierung",

    "s1.eye":"01 — Wie wir arbeiten",
    "s1.lead":"Die meisten sehen Ägypten durch ein Busfenster.",
    "s1.body":"Sechs Stätten an einem Tag, ein Guide mit erhobenem Schirm, Abfahrt um sieben — ob ausgeschlafen oder nicht. Wir machen es andersherum. Sie sagen uns, wie viele Tage Sie haben und was Sie wirklich interessiert. Daraus bauen wir die Route. An welchem Morgen Sie in Karnak stehen, bevor das Licht hart wird. Welchen Nachmittag Sie auf dem Wasser verbringen. An welchem Tag Sie gar nichts tun.",
    "s1.body2":"Alles privat. Keine festen Abfahrten, keine geteilten Busse, keine Einkaufsstopps.",

    "s2.eye":"02 — Reisen",
    "s2.lead":"Vier Routen, die wir gut genug kennen, um über sie zu streiten.",
    "s2.days":"Tage","s2.private":"Privat","s2.price":"Preis auf Anfrage",
    "s2.more":"Route ansehen","s2.less":"Schließen",
    "s2.route":"Verlauf","s2.best":"Beste Zeit","s2.pace":"Tempo",
    "s2.written":"Jede Route wird vor der Bestätigung auf Ihre Daten neu geschrieben.",
    "s2.ask":"Zu dieser Reise anfragen",

    "s3.eye":"03 — Wo wir arbeiten",
    "s3.lead":"Die Orte, an denen wir arbeiten. Die meisten Reisen nutzen zwei oder drei davon.",
    "s3.hint":"Seitlich ziehen oder scrollen",

    "s4.eye":"04 — Woran Sie uns messen können",
    "s4.lead":"Vier Dinge, die wir schriftlich geben — und einhalten.",
    "ap":[
      {h:"Eine Person, von Anfang bis Ende",p:"Derselbe Name antwortet auf Ihre erste Nachricht und auf Ihre Frage vom Flughafen. Kein Sammelpostfach."},
      {h:"Schriftlich vor der Buchung",p:"Die vollständige Route, Inklusiv- und Ausschlussleistungen — schriftlich, bevor irgendetwas bestätigt wird."},
      {h:"Wir sagen Ihnen, was Sie auslassen sollten",p:"Manche Stätten lohnen die Fahrt im August nicht. Das sagen wir lieber, als Ihnen den Tag zu verkaufen."},
      {h:"Türkisch, Englisch, Deutsch",p:"Planung, Führung und Betreuung in allen drei Sprachen. Keine übersetzten Broschüren."}
    ],

    "s5.eye":"05 — Von der ersten Nachricht bis zur Landung",
    "s5.lead":"Fünf Schritte. Nach jedem können Sie aufhören.",
    "steps":[
      {h:"Sie schreiben",p:"Zeitraum, Anzahl der Tage, wer mitkommt und eine Zeile dazu, was Sie auf keinen Fall verpassen möchten. Das genügt für den Anfang."},
      {h:"Wir fragen nach",p:"Meist innerhalb eines Werktags — und meist mit Fragen statt mit einer Broschüre. Die Fragen sind die eigentliche Arbeit."},
      {h:"Eine Route, schriftlich",p:"Der vollständige Ablauf, Hotels mit Namen, Inklusiv- und Ausschlussleistungen. Zu diesem Zeitpunkt ist nichts reserviert und nichts bestätigt."},
      {h:"Sie ändern sie",p:"Die meisten Routen durchlaufen zwei bis drei Überarbeitungen. Das ist normal und kostet nichts."},
      {h:"Vor Ort",p:"Eine Nummer, in Ihrer Sprache, von der Landung bis zum Abfluggate."}
    ],

    "s6.eye":"06 — In ihren Worten",
    "s6.lead":"Was Gäste hinterher gesagt haben.",
    "s6.demo":"Demo-Inhalt — über js/data.js ersetzen",
    "mq.pause":"Bewertungen pausieren","mq.play":"Bewertungen abspielen",

    "s7.eye":"07 — Mit wem Sie es zu tun haben",
    "s7.lead":"Luxus kauft man nicht von einem Unternehmen, sondern von Menschen.",
    "s7.body":"Jede Route auf dieser Seite wird von derselben kleinen Gruppe geplant und durchgeführt — die Menschen unten bauen die Route, holen Sie an der Ankunft ab und gehen um elf Uhr nachts ans Telefon. Ihre Namen, Gesichter und Qualifikationen gehören hierher und werden vor dem Livegang ergänzt.",
    "s7.quote":"Einen Ort wirklich zu sehen heißt, die Geschichten zu kennen, die zu ihm gehören. Wir bringen Sie nicht zu den Pyramiden — wir bringen Sie in das Denken der Zivilisation, die sie gebaut hat.",
    "s7.quoteWho":"Gründer, Yalla Egypt",
    "s7.slot":"Name, Funktion und Porträt",
    "s7.rolePh":"Funktion",

    "s8.eye":"08 — Bevor Sie fragen",
    "s8.lead":"Die sechs Fragen aus fast jeder ersten Nachricht.",
    "faq":[
      {q:"Wann sollten wir kommen?",
       a:"Oktober bis April für alles im Landesinneren — Kairo, Luxor, Assuan, Abu Simbel und die Wüste. Mai bis September ist Oberägypten wirklich heiß: 40 °C und mehr, das heißt Aufbruch bei Sonnenaufgang und Schluss am Mittag. Die Küste des Roten Meeres geht das ganze Jahr."},
      {q:"Wie viele Tage brauchen wir?",
       a:"Vier Tage reichen für Kairo und Gizeh ohne Hetze. Für den Nil zwischen Luxor und Assuan rechnen Sie eine Woche dazu. Unter drei Tagen reden wir Ihnen den Flug lieber aus, als Ihnen ein Programm zu verkaufen, das keinen Spaß macht."},
      {q:"Brauchen wir ein Visum?",
       a:"Die meisten deutschen, österreichischen, schweizerischen, türkischen und EU-Pässe bekommen ein Visum bei Ankunft oder beantragen es vorab online; die Regeln ändern sich. Wir prüfen den aktuellen Stand für Ihren Pass, bevor irgendetwas gebucht wird — verbindlich ist aber immer Ihr eigenes Außenministerium."},
      {q:"Wie und wann wird bezahlt?",
       a:"Anzahlung, Zahlungsplan und akzeptierte Zahlungsarten kommen hierher.", tbc:true},
      {q:"Was passiert, wenn wir stornieren müssen?",
       a:"Storno- und Rückerstattungsbedingungen kommen hierher, in klarer Sprache und mit den Fristen, auf die es ankommt.", tbc:true},
      {q:"Sind Flüge, Hotels und Eintritte enthalten?",
       a:"Was ein genannter Preis abdeckt und was nicht, kommt hierher.", tbc:true}
    ],

    "s9.eye":"09 — Nächster Schritt",
    "s9.q":"Sagen Sie uns, wann Sie Zeit haben. Den Rest übernehmen wir.",
    "s9.cta1":"Reise planen","s9.cta2":"Über WhatsApp schreiben",

    "contact.direct.eye":"Direkt",
    "contact.direct.email":"E-Mail schreiben","contact.direct.phone":"Anrufen","contact.direct.whatsapp":"Über WhatsApp schreiben",
    "contact.label.email":"E-Mail","contact.label.phone":"Telefon","contact.label.whatsapp":"WhatsApp",

    "contact.form.eye":"Oder schreiben Sie uns",
    "contact.form.name":"Vollständiger Name","contact.form.email":"E-Mail",
    "contact.form.dates":"Ungefährer Reisezeitraum","contact.form.people":"Anzahl der Reisenden",
    "contact.form.message":"Erzählen Sie uns von Ihren Plänen","contact.form.submit":"Nachricht senden",
    "contact.form.note":"Wir antworten innerhalb eines Werktags. Dieses Formular öffnet Ihr E-Mail-Programm — vor dem Livegang mit einem Buchungssystem oder Formulardienst verbinden.",
    "contact.form.about":"Betreff:",

    "foot.desc":"Ein Reisehaus mit Sitz in Ägypten. Private Reisen, geplant von Menschen, die hier leben.",
    "foot.explore":"Entdecken","foot.contact":"Kontakt","foot.follow":"Folgen",
    "foot.office":"Büroadresse","foot.legal":"Impressum · Datenschutz · AGB",
    "foot.reg":"Handelsregisterangaben","foot.top":"Nach oben",

    "tbc":"FOLGT"
  }
};
