<div align="center">

# 🎓 Doubtify

### _A Modern Q&A Platform for Students_

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-4-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

**Doubtify** is a full-stack Q&A platform where students can ask questions, share answers, and collaborate through an interactive community-driven experience.

[Features](#-features) · [Architecture](#-architecture) · [Getting Started](#-getting-started) · [API Reference](#-api-reference)

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Authentication** | Secure signup/signin with JWT tokens & bcrypt password hashing |
| ❓ **Ask Questions** | Post questions with categories, sub-categories, and file attachments |
| 💬 **Answers & Comments** | Answer questions and engage through threaded comments |
| 👍 **Upvotes** | Upvote helpful questions (toggle on/off) |
| 🔖 **Bookmarks** | Save interesting Q&A pairs for later reference |
| 📝 **Drafts** | Save work-in-progress questions or answers as drafts |
| 👤 **User Profiles** | Customizable profiles with bio, profile picture, and interests |
| 🏷️ **Categories** | Browse and filter questions by category |
| 🔍 **Search** | Search questions by keyword |
| ☁️ **File Uploads** | Attach images/files via Cloudinary integration |

---

## 🏗️ Architecture

Doubtify follows a **MERN Stack** monorepo architecture:

### System Design

```
┌──────────────────────────────────────────────────────────┐
│                     FRONTEND (React)                     │
│  React Router · Tailwind CSS · Axios · Context API       │
│  Port: 3000                                              │
└────────────────────────┬─────────────────────────────────┘
                         │  HTTP (REST API)
                         ▼
┌──────────────────────────────────────────────────────────┐
│                   BACKEND (Express.js)                   │
│  JWT Auth · Multer · Bcrypt · Validator                  │
│  Port: 3000 (configurable)                               │
├──────────────┬────────────────────────┬──────────────────┤
│              │                        │                  │
│              ▼                        ▼                  │
│     ┌─────────────────┐    ┌───────────────────┐         │
│     │  MongoDB Atlas   │    │    Cloudinary     │         │
│     │  (Database)      │    │  (File Storage)   │         │
│     └─────────────────┘    └───────────────────┘         │
└──────────────────────────────────────────────────────────┘
```


## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher — [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB Atlas** account — [Sign up](https://www.mongodb.com/cloud/atlas)
- **Cloudinary** account — [Sign up](https://cloudinary.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/Akshay01070/Doubtify.git
cd Doubtify
```

### 2. Set Up Environment Variables

Create a `.env` file inside the `backend/` directory:

```bash
cd backend
```

Create a file named `.env` with the following content:

```env
PORT=3000
JWT_SECRET=your_jwt_secret_here
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_URL=cloudinary://your_api_key:your_api_secret@your_cloud_name
```

> **💡 Tip:** Get your MongoDB URI from [MongoDB Atlas → Connect → Drivers](https://cloud.mongodb.com/). Make sure your IP address is whitelisted under **Network Access**.

### 3. Install Dependencies

From the **root** directory:

```bash
# Install all dependencies (backend + frontend)
npm run install:all
```

Or install them separately:

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 4. Run the Application

You need **two terminals** — one for the backend and one for the frontend:

**Terminal 1 — Backend:**
```bash
cd backend
npm start
```
> The backend server will start on `http://localhost:3000`

**Terminal 2 — Frontend:**
```bash
cd frontend
npm start
```
> The React app will start on `http://localhost:3001` (or the next available port)

---



---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Tailwind CSS 3, React Router 6, Axios, React Icons |
| **Backend** | Node.js, Express 4, Mongoose 8, JWT, Bcrypt |
| **Database** | MongoDB Atlas |
| **File Storage** | Cloudinary |
| **Dev Tools** | Nodemon, ESLint |

---

## 📄 License

This project is open source and available under the [ISC License](LICENSE).

---

<div align="center">

Made with ❤️ by [Akshay](https://github.com/Akshay01070)

</div>
