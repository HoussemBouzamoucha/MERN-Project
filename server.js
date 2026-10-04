const express = require('express'); // 1. load the Express framework module
const app = express();              // 2. instantiate the server application
const PORT = 3000;

app.use(express.json()); // parses incoming JSON bodies and populates req.body

// ---------------------------------------------------------------
// In-memory data stores. State resets to defaults upon process restart.
// Persistent storage will be handled by MongoDB in Session 3.
// ---------------------------------------------------------------
const articles = [
  { id: 1, title: 'Welcome to the blog', author: 'Admin' },
  { id: 2, title: 'My first Express server', author: 'Aya' },
  { id: 3, title: 'Testing an API with Postman', author: 'Aya' }
];

let nextId = 4; // next auto-incremented id (ids 1, 2 and 3 are already assigned)

const users = [
  { id: 1, name: 'Aya',  email: 'aya@mail.com' },
  { id: 2, name: 'Omar', email: 'omar@mail.com' },
  { id: 3, name: 'Sara', email: 'sara@mail.com' }
];

// ---------------------------------------------------------------
// Step 2: minimal route
// ---------------------------------------------------------------
// GET / -> greeting
app.get('/', (req, res) => {
  res.json({ message: "Hello, I am the blog API" });
});

// ---------------------------------------------------------------
// Steps 3 and 5: article collection with optional filter
// ---------------------------------------------------------------
// GET /api/articles                -> all articles
// GET /api/articles?author=Aya     -> articles filtered by author
app.get('/api/articles', (req, res) => {
  const { author } = req.query; // equivalent to: const author = req.query.author;

  let result = articles;
  if (author) { // if query parameter ?author= was provided
    result = articles.filter(a => a.author === author);
  }
  res.json({ total: result.length, articles: result });
});

// ---------------------------------------------------------------
// Step 4: single article by id
// ---------------------------------------------------------------
// GET /api/articles/2 -> fetch article whose id equals 2
app.get('/api/articles/:id', (req, res) => {
  const id = Number(req.params.id); // convert "2" (string) -> 2 (number)
  const article = articles.find(a => a.id === id);

  if (!article) {
    return res.status(404).json({ error: `Article ${id} not found` });
  }
  res.json(article);
});

// ---------------------------------------------------------------
// Step 6: create an article
// ---------------------------------------------------------------
// POST /api/articles -> creates an article from { "title": "...", "author": "..." }
app.post('/api/articles', (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) { // validation: both fields are required
    return res.status(400).json({ error: "Title and author are required" });
  }

  const newArticle = { id: nextId, title: title, author: author };
  nextId = nextId + 1;
  articles.push(newArticle);

  res.status(201).json({ message: 'Article created', article: newArticle });
});

// ---------------------------------------------------------------
// Exercise 1: API extensions
// ---------------------------------------------------------------
// GET /about -> application info
app.get('/about', (req, res) => {
  res.json({
    app: 'Blog API',
    student: 'Houssem Eddine Bouzamoucha',
    version: '1.0.0'
  });
});

// GET /api/users           -> all users
// GET /api/users?name=Aya  -> users filtered by name (bonus)
app.get('/api/users', (req, res) => {
  const { name } = req.query;

  let result = users;
  if (name) {
    result = users.filter(u => u.name === name);
  }
  res.json(result);
});

// GET /api/users/:id -> one user, or 404
app.get('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ error: `User ${id} not found` });
  }
  res.json(user);
});

// POST /contact -> { "email": "...", "message": "..." }
app.post('/contact', (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: "Email and message are required" });
  }
  res.status(200).json({ message: "Thank you, your message has been received" });
});

// ---------------------------------------------------------------
// Start the server: await incoming HTTP requests on port 3000
// ---------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});