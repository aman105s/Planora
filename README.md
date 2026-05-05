# Planora

Planora is a modern wedding planning platform built to connect couples with wedding vendors, manage bookings, and simplify event coordination through a responsive web experience.

## Purpose

Planora exists to make wedding planning easier, faster, and more transparent for both couples and vendors. It brings together vendor discovery, booking workflows, and event management tools in one place so that users can plan weddings with confidence.

## Problem It Solves

Wedding planning often involves scattered communication, time-consuming vendor searches, and manual budget tracking. Planora solves these problems by:

- centralizing vendor discovery and category browsing
- offering dedicated portals for couples and vendors
- enabling booking requests, portfolio uploads, and messaging
- providing a guided onboarding experience for everyone involved

## Why Use Planora?

- For couples: find trusted wedding vendors, shortlist services, and manage planning tasks from a single dashboard.
- For vendors: create a profile, showcase your offerings, receive booking requests, and grow your business.
- For planners: reduce friction between discovery, booking, and execution.

## Key Features

- Role-based experience with separate couple and vendor portals
- User authentication with standard login and Google OAuth support
- Vendor discovery by category and location
- Booking and message management
- Image upload support through Cloudinary integration
- Responsive React frontend with Tailwind CSS styling
- REST API backend using Node.js, Express, and MongoDB

## Methodology

Planora is built using a split frontend/backend architecture:

1. `frontend/` handles the user interface, routing, and client-side state.
2. `backend/` exposes RESTful APIs for authentication, bookings, vendor profiles, and image uploads.
3. Data is stored in MongoDB, while images are uploaded to Cloudinary.
4. The app uses role-based route protection and token-based auth to protect dashboards.
5. The platform is designed to be extendable, with separate controllers and routes for each domain.

## Tech Stack

- Frontend: React, Vite, React Router, Tailwind CSS
- Backend: Node.js, Express, MongoDB, Mongoose
- Authentication: JWT, bcrypt, Google OAuth
- Image upload: Cloudinary

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/aman105s/Planora.git
cd Planora
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

### 4. Configure environment variables

Create a `.env` file inside `backend/` with the following values:

```env
PORT=<your-backend-port>
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
CLOUDINARY_CLOUD_NAME=<cloudinary-cloud-name>
CLOUDINARY_API_KEY=<cloudinary-api-key>
CLOUDINARY_API_SECRET=<cloudinary-api-secret>
```

Create a `.env` file inside `frontend/` with the following values:

```env
VITE_API_URL=<your-backend-api-url>
VITE_GOOGLE_CLIENT_ID=<your-google-oauth-client-id>
```

### 5. Run the backend

```bash
cd backend
npm run dev
```

### 6. Run the frontend

```bash
cd frontend
npm run dev
```

### 7. Access the app

Open the local frontend URL shown in the Vite output.

## Folder Structure

- `backend/` - Express server, API routes, controllers, models, and uploads
- `frontend/` - React app, pages, components, and styling
- `frontend/src/pages/` - page-level views for couples, vendors, onboarding, and search
- `frontend/src/components/` - reusable UI components
- `backend/controllers/` - business logic for each API area
- `backend/routes/` - route definitions for auth, bookings, vendors, couples, and messages

## Notes

- The backend currently allows CORS from `https://planora-dun-chi.vercel.app`. Update `backend/server.js` if you want to test from a different frontend origin.
- The project is ready for deployment with separate backend and frontend hosting.

## License

This project is licensed under the ISC License.

