# Planora 💍

Planora is a modern **wedding planning platform** designed to connect couples with trusted vendors, streamline bookings, and simplify event coordination through a seamless digital experience.

---

## 🌐 Live Demo

👉 https://planora-dun-chi.vercel.app/

---

## 🚀 Key Highlights

* Role-based dashboards (Couples & Vendors)
* Real-time booking & communication system
* Secure authentication (JWT + Google OAuth)
* Cloud-based image management (Cloudinary)
* Fully responsive modern UI

---

## 📌 Problem Statement

Wedding planning is often chaotic due to:

* scattered communication
* manual vendor search
* lack of centralized management tools

---

## 💡 Solution

Planora provides:

* centralized vendor discovery
* streamlined booking workflows
* dedicated dashboards for users
* real-time interaction between couples and vendors

---

## ✨ Features

### 👩‍❤️‍👨 For Couples

* Discover vendors by category & location
* Manage bookings and planning tasks
* Personalized dashboard

### 🧑‍💼 For Vendors

* Create and manage profiles
* Upload portfolios
* Receive booking requests

---

## 🏗️ System Architecture

```
Frontend (React + Vite)
        ↓
Backend (Node.js + Express)
        ↓
Database (MongoDB)
        ↓
Cloud Storage (Cloudinary)
```

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* React Router

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### Authentication

* JWT
* bcrypt
* Google OAuth

### Other

* Cloudinary (image upload)

---

## 📂 Project Structure

```
Planora/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
```

---

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone https://github.com/aman105s/Planora.git
cd Planora
```

### 2. Backend Setup

```bash
cd backend
npm install
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

### Backend `.env`

```
PORT=
MONGO_URI=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### Frontend `.env`

```
VITE_API_URL=
VITE_GOOGLE_CLIENT_ID=
```

---

## 📸 Screenshots

> Add screenshots of:

* Homepage
* Dashboard
* Vendor listing
* Booking flow

Example:

```
![Homepage](./screenshots/home.png)
```

---

## 🚧 Challenges Faced

* Managing role-based access control
* Handling secure authentication
* Designing scalable API structure
* Integrating Cloudinary with backend

---

## 🔮 Future Scope

* AI-based vendor recommendations
* Real-time chat system
* Budget tracking system
* Mobile application

---

## 📜 License

ISC License

