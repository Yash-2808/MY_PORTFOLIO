# 🚀 Yash Srivastava — Personal Portfolio Website

<div align="center">

<img src="images/Screenshot 2026-05-31 143753.png" alt="Portfolio Preview" />

**A premium, fully responsive personal portfolio website featuring glassmorphic UI, interactive 3D backgrounds, AI-powered chat assistant, and smooth page transitions.**

[![GitHub](https://img.shields.io/badge/GitHub-Yash--2808-181717?style=for-the-badge&logo=github)](https://github.com/Yash-2808)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Yash%20Srivastava-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/yash-srivastava-20b710291)
[![Instagram](https://img.shields.io/badge/Instagram-@yash__srivastavaa-E4405F?style=for-the-badge&logo=instagram)](https://www.instagram.com/yash_srivastavaa)

</div>

---

## ✨ Features

### 🎨 Premium Dark Theme & Glassmorphic UI
- Stunning dark-mode design with frosted glass card effects
- Curated color palette with gold accent highlights (`#ffb400`)
- Modern typography using **Poppins** and **Outfit** Google Fonts
- Consistent visual language across all pages

### 🌌 Interactive 3D Animated Backgrounds
- Real-time **Vanta.js HALO** effect rendered with Three.js
- Mouse-reactive particle animations that respond to cursor movement
- GPU-accelerated rendering for smooth 60fps performance

### 🤖 AI-Powered Chat Assistant
- Intelligent glassmorphic chat widget accessible from every page
- Natural language processing engine for intent detection
- Contextual conversation memory and follow-up understanding
- Auto-navigation: the assistant can redirect users to specific sections
- Dynamic suggestion chips for guided exploration
- Covers: projects, skills, education, experience, achievements, contact info, and resume download

### 🎭 Dynamic Interactive Favicon
- Custom canvas-rendered circular profile badge
- **Mouse-tracking parallax** — the favicon tilts toward your cursor in real-time
- **Tab visibility detection**: displays a pulsing 💻 emoji when active, 💤 when backgrounded
- 3D glossy lighting effects with animated glow ring

### ⚡ Smooth Page Transitions
- Custom preloader with animated rings and progress bar
- Seamless navigation transitions with fade effects
- Navigation link interceptors for polished loading experience

### 📱 Fully Responsive Design
- Mobile-first responsive layouts across all breakpoints
- Touch-optimized interactions for mobile devices
- Adaptive navigation with hamburger menu

### 📧 Serverless Contact Form
- Powered by **FormSubmit.co** — no backend server required
- Spam protection with honeypot fields
- Auto-reply confirmation emails
- Direct delivery to inbox

---

## 📁 Project Structure

```
without-wrapper/
├── index.html              # Home page — hero, about, skills showcase
├── resume.html             # Resume — experience timeline, education, skills bars
├── projects.html           # Projects — filterable project cards with modal popups
├── blog.html               # Blog — article grid with category cards
├── contact.html            # Contact — form + social links
├── onepage.html            # Single-page variant
│
├── css/
│   └── main.css            # Master stylesheet with all design tokens
│
├── js/
│   ├── main.js             # Core site logic, preloader, favicon, scroll animations
│   ├── ai-assistant.js     # AI chat widget — NLP engine + glassmorphic UI
│   ├── plugins.js          # Third-party plugin integrations
│   ├── jquery.js           # jQuery library
│   └── map.js              # Google Maps integration
│
├── blogs/                  # Individual blog article pages
│   ├── blog-ai.html
│   ├── blog-ml.html
│   ├── blog-dl.html
│   ├── blog-cv.html
│   ├── blog-nlp.html
│   └── blog-robotics.html
│
├── projects/               # Individual project detail pages
│   ├── work-1.html ... work-9.html
│
├── images/                 # All image assets
│   ├── profile-pic.jpg
│   ├── portfolio-website.png
│   ├── plant-disease.png
│   ├── chemical-visualizer.png
│   └── works/
│
├── assets/
│   └── resume.pdf          # Downloadable resume PDF
│
├── icon-fonts/             # Font Awesome & Flaticon icon sets
└── favicon.ico             # Fallback favicon
```

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Core** | HTML5, CSS3, JavaScript (ES6+) |
| **Fonts** | Google Fonts (Poppins, Outfit) |
| **Icons** | Font Awesome 6, Flaticon |
| **3D Background** | Vanta.js + Three.js |
| **Animations** | GSAP, CSS Keyframes |
| **Forms** | FormSubmit.co (serverless) |
| **Maps** | Google Maps API |
| **jQuery** | DOM manipulation & plugins |

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, Safari)
- A local HTTP server (required for proper module loading)

### Run Locally

```bash
# Clone the repository
git clone https://github.com/Yash-2808/MY_PORTFOLIO.git

# Navigate to the project directory
cd MY_PORTFOLIO/main_files/main_files/without-wrapper

# Start a local server (choose one):

# Option 1: Python
python -m http.server 8080

# Option 2: Node.js (http-server)
npx http-server -p 8080

# Option 3: VS Code Live Server Extension
# Right-click index.html → "Open with Live Server"
```

Then open **http://localhost:8080** in your browser.

---

## 📄 Pages Overview

| Page | Description |
|------|-------------|
| **Home** | Hero section with animated typing, profile info, skills showcase, and featured projects |
| **Resume** | Interactive timeline with work experience, education, certifications, and downloadable PDF |
| **Projects** | Filterable project grid (Machine Learning / Web Development) with modal detail popups |
| **Blog** | Technical articles covering AI, ML, Deep Learning, Computer Vision, NLP, and Robotics |
| **Contact** | Professional contact form with social media links and embedded map |

---

## 🤖 AI Assistant Commands

The chat assistant understands natural language queries including:

- `"Who is Yash?"` — Full introduction and background
- `"What skills do you have?"` — Complete technical stack breakdown
- `"Tell me about Driver Distraction AI"` — Detailed project deep-dive
- `"Show your projects"` — Lists all projects with navigation
- `"Download resume"` — Instant PDF download link
- `"How can I contact you?"` — All contact channels (Email, WhatsApp, GitHub, LinkedIn, Instagram)
- `"Navigate to resume"` — Auto-redirects to the Resume page

---

## 📬 Contact

- **Email**: [yashshri682@gmail.com](mailto:yashshri682@gmail.com)
- **WhatsApp**: [+91 8791660165](https://wa.me/918791660165)
- **GitHub**: [github.com/Yash-2808](https://github.com/Yash-2808)
- **LinkedIn**: [linkedin.com/in/yash-srivastava-20b710291](https://linkedin.com/in/yash-srivastava-20b710291)
- **Instagram**: [@yash_srivastavaa](https://www.instagram.com/yash_srivastavaa)

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ by Yash Srivastava**

*If you found this helpful, please ⭐ the repository!*

</div>
