import { fetchMoviesBySearch } from "../../services/OMDB-SERVICE.js";
import React, { useState } from "react";

function Home () {
  const [movieList, setMovieList] = useState([]);

  async function handleKeyDown (e) {
    if (e.key === "Enter") {
      try {
        const result = await fetchMoviesBySearch(e.target.value.toString());
        setMovieList(result.Search);
      }
      catch {
        console.log("Error: could not fetch movies by search!");
      }
      e.target.value = "";
    }
  }

  return (
    <div>
      <h1>Home</h1>
      <input type="text" onKeyDown={handleKeyDown} />
      <ul>
        {movieList.map(movie => (
          <li key={movie.imdbID}>
            <img src={movie.Poster} alt={movie.Title} />
            <p>{movie.Title}</p>
            <p>{movie.Year}</p>
            <a href={`https://www.imdb.com/title/${movie.imdbID}`} target="_blank">IMDB</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home;
