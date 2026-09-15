# Popis slik za demo podatke (Mirna Spa & Beauty)

Demo salon **Mirna Spa & Beauty** je izmišljen. Fotografije so zaenkrat iz ThemeForest
predloge *Lumiera* (izvor: Freepik / Unsplash prek predloge) in so začasne — Petra jih bo
zamenjala. Pred objavo zunaj demo okolja jih je treba nadomestiti z licenciranimi.

Vse slike so pripravljene s `scripts/prepareImage.mjs` (webp, 1600 px po daljši stranici,
banner 2800 px, portreti mnenj 800 px, izdelki 900–1200 px). Izvorniki niso v repozitoriju.

| Kje v `website.json` | Datoteke | Vsebina |
|---|---|---|
| `theme.images.banner` | `banner-spa.webp` (tudi `main-banner.webp` kot privzeti) | soba za masažo s svečami |
| `about.items[].image` | `onas-ritual`, `onas-prostor`, `onas-sprejem` | čajni ritual, soba, masaža |
| `team.items[].image` | `ekipa-nika`, `ekipa-eva`, `ekipa-tina`, `ekipa-lara` | portreti v belem na belem ozadju |
| `reviews.items[].image` | `mnenje-01` … `mnenje-04` | obrazni portreti za avatarje |
| `portfolio.items[].images[0]` | `ritual-obraz`, `ritual-kamni`, `ritual-manikura`, `ritual-pedikura`, `ritual-lasje`, `ritual-estetika` | naslovna slika rituala; druga in tretja slika uporabita galerijo |
| `services.items[].image` | `storitev-masaze`, `storitev-obraz`, `storitev-nohti` | masaža, nega obraza, roka z nohti |
| `gallery.items[]` | `galerija-01` … `galerija-12` | mešano pokončno in ležeče |
| `blog.items[].image` | `blog-maska`, `blog-olje`, `blog-sprostitev`, `blog-drenaza`, `blog-sonce` | naslovne slike objav |
| `events.items[].image` | `dogodek-aroma`, `dogodek-nosecnice`, `dogodek-nohti`, `dogodek-odprti-dan`, `dogodek-lasje` | delavnice in večeri |
| `pricing.items[].images[]` | `onas-ritual`, `onas-prostor`, `ritual-kamni`, `ritual-obraz`, `ritual-estetika`, `ritual-manikura`, `ritual-lasje`, `storitev-masaze`, `storitev-obraz`, `storitev-nohti`, `dogodek-nosecnice` | fotografije obravnav; vsaka postavka ima dve, ker ju trgovina uporabi v galeriji |
| `clients.items[].image` | `clients/*.webp` (7) | logotipi izmišljenih znamk iz predloge |
| `experience.items[].image` | `placehold.co` | ploščice CIDESCO, ITEC, NATRUE |

`home.companyLogo.image` je prazen: glava izpiše ime `MIRNA` v pisavi naslovov.

## Katalogi

`public/documents/{mirna-cenik-2026,mirna-darilni-boni,mirna-nega-koze-vodnik}.pdf` so demo
katalogi (cenik storitev, darilni boni in paketi, vodnik za nego kože), prav tako natisnjeni
iz HTML v PDF z Edgem. Prej so vsi trije kazali na tuj testni `dummy.pdf` na spletu.

## Videi

`videos.items[]` so **tuje povezave na YouTube**, ne naš material — jedro iz njihovega ID-ja
izpelje sličico (`img.youtube.com/vi/<id>/hqdefault.jpg`), zato morajo ostati na YouTubu ali
Vimeu. Trenutno so tam nadomestki brez zveze z vsebino (Google I/O, testni posnetek,
„Me at the zoo").

Izbrani so štirje, vsi s kanala **Boscobel ASMR**, po merilih: ženske, čim manj ljudi, brez
tuje znamke v kadru, brez napisov čez sliko in **vodoravno** razmerje. Štirje zato, ker je
mreža dvostolpčna — tri ploščice pustijo drugo vrstico na pol prazno.

| Posnetek | Vir |
|---|---|
| Spa Retreat — nega kože | `youtu.be/_Cby0ZaziJs` |
| Gentle Manicure | `youtu.be/QSVQ9-6G6BY` |
| Nature Spa Day | `youtu.be/tKB8pyoEbl0` |
| Deep Pore Cleansing | `youtu.be/nkLoUBHe8EI` |

Pregledanih je bilo okoli trideset kandidatov na YouTubu in Vimeu; obstalo jih je pet, vzeti
so štirje. Najpogostejši razlogi za zavrnitev: razgaljenost, **vidna tuja znamka** v kadru
(Keldara, Périne, pH Hair × Beauty, Beauty of Joseon, Jo Malone, Laneige), velik napis čez
sliko, moški v glavni vlogi in **pokončni Shorts**, ki v vodoravni ploščici dobijo zamegljena
stranska pasova.

**Past, na katero bo naletel vsak naslednji: pokončni posnetki.** „Natural Beauty Brand
Film" (`vimeo.com/1175759256`) je po vsebini ustrezal, a je posnet pokončno (1296 × 2304).
Vimeo za takega ne ponudi vodoravne sličice — `thumbnail_large` je 640 × 1138, manjši dve
(100 × 75, 200 × 150) pa sta za 600 px široko ploščico neuporabni. V ploščici razmerja 16 : 9
se tak portret obreže po sredini in ostanejo samo usta in brada. Pred izbiro je torej treba
pogledati tudi **razmerje stranic**, ne le vsebino sličice.

Pregledanih je bilo štirinajst kandidatov; dvanajst jih je odpadlo, ker so imeli razgaljena
telesa, vidno znamko **drugega** salona ali kozmetike (Keldara, Périne, pH Hair × Beauty),
velik angleški napis čez sliko (glasbeni kanali, trije še z oglasnim *NO ADS*), moškega v
glavni vlogi ali pa so bili vsebinsko mimo (kratki igrani film, fizioterapevtska klinika,
hotelski bazen, animacijski kolaž).

**Nauk:** posnetka ni mogoče presojati po naslovu — sličico je treba pogledati, ker je prav
ona edino, kar se na strani vidi.

Oba sta še vedno **tuja** posnetka in ju je pred objavo zunaj demo okolja treba zamenjati z
lastnimi. Sekcija je opcijska (`optionalSections.videos`), zato jo je mogoče tudi preprosto
ugasniti.

## Pravni dokumenti

`public/documents/{pogoji-sl,terms-en,zasebnost-sl,privacy-en}.pdf` so demo besedila za
Mirna Spa & Beauty, natisnjena iz HTML v PDF z Edgem. V nogi vsakega piše, da gre za
predstavitveni dokument.
