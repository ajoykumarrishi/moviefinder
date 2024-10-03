import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import Home from "./components/pages/home-component.js";
import Movie from "./components/pages/movie-component.js";
import NotFound from "./components/pages/not-found-component.js";

function App() {
  return (
    <Router>
      <div>
        <h1>React Movie Finder</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
            <Link to="/movie/">Movie</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/" element={<Movie />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;