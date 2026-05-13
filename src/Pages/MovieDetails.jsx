import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState("");

  const [reviewRating, setReviewRating] = useState(10);
  const [userRating, setUserRating] = useState(0);

  const [isInWatchlist, setIsInWatchlist] = useState(false);

  // ⭐ FAVORITE STATE (FIXED POSITION)
  const [isFavorite, setIsFavorite] = useState(false);

  // ⭐ IMDB STATE
  const [ratingStats, setRatingStats] = useState({
    totalRatings: 0,
    distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  });

  const userId = sessionStorage.getItem("userId");

  // 🔥 FETCH DATA
  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const movieRes = await fetch(`http://localhost:5000/api/movies/${id}`);
        const movieData = await movieRes.json();
        setMovie(movieData);

        // ⭐ Rating stats
        if (movieData.ratings) {
          const dist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
          movieData.ratings.forEach((r) => dist[r.value]++);
          setRatingStats({
            totalRatings: movieData.ratings.length,
            distribution: dist,
          });
        }

        const reviewsRes = await fetch(`http://localhost:5000/api/reviews/${id}`);
        const reviewsData = await reviewsRes.json();
        setReviews(reviewsData);

        if (userId) {
          // watchlist
          const watchlistRes = await fetch(
            `http://localhost:5000/api/watchlist/${userId}/${id}`
          );
          const watchlistData = await watchlistRes.json();
          setIsInWatchlist(watchlistData.exists);

          // ❤️ favorite
          const favRes = await fetch(
            `http://localhost:5000/api/favorites/${userId}/${id}`
          );
          const favData = await favRes.json();
          setIsFavorite(favData.liked);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id, userId]);

  // 🔥 WATCHLIST
  const handleWatchlistToggle = async () => {
    if (!userId) return alert("Please login to use the watchlist!");

    try {
      const token = localStorage.getItem("token"); // 🔥 GET TOKEN

      const response = await fetch(`http://localhost:5000/api/watchlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ FIX
        },
        body: JSON.stringify({ userId, movieId: id }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsInWatchlist(data.exists); // ✅ USE BACKEND RESPONSE
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.error("Watchlist error:", error);
    }
  };

  // ❤️ FAVORITE TOGGLE (FIXED)
  const handleFavoriteToggle = async () => {
    if (!userId) return alert("Login to like movies!");

    const res = await fetch("http://localhost:5000/api/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, movieId: id }),
    });

    const data = await res.json();
    setIsFavorite(data.liked);
  };

  // 🔥 REVIEW SUBMIT
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!userId) return alert("Please login to leave a review!");

    try {
      const response = await fetch(`http://localhost:5000/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movieId: id,
          userId,
          username: sessionStorage.getItem("userName") || "Anonymous",
          rating: reviewRating,
          comment: userReview,
        }),
      });

      if (response.ok) {
        const newReview = await response.json();
        setReviews([newReview, ...reviews]);
        setUserReview("");
        alert("Review submitted!");
      }
    } catch (error) {
      console.error("Review error:", error);
    }
  };

  // ⭐ RATING SYSTEM (CLEANED)
  const handleRating = async (value) => {
    if (!userId) {
      alert("Please login to rate!");
      return;
    }

    try {
      setUserRating(value);

      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:5000/api/movies/${id}/rate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 🔥 IMPORTANT
        },
        body: JSON.stringify({
          userId,
          value: Number(value),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMovie({ ...movie, rating: data.rating });

        setRatingStats({
          totalRatings: data.totalRatings,
          distribution: data.distribution,
        });
      } else {
        alert(data.message || "Rating failed");
      }
    } catch (error) {
      console.error("Rating error:", error);
      alert("Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Curating details...</p>
      </div>
    );
  }

  if (!movie) {
    return <div className="error-msg">Movie not found</div>;
  }

  return (
    <div className="movie-page-wrapper">
      <div
        className="hero-backdrop"
        style={{ backgroundImage: `url(${movie.backdropUrl})` }}
      >
        <div className="hero-overlay"></div>

        <div className="hero-container">
          <div className="poster-card">
            <img src={movie.posterUrl} alt={movie.title} />
          </div>

          <div className="info-card">
            <h1 className="movie-title">{movie.title}</h1>

            <div className="movie-meta-tags">
              <span className="rating-pill">
                ⭐ {movie.rating?.toFixed(1)}
              </span>
              <span>{movie.duration}</span>

              <div className="genre-cloud">
                {movie.genre.map((g, i) => (
                  <span key={i} className="genre-tag">{g}</span>
                ))}
              </div>
            </div>

            <p className="movie-synopsis">{movie.description}</p>

            {/* ⭐ RATING */}
            <div className="rating-container">
              <h3>{userRating > 0 ? `You rated: ${userRating} ⭐` : "Rate this movie:"}</h3>

              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= userRating ? "active" : ""}`}
                  onClick={() => handleRating(star)}
                  onMouseEnter={() => setUserRating(star)}
                  onMouseLeave={() => setUserRating(userRating)}
                >
                  ★
                </span>
              ))}

              {/* IMDB */}
              <div className="rating-summary">
                <h2>⭐ {movie.rating?.toFixed(1)} / 5</h2>
                <p>{ratingStats.totalRatings} ratings</p>

                {[5, 4, 3, 2, 1].map((star) => {
                  const count = ratingStats.distribution[star] || 0;
                  const percent = ratingStats.totalRatings
                    ? (count / ratingStats.totalRatings) * 100
                    : 0;

                  return (
                    <div key={star} className="rating-bar-row">
                      <span>{star} ⭐</span>
                      <div className="bar">
                        <div className="fill" style={{ width: `${percent}%` }}></div>
                      </div>
                      <span>{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* BUTTONS */}
            <div className="action-row">
              <a href={movie.trailerUrl} target="_blank" rel="noreferrer" className="play-btn">
                ▶ Watch Trailer
              </a>

              <button
                className={`watchlist-btn ${isInWatchlist ? "active" : ""}`}
                onClick={handleWatchlistToggle}
              >
                {isInWatchlist ? "✓ In Watchlist" : "+ Add to Watchlist"}
              </button>

              <button
                className={`favorite-btn ${isFavorite ? "active" : ""}`}
                onClick={handleFavoriteToggle}
              >
                {isFavorite ? "❤️ Liked" : "🤍 Like"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <div className="bottom-content-grid">
        <section className="glass-card">
          <h2 className="section-title">Your Thoughts</h2>

          <form onSubmit={handleReviewSubmit} className="review-form">
            <label>Rating</label>
            <select value={reviewRating} onChange={(e) => setReviewRating(e.target.value)}>
              {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>{n}/10</option>
              ))}
            </select>

            <textarea
              placeholder="Write your review..."
              value={userReview}
              onChange={(e) => setUserReview(e.target.value)}
              required
            />

            <button className="submit-review-btn">Post Review</button>
          </form>
        </section>

        <section className="glass-card">
          <h2 className="section-title">Audience Reviews</h2>

          {reviews.length > 0 ? (
            reviews.map((rev, i) => (
              <div key={i} className="review-item">
                <strong>{rev.username}</strong> ⭐ {rev.rating}/10
                <p>{rev.comment}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default MovieDetails;