# A2SV Job Listing App - API Integration (Next.js)

## 📌 Overview

This is a Job Listing Application built with Next.js, TypeScript, and Tailwind CSS that integrates with the Akil Backend API to fetch and display real-time job opportunities. The application demonstrates client-side API integration using Redux Toolkit Query (RTK Query) for efficient data fetching and state management.

**What it does**

- **List jobs**: Displays a collection of job postings fetched from the API with title, company, location, categories, and logo.
- **Job details**: A dedicated job page showing comprehensive information including description, responsibilities, ideal candidate profile, when & where information, and related metadata.
- **Reusable UI**: Components such as `JobCard`, `Header`, and `Loading` with consistent design matching the job-listing project.
- **Error handling**: Graceful error handling with dedicated error pages and loading states.

## 🧠 Technologies Used

- **React 19** - UI library
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Redux Toolkit Query (RTK Query)** - Data fetching and caching library
- **Axios** - HTTP client for API requests
- **Akil Backend API** - RESTful API for job opportunities data

## 📥 Installation & Setup

Follow these steps to run the project locally:

1. Install dependencies
```bash
npm install
```

2. Run the development server
```bash
npm run dev
```

The app will run at:  
👉 http://localhost:3000/

## 🔌 API Integration

This application integrates with the **Akil Backend API** using **RTK Query** for client-side data fetching:

- **Base URL**: `https://akil-backend.onrender.com/`
- **Endpoints Used**:
  - `GET /opportunities/search` - Fetches all available opportunities
  - `GET /opportunities/:id` - Fetches a specific opportunity by ID

### API Features:
- ✅ Client-side data fetching using RTK Query hooks
- ✅ Automatic caching and revalidation
- ✅ Error handling for failed API requests
- ✅ Loading states with custom Loading component
- ✅ Graceful fallback for missing data
- ✅ Data mapping to match component structure
- ✅ Type-safe API responses with TypeScript

### RTK Query Implementation:
- Uses `useGetAllOpportunitiesQuery()` hook for fetching all opportunities
- Uses `useGetOpportunityByIdQuery(id)` hook for fetching individual job details
- Automatic request deduplication and caching
- Built-in loading and error states

## 🎨 Design & Styling

The application follows a consistent design system matching the job-listing project:

- **Color Scheme**: Uses Tailwind's `text-blue-950` for headings
- **Typography**: Consistent font weights and sizes across components
- **Layout**: Responsive design with `max-w-5xl` container for home page
- **Components**: 
  - Job cards with `border-2 rounded-4xl` styling
  - Hover effects with `hover:shadow-2xl transition`
  - Category tags with color-coded mapping
  - SVG icons for consistent iconography

## 📁 Project Structure

```
integrating_api/
├── app/
│   ├── components/
│   │   ├── Header.tsx          # Header with opportunities count and sort
│   │   ├── JobCard.tsx         # Reusable job card component
│   │   └── Loading.tsx         # Loading state component
│   ├── job/
│   │   └── [id]/
│   │       └── page.tsx        # Job detail page
│   ├── service/
│   │   └── data.ts            # RTK Query API configuration
│   ├── lib/
│   │   └── api.ts             # Utility API functions
│   ├── page.tsx               # Home page with job listings
│   └── JobListingInterface.ts # TypeScript interfaces
├── lib/
│   └── store.ts               # Redux store configuration
└── public/
    └── screenshots/           # Application screenshots
```

## 📚 Learning Objectives

This project demonstrates:

- Building reusable components with Next.js
- Using Tailwind CSS for UI design
- **Integrating RESTful APIs with RTK Query**
- **Client-side data fetching and state management**
- **Handling API errors and edge cases**
- **Loading states and user feedback**
- Mapping and transforming API data structures
- Structuring scalable frontend applications using App Router
- Dynamic routing with Next.js
- TypeScript interfaces for type safety

## 🖼 Screenshots

Screenshots are available in the `public/screenshots/` directory:
- `home.png` - Home page with job listings
- `details.png` - Job detail page
- `loading.png` - Loading state
- `error.png` - Error page

## 🚀 Features

### Home Page
- Displays all opportunities fetched from the API
- Shows company logos (with fallback for missing images)
- Color-coded category tags
- Responsive card layout with hover effects
- Header showing total number of results
- Sort dropdown (UI ready for future implementation)
- Error handling with redirect to error page

### Job Detail Page
- Fetches opportunity data by ID from the API
- Displays comprehensive job information in a two-column layout
- Shows responsibilities with checkmark icons
- Ideal candidate section
- When & Where information with location icon
- About section with posting date, deadline, location, and dates
- Category tags with color coding
- Required skills displayed as badges
- Back button to return to listings
- 404 error handling for invalid opportunity IDs

## 🔧 Development Notes

- The application uses client-side rendering (`"use client"`) for interactive components
- RTK Query provides automatic caching, so data is fetched efficiently
- Error states redirect to a dedicated error page
- Loading states show a custom Loading component
- The design matches the job-listing project for consistency
