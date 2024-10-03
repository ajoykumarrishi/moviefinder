# Movie Finder

Movie Finder is a React-based web application that allows users to search for movies and view detailed information about them. This project uses the OMDB API to fetch movie data and presents it in a user-friendly interface.

## Features

- Search for movies by title
- View a list of search results with basic information
- See detailed information about a specific movie
- Responsive design for various screen sizes
- Dark mode UI

## Technologies Used

- React
- React Router
- Tailwind CSS
- OMDB API

## Getting Started

To get a local copy up and running, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/ajoykumarrishi/react-movie-finder-2/
   ```

2. Navigate to the project directory:
   ```
   cd movie-finder
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your OMDB API key:
   ```
   REACT_APP_API_KEY=your_omdb_api_key_here
   ```

5. Start the development server:
   ```
   npm start
   ```

The application should now be running on `http://localhost:3000`.

## Usage

- On the home page, enter a movie title in the search bar and click "Search" to see a list of matching movies.
- Click on a movie card to view more detailed information about that movie.
- Use the navigation menu to switch between the home page and the individual movie search page.

## Contributing

This is a personal project, but if you'd like to suggest improvements or report bugs, please feel free to open an issue or submit a pull request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [OMDB API](http://www.omdbapi.com/) for providing movie data
- [React](https://reactjs.org/) for the frontend framework
- [Tailwind CSS](https://tailwindcss.com/) for styling