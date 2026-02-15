import React from "react";
import "./User.css";

const movies = [
  {
    id: 1,
    title: "Pushpa 2",
    rating: 8.0,
    poster:
      "https://m.media-amazon.com/images/M/MV5BZjllNTdiM2QtYjQ0Ni00ZGM1LWFlYmUtNWY0YjMzYWIxOTYxXkEyXkFqcGc@._V1_QL75_UX246_.jpg",
  },
  {
    id: 16,
    title: "Rangasthalam",
    rating: 8.5,
    poster:
      "https://preview.redd.it/rangasthalam-v0-sp05kjtjd3091.jpg?width=640&crop=smart&auto=webp&s=329c940ff0d82e8f625039082a0e2fbef4b726b8",
  },
  
  {
    id: 3,
    title: "Ala Vaikunthapurramuloo",
    rating: 9.0,
    poster:
      "https://m.media-amazon.com/images/M/MV5BYTExMzM1MDMtOWY0Mi00NzU5LWJkMDYtOTMzNzY1ZGRjZDBlXkEyXkFqcGc@._V1_.jpg",
  },
  {
    id: 9,
    title: "Varanasi",
    rating: 8.5,
    poster:
      "https://scontent.fbom28-1.fna.fbcdn.net/v/t39.30808-6/559280375_1156877329710679_2608863218890846642_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=A97YoQdHEh4Q7kNvwEf5Xz9&_nc_oc=AdnmPYXY2lkSea0yBQaSMR5pYkpvrNEPNYoi8T8YFDgSUqgj1jh-nYwCM86L7l-Uptk&_nc_zt=23&_nc_ht=scontent.fbom28-1.fna&_nc_gid=0q1HTfUWU-XGo8htkmSTdQ&oh=00_AfuLcxrH6UhXDm92Smjt0pUdvdpv16TEPIRAt2uhkh5Fhg&oe=6988DD31",
  },
  {
    id: 14,
    title: "Jai Lava Kusa",
    rating: 8.5,
    poster:
      "https://m.media-amazon.com/images/M/MV5BOWU0ODEyY2YtZjZjZS00MWJiLTljYjktYTIwNzU4MWM4ZTZlXkEyXkFqcGc@._V1_.jpg",
  },
  {
    id: 2,
    title: "Sarrainodu",
    rating: 8.6,
    poster:
      "https://m.media-amazon.com/images/M/MV5BYWQ1MzhlYjUtMmE1NS00ZWY4LWI1ZDgtMThmOWJhZGU4Mzk5XkEyXkFqcGc@._V1_QL75_UX234_.jpg",
  },
  {
    id: 15,
    title: "Bahubali 2",
    rating: 8.5,
    poster:
      "https://cdna.artstation.com/p/assets/covers/images/006/935/246/large/venkata-sai-sandeep-siddam-cover.jpg?1502376753",
  },
  {
    id: 5,
    title: "Arya 2",
    rating: 9.2,
    poster:
      "https://img.airtel.tv/unsafe/fit-in/500x0/filters:format(webp)/https://xstreamcp-assets-msp.streamready.in/assets/AHA/MOVIE/6867f6eb7257d17f4fef4e6a/images/PORTRAIT/0-2x3.jpg?o=production",
  },
  {
    id: 17,
    title: "RRR",
    rating: 8.5,
    poster:
      "https://media-cache.cinematerial.com/p/500x/nj3okwvh/rrr-indian-movie-poster.jpg?v=1650045529",
  },

  {
    id: 10,
    title: "Maharshi",
    rating: 8.5,
    poster:
      "https://m.media-amazon.com/images/M/MV5BZmU5NDU0YjktYzYwYy00N2FiLWI2YmYtNzhjOTg4NjkwN2IyXkEyXkFqcGc@._V1_.jpg",
  },
  {
    id: 6,
    title: "Julayi",
    rating: 8.1,
    poster:
      "https://assets-in.bmscdn.com/iedb/movies/images/extra/vertical_logo/mobile/thumbnail/xxlarge/julayi-et00010073-05-07-2021-11-12-08.jpg",
  },
  {
    id: 11,
    title: "Bharat Ane Nenu",
    rating: 8.5,
    poster:
      "https://upload.wikimedia.org/wikipedia/en/thumb/6/68/Bharat_Ane_Nenu_poster.jpg/250px-Bharat_Ane_Nenu_poster.jpg",
  },
  {
    id: 12,
    title: "Aravinda Sametha",
    rating: 8.5,
    poster:
      "https://pbs.twimg.com/media/Ddjk7ubU8AEbL8S.jpg",
  },
  {
    id: 4,
    title: "Race Gurram",
    rating: 8.4,
    poster:
      "https://m.media-amazon.com/images/M/MV5BYWQyZDkzOGYtNjFhNy00OTIyLTk0YzUtZjFmM2RmMjg5ZGM5XkEyXkFqcGc@._V1_.jpg",
  },
  {
    id: 13,
    title: "Janatha Garage",
    rating: 8.5,
    poster:
      "https://i.redd.it/7-years-for-blockbuster-janatha-garage-despised-by-r-v0-bgqpq64wnllb1.png?width=847&format=png&auto=webp&s=8d5ad59fb9f584d57c8f48ebb336f0e67ce49b26",
  },
  {
    id: 8,
    title: "DJ",
    rating: 8.5,
    poster:
      "https://i.pinimg.com/736x/b9/f9/8f/b9f98f9e4ca15753d7aa79ae25238dee.jpg",
  },
  {
    id: 18,
    title: "Magadheera",
    rating: 8.5,
    poster:
      "https://m.media-amazon.com/images/M/MV5BMzQ0YWYyYjEtZTU2Ni00ZGZjLWJlZmQtYzliN2VlNDY0ZGE4XkEyXkFqcGc@._V1_.jpg",
  },
  {
    id: 7,
    title: "Naa Peru Surya",
    rating: 7.9,
    poster:
      "https://images.fandango.com/ImageRenderer/0/0/redesign/static/img/default_poster.png/0/images/masterrepository/fandango/210617/Naa%20Peru%20Surya.jpg",
  },
];

const User = () => {
  return (
    <div className="user-dashboard">
      <div className="user-container">
        {/* HEADER */}
        <header className="user-header">
          <h1>Welcome, Vinay 👋</h1>
          <p>Explore popular Telugu blockbusters</p>
        </header>

        {/* MOVIES */}
        <section className="movies-section">
          <h2>Popular Movies</h2>

          <div className="movie-grid">
            {movies.map((movie) => (
              <div className="movie-card" key={movie.id}>
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="movie-poster"
                />

                <div className="movie-info">
                  <h3>{movie.title}</h3>
                  <span>⭐ {movie.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default User;
