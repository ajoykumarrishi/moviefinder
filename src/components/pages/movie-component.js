import React, { useState } from "react";
import { fetchSpecificMovie } from "../../services/OMDB-SERVICE.js";

function Movie() {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSearch(e) {
    e.preventDefault();
    const userInput = e.target.search.value.trim().toLowerCase();
    if (!userInput) return;
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchSpecificMovie(userInput);
      if (result.Response === "False") {
        throw new Error(result.Error);
      }
      setMovie(result);
    } catch (error) {
      console.log(`Error: unable to retrieve results for ${userInput}`);
      setError(error.message);
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
        placeholder="Search for a movie..."
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
      {!movie ? (
        <div className="fixed inset-0 pt-16 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="bg-card p-10 rounded-lg shadow-lg w-full max-w-xl border-2 border-primary/20">
            <h1 className="text-4xl font-bold text-center mb-8">
              Find a Movie
            </h1>
            <SearchForm />
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Movie Details</h1>
          <div className="max-w-xl mx-auto mb-10 bg-card p-8 rounded-lg shadow-md border-2 border-primary/20">
            <SearchForm />
          </div>
          {isLoading && <p className="text-center text-xl">Loading...</p>}
          {error && (
            <p className="text-center text-destructive text-xl">{error}</p>
          )}
          {movie && (
            <div className="flex flex-col md:flex-row bg-gradient-to-br from-card to-card/90 rounded-lg shadow-lg border border-primary/20 overflow-hidden">
              <div className="md:w-1/3 flex-shrink-0">
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-2/3 p-6 flex flex-col">
                <div className="bg-black/20 rounded-lg py-4 mb-4">
                  <h2 className="text-2xl font-semibold">{movie.Title}</h2>
                  <p className="text-muted-foreground">
                    {movie.Year} • {movie.Runtime}
                  </p>
                </div>
                <div className="bg-black/20 rounded-lg py-4 mb-4 flex-grow">
                  <h3 className="font-semibold mb-2">Plot</h3>
                  <p className="italic">&ldquo;{movie.Plot}&rdquo;</p>
                </div>
                <div className="bg-black/20 rounded-lg py-4 mb-4">
                  <h3 className="font-semibold mb-2">Details</h3>
                  <p>Genre: {movie.Genre}</p>
                  <p>Director: {movie.Director}</p>
                  <p>Actors: {movie.Actors}</p>
                </div>
                <div className="bg-black/20 rounded-lg py-4 mb-4">
                  <h3 className="font-semibold mb-2">Ratings</h3>
                  <p>IMDB: {movie.imdbRating}</p>
                  {movie.Ratings.map((rating, index) => (
                    <p key={index}>
                      {rating.Source}: {rating.Value}
                    </p>
                  ))}
                </div>
                <a
                  href={`https://www.imdb.com/title/${movie.imdbID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-4 py-3 rounded-md hover:from-primary/90 hover:to-primary/70 transition-colors text-center font-semibold"
                >
                  View on IMDB
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Movie;
