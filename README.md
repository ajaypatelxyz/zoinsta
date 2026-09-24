# Zoinsta

Zoinsta is a social food discovery platform where people can discover food videos, like and save dishes, and explore food partners. Food partners can create accounts, publish food videos, and view their uploaded content from a dedicated dashboard.

## Features

### For users

- Create a user account and sign in securely.
- Browse a full-screen food video feed.
- Like and unlike food posts.
- Save and unsave food posts.
- View saved food in a personal collection.
- Visit food partner profiles from the feed.
- View and manage a personal profile.
- Log out with confirmation feedback.
- Receive success and error toast notifications for account actions.

### For food partners

- Register a food partner account.
- Sign in through the food partner portal.
- View a food partner dashboard.
- See the number of uploaded food videos.
- Upload a food video with a name and description.
- Preview a selected video before publishing.
- View uploaded food videos on the partner profile.
- Return from the upload screen to the partner dashboard.
- Log out from the partner dashboard.

## Application Screens

| Route | Purpose |
| --- | --- |
| `/` | Welcome screen and account type selection |
| `/user/register` | User registration |
| `/user/login` | User login |
| `/food-partner/register` | Food partner registration |
| `/food-partner/login` | Food partner login |
| `/home` | Food discovery video feed |
| `/saved` | Saved food collection |
| `/profile` | User profile |
| `/food-partner/profile` | Authenticated food partner dashboard |
| `/food-partner/:id` | Food partner profile and uploaded videos |
| `/create-food` | Food partner video publishing form |

## Technology

### Frontend

- React 19
- Vite
- React Router
- Axios
- Lucide React icons
- Responsive, mobile-first CSS

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication stored in HTTP cookies
- bcryptjs password hashing
- Multer for in-memory video uploads
- ImageKit for uploaded video storage
- CORS with credentials enabled for the local frontend

## Project Structure

```text
Zoinsta/
├── Backend/
│   ├── server.js
│   ├── package.json
│   └── src/
│       ├── app.js
│       ├── controllers/
│       ├── db/
│       ├── middleware/
│       ├── model/
│       ├── routes/
│       └── services/
└── Frontend/
	├── package.json
	├── index.html
	└── src/
		├── components/
		├── pages/
		├── routes/
		├── App.jsx
		└── main.jsx
```

## Requirements

- Node.js and npm
- MongoDB connection string
- ImageKit private key for video storage

## Environment Variables

Create a `.env` file inside `Backend/`:

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_URL=your_imagekit_private_key
```

The backend currently runs on port `3000` and the frontend is configured to use:

```text
http://localhost:3000
```

The backend CORS configuration allows the Vite frontend origin:

```text
http://localhost:5173
```

## Installation

Install backend dependencies:

```bash
cd Backend
npm install
```

Install frontend dependencies:

```bash
cd ../Frontend
npm install
```

## Running Locally

Start the backend in one terminal:

```bash
cd Backend
node server.js
```

Start the frontend in another terminal:

```bash
cd Frontend
npm run dev
```

Open the frontend at:

```text
http://localhost:5173
```

## Frontend Commands

Run the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Run ESLint:

```bash
npm run lint
```

Preview the production build:

```bash
npm run preview
```

## API Overview

### Authentication

```text
POST /api/auth/user/register
POST /api/auth/user/login
GET  /api/auth/user/logout
GET  /api/auth/user/:id

POST /api/auth/food-partner/register
POST /api/auth/food-partner/login
GET  /api/auth/food-partner/logout
```

### Food

```text
POST /api/food
GET  /api/food
POST /api/food/like
POST /api/food/save
GET  /api/food/save
```

### Food partners

```text
GET /api/food-partner/:id
```

## Authentication Notes

- Authentication uses JWT tokens stored in cookies.
- Protected requests use credentials through Axios.
- User-only and food-partner-only middleware protect their respective API operations.
- User IDs and food partner IDs are stored in browser local storage for frontend profile loading.

## Current Scope

Zoinsta currently focuses on food discovery, social interactions, food partner publishing, and profile management. Online ordering and payment functionality are not part of the current implementation.
