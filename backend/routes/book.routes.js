import express from 'express';
import { isAdmin, verifyJWT } from '../middleware/verifyJWT.js';
import { addBook, deleteBook, fetchBooksByCategory, getBookById, getBooks } from '../controller/book.controller.js';

const bookRouter = express.Router();

bookRouter.post('/addbook', verifyJWT, isAdmin, addBook)
bookRouter.get('/getbooks', verifyJWT, getBooks)
bookRouter.get('/getbook/:isbn', verifyJWT, getBookById)
bookRouter.delete('/deletebook/:isbn', verifyJWT, isAdmin, deleteBook)
bookRouter.get('/fetchbookbycategory/:category', verifyJWT, fetchBooksByCategory)


export default bookRouter;