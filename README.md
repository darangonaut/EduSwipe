# EduSwipe

Vzdělávací PWA pro děti, která využívá návykový formát **vertikálního swipování** (jako TikTok) na konzumaci učební látky rozdělené do mikro-karet. Mix faktů a krátkých kvízů, čeština, funguje offline.

## ✨ Funkce

- **Více kurzů** (Vesmír, Zvířata, Příroda a tělo, Matematika) – domovská obrazovka s výběrem, rekordem a odznakem dokončení u každého
- **Vertikální swipe feed** mezi kartami (dotyk, kolečko myši, klávesy ↑/↓)
- **Dva typy karet** – fakt (text + emoji, čtení nahlas) a kvíz (A/B/C volba s okamžitou zpětnou vazbou a vysvětlením)
- **Ovládání kvízu klávesami** 1–3 (na aktivní kartě)
- **Zvuková + haptická odezva** na odpověď
- **Zámek postupu** – na nezodpovězeném kvízu se nedá pokračovat dál
- **Skóre, rekord a statistiky** napříč kurzy (uložené v `localStorage`, per kurz); reset pokroku z domovské obrazovky
- **Uložený pokrok** – odpovědi přežijí reload; *Zkusit znovu* zamíchá pořadí
- **Závěrečná karta** s rozpisem výsledku, konfetami a restartem
- **PWA** – instalovatelná na plochu, offline přes service worker
- **Robustnost a přístupnost** – error boundary, ovládání klávesnicí, ARIA, respekt k `prefers-reduced-motion`

## 🚀 Spuštění

```bash
npm install
npm run dev      # vývojový server (Vite)
npm run build    # produkční build do dist/
npm run preview  # náhled buildu
npm run lint     # ESLint
```

## 🧱 Tech stack

| Vrstva | Technologie |
| --- | --- |
| Framework | React 19 + Vite 7 |
| Styling | Tailwind CSS v4 |
| Swipe | Swiper.js (Mousewheel + Keyboard) |
| Offline | vite-plugin-pwa (Workbox) |
| Data | statický `src/data/lessons.json` |

## 📇 Formát dat (`src/data/courses.json`)

Pole **kurzů**; každý kurz má metadata a pole karet (`lessons`).

```json
{
  "id": "vesmir",
  "title": "Vesmír",
  "emoji": "🪐",
  "color": "#5352ed",
  "lessons": [ /* karty níže */ ]
}
```

Každá karta v `lessons` je fakt nebo kvíz:

**Fakt:**

```json
{
  "id": "c1",
  "type": "fact",
  "topic": "Vesmír",
  "title": "Vesmír",
  "content": "Slunce tvoří 99,8 % hmotnosti sluneční soustavy.",
  "emoji": "☀️",
  "color": "#ff4757"
}
```

**Kvíz:**

```json
{
  "id": "c2",
  "type": "quiz",
  "topic": "Vesmír",
  "question": "Je Pluto považováno za planetu?",
  "options": ["Ano", "Ne"],
  "answer": 1,
  "explanation": "Pluto bylo v roce 2006 přeřazeno mezi trpasličí planety.",
  "emoji": "🪐",
  "color": "#5352ed"
}
```

| Pole | Typ | Platí pro | Popis |
| --- | --- | --- | --- |
| `id` | string | obě | Unikátní klíč karty |
| `type` | `"fact"` \| `"quiz"` | obě | Typ karty |
| `topic` | string | obě | Štítek kategorie (Vesmír, Tělo, Příroda, …) |
| `emoji` | string | obě | Vizuální kotva karty |
| `color` | string (hex) | obě | Barva pozadí karty |
| `title`, `content` | string | fact | Nadpis a text |
| `image` | string (URL) | fact | Volitelný obrázek místo emoji |
| `question`, `options`, `answer`, `explanation` | – | quiz | Otázka, volby, index správné odpovědi, vysvětlení |

## 🧩 Komponenty

- `App.jsx` – přepíná mezi domovskou obrazovkou a kurzem
- `Home.jsx` – výběr kurzu (s nejlepším skóre u každého)
- `Course.jsx` – feed jednoho kurzu: Swiper, skóre/pokrok, zámek, perzistence (per kurz)
- `CardRenderer.jsx` – rozhodne mezi `InfoCard` a `QuizCard`
- `InfoCard.jsx` – textová/obrázková karta (čtení nahlas)
- `QuizCard.jsx` – interaktivní kvíz (klávesy, zvuk, haptika)
- `ProgressBar.jsx` – indikátor postupu + skóre + zpět/restart
- `ResultCard.jsx` – závěrečné shrnutí a restart
- `ErrorBoundary.jsx` – záchytná obrazovka při chybě

## 🔮 Možná rozšíření

Text-to-speech předčítání, video pozadí, kategorie/filtry, admin formulář na tvorbu lekcí, gamifikace (odznaky, série).

## 📄 Licence

MIT
