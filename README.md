# Cighra Cendikia — DevOps Engineer Portfolio

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](#)
[![Nginx](https://img.shields.io/badge/Nginx-009639?logo=nginx&logoColor=white)](#)
[![Ubuntu](https://img.shields.io/badge/Ubuntu%2024.04-E95420?logo=ubuntu&logoColor=white)](#)

A fast, dependency-free personal portfolio for a DevOps Engineer. Pure HTML, CSS, and JavaScript — no frameworks, no build step. Dark/light theme, bilingual (English / Indonesian), and a terminal-inspired design.

---

## ✨ Features

- **Zero dependencies** — plain HTML + CSS + vanilla JS, opens straight in any browser
- **Bilingual** — one-click toggle between English and Indonesian (saved in `localStorage`)
- **Dark / light theme** — terminal stays dark; rest of the UI adapts
- **Terminal-themed UI** — typewriter commands, Windows-style terminal cards, cyan glow accents
- **Responsive** — works on desktop and mobile with a hamburger nav
- **Sections** — Hero, About, Skills, Experience, Education, Certifications, Contact
- **Animated** — scroll reveals, floating particles, counting stat cards
- **Local assets** — tech logos served locally, no CDN dependency for icons

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 |
| Styling | CSS3 (custom properties, flex/grid) |
| Behavior | Vanilla JavaScript (ES6+) |
| Fonts | JetBrains Mono, Inter |
| Icons | Font Awesome 6, local SVG logos |
| Hosting | Nginx on Ubuntu 24.04 LTS (VPS) |

## 📁 Project Structure

```
portfolio-cighra/
├── index.html          # Single-page site
├── css/
│   └── styles.css      # All styles (dark + light theme)
├── js/
│   └── script.js       # Language toggle, theme, animations, nav
└── assets/
    └── img/
        ├── profile.jpg
        └── logos/      # Tech stack SVG logos
```

## 🚀 Run Locally

No server needed — just open the file:

```bash
# Option 1: double-click index.html, or
# Option 2: serve it (optional)
python3 -m http.server 8000   # then open http://localhost:8000
```

## ☁️ Deployment

Deployed as static files behind **Nginx** on an **Ubuntu 24.04 LTS** VPS.

```bash
# On the server
sudo apt update && sudo apt install nginx git -y
git clone https://github.com/cigraaa/portfolio-cighra.git /var/www/portfolio
# point an Nginx server block at /var/www/portfolio
```

## 👤 Author

**Cighra Cendikia** — DevOps Engineer · Jakarta, Indonesia

[![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white)](https://github.com/cigraaa)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/cigraaa)
[![Credly](https://img.shields.io/badge/Credly-FF6B00?logo=credly&logoColor=white)](https://www.credly.com/users/cighra-cendikia/badges)
