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
  (najmanj 30 datotek). Takrat popravljeno v `src/core/seo.ts`, tako da je bila ob
  nastavljenem naslovu strani pot brez predpone. **Ta popravek je od posnetkov za SEO naprej
  odstranjen in `seo.ts` je spet tak kot v 001** — slike zdaj sestavi seme, ki samo preveri,
  ali pot predpono že nosi;
- **kanonična povezava se podeduje.** `alternates: { canonical: "/" }` na korenskem sloju je
  pomenil, da je 16 od 46 strani trdilo, da so kopija domače. Napačna kanonična povezava je
  slabša od nobene, ker stran vabi iz indeksa. Takrat odstranjena s korenskega sloja; **od
  posnetkov naprej ima vsaka stran svojo** (46 od 46).

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

### Jedro 1.1.0 in posnetki za SEO (16. 9. 2026)

Tema 001 je dobila oboje prva; tu je isto, prilagojeno naši.

**Jedro 1.1.0 samo po sebi ne izriše nobenega HTML.** Doda le gradnike: sinhrono polnjenje
`initialWebsiteJson`, izvozno pot `./language` (zagon jezika pred prvim izrisom, dogodek
`sitegen:content-ready`) in `sanitizeRichText`. Mehanika posnetkov živi v **temi**. Kljub
zapisu v njegovi lastni dokumentaciji, da 1.1.0 ni objavljena, je v registru na voljo.

**Cevovod.** `prepare:site` poleg podatkov in strani pripravi `.sitegen-meta/manifest.json`
in `src/data/primary-seo.json`; `build` za Nextom z esbuildom sestavi samostojni izrisovalnik
in ga požene — ta v vsako izvoženo datoteko vstavi primarni jezik kot resnično označevanje
ter na novo napiše `sitemap.xml`, `robots.txt` in podatkovne datoteke. Nove odvisnosti:
`@next/env`, `esbuild`, `@emotion/cache`. Zgrajeni sveženj `.sitegen-meta/refresh.cjs` je
**objavljen v gitu**, enako kot v 001 — zavestna izbira, ki pa vsak diff napihne za desetine
tisočev vrstic.

**Tematsko odvisna sta bila samo dva dela.** `scripts/snapshot/fonts.ts` nadomešča
`next/font/google` in mora izvažati **naši** pisavi (Fraunces, Figtree) namesto njunih petih;
preslikava komponent strani se je ujela do zadnjega imena in je prešla dobesedno.

**Metapodatki imajo zdaj en sam vir.** `PrimarySeoHead` jih piše iz semena za vsako pot
posebej, zato so klici `generateMetadata` odstranjeni s petih podstrani, `robots.ts` in
`sitemap.ts` pa berejo isto seme. Dokler sta oba mehanizma tekla hkrati, je na podstraneh
nastal **drugi** `og:image` z naslovom na `localhost`.

Dve pasti, vredni zapisa:

- **`markContentReady()` je edina vez, ki umakne posnetek.** Sproži ga izključno `PageLayout`.
  Brez tega klica bi vsaka stran vsebino pokazala **dvakrat** — posnetek spodaj, aplikacija
  čezenj. V statičnem HTML se to **ne vidi**, ker je posnetek tam pričakovan; ujameš ga samo
  z vprašanjem brskalniku, ali je otok po nalaganju izginil.
- **izvoz je zgrajen za osnovno pot**, zato ga krajevno ni mogoče streči iz korena: sredstva
  vrnejo 404 in stran je videti pokvarjena iz napačnega razloga. Postavi ga v mapo, imenovano
  po osnovni poti, in šele to streži.

Dokazano na objavljeni strani: surov HTML `/zaposlitev/` brez JavaScripta nosi vsebino
oglasov, vsaka stran ima svoj naslov in svojo kanonično povezavo (46 od 46), `og:image` je
en sam in pravilen, `localhost` se v izvozu ne pojavi nikjer, v brskalniku pa je en `main`,
en `h1` in nobene podvojene vsebine.

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

### 6 — testiranje po jedru 1.1.0 (načrt, 17. 9. 2026)

#### Kontekst

Od zadnjega QA (faza 4, 15. 9.) so se v `sitegen-landing-ui-004` zamenjali temelji:

- jedro 1.1.0;
- posnetki za SEO: izvoženi HTML nosi primarni jezik, otok `PrimarySnapshot` se umakne ob `sitegen:content-ready`;
- metapodatki imajo en vir (`PrimarySeoHead`);
- Prettier je preoblikoval skoraj vse datoteke.

Vse to je bilo preverjeno le ozko, predvsem na objavljeni strani za SEO. Cilj je celoten regresijski test: stran mora delovati in izgledati enako kot pred nadgradnjo, novi mehanizem pa ne sme puščati podvojene vsebine, bliskov ali napak ob hidraciji.

