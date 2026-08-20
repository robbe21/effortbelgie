# Effort België — website
> Status: levend — publieke repo-README, de plek waar de pagina-lijst en de deploy-uitleg staan.

Statische, **mobile-first** site van effortbelgie.be in een dark cinematic / industrieel jasje
(charcoal/zwart + signal red `#FF2D2D`). Geen build-stap nodig — gewoon HTML, CSS en een beetje JS.

*Laatst bijgewerkt: 2026-08-17*

## Pagina's (25)

| Groep | Bestanden |
|---|---|
| Kern | `index.html` (home) · `team.html` (9 coaches) · `aanbod.html` · `prijzen.html` · `get-started.html` (proefles) · `rooster.html` (lesrooster voor leden) · `leden.html` (ledenmuur) |
| Regio-landingspagina's (7) | `crossfit-kapellen` zit op de home; verder `crossfit-brasschaat/-essen/-gooreind/-kalmthout/-loenhout/-maria-ter-heide/-wuustwezel.html` |
| Gidsen & services (7) | `crossfit-voor-beginners` · `krachttraining-na-je-40` · `terug-beginnen-met-sporten` · `sporten-na-blessure-of-kine` · `hybride-training-kapellen` · `personal-training-kapellen` · `olympic-weightlifting-kapellen` |
| Overig | `welkom.html` (QR-landing) · `coupons.html` · `ticket-druk.html` · `404.html` |

## Lokaal bekijken

```bash
python3 -m http.server 4174   # in deze map
# open http://localhost:4174
```

## Beeld

Team- en ledenfoto's zijn echte foto's (`assets/img/team/`, `assets/img/leden/`); alleen coach
Julie heeft nog een placeholder. De hero is een statisch beeld (`hero-mobile.jpg` /
`hero-desktop.jpg`); sfeerbeelden in `assets/img/`.

## Boekingen

Alle proefles-CTA's wijzen naar `get-started.html`, waar de WodApp-proefleswidget embedded staat.
Leden reserveren lessen via de WodApp-agenda op `rooster.html`.

## SEO

`sitemap.xml`, `robots.txt`, per pagina meta + Open Graph (`assets/img/og.jpg`). JSON-LD met een
centrale `#business`-node (`HealthClub` + `SportsActivityLocation`) op de home, waar alle andere
pagina's via `WebPage → about` aan hangen; `Person`-nodes op team, `Offer`/`ReserveAction` op
get-started, `OfferCatalog` op prijzen en `FAQPage` op de gidsen.

## Deployen

Push naar `main` van `robbe21/effortbelgie` → Netlify deployt automatisch naar effortbelgie.be
(repo-root = publish-dir, geen config nodig). Redirects in `_redirects`, headers in `_headers`.
