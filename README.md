# CampusFix

A full-stack campus complaint management system that helps students
report campus maintenance issues and allows administrators to manage and
track those complaints from one place.

**Live application:** https://campus-fix-pink.vercel.app\
**Backend API:** https://campusfix-backend-3mge.onrender.com

------------------------------------------------------------------------

## Overview

CampusFix provides a simple way for students to submit complaints about
campus facilities. Students can describe an issue, select its category
and priority, provide a location, and optionally attach a photo.
Administrators can view submitted complaints and update their status.

The project is built with the MERN stack and uses Cloudinary for
complaint image storage.

## Features

### Student

-   Sign up and log in securely.
-   Submit a complaint with a title, category, priority, location, and
    description.
-   Upload an optional complaint image.
-   View submitted complaints and their current status.

### Administrator

-   Access the administrator dashboard.
-   View complaints submitted by students.
-   Review complaint details and attached images.
-   Manage complaint status.

### General

-   Role-based access for students and administrators.
-   JWT-based authentication.
-   Password hashing.
-   Responsive interface for desktop and mobile screens.
-   Cloud-based database and image storage.
-   Deployed frontend and backend.

## Tech Stack

  Area             Technologies
  ---------------- -----------------------------------------------
  Frontend         React, Vite, Tailwind CSS, JavaScript
  Backend          Node.js, Express.js
  Database         MongoDB Atlas, Mongoose
  Authentication   JSON Web Token (JWT), bcryptjs
  Image storage    Cloudinary, Multer, multer-storage-cloudinary
  Deployment       Vercel (frontend), Render (backend)

## Application Architecture

``` text
Student / Administrator
          |
          v
 React + Vite Frontend
       (Vercel)
          |
          | HTTP requests / REST API
          v
 Node.js + Express Backend
        (Render)
          |
          +----------> MongoDB Atlas
          |
          +----------> Cloudinary
                       (complaint images)
```

## Project Structure

The repository uses separate frontend and backend directories. A
simplified structure is shown below; individual files may differ as the
project evolves.

``` text
CampusFix/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   ├── .env
│   └── package.json
│
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── README.md
```

## Getting Started

Follow these steps to run CampusFix locally.

### Prerequisites

Install the following:

-   [Node.js](https://nodejs.org/)
-   npm (included with Node.js)
-   A [MongoDB Atlas](https://www.mongodb.com/atlas) account and
    database
-   A [Cloudinary](https://cloudinary.com/) account

### 1. Clone the repository

``` bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd CampusFix
```

### 2. Set up the backend

``` bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

``` env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Add your own MongoDB Atlas connection string, JWT secret, and Cloudinary
credentials. Do not commit this file or share these values publicly.

Start the backend:

``` bash
npm run dev
```

The backend should be available at `http://localhost:5000`.

### 3. Set up the frontend

Open a second terminal:

``` bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend` directory:

``` env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

``` bash
npm run dev
```

Vite will display the local frontend URL in the terminal, usually
`http://localhost:5173`.

## Environment Variables

### Backend

  -----------------------------------------------------------------------
  Variable                            Description
  ----------------------------------- -----------------------------------
  `PORT`                              Port used by the Express server
                                      (defaults to `5000` if not set)

  `MONGO_URI`                         MongoDB Atlas connection string

  `JWT_SECRET`                        Secret used to sign and verify JWTs

  `CLOUDINARY_CLOUD_NAME`             Cloudinary cloud name

  `CLOUDINARY_API_KEY`                Cloudinary API key

  `CLOUDINARY_API_SECRET`             Cloudinary API secret
  -----------------------------------------------------------------------

The deployed Render service also uses `NODE_ENV=production`.

### Frontend

  Variable         Description
  ---------------- -----------------------------
  `VITE_API_URL`   Base URL of the backend API

For local development, use `http://localhost:5000`. For the deployed
frontend, set it to:

``` env
VITE_API_URL=https://campusfix-backend-3mge.onrender.com
```

After changing Vite environment variables, restart the development
server. In Vercel, configure the variable in the project's Environment
Variables settings and redeploy.

## Deployment

The project is deployed using:

-   **Frontend:** Vercel --- https://campus-fix-pink.vercel.app
-   **Backend:** Render --- https://campusfix-backend-3mge.onrender.com
-   **Database:** MongoDB Atlas
-   **Image storage:** Cloudinary

Set the backend environment variables in Render and set `VITE_API_URL`
in Vercel. Never put backend secrets in the frontend environment
variables.

## Security Notes

-   Keep `.env` files out of version control.
-   Use strong, unique values for `JWT_SECRET` and database credentials.
-   Do not expose the Cloudinary API secret or MongoDB connection string
    in frontend code.
-   Configure MongoDB Atlas network access carefully. Avoid leaving
    unrestricted access enabled longer than necessary.
-   Use HTTPS for deployed services.

## Future Improvements

Possible enhancements for future versions include:

-   Complaint search, filtering, and pagination.
-   Complaint assignment and activity history.
-   Email or in-app notifications when complaint status changes.
-   Improved validation and upload feedback.
-   Automated tests and API documentation.

## Author

**Roshan Poddar**\
B.Tech -- Computer Science and Engineering

------------------------------------------------------------------------

*CampusFix is an academic full-stack project developed to make campus
issue reporting and complaint tracking more organized.*
