# 🎓 Greater College Management System

A **Full-Stack School Management Application** built with the **MERN Stack (MongoDB, Express, React, Node.js)** — designed to streamline academic administration, enhance student engagement, and automate routine school tasks such as enrolment, results, payments, library management, and more.

---

## 🚀 Live Demo
🌐 **Production URL:** [https://greater-college-project.onrender.com](https://greater-college-project.onrender.com)

---

## 📂 Project Overview

Greater College is a modern **web-based school management system** featuring role-based access for **Students**, **Admins**, and optionally **Teachers**.  
The system provides portals for each role, offering real-time access to academic data, enrolment, and payment services.

---

## ✨ Key Features

### 🧑‍🎓 Student Portal
- Secure login and profile management
- Enrolment in available courses
- View results and grades
- Access timetable dynamically built from enrolled courses
- Make payments via **Stripe Sandbox**
- Borrow and view library books
- Upload project files
- Join and view committees

### 🧑‍💼 Admin Portal
- Manage students, departments, courses, and timetables
- Record and update results
- Manage library resources, projects, and committees
- View and approve applicants
- Monitor payments and finance summaries

### 💳 Payments Integration
- Integrated with **Stripe Checkout (Sandbox Mode)**
- Secure tuition fee payment flow
- Automatic transaction records and payment history

### 📚 Library & Projects
- Borrowing system with due date validation
- Library availability tracking
- Student project uploads and supervisor tracking

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React (Vite) + Redux Toolkit + RTK Query + Bootstrap 5 |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB Atlas (Mongoose ODM) |
| **Payments** | Stripe (Sandbox Integration) |
| **Authentication** | JWT (JSON Web Token) |
| **Hosting** | Render.com |
| **Styling** | Bootstrap, React-Bootstrap, Custom SCSS |
| **State Management** | Redux Toolkit + RTK Query API Slice |

---

## ⚙️ Project Structure

Greater College Project/
│
├── backend/
│ ├── config/ # Database & seeder scripts
│ ├── controllers/ # Business logic for routes
│ ├── models/ # Mongoose models (Student, Course, Payment, etc.)
│ ├── routes/ # Express route handlers
│ ├── middleware/ # Authentication, error handling
│ ├── server.js # Main server entry
│ └── .env.example # Example environment variables
│
├── frontend/
│ ├── src/ # React components, pages, features
│ ├── public/ # Static files (favicon, manifest)
│ ├── vite.config.js # Vite configuration
│ ├── package.json # Frontend dependencies
│ └── dist/ # Production build (auto-generated)
│
└── README.md


---

## 🧠 Local Development Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/greater-college-project.git
cd "Greater College Project"

Deployment on Render

Push your project to GitHub

On Render.com
:

New → Web Service

Connect your repo

Configure:

Build Command

cd frontend && npm install && npm run build && cd ../backend && npm install


Start Command

cd backend && npm start


Add environment variables from the section above.

Click Deploy 🎉

📊 Sample Screens

Add screenshots here once deployed:

Student dashboard

Course enrolment

Stripe payment checkout

Results page

Library & Projects modules

👨‍💻 Author

Ernest Eboagwu
📧 ernesteboagwu.dev@gmail.com

🌐 https://eboark.tech

💼 LinkedIn

🪪 License

This project is licensed under the MIT License — feel free to use and modify for educational or institutional purposes.

MIT License © 2025 Ernest Eboagwu

💡 Future Improvements

Teacher portal & grading interface

Attendance tracking

Push notifications for due payments

Mobile app version (React Native)

🏁 Greater College Project — a smart, scalable, and production-ready MERN School Management System demonstrating modern full-stack development best practices.

