# Yalla Egypt — Luxury Brand & Design Audit

Kaynak: `Web_site_tasarım.html`, `yalla-egypt-renk-paleti.html`, `yalla-egypt-logo-3.pdf`
Rol: Creative Director / Senior Product Designer değerlendirmesi. Kod önerisi yok.

---

## Önce tek cümlelik hüküm

Tasarım disiplinli ve zevkli, ama **bir seyahat markası değil, bir marka sunumu.**
Sayfada **sıfır fotoğraf** var. Mısır, degrade ve çizgi ikonlarla satılmaya çalışılıyor.
Bu tek eksik, diğer tüm sorunların toplamından daha belirleyici.

---

# 1. Design Audit

## Premium hissettirenler — bunlara dokunmayın

**Kontrast disiplini.** Paletin okunabilirlik matematiği gerçekten iyi ve bu nadir:

| Eşleşme | Oran | Sonuç |
|---|---|---|
| Krem `#F3EAD3` / Obsidyen `#0B0A08` | 16.51 | AAA |
| Soluk krem `#CABF9F` / Obsidyen | 10.80 | AAA |
| Altın `#C9A24B` / Obsidyen | 8.25 | AAA |
| Altın / Antrasit `#121A26` | 7.29 | AAA |
| Siyah yazı / altın buton | 8.25 | AAA |

Çoğu "lüks" tasarım burada çakılır. Bu palet çakılmıyor.

**Altın hairline sistemi.** 56px'lik ince altın ayraç, `rgba(201,162,75,0.28)` kenarlıklar.
Altını çizgi ölçeğinde kullanmak doğru refleks — büyük altın alan yok, gradient altın yok.
Bu, ucuz altın ile pahalı altın arasındaki farkın tam olarak kendisi.

**Eyebrow tipografisi.** 12.5px, `0.32em` harf aralığı, altın. Doğru ölçek, doğru mesafe.

**Genel sadelik.** Sayfa kalabalık değil, boşluk cömert, ikon bombardımanı yok.

## Ucuz hissettirenler — brutally honest

**1. Sıfır fotoğraf.** `<img>` sayısı: 0. Fotoğraf URL'si: 0. SVG çizim: 8. Gradient: 9.

Aman, Four Seasons ve A&K sitelerinde piksel alanının %70–80'i fotoğraftır. Lüks seyahat
görselle satılır; yazıyla değil. Fotoğrafsız bir Mısır sitesi, ziyaretçiye "bu şirket
oraya hiç gitmemiş olabilir" dedirtir. **Bu, sitedeki en pahalı hata.**

**2. `.sun-disk` — 170px'lik radial-gradient güneş.**
Sayfadaki en ucuz eleman. Radial-gradient "parlayan küre", 2021–2024 arası kripto ve
yapay zekâ landing page'lerinin görsel imzası. Lüks seyahatte hiçbir karşılığı yok.
Üstelik altındaki 64px'lik gradient çizgiyle birlikte, fotoğraf yokluğunu kapatmak için
konmuş bir dolgu gibi okunuyor — çünkü öyle.

**3. Hero'daki scanline overlay.** `background-size:100% 3px`, %5 opaklık.
CRT ekran / retro-fütürizm göndermesi. Yanlış yüzyıl, yanlış tür.

**4. Ambient radial glow'lar.** Hero'da %18'de altın, %80'de mavi iki elips.
Sun disk ile aynı aileden. Üçü birlikte "SaaS hero" sözlüğü oluşturuyor.

**5. Yanıp sönen scroll cue.** `animation:pulse 2s infinite`. Sonsuz yanıp sönen eleman
premium değil, dikkat dağıtıcıdır. Lüks markalar kullanıcıyı aşağı kaydırmaya
yalvarmaz.

**6. Dev tırnak işareti** testimonial'da. 2014 kalıbı.

## Eskimiş hissettirenler

**Cinzel.** Trajan sütunu harflerinden türetilmiş Roma majüskülü. Düğün davetiyesi,
film afişi ve "luxury template" dünyasında 2010'dan beri aşırı kullanıldı. Küçük harfi
yok — bu yüzden her başlık büyük harf olmak zorunda, bu da uzun başlıkları okunamaz
yapıyor. Ölçeklendiğinde "bespoke" değil "şablon" okunacak.

