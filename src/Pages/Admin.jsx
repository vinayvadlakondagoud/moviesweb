import React, { useEffect, useState, useMemo } from "react";
import "./Admin.css";

const Admin = () => {
  const [tab, setTab] = useState("dashboard");

  const [movies, setMovies] = useState([]);
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    genre: "",
    rating: "",
    posterUrl: "",
    backdropUrl: "",
    trailerUrl: "",
    duration: "",
    cast: "",
    industry: "",
  });

  const [editMovie, setEditMovie] = useState(null);

  // ================= FETCH DATA =================
  useEffect(() => {
    const loadData = async () => {
      try {
        const movieRes = await fetch("http://localhost:5000/api/movies");
        const movieData = await movieRes.json();

        const userRes = await fetch("http://localhost:5000/api/admin/users");
        const userData = await userRes.json();

        const reviewRes = await fetch("http://localhost:5000/api/admin/reviews");
        const reviewData = await reviewRes.json();

        setMovies(movieData || []);
        setUsers(userData || []);
        setReviews(reviewData || []);
      } catch (err) {
        console.error("Admin fetch error:", err);
      }
    };

    loadData();
  }, []);

  // ================= FILTER =================
  const filteredMovies = useMemo(() => {
    return movies.filter((m) =>
      m.title?.toLowerCase().includes(search.toLowerCase())
    );
  }, [movies, search]);

  // ================= RECENT MOVIES =================
  const recentMovies = useMemo(() => {
  return [...movies] // 🔥 clone first
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);
}, [movies]);

  // ================= ADD MOVIE =================
  const handleAddMovie = async () => {
    if (!form.title || !form.description || !form.posterUrl || !form.industry) {
      alert("All fields including Industry are required!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          rating: Number(form.rating) || 0,
          posterUrl: form.posterUrl,
          backdropUrl: form.backdropUrl,
          trailerUrl: form.trailerUrl,
          duration: form.duration,
          industry: form.industry,
          genre: form.genre
            ? form.genre.split(",").map((g) => g.trim())
            : [],
          cast: form.cast
            ? form.cast.split(",").map((c) => c.trim())
            : [],
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error adding movie");
        return;
      }

      setMovies((prev) => [...prev, data]);

      setForm({
        title: "",
        description: "",
        genre: "",
        rating: "",
        posterUrl: "",
        backdropUrl: "",
        trailerUrl: "",
        duration: "",
        cast: "",
        industry: "",
      });

      alert("Movie added successfully ✅");
    } catch (err) {
      console.error(err);
    }
  };

  // ================= DELETE MOVIE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this movie?")) return;

    try {
      await fetch(`http://localhost:5000/api/movies/${id}`, {
        method: "DELETE",
      });

      setMovies((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // ================= DELETE USER =================
  const handleDeleteUser = async (id) => {
    if (!window.confirm("Delete user and all related data?")) return;

    try {
      await fetch(`http://localhost:5000/api/admin/users/${id}`, {
        method: "DELETE",
      });

      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // ================= UPDATE MOVIE =================
  const handleUpdate = async () => {
  if (!editMovie.industry) {
    alert("Industry is required!");
    return;
  }

  try {
    const res = await fetch(
      `http://localhost:5000/api/movies/${editMovie._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editMovie),
      }
    );

    if (res.ok) {
      const updated = await res.json();

      setMovies((prev) =>
        prev.map((m) => (m._id === updated._id ? updated : m))
      );

      setEditMovie(null);
    }
  } catch (err) {
    console.error(err);
  }
};

  // ================= UI =================
  return (
    <div className="admin-dashboard">
      <div className="admin-container">

        {/* HEADER */}
        <div className="admin-header">
          <div>
            <h1>Admin Control Panel</h1>
            <p>Manage Movies, Users & Reviews in one place</p>
          </div>

          <div className="admin-profile">
            <div className="avatar-lg">AD</div>
            <div>
              <h4>Admin</h4>
              <span>Vinay Vadlakonda</span>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="tabs">
          <button onClick={() => setTab("dashboard")}>Dashboard</button>
          <button onClick={() => setTab("movies")}>Movies</button>
          <button onClick={() => setTab("users")}>Users</button>
          <button onClick={() => setTab("reviews")}>Reviews</button>
        </div>

        {/* ================= DASHBOARD ================= */}
        {tab === "dashboard" && (
          <div className="dashboard-layout">

            {/* LEFT */}
            <div className="dashboard-left">

              <div className="stats-row">
                <div className="stat-card">
                  <h3>Movies</h3>
                  <p>{movies.length}</p>
                </div>

                <div className="stat-card">
                  <h3>Users</h3>
                  <p>{users.length}</p>
                </div>

                <div className="stat-card">
                  <h3>Reviews</h3>
                  <p>{reviews.length}</p>
                </div>
              </div>

              <div className="panel recent-panel">
                <div className="panel-header">
                  <h2>Recent Movies</h2>
                  <span className="panel-sub">Latest additions</span>
                </div>

                <div className="recent-list">
                  {recentMovies.map((m, index) => (
                    <div key={m._id} className="recent-item">

                      {/* LEFT */}
                      <div className="recent-left">
                        <img src={m.posterUrl} alt={m.title} />

                        <div className="recent-info">
                          <h4>{m.title}</h4>

                          <div className="recent-meta">
                            <span>⭐ {m.rating || 0}</span>
                            <span>{m.duration || "N/A"}</span>
                          </div>

                          <span className="industry-badge">{m.industry}</span>

                          {index === 0 && (
                            <span className="badge-new">NEW</span>
                          )}
                        </div>
                      </div>

                      {/* RIGHT */}
                      <div className="recent-right">
                        {m.createdAt
                          ? new Date(m.createdAt).toLocaleDateString()
                          : ""}
                      </div>

                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT */}
            <div className="dashboard-right">

              <div className="panel">
                <h2>New Users</h2>

                {users.slice(0, 5).map((u) => (
                  <div key={u._id} className="user-row">

                    <div className="avatar-lg">{u.name?.[0]}</div>

                    <div className="user-info">
                      <h4>{u.name}</h4>
                      <span>{u.email}</span>
                    </div>

                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteUser(u._id)}
                    >
                      Delete
                    </button>

                  </div>
                ))}
              </div>

              {/* ================= INSIGHTS ================= */}
              <div className="panel panel--insight">
                <h2>Insights</h2>

                {/* TOP RATED */}
                <div className="panel-item insight-item">
                  <h4>Top Rated Movie</h4>
                  <span>
                    {
                      movies.length
                        ? movies.reduce((a, b) => a.rating > b.rating ? a : b).title
                        : "-"
                    }
                  </span>
                </div>

                {/* AVERAGE RATING */}
                <div className="panel-item insight-item">
                  <h4>Average Rating</h4>
                  <span>
                    {
                      movies.length
                        ? (
                          movies.reduce((sum, m) => sum + (m.rating || 0), 0) /
                          movies.length
                        ).toFixed(1)
                        : "0"
                    }
                  </span>
                </div>

                {/* MOST REVIEWED */}
                <div className="panel-item insight-item">
                  <h4>Most Reviewed Movie</h4>
                  <span>
                    {
                      movies.length
                        ? movies.reduce((a, b) =>
                          (a.ratings?.length || 0) > (b.ratings?.length || 0) ? a : b
                        ).title
                        : "-"
                    }
                  </span>
                </div>

                {/* TOTAL RATINGS */}
                <div className="panel-item insight-item">
                  <h4>Total Ratings</h4>
                  <span>
                    {
                      movies.reduce((total, m) =>
                        total + (m.ratings?.length || 0), 0
                      )
                    }
                  </span>
                </div>

                {/* MOST POPULAR GENRE */}
                <div className="panel-item insight-item">
                  <h4>Most Popular Genre</h4>
                  <span>
                    {
                      (() => {
                        const genreCount = {};

                        movies.forEach((m) => {
                          (m.genre || []).forEach((g) => {
                            genreCount[g] = (genreCount[g] || 0) + 1;
                          });
                        });

                        const topGenre = Object.keys(genreCount).sort(
                          (a, b) => genreCount[b] - genreCount[a]
                        )[0];

                        return topGenre || "-";
                      })()
                    }
                  </span>
                </div>

                {/* MOST ACTIVE USER */}
                <div className="panel-item insight-item">
                  <h4>Most Active User</h4>
                  <span>
                    {
                      (() => {
                        const userCount = {};

                        reviews.forEach((r) => {
                          userCount[r.username] = (userCount[r.username] || 0) + 1;
                        });

                        const topUser = Object.keys(userCount).sort(
                          (a, b) => userCount[b] - userCount[a]
                        )[0];

                        return topUser || "-";
                      })()
                    }
                  </span>
                </div>

                {/* RECENT ACTIVITY */}
                <div className="panel-item insight-item">
                  <h4>Latest Review</h4>
                  <span>
                    {
                      reviews.length
                        ? `${reviews[0].username}: ${reviews[0].comment.slice(0, 20)}...`
                        : "-"
                    }
                  </span>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ================= MOVIES ================= */}
        {tab === "movies" && (
          <>
            <div className="top-bar">
              <input
                placeholder="Search movies..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="admin-form-card">
              <h2>Add Movie</h2>

              <div className="form-grid">
                <input placeholder="Title" value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })} />

                <input placeholder="Genre" value={form.genre}
                  onChange={(e) => setForm({ ...form, genre: e.target.value })} />

                <input placeholder="Rating" value={form.rating}
                  onChange={(e) => setForm({ ...form, rating: e.target.value })} />

                <input placeholder="Duration" value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: e.target.value })} />

                <input placeholder="Poster URL" value={form.posterUrl}
                  onChange={(e) => setForm({ ...form, posterUrl: e.target.value })} />

                <input placeholder="Backdrop URL" value={form.backdropUrl}
                  onChange={(e) => setForm({ ...form, backdropUrl: e.target.value })} />

                <input placeholder="Trailer URL" value={form.trailerUrl}
                  onChange={(e) => setForm({ ...form, trailerUrl: e.target.value })} />

                <input placeholder="Cast" value={form.cast}
                  onChange={(e) => setForm({ ...form, cast: e.target.value })} />

                <div className="select-wrapper">
                  <select
                    value={form.industry}
                    onChange={(e) => setForm({ ...form, industry: e.target.value })}
                  >
                    <option value="">Select Industry</option>
                    <option value="Bollywood">Bollywood</option>
                    <option value="Tollywood">Tollywood</option>
                    <option value="Hollywood">Hollywood</option>
                    <option value="Mollywood">Mollywood</option>
                    <option value="Kollywood">Kollywood</option>
                  </select>
                </div>
              </div>
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />

              <button className="add-btn" onClick={handleAddMovie}>
                Add Movie
              </button>
            </div>

            <div className="admin-movie-grid">
              {filteredMovies.map((m) => (
                <div key={m._id} className="admin-movie-card">

                  <img src={m.posterUrl} alt={m.title} />

                  <div className="movie-info">
                    <h3>{m.title}</h3>
                    <span>⭐ {m.rating}</span>
                  </div>

                  <div className="actions">
                    <button className="edit-btn" onClick={() =>
                      setEditMovie({
                        ...m,
                        industry: m.industry ?? "",
                      })
                    }>
                      Edit
                    </button>

                    <button className="delete-btn" onClick={() => handleDelete(m._id)}>
                      Delete
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </>
        )}

        {/* ================= USERS ================= */}
        {tab === "users" && (
          <div className="list">
            {users.map((u) => (
              <div key={u._id} className="user-row">

                <div className="avatar-lg">{u.name?.[0]}</div>

                <div className="user-info">
                  <h4>{u.name}</h4>
                  <span>{u.email}</span>
                </div>

                <button
                  className="delete-btn"
                  onClick={() => handleDeleteUser(u._id)}
                >
                  Delete
                </button>

              </div>
            ))}
          </div>
        )}

        {/* ================= REVIEWS ================= */}
        {tab === "reviews" && (
          <div className="reviews-grid">
            {reviews.map((r) => (
              <div key={r._id} className="review-card">

                {/* TOP */}
                <div className="review-header">
                  <div className="review-user">
                    <div className="avatar-lg">
                      {r.username?.[0]}
                    </div>

                    <div>
                      <h4>{r.username}</h4>
                      <span>
                        {r.createdAt
                          ? new Date(r.createdAt).toLocaleString()
                          : "Recently"}
                      </span>
                    </div>
                  </div>

                  {/* optional rating */}
                  {r.rating && (
                    <div className="review-rating">
                      ⭐ {r.rating}
                    </div>
                  )}
                </div>

                {/* COMMENT */}
                <div className="review-body">
                  {r.comment}
                </div>

              </div>
            ))}
          </div>
        )}

        {/* ================= EDIT MODAL ================= */}
        {editMovie && (
          <div className="modal">
            <div className="modal-content">

              <h2>Edit Movie</h2>

              <div className="form-grid">

                <input value={editMovie.title}
                  onChange={(e) => setEditMovie({ ...editMovie, title: e.target.value })} />

                <input value={editMovie.genre?.join(", ")}
                  onChange={(e) =>
                    setEditMovie({
                      ...editMovie,
                      genre: e.target.value.split(",").map(g => g.trim())
                    })
                  } />

                <input value={editMovie.rating}
                  onChange={(e) => setEditMovie({ ...editMovie, rating: e.target.value })} />

                <input value={editMovie.duration}
                  onChange={(e) => setEditMovie({ ...editMovie, duration: e.target.value })} />

                <input value={editMovie.posterUrl}
                  onChange={(e) => setEditMovie({ ...editMovie, posterUrl: e.target.value })} />

                <input value={editMovie.backdropUrl}
                  onChange={(e) => setEditMovie({ ...editMovie, backdropUrl: e.target.value })} />

                <input value={editMovie.trailerUrl}
                  onChange={(e) => setEditMovie({ ...editMovie, trailerUrl: e.target.value })} />

                <input value={editMovie.cast?.join(", ")}
                  onChange={(e) =>
                    setEditMovie({
                      ...editMovie,
                      cast: e.target.value.split(",").map(c => c.trim())
                    })
                  } />

                <div className="select-wrapper">
                  <select
                    value={editMovie.industry ?? ""}
                    onChange={(e) =>
                      setEditMovie({ ...editMovie, industry: e.target.value })
                    }
                  >
                    <option value="">Select Industry</option>
                    <option value="Bollywood">Bollywood</option>
                    <option value="Tollywood">Tollywood</option>
                    <option value="Hollywood">Hollywood</option>
                    <option value="Mollywood">Mollywood</option>
                    <option value="Kollywood">Kollywood</option>
                  </select>
                </div>

              </div>

              <textarea
                value={editMovie.description}
                onChange={(e) => setEditMovie({ ...editMovie, description: e.target.value })}
              />

              <div className="modal-actions">
                <button className="save-btn" onClick={handleUpdate}>
                  Save Changes
                </button>

                <button className="cancel-btn" onClick={() => setEditMovie(null)}>
                  Cancel
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Admin;