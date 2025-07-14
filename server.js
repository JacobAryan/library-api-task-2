// Simple Library API - Beginner Friendly Version
const express = require('express');
const app = express();
app.use(express.json()); // To parse JSON data

// Temporary database (using array instead of real DB)
let books = [
    { id: 1, title: "JavaScript for Beginners", author: "John Doe" },
    { id: 2, title: "Node.js Basics", author: "Jane Smith" }
];

// 1. GET ALL BOOKS
app.get('/books', (req, res) => {
    res.json(books);
});

// 2. ADD NEW BOOK
app.post('/books', (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    };
    books.push(newBook);
    res.status(201).send(newBook);
});

// 3. UPDATE BOOK
app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);
    
    if (!book) return res.status(404).send('Book not found');
    
    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    
    res.send(book);
});

// 4. DELETE BOOK
app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    books = books.filter(b => b.id !== bookId);
    res.send('Book deleted');
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
});