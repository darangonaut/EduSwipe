# EduSwipe MVP

## 1. Vizia produktu

Vytvorit vzdelavaciu aplikaciu pre deti, ktora vyuziva navykovy format **vertikalneho swipovania** (znamy z TikToku) na konzumaciu ucebnej latky rozdelenej do mikro-davok.

---

## 2. Technicke poziadavky

| Komponent | Technologia |
| --- | --- |
| **Framework** | React (Vite) |
| **Styling** | Tailwind CSS |
| **Animacie/Swipe** | Swiper.js (Effect Creative/Slide) |
| **Offline podpora** | Vite PWA Plugin |
| **Data** | Staticky JSON subor |

---

## 3. Struktura dat (`src/data/lessons.json`)

Kazdy objekt v poli reprezentuje jednu "kartu" vo feede.

```json
[
  {
    "id": "c1",
    "type": "fact",
    "title": "Vesmir",
    "content": "Slnko tvori 99.8% hmotnosti celej nasej slnecnej sustavy.",
    "color": "#ff4757"
  },
  {
    "id": "c2",
    "type": "quiz",
    "question": "Je Pluto momentalne povazovane za planetu?",
    "options": ["Ano", "Nie"],
    "answer": 1,
    "explanation": "Pluto bolo v roku 2006 preradene medzi trpaslicie planety."
  }
]
```

---

## 4. Architektura aplikacie

### Hlavne komponenty

1. **`App.jsx`**: Hlavny kontajner, inicializacia Swiper.js.
2. **`CardRenderer.jsx`**: Logika, ktora rozhodne, ci zobrazit textovu kartu alebo kviz.
3. **`InfoCard.jsx`**: UI pre text a obrazky.
4. **`QuizCard.jsx`**: UI pre interaktivne otazky so spatnou vazbou.
5. **`ProgressBar.jsx`**: Indikator postupu navrchu obrazovky.

### PWA Konfiguracia (`vite.config.js`)

Aplikacia musi obsahovat:

* `manifest.json` s ikonami.
* `service-worker` pre cachovanie JSON dat a assetov.
* Nastavenie `display: standalone` pre pocit nativnej aplikacie.

---

## 5. Implementacny plan (Krok za krokom)

### Krok 1: Inicializacia projektu

```bash
npm create vite@latest eduswipe -- --template react
cd eduswipe
npm install swiper tailwindcss postcss autoprefixer vite-plugin-pwa
npx tailwindcss init -p
```

### Krok 2: Konfiguracia Swiperu (Vertikalny mod)

V hlavnom komponente nastavit Swiper tak, aby simuloval TikTok:

* `direction={'vertical'}`
* `slidesPerView={1}`
* `mousewheel={true}`

### Krok 3: Logika kvizu

* Pri kliknuti na moznost porovnat `index` s `answer` v JSON.
* Zmenit farbu tlacidla (zelena/cervena).
* Povolit swipe na dalsiu kartu az po zodpovedani (volitelne).

---

## 6. MVP Funkcie (Must-Have)

- [ ] Vertikalne swipovanie medzi kartami.
- [ ] Zobrazenie textu a obrazka z JSON.
- [ ] Jednoduchy kviz (A/B volba).
- [ ] Moznost "Instalovat na plochu" (PWA).
- [ ] Responzivita (primarne pre mobilne zariadenia 16:9 a 19.5:9).

---

## 7. Buduce rozsirenia (Post-MVP)

* **Audio:** Automaticke predcitavanie textu (Text-to-Speech).
* **Video:** Podpora pre kratke `.mp4` slucky na pozadi kariet.
* **Gamifikacia:** Zbieranie bodov za spravne odpovede v kvizoch.
* **Admin rozhranie:** Jednoduchy formular na generovanie novych JSON lekcii.

---

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
