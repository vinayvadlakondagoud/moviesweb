import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./User.css";

const User = () => {

  const [movies, setMovies] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FILTER STATES
  const [genre, setGenre] = useState("");
  const [industry, setIndustry] = useState("");

  // 🔥 PROFILE STATES
  const [userData, setUserData] = useState(null);
  const [watchlistCount, setWatchlistCount] = useState(0);
  const [favCount, setFavCount] = useState(0);

  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    profilePic: "",
  });

  // 🔥 DEFAULT AVATAR
  const getDefaultAvatar = (name) => {
    let avatar = sessionStorage.getItem("defaultAvatar");

    if (!avatar) {
      const styles = ["initials", "identicon", "thumbs", "shapes"];
      const style = styles[Math.floor(Math.random() * styles.length)];

      avatar = `https://api.dicebear.com/7.x/${style}/svg?seed=${name}`;
      sessionStorage.setItem("defaultAvatar", avatar);
    }

    return avatar;
  };

  // 🎬 FETCH DATA
  useEffect(() => {

    let url = "http://localhost:5000/api/movies";

    const params = [];

    if (genre) params.push(`genre=${genre}`);
    if (industry) params.push(`industry=${industry}`);

    if (params.length) {
      url += `?${params.join("&")}`;
    }

    const fetchAllData = async () => {
      try {
        setLoading(true);

        const userId = sessionStorage.getItem("userId");

        if (userId) {
          // PROFILE
          const userRes = await fetch(
            `http://localhost:5000/api/users/profile/${userId}`
          );
          const user = await userRes.json();
          setUserData(user);

          setFormData({
            profilePic: user.profilePic || "",
          });

          // WATCHLIST COUNT
          const countRes = await fetch(
            `http://localhost:5000/api/watchlist-count/${userId}`
          );
          const countData = await countRes.json();
          setWatchlistCount(countData.count);

          // FAVORITES COUNT
          const favRes = await fetch(
            `http://localhost:5000/api/favorites-count/${userId}`
          );
          const favData = await favRes.json();
          setFavCount(favData.count);

          // RECOMMENDATIONS
          const recRes = await fetch(
            `http://localhost:5000/api/recommendations/${userId}`
          );
          const recData = await recRes.json();
          setRecommendations(recData);
        }

        // MOVIES
        const res = await fetch(url);
        const data = await res.json();
        setMovies(data);

      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [genre, industry]);

  // 🔥 UPDATE PROFILE PIC
  const handleUpdate = async () => {
    const userId = sessionStorage.getItem("userId");

    try {
      const res = await fetch(
        `http://localhost:5000/api/users/profile/${userId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            profilePic: formData.profilePic,
          }),
        }
      );

      const data = await res.json();

      setUserData(data);
      setFormData({ profilePic: data.profilePic });
      setEditMode(false);

    } catch (err) {
      console.error("Update error:", err);
    }
  };

  // 🎬 IMAGE HANDLER
  const getImageUrl = (url) => {
    if (!url) return "https://placehold.co/500x750?text=No+Poster";
    if (url.startsWith("http")) return url;
    return `https://image.tmdb.org/t/p/w500${url}`;
  };

  const defaultAvatar = getDefaultAvatar(userData?.name || "User");

  return (
    <div className="user-dashboard">
      <div className="user-container">

        {/* 🔥 PROFILE */}
        <header className="user-header">
          <div className="profile-banner">

            <div className="banner-bg"></div>

            <div className="profile-left">
              <img
                src={
                  editMode
                    ? formData.profilePic || userData?.profilePic || defaultAvatar
                    : userData?.profilePic || defaultAvatar
                }
                alt="profile"
                className="profile-img premium-img"
                onError={(e) => {
                  e.target.src = defaultAvatar;
                }}
              />
            </div>

            <div className="profile-center">
              <h2 className="profile-name">
                {userData?.name || "User"}
              </h2>

              <p className="profile-email">
                {userData?.email}
              </p>

              <div className="stats premium-stats">
                <span>🎬 {watchlistCount} Watchlist</span>
                <span>❤️ {favCount} Favorites</span>
              </div>

              {editMode && (
                <div className="edit-box">
                  <input
                    type="text"
                    value={formData.profilePic}
                    placeholder="Paste Image URL"
                    onChange={(e) =>
                      setFormData({
                        profilePic: e.target.value,
                      })
                    }
                  />
                  <button onClick={handleUpdate}>Save</button>
                </div>
              )}
            </div>

            <div className="profile-actions">
              <button onClick={() => setEditMode(!editMode)}>
                {editMode ? "Cancel" : "Change Photo"}
              </button>
            </div>

          </div>
        </header>

        {/* 🔥 FILTER UI */}
        <div className="filter-container">

          {/* INDUSTRY */}
          <div className="filter-section">
            <h4>Industry</h4>

            <div className="filter-pills">
              <button onClick={() => setIndustry("")} className={!industry ? "active" : ""}>All</button>
              <button onClick={() => setIndustry("Bollywood")} className={industry==="Bollywood" ? "active" : ""}>Bollywood</button>
              <button onClick={() => setIndustry("Tollywood")} className={industry==="Tollywood" ? "active" : ""}>Tollywood</button>
              <button onClick={() => setIndustry("Hollywood")} className={industry==="Hollywood" ? "active" : ""}>Hollywood</button>
              <button onClick={() => setIndustry("Mollywood")} className={industry==="Mollywood" ? "active" : ""}>Mollywood</button>
              <button onClick={() => setIndustry("Kollywood")} className={industry==="Kollywood" ? "active" : ""}>Kollywood</button>
            </div>
          </div>

          {/* GENRE */}
          <div className="filter-section">
            <h4>Genre</h4>

            <div className="filter-pills">
              <button onClick={() => setGenre("")} className={!genre ? "active" : ""}>All</button>
              <button onClick={() => setGenre("Action")} className={genre==="Action" ? "active" : ""}>Action</button>
              <button onClick={() => setGenre("Drama")} className={genre==="Drama" ? "active" : ""}>Drama</button>
              <button onClick={() => setGenre("Crime")} className={genre==="Crime" ? "active" : ""}>Crime</button>
              <button onClick={() => setGenre("Comedy")} className={genre==="Comedy" ? "active" : ""}>Comedy</button>
              <button onClick={() => setGenre("Thriller")} className={genre==="Thriller" ? "active" : ""}>Thriller</button>
            </div>
          </div>

        </div>

        {/* 🎬 MOVIES */}
        <section className="movies-section">
          <h2>Popular Movies</h2>

          {loading ? (
            <p>Loading movies...</p>
          ) : (
            <div className="movie-grid">
              {movies.map((movie) => (
                <Link
                  to={`/movie/${movie._id}`}
                  key={movie._id}
                  className="movie-link"
                >
                  <div className="movie-card">
                    <img
                      src={getImageUrl(movie.posterUrl)}
                      alt={movie.title}
                      className="movie-poster"
                    />

                    <div className="movie-info">
                      <h3>{movie.title}</h3>
                      <span>⭐ {movie.rating}</span>
                    </div>

                    <div className="movie-description">
                      {movie.description}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* 🤖 RECOMMENDATIONS */}
        <section className="recommend-section">
          <div className="recommend-header">
            <h2>Recommended For You</h2>
            <span className="ai-tag">AI Powered 🤖</span>
          </div>

          {recommendations.length > 0 ? (
            <div className="recommend-row">
              {recommendations.map((movie) => (
                <Link
                  to={`/movie/${movie._id}`}
                  key={movie._id}
                  className="recommend-card"
                >
                  <img
                    src={getImageUrl(movie.posterUrl)}
                    alt={movie.title}
                  />

                  <div className="recommend-overlay">
                    <h3>{movie.title}</h3>
                    <span>⭐ {movie.rating}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p>No recommendations yet</p>
          )}
        </section>

      </div>
    </div>
  );
};

export default User;