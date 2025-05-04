# MentorHub 👩‍🏫👨‍💻

MentorHub is a peer mentoring scheduler and feedback platform that connects junior developers (mentees) with experienced professionals (mentors) for 1-on-1 sessions, feedback, and analytics.

## 🚀 Features

### ✅ Core Modules
- **User Authentication** (JWT-based)
- **Role-based Access Control** (Mentor / Mentee)
- **User Profile Management**
- **Mentor Availability Setup**
- **Session Scheduling**
- **Session Management Dashboard**
- **Post-Session Feedback & Ratings**
- **Analytics & Dashboards**

### 📊 Analytics
- Mentor: Avg. rating, total sessions
- Mentee: Session frequency, mentor ratings

---

## 🧰 Tech Stack

| Layer       | Tech                              |
|------------|-----------------------------------|
| Frontend   | Angular 17                         |
| Backend    | Node.js + Express.js               |
| Database   | PostgreSQL (hosted via Railway)    |
| ORM        | Prisma                             |
| Auth       | JWT + Role Middleware              |
| Hosting    | Railway (backend + frontend)       |

---

## 🔧 Setup Instructions

### 1. Clone the Repository
git clone https://github.com/your-username/mentorhub.git

-Install Backend Dependencies
cd backend
npm install

-Create a .env file

PORT=8080
DATABASE_URL=your_postgresql_url
JWT_SECRET=your_jwt_secret

Prisma Setup
npx prisma generate
npx prisma migrate deploy  # For production
# or for local dev
npx prisma migrate dev


Start Backend Server
npm start

Build Frontend
cd ../frontend
npm install
set NODE_OPTIONS=--openssl-legacy-provider  # Windows only
ng build --configuration=production
