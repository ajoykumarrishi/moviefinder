import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchMoviesBySearch,
  fetchSpecificMovie,
} from "../../services/OMDB-SERVICE.js";

function Home() {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSearch(e) {
    e.preventDefault();
    const userInput = e.target.search.value.toString().trim().toLowerCase();
    if (!userInput) return;
    setIsLoading(true);
    try {
      const result = await fetchMoviesBySearch(userInput);
      const moviesWithPlots = await Promise.all(
        result.Search.map(async (movie) => {
          const fullDetails = await fetchSpecificMovie(movie.imdbID, "short");
          return { ...movie, Plot: fullDetails.Plot };
        })
      );
      setMovieList(moviesWithPlots);
    } catch (error) {
      console.log(`Error: could not fetch movies by searchQuery ${userInput}!`);
    } finally {
      setIsLoading(false);
    }
    e.target.reset();
  }

  const SearchForm = () => (
    <form onSubmit={handleSearch} className="space-y-6">
      <input
        type="text"
        name="search"
        className="w-full px-6 py-4 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring text-lg"
        placeholder="Search for movies..."
      />
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 py-4 rounded-md hover:from-primary/90 hover:to-primary/70 transition-colors text-lg font-semibold"
      >
        Search
      </button>
    </form>
  );

  return (
    <div className="min-h-screen pt-16">
      {movieList.length === 0 ? (
        <div className="fixed inset-0 pt-16 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="bg-card p-10 rounded-lg shadow-lg w-full max-w-xl border-2 border-primary/20">
            <h1 className="text-4xl font-bold text-center mb-8">
              Discover Movies
            </h1>
            <SearchForm />
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">
            Discover Movies
          </h1>
          <div className="max-w-xl mx-auto mb-10 bg-card p-8 rounded-lg shadow-md border-2 border-primary/20">
            <SearchForm />
          </div>
          {isLoading && <p className="text-center text-xl">Loading...</p>}
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {movieList.map((movie) => (
              <li
                key={movie.imdbID}
                className="bg-gradient-to-br from-card to-card/90 rounded-lg overflow-hidden shadow-md flex border border-border"
              >
                <Link
                  to={`/movie/${movie.imdbID}`}
                  className="w-1/3 object-cover"
                >
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="w-full h-full object-fill"
                  />
                </Link>
                <div className="p-4 w-2/3 flex flex-col justify-between">
                  <div>
                    <Link to={`/movie/${movie.imdbID}`}>
                      <h2 className="font-semibold text-xl mb-2">
                        {movie.Title}
                      </h2>
                    </Link>
                    <p className="text-muted-foreground mb-2">{movie.Year}</p>
                    <div className="bg-black/20 rounded-lg py-3 mb-3">
                      <p className="text-sm italic">
                        &ldquo;{movie.Plot}&rdquo;
                      </p>
                    </div>
                  </div>
                  <span className="block w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-3 py-2 rounded-md hover:from-primary/90 hover:to-primary/70 transition-colors text-center">
                    <a
                      href={`https://www.imdb.com/title/${movie.imdbID}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on IMDB
                    </a>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Home;
