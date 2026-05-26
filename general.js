const express = require('express');
let books = require("./booksdb.js");
const public_users = express.Router();

/**
 * @desc Obtiene la lista completa de libros
 * @route GET /
 */
public_users.get('/', async (req, res) => {
    try {
        // Devuelve el objeto completo de libros
        return res.status(200).json({ books: books });
    } catch (error) {
        return res.status(500).json({ message: "Error interno al recuperar los libros" });
    }
});

/**
 * @desc Obtiene detalles de un libro por ISBN
 * @route GET /isbn/:isbn
 */
public_users.get('/isbn/:isbn', async (req, res) => {
    const { isbn } = req.params;
    try {
        const book = books[isbn];
        if (book) {
            return res.status(200).json(book);
        }
        return res.status(404).json({ message: "Libro no encontrado con ese ISBN" });
    } catch (error) {
        return res.status(500).json({ message: "Error al procesar la solicitud por ISBN" });
    }
});

/**
 * @desc Obtiene lista de libros por autor
 * @route GET /author/:author
 */
public_users.get('/author/:author', async (req, res) => {
    const author = req.params.author;
    try {
        const filteredBooks = Object.values(books).filter(b => b.author === author);
        if (filteredBooks.length > 0) {
            return res.status(200).json({ booksbyauthor: filteredBooks });
        }
        return res.status(404).json({ message: "No se encontraron libros para el autor especificado" });
    } catch (error) {
        return res.status(500).json({ message: "Error al buscar por autor" });
    }
});

/**
 * @desc Obtiene lista de libros por título
 * @route GET /title/:title
 */
public_users.get('/title/:title', async (req, res) => {
    const title = req.params.title;
    try {
        const filteredBooks = Object.values(books).filter(b => b.title === title);
        if (filteredBooks.length > 0) {
            return res.status(200).json({ booksbytitle: filteredBooks });
        }
        return res.status(404).json({ message: "No se encontraron libros con ese título" });
    } catch (error) {
        return res.status(500).json({ message: "Error al buscar por título" });
    }
});

module.exports.general = public_users;
