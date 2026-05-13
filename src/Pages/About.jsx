import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">

      {/* HERO SECTION */}
      <div className="about-hero">
        <div className="about-hero-content">
          <h1>
            About <span>MoviesWeb</span>
          </h1>
          <p>
            Your ultimate destination to explore, discover, and enjoy movies.
            Built with passion for movie lovers.
          </p>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="about-content">

        {/* CARD 1 */}
        <div className="about-card">
          <h2>🎬 Our Mission</h2>
          <p>
            MoviesWeb aims to provide a seamless experience where users can
            browse, review, and discover movies with ease. We focus on
            simplicity, performance, and great UI.
          </p>
        </div>

        {/* CARD 2 */}
        <div className="about-card">
          <h2>🚀 Features</h2>
          <ul>
            <li>✔ Browse latest movies</li>
            <li>✔ Search & filter by genre</li>
            <li>✔ Add to watchlist</li>
            <li>✔ Rate & review movies</li>
            <li>✔ Personalized recommendations</li>
          </ul>
        </div>

        {/* CARD 3 */}
        <div className="about-card">
          <h2>🛠 Technologies</h2>
          <ul>
            <li>React.js (Frontend)</li>
            <li>Node.js + Express (Backend)</li>
            <li>MongoDB (Database)</li>
            <li>JWT Authentication</li>
          </ul>
        </div>

        {/* CARD 4 */}
        <div className="about-card">
          <h2>👨‍💻 Developer</h2>
          <p>
            This project is developed by <strong>Vinay Vadlakonda</strong>.
            Passionate about full-stack development and building modern web
            applications.
          </p>
        </div>

      </div>

    </div>
  );
};

export default About;