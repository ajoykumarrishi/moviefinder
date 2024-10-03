const BASE_URL = "http://www.omdbapi.com/?";
const API_KEY = `&apikey=${process.env.REACT_APP_API_KEY}`;

function response(API_ENDPOINT, purpose) {
  return fetch(`${BASE_URL}${API_ENDPOINT}${API_KEY}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Unable to ${purpose}!\nStatus: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      throw new Error("Error:", error.message);
    });
}

export async function fetchSpecificMovie(movieTitle) {
  try {
    return await response(
      `&t=${encodeURIComponent(movieTitle)}&plot=full`,
      `fetch: ${movieTitle}`
    );
  } catch (error) {
    throw new Error("Error:", error);
  }
}

export async function fetchMoviesBySearch(searchQuery) {
  try {
    return await response(
      `&s=${encodeURIComponent(searchQuery)}&type=movie`,
      `fetch items through keyword: ${searchQuery}`
    );
  } catch (error) {
    throw new Error("Error:", error);
  }
}