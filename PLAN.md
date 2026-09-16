# sitegen-landing-ui-004 — načrt

Svetla tema **Lumiera** (beauty / spa) za sitegen landing. Logika, podatkovni tok, poti in
sidra so enaki kot v `sitegen-landing-ui-002`; na novo so tema, komponente, sekcije in demo
vsebina.

## Vir resnice za dizajn

- Figma: datoteka _Lumiera Template_ (`HD2qzS66trb08YEzlolH8T`), mapa _Beauty theme_.
- Stran **`sitegen — Lumiera`** — 23 sekcij, vsaka s spec panelom, desktop 1440 / tablet 768 /
  mobile 390, foto in dark variante. Stran **`pregled — Lumiera`** — vse sekcije zapovrstjo.
- Nabor elementov je enak kot v ui-002 (spec: `sitegen-sekcije-in-elementi.md`). Dizajn
  spreminja postavitev, nikoli nabora.
- Dark frame-i v Figmi so za morebitno kasnejšo temno različico (kot 003 za 002) — v 004 jih ni.

## Odločitve (10. 9. 2026)

1. Repo je zaseben; commiti gredo sproti na `main`.
2. **Footer** v Figmi še ne obstaja: najprej ga narišem po Lumierinem FOOTER-1 z elementi iz
   speca, potrditev, šele nato koda.
3. **Mint `#ecf5f4`** je fiksen token teme. Kremna in rožnata ploskev se izpeljeta iz strankine
   primarne in sekundarne barve v `brand.ts`.
4. **Demo vsebina ni Reforma Pilates.** Nov beauty/spa `website.json` (SL + EN, vse sekcije
   napolnjene) in lastne demo slike. Zaenkrat se smejo uporabiti fotografije iz Lumiere;
   kasneje se zamenjajo.

## Pravila, ki veljajo za vso kodo

- Vizualna koda bere podatke samo prek `@/core/*` (`pnpm check:boundary`).
- Nobenih fiksnih barv ali pisav v komponentah; vse iz teme. `createPreviewTheme` izpelje
  vsako izpeljano vrednost v obeh vejah (brez in s prilagoditvami).
- Pogodba urejevalnika teme ostane: `THEME_EDITOR_UPDATE` (primary, secondary, text,
  fontHeading, fontBody, fontBanner, banner), `sessionStorage` ključ, banner dogodek,
  variante `slogan` in `navLink`, brezpogojni `useBannerImage()` v `Section`, uteži pisav ≤ 700.
- Poti in sidra enaka kot v ui-002.

## Faze

### 0 — načrt (ta commit)

Repo, ta datoteka. Stop.

### 1 — izhodišče

- Kopija **commitanega** stanja ui-002 (`git archive HEAD`), brez zgodovine.
- Identiteta: `uiId` → 004 v `sitegen-ui.json` in `package.json`, README.
- `pnpm install`, `pnpm verify`, `pnpm build` zeleni — to je referenčno stanje.
- Nova demo vsebina: beauty/spa `website.json` po shared-types (vse sekcije, SL + EN, vsi
  opcijski elementi prisotni), slike iz Lumiere v `public/images`, posodobljen `DEMO-SLIKE.md`.
  preizkusne stranke v `fixtures/*` prilagojene novim podatkom.

### 2 — tema in skupni gradniki

- **Pisave**: Fraunces (naslovi), Figtree (besedilo) prek `next/font/google`.
- **Tipografija** (desktop / tablet / mobile): h1 70 / 56 / 32, h2 42 / 36 / 28, h3 32 / 28 / 26,
  h4 26 / 24 / 22, h5 22 / 20 / 20, h6 18, besedilo 15/26, caption 14/24, gumb 15 medium.
- **Barve**: privzeto primary `#b48e5a`, secondary `#d9a7a0`, besedilo `#1a1a1a`. Ploskve
  (`bg-alt`, `surface`, `rose`, `border`, `placeholder`) iz `brand.ts`; mint fiksen.
- **Mreža**: robovi 120 / 60 / 36, širine 1440 / 768 / 390 → MUI md / sm / xs.
- **Header**: steklena pilula (nav levo, logo sredina, jezik desno); brez banner slike svetla
  varianta; mobile hamburger + odprt meni po Lumieri. `HeroNotch` odstranjen.
