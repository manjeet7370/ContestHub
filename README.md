# ContestHub

A full-stack competitive coding contest platform inspired by platforms like Codeforces and LeetCode. ContestHub allows users to participate in coding contests, solve problems, and submit solutions through a secure authentication system.

> ⚠️ **Status:** Active development. Core platform is functional with authentication, protected routes, contest browsing, problem solving, submissions, and a Tailwind-based UI. Judge0 integration, leaderboard, Redis caching, and deployment are the next major milestones.

---

## What it does

ContestHub enables users to browse contests, view problems, and submit solutions through a complete end-to-end workflow. The long-term goal is to support live code execution, real-time leaderboards, Redis caching, Dockerized deployment, and a scalable production-ready architecture.

---

## Features

### ✅ Completed

- JWT-based authentication (Register/Login/Logout)
- Protected backend APIs using JWT middleware
- Protected frontend routes
- Contest listing and contest details pages
- Problem detail page with coding workspace
- End-to-end code submission workflow
- My Submissions dashboard
- Authentication persistence using localStorage
- Responsive navigation bar
- Tailwind CSS integration
- Modern UI for Home, Contest, Problem, Login, Register, and Submission pages
- PostgreSQL database integration using Prisma ORM
- React Router based client-side navigation
- UI polish and responsiveness improvements

### 🚧 In Progress

- Verdict badge enhancements
- Submission history improvements

### 📋 Planned

- Judge0 integration for real-time code execution
- Custom test case execution
- Accepted / Wrong Answer / TLE verdict generation
- Contest leaderboard
- User profiles and statistics
- Redis caching
- API rate limiting
- Role-based access control (Admin/User)
- Docker support
- CI/CD pipeline
- Cloud deployment

---

## Key Highlights

- Built a full-stack coding contest platform using React, Node.js, Express, Prisma, and PostgreSQL.
- Implemented JWT-based authentication and authorization.
- Developed RESTful APIs for contests, problems, and submissions.
- Created an end-to-end submission workflow from frontend to database.
- Designed a coding workspace inspired by modern competitive programming platforms.
- Integrated protected routes and secure API access using JWT.
- Planned scalability enhancements including Redis caching, Dockerization, and deployment.

---

## Tech Stack

| Layer | Technology |
|---------|------------|
| Frontend | React, React Router DOM, Axios, Tailwind CSS |
| Backend | Node.js, Express.js |
| ORM | Prisma |
| Database | PostgreSQL |
| Authentication | JWT, bcrypt |
| Version Control | Git, GitHub |

---

## Project Structure

```text
ContestHub/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Contests.jsx
│   │   │   ├── ContestDetails.jsx
│   │   │   ├── ProblemDetails.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── MySubmissions.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   └── package.json
│
└── server/
    ├── prisma/
    │   ├── schema.prisma
    │   └── prismaClient.js
    │
    ├── routes/
    │   ├── authRoutes.js
    │   ├── contestRoutes.js
    │   ├── problemRoutes.js
    │   └── submissionRoutes.js
    │
    ├── middleware/
    │   └── authMiddleware.js
    │
    └── index.js
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- PostgreSQL

---

## Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/contesthub"
JWT_SECRET="your_secret_key"
PORT=5000
```

Run migrations:

```bash
npx prisma migrate dev
```

Start server:

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## API Overview

### Authentication

| Method | Endpoint |
|----------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |

### Contests

| Method | Endpoint |
|----------|----------|
| GET | /api/contest |
| GET | /api/contest/:id |

### Problems

| Method | Endpoint |
|----------|----------|
| GET | /api/problem/:id |

### Submissions

| Method | Endpoint |
|----------|----------|
| POST | /api/submission/create |
| GET | /api/submission/my |

Protected endpoints require:

```http
Authorization: Bearer <token>
```

---

## Roadmap

```text
Phase 1 ✅
Authentication
Protected Routes
Contest Management
Problem Management
Submission Workflow
Tailwind UI

Phase 2 🚧
UI Polish
Submission Enhancements

Phase 3 📋
Judge0 Integration
Custom Test Cases
Automated Verdicts

Phase 4 📋
Leaderboard
Contest Rankings
User Profiles

Phase 5 📋
Redis Caching
Rate Limiting
Role-Based Access Control

Phase 6 📋
Docker
CI/CD
Cloud Deployment
```

---

## Current Progress

```text
Backend        ~85%
Frontend Logic ~90%
UI             ~75%
Overall        ~80%
```

---

## Contributing

This project is currently being developed as a personal learning and portfolio project.

---

## License

MIT License
