const BASE_URL = "https://www.omdbapi.com/?";
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

export async function fetchSpecificMovie(movieID, plot = "full") {
  try {
    if (plot === "full") {
      return await response(
        `&i=${encodeURIComponent(movieID)}&plot=full`,
        `fetch: ${movieID}`
      );
    } else {
      return await response(
        `&i=${encodeURIComponent(movieID)}`,
        `fetch: ${movieID}`
      );
    }
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