Primerjalna točka je `e550fdf`, zadnji commit pred nadgradnjo jedra. Zgradim ga v začasnem worktreeju v scratchpadu.

#### Vrata (pred začetkom)

1. Po potrditvi ta načrt zapišem v `PLAN.md` kot „### 6 — testiranje po jedru 1.1.0“, commitam, potisnem na `main` in **se ustavim**.
2. Preden zaženem kakršenkoli strežnik, vprašam za vrata. Predlog: 3000 za Petrin pregled, testni strežniki pa na lastnih vratih (npr. 3410/3411), da ne trčijo v nič njenega.

#### Koraki

**6.1 Statično (brez brskalnika)**

- `pnpm verify`, `npx prettier --check .` in `pnpm build` brez osnovne poti.
- `pnpm test:export`, ki uporabi `scripts/checkSnapshotExport.ts`. Preveri, da ima vsaka pot `<main>` v posnetku, pravi `lang`, zagonski skript in seme SEO.
- `sitemap.xml` in `robots.txt`: pričakujem 46 poti, nikjer `localhost`, nikjer podvojene predpone.

**6.2 Posnetki v brskalniku** (CDP nad headless Edge, ki že obstaja v `scripts/variants/browser.mjs`)

- **Brez JavaScripta:** vseh 46 poti pokaže berljivo vsebino (slog iz `refresh.css`). Zajem pri 390 in 1440 na 5 značilnih poteh.
- **Z JavaScriptom:** po nalaganju ni več `#sitegen-primary-snapshot`, na strani je en `main` in en `h1`, v konzoli ni napake ob hidraciji (`Hydration`, `did not match`).
- **Prvi izris:** zajem takoj po `DOMContentLoaded` in po 2 s. Iščem podvojeno vsebino in skok postavitve (CLS prek `PerformanceObserver`).
- **Obiskovalec z EN** (`localStorage.site_language = "EN"`): posnetek je slovenski. Preverim, da se ob prvem izrisu ne pokaže SL, da `lang` preide na `en` in kaj naredi `#sitegen-language-recovery`.
- **404** in neobstoječa pot.

**6.3 Regresija pred/po** (`e550fdf` proti `HEAD`, obe gradnji postrežem lokalno)

- Za vseh 46 poti primerjam poti, sidra, povezave in naslove. Pričakovane razlike so samo `<head>` (kanonične povezave, `og:*`).
- Primerjam slike pri 390, 768 in 1440 po hidraciji, s pikselsko razliko prek ffmpeg. Vsako razliko nad pragom obrežem in pogledam.
- Pri 390, 768 in 1440 preverim: brez vodoravnega prelivanja, brez napak v konzoli in neuspelih zahtevkov, stabilno število vozlišč (branje dvakrat v 4 s razmiku, kot v `VALIDATION.md`).

**6.4 Interakcije** (izrecno nastavljen `prefers-reduced-motion: no-preference`)

- Mobilni meni odpri/zapri, spustni meni in preklop jezika SL↔EN na podstrani.
- Vrtiljaki:
  - samodejni se premikajo na 6 s in se ustavijo ob miški ali žarišču, dokončno ob puščici;
  - ročni ostanejo na mestu;
  - z `reduce` vsi mirujejo.
- Obrazci (kontakt, novice): prazno pošiljanje, napačen e-naslov, privolitev.
- FAQ harmonika, filtri dogodkov in bloga, video okno, zemljevid (samo naslov okvirja), klikljive kartice (`elementFromPoint`) in kazalci.
- Urejevalnik teme: `THEME_EDITOR_UPDATE` za barve, pisave in banner, nato ponastavitev. Vsebina mora preživeti ponovno nalaganje.

**6.5 Različice strank**

- `pnpm test:variants`: vseh 12 preizkusnih strank. Pričakujem 12/12 brez težav, kot v fazi 5.

**6.6 Objavljena stran**

- Primerjam `out/data/meta.json` z objavljenim. Ponovim preverbo SEO na Pages: surov HTML, 46/46 kanoničnih povezav, en `og:image`.
- **Ponovne objave ne naredim brez vprašanja**, tudi če jo kak popravek zahteva.

**6.7 Petrin pregled**

- Gradnjo postrežem na `0.0.0.0:3000` (po dovoljenju za vrata) in dam dva naslova: `http://localhost:3000/` za računalnik in `http://<LAN-IP>:3000/` za telefon. Seznam poti za ročni ogled.
- Nato čakam.

#### Ravnanje z najdbami

- Dokazljive napake popravim sproti: en commit na napako, s posnetkom prej/potem, potisk na `main`.
- Stvari okusa in dvomljive primere zberem in vprašam.
- Izid zapišem v `PLAN.md` (6 — izid) in dopolnim `VALIDATION.md`.
- Začasne gradnje, worktree in profile Edgea počistim.

#### Datoteke