- **Footer**: po potrjenem Figma frameu.
- **Gradniki**: Lumierin gumb s puščico (Primary / Dark / Border / white), okrogli gumbi,
  carousel kontrole (progress črta + puščici), filtri-pilule, številčna paginacija, steklena
  kartica za besedilo slike, tanek drseči trak, statusne značke, okvirji slik (r12 / r16 / r24),
  ikone (SVG iz Lumiere: lokacija, ura, telefon, e-pošta, dokument, predvajaj, lupa, puščice).

### 3 — sekcije, ena po ena

Za vsako: vrednosti iz Figme → vprašam pred zagonom dev strežnika (`pnpm dev -H 0.0.0.0`) →
povezavi za računalnik in telefon s sidrom → potrditev → commit.

| #   | Sekcija      | Mapa (kot v 002)  | Lumiera vzorec                                                     |
| --- | ------------ | ----------------- | ------------------------------------------------------------------ |
| 1   | hero         | `home/`           | spa slider, steklen header                                         |
| 2   | naslovni pas | `header/`         | banner notranjih strani, zaobljen rob                              |
| 3   | o nas        | `about/`          | spa about, steklena kartica, drseča trakova                        |
| 4   | izkušnje     | `why-us/`         | why-choose + about-number, certifikati v panelu                    |
| 5   | stranke      | `clients/`        | trak logotipov                                                     |
| 6   | ekipa        | `team/`           | team kartice na mint podlagi                                       |
| 7   | storitve     | `services/`       | Featured Services + kljukice                                       |
| 8   | projekti     | `portfolio/`      | shop list (mreža), shop single (detajl)                            |
| 9   | galerija     | `gallery/`        | instagram, trije stolpci                                           |
| 10  | mnenja       | `review/`         | review kartice na mint podlagi                                     |
| 11  | blog         | `blog/`           | From Our Blog, detajl s stransko kartico                           |
| 12  | cta pas      | `call-to-action/` | book-banner                                                        |
| 13  | novice       | `subscribe/`      | newsletter pilula                                                  |
| 14  | kontakt      | `contact/`        | ikone iz Contact, obrazec v kremnem panelu, zemljevid              |
| 15  | katalogi     | `catalogue/`      | vrstice s črtami, pilula za prenos                                 |
| 16  | videi        | `video/`          | zaobljene sličice, bel gumb predvajaj                              |
| 17  | cenik        | `pricing/`        | LIST (pilule-slike), PACKAGES (Beauty Packages), STORE (shop list) |
| 18  | zaposlitev   | `careers/`        | kartice z zahtevami                                                |
| 19  | FAQ          | `faq/`            | Lumiera FAQ harmonika                                              |
| 20  | urnik        | `schedule/`       | tabela z kremno glavo                                              |
| 21  | dogodki      | `events/`         | kartice + orodna vrstica, detajl                                   |
| 22  | pravno       | `legal/`          | dokumentni kartici                                                 |
| 23  | 404          | `not-found/`      | kremna kompozicija na sredini                                      |

### 4 — QA

`pnpm verify`, `pnpm build`, `pnpm test:variants` (vse preizkusne stranke), zajem 390 / 768 / 1440 iz
`out/` prek Edge CDP, primerjava poti in sider z ui-002, preverjanje urejevalnika teme
(barve, pisave, banner, ponastavitev).

**Izid (15. 9. 2026)**

- `pnpm verify` čist, `pnpm build` uspe — 20 poti, `sitemap.xml`, `robots.txt`, izvoz 9,2 MB.
- `pnpm test:variants`: vseh 12 preizkusnih strank čistih, 0 težav. Dodani sta `cenik-seznam` in
  `cenik-trgovina`, ker demo podatki uporabljajo tip „paketi" in ostali dve različici
  cenika drugače nista bili vidni nikjer.
- Poti in sidra so identična ui-001, ui-002 in ui-003 (20 poti, 28 sider, brez razlik).
- Urejevalnik teme deluje v vseh štirih točkah: barve (značka „priporočeno" `#B48E5A` →
  `#2E6F6A`, besedilo `#1A1A1A` → `#10231F`), pisave (Fraunces/Figtree → Playfair/Inter),
  banner in ponastavitev. Vsebina preživi ponovno nalaganje prek `sessionStorage`
  (`theme-editor-payload`), prazna vsebina jo izbriše.
- Popravki ob QA: naslov se je na dvanajstih podstraneh podvajal (pas + uvod sekcije) in je
  zdaj samo v pasu; postavke cenika so dobile fotografije obravnav namesto slik izdelkov;
  urnik izpiše kategorijo samo, kadar se razlikuje od naslova tabele.
