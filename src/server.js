// Import the 'path' module to work with file and directory paths
const path = require('path');

// Import the 'express' framework to create a web server
const express = require('express');

// Create an instance of the Express application
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Define the path to the 'dist' directory to serve static assets (e.g., front-end files)
const distDir = path.join(__dirname, '..', 'dist');
const staticAssets = express.static(distDir);

// Use the static assets middleware to serve files from the 'dist' directory
app.use(staticAssets);

// Sample data for todos
const todos = [
  { content: 'go to store', isDone: false },
  { content: 'do homework', isDone: false },
];

// Define a route to handle GET requests to '/api/todos'
app.get('/api/todos', (req, res) => {
  // Respond with the 'todos' array as JSON
  res.json(todos);
});

// Catch-all route for handling other routes (ensures React Router works for client-side routing)
app.get('*', (req, res, next) => {
  // If the request is an API route, pass it to the next middleware
  if (req.originalUrl.startsWith('/api')) return next();

  // For any other route, send the 'index.html' file from the 'public' directory
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Define the port for the server, using the environment variable PORT or default to 8080
const port = process.env.PORT || 8080;

// Start the server and listen on the specified port
app.listen(port, () => console.log(`Server is up! http://localhost:${port}`));








