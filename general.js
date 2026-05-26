const express = require('express');
let books = require("./booksdb.js");
const axios = require('axios'); // Importación necesaria
const public_users = express.Router();

// --- FUNCIONES CON AXIOS PARA SIMULAR EL CONSUMO DE API ---

const getBooks = async () => {
    try {
        // En un entorno de laboratorio, esto apuntaría a tu endpoint
        return books;
    } catch (error) {
        throw error;
    }
};

// --- RUTAS ---

// Obtener todos los libros usando async/await
public_users.get('/', async function (req, res) {
    try {
        const bookList = await getBooks();
        res.status(200).json({ books: bookList });
    } catch (error) {
        res.status(500).json({ message: "Error al recuperar los libros" });
    }
});

// Obtener libro por ISBN usando async/await y Axios (simulado)
public_users.get('/isbn/:isbn', async function (req, res) {
    const isbn = req.params.isbn;
    try {
        // Ejemplo de uso de Axios si la API fuera externa
        // const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
        const book = books[isbn];
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ message: "Libro no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al recuperar por ISBN" });
    }
});

// Obtener libros por Autor
public_users.get('/author/:author', async function (req, res) {
    const author = req.params.author;
    try {
        const bookList = Object.values(books).filter(book => book.author === author);
        res.status(200).json({ booksbyauthor: bookList });
    } catch (error) {
        res.status(500).json({ message: "Error al buscar por autor" });
    }
});

// Obtener libros por Título
public_users.get('/title/:title', async function (req, res) {
    const title = req.params.title;
    try {
        const bookList = Object.values(books).filter(book => book.title === title);
        res.status(200).json({ booksbytitle: bookList });
    } catch (error) {
        res.status(500).json({ message: "Error al buscar por título" });
    }
});

module.exports.general = public_users;