- Znano in namerno: zgrajeni HTML je lupina, vsebina se sestavi v brskalniku. Enako velja za
  ui-001, ui-002 in ui-003 — gre za lastnost skupne osnove, ne te teme.

### Objava demo strani (15. 9. 2026)

Stran je javno dostopna na **https://pzagardedukic.github.io/sitegen-landing-ui-004/**.

Gradnja **ne more** teči v oblaku: projekt se naslanja na `@ptlabTadej/sitegen-landing-core`
z GitHub Packages, kjer GitHub Actions dobi `401` brez poverilnice. Zato gradimo lokalno in
v vejo `gh-pages` potisnemo samo rezultat — nobene poverilnice ni treba shraniti v oblak.

Ponovna objava po spremembi:

```bash
# PowerShell, ker Git Bash osnovno pot pretvori v windowsovsko pot
$env:NEXT_PUBLIC_BASE_PATH = '/sitegen-landing-ui-004'
$env:NEXT_PUBLIC_SITE_URL  = 'https://pzagardedukic.github.io/sitegen-landing-ui-004'
pnpm build
git worktree add <tmp> gh-pages     # obstojeco vejo, ne --orphan
git -C <tmp> rm -rqf .              # git naj pobrise, ne Remove-Item
# vsebina out/ + .nojekyll -> commit -> git push origin gh-pages
```

**Obe spremenljivki sta obvezni.** `NEXT_PUBLIC_SITE_URL` mora vsebovati tudi osnovno pot,
ker zemljevid strani sestavlja naslove kot `${SITE_URL}${pot}`, kjer je pot brez predpone.

Dve pasti, ki ju je odkrila prav nastavitev te spremenljivke (16. 9. 2026) — obe sta se
pokazali šele, ker naslov strani prej ni bil nastavljen in se je pol te kode preskočilo:

- **osnovna pot se je podvojila v slikah za deljenje.** Jedro sliko poda kot
  `imgWithBasePath(...)`, torej pot, ki predpono že nosi, Next pa jo razreši še glede na
  `metadataBase`, ki jo nosi tudi. Izid je bil
  `…/sitegen-landing-ui-004/sitegen-landing-ui-004/images/…` na vsaki strani z lastno sliko
  (najmanj 30 datotek). Popravljeno v `src/core/seo.ts`: ko je naslov strani nastavljen, gre
  pot brez predpone, ker jo prispeva `metadataBase`; brez naslova strani jo pot nosi sama;
- **kanonična povezava se podeduje.** `alternates: { canonical: "/" }` na korenskem sloju je
  pomenil, da je 16 od 46 strani trdilo, da so kopija domače. Napačna kanonična povezava je
  slabša od nobene, ker stran vabi iz indeksa. Odstranjena s korenskega sloja; pravilne, po
  straneh, pridejo s posnetki za SEO.

Pasti, ki so me ujele:

- stran živi pod `/sitegen-landing-ui-004/`, zato gradnja brez `NEXT_PUBLIC_BASE_PATH` da
  izvoz, ki se na Pages ne izriše (vse poti kažejo v koren domene);
- `MSYS_NO_PATHCONV=1` zlomi zaganjalnik `pnpm`, zato gradnja z osnovno potjo spada v
  PowerShell, ne v Git Bash;
- Pages je treba postaviti na `build_type: legacy` z vejo `gh-pages`; ob vklopu prek API-ja
  ostanejo na `workflow` in ne objavijo ničesar;
- ob drugi objavi `checkout --orphan gh-pages` **odpove**, ker veja krajevno že obstaja. Če
  tega ne opaziš, zapis pristane na odklopljeni glavi, potisk pa javi `Everything
up-to-date` — torej uspeh, čeprav ni objavil ničesar. Zato vzemi obstoječo vejo. Da se
  objava ne le zdi uspešna, primerjaj `out/data/meta.json` z objavljenim
  `…/data/meta.json`: dokler se različici razlikujeta, stara stran še vedno živi.

Repozitorij je zaradi brezplačnih Pages **javen**. Demo fotografije so iz predloge Lumiera
in videi so tuje povezave — pred resno objavo jih je treba zamenjati (glej `DEMO-SLIKE.md`).

### Pripombe pregledovalca (16. 9. 2026)

Tri stvari z objavljene demo strani.

