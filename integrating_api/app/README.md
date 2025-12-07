# 🎯 Opportunities App

Fetch and display opportunities from an API in a card-based UI.

## ✨ Features

- 🔄 Fetch opportunities from `https://akil-backend.onrender.com/opportunities/search`
- 🎴 Display each opportunity in a card (title, description, etc.)
- ⚠️ Handle API errors gracefully

## 📦 Installation

```bash
git clone https://github.com/yourusername/opportunities-app.git
cd opportunities-app
npm install
npm start
```

## 🚀 Usage

- 📊 Data loads automatically from the API.
- 💼 Each card shows relevant opportunity details.
- ❌ Errors are displayed if API requests fail.

## 📸 Screenshots

### ⏳ Loading

![Loading](loading.png)

### 🏠 Home

![Home Page](image.png)

![Home Page View 1](image-1.png)

![Home Page View 2](image-2.png)

### ⚠️ Error

![Error Page](image-3.png)

## 🛠 Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Redux Toolkit Query (RTK Query)** - Data fetching and caching
- **Axios** - HTTP client for API requests

## 🔌 API Integration

This application integrates with the **Akil Backend API**:

- **Base URL**: `https://akil-backend.onrender.com/`
- **Endpoints**:
  - `GET /opportunities/search` - Fetches all available opportunities
  - `GET /opportunities/:id` - Fetches a specific opportunity by ID

## 📚 Project Structure

```
app/
├── components/
│   ├── Header.tsx          # Header with opportunities count
│   ├── JobCard.tsx         # Reusable job card component
│   └── Loading.tsx         # Loading state component
├── job/
│   └── [id]/
│       └── page.tsx        # Job detail page
├── service/
│   └── data.ts             # RTK Query API configuration
└── page.tsx                # Home page with job listings
```
