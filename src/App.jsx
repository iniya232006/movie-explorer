import React, { useState } from "react";
import {
  Routes,
  Route,
  Link,
  useParams
} from "react-router-dom";

import "./style.css";

const movies = [
  {
    id: 1,
    title: "Inception",
    year: 2010,
    genre: "Sci-Fi",
    rating: 8.8,
    poster:
      "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    description:
      "A skilled thief enters people's dreams to steal secrets and plant ideas."
  },
  {
    id: 2,
    title: "The Dark Knight",
    year: 2008,
    genre: "Action",
    rating: 9.0,
    poster:
      "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    description:
      "Batman faces the Joker, a criminal who creates chaos in Gotham City."
  },
  {
    id: 3,
    title: "Interstellar",
    year: 2014,
    genre: "Sci-Fi",
    rating: 8.7,
    poster:
      "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    description:
      "Astronauts travel through space to find a new home for humanity."
  },
  {
    id: 4,
    title: "Avengers Endgame",
    year: 2019,
    genre: "Action",
    rating: 8.4,
    poster:
      "https://image.tmdb.org/t/p/w500/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg",
    description:
      "The Avengers unite for a final mission to save the universe."
  },
  {
    id: 5,
    title: "The Notebook",
    year: 2004,
    genre: "Romance",
    rating: 7.8,
    poster:
      "https://image.tmdb.org/t/p/w500/rNzQyW4f8B8cQeg7Dgj3n6e5gY.jpg",
    description:
      "A romantic story about two people whose love lasts for many years."
  },
  {
    id: 6,
    title: "Joker",
    year: 2019,
    genre: "Drama",
    rating: 8.4,
    poster:
      "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
    description:
      "A troubled man experiences events that change his life in Gotham City."
  }
];

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        🎬 Movie Explorer
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
}

function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const filteredMovies = movies.filter((movie) => {
    const searchMatch = movie.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const categoryMatch =
      category === "All" || movie.genre === category;

    return searchMatch && categoryMatch;
  });

  function handleSearch() {
    if (!search.trim()) {
      setError("Please enter a movie name.");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      const result = movies.filter((movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase())
      );

      if (result.length === 0) {
        setError("No movies found. Try another movie.");
      }
    }, 700);
  }

  function showAllMovies() {
    setSearch("");
    setCategory("All");
    setError("");
    setLoading(false);
  }

  return (
    <>
      <Navbar />

      <section className="hero">
        <div className="hero-content">
          <span className="tag">YOUR MOVIE DESTINATION</span>

          <h1>
            Discover Amazing <span>Movies</span>
          </h1>

          <p>
            Search, explore and find your favourite movies.
          </p>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search movies..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />

            <button onClick={handleSearch}>
              🔍 Search
            </button>
          </div>

          <button className="show-all" onClick={showAllMovies}>
            Explore All Movies
          </button>
        </div>
      </section>

      <main className="container">
        <div className="section-header">
          <div>
            <span className="tag">MOVIE COLLECTION</span>
            <h2>Popular Movies</h2>
          </div>

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setError("");
            }}
          >
            <option value="All">All Categories</option>
            <option value="Action">Action</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Romance">Romance</option>
            <option value="Drama">Drama</option>
          </select>
        </div>

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Finding movies...</p>
          </div>
        )}

        {error && !loading && (
          <div className="error">
            ⚠️ {error}
          </div>
        )}

        {!loading && !error && (
          <div className="movie-grid">
            {filteredMovies.map((movie) => (
              <div className="movie-card" key={movie.id}>
                <img
                  src={movie.poster}
                  alt={movie.title}
                  onError={(e) => {
                    e.target.src =
                      "https://placehold.co/400x600/1e293b/ffffff?text=Movie";
                  }}
                />

                <div className="movie-info">
                  <span className="genre">
                    {movie.genre}
                  </span>

                  <h3>{movie.title}</h3>

                  <p>📅 {movie.year}</p>

                  <p className="rating">
                    ⭐ {movie.rating} / 10
                  </p>

                  <Link
                    to={`/movie/${movie.id}`}
                    className="details-btn"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer>
        <h3>🎬 Movie Explorer</h3>
        <p>Discover your next favourite movie.</p>
        <p>© 2026 Movie Explorer</p>
      </footer>
    </>
  );
}

function MovieDetails() {
  const { id } = useParams();

  const movie = movies.find(
    (item) => item.id === Number(id)
  );

  if (!movie) {
    return (
      <>
        <Navbar />

        <div className="not-found">
          <h1>Movie Not Found 😔</h1>

          <Link to="/">
            ← Back to Home
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="details-container">
        <div className="details-card">
          <img
            src={movie.poster}
            alt={movie.title}
            onError={(e) => {
              e.target.src =
                "https://placehold.co/400x600/1e293b/ffffff?text=Movie";
            }}
          />

          <div className="details-content">
            <span className="tag">
              MOVIE DETAILS
            </span>

            <h1>{movie.title}</h1>

            <p>
              <strong>Release Year:</strong>{" "}
              {movie.year}
            </p>

            <p>
              <strong>Category:</strong>{" "}
              {movie.genre}
            </p>

            <p className="big-rating">
              ⭐ {movie.rating} / 10
            </p>

            <h3>About This Movie</h3>

            <p className="description">
              {movie.description}
            </p>

            <Link to="/" className="back-btn">
              ← Back to Movies
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

function About() {
  return (
    <>
      <Navbar />

      <main className="about-page">
        <span className="tag">
          ABOUT OUR PROJECT
        </span>

        <h1>Movie Explorer</h1>

        <p>
          Movie Explorer is a React application that
          allows users to browse, search and explore
          movies. It displays movie ratings,
          categories and details.
        </p>

        <div className="features">
          <div>
            <h2>🔍</h2>
            <h3>Movie Search</h3>
            <p>Find movies by title.</p>
          </div>

          <div>
            <h2>⭐</h2>
            <h3>Movie Ratings</h3>
            <p>View movie ratings.</p>
          </div>

          <div>
            <h2>🎭</h2>
            <h3>Categories</h3>
            <p>Filter movies by genre.</p>
          </div>

          <div>
            <h2>📱</h2>
            <h3>Responsive Design</h3>
            <p>Works on different screen sizes.</p>
          </div>
        </div>
      </main>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/movie/:id"
        element={<MovieDetails />}
      />

      <Route
        path="/about"
        element={<About />}
      />
    </Routes>
  );
}

export default App;
