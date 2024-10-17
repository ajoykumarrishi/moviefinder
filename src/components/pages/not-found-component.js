function NotFound() {
  return (
    <div className="text-center space-y-4 bg-gradient-to-br from-card to-card/90 rounded-lg p-8 max-w-md mx-auto">
      <h1 className="text-4xl font-bold">404</h1>
      <h2 className="text-2xl font-semibold">Page Not Found</h2>
      <p className="text-muted-foreground">
        Sorry, the page you are looking for does not exist.
      </p>
      <span className="inline-block mt-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-4 py-2 rounded-md hover:from-primary/90 hover:to-primary/70 transition-colors">
        <a href="/react-movie-finder-2">Go Home</a>
      </span>
    </div>
  );
}

export default NotFound;
