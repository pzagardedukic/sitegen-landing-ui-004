# sitegen-landing-ui-004 — načrt

Svetla tema **Lumiera** (beauty / spa) za sitegen landing. Logika, podatkovni tok, poti in
sidra so enaki kot v `sitegen-landing-ui-002`; na novo so tema, komponente, sekcije in demo
vsebina.

## Vir resnice za dizajn

- Figma: datoteka *Lumiera Template* (`HD2qzS66trb08YEzlolH8T`), mapa *Beauty theme*.
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
  `fixtures/*` prilagojeni novim podatkom.

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

| # | Sekcija | Mapa (kot v 002) | Lumiera vzorec |
|---|---|---|---|
| 1 | hero | `home/` | spa slider, steklen header |
| 2 | naslovni pas | `header/` | banner notranjih strani, zaobljen rob |
| 3 | o nas | `about/` | spa about, steklena kartica, drseča trakova |
| 4 | izkušnje | `why-us/` | why-choose + about-number, certifikati v panelu |
| 5 | stranke | `clients/` | trak logotipov |
| 6 | ekipa | `team/` | team kartice na mint podlagi |
| 7 | storitve | `services/` | Featured Services + kljukice |
| 8 | projekti | `portfolio/` | shop list (mreža), shop single (detajl) |
| 9 | galerija | `gallery/` | instagram, trije stolpci |
| 10 | mnenja | `review/` | review kartice na mint podlagi |
| 11 | blog | `blog/` | From Our Blog, detajl s stransko kartico |
| 12 | cta pas | `call-to-action/` | book-banner |
| 13 | novice | `subscribe/` | newsletter pilula |
| 14 | kontakt | `contact/` | ikone iz Contact, obrazec v kremnem panelu, zemljevid |
| 15 | katalogi | `catalogue/` | vrstice s črtami, pilula za prenos |
| 16 | videi | `video/` | zaobljene sličice, bel gumb predvajaj |
| 17 | cenik | `pricing/` | LIST (pilule-slike), PACKAGES (Beauty Packages), STORE (shop list) |
| 18 | zaposlitev | `careers/` | kartice z zahtevami |
| 19 | FAQ | `faq/` | Lumiera FAQ harmonika |
| 20 | urnik | `schedule/` | tabela z kremno glavo |
| 21 | dogodki | `events/` | kartice + orodna vrstica, detajl |
| 22 | pravno | `legal/` | dokumentni kartici |
| 23 | 404 | `not-found/` | kremna kompozicija na sredini |

### 4 — QA
`pnpm verify`, `pnpm build`, `pnpm test:variants` (vse fixtures), zajem 390 / 768 / 1440 iz
`out/` prek Edge CDP, primerjava poti in sider z ui-002, preverjanje urejevalnika teme
(barve, pisave, banner, ponastavitev).
