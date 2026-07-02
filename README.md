# OnferenceTV — Marketing Campaign Builder (Backend)

Backend API for the Marketing Campaign Builder assignment, built with **Node.js, Express, and MongoDB (Mongoose)**, with AI email generation powered by **Google Gemini**.

## Live Demo

- **Live API**: https://onferencetv-backend.onrender.com
- **Live Frontend**: https://onferencetv-frontend.vercel.app
- **Frontend Repo**: https://github.com/mrunaligangnaik/onferencetv-frontend

> Note: This is hosted on Render's free tier, so the server may take 30–50 seconds to respond after a period of inactivity while it "wakes up."

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express 5
- **Database**: MongoDB Atlas (via Mongoose)
- **AI**: Google Gemini (`@google/generative-ai`)
- **Auth**: JWT + bcrypt

## Features

- User authentication (register/login) with JWT
- Campaign CRUD (Create, Read, Update, Delete)
- AI-powered email generation (Subject Line, Preview Text, Email Content, CTA suggestion)
- Journey Builder API (trigger → action → condition → yes/no outcomes)
- Profile update (name, email, password)

## Project Structure

```
├── controllers/     # Route handlers (auth, campaigns, journeys, ai)
├── models/          # Mongoose schemas
├── routes/          # Express routers
├── middleware/      # Auth middleware, error handling
├── server.js        # App entry point
└── .env.example     # Sample environment variables
```

## Setup Instructions (Local Development)

### 1. Clone the repository

```bash
git clone https://github.com/mrunaligangnaik/onferencetv-backend.git
cd onferencetv-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_random_secret_key_min_32_chars
CLIENT_URL=http://localhost:5173
```

- **MONGO_URI**: Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and copy the connection string.
- **GEMINI_API_KEY**: Get a free API key from [Google AI Studio](https://aistudio.google.com/apikey).
- **JWT_SECRET**: Any random string, at least 32 characters long.

### 4. Run the server

```bash
npm start
```

The server runs on `http://localhost:5000` by default.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login |
| PUT | `/api/auth/profile` | Update profile |
| PUT | `/api/auth/password` | Update password |
| GET | `/api/campaigns` | Get all campaigns |
| POST | `/api/campaigns` | Create a campaign |
| PUT | `/api/campaigns/:id` | Update a campaign |
| DELETE | `/api/campaigns/:id` | Delete a campaign |
| POST | `/api/ai/generate-email` | Generate email content with AI |
| GET | `/api/journeys` | Get all journeys |
| POST | `/api/journeys` | Create a journey |
| DELETE | `/api/journeys/:id` | Delete a journey |

## Deployment

The backend is deployed on **Render** (Free Web Service).

- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment Variables**: Set in the Render dashboard under the Environment tab (same 5 keys as above)

## Author

Mrunali Gangnaik — [GitHub](https://github.com/mrunaligangnaik)