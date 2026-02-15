import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>
            Discover <span>Movies</span> You’ll Love
          </h1>
          <p>Stream the best movies anytime, anywhere</p>
          <button className="hero-btn" onClick={() => window.location.href = '/login'}>Browse Movies</button>
        </div>
      </section>
    </main>
  );
};

export default Home;