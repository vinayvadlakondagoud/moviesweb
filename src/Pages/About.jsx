import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>
            About <span>MovieHub</span>
          </h1>
          <p>Your ultimate destination for discovering amazing movies.</p>
        </div>
      </section>

      {/* Content */}
      <section className="about-content">
        <div className="about-card">
          <h2>Who We Are</h2>
          <p>
            MovieHub is a modern movie discovery platform designed for movie
            lovers. Our goal is to bring the best movies, ratings, and
            information together in one beautiful and easy-to-use experience.
          </p>
        </div>

        <div className="about-card">
          <h2>What We Offer</h2>
          <ul>
            <li>🎬 Browse trending & popular movies</li>
            <li>⭐ View ratings and reviews</li>
            <li>🔍 Search movies instantly</li>
            <li>❤️ Save your favorite movies</li>
          </ul>
        </div>

        <div className="about-card">
          <h2>Our Vision</h2>
          <p>
            We aim to build a cinematic platform that feels premium, fast, and
            enjoyable—helping users discover movies they truly love.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
