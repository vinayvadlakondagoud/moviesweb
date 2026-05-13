import React, { useState, useEffect } from "react";
import "./Cast.css";

const Cast = () => {
    // Actor Form State
    const [actorData, setActorData] = useState({ name: "", image: "" });
    const [allActors, setAllActors] = useState([]);

    // Movie Form State
    const [movieData, setMovieData] = useState({
        title: "",
        description: "",
        posterUrl: "",
        backdropUrl: "",
        trailerUrl: "", // YouTube ID
        duration: "",   // e.g., "2h 45m"
        rating: 0,
        genre: "",      // We'll split this string into an array before sending
        cast: []        // ObjectIds
    });

    // 1. Declare the function FIRST
    const fetchActors = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/cast");
            const data = await res.json();
            setAllActors(data);
        } catch (err) {
            console.error("Failed to fetch actors:", err);
        }
    };

    useEffect(() => {
        let isMounted = true; // Track if component is still mounted

        const loadActors = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/cast");
                const data = await res.json();

                // Only update state if the component is still visible
                if (isMounted) {
                    setAllActors(data);
                }
            } catch (err) {
                console.error("Failed to fetch actors:", err);
            }
        };

        loadActors();

        return () => {
            isMounted = false; // Cleanup: stop state updates if user leaves page
        };
    }, []);

    const handleAddActor = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:5000/api/cast", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(actorData)
        });
        if (res.ok) {
            alert("Actor Registered!");
            setActorData({ name: "", image: "" });
            fetchActors();
        }
    };

    const handleAddMovie = async (e) => {
        e.preventDefault();

        // Prepare data: convert genre string to array
        const finalData = {
            ...movieData,
            genre: movieData.genre.split(",").map(g => g.trim())
        };

        const res = await fetch("http://localhost:5000/api/movies", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(finalData)
        });

        if (res.ok) {
            alert("Movie Published Successfully!");
        }
    };

    const toggleActorInMovie = (actorId) => {
        const newCast = movieData.cast.includes(actorId)
            ? movieData.cast.filter(id => id !== actorId)
            : [...movieData.cast, actorId];
        setMovieData({ ...movieData, cast: newCast });
    };

    return (
        <div className="admin-container">
            <h1 className="admin-title">Studio Control Panel</h1>

            <div className="admin-grid">
                {/* Section 1: Cast Management */}
                <section className="admin-card">
                    <h2>🎭 Cast Registry</h2>
                    <form onSubmit={handleAddActor}>
                        <input type="text" placeholder="Actor Name (e.g. Prabhas)"
                            value={actorData.name} onChange={(e) => setActorData({ ...actorData, name: e.target.value })} required />
                        <input type="text" placeholder="Profile Image URL"
                            value={actorData.image} onChange={(e) => setActorData({ ...actorData, image: e.target.value })} required />
                        <button type="submit" className="btn-secondary">Add Actor to Database</button>
                    </form>
                </section>

                {/* Section 2: Movie Production */}
                <section className="admin-card">
                    <h2>🎬 Production House</h2>
                    <form onSubmit={handleAddMovie}>
                        <div className="input-group">
                            <input type="text" placeholder="Movie Title" onChange={(e) => setMovieData({ ...movieData, title: e.target.value })} required />
                            <input type="number" step="0.1" placeholder="Rating (0-10)" onChange={(e) => setMovieData({ ...movieData, rating: e.target.value })} />
                        </div>

                        <textarea placeholder="Plot Synopsis" onChange={(e) => setMovieData({ ...movieData, description: e.target.value })} required />

                        <div className="input-group">
                            <input type="text" placeholder="Genres (Action, Drama, Thriller)" onChange={(e) => setMovieData({ ...movieData, genre: e.target.value })} />
                            <input type="text" placeholder="Duration (e.g. 2h 30m)" onChange={(e) => setMovieData({ ...movieData, duration: e.target.value })} />
                        </div>

                        <input type="text" placeholder="Poster URL" onChange={(e) => setMovieData({ ...movieData, posterUrl: e.target.value })} />
                        <input type="text" placeholder="Backdrop URL" onChange={(e) => setMovieData({ ...movieData, backdropUrl: e.target.value })} />
                        <input type="text" placeholder="YouTube Trailer ID (e.g. d967EbLSeMc)" onChange={(e) => setMovieData({ ...movieData, trailerUrl: e.target.value })} />

                        <div className="cast-picker">
                            <p>Select Cast Members:</p>
                            <div className="chip-container">
                                {allActors.map(actor => (
                                    <div
                                        key={actor._id}
                                        className={`actor-chip ${movieData.cast.includes(actor._id) ? "selected" : ""}`}
                                        onClick={() => toggleActorInMovie(actor._id)}
                                    >
                                        {actor.name}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button type="submit" className="btn-primary">Publish to Catalog</button>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default Cast;