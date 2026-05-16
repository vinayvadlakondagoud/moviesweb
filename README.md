
# 🎬 MoviesWeb – Full Stack Movie Platform

A modern **full-stack Movies Web Application** built using the **MERN stack** that allows users to explore, review, and manage movies with an advanced admin dashboard.

---

## 🔥 Features

### 👤 User Features
- Browse movies with **rich UI**
- Search movies in real-time
- Filter by:
  - 🎭 Genre (Action, Drama, Crime, etc.)
  - 🌍 Industry (Bollywood, Hollywood, Tollywood, Mollywood, Kollywood)
- View movie details with:
  - Poster & backdrop
  - Cast & duration
  - YouTube trailer integration 🎥
- Add ratings ⭐
- Write reviews ✍️
- Watchlist & favorites ❤️

---

### 🛠️ Admin Features
- Full **Admin Control Panel**
- Add new movies
- Edit existing movies (including industry)
- Delete movies
- Manage users
- Delete users with all associated data (reviews, ratings, etc.)
- View analytics dashboard:
  - 📊 Top rated movie
  - 📊 Most reviewed movie
  - 📊 Average rating
  - 📊 Most popular genre
  - 📊 Most active user

---

## 🧠 Tech Stack

### Frontend
- React.js
- CSS (Custom UI – Dark Theme, Modern Design)
- Axios / Fetch API

### Backend
- Node.js
- Express.js

### Database
- MongoDB (Mongoose)

### Authentication
- JWT-based authentication

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/vinayvadlakondagoud/moviesweb.git
cd moviesweb
````

### 2️⃣ Install dependencies

#### Frontend

```bash
npm install
```

#### Backend

```bash
cd backend
npm install
```

---

### 3️⃣ Setup Environment Variables

Create `.env` file inside backend:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

---

### 4️⃣ Run the application

#### Start backend

```bash
cd backend
npm run dev
```

#### Start frontend

```bash
npm run dev
```

---

## 🌐 API Endpoints

### Movies

* `GET /api/movies` → Get all movies
* `GET /api/movies/:id` → Get single movie
* `POST /api/movies` → Add movie
* `PUT /api/movies/:id` → Update movie
* `DELETE /api/movies/:id` → Delete movie

### Ratings

* `POST /api/movies/:id/rate` → Rate a movie

### Admin

* `GET /api/admin/users` → Get users
* `DELETE /api/admin/users/:id` → Delete user + related data
* `GET /api/admin/reviews` → Get all reviews

---

## 🎨 UI Highlights

* 🔥 Dark premium UI design
* Smooth hover effects
* Glassmorphism cards
* Responsive layout (mobile-friendly)
* Professional admin dashboard


## 🚀 Deployment

You can deploy using:

* Frontend → Render
* Backend → Render
* Database → MongoDB Atlas

---

## 🧩 Future Improvements

* 🔐 Role-based access control
* 📊 Advanced analytics charts
* 🎥 Trailer autoplay modal
* 🧠 AI-based movie recommendations

---

## 👨‍💻 Author

**Vinay Vadlakonda**
📧 [thevinayjpp@gmail.com](mailto:thevinayjpp@gmail.com)

