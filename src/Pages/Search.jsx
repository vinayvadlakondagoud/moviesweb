import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const Search = () => {
  const { keyword } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(
        `http://localhost:5000/api/movies?search=${keyword}`
      );
      const data = await res.json();
      setMovies(data);
    };

    fetchMovies();
  }, [keyword]);

  return (
    <div style={{ padding: "100px 5%", color: "white" }}>
      <h2>Search Results for "{keyword}"</h2>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {movies.map((movie) => (
          <Link key={movie._id} to={`/movie/${movie._id}`}>
            <img
              src={movie.posterUrl}
              alt={movie.title}
              style={{ width: "150px", borderRadius: "10px" }}
            />
            <p>{movie.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Search;