**Cormorant Garamond, 19px gövde.** Cormorant bir *display* Garamond'dur; gövde
kalınlıkları 40px+ için tasarlanmış. 19px'te, üstelik koyu zeminde açık metin olarak,
harfler parlar (halation) ve uzun paragrafta göz yorar. Lüks Mısır turu alan kitlenin
yaş ortalaması 45+; bu seçim tam olarak o kitleyi zorlar.

**Her şeyin ortalanmış olması.** Hero ortalı, bölüm başlıkları ortalı, testimonial
ortalı, iletişim ortalı. Ortalanmış düzen "tören / davetiye" hissi verir. Aman ve A&K
ağırlıklı olarak **sola hizalı, asimetrik editorial** grid kullanır. Ortalanmış lüks,
düğün lüksüdür; editorial lüks değildir.

## Tutarsızlıklar

**Üç yazı ailesi, üç farklı çağ.** Cinzel (Roma, MS 1. yy) + Cormorant (Fransız
Rönesansı, 16. yy) + Jost (Bauhaus/Futura, 1920'ler). Aralarında hiçbir ortak mantık
yok. Bir arada "seçilmiş" değil "toplanmış" görünüyorlar.

**Mavi ailesi ölü ve hatalı.** Safir `#1C3A63`, Safir-2 `#3A6EA5`, Açık lapis `#7FB0E0`
tanımlı ama neredeyse hiç kullanılmıyor. Daha kötüsü:

| Eşleşme | Oran | Sonuç |
|---|---|---|
| Safir-2 `#3A6EA5` / Obsidyen | 3.73 | **AA'da kalıyor** |
| Safir-2 / Antrasit | 3.29 | **AA'da kalıyor** |

Yani mavi vurgu rengi metin olarak kullanılamaz durumda ve zaten kullanılmıyor.

**Oksit kırmızı `#8B3A2B`** palet dokümanında "şu an kullanılmıyor" diye tanımlı.
Kullanılmayan renk, palette yer kaplamamalı.

## Kaldırılması gerekenler

Sun disk · scanline overlay · ambient radial glow'lar · yanıp sönen scroll cue ·
dev tırnak işareti · oksit kırmızı · safir-2 (kontrast geçmiyor) ·
ornament ayraç (çizgi-nokta-çizgi)

## Korunması gerekenler

Obsidyen + antrasit zemin ilişkisi · altın hairline sistemi · eyebrow tipografisi ·
56px altın ayraç · kontrast disiplini · genel boşluk cömertliği · logo markasının
temel fikri

---

# 1b. Logo değerlendirmesi

Fikir iyi: dairesel madalyon, tepe işaretleri, ufuk çizgisi, üç piramit, güneş noktası.
Tepe işaretleri (saat kadranı gibi) gerçekten ayırt edici bir detay.

Ama dört pratik sorun var:

**Ölçeklenmiyor.** Çizgi kalınlıkları çok ince ve daire içinde çok fazla detay var.
32px favicon'da develer, iç daire ve ufuk çizgisi tamamen kaybolur. Geriye gri bir
leke kalır. **İkinci bir "kompakt marka" gerekiyor** — muhtemelen sadece üç piramit +
tepe işaretli daire, develer olmadan.

**Develer klişe tarafı.** Piramit + deve, Mısır turizminin en çok kullanılan
kombinasyonu. Logonun geri kalanı bundan daha zeki. Develer çıkarsa marka yükselir.

**Yatay kilit yok.** Sadece dikey kompozisyon var. Navbar yatay bir kilit ister;
mevcut tasarım bunu SVG + metni yan yana koyarak taklit ediyor. Gerçek yatay lockup
tasarlanmalı.

**Açık zemin versiyonu yok.** PDF'te "YALLA" krem renkte ve beyaz zeminde neredeyse
görünmüyor. Bu logo şu hâliyle yalnızca koyu zeminde çalışıyor. Fatura, sözleşme,
Google işletme kaydı, basılı kartvizit — hepsi açık zemin ister.

---

# 2. Homepage Structure Review

## Mevcut sıra

Hero → Felsefe alıntısı → 4 Tur → 5 Günlük program → 1 Testimonial → İletişim → Footer

## Sorunlar

**Pozisyon 2'de kendi kendinize alıntı yapıyorsunuz.** "— Yalla Egypt Kuruluş
Felsefesi" imzalı bir blockquote. Kendi felsefenizi alıntılamak kanıt değildir.
Ziyaretçinin ikinci temas noktası, sizin hakkınızda sizin söylediğiniz şey olmamalı.

**Tek bir spesifik program (5 Günlük Nil) üst düzey bölüm olmuş.** Bu bir tur detay
sayfası içeriği. Ana sayfada, 4 turluk grid'in hemen altında durunca o dördüyle
rekabet ediyor ve "aslında tek bir tur mu var?" sorusu doğuruyor.

**`#hakkimizda` çapası bir testimonial'a bağlı.** Menüde "Hakkımızda" yazıyor,
tıklayınca müşteri yorumuna gidiyorsunuz. About bölümü hiç yok.

**Tur kartlarındaki "Detayları Gör →" iletişime gidiyor** (`href="#iletisim"`).
Kullanıcı detay bekliyor, form buluyor. Bu, kazara kurulmuş bir karanlık kalıp ve
dönüşümü doğrudan öldürür — beklenti kırılan kullanıcı geri dönmez.

**Güven katmanı hiçbir yerde yok.** Lisans, ekip, süreç, ödeme — hiçbiri.

## Önerilen sıra ve gerekçeleri

| # | Bölüm | Neden bu pozisyonda |
|---|---|---|
| 1 | **Hero** — tam ekran fotoğraf | İlk 3 saniyede "bu şirket Mısır'ı biliyor" hissi görselle kurulur |
| 2 | **Güven şeridi** | Şüphe, vaatten hemen sonra zirve yapar. Kaydırmadan önce cevaplanmalı |
| 3 | **Signature journeys** | İnsanlar ürün için geldi. Felsefe okumak için değil |
| 4 | **Neden biz** | Ürünü gördükten sonra farklılaşmanın tutunacağı bir yer olur |
| 5 | **Nasıl işliyor** | Rezervasyon kaygısının yaşadığı yer burası: ödeme ne zaman, revizyon var mı |
| 6 | **Destinasyonlar** | Karar vermemiş ziyaretçi için ikinci gezinme yolu |
| 7 | **Sosyal kanıt** | Teklifi anladıktan sonra kanıt dönüştürür; önce gösterilirse gürültüdür |
| 8 | **Hakkımızda / ekip** | Lüks, kurumdan değil insanlardan satın alınır. Yüzler, isimler, lisans |
| 9 | **SSS** | CTA'dan önce kalan itirazları toplar |
| 10 | **Final CTA + form** | Tüm itirazlar cevaplandıktan sonraki tek eylem |
| 11 | **Footer** | Şirket unvanı, lisans, adres, yasal |

Felsefe alıntısı silinmeli değil — **Hakkımızda bölümünün içine**, kurucunun adı ve
fotoğrafıyla taşınmalı. O zaman alıntı olmaktan çıkıp kanıta dönüşür.

---

# 3. Luxury Positioning

Aman / Four Seasons / A&K / Nat Geo Expeditions ile aradaki farkı yaratan altı şey:

**1. Fotoğraf.** Farkın %70'i burada. Bu markaların hiçbiri ürününü çizimle anlatmaz.

**2. İsimli insanlar.** A&K "bizim Mısırbilimcilerimiz" der ve onları isimleriyle,
özgeçmişleriyle tanıtır. Aman otel müdürlerini isimle anar. **Anonim lüks diye bir şey
yoktur.** Şu an sitede tek bir insan ismi yok.

**3. Spesifiklik.** "Beş bin yıllık miras" cümlesi hiçbir şey söylemiyor; her Mısır
acentesi bunu yazabilir. Lüks metin somuttur: *"Karnak altıda açılır; ilk otobüsler
gelene kadar sütunlu salon kırk dakika sizindir."* Aynı vaat, ama biri kanıt gibi
okunuyor.

**4. Editorial derinlik.** Nat Geo ve A&K günlük, uzman yazıları, bölge rehberleri
yayınlar. Bu içerik satmaz — **uzmanlığı kanıtlar.** Şu an sitede hiç yok.

**5. Fiyat duruşu.** Aman fiyatı saklamaz, bağlamlandırır. Sitede fiyata dair tek
kelime yok — bu "pahalı" değil "belirsiz" okunur. Belirsizlik lüks değildir.

**6. Sola hizalı asimetrik editorial düzen.** Ortalanmış tören düzeni yerine.

Ayrıca **süsleme fazlalığı** var: ornament ayracı, cartouche çerçevesi, dev tırnak.
Aman'da neredeyse hiç süs yoktur. Lüks, eklemekle değil çıkarmakla kurulur.

---

# 4. Trust & Conversion Analysis

## İlk kez gelen ziyaretçi bu şirkete güvenir mi?

**Hayır.** Açık konuşmak gerekirse bu sitenin bugünkü hâliyle para gönderilmez.

## Eksik güven sinyalleri

- Lisans / acente belge numarası yok
- Şirket unvanı yok
- Ofis adresi yok
- Telefon numarası yok (`tel:` bağlantısı: 0)
- WhatsApp yok (bu pazarda kritik — Türkiye ve Körfez kitlesi öncelikle WhatsApp kullanır)
- Ekip yok, yüz yok, isim yok
- Faaliyet süresi yok
- Sigorta / üyelik bilgisi yok
- Footer'da **"Bu bir tasarım taslağıdır"** yazıyor

## Eksik sosyal kanıt

- Tek bir testimonial var, kaynağı doğrulanamaz
- TripAdvisor / Google yorum bağlantısı yok
- Yıldız puanı, yorum sayısı yok
- Basın, ödül, sertifika yok
- Müşteri fotoğrafı yok

## Eksik dönüşüm fırsatları

- **İletişim = `mailto:` bağlantısı.** Sitedeki en yüksek sürtünmeli dönüşüm yolu.
  Mobilde çoğu kullanıcıda hiçbir şey açılmaz veya yanlış uygulama açılır. Form yok
  (`<form>` sayısı: 0)
- Tur kartlarının detay sayfası yok — ilgi duyan kullanıcının gidecek yeri yok
- Sabit / yapışkan CTA yok
- Mobilde alt eylem çubuğu yok
- Fiyat çerçevesi yok ("kişiye özel fiyatlandırma" bile denmemiş)
- Sezon bilgisi yok (Mısır'da ay seçimi satın alma kararının merkezinde)
- Yanıt süresi taahhüdü yok

## Teknik hijyen (dönüşümü doğrudan etkileyenler)

- `<h1>` yok — sıfır. Marka adı `div` içinde. SEO ve ekran okuyucu için ikisi de sorun
- `meta description` yok
- `alt` niteliği yok
- Sadece **bir** media query var (860px). Tablet ve küçük telefon için ayrı düzen yok
- Focus stili tek satır — klavye kullanıcısı için yetersiz

---

# 5. Hero Section Review

## Mevcut yapı

Güneş diski → eyebrow → 200px logo → "YALLA" (84px'e kadar) → altın çizgi →
"EGYPT" → italik alt metin → iki buton → yanıp sönen scroll cue. Hepsi ortalı,
degrade zemin üzerinde.

## Temel problem

**Bu bir hero değil, bir logo sunumu.** Ekrandaki en büyük eleman marka adı.

Ziyaretçi ilk saniyede markanızın adını umursamıyor; **size neden ihtiyacı olduğunu**
öğrenmek istiyor. Marka adı navbar'da zaten var. Hero'da 84px olarak tekrar etmek,
en değerli ekran alanını kendinizi tanıtmaya harcamaktır.

## Diğer sorunlar

**Başlık yok.** Fayda anlatan tek bir cümle yok. `<h1>` sıfır. Hero'nun tüm ikna işini
22px italik Cormorant alt metin yapıyor — hem en dekoratif hem en zor okunan eleman.

**Hiyerarşi yok.** Altı eleman üst üste, hepsi ortalı, hepsi benzer görsel ağırlıkta.
Göz nereye gideceğini bilmiyor. Ortalanmış yığın, hiyerarşinin düşmanıdır.

**Zemin degrade.** Seyahat markası için en büyük kayıp. Kullanıcı Mısır'ı görmüyor.

**İki eşit ağırlıklı buton.** "Turları Keşfedin" ve "Bize Ulaşın" yan yana, benzer
ağırlıkta. İki eşit seçenek sunulunca kullanıcı çoğu zaman hiçbirini seçmez.

## Önerilen hero

- **Tam ekran sinematik fotoğraf** (ileride video) — tek en büyük iyileştirme
- **Sola hizalı, alta yaslı** kompozisyon. Ortalanmış yığın yerine okuma yönü
- Logo yalnızca navbar'da, küçük. Hero'da tekrar edilmez
- **Gerçek bir `<h1>`** — fayda cümlesi, marka adı değil
- Tek satır alt metin, italik değil, okunabilir boyutta
- **Tek birincil CTA** (altın dolgu) + tek sönük ikincil
- Hero'nun altında ince güven şeridi: lisans · yerel ekim · ön ödeme yok
- Scroll cue kalabilir ama yanıp sönmemeli

## Gelecek fazlar için not (şimdi uygulanmayacak, kayda geçsin)

**Sinematik video arka plan** planlandığında uyulması gereken sınırlar:
- Mutlaka poster frame olmalı; video yüklenene kadar fotoğraf görünür
- Sessiz, döngüsel, 6–8 saniye, 2 MB altı
- Mobilde video yerine statik fotoğraf (veri maliyeti + pil)
- `prefers-reduced-motion` açıksa video hiç oynamaz
- Video LCP'yi bloklamamalı — poster görsel LCP elemanı olmalı

**Marka açılış animasyonu (brand reveal)** planlandığında:
- Atlanabilir olmalı ve yalnızca ilk ziyarette görünmeli
- 1.2 saniyeyi geçmemeli
- İçeriği geciktirmemeli — arkada sayfa zaten yüklenmiş olmalı
- Dönen kullanıcı için tamamen kapalı olmalı

Lüks markalarda giriş animasyonu bir kez etkiler, ikinci kez engeldir.

---

# 6. Visual Direction

## Fotoğraf tarzı

**Kullanın:** doğal ışık, şafak ve gün batımı saatleri, insan ölçeği (yapının
büyüklüğünü göstermek için kadrajda tek bir figür), belgesel yaklaşım, doku
(kireçtaşı, granit, keten, su), iç mekân (sütunlu salon, otel odası, tekne güvertesi).

**Kaçının:** aşırı doygun HDR, poz vermiş gülümseyen çiftler, yalnızca drone kareleri,
insansız kartpostal manzarası, stok fotoğraf hissi veren her şey.

**Kritik:** müşterinin kendi çektiği fotoğraflar stok fotoğrafın çok önündedir. Bir
lüks tur şirketinin en güçlü kanıtı, gerçekten orada olduğunu gösteren karelerdir.
Mümkünse profesyonel bir çekim bütçesi ayrılmalı — bu, sitedeki en yüksek getirili
harcama olur.

## Görsel seçimi

Her bölüm bir görsel işlev taşımalı: hero (atmosfer), turlar (ürün), destinasyonlar
(coğrafya), hakkımızda (insan), final CTA (arzu). Şu an beşi de yok.

## İkon stili

Tek ağırlıkta çizgi, 1.5px, dolgusuz, köşesiz. Az sayıda ve yalnızca güven şeridinde.
İkon dekorasyon değil işaretleme aracıdır. Mevcut tur kartlarındaki büyük SVG ikonlar
fotoğrafla değiştirilmeli.

## Bölüm boşlukları

130px'lik dikey boşluk masaüstünde doğru. Sorun miktar değil **tekdüzelik**: her bölüm
aynı ritimde. Bazı bölümler tam genişlik ve yüksek, bazıları dar ve alçak olmalı.
Ritim değişimi premium hissin yarısıdır.

## Lüks görsel kodlar

**Evet:** ince hairline'lar, cömert kenar boşlukları, sola hizalı editorial düzen,
büyük tipografi ile çok küçük tipografi arasındaki keskin kontrast, altında disiplin,
sayfa başına tek dolu buton.

**Hayır:** ornament, çerçeve içinde çerçeve, parlama efekti, gradient metin,
yumuşak gölge, yuvarlatılmış köşe, sonsuz animasyon.

---

# 7. Final Verdict

| Kriter | Puan | Gerekçe |
|---|---|---|
| **Design Quality** | 6.5 / 10 | Disiplinli ve temiz; ama sun disk, scanline ve glow'lar seviyeyi düşürüyor. Ortalanmış düzen hiyerarşiyi zayıflatıyor |
| **Luxury Feeling** | 5 / 10 | Lüks *kelime dağarcığı* var, lüks *icra* yok. Cinzel + altın + ortalı = şablon lüks |
| **Trustworthiness** | 2 / 10 | Lisans yok, telefon yok, ekip yok, fotoğraf yok, doğrulanabilir kanıt yok |
| **Conversion Potential** | 2.5 / 10 | Tek eylem `mailto:`, form yok, WhatsApp yok, tur detay sayfası yok, kartlar iletişime yönlendiriyor |
| **Mobile Experience** | 3 / 10 | Tek media query (860px). Tablet ve 360px için düzen yok. Mobil CTA yok |
| **Brand Identity** | 6 / 10 | Marka fikri gerçekten iyi; ölçeklenmezlik, deve klişesi ve font seçimleri değerini düşürüyor |

**Genel: 4.2 / 10** — sağlam bir estetik temel, ticari olarak henüz çalışmayan bir ürün.

---

## Öncelikli yol haritası

### Faz 1 — Tasarım düzeltmeleri
1. Sun disk, scanline, ambient glow'lar ve yanıp sönen cue kaldırılır
2. Hero yeniden kurgulanır: tam ekran fotoğraf, sola hizalı, gerçek `<h1>`, tek birincil CTA
3. Ortalanmış düzenden sola hizalı editorial düzene geçilir
4. Gövde yazı tipi değiştirilir (Cormorant gövdeden çıkar, başlıklarda kalabilir)
5. Cinzel gözden geçirilir — alternatif inceleme yapılır
6. Safir-2 ve oksit kırmızı paletten çıkarılır
7. Logo: kompakt versiyon + yatay kilit + açık zemin versiyonu üretilir

### Faz 2 — İçerik
1. **Fotoğraf çekimi / seçimi** — en yüksek öncelikli tek kalem
2. Her tur için detay sayfası içeriği (program, dahil olanlar, buluşma noktası)
3. Somut metin yazımı — genel ifadeler yerine spesifik detaylar
4. Hakkımızda: kurucu hikâyesi, ekip, isimler
5. SSS içeriği: vize, transfer, ödeme, iptal, sezon
6. Felsefe alıntısı Hakkımızda'ya taşınır ve isimlendirilir

### Faz 3 — Güven
1. Lisans numarası, şirket unvanı, adres, telefon eklenir
2. WhatsApp entegrasyonu
3. Gerçek yorumlar + kaynak bağlantısı (TripAdvisor / Google)
4. Ödeme ve iptal politikası yazılı hâle getirilir
5. "Nasıl işliyor" bölümü — ödemenin ne zaman alındığı açıkça
6. İletişim formu (`mailto:` yerine)
7. Ekip fotoğrafları

### Faz 4 — Hareket
1. Hero sinematik video (poster frame, mobilde statik, reduced-motion desteği)
2. Marka açılış animasyonu (atlanabilir, ilk ziyaret, 1.2 sn altı)
3. Kontrollü scroll reveal — abartısız
4. Kart hover mikro etkileşimleri

### Faz 5 — Teknik
1. `<h1>`, meta description, alt metinler, semantic HTML
2. Responsive: 360 / 390 / 768 / 1024 / 1440 kırılımları
3. Görsel optimizasyonu, lazy loading, modern format
4. Erişilebilirlik AA: focus stilleri, klavye navigasyonu
5. Lighthouse ölçümü ve LCP optimizasyonu
6. Çok dilli yapı, schema markup, sitemap

---

## Eğer sadece üç şey yapılacaksa

1. **Fotoğraf ekleyin.** Diğer her şeyden önce.
2. **Lisans numarası, telefon ve WhatsApp ekleyin.** Güven puanı 2'den 6'ya çıkar.
3. **Hero'dan logoyu çıkarıp yerine bir fayda cümlesi koyun.**

Bu üçü, kalan tüm maddelerin toplamından daha fazla fark yaratır.
