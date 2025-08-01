# Edvora - Academic Journey Management Platform

A responsive React application built with Tailwind CSS for managing academic tasks, deadlines, and study progress.

## Features

### 🔐 Authentication System
- Conditional rendering based on login status
- User profile management
- Secure logout functionality

### 🏠 Home Page
**For Non-Logged-In Users:**
- Hero section with compelling call-to-action
- Feature highlights showcasing platform capabilities
- Responsive design with animated elements

**For Logged-In Users:**
- Personalized welcome message
- Quick stats dashboard (deadlines, tasks, XP points)
- Daily motivation quotes
- Upcoming reminders snapshot
- AI Study Companion quick access
- Progress tracking with visual insights

### 🧭 Navigation Bar
- Responsive design with mobile hamburger menu
- Dynamic links based on authentication state
- Profile dropdown with user options
- Notification bell for logged-in users
- Clean, modern UI with hover effects

## Components

### `Navbar.jsx`
- Conditional rendering for logged-in/not-logged-in states
- Mobile-responsive hamburger menu
- Profile dropdown with user options
- Notification system integration

### `Home.jsx`
- Dual interface for different user states
- Hero section with image integration
- Feature cards with hover animations
- Dashboard with progress tracking
- AI companion integration

## Tech Stack
- React 19
- Tailwind CSS 4
- Vite for build tooling
- Responsive design principles

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the local development URL

## Demo Controls
The application includes demo controls (bottom-right corner) to toggle between logged-in and logged-out states for testing purposes.

## Design Features
- Modern, clean UI with gradient backgrounds
- Smooth animations and transitions
- Mobile-first responsive design
- Accessible color schemes and typography
- Interactive elements with hover states
