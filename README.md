# Smart Leads Frontend

React frontend for the Smart Leads Dashboard — a CRM tool for managing sales leads.

## Tech Stack

- React 18 + TypeScript
- Vite
- TailwindCSS (dark mode support)
- React Router DOM v6
- Zustand (auth state)
- React Hook Form + Zod (form validation)
- Axios (API calls)
- React Hot Toast (notifications)
- Lucide React (icons)

## Getting Started

### Prerequisites

- Node.js 18+
- Backend API running

### Installation

```bash
npm install
```

### Environment Variables

```bash
cp .env.example .env
```

| Variable      | Description             |
|---------------|-------------------------|
| VITE_API_URL  | Backend API base URL    |

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

## Features

- **Authentication** — Login, register, JWT-based sessions, persisted via Zustand
- **Role-based UI** — Admin sees all controls; sales users see restricted actions
- **Leads Dashboard** — Filterable, searchable, sortable table with pagination
- **Dark Mode** — Toggle between light/dark, saved in localStorage
- **CSV Export** — Export current filtered view to CSV
- **Responsive** — Works on mobile with card layout, desktop with full table
- **Forms** — Create & edit leads with validation

## Project Structure

```
src/
├── api/          # Axios instance + API services
├── components/   # Reusable components (common, forms, dashboard)
├── hooks/        # useLeads, useDebounce, useDarkMode
├── layouts/      # DashboardLayout with sidebar
├── pages/        # LoginPage, RegisterPage, DashboardPage, LeadDetailPage
├── routes/       # ProtectedRoute
├── store/        # Zustand auth store
├── types/        # TypeScript interfaces
├── constants/    # Status/source values, badge colors
└── utils/        # CSV export utility
```

## Docker

```bash
docker build -t smart-leads-frontend .
docker run -p 80:80 smart-leads-frontend
```

## Deployment (Vercel)

1. Push to GitHub
2. Import repo in Vercel
3. Set `VITE_API_URL` environment variable to your deployed backend URL
4. Deploy

> Vercel handles SPA routing automatically — no nginx config needed.
