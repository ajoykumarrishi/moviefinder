import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Home from "./components/pages/home-component.js";
import Movie from "./components/pages/movie-component.js";
import NotFound from "./components/pages/not-found-component.js";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL || "/"}>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Header />
        <main className="flex-grow pt-16 pb-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<Movie />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-background border-b border-border z-10">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex justify-center">
          <ul className="flex space-x-8">
            <li>
              <Link
                to="/"
                className={({ isActive }) =>
                  `text-primary hover:text-primary/80 transition-colors transform hover:scale-105 ${
                    isActive ? "font-bold border-b-2 border-primary" : ""
                  }`
                }
              >
                MovieFinder
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-card text-card-foreground py-4 border-t border-border">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; 2024 Rishi Ajoykumar. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default App;
