# 🔐 FortiPass — Advanced Password Security Analyzer

FortiPass is a full-stack cybersecurity web application designed to analyze password strength, detect vulnerabilities, and provide intelligent recommendations using modern security techniques and AI-powered insights.

---

## 🚀 Features

### 🔑 Password Analysis

* Real-time password strength evaluation
* Entropy-based scoring system
* Crack time estimation (brute-force simulation)

### 🛡️ Security Intelligence

* Breach detection using public leak databases
* Pattern detection (common passwords, sequences, repetitions)
* Risk classification (Low / Medium / High)

### 🤖 AI-Powered Advisor

* Smart password improvement suggestions
* Context-aware recommendations

### 📊 Dashboard (Planned / In Progress)

* Security analytics visualization
* Password strength trends
* Risk insights

### 🔐 Authentication System

* Secure user registration & login
* JWT-based authentication
* Protected routes

---

## 🏗️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Vite

### Backend

* Node.js
* Express.js
* MongoDB (Atlas)
* JWT Authentication
* bcrypt.js

### AI & APIs

* Gemini API (for AI recommendations)
* Have I Been Pwned (breach detection)

---

## 📁 Project Structure

```
fortipass/
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── features/
│   │   ├── shared/
│   │   ├── pages/
│   │   └── styles/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── services/
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```
git clone https://github.com/RamaVenkataCharan/fortipass.git
cd fortipass
```

---

### 2️⃣ Backend Setup

```
cd backend
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_api_key
```

Run backend:

```
npx nodemon src/server.js
```

---

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

## 🔐 API Endpoints

### Auth

* `POST /api/auth/register` → Register user
* `POST /api/auth/login` → Login user

### Protected

* `GET /api/protected` → Requires JWT token

---

## 🧪 Testing

Use tools like:

* Postman
* Thunder Client

---

## 🔒 Security Practices

* Passwords are hashed using bcrypt
* JWT authentication for secure sessions
* No plaintext password storage
* Environment variables for sensitive data

---

## 🚀 Future Enhancements

* Chrome extension integration
* Full analytics dashboard
* Multi-factor authentication (MFA)
* AI security reports (PDF export)
* SaaS deployment

---

## 🌐 Deployment

* Frontend: Vercel / Netlify
* Backend: Render / Railway
* Database: MongoDB Atlas

---

## 👨‍💻 Author

**Mekala Rama Venkata Charan**

* B.Tech CSE Student
* AI & Full Stack Developer

---

## 📌 Project Vision

FortiPass is designed to evolve from a password checker into a **complete security intelligence platform**, helping users understand and improve their digital security posture.

---

## ⭐ Contributing

Contributions are welcome. Feel free to fork, improve, and submit pull requests.

---

## 📄 License

This project is licensed under the MIT License.
