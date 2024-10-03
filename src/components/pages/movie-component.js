import { fetchSpecificMovie } from "../../services/OMDB-SERVICE.js";
import React, { useState } from "react";

function Movie() {
  const [movie, setMovie] = useState(null);

  async function handleKeyDown(e) {
    if (e.key === "Enter") {
      const userInput = e.target.value.trim().toLowerCase();
      try {
        const result = await fetchSpecificMovie(userInput);
        setMovie(result);
      } catch (error) {
        console.log(`Error: unable to retrieve results for ${userInput}`);
      }
      e.target.value = "";
    }
  }

  return (
    <div>
      <h1>Movie</h1>
      <input type="text" onKeyDown={handleKeyDown} />
      {movie && (
        <div>
          <img src={movie.Poster} alt={movie.Title} />
          <p>{movie.Title}</p>
          <p>Release Year: {movie.Year}</p>
          <a
            href={`https://www.imdb.com/title/${movie.imdbID}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            IMDB
          </a>
          <p>{movie.Plot}</p>
        </div>
      )}
    </div>
  );
}

export default Movie;