**Kartica oglasa je vodila samo prek naslova.** Ovijanje cele kartice v povezavo ni mogoče,
ker vsebuje gumb „Prijavi se", ki je sam povezava na drug naslov. Uporabljen je isti prijem
kot pri kartici dogodka: naslov nosi povezavo in se prek `::after` raztegne čez kartico,
gumb pa je dvignjen nadnjo. Cena je, da se besedila v kartici ne da več označiti z vlečenjem
— enako, kot velja pri dogodkih že od prej.

**Vrtiljaki se lahko premikajo sami.** `Carousel` je dobil `autoPlayMs`, privzeto izklopljen.
Vklopljen je samo tam, kjer se rezine gledajo in ne berejo: predstavitvene fotografije,
mnenja strank, ekipa — po 6 s. Cenik, storitve, dogodki, videi in sorodne postavke ostajajo
ročni, ker bi tam premikanje bralcu odneslo vsebino izpod oči. Premakne se prek iste poti
kot gumba, zato se stanje ne razide; z zadnje rezine skoči na prvo brez animacije, ker je
drsenje nazaj čez vse rezine videti kot previjanje. Ustavi se ob prehodu miške, ob žarišču,
med vlečenjem in v skritem zavihku, **dokončno** pa ob pritisku puščice ali vlečenju — to je
hkrati edini način, da premikanje ustaviš, saj narisane kontrole nimajo gumba za premor.
Strogo branje WCAG 2.2.2 bi tak gumb želelo; to je zavestna izbira, ne spregled.

**Kazalci.** Tema je bila pri tem že urejena — klikljivo je praviloma pravi gumb ali prava
povezava. Popravljeni sta dve mesti (`HoverZoomImage` je roko kazal tudi brez klika, ovoj
spustnega menija je ni imel), sled vrtiljaka pa je dobila `grab`/`grabbing`, ker se vleče in
ne klika.

Past, ki me je ujela pri preverjanju: **brezglavi Edge privzeto zahteva zmanjšano gibanje**
(`prefers-reduced-motion: reduce`). Vrtiljaki zato mirujejo iz pravega razloga in meritev ne
pove ničesar, dokler željo izrecno ne nastaviš prek `Emulation.setEmulatedMedia`.

### 5 — popravki po QA (načrt, 15. 9. 2026)

Štiri odprte točke iz faze 4. Vrstni red je namenoma tak: najprej tisto, kar je dokazljivo
narobe, nato tisto, kar je stvar okusa, na koncu tisto, česar v tem repozitoriju ni mogoče
rešiti.

**5.1 Zemljevid na kontaktu — higiena naslova in dostopnost, ne vzrok sive ploskve**

`CustomMap` sestavi naslov kot `formatGoogleMapsUrl(url) + "&hl=" + lang`. Jedro vrne
`https://www.google.com/maps?q=…&output=embed`, `lang` pa je v tem projektu **velika črka**
(`SL`, `EN`) in je lahko tudi `null`, zato je šlo ven `hl=SL` oziroma celo `hl=null`.

