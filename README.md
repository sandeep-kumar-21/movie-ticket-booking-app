# QuickShow - Full Stack Movie Ticket Booking App

**QuickShow** is a comprehensive full-stack movie ticket booking application built using the MERN stack (MongoDB, Express, React, Node.js). It offers a seamless experience for users to browse movies, select seats, and book tickets, while providing a robust admin dashboard for managing movies and shows. The application integrates modern services like Clerk for authentication, Stripe for payments, and Inngest for background processes.

## Features

### User Features
* **User Authentication:** Secure Sign-up/Login via Email, Google, or Phone (powered by Clerk).
* **Movie Browsing:** View "Now Showing" movies with details like cast, rating, and description.
* **Seat Selection:** Interactive visual seat layout to choose specific seats.
* **Booking System:** Book tickets for specific dates and showtimes.
* **Payments:** Secure online payments integration using Stripe.
* **My Bookings:** View booking history and status.
* **Email Notifications:** Receive booking confirmations and reminder emails (powered by Nodemailer & Inngest).
* **Favorites:** Add movies to a personal favorites list.

### Admin Features
* **Dashboard:** Overview of total bookings, revenue, active shows, and users.
* **Manage Shows:** Add new movies and schedule showtimes.
* **Movie Data:** Auto-fetch movie details (posters, cast, plot) using TMDB API.
* **Booking Management:** View a list of all user bookings.

## Tech Stack

### Frontend
* **Framework:** React (Vite)
* **Styling:** Tailwind CSS
* **Routing:** React Router DOM
* **Icons:** Lucide React
* **HTTP Client:** Axios
* **Notifications:** React Hot Toast

### Backend
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (Atlas)
* **ODM:** Mongoose
* **Background Jobs:** Inngest (for email scheduling & cleanup tasks)

### Services & APIs
* **Authentication:** Clerk
* **Payments:** Stripe
* **Movie Data:** TMDB API
* **Emails:** Nodemailer + Brevo (SMTP)
* **Deployment:** Vercel

## Environment Variables

You need to set up environment variables for both the **Client** and **Server**. Create `.env` files in the respective directories.

### Client (`client/.env`)
```env
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

# Backend URL (Use localhost for dev, deployed URL for prod)
VITE_BASE_URL=http://localhost:3000

# TMDB Image Base URL (for fetching posters)
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/original
VITE_CURRENCY=$
```

### Server (`server/.env`)
```env
# Server Port
PORT=3000

# Database Connection (MongoDB Atlas)
MONGODB_URI=your_mongodb_connection_string

# Clerk Authentication (Backend)
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Stripe Payments
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Inngest (Background Jobs)
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key

# TMDB API (Movie Data)
TMDB_API_KEY=your_tmdb_api_read_access_token

# Email Service (Nodemailer/Brevo)
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
SENDER_EMAIL=your_sender_email_address
```

## Installation & Setup

This project uses a monorepo-style structure with `client` and `server` folders.

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/quickshow.git
cd quickshow
```

### 2. Frontend Setup
```bash
cd client
npm install
npm run dev
```
*The frontend will start at `http://localhost:5173`*

### 3. Backend Setup
Open a new terminal in the project root:
```bash
cd server
npm install
npm run server
```
*The backend will start at `http://localhost:3000`*

## Project Structure

```
quickshow/
├── client/              # React Frontend
│   ├── src/
│   │   ├── assets/      # Images and static assets
│   │   ├── components/  # Reusable components (Navbar, MovieCard, SeatLayout)
│   │   ├── pages/       # Application pages (Home, MovieDetails, Admin Dashboard)
│   │   ├── context/     # Global state context
│   │   ├── App.jsx      # Main App component
│   │   └── main.jsx     # Entry point
│   └── ...
├── server/              # Express Backend
│   ├── config/          # DB connection, Nodemailer config
│   ├── controllers/     # Logic for Auth, Bookings, Movies
│   ├── models/          # Mongoose Models (User, Movie, Show, Booking)
│   ├── routes/          # API Routes
│   ├── inngest/         # Background job functions
│   ├── server.js        # Server entry point
│   └── ...
└── README.md
```

## Deployment

The project is configured for deployment on **Vercel**.

1.  **Backend:** Deploy the `server` directory as a separate project on Vercel. Add all Server Environment Variables in the Vercel dashboard.
2.  **Frontend:** Deploy the `client` directory as a separate project. Add the Client Environment Variables (Update `VITE_BASE_URL` to your deployed backend URL).
3.  **Webhooks:** Ensure you update the Stripe and Clerk webhook endpoints to point to your deployed backend URL.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is open source and available under the [MIT License](LICENSE).
