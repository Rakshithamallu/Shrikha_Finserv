# Shrikha Finserv — Official Website & Advisory Platform

A modern, responsive, trustworthy financial services web application built for **Shrikha Finserv**, established in 2026 and located in Saraswathipuram, Mysore, Karnataka, India.

---

## 🏛️ Company Information (Verified)

- **Company Name:** Shrikha Finserv
- **Established:** 2026
- **Registered Address:**  
  MIG 12, Block No. 9, WeCreate Space,  
  Vishwamanava Double Road,  
  Saraswathipuram, Mysore – 570009, Karnataka, India.
- **Telephone:** [+91 8792953082](tel:8792953082)
- **Official Email:** [shrikhafinserv@gmail.com](mailto:shrikhafinserv@gmail.com)
- **Business Hours:** 9:00 AM – 7:00 PM (Monday through Saturday, IST)

---

## 🚀 Technology Stack

- **Frontend:** React.js 18 (ES6+, JSX)
- **Build System:** Webpack 5 + Babel (Built *without* Vite, as strictly required)
- **Styling:** Vanilla CSS3 with CSS Variables (`variables.css`, `animations.css`, `components.css`, `global.css`)
- **Icons:** [Lucide React](https://lucide.dev)
- **Backend API:** Node.js & Express.js (`/api/enquiries` endpoint with in-memory rate limiting and validation)
- **Database:** None (Clean client & ephemeral demo validation mode, no credentials exposed)

---

## 📁 Project Architecture

```
Shrikha_Finserv/
├── public/
│   ├── assets/
│   │   ├── logo.svg              # Brand vector logo (Deep Navy & Gold)
│   │   ├── logo-white.svg        # White vector logo for dark backgrounds
│   │   └── images/
│   │       ├── hero-consultation.jpg  # Indian financial advisory consultation
│   │       └── about-guidance.jpg     # Karnataka business guidance photo
│   ├── favicon.ico
│   ├── favicon.svg
│   └── index.html                # SEO title, Open Graph tags & Google Fonts
├── src/
│   ├── components/
│   │   ├── AnnouncementBar.jsx   # Section A: Slim top bar with hours & call link
│   │   ├── Navbar.jsx            # Section B: Sticky navigation & mobile drawer
│   │   ├── Hero.jsx              # Section C: Hero with headline, badges, dual CTAs
│   │   ├── TrustHighlights.jsx   # Section D: 4 service coverage pillars
│   │   ├── About.jsx             # Section E: Story, Mysore presence, inclusive scope
│   │   ├── Services.jsx          # Section F & G: 10 service cards & dynamic explorer
│   │   ├── WhyChooseUs.jsx       # Section H: 6 transparent advisory principles
│   │   ├── HowItWorks.jsx        # Section I: 4-step clear process timeline
│   │   ├── CTASection.jsx        # Section J: Navy & gold call-to-action banner
│   │   ├── FAQ.jsx               # Section K: Accessible accordion (8 questions)
│   │   ├── ContactForm.jsx       # Section L: Validated enquiry form & demo banner
│   │   ├── Location.jsx          # Section M: Saraswathipuram office & Google Map
│   │   ├── LegalModal.jsx        # Privacy Policy & Terms/Disclaimer modal
│   │   └── Footer.jsx            # Section N: Multi-column footer & compliance text
│   ├── data/
│   │   ├── services.js           # Official service definitions & descriptions
│   │   └── faqs.js               # Compliant FAQs and verified information
│   ├── hooks/
│   │   └── useScrollSpy.js       # Active navigation scrollspy hook
│   ├── styles/
│   │   ├── variables.css         # Brand color palette, shadows, spacing tokens
│   │   ├── animations.css        # Smooth entrance animations & reduced-motion
│   │   ├── components.css        # Modular styles for every section
│   │   └── global.css            # CSS reset, typography, buttons, form controls
│   ├── App.jsx                   # Main layout container
│   └── index.js                  # React 18 createRoot entry point
├── server/
│   ├── routes/
│   │   └── enquiries.js          # POST /api/enquiries with Indian phone validation
│   └── server.js                 # Express server with CORS & static build support
├── webpack.config.js             # Webpack 5 development & production setup
├── .babelrc                      # Babel presets for modern React JSX
├── .env.example                  # Environment configuration template
├── package.json
└── README.md
```

---

## 🎨 Brand Design Identity

- **Deep Navy Blue:** `#10233F` (Primary brand identity)
- **Royal Blue:** `#1E4D8C` (Secondary accents & focus states)
- **Refined Gold:** `#D6AD60` (Highlight badges & CTA buttons)
- **White:** `#FFFFFF` (Clarity and crisp contrast)
- **Soft Background:** `#F5F7FB`
- **Dark Text:** `#202B3C`
- **Muted Text:** `#68758A`
- **Light Borders:** `#E3E8F0`

---

## 🛠️ Installation & Running Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Both Frontend & Backend Concurrently
```bash
npm run dev
```
- **Frontend Webpack Server:** [http://localhost:3000](http://localhost:3000)
- **Backend Express Server:** [http://localhost:5000](http://localhost:5000) (Proxied automatically via Webpack `/api`)

### 3. Alternative Individual Commands
```bash
# Start frontend only (Webpack dev server on port 3000)
npm run start

# Start backend only (Express API server on port 5000)
npm run server

# Build production bundle into /dist
npm run build
```

---

## 🛡️ Form Submission & Demo Mode Handling

In accordance with strict compliance and transparency rules:
1. **Interactive Demo Mode:** Form submissions are validated client-side and verified via `/api/enquiries`.
2. **Honest Alert Banner:** Rather than displaying a false "Email Sent" notice, the UI informs the user that the submission operates in Demo Mode and presents direct click-to-call (`tel:8792953082`) and email (`mailto:shrikhafinserv@gmail.com`) links.
3. **Connecting a Live Email Service Later:**
   To connect an automated transactional email provider (such as Nodemailer with SendGrid, Amazon SES, or Gmail SMTP):
   - Set the variables in `.env` based on `.env.example`:
     ```env
     PORT=5000
     SMTP_HOST=smtp.example.com
     SMTP_PORT=587
     SMTP_USER=your_user
     SMTP_PASS=your_password
     NOTIFICATION_RECIPIENT=shrikhafinserv@gmail.com
     ```
   - In `server/routes/enquiries.js`, uncomment the Nodemailer transport block.

---

## 🖼️ Replacing Logo & Images

1. **Logo:** Replace `public/assets/logo.svg` or `public/assets/logo-white.svg` with your SVG or PNG file.
2. **Hero Image:** Replace `public/assets/images/hero-consultation.jpg`.
3. **About Image:** Replace `public/assets/images/about-guidance.jpg`.