**Popravek prve domneve (15. 9. 2026):** sprva sem to razglasila za pravo napako in vzrok
sive ploskve. Preverila sem z zahtevki in to **ne drži** — Google na vse štiri oblike
(`brez`, `hl=sl`, `hl=SL`, `hl=null`) odgovori z istim `301` na isti vdelani naslov, torej
parameter na tej stopnji preprosto ignorira. Sprememba ostane kot higiena (v naslovu ni
dobesednega `null`, koda jezika je mala, kot piše v Googlovi dokumentaciji) in kot
dostopnost (ime okvirja je prevedeno namesto trdo zapisanega angleškega „Location Map").
Vzrok sive ploskve v brezglavem Edgeu ostaja Googlova stran s privolitvijo in ga v kodi ni
mogoče odpraviti; potrebna je tvoja potrditev v pravem brskalniku.

- Popravek: jezik pretvorim v male črke in ga izpustim, kadar ga ni.
- Naslov okvirja je trdo zapisan angleški `"Location Map"` — zamenjam ga s prevodom.
- Datoteka: `src/page-content/components/section/contact/CustomMap.tsx`.
- Preverim: sestavljeni naslov z zahtevkom (pričakujem 200 oziroma preusmeritev na Google),
  zajem `/kontakt/` in ročna potrditev v pravem brskalniku — sivega okvirja v brezglavem
  Edgeu ne morem odpraviti, ker gre za Googlovo stran s privolitvijo.

**5.2 Prazen prostor na vrhu podstrani**

Ko je naslov izpadel iz sekcij, se vsebina začne 120 px pod pasom (privzeti rob sekcije)
plus 24–40 px zaobljenega roba pasu.

- Popravek: `Section` dobi neobvezen `paddingTop`; podstrani, ki se odprejo pod pasom,
  uporabijo skupno vrednost `{ xs: 40, sm: 56, md: 72 }` — približno 60 % sedanjega.
- Datoteke: `src/components/section/Section.tsx`, nova konstanta ob `headerMetrics.ts`,
  in ovoji strani v `src/page-content/pages/*` (18 datotek, mehanska sprememba).
- Preverim: zajem prej/potem pri 1440 in 390 na štirih straneh, nato `pnpm build`.

**5.3 Demo videi**

Zdaj so trije nadomestni YouTube posnetki (Google I/O, testni posnetek, „Me at the zoo").

- Popravek: zamenjam jih s posnetki, ki ustrezajo salonu. Vezan sem na YouTube ali Vimeo,
  ker jedro sličico izpelje iz njunih ID-jev; karkoli drugega ostane brez sličice.
- Vsak kandidat preverim: `img.youtube.com/vi/<id>/hqdefault.jpg` mora vrniti 200 in
  posnetek mora biti javen.
- Datoteki: `website.json`, `DEMO-SLIKE.md` (pripis, da gre za tuje povezave).

**5.4 Temne različice sekcij — ni rešljivo v tej temi**

Figma ima temne okvirje za sekcije 18–23. Preveril sem celotno pot podatkov:

- `getThemeSettings()` v jedru vrača samo `colors` (primary, secondary, text), `fonts` in
  `images.banner`; polja za ozadje ali način ni.
- Objavljalnik izvajalnih podatkov sicer prepiše celoten `website.json`, torej bi izmišljeno
  polje tja prišlo — a tema sme brati podatke izključno prek `src/core/*`, kar preverja
  `pnpm check:boundary`, in jedro takega polja ne izpostavi.

Zato temnega načina ni mogoče krmiliti iz podatkov, ne da bi se spremenilo jedro.

**Izid faze 5 (15. 9. 2026)**

- 5.1 zemljevid: jezikovna koda gre ven z malimi črkami in samo, kadar obstaja; ime okvirja
  je prevedeno. Prvotna domneva, da je bil `hl=SL` vzrok sive ploskve, je **ovržena** —
  Google na vse oblike odgovori enako.
- 5.2 zgornji rob: prva sekcija za naslovnim pasom ima **56 / 72 / 88** namesto polnih
  72 / 96 / 120, urejeno z enim pravilom v `Section` namesto z osemnajstimi popravki po
  ovojih strani. Prvi poskus (40 / 56 / 72) je bil pretesen — Petra je opazila na telefonu:
  pri katalogih se je prva tanka črta začela ~50 pod zaobljenim robom pasu in se brala kot
  podaljšek pasu, strani, ki se odprejo z eno vrstico besedila (storitve, blog), pa so
  izpadle neusidrane. Potrjeno na telefonu 15. 9. 2026.
- 5.3 videi: štirje pregledani posnetki namesto nadomestkov. Merila in razlogi za zavrnitve
  so v `DEMO-SLIKE.md`, skupaj z dvema pastema (pokončni Shorts, presoja po naslovu).
- 5.4 temni način: zaprto, ne spada v to temo.
- Preveritev po popravkih: `pnpm verify` čist, `pnpm build` uspe, `pnpm test:variants`
  **12 od 12 preizkusnih strank čistih, 0 težav**.
- Zemljevid **potrjen v pravem brskalniku** (telefon, 15. 9. 2026): izriše se pravilno, z
  značko na naslovu salona in v slovenščini („Odprite v Zemljevidih"), kar potrdi tudi
  popravek jezikovne kode. Siva ploskev je bila omejitev brezglavega Edgea, ne napaka —
  tam se namesto zemljevida pokaže Googlova stran s privolitvijo.
- S tem ni odprtih točk več.

**Odločeno (15. 9. 2026): temni način ne spada v to temo.** Temni okvirji v Figmi ostanejo
neuporabljeni; stikala ob gradnji ne uvajamo, ker bi bila funkcija, ki je stranka ne more
vklopiti sama. Če bo temni način kdaj potreben, se začne s poljem v shemi teme (jedro,
ptlabTadej), ne v posamezni temi.
