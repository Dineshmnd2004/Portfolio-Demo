# Portfolio website

A fast, animated, single-page developer portfolio with dark/light mode.
**No build step, no installs, no frameworks.**

## Tech stack
| Layer | Used |
|---|---|
| Structure | HTML5 (semantic sections) |
| Styling | CSS3 - custom properties (theme), Grid, Flexbox, `@property` animated borders, `color-mix()`, `backdrop-filter` |
| Behaviour | Vanilla JavaScript (ES5/ES6): IntersectionObserver (scroll reveal), Web Animations API (confetti), Pointer Events (tilt, magnetic buttons, hover) |
| Icons | Hand-written inline SVG (`js/icons.js`) - no icon library |
| Fonts | System font stack (Inter if installed) - nothing to download |
| Hosting | Any static host: Vercel, Netlify, GitHub Pages, Cloudflare Pages |

## Folder structure
```
portfolio-project/
├── index.html        page layout + section headings + navbar links
├── css/style.css     colours, fonts, spacing, all animations
└── js/
    ├── data.js       ★ YOUR CONTENT - edit this for almost everything
    ├── icons.js      skill/social logos (add new ones here)
    └── main.js       builds each section from data.js + animations
```

## Which file changes which section
| I want to change... | Edit |
|---|---|
| Name, logo text, typing roles, intro text | `js/data.js` -> `name`, `logo`, `roles`, `intro` |
| Gmail address / email subject | `js/data.js` -> `email`, `mailSubject` |
| GitHub / LinkedIn icons | `js/data.js` -> `social` |
| Scrolling logo band | `js/data.js` -> `marquee` |
| About text and the 4 counters | `js/data.js` -> `about` |
| Skills (6 boxes) | `js/data.js` -> `skills` |
| A logo for a new skill | `js/icons.js` (add one line to the `I = {...}` list) |
| Projects (Live / GitHub links) | `js/data.js` -> `projects` |
| Achievements | `js/data.js` -> `achievements` |
| Coding profiles (LeetCode etc.) | `js/data.js` -> `coding` |
| Experience timeline | `js/data.js` -> `experience` |
| Footer text | `js/data.js` -> `footer` |
| Section titles, navbar links, add/remove a section | `index.html` |
| Colours (both modes) | `css/style.css` -> the two blocks at the very top (`:root` and `:root[data-theme="light"]`) |
| Animation speeds / styles | `css/style.css` |

## Run it
Double-click `index.html`, or run a local server: `npx serve .`

## Deploy
Drag the whole folder onto Netlify Drop, or `vercel` from this folder, or push to GitHub and enable Pages.
