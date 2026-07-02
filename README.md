# OnferenceTV — Marketing Campaign Builder (Backend)

Backend API for the Marketing Campaign Builder assignment — built with **Node.js, Express, MongoDB (Mongoose)**, with AI email generation powered by **Google Gemini**.

## Live Demo

- **Live API**: https://onferencetv-backend.onrender.com
- **Frontend (Live App)**: https://onferencetv-frontend.vercel.app <!-- Vercel deploy zalyavar update kar -->
- **Frontend Repo**: https://github.com/mrunaligangnaik/onferencetv-frontend

> ⚠️ Free-tier hosting असल्यामुळे backend काही मिनिटं वापरात नसेल तर "sleep" होतो — पहिली request ~30-50 सेकंद घेऊ शकते.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express 5
- **Database**: MongoDB Atlas (via Mongoose)
- **AI**: Google Gemini (`@google/generative-ai`)
- **Auth**: JWT + bcrypt

## Features

- User authentication (register/login) with JWT
- Campaign CRUD (Create, Read, Update, Delete)
- AI-powered email generation (Subject, Preview Text, Email Content, CTA suggestion)
- Journey Builder (trigger → action → condition → yes/no outcomes)
- Profile update (name, email, password)

## Project Structure

```
├── controllers/       # Route handlers (auth, campaigns, journeys, ai)
├── models/             # Mongoose schemas
├── routes/              # Express routers
├── middleware/       # Auth middleware, error handling
├── server.js            # App entry point
└── .env.example        # Sample environment variables
```

## Setup Instructions (Local)

### 1. Clone the repo

```bash
git clone https://github.com/mrunaligangnaik/onferencetv-backend.git
cd onferencetv-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment variables

Root मध्ये `.env` file बनव (`.env.example` वरून copy कर):

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_random_secret_key_min_32_chars
CLIENT_URL=http://localhost:5173
```

- **MONGO_URI**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) वरून free cluster बनवून connection string घे
- **GEMINI_API_KEY**: [Google AI Studio](https://aistudio.google.com/apikey) वरून free key घे
- **JWT_SECRET**: कोणताही random 32+ character string

### 4. Run the server

```bash
npm start
```

Server default `http://localhost:5000` वर चालेल.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | नवीन user register |
| POST | `/api/auth/login` | Login |
| PUT | `/api/auth/profile` | Profile update |
| PUT | `/api/auth/password` | Password update |
| GET | `/api/campaigns` | सगळे campaigns |
| POST | `/api/campaigns` | नवीन campaign |
| PUT | `/api/campaigns/:id` | Campaign edit |
| DELETE | `/api/campaigns/:id` | Campaign delete |
| POST | `/api/ai/generate-email` | AI email generate |
| GET | `/api/journeys` | सगळे journeys |
| POST | `/api/journeys` | नवीन journey |
| DELETE | `/api/journeys/:id` | Journey delete |

## Deployment

Backend **Render** वर deploy केलंय (Free Web Service). Deploy steps:

1. Render → New Web Service → GitHub repo connect
2. Build Command: `npm install`
3. Start Command: `npm start`
4. Environment Variables (वरचेच 5) Render dashboard मध्ये add केले

## Author

Mrunali Gangnaik — [GitHub](https://github.com/mrunaligangnaik)