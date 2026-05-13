import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Watchlist.css";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    const fetchWatchlist = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/watchlist/${userId}`
        );
        const data = await response.json();

        if (response.ok) {
          setWatchlist(data);
        }
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, [userId, navigate]);

  const getImageUrl = (url) => {
    if (!url) return "https://placehold.co/500x750?text=No+Poster";
    if (url.startsWith("http")) return url;
    return `https://image.tmdb.org/t/p/w500${url}`;
  };

  const handleRemove = async (movieId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:5000/api/watchlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, movieId }),
      });

      if (response.ok) {
        setWatchlist(watchlist.filter((m) => m._id !== movieId));
      }
    } catch (error) {
      console.error("Error removing:", error);
    }
  };

  return (
    <div className="watchlist-page">
      <div className="watchlist-container">

        {/* 🔥 HERO HEADER */}
        <div className="watchlist-hero">
          <h1>🎬 My Watchlist</h1>
          <p>
            You have <span>{watchlist.length}</span> movies saved
          </p>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="loading">Loading your list...</div>
        ) : watchlist.length > 0 ? (

          <div className="movie-grid">
            {watchlist.map((movie) => (
              <div key={movie._id} className="watchlist-card-wrapper">

                <Link to={`/movie/${movie._id}`} className="movie-link">
                  <div className="movie-card">

                    <img
                      src={getImageUrl(movie.posterUrl)}
                      alt={movie.title}
                      className="movie-poster"
                    />

                    <div className="overlay">
                      <h3>{movie.title}</h3>
                      <span>⭐ {movie.rating}</span>
                    </div>

                  </div>
                </Link>

                <button
                  className="remove-btn"
                  onClick={() => handleRemove(movie._id)}
                >
                  ✕
                </button>

              </div>
            ))}
          </div>

        ) : (
          <div className="empty-watchlist">
            <h2>No Movies Yet</h2>
            <p>Add movies to your watchlist and enjoy later 🎬</p>
            <Link to="/user" className="browse-btn">
              Browse Movies
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;