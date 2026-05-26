const express = require('express');
let books = require("./booksdb.js");
const axios = require('axios');
const public_users = express.Router();

// 1. Obtener todos los libros usando async/await
public_users.get('/', async function (req, res) {
    try {
        // En una API real, aquí usarías axios.get('http://localhost:5000/api/books')
        // Como es local, devolvemos el objeto books
        res.send(JSON.stringify({books: books}, null, 4));
    } catch (error) {
        res.status(500).json({message: "Error al obtener los libros"});
    }
});

// 2. Obtener libro por ISBN usando async/await
public_users.get('/isbn/:isbn', async function (req, res) {
    const isbn = req.params.isbn;
    try {
        const book = books[isbn];
        if (book) {
            res.send(JSON.stringify(book, null, 4));
        } else {
            res.status(404).json({message: "Libro no encontrado"});
        }
    } catch (error) {
        res.status(500).json({message: "Error al buscar por ISBN"});
    }
});

// 3. Obtener libros por Autor usando async/await
public_users.get('/author/:author', async function (req, res) {
    const author = req.params.author;
    try {
        const bookList = Object.values(books).filter(book => book.author === author);
        res.send(JSON.stringify({booksbyauthor: bookList}, null, 4));
    } catch (error) {
        res.status(500).json({message: "Error al buscar por autor"});
    }
});

// 4. Obtener libros por Título usando async/await
public_users.get('/title/:title', async function (req, res) {
    const title = req.params.title;
    try {
        const bookList = Object.values(books).filter(book => book.title === title);
        res.send(JSON.stringify({booksbytitle: bookList}, null, 4));
    } catch (error) {
        res.status(500).json({message: "Error al buscar por título"});
    }
});

module.exports.general = public_users;