- Ob popravkih po potrebi: `src/components/seo/PrimarySnapshot.tsx`, `src/components/layout/PageLayout.tsx` in komponente sekcij.
- Zapisi: `PLAN.md`, `VALIDATION.md`.
- Testni skripti gredo v scratchpad, razen če se izkaže, da je kak vreden trajno (potem v `scripts/`, z vprašanjem).

#### Preverjanje, da je faza končana

- 6.1–6.5 zeleno ali z zapisanimi, pojasnjenimi izjemami.
- Tabela pred/po brez nepojasnjenih razlik.
- Petra potrdi pregled na telefonu.

#### Izid (17. 9. 2026)

Primerjalna točka `e550fdf`, obe gradnji postreženi lokalno; brskalnik Playwright nad Edgeom.

**Trije popravki, vsi potisnjeni na `main`:**

- `ee3b5b3` — **slovenski blisk za angleške obiskovalce.** Pri prenosu posnetkov je izpadel
  blok v `globals.css`, ki posnetek skrije, dokler čaka drugi jezik. Obiskovalec s
  shranjenim EN je na domači strani 0,7–1,6 s bral slovensko. Po popravku v devetih poskusih
  na treh straneh posnetek ni izrisan v nobeni sličici; plošča za ponovni poskus je
  oblikovana v barvah teme.
- `f24c970` — **gradnja za urejevalnik teme je padala** („Missing or duplicate snapshot
  island“), ker `layout.editor.tsx` ni imel otoka. Privzeta gradnja je uspevala, zato se ni
  videlo. Urejevalnik nato preverjen v celoti: barve (22 zlatih mest, 388 besedilnih),
  pisave, banner, ponovno nalaganje, ponastavitev.
- `60330e1` — **naslov pravnega in 404** je bil „Mirna Spa & Beauty | Mirna Spa & Beauty“;
  zdaj „Pogoji in zasebnost | …“ in „404 - Stran ni najdena | …“.
- Ob tem `8b68d50`: preizkusne stranke izpišejo naslov prekinjene zahteve (drugi del #13).

**Rezultati po korakih**

- 6.1: `verify`, Prettier in `build` čisti; `test:export` potrdi 45 posnetkov. Brez
  `NEXT_PUBLIC_SITE_URL` je `sitemap.xml` prazen in kanoničnih povezav ni — pričakovano,
  objavljena gradnja ima oboje.
- 6.2: brez JavaScripta vseh 46 poti pokaže vsebino z enim `h1` in brez prelivanja. Z
  JavaScriptom otok izgine, en `main`, en `h1`, brez napak ob hidraciji, CLS 0 na petih
  vzorčnih straneh, podvojena vsebina v nobeni sličici. 404 ima `noindex`.
- 6.3: 138 primerjav (46 poti × 3 širine) — sidra, povezave, besedilo, prelivanje, napake in
  število vozlišč **enaki**. Namerno drugačni so samo naslovi strani. Razlike v slikah na `/`,
  `/o-nas/` in `/kontakt/` so trakovi v gibanju in slike, ki se v primerjalni gradnji niso
  naložile pravočasno; regresije ni.
- 6.4: 27 od 28 preverjanj — meni, spustni meni, preklop jezika (tudi po ponovnem nalaganju
  in med stranmi), samodejni in ročni vrtiljaki, `reduce`, obrazca, FAQ, filtri dogodkov,
  kazalci, videi, zemljevid. Neuspeli je bil napačen test: blog iskalnika nima.
- 6.5: 9 od 12 strank čistih v celotnem teku; preostale tri so imele samo prekinjene zahteve.
  Ponovitev z naslovi: vse so vdelani Googlov zemljevid na `/kontakt/`.
- 6.6: objavljena stran — 44 od 44 kanoničnih povezav pravilnih, en `og:image`, brez
  `localhost` in podvojene osnovne poti. **Popravki te faze so bili medtem objavljeni**
  (`gh-pages`, `09d0905`): živa stran izpisuje „404 - Stran ni najdena | …" in „Pogoji in
  zasebnost | …", njena različica `1789666914379_555229d296a3` pa se ujema z
  `out/data/meta.json`. Preverjeno 18. 9. 2026.

**Odprto kot issue (na vseh temah, kjer velja)**

- #14 trakovi ne upoštevajo zmanjšanega gibanja (tudi 001#12, 002#4, 003#1)
- #15 angleški `alt` v galeriji (001#14, 002#6, 003#3)
- #16 plošča za ponovni poskus prekrije berljivo stran v primarnem jeziku (001#16)
- #17 galerija v posnetku nima slik (001#17)
- prazne podstrani cenika: že #1 tu, novo 001#13, 002#5, 003#2
- naslov pravnega/404 v 001: 001#15
- za prenos posnetkov v 002 in 003 opisani obe pasti: 002#7, 003#4
