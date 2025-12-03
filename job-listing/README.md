# Job Listing Application (Next.js + Tailwind CSS)

## 📌 Overview

This project is a **Job Listing Dashboard** built with **Next.js App Router** and **Tailwind CSS**.  
It is developed and maintained by **Abdi Debela**.

The application lets users:
- Browse a list of job opportunities.
- View key information at a glance (title, company, location, categories, work nature).
- Open a **detailed job page** with responsibilities, ideal candidate profile, dates, and required skills.

All job data is loaded from a local JSON file (`app/db/jobData.json`), making the app easy to extend.

## 🧠 Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript / React
- **Styling**: Tailwind CSS + custom utility classes
- **Icons**: Font Awesome (for job details and metadata icons)
- **Data**: Local JSON file (`jobData.json`)

## 🧩 Project Structure (high level)

- `app/page.tsx` – Home page that lists all job postings using the `JobCard` component.
- `app/[jobIndex]/page.tsx` – Dynamic route for individual job details (`/0`, `/1`, ...).
- `app/components/JobCard.tsx` – Reusable card component for each job in the list.
- `app/db/jobData.json` – Static job data (title, company, description, categories, skills, etc.).
- `app/assets/*` – Logos for different job types used in the job cards.
- `app/global.css` – Tailwind setup and global styles.
- `app/not-found.tsx` – Custom 404 page for invalid job URLs.

## 🚀 Getting Started (Run Locally)

1. **Install dependencies**

```bash
npm install
```

2. **Run the development server**

```bash
npm run dev
```

3. **Open the app**

- Visit `http://localhost:3000/` to see the **job listing dashboard**.
- Click a job title (card) to open its **detail page**.

## ✨ Main Features

- **Job listing page**
  - Displays all jobs from `jobData.json`.
  - Each job card shows: title, company, location, work nature, and categories with colors.
  - Basic “Sort by” dropdown (UI ready – logic can be added later).

- **Job detail page**
  - Route: `/{jobIndex}` (for example `/0`, `/1`, ...).
  - Shows:
    - Full description
    - Responsibilities (with check icons)
    - Ideal candidate (age, gender, traits)
    - When & where section
    - About section (posted date, deadline, location, start/end dates)
    - Categories and required skills as badges
  - Handles **invalid indices** using Next.js `notFound()` and displays the custom 404 page.

- **Logos from assets**
  - Each job card uses a logo from `app/assets` (e.g. `socialmedia.png`, `web.avif`, etc.).
  - The correct image path is resolved via imports in `app/page.tsx`.

## 🎯 Learning Goals

This project was built to practice:
- Building **reusable components** with Next.js and React.
- Using **Next.js App Router** with dynamic routes and a custom `not-found` page.
- Styling a real-world UI using **Tailwind CSS** and utility classes.
- Loading and mapping **static JSON data** into components.
- Organizing a small but realistic **frontend project structure**.

## 🖼 Screenshots

> Replace these with your own screenshots or keep them for reference.

- **Home Page**
  - `image.png`
  - `image-1.png`
  - `image-2.png`

- **Job Detail Page**
  - `image-3.png`
