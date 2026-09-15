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

**Odprto.** Poskus zamenjave s „primernejšimi" posnetki ni uspel: od pregledanih kandidatov
je bil vsak bodisi vsebinsko neprimeren (razgaljena telesa), je nosil vidno znamko drugega
salona, bodisi je bila sličica glasbenega kanala z velikim angleškim napisom čez sliko.
Sličice posnetka po naslovu ni mogoče presojati — pregledati jo je treba. Na voljo so tri
poti: sekcijo v demu ugasniti (`optionalSections.videos`), pustiti sedanje nadomestke ali
posneti lastne posnetke. Odločitev čaka Petro.

## Pravni dokumenti

`public/documents/{pogoji-sl,terms-en,zasebnost-sl,privacy-en}.pdf` so demo besedila za
Mirna Spa & Beauty, natisnjena iz HTML v PDF z Edgem. V nogi vsakega piše, da gre za
predstavitveni dokument.
