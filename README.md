# 🌦️ National Weather Big Data Analytics Platform (NWBDAP)

> **Smart India Hackathon (SIH)** — Real-time weather intelligence, crowdsourced ground-truth observations, INSAT satellite telemetry, interactive GIS mapping, and Google Gemini AI assistance for India.

---

## 📌 Project Overview

The **National Weather Big Data Analytics Platform (NWBDAP)** is a web platform designed to collect, analyze, and visualize meteorological data across India. It correlates real-time crowdsourced ground-truth observations with INSAT-3D/3DR satellite telemetry, Doppler radar feeds, and Automatic Weather Stations (AWS).

The platform features an **Interactive Mapbox GIS Radar**, **Recharts Data Analytics**, **Google OAuth 2.0 Authentication**, a **Dynamic Light/Dark Theme System**, and **Astra AI** — an integrated weather chatbot powered by Google Gemini.

---

## ✨ Key Features

- 🛰️ **INSAT & AWS Telemetry Integration**: Multi-source data ingestion combining satellite feeds, weather APIs, social media indicators, and field observations.
- 👥 **Crowdsourced Ground-Truth Reporting**: Citizen observers can file geo-tagged weather reports with status verification workflows (*Verified*, *Pending*, *Rejected*).
- 🗺️ **Interactive Mapbox GIS Spatial Radar**:
  - Vector cluster points by meteorological event type (*Rainfall*, *Flooding*, *Thunderstorm*, *Heatwave*, *Fog*, *Snowfall*, etc.).
  - Multi-parameter filtering by event type, source reliability, and verification status.
  - Dynamic Mapbox vector style switching (`light-v11` / `dark-v11`).
- 📊 **Big Data Analytics & Visualizations**: Interactive Recharts components displaying real-time event distributions, historical trends, data source breakdowns, and city-level stats.
- 🤖 **Astra AI Assistant (Google Gemini)**:
  - Powered by Google Gemini (`@google/genai`).
  - Provides real-time weather query answers, severe weather disaster safety guidelines (floods, cyclones, heatwaves), and telemetry explanations.
  - Persistent chat history and suggested topic chips.
- 🌗 **Light & Dark Theme Switcher**:
  - Seamless theme toggle button in desktop and mobile navigation.
  - Preference persistence using `localStorage`.
  - Polished slate color hierarchy and light grey scaffold.
- 🔐 **Firebase Authentication & RBAC**:
  - Real Google OAuth 2.0 authentication via Firebase SDK.
  - Read-only **Guest Observer** mode for instant public access.
  - Role-Based Access Control (RBAC) supporting Admin and User portals.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework / Environment** | [React 19](https://react.dev/), [Vite](https://vitejs.dev/) |
| **Styling & UI** | [Tailwind CSS 3](https://tailwindcss.com/), [Lucide React Icons](https://lucide.dev/) |
| **Authentication** | [Firebase SDK v12](https://firebase.google.com/) (Google OAuth 2.0) |
| **AI Assistant** | [Google GenAI SDK `@google/genai`](https://www.npmjs.com/package/@google/genai) (Gemini 2.5 Flash) |
| **GIS Mapping** | [Mapbox GL JS](https://www.mapbox.com/) |
| **Charts** | [Recharts](https://recharts.org/) |
| **Routing** | [React Router v7](https://reactrouter.com/) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18.0.0 or higher
- **npm** v9.0.0 or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mritunjay20253162-code/Weather-Analytics.git
   cd Weather-Analytics
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

```
Weather-Analytics/
├── public/                 # Static assets & SVG icons
├── src/
│   ├── assets/             # Images and logos
│   ├── components/         # Reusable UI components
│   │   ├── AnalyticsCharts.jsx   # Recharts analytics panel
│   │   ├── GeminiChatbot.jsx     # Astra AI Assistant widget
│   │   ├── Navbar.jsx            # State-aware navigation bar & theme toggle
│   │   ├── StatCard.jsx          # Metric cards
│   │   └── WeatherMap.jsx        # Mapbox GIS vector spatial radar
│   ├── config/             # API & environment configuration
│   ├── context/            # React Context providers (AuthContext, ThemeContext)
│   ├── pages/              # Main route pages (UserDashboard, AdminDashboard, Login, Signup)
│   ├── routes/             # Route guards (ProtectedRoute, AdminRoute)
│   ├── services/           # External API services (Firebase, Gemini AI)
│   ├── App.jsx             # Main router & root application wrapper
│   ├── index.css           # Tailwind base directives & Light/Dark theme CSS variables
│   └── main.jsx            # Application entry point
├── .env.example            # Environment variables template
├── tailwind.config.js      # Tailwind configuration with dynamic slate variables
├── vite.config.js          # Vite build configuration
└── package.json            # Dependencies and scripts
```

---

## 🤖 Gemini AI Assistant (Astra)

The platform includes **Astra AI**, a floating weather assistant powered by Google Gemini.

- **Capabilities**: Explains satellite telemetry, answers climate queries, provides severe weather safety steps, and assists users with platform navigation.
- **API Key**: Configured via `VITE_GEMINI_API_KEY` in `.env`.
- **Obtain a key**: Get a free API key at [Google AI Studio](https://aistudio.google.com/app/apikey).

---

## 📄 License & Acknowledgements

Developed for the **Smart India Hackathon (SIH)**.  
Built with ❤️ for National Weather Intelligence in India.
